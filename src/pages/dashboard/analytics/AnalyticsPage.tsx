// Trang phân tích — placeholder sẵn sàng tích hợp Recharts / D3
export default function AnalyticsPage() {
  return (
    <div className="py-8 px-6 xl:px-10 w-full space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-display text-gray-900">Biểu Đồ Phân Tích Sự Kiện Quét</h1>
        <p className="text-xs text-gray-500 mt-1">Phân tích số lượng truy cập và khách hàng chuyển đổi theo tuần.</p>
      </div>
      <div className="bg-white rounded-3xl p-10 text-center border font-semibold text-gray-400 py-24 shadow-sm">
        📊 Biểu đồ trực quan (Recharts / D3) — hiển thị khi có tối thiểu 10 lượt quét QR thực tế.
      </div>
    </div>
  );
}
