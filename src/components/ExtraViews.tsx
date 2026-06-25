import { useState } from 'react';
import {
  PhoneCall,
  Check,
  X,
  Smartphone,
  Monitor,
  Copy,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { Project } from '../types';

/* --- PRICING SECTION --- */
export function PricingView() {
  const plans = [
    {
      name: 'Khởi Nghiệp (Miễn phí)',
      price: '0đ',
      period: 'mãi mãi',
      desc: 'Giải pháp hoàn hảo để bắt đầu số hóa thực đơn & quầy bán lẻ nhỏ.',
      features: [
        'Khởi tạo tối đa 2 website',
        'Tên miền phụ dạng: .webchoviet.com',
        'Hỗ trợ Mã QR động không giới hạn quý quét',
        'Trình quản lý thực đơn kéo thả căn bản',
        'Quảng cáo WebChoViet hiển thị ở góc'
      ],
      cta: 'Hiện đang sử dụng',
      popular: false,
      color: '#475569'
    },
    {
      name: 'Kinh Doanh WebPro',
      price: '199,000đ',
      period: 'tháng',
      desc: 'Dành cho các chủ quán, chủ thương hiệu bứt tốc doanh số bán hàng.',
      features: [
        'Khởi tạo không giới hạn website',
        'Hỗ trợ gắn Tên Miền Riêng (.vn, .com, .net)',
        'Xóa bỏ hoàn toàn logo & watermark WebChoViet',
        'Tính năng thanh toán VietQR chuyển khoản tự động',
        'Hỗ trợ phân tích dữ liệu quét sâu theo tuần',
        'Băng thông không giới hạn cực nhanh',
        'Bảo mật SSL trọn đời miễn phí',
        'Bộ phận kỹ thuật hỗ trợ riêng qua Zalo 24/7'
      ],
      cta: 'Nâng cấp ngay',
      popular: true,
      color: '#0056b3'
    },
    {
      name: 'Chuỗi Hệ Thống Enterprise',
      price: 'Liên hệ',
      period: 'tùy chỉnh',
      desc: 'Thiết kế riêng cho các thương hiệu ẩm thực nhượng quyền lớn.',
      features: [
        'Giải pháp phân quyền nhân viên đa Chi Nhánh',
        'Tích hợp sâu hệ thống Kế toán / POS (Sunki, KiotViet)',
        'Hỗ trợ báo cáo thống kê chuyên biệt',
        'Đội ngũ chăm sóc vận hành Premium tận nơi'
      ],
      cta: 'Liên hệ tư vấn',
      popular: false,
      color: '#1e293b'
    }
  ];

  return (
    <div className="py-10 px-6 md:px-10 max-w-6xl mx-auto space-y-8" id="pricing-page">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">
          Bảng Giá Dịch Vụ WebChoViet
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Không phát sinh chi phí ẩn. Hỗ trợ thay đổi hoặc hủy gói bất kỳ lúc nào để chuyển dịch theo nhịp độ kinh doanh của bạn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
        {plans.map((pl, idx) => (
          <div 
            key={idx}
            className={`rounded-3xl border p-6 flex flex-col justify-between relative bg-white transition-all hover:shadow-xl ${
              pl.popular 
                ? 'border-[#00aaff] ring-2 ring-[#00aaff]/10 shadow-md scale-102 z-10' 
                : 'border-gray-200 shadow-sm'
            }`}
          >
            {pl.popular && (
              <span className="absolute top-[-14px] left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#003f87] to-[#00aaff] text-white text-[10px] font-extrabold uppercase px-4 py-1.5 rounded-full tracking-wider shadow">
                Khuyên Dùng Nhiều Nhất ⭐
              </span>
            )}

            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-lg font-bold font-display" style={{ color: pl.color }}>
                  {pl.name}
                </h3>
                <p className="text-xs text-gray-400 capitalize">{pl.desc}</p>
              </div>

              <div className="flex items-baseline gap-1 py-2 border-b border-gray-50">
                <span className="text-3xl font-display font-extrabold text-gray-900">{pl.price}</span>
                <span className="text-xs text-gray-500">/ {pl.period}</span>
              </div>

              <ul className="space-y-2.5 pt-2">
                {pl.features.map((f, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2 text-xs text-gray-600">
                    <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button 
              className={`w-full py-3.5 rounded-full text-xs font-bold mt-8 transition-colors active:scale-95 cursor-pointer ${
                pl.popular 
                  ? 'bg-[#00aaff] hover:bg-[#003f87] text-white shadow-md' 
                  : 'bg-gray-100 hover:bg-gray-200/80 text-gray-700'
              }`}
              onClick={() => alert(`Cảm ơn bạn đã quan tâm đến ${pl.name}! Chúng tôi đang liên kết cổng thanh toán.`)}
            >
              {pl.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}


/* --- TUTORIALS SECTION --- */
export function TutorialsView() {
  const steps = [
    {
      num: '01',
      title: 'Khám Phá & Chọn Mẫu',
      desc: 'Truy cập vào "Kho Giao Diện", bấm dùng thử bất cứ mẫu thiết kế nào bám sát lĩnh vực của bạn như Spa & Beauty, Cafe, Nhà hàng hay Shop bán lẻ.'
    },
    {
      num: '02',
      title: 'Chỉnh Sửa Thông Tin Tiệm',
      desc: 'Thay đổi tên cửa hàng, số điện thoại Zalo, logo text, lựa chọn bảng màu phù hợp cá tính, đồng thời sửa đổi thực đơn bảng giá dễ dàng.'
    },
    {
      num: '03',
      title: 'Nhận Mã QR Code Động',
      desc: 'Hệ thống tự động biểu thị mã QR Code tương ứng với website đã tạo. Bạn có thể in đề can dán lên bàn, dán cửa kính để khách hàng quét quét.'
    },
    {
      num: '04',
      title: 'Giao Dịch Đơn Hàng Tự Động',
      desc: 'Khách hàng duyệt sản phẩm trên điện thoại của họ và gửi yêu cầu hoặc thanh toán hóa đơn. Bạn nhận được thông báo để kịp thời chuẩn bị món.'
    }
  ];

  return (
    <div className="py-10 px-6 md:px-10 max-w-5xl mx-auto space-y-8" id="tutorials-page">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-display font-extrabold text-gray-900 leading-tight">
          Hướng Dẫn Số Hóa Cửa Hàng Với WebChoViet
        </h1>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Dù bạn không biết lập trình hay không am hiểu sâu công nghệ, chỉ cần bỏ ra đúng 5 phút để đưa toàn bộ cửa hàng lên môi trường số chuyên nghiệp.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {steps.map((st, i) => (
          <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow relative overflow-hidden transition-all">
            <span className="text-5xl font-display font-black text-[#e3f2fd] absolute right-4 top-2 select-none">
              {st.num}
            </span>
            <div className="space-y-3 relative z-10 pt-4">
              <h3 className="text-sm font-bold text-gray-800 font-display">{st.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed">{st.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#e3f2fd]/50 border border-blue-100 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 mt-8">
        <div className="space-y-2 max-w-xl">
          <h3 className="text-base font-bold text-gray-900 font-display flex items-center gap-1.5">
            <Sparkles className="h-5 w-5 text-amber-500 fill-amber-500" />
            <span>Bạn muốn được thiết kế trọn gói hoàn toàn miễn phí?</span>
          </h3>
          <p className="text-xs text-gray-600 leading-relaxed">
            Nhằm đồng hành cùng các tiểu thương và chủ quán khởi nghiệp tại Việt Nam, đội ngũ kỹ thuật của WebChoViet sẵn sàng hỗ trợ khởi tạo gian hàng, chụp hình sản phẩm và nhập thực đơn trọn gói cho bạn mà không thu bất kỳ khoản chi phí nào!
          </p>
        </div>
        <button 
          onClick={() => alert('Đang kết nối nhân viên tư vấn Zalo: 0987.654.321')}
          className="px-6 py-3 bg-[#0056b3] hover:bg-[#003f87] text-white text-xs font-bold rounded-full cursor-pointer whitespace-nowrap active:scale-95 transition-all shadow"
        >
          Liên hệ ngay qua Zalo
        </button>
      </div>
    </div>
  );
}


/* --- FULL SCREEN LIVE PREVIEW IN-IFRAME SIMULATOR MODAL --- */
interface LivePreviewModalProps {
  project: Project;
  onClose: () => void;
}

export function LivePreviewModal({
  project,
  onClose
}: LivePreviewModalProps) {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [selectedTab, setSelectedTab] = useState<'menu' | 'about'>('menu');
  const [copied, setCopied] = useState(false);
  const [cart, setCart] = useState<{ item: any; count: number }[]>([]);

  const handleCopyLink = () => {
    const fakeUrl = `https://webchoviet.com/live/${project.id}`;
    navigator.clipboard.writeText(fakeUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddToCart = (item: any) => {
    setCart(prev => {
      const exist = prev.find(c => c.item.id === item.id);
      if (exist) {
        return prev.map(c => c.item.id === item.id ? { ...c, count: c.count + 1 } : c);
      }
      return [...prev, { item, count: 1 }];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart(prev => prev.map(c => {
      if (c.item.id === itemId) return { ...c, count: c.count - 1 };
      return c;
    }).filter(c => c.count > 0));
  };

  const totalSum = cart.reduce((total, c) => total + (c.item.price * c.count), 0);

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md z-50 flex flex-col justify-between" id="preview-overlay">
      
      {/* Visual Header controllers */}
      <div className="bg-slate-900 text-white border-b border-slate-800 px-6 py-4 flex items-center justify-between shrink-0" id="preview-header">
        <div className="flex items-center gap-3">
          <div className="space-y-0.5">
            <div className="text-[10px] text-indigo-400 font-extrabold uppercase tracking-wide">Đang Xem Chế Độ Live</div>
            <h2 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <span>{project.storeName}</span>
              <span className="text-emerald-400 text-xs font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                đã kích hoạt mã QR
              </span>
            </h2>
          </div>
        </div>

        {/* Device Switchers */}
        <div className="hidden sm:flex items-center bg-slate-800 p-1 rounded-full border border-slate-700 text-xs font-semibold">
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              deviceMode === 'mobile' ? 'bg-[#00aaff] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" />
            <span>Điện thoại di động</span>
          </button>
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all cursor-pointer ${
              deviceMode === 'desktop' ? 'bg-[#00aaff] text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="h-3.5 w-3.5" />
            <span>Màn hình máy tính</span>
          </button>
        </div>

        {/* Fast Actions */}
        <div className="flex items-center gap-2">
          {/* Mock URL Copier */}
          <button
            onClick={handleCopyLink}
            className="hidden md:flex items-center gap-1.5 px-4 py-2 border border-slate-700 hover:border-slate-600 bg-slate-800/50 rounded-full text-xs font-bold text-slate-200 cursor-pointer transition-colors active:scale-95"
          >
            <Copy className="h-3.5 w-3.5" />
            <span>{copied ? 'Đã sao chép!' : 'Sao chép link web'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full cursor-pointer transition-colors text-slate-350 hover:text-white"
            title="Đóng xem thử"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Simulator view frame context */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-6 bg-slate-950/40" id="preview-stage">
        
        {deviceMode === 'mobile' ? (
          /* MOBILE DESIGN LAYOUT FRAME */
          <div className="w-84 max-w-full h-[620px] bg-black rounded-[45px] shadow-2xl border-[12px] border-black overflow-hidden flex flex-col justify-between ring-4 ring-slate-800">
            
            {/* Notch top layout */}
            <div className="h-5 bg-black w-full relative shrink-0">
              <div className="absolute top-0 inset-x-0 mx-auto w-28 h-4.5 bg-black rounded-b-xl z-50 flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-800 mr-2" />
                <span className="w-8 h-1 bg-slate-900 rounded-full" />
              </div>
            </div>

            {/* In-Phone Live Context client viewport */}
            <div className="flex-1 bg-white flex flex-col h-full overflow-y-auto pb-16 scrollbar-thin relative text-gray-800">
              
              {/* Cover Header Hero banner */}
              <div className="p-6 text-white text-center space-y-1 relative" style={{ backgroundColor: project.themeColor }}>
                <div className="text-xl font-extrabold uppercase tracking-tight">{project.logoText || 'MY BRAND'}</div>
                <h1 className="text-sm font-semibold opacity-95">{project.storeName}</h1>
                <p className="text-[10px] opacity-80 max-w-[220px] mx-auto leading-relaxed line-clamp-2">{project.description}</p>
                
                {project.phone && (
                  <a 
                    href={`tel:${project.phone}`}
                    className="inline-flex items-center gap-1 px-3.5 py-1 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-[9px] font-bold mt-2"
                  >
                    <PhoneCall className="h-2.5 w-2.5 text-white" />
                    <span>Liên Hệ: {project.phone}</span>
                  </a>
                )}
              </div>

              {/* Tabs options */}
              <div className="flex border-b border-gray-100 text-xs font-bold text-slate-500 bg-white sticky top-0 z-10">
                <button
                  onClick={() => setSelectedTab('menu')}
                  className="flex-grow py-3.5 text-center border-b-2 font-bold"
                  style={{ 
                    borderBottomColor: selectedTab === 'menu' ? project.themeColor : 'transparent',
                    color: selectedTab === 'menu' ? project.themeColor : 'inherit'
                  }}
                >
                  Thực Đơn Món Ăn
                </button>
                <button
                  onClick={() => setSelectedTab('about')}
                  className="flex-grow py-3.5 text-center border-b-2 font-bold"
                  style={{ 
                    borderBottomColor: selectedTab === 'about' ? project.themeColor : 'transparent',
                    color: selectedTab === 'about' ? project.themeColor : 'inherit'
                  }}
                >
                  Liên Hệ & Bản Đồ
                </button>
              </div>

              {/* Body */}
              {selectedTab === 'menu' ? (
                <div className="p-4 space-y-4">
                  {project.items.filter(i => i.isAvailable).map((item) => (
                    <div key={item.id} className="flex gap-3 bg-[#f8fafc]/50 p-2.5 rounded-xl border border-gray-100 text-[11px] items-center">
                      <img 
                        src={item.imageUrl} 
                        alt="" 
                        referrerPolicy="no-referrer"
                        className="h-14 w-14 rounded-lg object-cover border border-gray-100 shrink-0"
                      />
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="font-bold text-gray-900 truncate leading-snug">{item.name}</div>
                        <div className="font-mono text-gray-500 font-bold">{item.price.toLocaleString('vi-VN')}đ</div>
                        {item.description && <p className="text-gray-400 text-[9px] line-clamp-1">{item.description}</p>}
                      </div>
                      <button
                        onClick={() => handleAddToCart(item)}
                        title="Thêm"
                        className="p-1.5 rounded-full text-white cursor-pointer active:scale-95 transition-transform shrink-0 shadow-sm"
                        style={{ backgroundColor: project.themeColor }}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  {project.items.length === 0 && (
                    <p className="text-center text-xs text-gray-400 py-10">Tiệm đang trong quá trình cập nhật sản phẩm.</p>
                  )}
                </div>
              ) : (
                <div className="p-5 space-y-5 text-xs text-gray-700">
                  <div className="space-y-1 bg-slate-50 p-3.5 rounded-2xl">
                    <h4 className="font-bold uppercase tracking-wider text-[10px]" style={{ color: project.themeColor }}>Thông tin tiệm</h4>
                    <p className="text-[11px] font-medium leading-relaxed">{project.description || 'Chưa cung cấp mô tả trực tiếp.'}</p>
                  </div>
                  <div className="space-y-1 bg-slate-50 p-3.5 rounded-2xl">
                    <h4 className="font-bold uppercase tracking-wider text-[10px]" style={{ color: project.themeColor }}>Đăng ký gọi nhanh</h4>
                    <p className="text-xs font-bold text-gray-900">{project.phone || 'Chưa thiết lập số điện thoại'}</p>
                  </div>
                  <div className="space-y-1 bg-slate-50 p-3.5 rounded-2xl">
                    <h4 className="font-bold uppercase tracking-wider text-[10px]" style={{ color: project.themeColor }}>Vị trí bản đồ hành chính</h4>
                    <div className="rounded-xl bg-gray-200 h-28 flex items-center justify-center text-gray-400 font-semibold text-[10px]">
                      🗺️ GPS Location map satellite
                    </div>
                  </div>
                </div>
              )}

              {/* Float Mobile checkout strip */}
              {cart.length > 0 && (
                <div className="absolute bottom-0 inset-x-0 bg-white border-t border-gray-150 p-3 shadow-2xl z-30 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[9px] text-gray-400">GIỎ SẢN PHẨM:</div>
                    <div className="font-bold font-mono text-[#0056b3]" style={{ color: project.themeColor }}>
                      {totalSum.toLocaleString('vi-VN')}đ
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCart([]);
                      alert(`Đơn hàng đã được ghi nhận thành công! Tổng trị giá: ${totalSum.toLocaleString('vi-VN')}đ. Xin cảm ơn quý khách.`);
                    }}
                    className="px-5 py-2 text-white font-bold text-[10px] rounded-lg cursor-pointer flex items-center gap-1.5 shadow"
                    style={{ backgroundColor: project.themeColor }}
                  >
                    <span>Gửi đơn ({cart.reduce((ac, x) => ac + x.count, 0)})</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        ) : (
          /* DESKTOP STYLE DESIGN PREVIEW IFRAME */
          <div className="w-[1000px] max-w-full h-[620px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-slate-200 ring-4 ring-slate-800">
            {/* Desktop browser toolbar bar */}
            <div className="bg-slate-50 border-b border-gray-150 px-4 py-2 flex items-center gap-2 shrink-0 text-slate-400">
              <span className="h-3 w-3 rounded-full bg-rose-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <div className="bg-white border border-gray-200 text-slate-500 font-mono text-[10px] rounded-md px-4 py-1 flex-1 max-w-[20rem] ml-4 flex items-center justify-between">
                <span>webchoviet.com/live/{project.id}</span>
                <ExternalLink className="h-3 w-3 text-slate-300" />
              </div>
            </div>

            {/* Desktop rendered window page view */}
            <div className="flex-1 overflow-y-auto flex">
              {/* Left Column menu details */}
              <div className="flex-1 p-8 space-y-6">
                <div>
                  <h1 className="text-3xl font-display font-extrabold" style={{ color: project.themeColor }}>
                    {project.storeName}
                  </h1>
                  <p className="text-xs text-gray-500 mt-2 max-w-xl leading-relaxed">{project.description}</p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold border-b pb-1">Dịch Vụ & Thực Đơn Cửa Hàng</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {project.items.filter(i => i.isAvailable).map((item) => (
                      <div key={item.id} className="flex gap-4 p-3 bg-slate-50 rounded-xl border border-gray-100 text-xs items-center justify-between">
                        <div className="flex gap-3 items-center min-w-0">
                          <img 
                            src={item.imageUrl} 
                            alt="" 
                            referrerPolicy="no-referrer"
                            className="h-12 w-12 rounded-lg object-cover"
                          />
                          <div className="min-w-0">
                            <h4 className="font-bold text-gray-800 truncate">{item.name}</h4>
                            <p className="font-mono text-[10px] text-gray-500 font-semibold">{item.price.toLocaleString('vi-VN')}đ</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="px-3 py-1.5 text-[10px] font-bold text-white rounded-lg cursor-pointer transition-shadow"
                          style={{ backgroundColor: project.themeColor }}
                        >
                          Chọn
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right panel desktop side layout: info / contact details */}
              <div className="w-80 border-l border-gray-150 p-6 bg-slate-50/50 flex flex-col justify-between shrink-0 text-xs">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[10px]">Định vị cửa hàng</h3>
                    <div className="h-32 bg-slate-200 rounded-xl flex items-center justify-center text-gray-400 font-semibold text-[10px]">
                      🗺️ Satellite GPS widget map
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-bold text-gray-800 uppercase tracking-wider text-[10px]">Liên Hệ Đặt Chỗ</h3>
                    <p className="font-mono font-bold text-base text-gray-800">{project.phone || '0987.654.321'}</p>
                  </div>
                </div>

                {/* Desktop basket checkout element */}
                <div className="bg-white border rounded-2xl p-4 shadow-sm space-y-3 mt-6">
                  <h4 className="font-extrabold text-[10px] uppercase tracking-wider text-gray-400">Giỏ hàng của bạn</h4>
                  {cart.length > 0 ? (
                    <div className="space-y-2 max-h-32 overflow-y-auto font-mono text-[10px]">
                      {cart.map(c => (
                        <div key={c.item.id} className="flex justify-between text-gray-600">
                          <span>{c.item.name} x {c.count}</span>
                          <span>{(c.item.price * c.count).toLocaleString('vi-VN')}đ</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] text-gray-400">Trống rỗng.</p>
                  )}
                  {cart.length > 0 && (
                    <div className="pt-2 border-t border-gray-100 flex items-center justify-between font-bold text-gray-800 text-[11px]">
                      <span>Tổng giá:</span>
                      <span className="font-mono text-[#0056b3]" style={{ color: project.themeColor }}>{totalSum.toLocaleString('vi-VN')}đ</span>
                    </div>
                  )}
                  <button 
                    disabled={cart.length === 0}
                    onClick={() => {
                      setCart([]);
                      alert('Cảm ơn bạn đã lựa chọn tin dùng dịch vụ của chúng tôi! Giao dịch được liên kết chuyển khoản!');
                    }}
                    className="w-full py-2 bg-slate-800 hover:bg-slate-900 disabled:opacity-50 text-white font-bold text-[10px] rounded-lg transition-colors cursor-pointer text-center"
                    style={{ backgroundColor: cart.length > 0 ? project.themeColor : '#cbd5e1' }}
                  >
                    Gửi yêu cầu đơn hàng
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Floating hints footer section */}
      <div className="bg-[#1e293b] border-t border-slate-800 px-6 py-3.5 text-center shrink-0 text-xs text-slate-400 flex items-center justify-center gap-3">
        <span>💡 Đây là chế độ hiển thị xem thử thời gian thực của WebChoViet.</span>
        <button 
          onClick={handleCopyLink}
          className="text-white font-bold text-xs underline cursor-pointer hover:text-indigo-400"
        >
          {copied ? 'Đã sao chép đường dẫn!' : 'Bấm vào đây để lấy liên kết chia sẻ của bạn.'}
        </button>
      </div>
    </div>
  );
}
