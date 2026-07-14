import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, CheckCircle2, Copy, ExternalLink, ArrowLeft, X, Loader2, Lock } from 'lucide-react';
import { slugify } from '../../../services/siteConfigService';
import { getPublicSiteUrl } from '../../../utils/tenant';
import { ROUTES } from '../../../config/routes';
import type { EffectiveTemplateAccess } from '../../../hooks/useTemplateAccess';

type Step = 'name' | 'payment' | 'success';

const PLAN_LABEL_VI: Record<string, string> = {
  free: 'Khởi Nghiệp',
  pro: 'Kinh Doanh WebPro',
  ultra: 'Thương Hiệu Ultra',
};

interface Props {
  siteName: string;
  siteSlug: string;
  templateName: string;
  /** Điều kiện truy cập hiệu lực của template (override admin hoặc giá tĩnh registry) */
  access: EffectiveTemplateAccess;
  /** User hiện tại có đủ gói (minPlan) để dùng template này không */
  hasPlan: boolean;
  /** Site đã published từ trước — nghĩa là đã qua cửa thanh toán rồi, sửa/xuất bản lại không cần trả tiền lần nữa */
  alreadyPublished: boolean;
  slugError: string;
  /** Publish trực tiếp — dùng khi template free hoặc đã mua rồi */
  onPublish: (name: string) => Promise<string>;
  /** Lưu draft + tạo checkout PayOS thật + redirect — dùng khi template còn phải trả phí */
  onCheckout: (name: string) => Promise<void>;
  onClose: () => void;
}

export default function PublishModal({
  siteName, siteSlug, templateName, access, hasPlan, alreadyPublished, slugError, onPublish, onCheckout, onClose,
}: Props) {
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState(siteName);
  const [finalSlug, setFinalSlug] = useState('');
  const [publishing, setPublishing] = useState(false);
  const [copied, setCopied] = useState(false);
  const isFree = access.price === 0;
  // Site đã publish từ trước (đã qua cửa thanh toán) — sửa tên/nội dung rồi "xuất bản" lại
  // không cần đi qua bước thanh toán nữa, kể cả khi template vẫn đang tính phí cho user mới.
  const skipPayment = isFree || alreadyPublished;
  const slugPreview = slugify(name || siteName);
  const liveUrl = getPublicSiteUrl(finalSlug || slugPreview);

  const doPublish = async () => {
    setPublishing(true);
    try {
      const slug = await onPublish(name.trim() || siteName);
      setFinalSlug(slug);
      setStep('success');
    } catch {
      // Lỗi đã được hiển thị qua snackbar ở TemplateEditorPage.handlePublish
    } finally {
      setPublishing(false);
    }
  };

  const doCheckout = async () => {
    setPublishing(true);
    try {
      await onCheckout(name.trim() || siteName);
      // Redirect PayOS xảy ra trong onCheckout — không cần setPublishing(false) vì trang sẽ điều hướng đi.
    } catch {
      setPublishing(false);
      // Lỗi đã được hiển thị qua snackbar ở TemplateEditorPage
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(liveUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const primaryCta = !hasPlan
    ? null // Nâng cấp gói — render riêng bên dưới
    : skipPayment
      ? { label: 'Xuất bản ngay', action: doPublish }
      : { label: 'Tiếp theo →', action: () => setStep('payment') };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">

        {/* ── Step 1: Name ───────────────────────────────────────────────── */}
        {step === 'name' && (
          <>
            <div className="bg-gradient-to-r from-primary to-primary-container p-5 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center">
                    <Globe className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-bold">Xuất bản website</span>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
              {/* Steps */}
              <div className="flex items-center gap-1.5 text-[11px]">
                <span className="bg-white text-primary font-extrabold px-2 py-0.5 rounded-full">1 Đặt tên</span>
                <span className="text-white/40">›</span>
                {skipPayment
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
                  onKeyDown={e => { if (e.key === 'Enter' && name.trim() && !slugError && primaryCta) primaryCta.action(); }}
                  className="w-full text-sm font-medium text-gray-800 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary transition-all"
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
                  <span className="font-mono text-primary-container truncate max-w-45">/{slugPreview}</span>
                </div>
                {!hasPlan && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Yêu cầu gói</span>
                    <span className="font-semibold text-amber-600">{PLAN_LABEL_VI[access.minPlan]} trở lên</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-1.5 border-t border-gray-100">
                  <span className="text-gray-500 font-medium">Chi phí</span>
                  {isFree
                    ? <span className="font-extrabold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Miễn phí</span>
                    : <span className="font-extrabold text-primary">{access.price.toLocaleString('vi-VN')}đ</span>
                  }
                </div>
              </div>

              {!hasPlan ? (
                <div className="space-y-2.5 pt-1">
                  <div className="flex items-start gap-2 bg-amber-50 border border-amber-100 rounded-xl p-3 text-xs text-amber-700">
                    <Lock className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>Mẫu này yêu cầu gói <strong>{PLAN_LABEL_VI[access.minPlan]}</strong> trở lên. Nâng cấp gói để tiếp tục.</span>
                  </div>
                  <div className="flex gap-2.5">
                    <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                      Hủy
                    </button>
                    <Link
                      to={ROUTES.PRICING}
                      className="flex-1 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-[#b33912] transition-colors flex items-center justify-center gap-1.5"
                    >
                      Nâng cấp gói
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2.5 pt-1">
                  <button onClick={onClose} className="flex-1 py-2.5 text-sm font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                    Hủy
                  </button>
                  <button
                    onClick={primaryCta?.action}
                    disabled={!name.trim() || !!slugError || publishing}
                    className="flex-1 py-2.5 text-sm font-bold text-white bg-primary rounded-xl hover:bg-[#b33912] disabled:opacity-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:cursor-not-allowed"
                  >
                    {publishing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : null}
                    {publishing ? 'Đang xuất bản...' : primaryCta?.label}
                  </button>
                </div>
              )}
            </div>
          </>
        )}

        {/* ── Step 2: Payment (redirect PayOS thật) ─────────────────────── */}
        {step === 'payment' && (
          <>
            <div className="bg-gradient-to-r from-[#00b4a6] to-[#0096a0] p-5 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button onClick={() => setStep('name')} className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <span className="text-sm font-bold">Thanh toán · PayOS</span>
                </div>
                <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="text-center">
                <p className="text-2xl font-extrabold text-gray-900">
                  {access.price.toLocaleString('vi-VN')}<span className="text-sm font-semibold text-gray-500">đ</span>
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{templateName}</p>
              </div>

              <p className="text-xs text-gray-500 text-center leading-relaxed">
                Bấm nút bên dưới để chuyển sang cổng thanh toán PayOS. Sau khi thanh toán xong,
                bạn sẽ được đưa trở lại và website sẽ tự động xuất bản.
              </p>

              <button
                onClick={doCheckout}
                disabled={publishing}
                className="w-full py-3 text-sm font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              >
                {publishing ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
                {publishing ? 'Đang chuyển đến PayOS...' : 'Thanh toán qua PayOS'}
              </button>
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
                  <span className="flex-1 text-xs font-mono font-bold text-primary truncate">{liveUrl}</span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg hover:bg-gray-200 transition-colors text-gray-400 cursor-pointer"
                  >
                    {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex gap-2.5">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 text-xs font-semibold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Về chỉnh sửa
                </button>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 text-xs font-bold text-white bg-primary rounded-xl hover:bg-[#b33912] transition-colors flex items-center justify-center gap-1.5"
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
