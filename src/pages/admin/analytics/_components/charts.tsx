// Chart components SVG thuần cho Admin Analytics — không dùng thư viện chart
// để giữ bundle nhẹ. Palette đã validate CVD-safe trên surface slate-900 (#0f172a):
//   series xanh dương #3987e5, xanh ngọc #199e70, vàng #c98500, hồng #d55181.
// Quy tắc: text không bao giờ mang màu series; grid/axis chìm; tooltip đi kèm mọi chart.
import { useMemo, useRef, useState, useCallback } from 'react';

export const CHART_COLORS = {
  blue: '#3987e5',
  aqua: '#199e70',
  yellow: '#c98500',
  magenta: '#d55181',
  grid: '#1e293b',    // hairline trên slate-900
  muted: '#64748b',   // nhãn trục
  ink: '#e2e8f0',     // giá trị nổi bật
  surface: '#0f172a', // slate-900 — dùng làm khe tách segment
} as const;

const nf = (n: number) => n.toLocaleString('vi-VN');

function shortDate(iso: string): string {
  const [, m, d] = iso.split('-');
  return `${d}/${m}`;
}

/** Vị trí x (0..1) của điểm i trong n điểm trải đều */
const xAt = (i: number, n: number) => (n <= 1 ? 0.5 : i / (n - 1));

// ─── Tooltip dùng chung ─────────────────────────────────────────────────────────

interface TooltipState {
  index: number;
  xPct: number; // 0..100 — vị trí ngang trong container
}

function TooltipBox({ xPct, children }: { xPct: number; children: React.ReactNode }) {
  // Lật tooltip sang trái khi gần mép phải để không tràn card
  const flip = xPct > 65;
  return (
    <div
      className="absolute top-1 z-10 pointer-events-none bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 shadow-xl text-[11px] leading-relaxed whitespace-nowrap"
      style={flip
        ? { right: `${100 - xPct}%`, marginRight: 10 }
        : { left: `${xPct}%`, marginLeft: 10 }}
    >
      {children}
    </div>
  );
}

// ─── TimeSeriesChart — line + area, tối đa 2 series, crosshair + tooltip ────────

interface Series {
  name: string;
  color: string;
  values: number[];
}

interface TimeSeriesChartProps {
  dates: string[];
  series: Series[]; // 1–2 series
  height?: number;
}

const TS_W = 600;

export function TimeSeriesChart({ dates, series, height = 200 }: TimeSeriesChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<TooltipState | null>(null);
  const n = dates.length;

  const max = useMemo(
    () => Math.max(1, ...series.flatMap(s => s.values)),
    [series],
  );

  const PAD_TOP = 8;
  const PAD_BOTTOM = 4;
  const plotH = height - PAD_TOP - PAD_BOTTOM;
  const yAt = useCallback(
    (v: number) => PAD_TOP + plotH * (1 - v / max),
    [plotH, max],
  );

  const paths = useMemo(() => series.map(s => {
    const pts = s.values.map((v, i) => `${(xAt(i, n) * TS_W).toFixed(1)},${yAt(v).toFixed(1)}`);
    const line = `M${pts.join('L')}`;
    const area = `${line}L${TS_W},${height - PAD_BOTTOM}L0,${height - PAD_BOTTOM}Z`;
    return { line, area };
  }), [series, n, yAt, height]);

  // 4 gridline ngang + nhãn giá trị
  const gridLines = useMemo(() => {
    return [0.25, 0.5, 0.75, 1].map(f => ({ y: yAt(max * f), value: Math.round(max * f) }));
  }, [max, yAt]);

  // Nhãn ngày thưa — tối đa ~6 nhãn để không chen chúc
  const labelEvery = Math.max(1, Math.ceil(n / 6));

  const handleMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect || n === 0) return;
    const frac = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    const index = Math.round(frac * (n - 1));
    setHover({ index, xPct: xAt(index, n) * 100 });
  };

  return (
    <div>
      {/* Legend — bắt buộc khi ≥2 series; nhãn là text thường, chip màu mang identity */}
      {series.length >= 2 && (
        <div className="flex items-center gap-4 mb-3">
          {series.map(s => (
            <span key={s.name} className="flex items-center gap-1.5 text-[11px] text-slate-400">
              <span className="w-3 h-0.5 rounded-full inline-block" style={{ backgroundColor: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      )}

      <div
        ref={containerRef}
        className="relative"
        onMouseMove={handleMove}
        onMouseLeave={() => setHover(null)}
      >
        <svg viewBox={`0 0 ${TS_W} ${height}`} width="100%" height={height} preserveAspectRatio="none" className="block">
          {gridLines.map(g => (
            <line key={g.y} x1={0} x2={TS_W} y1={g.y} y2={g.y} stroke={CHART_COLORS.grid} strokeWidth={1} />
          ))}

          {paths.map((p, si) => (
            <g key={series[si].name}>
              <path d={p.area} fill={series[si].color} opacity={0.08} />
              <path d={p.line} fill="none" stroke={series[si].color} strokeWidth={2}
                vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
            </g>
          ))}

          {/* Crosshair + marker tại điểm hover */}
          {hover && (
            <g>
              <line
                x1={xAt(hover.index, n) * TS_W} x2={xAt(hover.index, n) * TS_W}
                y1={PAD_TOP} y2={height - PAD_BOTTOM}
                stroke={CHART_COLORS.muted} strokeWidth={1} strokeDasharray="3 3"
                vectorEffect="non-scaling-stroke"
              />
              {series.map(s => (
                <circle
                  key={s.name}
                  cx={xAt(hover.index, n) * TS_W}
                  cy={yAt(s.values[hover.index])}
                  r={4}
                  fill={s.color}
                  stroke={CHART_COLORS.surface}
                  strokeWidth={2}
                />
              ))}
            </g>
          )}
        </svg>

        {/* Nhãn giá trị gridline — đặt ngoài svg để chữ không bị scale méo */}
        <div className="absolute inset-0 pointer-events-none">
          {gridLines.map(g => (
            <span
              key={g.y}
              className="absolute left-0 text-[9px] text-slate-500 tabular-nums -translate-y-full pb-0.5"
              style={{ top: `${(g.y / height) * 100}%` }}
            >
              {nf(g.value)}
            </span>
          ))}
        </div>

        {hover && (
          <TooltipBox xPct={hover.xPct}>
            <p className="font-bold text-slate-200 mb-0.5">{shortDate(dates[hover.index])}</p>
            {series.map(s => (
              <p key={s.name} className="text-slate-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: s.color }} />
                {s.name}: <span className="text-slate-200 font-semibold tabular-nums">{nf(s.values[hover.index])}</span>
              </p>
            ))}
          </TooltipBox>
        )}
      </div>

      {/* Nhãn ngày */}
      <div className="flex justify-between mt-1.5">
        {dates.map((d, i) => (
          <span key={d} className="flex-1 text-center text-[9px] text-slate-500">
            {i % labelEvery === 0 ? shortDate(d) : ''}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── BarChart — cột đơn series, bo 4px đầu dữ liệu, tooltip per-bar ─────────────

interface BarChartProps {
  dates: string[];
  values: number[];
  color: string;
  /** Nhãn hiển thị trong tooltip, vd "người dùng mới" */
  unitLabel: string;
  height?: number;
}

export function BarChart({ dates, values, color, unitLabel, height = 160 }: BarChartProps) {
  const [hover, setHover] = useState<TooltipState | null>(null);
  const n = values.length;
  const max = Math.max(1, ...values);
  const labelEvery = Math.max(1, Math.ceil(n / 6));

  return (
    <div>
      <div className="relative flex items-end gap-0.5" style={{ height }}>
        {values.map((v, i) => (
          <div
            key={dates[i]}
            className="flex-1 h-full flex flex-col justify-end cursor-default"
            onMouseEnter={() => setHover({ index: i, xPct: ((i + 0.5) / n) * 100 })}
            onMouseLeave={() => setHover(null)}
          >
            <div
              className="w-full rounded-t transition-opacity"
              style={{
                height: `${Math.max((v / max) * 100, v > 0 ? 3 : 1)}%`,
                backgroundColor: v > 0 ? color : CHART_COLORS.grid,
                opacity: hover && hover.index !== i ? 0.4 : 1,
              }}
            />
          </div>
        ))}

        {hover && (
          <TooltipBox xPct={hover.xPct}>
            <p className="font-bold text-slate-200 mb-0.5">{shortDate(dates[hover.index])}</p>
            <p className="text-slate-400">
              <span className="text-slate-200 font-semibold tabular-nums">{nf(values[hover.index])}</span> {unitLabel}
            </p>
          </TooltipBox>
        )}
      </div>
      <div className="flex justify-between mt-1.5">
        {dates.map((d, i) => (
          <span key={d} className="flex-1 text-center text-[9px] text-slate-500">
            {i % labelEvery === 0 ? shortDate(d) : ''}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── DonutChart — khe 2px màu surface giữa các segment, legend kèm giá trị ──────

export interface DonutSlice {
  label: string;
  value: number;
  color: string;
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const rad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const x1 = cx + r * Math.cos(rad(startDeg));
  const y1 = cy + r * Math.sin(rad(startDeg));
  const x2 = cx + r * Math.cos(rad(endDeg));
  const y2 = cy + r * Math.sin(rad(endDeg));
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M${x1.toFixed(2)},${y1.toFixed(2)}A${r},${r},0,${largeArc},1,${x2.toFixed(2)},${y2.toFixed(2)}`;
}

export function DonutChart({ slices, centerLabel }: { slices: DonutSlice[]; centerLabel: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const total = slices.reduce((s, x) => s + x.value, 0);
  const visible = slices.filter(s => s.value > 0);

  const SIZE = 140;
  const R = 56;
  const STROKE = 18;

  const arcs = useMemo(() => {
    if (total === 0) return [];
    let angle = 0;
    return visible.map(s => {
      const sweep = (s.value / total) * 360;
      const arc = { ...s, start: angle, end: angle + sweep };
      angle += sweep;
      return arc;
    });
  }, [visible, total]);

  return (
    <div className="flex items-center gap-6">
      <div className="relative shrink-0">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          {total === 0 ? (
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke={CHART_COLORS.grid} strokeWidth={STROKE} />
          ) : arcs.length === 1 ? (
            <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke={arcs[0].color} strokeWidth={STROKE} />
          ) : arcs.map((a, i) => (
            <path
              key={a.label}
              d={arcPath(SIZE / 2, SIZE / 2, R, a.start, a.end)}
              fill="none"
              stroke={a.color}
              // Khe 2px màu surface giữa các segment: vẽ đè viền surface phía sau bằng linecap
              strokeWidth={hovered === i ? STROKE + 4 : STROKE}
              strokeLinecap="butt"
              opacity={hovered !== null && hovered !== i ? 0.4 : 1}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="transition-all cursor-default"
            />
          ))}
          {/* Khe tách segment — vẽ tia surface 2px tại mỗi ranh giới */}
          {arcs.length > 1 && arcs.map(a => {
            const rad = ((a.start - 90) * Math.PI) / 180;
            const inner = R - STROKE / 2 - 3;
            const outer = R + STROKE / 2 + 3;
            return (
              <line
                key={`gap-${a.label}`}
                x1={SIZE / 2 + inner * Math.cos(rad)} y1={SIZE / 2 + inner * Math.sin(rad)}
                x2={SIZE / 2 + outer * Math.cos(rad)} y2={SIZE / 2 + outer * Math.sin(rad)}
                stroke={CHART_COLORS.surface} strokeWidth={2}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xl font-bold text-white tabular-nums">{nf(total)}</p>
          <p className="text-[9px] text-slate-500 uppercase tracking-wider">{centerLabel}</p>
        </div>
      </div>

      {/* Legend kèm giá trị — identity không bao giờ chỉ nằm ở màu */}
      <div className="flex-1 space-y-2.5 min-w-0">
        {slices.map((s) => {
          const pct = total > 0 ? Math.round((s.value / total) * 100) : 0;
          const visIdx = visible.indexOf(s);
          return (
            <div
              key={s.label}
              className="flex items-center gap-2"
              onMouseEnter={() => visIdx >= 0 && setHovered(visIdx)}
              onMouseLeave={() => setHovered(null)}
            >
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
              <span className="text-xs text-slate-400 flex-1 truncate">{s.label}</span>
              <span className="text-xs font-bold text-slate-200 tabular-nums">{nf(s.value)}</span>
              <span className="text-[10px] text-slate-500 tabular-nums w-9 text-right">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
