import { useState } from 'react';
import { ChevronDown, ChevronRight, Image as ImageIcon, Plus, Trash2, Link, Map, AlertCircle, CheckCircle2 } from 'lucide-react';
import { isGoogleMapsEmbedUrl } from '../../../utils/googleMaps';
import type { ImageSlot } from '../../../data/templates/registry';
import ImageCropModal from './ImageCropModal';

interface Props {
  schema: Record<string, unknown>;
  customData: Record<string, unknown>;
  imageSlots: ImageSlot[];
  images: Record<string, string>;
  /** Called when a scalar field changes (path → string value) */
  onChange: (path: string[], value: string) => void;
  /** Called when an array-of-objects field changes (path → whole new array) */
  onArrayChange: (path: string[], newArray: Record<string, unknown>[]) => void;
  /** Called when an image slot changes */
  onImageChange: (key: string, dataUrl: string) => void;
  /** Called when a section header is clicked — scroll preview to that section */
  onSectionFocus?: (sectionKey: string) => void;
}

// ── Section toggle ──────────────────────────────────────────────────────────

function Section({
  title,
  sectionKey,
  onFocus,
  children,
}: {
  title: string;
  sectionKey?: string;
  onFocus?: (key: string) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const handleClick = () => {
    setOpen(o => !o);
    if (onFocus && sectionKey) onFocus(sectionKey);
  };
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={handleClick}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">{title}</span>
        {open ? <ChevronDown className="w-3.5 h-3.5 text-gray-400" /> : <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
      </button>
      {open && <div className="px-4 pb-4 space-y-3">{children}</div>}
    </div>
  );
}

// ── String field ─────────────────────────────────────────────────────────────

function StringField({ label, value, path, onChange }: {
  label: string;
  value: string;
  path: string[];
  onChange: (path: string[], value: string) => void;
}) {
  const isLong = value.length > 60;
  return (
    <div>
      <label className="block text-xs font-medium text-gray-400 capitalize mb-1">
        {label.replace(/_/g, ' ')}
      </label>
      {isLong ? (
        <textarea
          className="w-full text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:border-orange-400 transition-all"
          rows={3}
          value={value}
          onChange={e => onChange(path, e.target.value)}
        />
      ) : (
        <input
          type="text"
          className="w-full text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400 transition-all"
          value={value}
          onChange={e => onChange(path, e.target.value)}
        />
      )}
    </div>
  );
}

// ── Link field (URL input) ────────────────────────────────────────────────────

function LinkField({ label, value, path, onChange }: {
  label: string;
  value: string;
  path: string[];
  onChange: (path: string[], value: string) => void;
}) {
  return (
    <div>
      <label className="flex items-center gap-1 text-xs font-medium text-gray-400 mb-1 capitalize">
        <Link className="w-3 h-3" />
        {label.replace(/_/g, ' ')}
      </label>
      <input
        type="url"
        placeholder="https://..."
        className="w-full text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-400 transition-all"
        value={value}
        onChange={e => onChange(path, e.target.value)}
      />
    </div>
  );
}

// ── Google Maps embed field ────────────────────────────────────────────────────

/** Extract src URL from a raw <iframe ...> HTML string, or return the string as-is if already a URL */
function extractMapSrc(raw: string): string {
  const match = raw.match(/src="([^"]+)"/);
  return match ? match[1] : raw.trim();
}

function MapEmbedField({ value, path, onChange }: {
  value: string;
  path: string[];
  onChange: (path: string[], value: string) => void;
}) {
  const isValid = value ? isGoogleMapsEmbedUrl(value) : null;

  const handleChange = (raw: string) => {
    const extracted = extractMapSrc(raw);
    onChange(path, extracted);
  };

  return (
    <div className="rounded-xl border border-orange-100 bg-orange-50/50 p-3 space-y-2">
      <label className="flex items-center gap-1.5 text-xs font-bold text-orange-700">
        <Map className="w-3.5 h-3.5" />
        Nhúng Google Maps
      </label>

      <ol className="text-[10px] text-orange-600 space-y-0.5 list-none">
        <li>1. Mở Google Maps → tìm địa điểm</li>
        <li>2. Nhấn <strong>Chia sẻ</strong> → tab <strong>Nhúng bản đồ</strong></li>
        <li>3. Nhấn <strong>Sao chép HTML</strong> rồi dán thẳng vào đây</li>
      </ol>

      <div className="relative">
        <textarea
          rows={3}
          placeholder={'Dán code HTML <iframe ...> hoặc link embed vào đây...'}
          className={`w-full text-xs text-gray-800 bg-white border rounded-lg px-3 py-2 pr-8 focus:outline-none transition-all resize-none ${
            isValid === false
              ? 'border-amber-400 focus:border-amber-500'
              : 'border-orange-200 focus:border-orange-400'
          }`}
          value={value}
          onChange={e => handleChange(e.target.value)}
        />
        {value && (
          <span className="absolute right-2.5 top-3">
            {isValid
              ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              : <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
            }
          </span>
        )}
      </div>

      {value && !isValid && (
        <p className="text-[10px] text-amber-600 leading-relaxed">
          Link không đúng định dạng embed. Hãy dùng tính năng <strong>Nhúng bản đồ</strong> trong Google Maps (không phải link chia sẻ thông thường).
        </p>
      )}

      {value && isValid && (
        <div className="rounded-lg overflow-hidden border border-emerald-200 h-36">
          <iframe
            src={value}
            className="w-full h-full border-0"
            title="Xem trước bản đồ"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}
    </div>
  );
}

// ── Menu item editor (array of objects with image) ───────────────────────────

function MenuArrayEditor({
  label,
  path,
  schemaItems,
  currentItems,
  images,
  onArrayChange,
  onImageChange,
}: {
  label: string;
  path: string[];
  schemaItems: Record<string, unknown>[];
  currentItems: Record<string, unknown>[];
  images: Record<string, string>;
  onArrayChange: (path: string[], arr: Record<string, unknown>[]) => void;
  onImageChange: (key: string, dataUrl: string) => void;
}) {
  const [cropTarget, setCropTarget] = useState<{ key: string; label: string; currentUrl?: string } | null>(null);
  const imgKey = (i: number) => `${path.join('_')}_${i}`;

  const template = schemaItems[0] ?? {};

  const updateItem = (index: number, field: string, value: string) => {
    const next = currentItems.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onArrayChange(path, next);
  };

  const addItem = () => {
    onArrayChange(path, [...currentItems, { ...template }]);
  };

  const removeItem = (index: number) => {
    onArrayChange(path, currentItems.filter((_, i) => i !== index));
  };

  const stringFields = Object.keys(template).filter(k => typeof template[k] === 'string');

  return (
    <div>
      <p className="text-xs font-medium text-gray-400 mb-2 capitalize">{label.replace(/_/g, ' ')}</p>
      <div className="space-y-3">
        {currentItems.map((item, i) => {
          const key = imgKey(i);
          const imgSrc = images[key] ?? '';
          return (
            <div key={i} className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
              {/* Image + remove row */}
              <div className="flex items-center gap-3 p-3 border-b border-gray-100">
                <button
                  onClick={() => setCropTarget({ key, label: `${label} ${i + 1}`, currentUrl: imgSrc || undefined })}
                  className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-200 shrink-0 hover:ring-2 hover:ring-orange-400 transition-all group"
                >
                  {imgSrc ? (
                    <img src={imgSrc} className="w-full h-full object-cover" alt="" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-5 h-5 text-gray-400" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-white text-[10px] font-bold">Đổi ảnh</span>
                  </div>
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-700 truncate">
                    {(item['name'] as string) || (item['title'] as string) || `Món ${i + 1}`}
                  </p>
                  <p className="text-[10px] text-gray-400">{(item['price'] as string) || ''}</p>
                </div>
                <button
                  onClick={() => removeItem(i)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-red-50 text-gray-300 hover:text-red-500 transition-colors shrink-0"
                  title="Xóa món"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Fields */}
              <div className="p-3 space-y-2">
                {stringFields.map(field => (
                  <div key={field}>
                    <label className="block text-[10px] text-gray-400 capitalize mb-0.5">{field}</label>
                    <input
                      type="text"
                      className="w-full text-xs text-gray-800 bg-white border border-gray-200 rounded-md px-2 py-1.5 focus:outline-none focus:border-orange-400 transition-all"
                      value={(item[field] as string) ?? ''}
                      onChange={e => updateItem(i, field, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <button
          onClick={addItem}
          className="w-full flex items-center justify-center gap-1.5 py-2.5 border-2 border-dashed border-gray-200 rounded-xl text-xs font-semibold text-gray-400 hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50/50 transition-all"
        >
          <Plus className="w-3.5 h-3.5" /> Thêm món
        </button>
      </div>

      {cropTarget && (
        <ImageCropModal
          imageKey={cropTarget.key}
          label={cropTarget.label}
          currentUrl={cropTarget.currentUrl}
          onConfirm={onImageChange}
          onClose={() => setCropTarget(null)}
        />
      )}
    </div>
  );
}

// ── Image slot ────────────────────────────────────────────────────────────────

function ImageSlotItem({ slot, currentUrl, onEdit }: {
  slot: ImageSlot;
  currentUrl?: string;
  onEdit: (slot: ImageSlot) => void;
}) {
  const src = currentUrl ?? slot.defaultUrl;
  return (
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
        {src ? (
          <img src={src} alt={slot.label} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-gray-300" />
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-700 truncate">{slot.label}</p>
        {currentUrl && <p className="text-[10px] text-green-600 mt-0.5">Đã thay đổi</p>}
      </div>
      <button
        onClick={() => onEdit(slot)}
        className="shrink-0 px-3 py-1.5 text-xs font-semibold text-orange-600 border border-orange-200 rounded-full hover:bg-orange-50 transition-colors"
      >
        Đổi
      </button>
    </div>
  );
}

// ── Recursive generic renderer (for non-array-of-objects fields) ──────────────

function renderFields(
  schemaObj: Record<string, unknown>,
  customData: Record<string, unknown>,
  path: string[],
  onChange: (path: string[], value: string) => void,
  onArrayChange: (path: string[], arr: Record<string, unknown>[]) => void,
  images: Record<string, string>,
  onImageChange: (key: string, dataUrl: string) => void,
): React.ReactNode {
  return Object.entries(schemaObj).map(([key, val]) => {
    const currentPath = [...path, key];
    // customData is already narrowed to the current schema level, so override is just customData[key]
    const override = customData[key];

    if (typeof val === 'string') {
      const displayVal = typeof override === 'string' ? override : val;

      // Google Maps embed field
      if (key === 'mapUrl') {
        return (
          <MapEmbedField
            key={currentPath.join('.')}
            value={displayVal}
            path={currentPath}
            onChange={onChange}
          />
        );
      }

      // Generic link field — key ends with Url or Link (case-insensitive)
      if (/url$/i.test(key) || /link$/i.test(key)) {
        return (
          <LinkField
            key={currentPath.join('.')}
            label={key}
            value={displayVal}
            path={currentPath}
            onChange={onChange}
          />
        );
      }

      return (
        <StringField
          key={currentPath.join('.')}
          label={key}
          value={displayVal}
          path={currentPath}
          onChange={onChange}
        />
      );
    }

    if (Array.isArray(val)) {
      // Array of objects → Menu-style editor
      if (val.length > 0 && typeof val[0] === 'object' && val[0] !== null) {
        const schemaItems = val as Record<string, unknown>[];
        const currentItems = Array.isArray(override) ? override as Record<string, unknown>[] : schemaItems;
        return (
          <MenuArrayEditor
            key={currentPath.join('.')}
            label={key}
            path={currentPath}
            schemaItems={schemaItems}
            currentItems={currentItems}
            images={images}
            onArrayChange={onArrayChange}
            onImageChange={onImageChange}
          />
        );
      }
      // Array of strings → simple list
      const strArr = val as string[];
      return (
        <div key={currentPath.join('.')}>
          <p className="text-xs font-medium text-gray-400 mb-1 capitalize">{key.replace(/_/g, ' ')}</p>
          <div className="pl-3 border-l-2 border-gray-100 space-y-2">
            {strArr.map((item, i) => {
              const itemOverride = Array.isArray(override) ? (override[i] as string) ?? item : item;
              return (
                <StringField
                  key={i}
                  label={`${key} ${i + 1}`}
                  value={itemOverride}
                  path={[...currentPath, String(i)]}
                  onChange={onChange}
                />
              );
            })}
          </div>
        </div>
      );
    }

    if (typeof val === 'object' && val !== null) {
      return (
        <div key={currentPath.join('.')}>
          <p className="text-xs font-medium text-gray-400 mt-2 mb-1 capitalize">{key.replace(/_/g, ' ')}</p>
          <div className="pl-3 border-l-2 border-gray-100 space-y-2">
            {renderFields(
              val as Record<string, unknown>,
              (override as Record<string, unknown>) ?? {},
              currentPath,
              onChange,
              onArrayChange,
              images,
              onImageChange,
            )}
          </div>
        </div>
      );
    }

    return null;
  });
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function EditorPanel({
  schema,
  customData,
  imageSlots,
  images,
  onChange,
  onArrayChange,
  onImageChange,
  onSectionFocus,
}: Props) {
  const [cropTarget, setCropTarget] = useState<ImageSlot | null>(null);
  const sectionKeys = Object.keys(schema);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        {/* Static image slots (hero, gallery, etc.) */}
        {imageSlots.length > 0 && (
          <Section title="Ảnh" sectionKey="hero" onFocus={onSectionFocus}>
            <div className="space-y-3">
              {imageSlots.map(slot => (
                <ImageSlotItem
                  key={slot.key}
                  slot={slot}
                  currentUrl={images[slot.key]}
                  onEdit={setCropTarget}
                />
              ))}
            </div>
          </Section>
        )}

        {/* Text/menu sections from i18n JSON */}
        {sectionKeys.map(section => {
          const sectionVal = schema[section];
          if (typeof sectionVal !== 'object' || sectionVal === null) return null;
          const sectionOverride = (customData[section] as Record<string, unknown>) ?? {};
          return (
            <Section key={section} title={section} sectionKey={section} onFocus={onSectionFocus}>
              {renderFields(
                sectionVal as Record<string, unknown>,
                sectionOverride,
                [section],
                onChange,
                onArrayChange,
                images,
                onImageChange,
              )}
            </Section>
          );
        })}
      </div>

      {cropTarget && (
        <ImageCropModal
          imageKey={cropTarget.key}
          label={cropTarget.label}
          currentUrl={images[cropTarget.key] ?? (cropTarget.defaultUrl || undefined)}
          onConfirm={onImageChange}
          onClose={() => setCropTarget(null)}
        />
      )}
    </div>
  );
}
