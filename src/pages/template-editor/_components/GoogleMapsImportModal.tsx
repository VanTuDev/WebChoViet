import { useRef, useState } from 'react';
import { MapPin, Sparkles, X, Loader2, AlertCircle } from 'lucide-react';
import { autofillTemplateFromGoogleMaps } from '../../../services/googleMapsImportService';
import type { AutofillResult } from '../../../services/googleMapsImportService';
import type { ImageSlot } from '../../../data/templates/registry';

interface Props {
  templateSchema: Record<string, unknown>;
  imageSlots: ImageSlot[];
  onSuccess: (result: AutofillResult) => void;
  onClose: () => void;
}

const GOOGLE_MAPS_URL_REGEX = /^https?:\/\/(www\.)?(google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps|g\.page)/i;

export default function GoogleMapsImportModal({ templateSchema, imageSlots, onSuccess, onClose }: Props) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  const handleSubmit = async () => {
    const trimmed = url.trim();
    if (!GOOGLE_MAPS_URL_REGEX.test(trimmed)) {
      setError('Link phải là link Google Maps hợp lệ (google.com/maps/..., maps.app.goo.gl/...).');
      return;
    }

    setError('');
    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const result = await autofillTemplateFromGoogleMaps(trimmed, templateSchema, imageSlots, controller.signal);
      onSuccess(result);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Tạo tự động thất bại. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (loading) abortRef.current?.abort();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={e => { if (e.target === e.currentTarget) handleClose(); }}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-5 text-white">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span className="text-sm font-bold">Tạo từ Google Maps</span>
            </div>
            <button onClick={handleClose} className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-[11px] text-white/80">AI đọc thông tin, đánh giá và ảnh của quán trên Google Maps — tự điền nội dung, chọn ảnh món thật cho phần thực đơn</p>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wide">
              Link Google Maps
            </label>
            <input
              type="text"
              value={url}
              onChange={e => { setUrl(e.target.value); setError(''); }}
              onKeyDown={e => { if (e.key === 'Enter' && !loading) handleSubmit(); }}
              placeholder="https://maps.app.goo.gl/..."
              disabled={loading}
              className="w-full text-sm font-medium text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-emerald-600 transition-all disabled:bg-gray-50 disabled:text-gray-400"
              autoFocus
            />
            <p className="text-[10px] text-gray-400 mt-1.5">
              Dán link chia sẻ của quán từ Google Maps (app điện thoại hoặc trình duyệt đều được).
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-1.5 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {loading && (
            <div className="flex items-start gap-1.5 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2.5">
              <Loader2 className="w-3.5 h-3.5 shrink-0 mt-0.5 animate-spin" />
              <span>Đang phân tích Google Maps và tạo nội dung bằng AI... Bước này có thể mất 1-2 phút, đừng đóng cửa sổ này.</span>
            </div>
          )}

          <div className="flex gap-2.5 pt-1">
            <button
              onClick={handleClose}
              className="flex-1 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
            >
              {loading ? 'Huỷ' : 'Đóng'}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!url.trim() || loading}
              className="flex-1 py-2.5 text-sm font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              {loading ? 'Đang tạo...' : 'Tạo tự động'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
