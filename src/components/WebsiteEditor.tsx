import React, { useState } from 'react';
import {
  ArrowLeft,
  Save,
  Plus,
  Trash2,
  Smartphone,
  Phone,
  Sliders,
  PlusCircle,
} from 'lucide-react';
import { Project, MenuItem } from '../types';

interface WebsiteEditorProps {
  project: Project;
  onSave: (updatedProject: Project) => void;
  onClose: () => void;
}

const PRESET_COLORS = [
  { name: 'Xanh Đại Dương', value: '#0056b3' },
  { name: 'Xanh Lá Matcha', value: '#10b981' },
  { name: 'Hồng Đào Quá Đẹp', value: '#ec4899' },
  { name: 'Đỏ San Hô', value: '#f43f5e' },
  { name: 'Vàng Mật Ong', value: '#f59e0b' },
  { name: 'Than Trầm Hiện Đại', value: '#1e293b' }
];

export default function WebsiteEditor({
  project,
  onSave,
  onClose
}: WebsiteEditorProps) {
  // Local states for editing the project
  const [storeName, setStoreName] = useState(project.storeName);
  const [description, setDescription] = useState(project.description);
  const [phone, setPhone] = useState(project.phone);
  const [logoText, setLogoText] = useState(project.logoText);
  const [themeColor, setThemeColor] = useState(project.themeColor);
  const [items, setItems] = useState<MenuItem[]>([...project.items]);

  // Sidebar item insert states
  const [newItemName, setNewItemName] = useState('');
  const [newItemPrice, setNewItemPrice] = useState<number>(0);
  const [newItemDesc, setNewItemDesc] = useState('');
  const [newItemUrl, setNewItemUrl] = useState('');

  // Mobile simulator active states
  const [selectedMobileTab, setSelectedMobileTab] = useState<'menu' | 'about'>('menu');
  const [simulatorCart, setSimulatorCart] = useState<{ item: MenuItem; count: number }[]>([]);
  const [showSimulatedCheckout, setShowSimulatedCheckout] = useState(false);

  // Apply edits to item row
  const handleUpdateItem = (id: string, field: keyof MenuItem, value: any) => {
    setItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  // Add Item to Menu
  const handleAddNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: MenuItem = {
      id: `item-${Date.now()}`,
      name: newItemName,
      price: newItemPrice || 0,
      description: newItemDesc || undefined,
      imageUrl: newItemUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&auto=format&fit=crop&q=60',
      isAvailable: true
    };

    setItems([...items, newItem]);
    setNewItemName('');
    setNewItemPrice(0);
    setNewItemDesc('');
    setNewItemUrl('');
  };

  // Delete Item
  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
    // Also remove from simulator cart
    setSimulatorCart(prev => prev.filter(c => c.item.id !== id));
  };

  // Simulator actions
  const handleAddToCart = (item: MenuItem) => {
    setSimulatorCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, count: c.count + 1 } : c);
      }
      return [...prev, { item, count: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setSimulatorCart(prev => prev.map(c => {
      if (c.item.id === itemId) return { ...c, count: c.count - 1 };
      return c;
    }).filter(c => c.count > 0));
  };

  const cartTotal = simulatorCart.reduce((total, c) => total + (c.item.price * c.count), 0);

  // Trigger main save
  const handleSaveAll = () => {
    const updated: Project = {
      ...project,
      storeName,
      description,
      phone,
      logoText,
      themeColor,
      items,
      lastUpdated: 'Vừa xong'
    };
    onSave(updated);
  };

  return (
    <div className="flex-1 flex flex-col bg-gray-50 h-[calc(100vh-65px)] overflow-hidden" id="workspace-editor">
      {/* Editor top menu bar with action actions */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <div className="text-[10px] uppercase font-extrabold tracking-wider text-gray-400">Trình Chỉnh Sửa Website</div>
            <h1 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <span>{project.storeName}</span>
              <span className="h-1.5 w-1.5 bg-[#00aaff] rounded-full animate-pulse" />
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-200 text-gray-600 hover:text-gray-900 bg-white rounded-full text-xs font-semibold cursor-pointer active:scale-95 transition-all"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSaveAll}
            className="px-5 py-2 bg-[#0056b3] hover:bg-[#003f87] text-white rounded-full text-xs font-bold cursor-pointer active:scale-95 shadow-sm hover:shadow transition-all flex items-center gap-1.5"
          >
            <Save className="h-4 w-4" />
            <span>Xong & Lưu Thay Đổi</span>
          </button>
        </div>
      </div>

      {/* Editor main content layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Side: Controls (Config forms & editable item table) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8" id="editor-left-controls">
          
          {/* Section 1: Store configuration info */}
          <section className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider pb-3 border-b border-gray-100 flex items-center gap-2">
              <Sliders className="h-4.5 w-4.5 text-[#0056b3]" />
              <span>Cấu hình thông tin cơ bản</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">Tên Cửa Hàng / Website</label>
                <input
                  type="text"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:outline-none focus:border-[#0056b3] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">Tên Logo hiển thị</label>
                <input
                  type="text"
                  value={logoText}
                  onChange={(e) => setLogoText(e.target.value)}
                  className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:outline-none focus:border-[#0056b3] focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500">Số Điện Thoại Liên hệ (Zalo)</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:outline-none focus:border-[#0056b3] focus:bg-white"
                />
              </div>

              {/* Theme Selector Palette */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-gray-500">Tông Màu Giao Diện</label>
                <div className="flex flex-wrap gap-2">
                  {PRESET_COLORS.map(col => {
                    const isActive = themeColor === col.value;
                    return (
                      <button
                        key={col.value}
                        title={col.name}
                        onClick={() => setThemeColor(col.value)}
                        className={`h-7 w-7 rounded-full cursor-pointer transition-all ${
                          isActive ? 'ring-4 ring-offset-2 ring-[#00aaff] scale-110' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: col.value }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-1 pt-1">
              <label className="text-xs font-bold text-gray-500">Mô tả tóm tắt cửa hàng</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full text-xs rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 px-3 focus:outline-none focus:border-[#0056b3] focus:bg-white"
                placeholder="Gợi mở những giá trị tuyệt vời nhất của tiệm tới khách hàng lý tưởng..."
              />
            </div>
          </section>

          {/* Section 2: Manage Items list tabular layout */}
          <section className="bg-white rounded-2xl border border-gray-200/80 p-6 space-y-5 shadow-sm">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wider pb-3 border-b border-gray-100 flex items-center gap-2">
              <PlusCircle className="h-4.5 w-4.5 text-[#0056b3]" />
              <span>Bảng danh sách món ăn / Dịch vụ ({items.length})</span>
            </h2>

            {/* Editable items table */}
            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="w-full text-left text-xs text-gray-500">
                <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                  <tr>
                    <th className="px-4 py-3">Ảnh</th>
                    <th className="px-4 py-3">Tên món / Dịch vụ</th>
                    <th className="px-4 py-3">Đơn giá (đ)</th>
                    <th className="px-4 py-3">Còn hàng?</th>
                    <th className="px-4 py-3 text-center">Xóa</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-4 py-2">
                        <img 
                          src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&auto=format&fit=crop&q=60'} 
                          alt="" 
                          referrerPolicy="no-referrer"
                          className="h-9 w-9 rounded-lg object-cover border border-gray-100"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleUpdateItem(item.id, 'name', e.target.value)}
                          className="w-full bg-transparent font-semibold border-b border-transparent focus:border-[#0056b3] focus:outline-none p-0.5 text-gray-800"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleUpdateItem(item.id, 'price', parseInt(e.target.value) || 0)}
                          className="w-24 bg-transparent border-b border-transparent focus:border-[#0056b3] focus:outline-none p-0.5 text-gray-800 font-mono"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={item.isAvailable}
                          onChange={(e) => handleUpdateItem(item.id, 'isAvailable', e.target.checked)}
                          className="h-4 w-4 text-[#0056b3] focus:ring-[#0056b3]/20 border-gray-300 rounded cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="p-1 rounded-lg hover:bg-rose-50 text-gray-400 hover:text-rose-600 transition-colors cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-6 text-gray-400 text-xs">
                        Danh sách rỗng. Hãy thêm món ăn / dịch vụ đầu tiên bên dưới!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick add product row */}
            <form onSubmit={handleAddNewItem} className="bg-gray-50/50 rounded-xl p-4 border border-gray-200/50 space-y-3">
              <div className="font-bold text-xs text-gray-700">Thêm món ăn / dịch vụ mới:</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Tên sản phẩm (ví dụ: Trà Chanh Giã Tay)"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="w-full text-xs rounded-lg border border-gray-200 bg-white py-2 px-3 focus:outline-none focus:border-[#0056b3]"
                />
                <input
                  type="number"
                  placeholder="Đơn giá bán (đ)"
                  value={newItemPrice || ''}
                  onChange={(e) => setNewItemPrice(parseInt(e.target.value) || 0)}
                  className="w-full text-xs rounded-lg border border-gray-200 bg-white py-2 px-3 focus:outline-none focus:border-[#0056b3] font-mono"
                />
                <input
                  type="text"
                  placeholder="Link chứa nguồn ảnh (tùy chọn)"
                  value={newItemUrl}
                  onChange={(e) => setNewItemUrl(e.target.value)}
                  className="w-full text-xs rounded-lg border border-gray-200 bg-white py-2 px-3 focus:outline-none focus:border-[#0056b3]"
                />
              </div>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Mô tả tóm lược sản phẩm (ví dụ: Trà đen pha lê kết hợp cốt chanh tươi chua ngọt)"
                  value={newItemDesc}
                  onChange={(e) => setNewItemDesc(e.target.value)}
                  className="w-full text-xs rounded-lg border border-gray-200 bg-white py-2 px-3 focus:outline-none focus:border-[#0056b3] flex-1"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-[#003f87] to-[#00aaff] text-white rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer hover:opacity-90 active:scale-95 transition-all"
                >
                  Thêm vào bảng
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Right Side: Virtualized Smartphone device preview */}
        <div className="w-[380px] border-l border-gray-200 bg-gray-100 flex flex-col items-center justify-center py-6 px-4 shrink-0 hidden md:flex" id="editor-right-simulator">
          <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
            <Smartphone className="h-4 w-4" />
            <span>Xem trước thời gian thực</span>
          </div>

          {/* Physical Phone frame body */}
          <div className="relative w-80 h-[580px] bg-black rounded-[40px] shadow-2xl border-[10px] border-black ring-4 ring-gray-200 overflow-hidden flex flex-col justify-between">
            
            {/* Phone speaker/notch overlay element */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-b-2xl z-50 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-800 mr-2" />
              <span className="w-10 h-1 bg-slate-900 rounded-full" />
            </div>

            {/* In-device simulated content */}
            <div className="flex-1 bg-white flex flex-col h-full overflow-y-auto pt-5 pb-16 scrollbar-thin relative text-gray-800">
              
              {/* Simulated shop hero header */}
              <div 
                className="p-5 text-white text-center space-y-1 relative" 
                style={{ backgroundColor: themeColor }}
              >
                <div className="text-xl font-extrabold uppercase tracking-tight">{logoText || 'MY STORE'}</div>
                <h1 className="text-sm font-semibold opacity-90">{storeName}</h1>
                <p className="text-[10px] opacity-80 max-w-[200px] mx-auto line-clamp-1">{description}</p>
                
                {/* Contact phone pill overlay */}
                {phone && (
                  <a 
                    href={`tel:${phone}`}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-[9px] font-bold mt-2"
                  >
                    <Phone className="h-2.5 w-2.5 text-white" />
                    <span>{phone}</span>
                  </a>
                )}
              </div>

              {/* Phone navigation tab selections */}
              <div className="flex border-b border-gray-100 text-xs font-bold text-slate-500">
                <button
                  onClick={() => setSelectedMobileTab('menu')}
                  className={`flex-1 py-3 text-center border-b-2 ${
                    selectedMobileTab === 'menu' ? 'border-b-[#0056b3] text-gray-800 font-bold' : 'border-b-transparent'
                  }`}
                  style={{ borderBottomColor: selectedMobileTab === 'menu' ? themeColor : 'transparent' }}
                >
                  Thực đơn
                </button>
                <button
                  onClick={() => setSelectedMobileTab('about')}
                  className={`flex-1 py-3 text-center border-b-2 ${
                    selectedMobileTab === 'about' ? 'border-b-[#0056b3] text-gray-800 font-bold' : 'border-b-transparent'
                  }`}
                  style={{ borderBottomColor: selectedMobileTab === 'about' ? themeColor : 'transparent' }}
                >
                  Thông tin
                </button>
              </div>

              {/* Simulated view area */}
              {selectedMobileTab === 'menu' ? (
                <div className="p-4 space-y-4">
                  {items.filter(i => i.isAvailable).map((item) => (
                    <div 
                      key={item.id} 
                      className="flex items-start gap-3 bg-white border border-gray-100 p-2.5 rounded-xl hover:shadow-sm transition-shadow text-[11px]"
                    >
                      <img 
                        src={item.imageUrl} 
                        alt="" 
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 rounded-lg object-cover border border-gray-50 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="font-bold text-gray-900 truncate leading-tight">{item.name}</div>
                        <div className="font-mono text-gray-500 text-[10px]">{item.price.toLocaleString('vi-VN')}đ</div>
                        <p className="text-gray-400 text-[9px] line-clamp-2 leading-relaxed">{item.description}</p>
                      </div>

                      <button
                        onClick={() => handleAddToCart(item)}
                        title="Thêm"
                        className="p-1 rounded-full text-white cursor-pointer active:scale-95 transition-transform shrink-0"
                        style={{ backgroundColor: themeColor }}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}

                  {items.filter(i => i.isAvailable).length === 0 && (
                    <p className="text-center text-[10px] text-gray-400 py-10">Thực đơn tạm rỗng.</p>
                  )}
                </div>
              ) : (
                <div className="p-5 space-y-4 text-xs">
                  <div className="space-y-1">
                    <h3 className="font-bold text-[#0056b3]" style={{ color: themeColor }}>Bản đồ số định vị:</h3>
                    <div className="bg-slate-100 rounded-lg h-24 flex items-center justify-center text-gray-400 text-[10px]">
                      📍 Bản đồ vệ tinh GPS
                    </div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-[#0056b3]" style={{ color: themeColor }}>Giờ làm hoạt động:</h3>
                    <p className="text-[10px] text-gray-600">Thứ Hai - Chủ Nhật: 08:00 - 22:30</p>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-bold text-[#0056b3]" style={{ color: themeColor }}>Mô tả cụ thể:</h3>
                    <p className="text-[10px] text-gray-500 leading-relaxed">{description || 'Đang cập nhật...'}</p>
                  </div>
                </div>
              )}

              {/* Floating bottom dynamic phone cart panel overlay */}
              {simulatorCart.length > 0 && (
                <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-100 p-3 shadow-lg z-30 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[9px] text-gray-400">TỔNG GIỎ HÀNG:</div>
                    <div className="font-bold font-mono text-[#0056b3]" style={{ color: themeColor }}>
                      {cartTotal.toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                  <button
                    onClick={() => setShowSimulatedCheckout(true)}
                    className="px-4 py-1.5 text-white font-bold text-[10px] rounded-lg cursor-pointer"
                    style={{ backgroundColor: themeColor }}
                  >
                    Thanh toán ({simulatorCart.reduce((acc, c) => acc + c.count, 0)})
                  </button>
                </div>
              )}

              {/* Checkout modal overlay inside simulated phone */}
              {showSimulatedCheckout && (
                <div className="absolute inset-0 bg-black/60 z-40 p-4 flex items-center justify-center text-xs">
                  <div className="bg-white rounded-2xl p-5 w-full space-y-4 max-h-[85%] overflow-y-auto">
                    <div className="text-center font-bold pb-2 border-b">QUÉT QR THANH TOÁN</div>
                    <div className="space-y-1 font-mono text-[9px] max-h-24 overflow-y-auto">
                      {simulatorCart.map(c => (
                        <div key={c.item.id} className="flex justify-between text-gray-600">
                          <span className="truncate max-w-[120px]">{c.item.name} x {c.count}</span>
                          <span>{(c.item.price * c.count).toLocaleString('vi-VN')}đ</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between font-bold text-gray-800 pt-2 border-t">
                      <span>Tổng cộng:</span>
                      <span className="font-mono">{cartTotal.toLocaleString('vi-VN')}đ</span>
                    </div>

                    {/* Fake QR Scan dynamic generation */}
                    <div className="bg-slate-50 p-3 rounded-xl text-center space-y-1">
                      <img 
                        src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=vietqr%3Abill%3A${cartTotal}`} 
                        alt="Dynamic QR Code bills"
                        referrerPolicy="no-referrer"
                        className="h-28 w-28 mx-auto"
                      />
                      <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Quét VietQR chuyển khoản nhanh</div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowSimulatedCheckout(false)}
                        className="flex-1 py-1.5 border hover:bg-gray-50 rounded-lg font-semibold text-[10px]"
                      >
                        Quay lại
                      </button>
                      <button
                        onClick={() => {
                          setSimulatorCart([]);
                          setShowSimulatedCheckout(false);
                          alert('Đặt hàng thành công! Trình giả lập điện thoại nhận đơn.');
                        }}
                        className="flex-1 py-1.5 text-white rounded-lg font-bold text-[10px]"
                        style={{ backgroundColor: themeColor }}
                      >
                        Hoàn tất
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Simulated home button for physical device */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/70 rounded-full z-50 pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}
