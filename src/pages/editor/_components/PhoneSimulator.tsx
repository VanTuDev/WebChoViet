// Preview thời gian thực trong khung điện thoại — nhận live data qua props
import { useState } from 'react';
import { Smartphone, Plus, Phone } from 'lucide-react';
import type { MenuItem } from '../../../types';
import { useAppContext } from '../../../store/AppContext';

interface Props {
  storeName: string;
  logoText: string;
  description: string;
  phone: string;
  themeColor: string;
  items: MenuItem[];
}

export default function PhoneSimulator({ storeName, logoText, description, phone, themeColor, items }: Props) {
  const { showSnackbar } = useAppContext();
  const [activeTab, setActiveTab] = useState<'menu' | 'about'>('menu');
  const [cart, setCart] = useState<{ item: MenuItem; count: number }[]>([]);
  const [showCheckout, setShowCheckout] = useState(false);

  const cartTotal = cart.reduce((total, c) => total + c.item.price * c.count, 0);

  const addToCart = (item: MenuItem) =>
    setCart(prev => {
      const ex = prev.find(c => c.item.id === item.id);
      return ex
        ? prev.map(c => c.item.id === item.id ? { ...c, count: c.count + 1 } : c)
        : [...prev, { item, count: 1 }];
    });

  return (
    <div className="w-[380px] border-l border-gray-200 bg-gray-100 flex flex-col items-center justify-center py-6 px-4 shrink-0 hidden md:flex">
      <div className="flex items-center gap-1.5 text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">
        <Smartphone className="h-4 w-4" />
        <span>Xem trước thời gian thực</span>
      </div>

      {/* Phone frame */}
      <div className="relative w-80 h-[580px] bg-black rounded-[40px] shadow-2xl border-[10px] border-black ring-4 ring-gray-200 overflow-hidden flex flex-col">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-black rounded-b-2xl z-50 flex items-center justify-center">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-800 mr-2" />
          <span className="w-10 h-1 bg-slate-900 rounded-full" />
        </div>

        <div className="flex-1 bg-white flex flex-col overflow-y-auto pt-5 pb-16 relative">
          {/* Hero */}
          <div className="p-5 text-white text-center space-y-1" style={{ backgroundColor: themeColor }}>
            <div className="text-xl font-extrabold uppercase tracking-tight">{logoText || 'MY STORE'}</div>
            <h1 className="text-sm font-semibold opacity-90">{storeName}</h1>
            <p className="text-[10px] opacity-80 max-w-[200px] mx-auto line-clamp-1">{description}</p>
            {phone && (
              <a href={`tel:${phone}`} className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-[9px] font-bold mt-2">
                <Phone className="h-2.5 w-2.5" />
                {phone}
              </a>
            )}
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-100 text-xs font-bold text-slate-500">
            {(['menu', 'about'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="flex-1 py-3 text-center border-b-2 transition-colors"
                style={{
                  borderBottomColor: activeTab === tab ? themeColor : 'transparent',
                  color: activeTab === tab ? themeColor : '#64748b',
                }}
              >
                {tab === 'menu' ? 'Thực đơn' : 'Thông tin'}
              </button>
            ))}
          </div>

          {/* Content */}
          {activeTab === 'menu' ? (
            <div className="p-4 space-y-4">
              {items.filter(i => i.isAvailable).map(item => (
                <div key={item.id} className="flex items-start gap-3 bg-white border border-gray-100 p-2.5 rounded-xl text-[11px]">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt="" referrerPolicy="no-referrer"
                      className="h-14 w-14 rounded-lg object-cover border border-gray-50 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="font-bold text-gray-900 truncate">{item.name}</div>
                    <div className="font-mono text-gray-500 text-[10px]">{item.price.toLocaleString('vi-VN')}đ</div>
                    {item.description && <p className="text-gray-400 text-[9px] line-clamp-2">{item.description}</p>}
                  </div>
                  <button onClick={() => addToCart(item)} className="p-1 rounded-full text-white cursor-pointer active:scale-95 shrink-0" style={{ backgroundColor: themeColor }}>
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
              <div>
                <h3 className="font-bold mb-1" style={{ color: themeColor }}>Giờ làm việc:</h3>
                <p className="text-[10px] text-gray-600">Thứ Hai - Chủ Nhật: 08:00 - 22:30</p>
              </div>
              <div>
                <h3 className="font-bold mb-1" style={{ color: themeColor }}>Mô tả:</h3>
                <p className="text-[10px] text-gray-500 leading-relaxed">{description || 'Đang cập nhật...'}</p>
              </div>
            </div>
          )}

          {/* Cart strip */}
          {cart.length > 0 && (
            <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-100 p-3 shadow-lg z-30 flex items-center justify-between text-xs">
              <div>
                <div className="text-[9px] text-gray-400">TỔNG:</div>
                <div className="font-bold font-mono" style={{ color: themeColor }}>{cartTotal.toLocaleString('vi-VN')}đ</div>
              </div>
              <button
                onClick={() => setShowCheckout(true)}
                className="px-4 py-1.5 text-white font-bold text-[10px] rounded-lg cursor-pointer"
                style={{ backgroundColor: themeColor }}
              >
                Thanh toán ({cart.reduce((acc, c) => acc + c.count, 0)})
              </button>
            </div>
          )}

          {/* Checkout overlay inside phone */}
          {showCheckout && (
            <div className="absolute inset-0 bg-black/60 z-40 p-4 flex items-center justify-center text-xs">
              <div className="bg-white rounded-2xl p-5 w-full space-y-4">
                <div className="text-center font-bold pb-2 border-b">QUÉT QR THANH TOÁN</div>
                <div className="space-y-1 font-mono text-[9px] max-h-24 overflow-y-auto">
                  {cart.map(c => (
                    <div key={c.item.id} className="flex justify-between text-gray-600">
                      <span className="truncate max-w-[120px]">{c.item.name} x{c.count}</span>
                      <span>{(c.item.price * c.count).toLocaleString('vi-VN')}đ</span>
                    </div>
                  ))}
                </div>
                <div className="bg-slate-50 p-3 rounded-xl text-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=vietqr%3Abill%3A${cartTotal}`}
                    alt="VietQR"
                    referrerPolicy="no-referrer"
                    className="h-28 w-28 mx-auto"
                  />
                  <div className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mt-1">Quét VietQR</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setShowCheckout(false)} className="flex-1 py-1.5 border hover:bg-gray-50 rounded-lg font-semibold text-[10px]">Quay lại</button>
                  <button
                    onClick={() => { setCart([]); setShowCheckout(false); showSnackbar('Đặt hàng thành công! Cảm ơn quý khách.', 'success'); }}
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

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/70 rounded-full z-50 pointer-events-none" />
      </div>
    </div>
  );
}
