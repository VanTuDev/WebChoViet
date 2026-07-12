// Thanh nút liên hệ nhanh nổi cố định — dùng chung cho MỌI template (render 1 lần ở
// PublicSitePage, không cần sửa từng file template). Chỉ hiện nút nào chủ site đã điền.
import { Phone, Facebook } from 'lucide-react';

interface Props {
  phone?: string;
  zalo?: string;
  facebook?: string;
}

function digitsOnly(v: string): string {
  return v.replace(/[^\d+]/g, '');
}

export default function FloatingContactBar({ phone, zalo, facebook }: Props) {
  const cleanPhone = phone?.trim();
  const cleanZalo = zalo?.trim();
  const cleanFacebook = facebook?.trim();

  if (!cleanPhone && !cleanZalo && !cleanFacebook) return null;

  return (
    // Lệch theo breakpoint để né các phần tử fixed-bottom riêng của một số template:
    // - mobile: thanh nav dưới full-width (vd Restaurant-4, Wedding-3) chỉ hiện <md nên nâng cao hẳn
    // - desktop (lg+): badge địa chỉ nổi góc trái dưới của Spa-1 chỉ hiện ở lg+ nên cũng nâng cao
    <div className="fixed bottom-24 left-4 md:bottom-5 md:left-5 lg:bottom-28 z-50 flex flex-col-reverse items-start gap-2.5">
      {cleanPhone && (
        <a
          href={`tel:${digitsOnly(cleanPhone)}`}
          title={`Gọi ${cleanPhone}`}
          aria-label={`Gọi ${cleanPhone}`}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/40 hover:scale-110 active:scale-95 transition-transform animate-[pulse_2.5s_ease-in-out_infinite]"
        >
          <Phone className="w-5 h-5" fill="currentColor" />
        </a>
      )}
      {cleanZalo && (
        <a
          href={cleanZalo}
          target="_blank"
          rel="noopener noreferrer"
          title="Nhắn tin qua Zalo"
          aria-label="Nhắn tin qua Zalo"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#0068ff] text-white text-[13px] font-extrabold shadow-lg shadow-[#0068ff]/40 hover:scale-110 active:scale-95 transition-transform"
        >
          Zalo
        </a>
      )}
      {cleanFacebook && (
        <a
          href={cleanFacebook}
          target="_blank"
          rel="noopener noreferrer"
          title="Nhắn tin qua Facebook"
          aria-label="Nhắn tin qua Facebook"
          className="flex items-center justify-center w-12 h-12 rounded-full bg-[#1877f2] text-white shadow-lg shadow-[#1877f2]/40 hover:scale-110 active:scale-95 transition-transform"
        >
          <Facebook className="w-5 h-5" fill="currentColor" />
        </a>
      )}
    </div>
  );
}
