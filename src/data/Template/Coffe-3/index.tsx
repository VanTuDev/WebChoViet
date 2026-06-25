import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import { useTemplateCustom } from '../../../context/TemplateCustomContext';
import { deepMerge } from '../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../utils/googleMaps';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: Lang; }

const glassCard = {
  background: 'rgba(255,255,255,0.7)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(255,255,255,0.3)',
} as const;

const IMAGES = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaIGKuFpa2TTNgzB0NYKf_gM_H-BGiTv-TdhklJBmJ2sXnSHeT3_cA_gztVBTb91bIG9KqhB7Y62KA4ZXx01hqQSw9JrpL0dQ4MTW1Gm38v2HaABOHfLDE9bEsy4uSlkfQBDDs4dJlu5ZrSCMZyLUWxQWrjnSNgkwi2R7WEAqCmOBHfsrNoYqLgCU2XIxTe3Ua5Xj4PZnOEj7gDrw9wzK9FG2TCP8-mxsJXyJVdffTwPbcaQ_6EZK7EU1tbf3kSQuY_Xop9jPlHVs',
  coffee: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD-63Lw3K3eym8gOyhSjOo4gyyKtRkCo2XRdgGhxZ8bEN8NKz1C-mRoXFq_-t0DtuIP0eya0am2ArVqhcHkKE_-DG2hdBkroLi3sJRN7C-VxTwlXPPJSEvmW6NksDkBoT8ZzHRbdiUpWHIR3BCyCMW7uGA0IuwamFNHyD2OBA70AUJQA7xeBN9EYgjST26amPoBWgQGCV2rB6rIT1tw-uJt4bmNhB2_y9abcfITFJE1jjpWxCGyR5fOBuCAYTQTKHnVUIEwqvAACIM',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBeepJ6yNlHQrKeY4B0Ucby3Fpwi9ZHE19mpAZ91WBQwcBRgr7i9RyeYcpzAVeFohEzQ88ND0JNzV78Oyy3qzov3oBjnMedF18rC2kRBK1_KNLHnsB-FFxsr2YSPcAxcW-MvRZIofb8QmFNvnoCRBC3r8GBX2YfP9wvJlPaulIM2GkJc7gvPLAWxnokP8eHnJkY-y3VkHl21LfW0jwzgLiLR8o_dctVMcVRjuxCQYDLyd8N5-8DJBDAMGYsiESVr4Th55N0LoXrJSk',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCyL5zw-799eVfVL1zPfD6MBGHTDL7xvQmkgjFIJ_cavb3MXpvVlrztKAvIlupss9k5ObF_GlN6db2ZgE4BhBu1K8lkTM1NvY8mQtaKmHbBvG5YpPFVtAUJRGwbSnL0PX2QZvRMIsbsIO3Qh76qxbHdfUVz1YYiupMwq1t7fCvc8cCTcKyDE6-JxIDci-AfiliiRRr4ph1cPiyEWNsOS0PrfYmrmz6bIOsCBnzvGweqXZe53Yh2Khh2c1gWV-GMeAEqGhSotfFW_9s',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBtaOKhyhwfyXPLT1f62NuDjAGV2t5_KNOjPOLUUUGh2djM6ruXa8ZByhMjk3f4_4SrPxkignFtkL8ZajkYQX5qCoChsMSYjOWF158GUlXwodeM8-_A092ez41ACsOrP3zM0iMBwC0eX6FBoazpHLYuXGe7X74HNgrCn143sUifpi37sKO0ND-hLS3UV954MQu56z6bJaEHwEE2yGjhwSI-z5Cr8qx47GeZlWlLqQeRkbq-_KdDLUo-JdgRHaI2smIG_L4w9TU4bOo',
  ],
  tea: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBY8-dW-MifWxH-aXLQiHnQ5Yt3buz5RIOZHbeHz2_u7pHWwzF5YUCZKUTIKqYt9qaiU2CoA750y6oW5rP1eQQk5eFaj7PEe8IdsFP6N8FRKKn9bpadwa6eNrfC-XiuXQOjqZEjNyoHov5M7fVoohAvpc0QehNBs7Oshnpvj3p80Aic5-rVIglkkanM3tAJFPXkfUgAz8dqFmdObfZydhrIUZlVJbLXyFdaguixgmTowEZi2R71nzOwTEx5Q4yfeHustW7dDrNElHA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBLn5JLJYM4DnFXTb6_yuNPMwH5sOca2hui57sPEEPBbs6-wU64HyN8FwD6mqrdH1sKxP61-3yLRW7bZ-6iSCSMkx6U7l4BMsb1-9UGmNM_fGtNXhXlGY1NLj1SiL2vpTh0Q09Xv5-rq-Xj7cEn5qeIHYjAR7EQemKI_Kd5O8jp-UCefhtvoMe7iGLAPwuklRFWzgjWmucg7YafTWvklyfeZoi7nrO3r-uOGdxaATUWutDdTj3S_mZeMz3hwnugg2hpDrFArsvs6fY',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuA9_vYIHwdlPxpfUCPuacnf_cKFggGEyUyk-l_eO8z_gus1wOJhwkGWk6luLUTQHieZtdCqRyKv6SijWWA6x5O-uusMnWABsqJKPQeUgT3mgcPiNTioXCZ0FPuOtFI_xFERCPeZMipgLGIXJoiH1xiCxZ_HDIAmK-1xRN_ebSBU-AmKF6ElpT6eJZXsoGQrxnfFmz6aY3-mm889UfRQ3JG6ZO0rSuyJ-jP6stpjHxKz90IVnIBKWI0g1na-uhnJim9Qxj3zSWcQv6E',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAPf5Q918Vjt1KEYc02Y20aOt7k0Gzi1NrgtpXQFvuterWiPuTfpWQYYChBdVtBnAvQB1iOyTpACNR7sUIQZjIHLD1yywPlFSuJlEzaTzkdfRi0lzhouTTqe_Cd8GO06n4g3elKlTJLIHnQo0ktCuU6m7L5OVgK26ByK6Sd6TWaG0_Kbykmyta5hdGZoRRQQQmv1msayhq5Dl1iAGpOtN9eh9Fh-48XteH0ZV0j5kiOkbJc0yxC0AkBDwoVSK5FJpnZVjBdPBQnEJ0',
  ],
  pastries: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBlkRtenUSmnrjf7_BUzNCC6hrYAYk_GMIedXDiT-Cyr5LvO04j06nc2lKQ8S5ftmS7_P3YrjhganlhqKmVsEHv1zbX6oL3GVx8M9hAPjzoF_-_IeaSR8Z2T_kmrVl4ob8RXR0wmYCBENksgoL_D7680BZZE0d4ZRYO10eeN_xVzmSRqUIHaYETSL4MGWOe5W7SyDzfjYozq_guhe1webvyOpk4QBVRrNEFOG-6jCfgEQJLYmutsaAQrvdlg-yptQYt2YLnHeXgVO4',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuABybs42o_rdPbd5AApNQGWJeuIBWqcT43JaQy2xOYuWNkBIWeoUfc56Eqs12WhGanvs3MLPpp6hr7Fk2w-S7i9DH6AFqMaZMBtmHSebrtpWw6MjncOBhIP56WDO7wj1NmlYufqq8BN8SHbA394Kklqf-T1UWCT9lcmWiXed62ZxLyrW8KHJV7TtC6vwupCVFbYE0VvJpJYnkKmbt5g29YiRUpFB68347FcIwC3CSPF6qvJyr2BNHE7capDJWDHtevGTy4QRovrrCY',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBxJR1Xh7IoI4cwWc7P4rKU0UcKn9dYcduQ0zUTx2Y693M_HvvwwOdHmGtR1khPHWSAGaYzs-5zbTYJ57xBmVsLXbPvEEDH36xgt67-7GSSwgRakDxvElintGCAnN51bMVJTWD1Hn-fSDbFHWKlBxh6z_iLrvBIroIfGIXlDYiV57OL4CJNCGSd6W_FTMdihog72WDUeDflWLZL7I5AilZSNVmdJFQXfq9HIVyY5mshYndm3Rif1RMczM9BQfFGcIxIY0YOna1aeMI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAG5WA5TT1KFiy-bXMvUvULtk5IHljwKxu3lpfokLm_JWqzwq0RJffEXrqPhTscC7zMmGebqfOHbrsMTtBofYXObNfYJ9D9Zo-W89YbPoqVjHydG3YYDpLt7fd-ArrKo37YUsFlDpQHoRviMCLtco6tRWKnjgqZYRNyukV_5LQoJDL6U_dQNcvgwfIEM6xVODM0JUBZHMv2CNY61gtxCljWZKflyD7NwoVXTk-MAmLN5NwvWeZOO6ssJQi4wH_DBD0FBbqzHYOog2o',
  ],
  gallery: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAnsgRWnILkA2bmaF3y1od56BBVaG4hwAYnvGsNsND4iMuGR8g2XQjnRkdBObc7OvLAQqRQrkLPsRnudzQ2bK4pIVhjGuYr0n9Iye1pn0dJ2E5RcFfjqOuAo5VzDzSwXKbtl5ZewuTq-RewtmqPf6uGB7sS1orW65YG06pe0MYaRZc-F5nX1eGZSUy4Lntn-hf2GcblAfxIStEU-5H1sJOnhvj5wXC4caifokNpZI4EHKd8NY3wXLPXuXjAcS1INYM8Bw8uea0h_As',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBZdy6mOGTrEgpW2zSP6ryn5ntzMIie5A9C_TzOEt1klZwu47EpO2xjyQkPDpq60zrRp8I-oLS8pgUOAW9HNZEkkuFZ9DzHd77AMexuBv9t8sl5tHafxzn0a2JpdAy2kJZldjzhlGMVstIvpRz1k2tvYQVmnZJoHh2EORJmuZMff5Qr0hgI_TwW7v08kqoYuUcpgoUgEkkdHGtqgv9uS7n626wdfU4tb8qg99FTaYBQ7fidGWtKbhtVyx-_K2l6GA3uIG5NXoUh-LM',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDnvjmE8r_CqRB-MpP158vGnXsGRyBuezDJNGTS8r0jQ_83aG5tKwBuBF7H2KpM07njVIW2xktQthwefCD01f9MDV2WXTV8b6jYzO4TvS99p4XpbdiF6zuI1T7p0KaeXzeQbqteIw0Oy4xf5eXuGfJwZNghKYn4hvUVWX9GJb2PExJTIGSaf3QuzftbhbYo-Z959xvQSqnfXJaNRp-vmI9jvAZfBV-TpGVKJK1zI-_B0QssXJTzyjrlcmvPpwHaOxQmhbNstsn_6MM',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCelo9G7sRxFTGYP2aCEVdzcC3Ij6XtQECc_hHd2sIgckrHyN0bNa02HxeIaMXexjNwQiFMOnswAdXdWHKfbHeCe8Hwu0glEK6GN0pVYE34SvqX52Xcmy7ivP8qtpHTcUPw-BUpK8Dc6NODpC7rQsStLc7gyVaxtIvjyL4juIeZG8yF5xoyai5UkIoTFB_Ua4juvuGCdYc1EawEouRIB62K2VGnnBeyEeO6m-sis1HGyF2e213TZYNhvaiRmcXFIGEI4Cf3ai1XWqc',
  ],
  testimonials: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDCCl806gjLz9Y3Lx0fQXrbT8-vBBQU75d8mTVArlspbx9VQZaS_Xzq8rX28USnN7dwwbO-m-obJ_6AOHjWWduxT9TuiXRegLoI_TFii9c9M--t8Vc21I3XWU4eSrmZWuNPuJWLjhX5ke_SxWml_IGZqaVwkoU2hvI7PCgrmVyQBR90aDHrVsW7klCLW8wK6OLQrr7odvWf6R0wMFLzxAVWyr9e5w0_TiS74rLG-pUEPlmkH31GH3N-ky3qqE3nN5_YAflAh7n8kCc',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBoW6lp5I8BjFaQkBTMr3bRVnMFBRio4sUftKwCX98yVoSiSlNsVx13LqBOVpswlrRhqtHgkl0aefO2wEZKfm4w1z822FUOUaG0J012MTXcST8qKE6hPUOanjDxw9EceSq5A7wmRC0DwlFms0pxLebZm5Gl-Pb8QPannQHUxgqQkWe9GTlBSsovwXpu01Zkg6SEn4bK0sFin28aCSuhTzeAL0GI9EKHwEFL-z-xTb2cVRUxWvkMJd5WqS6Q8dRkVFpOPoNpigEF_AI',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDtu-REiPVbO_pnUQtgfrU7PhDszT5aNR8LD_CxaNiP0JgGWCDVuc8VbJxXlyRGZFvv73eDYqOzFFMvRTLRBrSsBKnt2BtMK5l2mJNhJWyF2BYqAJvjl33r5RbRRRolVQ1-gboexB9AieSX5jPs1OBc2AGTj5kbk10Uh3p28lqF6IR1CNWH3vT1JoGdSveJ9tz7y7qwsDl3GPr64JJjLA407uzMq4FPkuYlm3F7N1i8O8b9xwE0BFnIZ8P-3UEJUkJk7t9KAIh_uw0',
  ],
  map: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDO03_YRODKk8oKzMyC5jNXNToS9lAc8Gj_pKEpKpcTda1MXc41p5sWF2nCZWBKsoYOZRyln_jLtUIs0Prn2fTyYssnvjpRx8vqsf4jH6T6_2xS1mcGH7bv3qQpNMudioAVeMxhaN7JEffzj5_x0dBcmDSn8JN8uGrGrALqo20OIBD8EYp4w6d0HkK3XE-YvPpP9xpPcgLKC1VXusyBd1WiP53CUlIifCDk9X97NXxUEVDqC8kab5JRLhreESWCqCNxeuL5Bym9Vsc',
};

type Category = 'coffee' | 'tea' | 'pastries';

export default function Coffe3({ lang = 'vi' }: Props) {
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[lang] as Record<string, unknown>, customData) as typeof viJson;

  function renderMenuItems(category: Category, defaultImgs: string[]) {
    const raw = t.menu[category].items;
    const items: typeof viJson.menu.coffee.items = Array.isArray(raw) ? raw : [];
    return items.map((item, i) => {
      const imgSrc = images[`menu_${category}_items_${i}`] ?? defaultImgs[i] ?? '';
      return (
        <div key={i} className="group bg-white p-3 rounded-2xl hover:shadow-xl transition-all border border-[#c2c6d4]/30">
          <div className="relative h-48 mb-3 overflow-hidden rounded-xl">
            <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={imgSrc} alt={item.name} />
            {item.badge && (
              <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full ${item.badge === 'HOT' ? 'bg-[#ba1a1a] text-white' : 'bg-secondary text-white'}`}>{item.badge}</span>
            )}
          </div>
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-sm font-medium text-[#191c1e]">{item.name}</h4>
              <p className="text-xs font-semibold text-[#424752]">{item.desc}</p>
            </div>
            <span className="text-sm font-medium text-primary">{item.price}</span>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="bg-[#f7f9fb] font-inter text-[#191c1e]">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-md border-b border-[#c2c6d4]/30 shadow-sm">
        <div className="flex justify-between items-center px-10 py-3 max-w-[1280px] mx-auto">
          <a className="font-lexend text-2xl font-bold text-primary" href="#">{t.nav.brand}</a>
          <div className="hidden md:flex items-center gap-6">
            <a className="text-base text-primary border-b-2 border-primary pb-1" href="#">{t.nav.home}</a>
            <a className="text-base text-[#424752] hover:text-primary transition-colors" href="#menu">{t.nav.menu}</a>
            <a className="text-base text-[#424752] hover:text-primary transition-colors" href="#gallery">{t.nav.gallery}</a>
            <a className="text-base text-[#424752] hover:text-primary transition-colors" href="#reviews">{t.nav.reviews}</a>
            <a className="text-base text-[#424752] hover:text-primary transition-colors" href="#contact">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-6">
            <span className="hidden lg:inline text-sm font-medium text-[#424752]">VN | EN | ZH | KO</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${IMAGES.hero}')` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-[#f7f9fb]/80 via-[#f7f9fb]/40 to-transparent" />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-10 w-full">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block px-3 py-1 bg-[#cce5ff] text-[#004b73] rounded-full text-xs font-semibold tracking-wider uppercase">
              {t.hero.badge}
            </span>
            <h1 className="font-lexend text-[48px] leading-[1.2] font-bold tracking-[-0.02em] text-primary">
              {t.hero.title}<br />
              <span className="text-secondary">{t.hero.titleHighlight}</span>
            </h1>
            <p className="text-lg leading-[1.6] text-[#424752] max-w-lg">{t.hero.subtitle}</p>
            <div className="flex gap-3 pt-6">
              <a className="bg-primary text-white px-20 py-6 rounded-2xl text-sm font-medium hover:scale-105 transition-all shadow-lg flex items-center gap-2" href="#menu">
                {t.hero.btnMenu}
                <span className="material-symbols-outlined">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Menu */}
      <section className="py-20 max-w-[1280px] mx-auto px-10" id="menu">
        <div className="text-center mb-20 space-y-3">
          <h2 className="font-lexend text-[32px] leading-[1.3] font-semibold text-primary">{t.menu.sectionTitle}</h2>
          <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
          <p className="text-base leading-[1.6] text-[#424752]">{t.menu.sectionSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>coffee</span>
              <h3 className="font-lexend text-2xl font-semibold text-primary">{t.menu.coffee.title}</h3>
            </div>
            {renderMenuItems('coffee', IMAGES.coffee)}
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              <h3 className="font-lexend text-2xl font-semibold text-primary">{t.menu.tea.title}</h3>
            </div>
            {renderMenuItems('tea', IMAGES.tea)}
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bakery_dining</span>
              <h3 className="font-lexend text-2xl font-semibold text-primary">{t.menu.pastries.title}</h3>
            </div>
            {renderMenuItems('pastries', IMAGES.pastries)}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 bg-[#f2f4f6]" id="gallery">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="text-center mb-20">
            <h2 className="font-lexend text-[32px] leading-[1.3] font-semibold text-primary">{t.gallery.sectionTitle}</h2>
            <p className="text-base leading-[1.6] text-[#424752] mt-3">{t.gallery.sectionSubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-[800px] md:h-[600px]">
            <div className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden group relative">
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex items-center justify-center">
                <span className="text-white text-sm font-medium border border-white px-6 py-3 rounded-full">{t.gallery.viewAll}</span>
              </div>
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMAGES.gallery[0]} alt="Gallery Main" />
            </div>
            <div className="rounded-2xl overflow-hidden group">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMAGES.gallery[1]} alt="Gallery 2" />
            </div>
            <div className="rounded-2xl overflow-hidden group">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMAGES.gallery[2]} alt="Gallery 3" />
            </div>
            <div className="md:col-span-2 rounded-2xl overflow-hidden group">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMAGES.gallery[3]} alt="Gallery Bar" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 max-w-[1280px] mx-auto px-10" id="reviews">
        <div className="text-center mb-20">
          <h2 className="font-lexend text-[32px] leading-[1.3] font-semibold text-primary">{t.testimonials.sectionTitle}</h2>
          <p className="text-base leading-[1.6] text-[#424752] mt-3">{t.testimonials.sectionSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {(Array.isArray(t.testimonials.items) ? t.testimonials.items : []).map((item, i) => (
            <div key={i} className="p-10 rounded-2xl shadow-sm border border-[#c2c6d4]/20 hover:-translate-y-2 transition-all" style={glassCard}>
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary-container">
                  <img className="w-full h-full object-cover" src={IMAGES.testimonials[i]} alt={item.name} />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-primary">{item.name}</h4>
                  <div className="flex text-secondary text-sm">
                    {Array.from({ length: Math.floor(item.stars) }).map((_, si) => (
                      <span key={si} className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                    {item.stars % 1 !== 0 && (
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-base leading-[1.6] text-[#424752] italic">"{item.text}"</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-[#e6e8ea] overflow-hidden" id="contact">
        <div className="max-w-[1280px] mx-auto px-10">
          <div className="flex flex-col lg:flex-row gap-20 items-stretch">
            <div className="lg:w-1/3 space-y-10">
              <div>
                <h2 className="font-lexend text-[32px] leading-[1.3] font-semibold text-primary mb-3">{t.contact.sectionTitle}</h2>
                <p className="text-base leading-[1.6] text-[#424752]">{t.contact.sectionSubtitle}</p>
              </div>
              <div className="space-y-6">
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-primary p-3 bg-primary-container/10 rounded-full">location_on</span>
                  <div>
                    <p className="text-sm font-medium text-[#191c1e]">{t.contact.addressLabel}</p>
                    <p className="text-base leading-[1.6] text-[#424752]">{t.contact.address}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-primary p-3 bg-primary-container/10 rounded-full">call</span>
                  <div>
                    <p className="text-sm font-medium text-[#191c1e]">{t.contact.phoneLabel}</p>
                    <p className="text-base leading-[1.6] text-[#424752]">{t.contact.phone}</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <span className="material-symbols-outlined text-primary p-3 bg-primary-container/10 rounded-full">schedule</span>
                  <div>
                    <p className="text-sm font-medium text-[#191c1e]">{t.contact.hoursLabel}</p>
                    <p className="text-base leading-[1.6] text-[#424752]">{t.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-2/3 min-h-[400px] rounded-2xl overflow-hidden shadow-lg border border-[#c2c6d4]/30">
              {t.contact.mapUrl ? (
                <iframe
                  src={toGoogleMapsEmbedUrl(t.contact.mapUrl)}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                />
              ) : (
                <img className="w-full h-full object-cover" src={IMAGES.map} alt="Location Map" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-20 bg-[#e0e3e5]">
        <div className="flex flex-col md:flex-row justify-between items-center px-10 gap-6 max-w-[1280px] mx-auto">
          <div className="space-y-3 text-center md:text-left">
            <span className="font-lexend text-2xl font-bold text-primary block">{t.footer.brand}</span>
            <p className="text-sm font-medium text-[#424752] max-w-xs">{t.footer.copyright}</p>
          </div>
          <div className="flex gap-6">
            <a className="text-[#424752] hover:text-secondary transition-colors text-sm font-medium" href="#">{t.footer.privacy}</a>
            <a className="text-[#424752] hover:text-secondary transition-colors text-sm font-medium" href="#">{t.footer.terms}</a>
            <a className="text-[#424752] hover:text-secondary transition-colors text-sm font-medium" href="#">{t.footer.careers}</a>
          </div>
          <div className="flex gap-3">
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined text-[20px]">face_nod</span>
            </a>
            <a className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all" href="#">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
