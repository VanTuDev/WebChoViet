import { useRef } from 'react';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import { useTemplateLang } from '../../_shared/LanguageSwitcher';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: Lang; }

const HERO_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBR5n9B0_RVMJxE2RqfpBBcJi60BO0k3wk_GecmGPTjBbXxDaQz_1lIQq9gALjkaSGJQvj_vb3OM0qKp1t36oTPjPi9LLQK9b7YWsNbLO-s-nTBvKBCGxaO_1Z5h8aKSLrfKiqXS1RX3bBHZC9MnXKqQ9SqEpBiX0uRJhVIqp_i7WT9sEV4y9A2Dp8cxSQTYjZ_SL6v0rkCbEoJHK2w8cePMfqyU0Jh5VFcmyeE6bI1bVqRlKHKBPkCZP1JmA6OAHyvf6Toi_TM';

const MENU_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDpQjR7FLLMBxRdGVvHn0HBs4wB2f5BEwD5LXl4t1QL-yRG-aLhNPHC1KqpGC9z3LBUa5xzaRIPpH-TtBVPJa-BJ4YwnRGicvVwrSz-pvFwVuBbaCJJ9M6LiivFqZs4lJLe03zKB0yKI0v5-9DPFZ-p0aE_3Y7V6JgPPHE8c7n8dpq1gnHo7i_FnNMY4JkVsrZ4x1j5VJjxakxjMKaEt3eBbFSmLKvD6W8JrZ2g-d3Kp55OlXs-v9ACDKiKiGxcX8p3aMFkLniTz5A',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBEL4exsTFkxdGfFnYI6OPBu7RQhY6XDy4-MleOU-jMeLix6_ZYGgAnnhTat7wiHreeb5kgwcl04_N7gvOh8cwjxOSrW5iWJMPeTUBbjzw7BMkhczJsyjX9bwahsnGtdoHDwFvwZHoLpD3qKTbuN4Q9KT1A6eMt4IZhDd4_t06xj6etcl1JfWe62tfmDZEVAbESqR86WIKZH334xn0FX8ILOFiUg8ZBJpcKsP2nX1SuSmxUgxwcbd7T9XJ1X5D_XM0JdtghoKi8yWg',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBDCwpfl7hv3Z9YkrtZlg2YDaY-XaEeI3-i-AOYbaIDLBedP-aOJTiOHa2pRDqx314dCuqWkO48bjuzkee6XGderAEeuvBe4HSIWqhk86KKWP5LmBBev_2Zoy0dE-R5qmm_qhJhSCowC02qvZ5SseMMsEA6EBNBJRYaMVckZflXXQ8R3_giIKXXx8HkE_wbAveiq2xXFSj5n8fDo8Y-KeXCgMXXVAdedzR9j6jOOUxpVwVrZwcWA1HckZrYCn3DK8R097BeMMQto5E',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDraIGhwfQBlHoKOfS4XVo-rU__7HO8jMzRnVqbaVkF1JnmKTibmCn6_xS2fflzaTcukdQx5NduYs7dCJq6KoKlXKM0fPNHJCR1ASIeELChdy8Uh5_LwW0MUwusYi4MDRBTdz6OEwmpMDTk6whk2XTs12KB803ugBtR2IfpOEPnXwuTRmLIqrNT8Jxu-SiMo0rje4PcD5tV7ggV4Zs9fdUqBkXcKMHfU_ZWE313rG4GY6ZheKs-nENmISFYxXpalUyzCfO2HhE34RE',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAdLMqjDGSjcg9BNtGMqRZs5DzFzQrtcKw8TgfospemgnfRbUn1awWdCRd2cHi80P4mvgR0vaq7iAAW6AXtYJiqnfAAbqcE6IC84PSdAQEsttEdQl44ckbleKo33pGgJHArDqwfrwk-9XRQRY9ivQHo4aTURIRMhSAic7AADLHIUrp9cMiOR7_-pioCDczuz8OgcUKN3a7EIEO4TBEzLMyz7PXK7xP84w_XqyR0UlWSQxuJHo-7DSh4CD332h8NTGZZKfEobgQy2oc',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBmsu5GWyRbjQkz-HlIqnbx08vGZm2QzlAS1WLCoQ9Kam8xzo9SAIjJWHQ1hJ5Xrk1b7gHd0lJANdlQ0Ck0JouUsW8KaKcqUcEAjEHR0Ifhl9WV3S81dRodO_11zXpK5ukRnLRWBcYUKxrLJoJ8NKUaADSMa09y08OFKGwU0_KdmMxZqXAwoP6w6yqPnemi3slEX1vO7nAPsCfD9GQWABnyuTqdm851IJQ8UhBARtnogpNQfcfCwAJV2gp0XgkN0Rc3h6iLdJPeyiE',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCuAuDQu1q9ySPWpcewoJ0KbwPt4ZuMjj10ehn-d0Q4jNiKYU7dLY9kgyCtlslk4xgms6ZGNN7GBcVIAnT02rQPTXJ9Vwfxcyfmy6klcWx5QmAC8IBSZgYtCxwil739UPNsziwmBAXetEAxICOGSTiThDRen8OrlFk6kOyVcZGbgysORStU3DJl86af9vkgFXvrmxSLun0CVY3CGiYy1zW9kYRdtyXyLW4J4P5HKDxUaCQhX2HUu-MuZuLLopBaE7RDw7Z6Qa1h_zc',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCtfPhYN6u9FvRpWnZStGS-Yj69iaO2j8bipquiIRwISf6gLNHoJjtZ6-BB7-w2-hljb5qG_oLfFcDqOmgGamgRbYENycyT9zFVfvXtAAk03c7tOeKjdXFv-xjJh8G9rgVJg5JYj48arU5Lz1Ia91NJeI7sfT3U0GDPYtRVcCue-qg1pcI9tvyZcg2XErJC2a2Ej4dvNguKLXGpy5KKZz0sxXU_9SeOjtm3oQXdfM_5Y-rOHJCfeFSkq09P4GrQFsISpr-8W-jMa6E',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAIGcn1jRxOktrRWFwuc5IHaMycaIkFLNXCAF08QMx6p0t0WrlOMgcDd1oUwF10RfCbc6szV5p-YZ4QQ5lvsbr5GZmjDxlW02O1F5E3AJJKdt1Jvl3R_TLSdqblb72AxqxK2nsnn1tjw102jnmJfWvvCQ4nqKMTVkQ-AUMxeIRJ509rThMBNoZJd6bf0-cChSmxaNkVZ55fMkBub6oe9o7UD86orh1ZPFk0K_YtazmrSMibueU9kHCQctjXVsEHRA45Lc9WAgXp9Pw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAn1kG2Nh_C1u3R2wi5VgqCs4sskqAtH9s6OL8iwdeaIIE8LJznLlapNlONnxb47ptw81BwngD_WKP4OyG4jvNN6rUBaq7Vng9BT1DAEuq9ZvwQJpkhQY4tqV0dAJbefCY0QyKDCasynogVcOacNnNIOetWlVd4GwzDH0MFTS7SJWvXULPzXqCyMOry8lVb8DYzy_5nX1vlEfuU3RY91Nx9yaGIY7j2i0LfjAAnnqPL5M7PHNPGUEGws-D3FfvUqUm_VMjCtcVfs6Q',
];

const GALLERY_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBktsMp5r2HBD_yrSARsoytd_YLBAW6osqvP_5nKZMKwTsWg2YfpbfKTEC_rXZXdJW1FME7MLZ1vfzav33Ri-8UoiK1quVVkUAtcr-t4Y_HdspYbAkvS-IKp1mhNsfWJy4fTLYAX-8zC9xTRC_16_2IK1SopXufZKXEK-kTruD15RMAZaeWg8YBQ7kSi0O-SQFY5aLTdEmgE-iR-W1QKjAcWUZ6t7uiyTHOZnsLCcSAVtK252-AkA6lmPvWWfxtywl7SKMjSsTi34g',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCyluc5rhJPBPrNhYCLLFC7FIvZhGhfChP_1kPBpzxayKir2zIxr1-PElv1FxgM6IWfjZanl-49znLWUrcIGJoGwqN6xVU7-x5-r7Vb3juDFmafLOgaWc4O4i3S-naIu9JV7C9b-Fw2MqwgLnmfCz5X6bQNeD7SX5ipQLALVM5SOBbbqmiemQ4TtqyznMYZdUpoi-97sG9HPRxszS9Ljb8yc0lqXRNHgZwT6TQRrdzceoSV2HPsRYRpwF3yCOAgGTEgfHBrbpJpO0Y',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBnAQry9HFK-ecJVcL9_kCL39ztrOI_NPUAIx1WlEsgt48fuFEzwyiX1BDvIPNccCOK_Kk2pfYSuz-7HaQ7meN5MEnKMvAbxSi_1Ndz6WP4N1vNHnI74O4v6BW-VSgcOtmFF4zY63YJLieNGuIwK3emcg8BjIvzDBhYz_7UOSFn9GXpeo4KBCtsIogZg6jhhg4jD_Nkn1LtnQr0nSRuJHKbbmd1pBeN4YmKXPY9giLecrpiKCDcJjEUJhKR_s2WBt3Ob4B5WRXQQ4Q',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCvOIF5qB7g9yZ4YveEApHT-KvLuMUaVfyLB5s69wLPgmUs6DPWxmSJNRFVfhwy0R7PyJdWqXv4istAS6Uat-s4glWXsRCHWD7yoNCtgNn6nsYHmvFKqb9GMnEELlB6-65nUFR_vaqO0EcagdW0VguzgxTGgPj7iO0pg__n-lomMnSbuGrJD_S4nOF1_ZzXgiFcBCupxPE-10YOhPSoWOVs-kh2q1mE-IzTsC1JMe_9gSe3sgukxi2tQwEe49IoktE5AI0ip6DfoWo',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCD0_aKD4u0q8exAjJm-pKJNiUGe_yZaArAWss8N_i70Ia_G5qxc8mfnBoXZQgApHMwgkJjfdwn4NuXVm2k5YaFL5b-Hz9N041wpDnT-psHv-Bo19XLT9ohMnbA-FjF_4BRrSPOfKfZOkEjGHfPNTrgHVqXHNcJIFw1oIoO1-lYEO5xFG03kn1Ihnt1qhg1m9G9BV1GwolVswlWFMfifOrEjVx3B2xQl08nsGt13CFInDu3FD3pDElDce-Bx0I3lN1VK6-khaQ13-4',
];

const AVATAR_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDGJo_oo0kjTqRdFUfzLBr_dXSrTcEDS9eCiwVvCDq5YDBio50y6Gi27nBclPtxzp0B3wZzpuqiz-rwF5YNy-46SShMcQDcaCm4LA8f1tO9m_DntCFTiF6DHywYnAnpySXA1VhXvukKM0ZMZ8ndrKfg40dY6UORrEjtxM2GUODf72MoqpLHvMPWk5E_xGEyM2sZdjh0OYS1K4GpPs0OwTf-CPRw6YjgF-TbmF4cYiOfVBJanBDLFfvoNwBB2FSbf30Ce9OHAdH2rQ8',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuC5admmej1kz73vL6kcRXf9JLDObhaH-iKXYUh3slmDq1SY5iQy7SHee19a2x8gagG-hFLdgx6xwRQx3DPX32fVAcI-IvjO7ocKntzm3fr4mxryJjRikp9wG9UBzXDJXQa4Vp_ZKv4IJDqeevmZYNjjaBmIo0Ntsr0nheplQgUPUz5o_LyaFBNJv3Jtm5JbO4CRfq06dVTABOuptBRN8lOmTLBl7tWOThyMvxzoI-PbBhtmxAQNN62iGje8YHFYE1xs-LGlx5ushKM',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAYm4xssX6LbpKL90qi3C53prGiwa6toROKyFmWs7_LJUa0DAuEbKjAkslENhyd0K6Fg2rEF0Ug5vD8zWiaFkWHxGr0IOlgOwl82Gkm5cKLbiedHLHC6jedB6rIO9otaW-QrIkwwThu3HbqxjqUdJxhkJHjHluMtF97AXvX1ZrAnsj0g0giQo8uorA3AyoJhKUWoMZ1y3yV3ZaGWk7fbDuTC67LMdopyGZrzdpcsf-137_09P0uV0hP973p-lxjVOS7lptX1pq7LTE',
];

const MAP_IMG = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM5nLP9FCaASSJXsC23E01Q9z8694iAzzNLxRluVRwoT80lrLqYrtfzRiu1xT0_BzeG_qgrMLs1PYy-msnaRewk-ec7tLelo3HygNaBb4JH92jmcAvbbR5W9yKQgu9blHNtgwsBrwLGa1Q0qzYmqmKpnbQg4QNk4vChQuEz7g8485WlSYRSxJjRlIiA3-tjE4HZBGrU4pP6hUV_TelC9IjdRSiEYMJMP0aEJy7_bRRtJ4viKGb7BCddWvW70R4tdW8-WTjpANilFE';

export default function Coffe5({ lang: propLang = 'vi' }: Props) {
  // Đồng bộ với prop lang (PublicSitePage/editor đổi ngôn ngữ) nhưng switcher nội bộ vẫn hoạt động
  const { activeLang: lang, setActiveLang: setLang } = useTemplateLang(propLang, ['vi', 'en', 'zh', 'ko'] as const);
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[lang] as Record<string, unknown>, customData) as typeof viJson;
  const carouselRef = useRef<HTMLDivElement>(null);

  function scrollCarousel(dir: 'prev' | 'next') {
    carouselRef.current?.scrollBy({ left: dir === 'next' ? 300 : -300, behavior: 'smooth' });
  }

  return (
    <div className="bg-[#FFFBEB] text-[#191c1e] font-inter">
      <style>{`
        .scrollbar-hide { scrollbar-width: none; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Header */}
      <header data-section="nav" className="fixed top-0 w-full z-50 bg-[#FFFBEB]/80 backdrop-blur-md shadow-sm">
        <nav className="flex justify-between items-center px-6 py-3 max-w-[1280px] mx-auto">
          <div className="flex items-center gap-3">
            <span data-field="nav.brand" className="font-lexend text-2xl tracking-tight text-primary">{t.nav.brand}</span>
            <div className="h-6 w-px bg-[#c2c6d4]" />
            <div className="flex items-center gap-1 font-bold text-[#92400e] text-sm">
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>bubble_chart</span>
              {t.nav.shopName}
            </div>
          </div>
          <div className="hidden md:flex gap-8">
            <a className="text-[#92400e] font-bold border-b-2 border-[#92400e] pb-1 text-sm" href="#">{t.nav.home}</a>
            <a className="text-[#57534e] hover:text-[#92400e] transition-colors text-sm" href="#menu">{t.nav.menu}</a>
            <a className="text-[#57534e] hover:text-[#92400e] transition-colors text-sm" href="#gallery">{t.nav.space}</a>
            <a className="text-[#57534e] hover:text-[#92400e] transition-colors text-sm" href="#contact">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-3 text-sm font-medium text-[#92400e]">
            {(['vi','en','zh','ko'] as Lang[]).map((l, i) => (
              <span key={l} className="flex items-center">
                {i > 0 && <span className="opacity-50 mx-1">|</span>}
                <button onClick={() => setLang(l)}
                  className={`cursor-pointer transition-colors ${lang === l ? 'font-bold text-[#78350f]' : 'text-[#92400e] hover:text-[#78350f]'}`}>
                  {['VN','EN','ZH','KO'][i]}
                </button>
              </span>
            ))}
          </div>
        </nav>
      </header>

      <main className="pt-[72px]">
        {/* Hero */}
        <section data-section="hero" className="py-20 px-6 max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEF3C7] text-[#92400e] text-xs font-semibold rounded-full mb-6 border border-[#fde68a]">
              <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
              <span data-field="hero.badge">{t.hero.badge}</span>
            </div>
            <h1 className="font-lexend text-[48px] leading-[1.2] font-bold tracking-[-0.02em] text-[#191c1e]">
              <span data-field="hero.title">{t.hero.title}</span>{' '}
              <span data-field="hero.titleHighlight" className="text-[#92400e]">{t.hero.titleHighlight}</span>
            </h1>
            <p data-field="hero.subtitle" className="text-lg leading-[1.6] text-[#57534e] mt-6 mb-10">{t.hero.subtitle}</p>
            <div className="flex flex-wrap gap-6">
              <a data-field="hero.btnMenu" className="bg-[#92400e] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#78350f] transition-colors shadow-lg" href="#menu">{t.hero.btnMenu}</a>
              <a data-field="hero.btnGallery" className="border border-[#92400e]/30 text-[#92400e] px-8 py-3 rounded-full text-sm font-medium hover:bg-[#FEF3C7] transition-colors" href="#gallery">{t.hero.btnGallery}</a>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img className="w-full h-[500px] object-cover" src={images['hero'] ?? HERO_IMG} alt={t.nav.shopName} />
            </div>
            <div className="absolute -top-6 -right-6 bg-[#92400e] text-white px-4 py-2 rounded-2xl text-xs font-semibold shadow-xl animate-bounce">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                {t.hero.badgeBestSeller}
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-[#FEF3C7] text-[#92400e] px-4 py-2 rounded-2xl text-xs font-semibold border border-[#fde68a] shadow-xl animate-pulse">
              <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
                {t.hero.badgeOrganic}
              </div>
            </div>
          </div>
        </section>

        {/* Menu Carousel */}
        <section data-section="menuSection" className="py-20 bg-[#FEF3C7]/50" id="menu">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 data-field="menuSection.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-[#191c1e]">{t.menuSection.sectionTitle}</h2>
                <p data-field="menuSection.sectionSubtitle" className="text-base text-[#57534e] mt-1">{t.menuSection.sectionSubtitle}</p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => scrollCarousel('prev')} className="w-10 h-10 rounded-full border border-[#fde68a] bg-white text-[#92400e] flex items-center justify-center hover:bg-[#FEF3C7] transition-all cursor-pointer">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button onClick={() => scrollCarousel('next')} className="w-10 h-10 rounded-full border border-[#fde68a] bg-white text-[#92400e] flex items-center justify-center hover:bg-[#FEF3C7] transition-all cursor-pointer">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-6"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {(Array.isArray(t.menuSection.items) ? t.menuSection.items : []).map((item, i) => (
                <div key={i} className="w-[280px] flex-shrink-0 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group" style={{ scrollSnapAlign: 'start' }}>
                  <div className="h-48 overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={images[`menuSection_items_${i}`] ?? MENU_IMGS[i % MENU_IMGS.length]} alt={item.name} />
                  </div>
                  <div className="p-6">
                    <h3 data-field={`menuSection.items.${i}.name`} className="font-bold text-[#191c1e] text-base mb-1">{item.name}</h3>
                    <div className="flex justify-between items-center mt-3">
                      <span data-field={`menuSection.items.${i}.price`} className="font-bold text-[#92400e]">{item.price}</span>
                      <button className="bg-[#92400e] text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-[#78350f] transition-colors cursor-pointer">
                        {t.menuSection.addToCart}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Bento */}
        <section data-section="gallery" className="py-20 bg-[#FFFBEB]" id="gallery">
          <div className="max-w-[1280px] mx-auto px-6">
            <div className="text-center mb-10">
              <div className="flex justify-center gap-3 mb-3">
                {t.gallery.hashtags.map((tag, i) => (
                  <span key={i} className="text-xs font-semibold text-[#92400e] bg-[#FEF3C7] px-3 py-1 rounded-full border border-[#fde68a]">{tag}</span>
                ))}
              </div>
              <h2 data-field="gallery.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-[#191c1e]">{t.gallery.sectionTitle}</h2>
              <p data-field="gallery.sectionSubtitle" className="text-base text-[#57534e] mt-1">{t.gallery.sectionSubtitle}</p>
            </div>
            <div className="grid grid-cols-12 gap-6 h-[600px]">
              <article className="col-span-6 row-span-2 rounded-2xl overflow-hidden group relative h-full">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={images['gallery_0'] ?? GALLERY_IMGS[0]} alt={t.gallery.mainTitle} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                  <h3 className="text-white font-lexend text-2xl font-semibold">{t.gallery.mainTitle}</h3>
                  <p className="text-white/80 text-xs font-semibold mt-1">{t.gallery.mainDesc}</p>
                </div>
              </article>
              <article className="col-span-3 rounded-2xl overflow-hidden group relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={images['gallery_1'] ?? GALLERY_IMGS[1]} alt="Gallery 2" />
              </article>
              <article className="col-span-3 rounded-2xl overflow-hidden group relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={images['gallery_2'] ?? GALLERY_IMGS[2]} alt="Gallery 3" />
              </article>
              <article className="col-span-3 rounded-2xl overflow-hidden group relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={images['gallery_3'] ?? GALLERY_IMGS[3]} alt="Gallery 4" />
              </article>
              <article className="col-span-3 rounded-2xl overflow-hidden group relative">
                <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src={images['gallery_4'] ?? GALLERY_IMGS[4]} alt="Gallery 5" />
              </article>
            </div>
          </div>
        </section>

        {/* Testimonials — middle card elevated */}
        <section data-section="testimonials" className="py-20 bg-[#FEF3C7]/50">
          <div className="max-w-[1280px] mx-auto px-6 text-center">
            <h2 data-field="testimonials.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold mb-20">{t.testimonials.sectionTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {(Array.isArray(t.testimonials.items) ? t.testimonials.items : []).map((item, i) => (
                <div
                  key={i}
                  className={`bg-white rounded-2xl p-10 text-left transition-all duration-300 ${i === 1 ? 'scale-105 z-10 shadow-2xl' : 'shadow-sm'}`}
                >
                  <div className="flex gap-1 mb-6 text-amber-400">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <span key={si} className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    ))}
                  </div>
                  <p className="text-base leading-[1.6] text-[#57534e] mb-6 italic">"{item.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#fde68a]">
                      <img className="w-full h-full object-cover" src={images[`avatar_${i}`] ?? AVATAR_IMGS[i]} alt={item.name} />
                    </div>
                    <div>
                      <p className="text-sm font-medium font-bold text-[#191c1e]">{item.name}</p>
                      <p className="text-xs font-semibold text-[#92400e]">{item.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact — primary panel + map */}
        <section data-section="contact" className="py-20 px-6 max-w-[1280px] mx-auto" id="contact">
          <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl">
            <div className="md:w-2/5 bg-primary text-white p-10 flex flex-col justify-center">
              <h2 data-field="contact.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold mb-10 whitespace-pre-line">{t.contact.sectionTitle}</h2>
              <div className="space-y-6">
                <div className="flex gap-6">
                  <span className="material-symbols-outlined">location_on</span>
                  <div>
                    <p className="font-bold text-xs font-semibold opacity-80 uppercase tracking-wide">{t.contact.addressLabel}</p>
                    <p data-field="contact.address" className="text-base mt-1">{t.contact.address}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined">call</span>
                  <div>
                    <p className="font-bold text-xs font-semibold opacity-80 uppercase tracking-wide">{t.contact.phoneLabel}</p>
                    <p data-field="contact.phone" className="text-base mt-1">{t.contact.phone}</p>
                  </div>
                </div>
                <div className="flex gap-6">
                  <span className="material-symbols-outlined">schedule</span>
                  <div>
                    <p className="font-bold text-xs font-semibold opacity-80 uppercase tracking-wide">{t.contact.hoursLabel}</p>
                    <p data-field="contact.hours" className="text-base mt-1">{t.contact.hours}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-3/5 relative min-h-[400px]">
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
                <img className="w-full h-full object-cover" src={images['map'] ?? MAP_IMG} alt={t.contact.mapLabel} />
              )}
              <div className="absolute top-6 right-6 bg-white px-3 py-1 rounded-full text-xs font-semibold text-[#92400e] shadow-md">
                {t.contact.mapLabel}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-primary text-white py-20">
        <div className="max-w-[1280px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span data-field="footer.brand" className="font-lexend text-2xl font-bold">{t.footer.brand}</span>
              <div className="h-5 w-px bg-white/30" />
              <div className="flex items-center gap-1 text-sm font-bold">
                <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>bubble_chart</span>
                {t.footer.shopName}
              </div>
            </div>
            <p data-field="footer.desc" className="text-sm opacity-80 max-w-xs">{t.footer.desc}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-6 opacity-80 uppercase tracking-widest">{t.footer.exploreTitle}</h4>
            <ul className="space-y-3">
              {t.footer.exploreLinks.map((link, i) => (
                <li key={i}><a className="text-sm opacity-80 hover:opacity-100 transition-opacity hover:underline" href="#">{link}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold mb-3 opacity-80 uppercase tracking-widest">{t.footer.newsletterTitle}</h4>
            <p className="text-sm opacity-70 mb-6">{t.footer.newsletterDesc}</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.footer.newsletterPlaceholder}
                className="flex-1 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm placeholder:opacity-60 focus:outline-none focus:border-white/50"
              />
              <button type="submit" className="px-6 py-2 bg-white text-primary rounded-full text-sm font-medium hover:bg-[#e0e3e5] transition-colors cursor-pointer">
                {t.footer.newsletterBtn}
              </button>
            </form>
          </div>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 mt-10 pt-10 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-3 text-xs opacity-70">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-6">
            <a className="hover:opacity-100 transition-opacity" href="#">{t.footer.privacy}</a>
            <a className="hover:opacity-100 transition-opacity" href="#">{t.footer.terms}</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
