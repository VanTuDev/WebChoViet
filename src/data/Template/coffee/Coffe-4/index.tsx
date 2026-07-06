import { useState } from 'react';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import { useTemplateLang } from '../../_shared/LanguageSwitcher';
import Reveal from '../../_shared/Reveal';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };
type TabKey = 'signature' | 'coffee' | 'tea' | 'cake';

interface Props { lang?: Lang; }

const IMGS = {
  hero: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvOIF5qB7g9yZ4YveEApHT-KvLuMUaVfyLB5s69wLPgmUs6DPWxmSJNRFVfhwy0R7PyJdWqXv4istAS6Uat-s4glWXsRCHWD7yoNCtgNn6nsYHmvFKqb9GMnEELlB6-65nUFR_vaqO0EcagdW0VguzgxTGgPj7iO0pg__n-lomMnSbuGrJD_S4nOF1_ZzXgiFcBCupxPE-10YOhPSoWOVs-kh2q1mE-IzTsC1JMe_9gSe3sgukxi2tQwEe49IoktE5AI0ip6DfoWo',
  menu: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAa7HLLOzYsOKMOig0C-AcfxIejLLqpWCaUKeoVXlubOO-l_g7xFRxl3ktp0YJ4AE498OXmFJ1QwsgrDMPVwoNt7cDeq2gy51xrYEGIJLSQYyPKLCVtyVGNOKWBjBtbfX0sNqx39KEd8Wa6HA853sicxLTnHqVmPW6cEjkx1ht3BRgFQLhkpkEB_Hu0IGHQTvbRD0iyFElgkQNMiCe4m27OOBpamPGjc8uE3PuLPmahej84D6OProGkCdaEmDqEa_D6a6IDLOyqkRU',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuB2BJyT1DqIbW6JESNbqvtcpjYl9J0JEHbGpQP9F2PmstAgIxVh2FufbcR0K5AN5IefmL9_Ru6w0p7-YMEzzrdEwFvtmY3NYGN546pE4SJB_P_93smjln8mt8nXiPiK_c8AFZyRRVo3dyOyU1T7GGn48DUxutrrnLH6Knd-rekXNGPCZ0B03eqIdIF66LnReBI1FeMaB-L5UBUh3c8MmcSMZEpenYkCFCLEwN_J6f8vTvXJI-1MZM3Jw7nORqYMAn4cp4zDwn_VNWA',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAn1kG2Nh_C1u3R2wi5VgqCs4sskqAtH9s6OL8iwdeaIIE8LJznLlapNlONnxb47ptw81BwngD_WKP4OyG4jvNN6rUBaq7Vng9BT1DAEuq9ZvwQJpkhQY4tqV0dAJbefCY0QyKDCasynogVcOacNnNIOetWlVd4GwzDH0MFTS7SJWvXULPzXqCyMOry8lVb8DYzy_5nX1vlEfuU3RY91Nx9yaGIY7j2i0LfjAAnnqPL5M7PHNPGUEGws-D3FfvUqUm_VMjCtcVfs6Q',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuD03S5Hrn7bb_ZcbGcVqK1uiQKOGqhc1CWnH5PihtyffvPzYCXpZ8HmemNOrSquUliVAhUu80UFsCbyQYdNF0dWoY551MKTsVeYu6jV67Euy8esloOOFTBlpKOpgU_ZMzkJ-Mjb1xFCRrY4WWyfn_HEODL6pjjifw5j73vMMC9avyYNUba6wy6Pp5Ywvt0LuuhP-RPD0_c1emWjUWASFic2FPeVQsnLYgV4mpYiEXLUr-yu_n5ti4ZLwEvhUVjm5mDL8c-cPbw3I1o',
  ],
  gallery: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCtfPhYN6u9FvRpWnZStGS-Yj69iaO2j8bipquiIRwISf6gLNHoJjtZ6-BB7-w2-hljb5qG_oLfFcDqOmgGamgRbYENycyT9zFVfvXtAAk03c7tOeKjdXFv-xjJh8G9rgVJg5JYj48arU5Lz1Ia91NJeI7sfT3U0GDPYtRVcCue-qg1pcI9tvyZcg2XErJC2a2Ej4dvNguKLXGpy5KKZz0sxXU_9SeOjtm3oQXdfM_5Y-rOHJCfeFSkq09P4GrQFsISpr-8W-jMa6E',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAIGcn1jRxOktrRWFwuc5IHaMycaIkFLNXCAF08QMx6p0t0WrlOMgcDd1oUwF10RfCbc6szV5p-YZ4QQ5lvsbr5GZmjDxlW02O1F5E3AJJKdt1Jvl3R_TLSdqblb72AxqxK2nsnn1tjw102jnmJfWvvCQ4nqKMTVkQ-AUMxeIRJ509rThMBNoZJd6bf0-cChSmxaNkVZ55fMkBub6oe9o7UD86orh1ZPFk0K_YtazmrSMibueU9kHCQctjXVsEHRA45Lc9WAgXp9Pw',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBmsu5GWyRbjQkz-HlIqnbx08vGZm2QzlAS1WLCoQ9Kam8xzo9SAIjJWHQ1hJ5Xrk1b7gHd0lJANdlQ0Ck0JouUsW8KaKcqUcEAjEHR0Ifhl9WV3S81dRodO_11zXpK5ukRnLRWBcYUKxrLJoJ8NKUaADSMa09y08OFKGwU0_KdmMxZqXAwoP6w6yqPnemi3slEX1vO7nAPsCfD9GQWABnyuTqdm851IJQ8UhBARtnogpNQfcfCwAJV2gp0XgkN0Rc3h6iLdJPeyiE',
  ],
  testimonials: [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDGJo_oo0kjTqRdFUfzLBr_dXSrTcEDS9eCiwVvCDq5YDBio50y6Gi27nBclPtxzp0B3wZzpuqiz-rwF5YNy-46SShMcQDcaCm4LA8f1tO9m_DntCFTiF6DHywYnAnpySXA1VhXvukKM0ZMZ8ndrKfg40dY6UORrEjtxM2GUODf72MoqpLHvMPWk5E_xGEyM2sZdjh0OYS1K4GpPs0OwTf-CPRw6YjgF-TbmF4cYiOfVBJanBDLFfvoNwBB2FSbf30Ce9OHAdH2rQ8',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC5admmej1kz73vL6kcRXf9JLDObhaH-iKXYUh3slmDq1SY5iQy7SHee19a2x8gagG-hFLdgx6xwRQx3DPX32fVAcI-IvjO7ocKntzm3fr4mxryJjRikp9wG9UBzXDJXQa4Vp_ZKv4IJDqeevmZYNjjaBmIo0Ntsr0nheplQgUPUz5o_LyaFBNJv3Jtm5JbO4CRfq06dVTABOuptBRN8lOmTLBl7tWOThyMvxzoI-PbBhtmxAQNN62iGje8YHFYE1xs-LGlx5ushKM',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAYm4xssX6LbpKL90qi3C53prGiwa6toROKyFmWs7_LJUa0DAuEbKjAkslENhyd0K6Fg2rEF0Ug5vD8zWiaFkWHxGr0IOlgOwl82Gkm5cKLbiedHLHC6jedB6rIO9otaW-QrIkwwThu3HbqxjqUdJxhkJHjHluMtF97AXvX1ZrAnsj0g0giQo8uorA3AyoJhKUWoMZ1y3yV3ZaGWk7fbDuTC67LMdopyGZrzdpcsf-137_09P0uV0hP973p-lxjVOS7lptX1pq7LTE',
  ],
  map: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBM5nLP9FCaASSJXsC23E01Q9z8694iAzzNLxRluVRwoT80lrLqYrtfzRiu1xT0_BzeG_qgrMLs1PYy-msnaRewk-ec7tLelo3HygNaBb4JH92jmcAvbbR5W9yKQgu9blHNtgwsBrwLGa1Q0qzYmqmKpnbQg4QNk4vChQuEz7g8485WlSYRSxJjRlIiA3-tjE4HZBGrU4pP6hUV_TelC9IjdRSiEYMJMP0aEJy7_bRRtJ4viKGb7BCddWvW70R4tdW8-WTjpANilFE',
};

export default function Coffe4({ lang: propLang = 'vi' }: Props) {
  // Ngôn ngữ đổi qua LanguageSwitcher chung của PublicSitePage (truyền xuống bằng prop lang),
  // không có switcher riêng trong template này.
  const { activeLang: lang } = useTemplateLang(propLang, ['vi', 'en', 'zh', 'ko'] as const);
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[lang] as Record<string, unknown>, customData) as typeof viJson;
  const [activeTab, setActiveTab] = useState<TabKey>('signature');

  return (
    <div className="text-[#191c1e] font-inter bg-[#f7f9fb]">
      {/* Nav */}
      <nav data-section="nav" className="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-6 py-4 max-w-[1280px] mx-auto">
          <a className="font-lexend text-2xl font-bold text-primary flex items-center gap-2" href="#">
            <span className="material-symbols-outlined text-[#1B4332]" style={{ fontVariationSettings: "'FILL' 1" }}>water_ec</span>
            <span data-field="nav.brand" className="tracking-tight">{t.nav.brand}</span>
          </a>
          <div className="hidden md:flex gap-10">
            <a className="text-primary font-bold border-b-2 border-primary pb-1 text-sm font-medium" href="#">{t.nav.home}</a>
            <a className="text-[#424752] hover:text-primary transition-colors duration-200 text-sm font-medium" href="#thuc-don">{t.nav.menu}</a>
            <a className="text-[#424752] hover:text-primary transition-colors duration-200 text-sm font-medium" href="#khong-gian">{t.nav.space}</a>
            <a className="text-[#424752] hover:text-primary transition-colors duration-200 text-sm font-medium" href="#danh-gia">{t.nav.reviews}</a>
            <a className="text-[#424752] hover:text-primary transition-colors duration-200 text-sm font-medium" href="#lien-he">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-primary text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:bg-primary-container transition-all cursor-pointer">{t.nav.contactBtn}</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section data-section="hero" className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${images['hero'] ?? IMGS.hero}')` }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.6))' }} />
        </div>
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 text-white">
          <div className="max-w-3xl">
            <Reveal as="h1" data-field="hero.title" variant="fade-up" className="font-lexend text-[48px] leading-[1.2] font-bold tracking-[-0.02em] mb-6">{t.hero.title}</Reveal>
            <Reveal as="p" data-field="hero.desc" variant="fade-up" delay={120} className="text-lg leading-[1.6] mb-10 opacity-90">{t.hero.desc}</Reveal>
            <Reveal variant="fade-up" delay={240} className="flex flex-wrap gap-6">
              <a
                className="bg-[#1B4332] text-white px-8 py-4 rounded-full text-sm font-medium flex items-center gap-2 hover:scale-105 transition-transform shadow-xl"
                href="#thuc-don"
              >
                <span className="material-symbols-outlined">restaurant_menu</span> {t.hero.btnExplore}
              </a>
              <a
                className="text-white px-8 py-4 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white/20 transition-all border border-white/30"
                style={{ background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(12px)' }}
                href="#khong-gian"
              >
                <span className="material-symbols-outlined">camera_enhance</span> {t.hero.btnSpace}
              </a>
            </Reveal>
          </div>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 animate-bounce">
          <span className="material-symbols-outlined text-white text-3xl">keyboard_double_arrow_down</span>
        </div>
      </section>

      {/* Features */}
      <section data-section="features" className="py-20 bg-[#f7f9fb]">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {(Array.isArray(t.features.items) ? t.features.items : []).map((feat, i) => (
              <Reveal key={i} variant="fade-up" delay={i * 110}>
              <div className={`flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm h-full ${i === 1 ? 'border-t-4 border-[#00a9fd]' : ''}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${i === 0 ? 'bg-[#1B4332]/10' : i === 1 ? 'bg-[#00a9fd]/10' : 'bg-primary/10'}`}>
                  <span className={`material-symbols-outlined text-3xl ${i === 0 ? 'text-[#1B4332]' : i === 1 ? 'text-secondary' : 'text-primary'}`}>{feat.icon}</span>
                </div>
                <h3 data-field={`features.items.${i}.title`} className={`font-lexend text-2xl font-semibold mb-3 ${i === 0 ? 'text-[#1B4332]' : i === 1 ? 'text-secondary' : 'text-primary'}`}>{feat.title}</h3>
                <p data-field={`features.items.${i}.desc`} className="text-base leading-[1.6] text-[#424752]">{feat.desc}</p>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Tabs */}
      <section data-section="menuSection" className="py-20 bg-white overflow-hidden" id="thuc-don">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="fade-up" className="text-center mb-20">
            <h2 data-field="menuSection.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-[#1B4332] mb-3">{t.menuSection.sectionTitle}</h2>
            <div className="w-24 h-1 bg-[#1B4332] mx-auto rounded-full" />
          </Reveal>
          <Reveal variant="fade-up" delay={100} className="flex justify-center flex-wrap gap-6 mb-20">
            {(Object.keys(t.menuSection.tabs) as TabKey[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all shadow-sm ${activeTab === tab ? 'bg-[#1B4332] text-white' : 'bg-[#f7f9fb] text-[#424752]'}`}
              >
                {t.menuSection.tabs[tab]}
              </button>
            ))}
          </Reveal>

          {activeTab === 'signature' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {(Array.isArray(t.menuSection.items) ? t.menuSection.items : []).map((item, i) => (
                <Reveal key={i} variant="fade-up" delay={i * 70}>
                <div className="flex gap-6 p-2 hover:bg-[#f7f9fb] transition-colors rounded-2xl group">
                  <div className="w-32 h-32 flex-shrink-0 rounded-2xl overflow-hidden">
                    <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={images[`menuSection_items_${i}`] ?? IMGS.menu[i]} alt={item.name} />
                  </div>
                  <div className="flex flex-col justify-center border-b border-[#c2c6d4] flex-grow pb-3">
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 data-field={`menuSection.items.${i}.name`} className="font-lexend text-2xl font-semibold text-[#1B4332]">{item.name}</h4>
                      <span data-field={`menuSection.items.${i}.price`} className="text-sm font-medium text-primary font-bold">{item.price}</span>
                    </div>
                    <p data-field={`menuSection.items.${i}.desc`} className="text-base leading-[1.6] text-[#424752]">{item.desc}</p>
                  </div>
                </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-[#f7f9fb] rounded-2xl border-2 border-dashed border-[#c2c6d4]">
              <p className="text-base leading-[1.6] text-[#424752] italic">{t.menuSection.placeholder}</p>
            </div>
          )}
        </div>
      </section>

      {/* Gallery */}
      <section data-section="gallery" className="py-20 bg-[#f2f4f6]" id="khong-gian">
        <div className="max-w-[1280px] mx-auto px-6">
          <Reveal variant="fade-up" className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="max-w-2xl">
              <h2 data-field="gallery.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-[#1B4332] mb-3">{t.gallery.sectionTitle}</h2>
              <p data-field="gallery.sectionDesc" className="text-lg leading-[1.6] text-[#424752]">{t.gallery.sectionDesc}</p>
            </div>
            <div className="hidden md:flex gap-1">
              <div className="w-12 h-1 bg-[#1B4332] rounded-full" />
              <div className="w-4 h-1 bg-[#c2c6d4] rounded-full" />
              <div className="w-4 h-1 bg-[#c2c6d4] rounded-full" />
            </div>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
            <Reveal variant="zoom-in" className="md:col-span-8 h-full rounded-2xl overflow-hidden group relative">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={images['gallery_0'] ?? IMGS.gallery[0]} alt="Koi Pond" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-10">
                <p className="text-white font-lexend text-2xl font-semibold">{t.gallery.labelMain}</p>
              </div>
            </Reveal>
            <div className="md:col-span-4 grid grid-rows-2 gap-6 h-full">
              <Reveal variant="zoom-in" delay={120} className="rounded-2xl overflow-hidden group relative">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={images['gallery_1'] ?? IMGS.gallery[1]} alt="Vintage Corner" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white text-sm font-medium">{t.gallery.labelCorner1}</p>
                </div>
              </Reveal>
              <Reveal variant="zoom-in" delay={220} className="rounded-2xl overflow-hidden group relative">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={images['gallery_2'] ?? IMGS.gallery[2]} alt="Green Veranda" />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <p className="text-white text-sm font-medium">{t.gallery.labelCorner2}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials — dark forest green bg */}
      <section data-section="testimonials" className="py-20 bg-[#1B4332] text-white relative overflow-hidden" id="danh-gia">
        <div className="absolute top-0 right-0 opacity-10">
          <span className="material-symbols-outlined text-[300px]" style={{ fontVariationSettings: "'FILL' 1" }}>format_quote</span>
        </div>
        <div className="max-w-[1280px] mx-auto px-6 relative z-10">
          <Reveal variant="fade-up" className="text-center mb-20">
            <h2 data-field="testimonials.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold mb-3">{t.testimonials.sectionTitle}</h2>
            <p data-field="testimonials.sectionSubtitle" className="text-base leading-[1.6] opacity-80">{t.testimonials.sectionSubtitle}</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {(Array.isArray(t.testimonials.items) ? t.testimonials.items : []).map((item, i) => (
              <Reveal key={i} variant="fade-up" delay={i * 120} className="p-10 rounded-2xl border border-white/20" style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)' }}>
                <div className="flex gap-1 mb-6 text-[#00a9fd]">
                  {Array.from({ length: 5 }).map((_, si) => (
                    <span key={si} className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  ))}
                </div>
                <p className="text-base leading-[1.6] italic mb-10">"{item.text}"</p>
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#e0e3e5] overflow-hidden border-2 border-[#00a9fd]">
                    <img className="w-full h-full object-cover" src={images[`testimonial_${i}`] ?? IMGS.testimonials[i]} alt={item.name} />
                  </div>
                  <div>
                    <p className="text-sm font-medium font-bold">{item.name}</p>
                    <p className="text-xs font-semibold opacity-70">{item.role}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section data-section="contact" className="py-20 bg-white" id="lien-he">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <Reveal variant="fade-right" className="rounded-2xl overflow-hidden shadow-2xl h-[500px]">
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
                <img className="w-full h-full object-cover" src={images['map'] ?? IMGS.map} alt="Location Map" />
              )}
            </Reveal>
            <Reveal variant="fade-left" delay={150}>
              <h2 data-field="contact.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-[#1B4332] mb-10">{t.contact.sectionTitle}</h2>
              <div className="space-y-10">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#1B4332] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-lexend text-2xl font-semibold text-[#191c1e] mb-1">{t.contact.addressLabel}</h4>
                    <p data-field="contact.address" className="text-base leading-[1.6] text-[#424752]">{t.contact.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#1B4332] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white">schedule</span>
                  </div>
                  <div>
                    <h4 className="font-lexend text-2xl font-semibold text-[#191c1e] mb-1">{t.contact.hoursLabel}</h4>
                    <p data-field="contact.hours" className="text-base leading-[1.6] text-[#424752]">{t.contact.hours}</p>
                    <p className="text-xs font-semibold text-secondary font-bold mt-1">{t.contact.openStatus}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-full bg-[#1B4332] flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-white">call</span>
                  </div>
                  <div>
                    <h4 className="font-lexend text-2xl font-semibold text-[#191c1e] mb-1">{t.contact.contactLabel}</h4>
                    <p className="text-base leading-[1.6] text-[#424752]">Hotline: {t.contact.hotline}</p>
                    <p className="text-base leading-[1.6] text-[#424752]">Email: {t.contact.email}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer data-section="footer" className="bg-white py-20 border-t border-[#c2c6d4]">
        <Reveal variant="fade" className="flex flex-col md:flex-row justify-between items-center px-6 max-w-[1280px] mx-auto gap-6">
          <div className="text-center md:text-left">
            <a data-field="footer.brand" className="font-lexend text-2xl font-bold text-primary mb-1 block" href="#">{t.footer.brand}</a>
            <p data-field="footer.desc" className="text-base leading-[1.6] text-[#424752] max-w-sm">{t.footer.desc}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-[#424752] hover:underline text-xs font-semibold" href="#">{t.footer.privacy}</a>
            <a className="text-[#424752] hover:underline text-xs font-semibold" href="#">{t.footer.terms}</a>
            <a className="text-[#424752] hover:underline text-xs font-semibold" href="#">{t.footer.careers}</a>
            <a className="text-[#424752] hover:underline text-xs font-semibold" href="#">{t.footer.ads}</a>
          </div>
        </Reveal>
        <div className="max-w-[1280px] mx-auto px-6 mt-10 pt-10 border-t border-[#c2c6d4] text-center">
          <p className="text-xs font-semibold text-[#727784]">{t.footer.copyright}</p>
        </div>
      </footer>
    </div>
  );
}
