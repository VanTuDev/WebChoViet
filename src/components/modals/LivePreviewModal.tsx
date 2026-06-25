// Giữ nguyên logic từ ExtraViews.tsx/LivePreviewModal — đã tách sang file riêng
import { useState } from 'react';
import { X, Smartphone, Monitor, Copy, ExternalLink, Check, PhoneCall } from 'lucide-react';
import type { Project, MenuItem } from '../../types';
import { useAppContext } from '../../store/AppContext';

interface Props {
  project: Project;
  onClose: () => void;
}

export default function LivePreviewModal({ project, onClose }: Props) {
  const { showSnackbar } = useAppContext();
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [selectedTab, setSelectedTab] = useState<'menu' | 'about'>('menu');
  const [copied, setCopied] = useState(false);
  const [cart, setCart] = useState<{ item: MenuItem; count: number }[]>([]);

  const totalSum = cart.reduce((total, c) => total + c.item.price * c.count, 0);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://webchoviet.com/live/${project.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addToCart = (item: MenuItem) =>
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      return existing
        ? prev.map(c => c.item.id === item.id ? { ...c, count: c.count + 1 } : c)
        : [...prev, { item, count: 1 }];
    });

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex flex-col">

      {/* ── Preview Header ───────────────────────────────────────────────── */}
      <div className="bg-slate-900 text-white border-b border-slate-800 px-6 py-4 flex items-center justify-between shrink-0">
        <div>
          <div className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-wide">Đang Xem Chế Độ Live</div>
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            {project.storeName}
            <span className="text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              đã kích hoạt mã QR
            </span>
          </h2>
        </div>

        {/* Device toggle */}
        <div className="hidden sm:flex items-center bg-slate-800 p-1 rounded-full border border-slate-700 text-xs font-semibold">
          {(['mobile', 'desktop'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setDeviceMode(mode)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                deviceMode === mode ? 'bg-[#00aaff] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {mode === 'mobile' ? <Smartphone className="h-3.5 w-3.5" /> : <Monitor className="h-3.5 w-3.5" />}
              <span>{mode === 'mobile' ? 'Điện thoại' : 'Máy tính'}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 border border-slate-700 hover:border-slate-600 bg-slate-800/50 rounded-full text-xs font-bold text-slate-200 cursor-pointer transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copied ? 'Đã sao chép!' : 'Sao chép link'}</span>
          </button>
          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full cursor-pointer text-slate-400 hover:text-white">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* ── Preview Stage ────────────────────────────────────────────────── */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-6 bg-slate-950/40">
        {deviceMode === 'mobile' ? (
          /* Mobile phone frame */
          <div className="w-84 max-w-full h-[620px] bg-black rounded-[45px] shadow-2xl border-[12px] border-black overflow-hidden flex flex-col ring-4 ring-slate-800">
            <div className="h-5 bg-black shrink-0" />
            <div className="flex-1 bg-white overflow-y-auto flex flex-col pb-16 relative">
              {/* Hero header */}
              <div className="p-6 text-white text-center space-y-1" style={{ backgroundColor: project.themeColor }}>
                <div className="text-xl font-extrabold uppercase">{project.logoText || 'MY BRAND'}</div>
                <h1 className="text-sm font-semibold opacity-95">{project.storeName}</h1>
                <p className="text-[10px] opacity-80 max-w-[220px] mx-auto line-clamp-2">{project.description}</p>
                {project.phone && (
                  <a href={`tel:${project.phone}`} className="inline-flex items-center gap-1 px-3.5 py-1 bg-white/20 rounded-full text-[9px] font-bold mt-2">
                    <PhoneCall className="h-2.5 w-2.5" />
                    {project.phone}
                  </a>
                )}
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100 sticky top-0 bg-white z-10">
                {(['menu', 'about'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setSelectedTab(tab)}
                    className="flex-1 py-3.5 text-xs font-bold border-b-2 transition-colors"
                    style={{
                      borderBottomColor: selectedTab === tab ? project.themeColor : 'transparent',
                      color: selectedTab === tab ? project.themeColor : '#64748b',
                    }}
                  >
                    {tab === 'menu' ? 'Thực Đơn' : 'Liên Hệ'}
                  </button>
                ))}
              </div>

              {selectedTab === 'menu' ? (
                <div className="p-4 space-y-3">
                  {project.items.filter(i => i.isAvailable).map(item => (
                    <div key={item.id} className="flex gap-3 bg-gray-50/50 p-2.5 rounded-xl border border-gray-100 items-center">
                      {item.imageUrl && (
                        <img src={item.imageUrl} alt="" referrerPolicy="no-referrer"
                          className="h-14 w-14 rounded-lg object-cover border border-gray-100 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-[11px] text-gray-900 truncate">{item.name}</div>
                        <div className="font-mono text-[10px] text-gray-500 font-bold">{item.price.toLocaleString('vi-VN')}đ</div>
                      </div>
                      <button onClick={() => addToCart(item)} className="p-1.5 rounded-full text-white cursor-pointer active:scale-95 shrink-0 shadow-sm" style={{ backgroundColor: project.themeColor }}>
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 space-y-4 text-xs text-gray-700">
                  <div className="bg-slate-50 p-3.5 rounded-2xl">
                    <h4 className="font-bold uppercase text-[10px] mb-1" style={{ color: project.themeColor }}>Thông tin tiệm</h4>
                    <p className="text-[11px] leading-relaxed">{project.description || 'Chưa có mô tả.'}</p>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-2xl">
                    <h4 className="font-bold uppercase text-[10px] mb-1" style={{ color: project.themeColor }}>Liên hệ</h4>
                    <p className="font-bold text-gray-900">{project.phone || 'Chưa có SĐT'}</p>
                  </div>
                </div>
              )}

              {/* Cart strip */}
              {cart.length > 0 && (
                <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-200 p-3 shadow-2xl z-30 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[9px] text-gray-400">GIỎ HÀNG:</div>
                    <div className="font-bold font-mono" style={{ color: project.themeColor }}>
                      {totalSum.toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                  <button
                    onClick={() => { setCart([]); showSnackbar(`Đơn hàng thành công! Tổng: ${totalSum.toLocaleString('vi-VN')}đ`, 'success'); }}
                    className="px-5 py-2 text-white font-bold text-[10px] rounded-lg cursor-pointer shadow"
                    style={{ backgroundColor: project.themeColor }}
                  >
                    Gửi đơn ({cart.reduce((a, x) => a + x.count, 0)})
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Desktop frame */
          <div className="w-[1000px] max-w-full h-[620px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 ring-4 ring-slate-800">
            {/* Browser bar */}
            <div className="bg-slate-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2 shrink-0">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <div className="bg-white border border-gray-200 text-slate-500 font-mono text-[10px] rounded-md px-4 py-1 flex-1 max-w-[20rem] ml-4 flex items-center justify-between">
                <span>webchoviet.com/live/{project.id}</span>
                <ExternalLink className="h-3 w-3 text-slate-300" />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto flex">
              <div className="flex-1 p-8 space-y-6">
                <h1 className="text-3xl font-display font-extrabold" style={{ color: project.themeColor }}>
                  {project.storeName}
                </h1>
                <p className="text-xs text-gray-500 max-w-xl leading-relaxed">{project.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  {project.items.filter(i => i.isAvailable).map(item => (
                    <div key={item.id} className="flex gap-3 p-3 bg-slate-50 rounded-xl border border-gray-100 items-center justify-between text-xs">
                      <div className="flex gap-3 items-center min-w-0">
                        {item.imageUrl && <img src={item.imageUrl} alt="" referrerPolicy="no-referrer" className="h-12 w-12 rounded-lg object-cover" />}
                        <div className="min-w-0">
                          <h4 className="font-bold text-gray-800 truncate">{item.name}</h4>
                          <p className="font-mono text-[10px] text-gray-500">{item.price.toLocaleString('vi-VN')}đ</p>
                        </div>
                      </div>
                      <button onClick={() => addToCart(item)} className="px-3 py-1.5 text-[10px] font-bold text-white rounded-lg cursor-pointer" style={{ backgroundColor: project.themeColor }}>
                        Chọn
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {/* Right panel */}
              <div className="w-72 border-l border-gray-200 p-6 bg-slate-50/50 flex flex-col justify-between shrink-0 text-xs">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold uppercase text-[10px] mb-2">Giỏ hàng</h3>
                    {cart.length > 0 ? (
                      <div className="space-y-1 font-mono text-[10px]">
                        {cart.map(c => (
                          <div key={c.item.id} className="flex justify-between text-gray-600">
                            <span className="truncate max-w-[120px]">{c.item.name} x{c.count}</span>
                            <span>{(c.item.price * c.count).toLocaleString('vi-VN')}đ</span>
                          </div>
                        ))}
                        <div className="pt-2 border-t flex justify-between font-bold text-gray-800">
                          <span>Tổng:</span>
                          <span style={{ color: project.themeColor }}>{totalSum.toLocaleString('vi-VN')}đ</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[10px] text-gray-400">Chưa có món nào.</p>
                    )}
                  </div>
                </div>
                <button
                  disabled={cart.length === 0}
                  onClick={() => { setCart([]); showSnackbar('Giao dịch hoàn thành! Cảm ơn quý khách.', 'success'); }}
                  className="w-full py-2 text-white font-bold text-[10px] rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                  style={{ backgroundColor: cart.length > 0 ? project.themeColor : '#cbd5e1' }}
                >
                  Gửi yêu cầu đơn hàng
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-[#1e293b] border-t border-slate-800 px-6 py-3 text-center text-xs text-slate-400 flex items-center justify-center gap-3 shrink-0">
        <span>💡 Chế độ xem thử thời gian thực — WebChoViet</span>
        <button onClick={handleCopyLink} className="text-white font-bold underline cursor-pointer hover:text-indigo-400">
          {copied ? 'Đã sao chép!' : 'Lấy liên kết chia sẻ'}
        </button>
      </div>
    </div>
  );
}
