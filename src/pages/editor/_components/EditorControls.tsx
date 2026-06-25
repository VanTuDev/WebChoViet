// Panel trái editor: form chỉnh thông tin + bảng danh sách items
import React, { useState } from 'react';
import { Plus, Trash2, Sliders, PlusCircle } from 'lucide-react';
import type { MenuItem } from '../../../types';

const PRESET_COLORS = [
  { name: 'Xanh Đại Dương', value: '#0056b3' },
  { name: 'Xanh Lá Matcha', value: '#10b981' },
  { name: 'Hồng Đào',       value: '#ec4899' },
  { name: 'Đỏ San Hô',      value: '#f43f5e' },
  { name: 'Vàng Mật Ong',   value: '#f59e0b' },
  { name: 'Than Trầm',      value: '#1e293b' },
];

interface Props {
  storeName: string; setStoreName: (v: string) => void;
  description: string; setDescription: (v: string) => void;
  phone: string; setPhone: (v: string) => void;
  logoText: string; setLogoText: (v: string) => void;
  themeColor: string; setThemeColor: (v: string) => void;
  items: MenuItem[];
  onUpdateItem: (id: string, field: keyof MenuItem, value: unknown) => void;
  onAddItem: (item: MenuItem) => void;
  onDeleteItem: (id: string) => void;
}

export default function EditorControls({
  storeName, setStoreName, description, setDescription,
  phone, setPhone, logoText, setLogoText,
  themeColor, setThemeColor, items, onUpdateItem, onAddItem, onDeleteItem,
}: Props) {
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState(0);
  const [newDesc, setNewDesc] = useState('');
  const [newUrl, setNewUrl] = useState('');

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    onAddItem({
      id: `item-${Date.now()}`,
      name: newName, price: newPrice || 0,
      description: newDesc || undefined,
      imageUrl: newUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=60',
      isAvailable: true,
    });
    setNewName(''); setNewPrice(0); setNewDesc(''); setNewUrl('');
  };

  const inputCls = 'w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:outline-none focus:border-[#0056b3] focus:bg-white';

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-8">

      {/* ── Thông tin cơ bản ───────────────────────────────────────────── */}
      <section className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-5 shadow-sm">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider pb-3 border-b border-gray-100 flex items-center gap-2">
          <Sliders className="h-4 w-4 text-[#0056b3]" />
          Cấu hình thông tin cơ bản
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500">Tên Cửa Hàng</label>
            <input type="text" value={storeName} onChange={e => setStoreName(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500">Tên Logo</label>
            <input type="text" value={logoText} onChange={e => setLogoText(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500">Số Điện Thoại</label>
            <input type="text" value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-500">Tông Màu</label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COLORS.map(col => (
                <button
                  key={col.value}
                  title={col.name}
                  onClick={() => setThemeColor(col.value)}
                  className={`h-7 w-7 rounded-full cursor-pointer transition-all ${
                    themeColor === col.value ? 'ring-4 ring-offset-2 ring-[#00aaff] scale-110' : 'hover:scale-105'
                  }`}
                  style={{ backgroundColor: col.value }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-xs font-bold text-gray-500">Mô tả tóm tắt</label>
          <textarea rows={2} value={description} onChange={e => setDescription(e.target.value)} className={inputCls} />
        </div>
      </section>

      {/* ── Bảng danh sách items ───────────────────────────────────────── */}
      <section className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-5 shadow-sm">
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider pb-3 border-b border-gray-100 flex items-center gap-2">
          <PlusCircle className="h-4 w-4 text-[#0056b3]" />
          Danh sách món ăn / Dịch vụ ({items.length})
        </h2>

        <div className="overflow-x-auto border border-gray-100 rounded-xl">
          <table className="w-full text-left text-xs text-gray-500">
            <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
              <tr>
                <th className="px-4 py-3">Ảnh</th>
                <th className="px-4 py-3">Tên món</th>
                <th className="px-4 py-3">Giá (đ)</th>
                <th className="px-4 py-3">Còn?</th>
                <th className="px-4 py-3 text-center">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-2">
                    <img
                      src={item.imageUrl ?? 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=60'}
                      alt="" referrerPolicy="no-referrer"
                      className="h-9 w-9 rounded-lg object-cover border border-gray-100"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input type="text" value={item.name}
                      onChange={e => onUpdateItem(item.id, 'name', e.target.value)}
                      className="w-full bg-transparent font-semibold border-b border-transparent focus:border-[#0056b3] focus:outline-none p-0.5 text-gray-800"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input type="number" value={item.price}
                      onChange={e => onUpdateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                      className="w-24 bg-transparent border-b border-transparent focus:border-[#0056b3] focus:outline-none p-0.5 text-gray-800 font-mono"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input type="checkbox" checked={item.isAvailable}
                      onChange={e => onUpdateItem(item.id, 'isAvailable', e.target.checked)}
                      className="h-4 w-4 text-[#0056b3] focus:ring-[#0056b3]/20 border-gray-300 rounded cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => onDeleteItem(item.id)}
                      className="p-1 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={5} className="text-center py-6 text-gray-400 text-xs">Hãy thêm món đầu tiên!</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Quick add form */}
        <form onSubmit={handleAddItem} className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50 space-y-3">
          <div className="font-bold text-xs text-gray-700">Thêm món ăn / dịch vụ mới:</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input type="text" placeholder="Tên sản phẩm..." value={newName} onChange={e => setNewName(e.target.value)}
              className="w-full text-xs rounded-lg border border-gray-200 bg-white py-2 px-3 focus:outline-none focus:border-[#0056b3]" />
            <input type="number" placeholder="Đơn giá (đ)" value={newPrice || ''} onChange={e => setNewPrice(parseInt(e.target.value) || 0)}
              className="w-full text-xs rounded-lg border border-gray-200 bg-white py-2 px-3 focus:outline-none focus:border-[#0056b3] font-mono" />
            <input type="text" placeholder="Link ảnh (tùy chọn)" value={newUrl} onChange={e => setNewUrl(e.target.value)}
              className="w-full text-xs rounded-lg border border-gray-200 bg-white py-2 px-3 focus:outline-none focus:border-[#0056b3]" />
          </div>
          <div className="flex gap-3">
            <input type="text" placeholder="Mô tả tóm lược..." value={newDesc} onChange={e => setNewDesc(e.target.value)}
              className="flex-1 text-xs rounded-lg border border-gray-200 bg-white py-2 px-3 focus:outline-none focus:border-[#0056b3]" />
            <button type="submit"
              className="px-4 py-2 bg-linear-to-r from-[#003f87] to-[#00aaff] text-white rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer hover:opacity-90 active:scale-95 transition-all">
              <Plus className="h-4 w-4 inline mr-1" />Thêm vào bảng
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
