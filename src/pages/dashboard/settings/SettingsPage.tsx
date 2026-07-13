export default function SettingsPage() {
  return (
    <div className="py-8 px-6 xl:px-10 w-full max-w-2xl">
      <div className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm space-y-6">
        <h1 className="text-xl font-bold font-display pb-3 border-b text-gray-900">Cấu Hình Tài Khoản Gốc</h1>
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-500 block mb-1">Email quản trị viên</label>
            <input
              type="text" value="tunv.sw@gmail.com" readOnly
              className="w-full bg-gray-50 px-3 py-2 border rounded-xl text-gray-700"
            />
          </div>
          <div>
            <label className="font-bold text-gray-500 block mb-1">Cổng kết nối mặc định</label>
            <input
              type="text" value="Tên_chủ_quán_Việt_Nam" readOnly
              className="w-full bg-gray-50 px-3 py-2 border rounded-xl text-gray-700"
            />
          </div>
          <div>
            <span className="text-[10px] bg-orange-50 text-primary-container px-2 py-1 rounded font-bold">
              Phiên bản vngoweb v4.1 (Stable)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
