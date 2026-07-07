import { HelpCircle } from 'lucide-react';

export default function SupportPage() {
  return (
    <div className="py-8 px-6 xl:px-10 w-full flex flex-col items-center text-center space-y-4">
      <HelpCircle className="h-12 w-12 text-fnb-orange mx-auto" />
      <h2 className="text-lg font-bold font-display text-gray-800">Cần hỗ trợ trực tiếp từ kỹ sư thiết kế?</h2>
      <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
        Bộ phận kỹ sư của chúng tôi chuyên hỗ trợ chủ quán soạn menu, thiết kế ảnh mộc mạc thu hút nhất.
        Liên lạc trực tuyến hoàn toàn miễn phí qua Zalo hotline.
      </p>
      <p className="font-mono text-base font-bold text-orange-700 underline">Hotline 24/7 Zalo: 0987.654.321</p>
    </div>
  );
}
