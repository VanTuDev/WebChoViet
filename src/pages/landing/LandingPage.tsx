import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TEMPLATES } from '../../data';
import { ROUTES } from '../../config/routes';
import SiteHeader from '../../components/shared/SiteHeader';
import SiteFooter from '../../components/shared/SiteFooter';
import LoginModal from '../../components/shared/LoginModal';

/* ── Material Symbol icon wrapper ──────────────────────────────────────── */
function MI({ name, className = '' }: { name: string; className?: string }) {
  return <span className={`material-symbols-outlined ${className}`}>{name}</span>;
}

/* ── Filter chip config ────────────────────────────────────────────────── */
const FILTER_CHIPS = [
  { id: 'all',        label: 'Tất cả' },
  { id: 'coffee',     label: 'Quán Cafe' },
  { id: 'restaurant', label: 'Nhà hàng' },
  { id: 'flower',     label: 'Shop hoa' },
];

const TMPL_NAMES = ['The Morning Brew', 'Iron Fitness', 'Bloom Studio', 'Bistro Locale'];
const TMPL_CATS  = ['Cafe & Trà sữa', 'Phòng Gym & Yoga', 'Cửa hàng Hoa', 'Nhà hàng & Quán ăn'];

/* ═══════════════════════════════════════════════════════════════════════ */
export default function LandingPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [showLogin, setShowLogin] = useState(false);
  const [loginTab, setLoginTab] = useState<'login' | 'register'>('login');

  const openLogin = (tab: 'login' | 'register' = 'login') => {
    setLoginTab(tab);
    setShowLogin(true);
  };
  const goToDashboard = () => navigate(ROUTES.DASHBOARD_PROJECTS);

  /* Scroll-reveal */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const showcased = TEMPLATES.slice(0, 4);

  return (
    <div className="bg-surface text-on-surface antialiased overflow-x-hidden selection:bg-secondary-container selection:text-on-secondary-container relative min-h-screen">

      {/* ── Decorative background blobs ────────────────────────────────── */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-fixed/30 blur-[100px] -z-10 pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[50%] rounded-full bg-secondary-fixed/20 blur-[120px] -z-10 pointer-events-none" />

      <SiteHeader variant="landing" onShowLogin={openLogin} />

      <main className="pt-[100px] pb-20">

        {/* ════════════════════════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════════════════════════ */}
        <section className="animate-on-scroll max-w-[1280px] mx-auto px-6 pt-20 pb-20 flex flex-col lg:flex-row items-center gap-20">

          {/* Left — text */}
          <div className="lg:w-1/2 flex flex-col items-start space-y-6">
            <div className="inline-flex items-center gap-1 bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full text-xs font-semibold font-inter">
              <MI name="bolt" className="text-[16px]" />
              Giải pháp nhanh gọn cho chủ shop
            </div>

            <h1 className="font-lexend font-bold text-[48px] leading-[1.2] tracking-tight text-primary">
              Biến Google Maps thành Website &amp; Menu QR chuyên nghiệp trong 30 giây
            </h1>

            <p className="font-inter text-[18px] leading-[1.6] text-on-surface-variant max-w-lg">
              Không cần biết code. Chỉ cần dán link Google Maps của bạn, webchoviet sẽ tự động tạo một trang web tuyệt đẹp, tối ưu hóa cho di động và sẵn sàng thu hút khách hàng.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-3 w-full sm:w-auto">
              <button
                onClick={goToDashboard}
                className="bg-secondary-container text-on-secondary-container font-inter font-medium text-sm px-10 py-3.5 rounded-full shadow-md shadow-primary/10 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-1 cursor-pointer"
              >
                Bắt đầu miễn phí ngay
                <MI name="arrow_forward" className="text-[20px]" />
              </button>
              <button
                onClick={goToDashboard}
                className="bg-surface-container-lowest text-primary border border-outline-variant font-inter font-medium text-sm px-10 py-3.5 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <MI name="play_circle" className="text-[20px]" />
                Xem demo
              </button>
            </div>
          </div>

          {/* Right — floating image */}
          <div className="lg:w-1/2 w-full relative floating">
            <div className="absolute inset-0 bg-gradient-to-tr from-secondary-fixed/40 to-primary-fixed/20 rounded-[3rem] rotate-3 scale-105 -z-10" />
            <div className="bg-surface-container-lowest rounded-[2rem] p-3 shadow-xl shadow-primary/5 border border-outline-variant/30">
              <img
                className="w-full h-auto rounded-[1rem] object-cover aspect-[4/3]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQoMz0YvfyhaGdi32H71jL9Ok6eY0_9tC6zk5x7X6FGqokHK2kSKieZBf4XG6AMZyB2MuYkQbK7ircYWiC36iy8c-GWR3jhkrEg193FUumWy0qDg-qzzQDh4dt9ZVDUk0aPEVvU-E9JQhXhbNn9_43RUbXZtBwjzjwW3nFhyQ1rRIDDJbAbVMZQyyakFnZeNfzqfnZmzSqkY5TdV4XxdecblzkzWEYxt5q5x3jmMIuwC8Vw1_TQQFHor0Bm4DA5WkxyUatgZV0vWo"
                alt="Chủ quán cafe với mã QR chuyên nghiệp"
              />
            </div>
            <div
              className="absolute -bottom-6 -left-6 glass-panel rounded-xl p-3 flex items-center gap-3 shadow-lg shadow-primary/10 animate-bounce"
              style={{ animationDuration: '3s' }}
            >
              <div className="bg-green-100 text-green-700 rounded-full p-1 flex items-center justify-center">
                <MI name="check_circle" className="text-[24px]" />
              </div>
              <div>
                <p className="font-inter font-semibold text-[12px] text-on-surface">Website đã sẵn sàng!</p>
                <p className="text-[10px] text-on-surface-variant">Vừa tạo xong 2 phút trước</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            FEATURES — Bento Grid
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="animate-on-scroll max-w-[1280px] mx-auto px-6 py-20"
          style={{ animationDelay: '100ms' }}
        >
          <div className="text-center mb-10">
            <h2 className="font-lexend font-semibold text-[32px] leading-[1.3] text-primary mb-3">
              Mọi thứ bạn cần để tỏa sáng online
            </h2>
            <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant max-w-2xl mx-auto">
              Công cụ mạnh mẽ nhưng cực kỳ dễ sử dụng, thiết kế dành riêng cho các chủ doanh nghiệp bận rộn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-surface-container-lowest rounded-[2rem] p-10 border border-outline-variant/30 shadow-md shadow-primary/5 glow-hover flex flex-col h-full group">
              <div className="w-12 h-12 rounded-xl bg-primary-fixed text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MI name="map" />
              </div>
              <h3 className="font-lexend font-semibold text-[24px] leading-[1.4] text-on-surface mb-3">
                Tự động hóa từ Google Maps
              </h3>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant flex-grow">
                Dán link, nhận ngay website với đầy đủ đánh giá, hình ảnh và thông tin liên hệ được đồng bộ tự động. Không cần gõ lại một chữ.
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-[2rem] p-10 border border-outline-variant/30 shadow-md shadow-primary/5 glow-hover flex flex-col h-full group">
              <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MI name="translate" />
              </div>
              <h3 className="font-lexend font-semibold text-[24px] leading-[1.4] text-on-surface mb-3">
                Menu đa ngôn ngữ thông minh
              </h3>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant flex-grow">
                Hệ thống tự động nhận diện ngôn ngữ của khách hàng và chuyển đổi giao diện Việt/Anh mượt mà, ghi điểm với khách du lịch nước ngoài.
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-[2rem] p-10 border border-outline-variant/30 shadow-md shadow-primary/5 glow-hover flex flex-col h-full group">
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <MI name="qr_code_scanner" />
              </div>
              <h3 className="font-lexend font-semibold text-[24px] leading-[1.4] text-on-surface mb-3">
                Mã QR động &amp; Độc quyền
              </h3>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant flex-grow">
                Tạo mã QR đặt bàn có logo quán. In một lần, cập nhật menu hay giá bán mãi mãi trên hệ thống mà không cần in lại.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            TEMPLATE GALLERY
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="animate-on-scroll bg-surface-container-low py-20 mt-6"
          style={{ animationDelay: '200ms' }}
        >
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-3">
              <div>
                <h2 className="font-lexend font-semibold text-[32px] leading-[1.3] text-primary mb-1">
                  Giao diện tuyệt đẹp, sẵn sàng sử dụng
                </h2>
                <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant">
                  Chọn từ kho giao diện được thiết kế chuyên biệt cho từng ngành hàng.
                </p>
              </div>
              <div className="flex flex-wrap gap-1">
                {FILTER_CHIPS.map(f => (
                  <button
                    key={f.id}
                    onClick={() => setActiveFilter(f.id)}
                    className={`font-inter font-semibold text-xs px-3 py-1 rounded-full cursor-pointer border transition-colors ${
                      activeFilter === f.id
                        ? 'bg-primary-fixed text-on-primary-fixed border-transparent'
                        : 'bg-surface text-primary border-outline-variant hover:border-primary'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {showcased.map((tmpl, i) => (
                <div
                  key={tmpl.id}
                  className="group cursor-pointer glow-hover p-1 rounded-[1.25rem] bg-transparent"
                  onClick={goToDashboard}
                >
                  <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm shadow-primary/5 border border-outline-variant/30 mb-3 relative aspect-[3/4]">
                    <img
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      src={tmpl.imageUrl}
                      alt={TMPL_NAMES[i]}
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="bg-surface text-primary font-inter font-medium text-sm px-6 py-3 rounded-full shadow-lg">
                        Xem trước
                      </span>
                    </div>
                  </div>
                  <h4 className="font-inter font-semibold text-[18px] text-on-surface">{TMPL_NAMES[i]}</h4>
                  <p className="font-inter font-semibold text-xs text-on-surface-variant">{TMPL_CATS[i]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            HOW IT WORKS
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="animate-on-scroll max-w-[1280px] mx-auto px-6 py-20"
          style={{ animationDelay: '300ms' }}
        >
          <div className="text-center mb-20">
            <h2 className="font-lexend font-semibold text-[32px] leading-[1.3] text-primary mb-3">
              Lên sóng chỉ trong 3 bước
            </h2>
            <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant max-w-2xl mx-auto">
              Đơn giản hóa mọi quy trình kỹ thuật phức tạp, nhường chỗ cho sự sáng tạo của bạn.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-outline-variant/50 z-0" />

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative z-10 md:w-1/3 px-6 mb-10 md:mb-0">
              <div className="w-24 h-24 rounded-full bg-surface border-4 border-primary-fixed flex items-center justify-center mb-6 shadow-md shadow-primary/10 text-primary">
                <MI name="login" className="text-[40px]" />
              </div>
              <div className="bg-primary text-on-primary font-inter font-semibold text-xs w-8 h-8 rounded-full flex items-center justify-center absolute top-0 -ml-12 md:ml-0 md:-mt-4 z-20">1</div>
              <h3 className="font-lexend font-semibold text-[24px] leading-[1.4] text-on-surface mb-1">Đăng nhập</h3>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant">
                Tạo tài khoản nhanh chóng bằng Google hoặc Email của bạn.
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative z-10 md:w-1/3 px-6 mb-10 md:mb-0">
              <div className="w-24 h-24 rounded-full bg-surface border-4 border-secondary-fixed flex items-center justify-center mb-6 shadow-md shadow-primary/10 text-secondary">
                <MI name="content_paste" className="text-[40px]" />
              </div>
              <div className="bg-secondary text-on-secondary font-inter font-semibold text-xs w-8 h-8 rounded-full flex items-center justify-center absolute top-0 -ml-12 md:ml-0 md:-mt-4 z-20">2</div>
              <h3 className="font-lexend font-semibold text-[24px] leading-[1.4] text-on-surface mb-1">Dán Link / Chỉnh sửa</h3>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant">
                Dán link Google Maps để AI tự động tạo trang, hoặc chọn mẫu và tự tinh chỉnh theo ý thích.
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative z-10 md:w-1/3 px-6">
              <div className="w-24 h-24 rounded-full bg-surface border-4 border-secondary-container/50 flex items-center justify-center mb-6 shadow-md shadow-primary/10 text-secondary-container">
                <MI name="rocket_launch" className="text-[40px]" />
              </div>
              <div className="bg-secondary-container text-on-secondary-container font-inter font-semibold text-xs w-8 h-8 rounded-full flex items-center justify-center absolute top-0 -ml-12 md:ml-0 md:-mt-4 z-20">3</div>
              <h3 className="font-lexend font-semibold text-[24px] leading-[1.4] text-on-surface mb-1">Xuất bản</h3>
              <p className="font-inter text-[16px] leading-[1.6] text-on-surface-variant">
                Nhấn nút xuất bản, nhận mã QR và bắt đầu đón khách hàng mới ngay lập tức.
              </p>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════════════════════
            CTA SECTION
        ════════════════════════════════════════════════════════════════ */}
        <section
          className="animate-on-scroll max-w-[1280px] mx-auto px-6 py-20"
          style={{ animationDelay: '400ms' }}
        >
          <div className="bg-primary text-on-primary rounded-[2rem] p-20 text-center relative overflow-hidden shadow-xl shadow-primary/20">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-container/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
            <h2 className="font-lexend font-bold text-[48px] leading-[1.2] tracking-tight mb-3 relative z-10">
              Sẵn sàng để chuyên nghiệp hóa cửa hàng?
            </h2>
            <p className="font-inter text-[18px] leading-[1.6] text-primary-fixed-dim mb-10 max-w-xl mx-auto relative z-10">
              Bắt đầu xây dựng hình ảnh chuyên nghiệp trên internet ngay hôm nay. Miễn phí trải nghiệm các tính năng cơ bản.
            </p>
            <button
              onClick={goToDashboard}
              className="bg-secondary-container text-on-secondary-container font-inter font-medium text-sm px-20 py-3.5 rounded-full shadow-lg shadow-secondary-container/30 hover:bg-white hover:text-primary hover:scale-105 transition-all relative z-10 cursor-pointer"
            >
              Bắt đầu miễn phí ngay
            </button>
          </div>
        </section>
      </main>

      <SiteFooter variant="landing" />

      {showLogin && <LoginModal defaultTab={loginTab} onClose={() => setShowLogin(false)} />}
    </div>
  );
}
