import { useState, useEffect } from 'react';
import { Globe, CheckCircle2, Copy, ExternalLink, ArrowLeft, X, Loader2, Clock } from 'lucide-react';
import { slugify } from '../../../services/siteConfigService';

type Step = 'name' | 'payment' | 'success';

interface Props {
  siteName: string;
  siteSlug: string;
  templateName: string;
  templatePrice: number;
  slugError: string;
  onPublish: (name: string) => Promise<string>;
  onClose: () => void;
}

// ── Fake QR grid ─────────────────────────────────────────────────────────────

function FakeQR() {
  const S = 17;
  const isFinderEdge = (r: number, c: number, or: number, oc: number) => {
    const lr = r - or, lc = c - oc;
    return lr >= 0 && lr <= 6 && lc >= 0 && lc <= 6
      && (lr === 0 || lr === 6 || lc === 0 || lc === 6 || (lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4));
  };
  const cells = Array.from({ length: S * S }, (_, i) => {
    const r = Math.floor(i / S), c = i % S;
    if (isFinderEdge(r, c, 0, 0) || isFinderEdge(r, c, 0, S - 7) || isFinderEdge(r, c, S - 7, 0)) return true;
    return (r * 13 + c * 7 + r + c) % 3 === 0;
  });
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${S},1fr)`, gap: 1.5, width: 160, height: 160, padding: 8, backgroundColor: '#fff', borderRadius: 12 }}>
      {cells.map((on, i) => (
        <div key={i} style={{ backgroundColor: on ? '#111' : '#fff', borderRadius: on ? 1 : 0 }} />
      ))}
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function PublishModal({
  siteName, siteSlug, templateName, templatePrice, slugError, onPublish, onClose,
}: Props) {
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState(siteName);
  const [finalSlug, setFinalSlug] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState(15 * 60);
  const isFree = templatePrice === 0;
  const slugPreview = slugify(name || siteName);
  const liveUrl = `${window.location.origin}/p/${finalSlug || slugPreview}`;

  useEffect(() => {
    if (step !== 'payment') return;
    const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [step]);

  const fmt = (s: number) =>
    `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`;

  const doPublish = async () => {
    setPublishing(true);
    try {
      const slug = await onPublish(name.trim() || siteName);
      setFinalSlug(slug);
      setStep('success');
    } finally {
      setPublishing(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mockOrderId = `WCV-${siteSlug.slice(0, 6).toUpperCase()}-${Date.now().toString().slice(-5)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">

        {/* ── Step 1: Name ───────────────────────────────────────────────── */}
        {step === 'name' && (
          <>
            <div className="bg-gradient-to-r from-[#003f87] to-[#0056b3] p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-bold">Xuất bản website</span>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* Steps */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="bg-white text-[#003f87] font-extrabold px-2 py-0.5 rounded-full">1 Đặt tên</span>
                <span className="text-white/40">›</span>
                {isFree
                  ? <span className="text-white/60">2 Hoàn thành</span>
                  : <>
                    <span className="text-white/60">2 Thanh toán</span>
                    <span className="text-white/40">›</span>
                    <span className="text-white/60">3 Hoàn thành</span>
                  </>
                }
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">Tên website</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && name.trim() && !slugError) doPublish(); }}
                  className="w-full text-sm font-medium text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-[#003f87] transition-all"
                  placeholder="Ví dụ: Quán Cafe Vườn Xanh"
                  autoFocus
                />
              </div>

              <div className="bg-gray-50 rounded-xl p-3.5 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Template</span>
                  <span className="font-semibold text-gray-700">{templateName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">URL live</span>
                  <span className="font-mono text-[#0056b3] truncate max-w-[150px]">/p/{slugPreview}</span>
                </div>
                <div className="flex items-center justify-between pt-1.5 border-t border-gray-100">
                  <span className="text-gray-500 font-medium">Chi phí</span>
                  {isFree
                    ? <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Miễn phí</span>
                    : <span className="font-extrabold text-[#003f87]">{templatePrice.toLocaleString('vi-VN')}đ</span>
                  }
                </div>
              </div>

              <div className="flex gap-2.5 pt-1">
                <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  Hủy
                </button>
                <button
                  onClick={isFree ? doPublish : () => setStep('payment')}
                  disabled={!name.trim() || !!slugError || publishing}
                  className="flex-1 py-2.5 text-sm font-bold text-white bg-[#003f87] rounded-xl hover:bg-[#002d63] disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5"
                >
                  {publishing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                  {publishing ? 'Đang xuất bản...' : isFree ? 'Xuất bản ngay' : 'Tiếp theo →'}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── Step 2: Payment ────────────────────────────────────────────── */}
        {step === 'payment' && (
          <>
            <div className="bg-gradient-to-r from-[#00b4a6] to-[#0096a0] p-5 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => setStep('name')} className="p-1 rounded-full hover:bg-white/20 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold">Thanh toán · PayOS</span>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Amount */}
              <div className="text-center">
                <p className="text-2xl font-extrabold text-gray-900">
                  {templatePrice.toLocaleString('vi-VN')}<span className="text-sm font-semibold text-gray-500">đ</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{templateName}</p>
                <p className="text-[10px] font-mono text-gray-400 mt-0.5">{mockOrderId}</p>
              </div>

              {/* QR */}
              <div className="flex justify-center">
                <div className="border border-gray-100 rounded-2xl p-3 shadow-inner">
                  <FakeQR />
                </div>
              </div>

              {/* Bank info */}
              <div className="bg-gray-50 rounded-xl p-3 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Ngân hàng</span>
                  <span className="font-bold text-gray-700">MB Bank</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Số tài khoản</span>
                  <span className="font-mono font-bold text-gray-700">9876 5432 10</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Chủ tài khoản</span>
                  <span className="font-bold text-gray-700">CONG TY WEBCHOVIET</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-100">
                  <span className="text-gray-400">Nội dung CK</span>
                  <span className="font-mono font-bold text-[#003f87]">{mockOrderId}</span>
                </div>
              </div>

              {/* Countdown */}
              <div className="flex items-center justify-center gap-1.5 text-xs text-amber-600">
                <Clock className="w-3.5 h-3.5" />
                <span>Hết hạn sau: <strong className="font-mono">{fmt(countdown)}</strong></span>
              </div>

              <button
                onClick={doPublish}
                disabled={publishing}
                className="w-full py-3 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                {publishing ? 'Đang xử lý...' : 'Đã thanh toán (Demo)'}
              </button>

              <p className="text-[10px] text-center text-gray-400">Môi trường demo · Không có giao dịch thật</p>
            </div>
          </>
        )}

        {/* ── Step 3: Success ────────────────────────────────────────────── */}
        {step === 'success' && (
          <>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-6 text-white text-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-lg font-extrabold">Xuất bản thành công!</h2>
              <p className="text-xs text-white/80 mt-1">Website của bạn đã live trên internet</p>
            </div>

            <div className="p-5 space-y-4">
              <div className="bg-gray-50 rounded-xl p-3.5">
                <p className="text-[11px] text-gray-400 mb-1.5">Đường link website của bạn</p>
                <div className="flex items-center gap-2">
                  <span className="flex-1 text-xs font-mono font-bold text-[#003f87] truncate">{liveUrl}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-gray-400"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 text-xs font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Về chỉnh sửa
                </button>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-[#003f87] rounded-xl hover:bg-[#002d63] transition-colors flex items-center justify-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Xem website
                </a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
