import { UtensilsCrossed, Leaf, Star, Sparkles, MapPin, Phone, Clock } from 'lucide-react';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import LanguageSwitcher, { useTemplateLang } from '../../_shared/LanguageSwitcher';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';

const SUPPORTED_LANGS = ['vi', 'en', 'zh', 'ko'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  hero:     'https://lh3.googleusercontent.com/aida-public/AB6AXuBuNJKsVVEub2XrxwixfWUZFdeVSFVaRcHA9Pp8idqGdpo5XxyPjvcYyxolWD8ja9a0WbE_UgREkTTO_aEwUjHJk7J5nPIA4OhgYqEUjrGDlosy6aURrOt_syn_n91Ge98QFP8GmH7ucHN9syKdoO8dy6lmisB5KYflUsKxt8Xn8MKfHsNR5tszeVi0f9elP-DQc9UtzBs79sP0MpRNm3Y7zjKQWZu6p7LuRbEyE9QcIQh7nk13hrhWe3813IpqcvrXVRfE_cJOtLA',
  about:    'https://lh3.googleusercontent.com/aida-public/AB6AXuDdzKzfgz2z8GOu7P7YZb7UwCrIPmmUEWCk5qZUeT1e9AxHPhAccvZSmb12Nhrwh8VSAOpP_OyGEBuU67PaxL0NipaNq5UfbeLlDjtAG05HQ2asw5yzbJGwRx21xMkdSUoxVXdIq3hg0W_9gqRi1ksBFlJtAvpeLIQGPm_X7sUuW6uuf8uoOl_Uz-YLcUq80UCEVCrBorDxIivdCW4ORdxRND94p67c8Y5fQeG0ZrEWqzYiJedkql3YsyrgSBdNh-dzEQS1ak6Cg_g',
  menu_0:   'https://lh3.googleusercontent.com/aida-public/AB6AXuCpbNvqUFnk81qPPbsy7ZsskJmVNTtJHeV4Jt4RAy5mHm2-0LdTKvDu4tt1fcv1NfdIM54UvJVpTdFEY69kuGVAG5aU_XeWk-mIxpHCAY7r_5-Ddzr5YIKuMFs0KQ4AEhUlmMDpdbQdI50Wyiu2aCOMCD3BDFZgZNHdgaY6iXruhkHN_6zbwmCQzUnMXZlwNheZWgfV9aTD_50h4lsaLyvnVcOObOk50VJXbRC2cvNFkdNoUT9QmHXvfpiO0iMPpMocF7_938HDcwM',
  menu_1:   'https://lh3.googleusercontent.com/aida-public/AB6AXuBsB-uITM0-P_zCzfpyvtcB-chdJ98pfi9L6z502YVRUBEUKteTdlP4GOJsAzhM3H39ekIdZAGpnDu4_Varfw11QbM7g-LCokua_qZlCymTPk2PD___p9o-3BO993badPmS1m0dlCP4oHC1k4G4nbofFOud_Ec8uAiUfZ9WzRvDch7IbIJoR_Fi6XmgfSHZiO6xNY5fkhbKgHJFNOC7kg5y1qd2N73wZJ36P73tsYZSwlZu3X4OcH_uNOkt-PmbJYjacOIloFZ8stA',
  menu_2:   'https://lh3.googleusercontent.com/aida-public/AB6AXuCjjPNZajionLOIhPddznCC07fBM7BHNNn8gpH8_qYz9WDJ-f2i3hYMQ5AwOprb6O_Pqf36Zk3eQfv_fE2TMR5WIetgA4Fy2xjsuCOZydMUHsSo2YVBN758SC5FpafDxEb1SYZYINADjvRkT7dDn0zrlcQ5kLffJ3uDQbP_knPDiNbdIhquksVXD_daOKh6r3reMIggRm8q1c3lpAwyaeOtGqDTvjfts7-QBQ5JjIy9xMbsgWBvVnKzWarjUgTjrvPUtYVvlENOPWI',
  menu_3:   'https://lh3.googleusercontent.com/aida-public/AB6AXuBlGIhcYaT5XPme-KEAJPXZ8qFcnDz0F69G6WGQmMgMxtf94G2j-i8c-P7rS3XOy1L0iJAvtbpIPncYzOAwu56vTVEbmq3ubXdBgo7oYiGQ43yQBOCm0ODYLcWJuaCr2Czu-PakNNg8fO4bpz4VqZRooKmE4p-23HxSQghS2phDuf0NIYYUSiAe2-7AzIgNU-z2jy212oxl2tyKOQ0xtrWfipvFWiajIiJuX3tpcGinFO-99W5UANq8tVgVqvzY4jeOQ-FPpLSXowc',
  avatar_0: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZKOnBoYSb2M6P54XDliYEoZARJs3lpcUFjYEsfjoYZn--8QuYHGT75zT9Gog6IF4WtZF7fWK4nWq9IEtYJecECaXaJwG4QT3XAb9t-vEwdstXvSSiVDiq-KKfp1Q3PXVg6S-MevssAB56-H5_f2yE-MZC-l6gPpdwLyART01dVqnxn9PnZHFCMk_wm3q7p5TeR4Ik8cIEoOlBxZ4AXJRDf6sgCksZ8KczV6AxSIrOpGjiPSSF-bzStRocVyXwo4A9zJWhmY4EA0M',
  avatar_1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDXM25VyLnDj6_UlcUry68XrSx4K4vZb1SYDzq41ns8OS-eZv-vuMF2JXW-51spcqJQGiPrKS49OqjnRXJ7UfIPb1ryxSW-nKUDd5_FORThbgGlJK_vmtNX8auXzcVzqIWGy6cN5NySxuoaTPciMZm-Inpxds5YpmntR9KvWruecvoF6u-cr7gOXTA8PFD1oN3oXcnOaY-hlKV_L35WwFSY9tSbtOeIFFe0BHTHV_ywu66iXHz2GrutLbvTPldQPnZotHCxLDNdi1c',
  avatar_2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFHOLLVgJuUc0U5c27Mg_fi5Q7jN2VscsuUxmOEBHCO3mPxFqfZk7lxj5rije66ZkMWToqT_4jDtm0fyOxvGrDUVQaEVk_19-braOqKOe9zRWMXVNdlHYcwbzpFh954r7SvG-OX1ANquWGOjxbF_fE1Fkl0liE5COWioNGuyha-eaPUtR1VVgfE2nIDUbKyEMOgwTKz8GcUBFekGSqNK-1FCfyXaxEqUo-TBeb1OuwfYQBIO-kBA81mwo0Q32uf3ZgVttJLyptHjA',
  map:      'https://lh3.googleusercontent.com/aida-public/AB6AXuBY3aqjhEQPHFnoB6qnFpzJgJypCqe81jG8WQgPpwlMz1nh-VWGyqE8p0psHib3szNTaflMsp4q_4Rq_i15WksZNZeHm3zDxZQh7BSB5C6r83Krxt9wzuOtrBFIbG4nGRm5FT0O8gealQzZi98wWMHQTbnBAOiV4E1T4kx_2nl23lUl_lJtyAHOhlSVbxu1cxTYmloWsLxajPt9Ai3aQleZKCaXtzi2a1yUACdAW38OKj3lTZiAY5XVcWMTPQyti3vYtbHRrftzwTc',
};

/** Layout bento cho 4 món — khớp thiết kế gốc: lớn/nhỏ xen kẽ */
const BENTO_LAYOUT = [
  { span: 'md:col-span-2', height: 'h-100', showDesc: true },
  { span: '',              height: 'h-100', showDesc: true },
  { span: '',              height: 'h-75',  showDesc: false },
  { span: 'md:col-span-2', height: 'h-75',  showDesc: true },
];

const FEATURE_ICONS = [Leaf, Star];
const CONTACT_ICONS = [MapPin, Phone, Clock];

export default function Restaurant2({ lang = 'vi' }: Props) {
  // Ngôn ngữ hiển thị: theo editor (prop lang), khách có thể tự đổi qua LanguageSwitcher
  const { activeLang, setActiveLang } = useTemplateLang(lang as Lang, SUPPORTED_LANGS);
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };
  const AVATARS = [IMG.avatar_0, IMG.avatar_1, IMG.avatar_2];
  const MENU_IMGS = [IMG.menu_0, IMG.menu_1, IMG.menu_2, IMG.menu_3];

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-sans antialiased">

      {/* Navbar */}
      <nav data-section="nav" className="sticky top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          <span data-field="nav.brand" className="font-lexend text-2xl font-semibold text-[#003f87] tracking-tight">{t.nav.brand}</span>
          <div className="hidden md:flex gap-8 text-base">
            <a className="text-[#424752] hover:text-[#003f87] transition-colors" href="#about">{t.nav.about}</a>
            <a className="text-[#006398] font-bold border-b-2 border-[#006398] pb-1" href="#menu">{t.nav.menu}</a>
            <a className="text-[#424752] hover:text-[#003f87] transition-colors" href="#reviews">{t.nav.reviews}</a>
            <a className="text-[#424752] hover:text-[#003f87] transition-colors" href="#contact">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher value={activeLang} onChange={setActiveLang} languages={SUPPORTED_LANGS} />
            <a data-track="cta" href="#contact" className="hidden md:block bg-[#003f87] text-white px-8 py-3 rounded-full text-sm font-medium shadow-sm hover:opacity-90 active:scale-95 transition-all">
              {t.nav.cta}
            </a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="bg-cover bg-center w-full h-full opacity-40" style={{ backgroundImage: `url('${IMG.hero}')` }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#f7f9fb]/60 to-[#f7f9fb]/90" />
          </div>
          <div className="relative z-10 text-center px-6 max-w-200 mx-auto py-24">
            <span data-field="hero.badge" className="inline-block px-4 py-1 mb-3 bg-[#d7e2ff] text-[#001a40] rounded-full text-xs font-semibold shadow-sm">
              {t.hero.badge}
            </span>
            <h1 data-field="hero.title" className="font-lexend text-4xl lg:text-5xl font-bold text-[#003f87] mb-6 drop-shadow-sm leading-tight">
              {t.hero.title}
            </h1>
            <p data-field="hero.subtitle" className="text-lg leading-relaxed text-[#424752] mb-10">{t.hero.subtitle}</p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a data-track="cta" data-field="hero.btnReserve" href="#contact"
                className="bg-[#003f87] text-white px-12 py-3 rounded-full text-sm font-medium shadow-md hover:bg-[#0056b3] transition-colors">
                {t.hero.btnReserve}
              </a>
              <a data-field="hero.btnMenu" href="#menu"
                className="bg-[#f7f9fb] text-[#003f87] border border-[#003f87]/20 px-12 py-3 rounded-full text-sm font-medium shadow-sm hover:bg-[#e0e3e5] transition-colors inline-flex items-center justify-center gap-1.5">
                <UtensilsCrossed className="w-4 h-4" aria-hidden /> {t.hero.btnMenu}
              </a>
            </div>
          </div>
        </section>

        {/* About */}
        <section data-section="about" className="py-20 px-6 max-w-7xl mx-auto" id="about">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="relative rounded-3xl overflow-hidden shadow-sm h-125">
              <img className="w-full h-full object-cover" src={IMG.about} alt={t.about.caption} />
              <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/60 to-transparent">
                <p data-field="about.caption" className="text-white text-sm font-medium">{t.about.caption}</p>
              </div>
            </div>
            <div className="space-y-6">
              <h2 data-field="about.title" className="font-lexend text-3xl font-semibold text-[#003f87]">{t.about.title}</h2>
              <p data-field="about.p1" className="text-base leading-relaxed text-[#424752]">{t.about.p1}</p>
              <p data-field="about.p2" className="text-base leading-relaxed text-[#424752]">{t.about.p2}</p>
              <div className="grid grid-cols-2 gap-6 pt-3">
                {t.about.features.map((f, i) => {
                  const FeatureIcon = FEATURE_ICONS[i] ?? Sparkles;
                  return (
                  <div key={i} className="p-6 rounded-2xl text-center bg-white/70 backdrop-blur border border-white/30 shadow-sm">
                    <FeatureIcon aria-hidden className="w-9 h-9 mx-auto mb-3 text-[#003f87]" />
                    <h3 data-field={`about.features.${i}.title`} className="font-lexend text-xl font-semibold text-[#191c1e] mb-1">{f.title}</h3>
                    <p data-field={`about.features.${i}.desc`} className="text-xs font-semibold text-[#424752]">{f.desc}</p>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Menu — bento grid */}
        <section data-section="menu" className="py-20 bg-[#f2f4f6]" id="menu">
          <div className="px-6 max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 data-field="menu.title" className="font-lexend text-3xl font-semibold text-[#003f87] mb-3">{t.menu.title}</h2>
              <p data-field="menu.subtitle" className="text-base text-[#424752] max-w-150 mx-auto">{t.menu.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.menu.items.map((item, i) => {
                const layout = BENTO_LAYOUT[i] ?? BENTO_LAYOUT[1];
                return (
                  <div key={i} className={`${layout.span} relative rounded-3xl overflow-hidden shadow-sm group ${layout.height}`}>
                    <div className="bg-cover bg-center w-full h-full transition-transform duration-500 group-hover:scale-105"
                      style={{ backgroundImage: `url('${MENU_IMGS[i]}')` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full p-6">
                      <div className="flex justify-between items-end gap-3">
                        <div className="min-w-0">
                          <h3 data-field={`menu.items.${i}.name`} className="font-lexend text-2xl font-semibold text-white mb-1">{item.name}</h3>
                          {layout.showDesc && (
                            <p data-field={`menu.items.${i}.desc`} className="text-sm text-[#e0e3e5]">{item.desc}</p>
                          )}
                        </div>
                        <span data-field={`menu.items.${i}.price`} className="font-lexend font-semibold text-[#cce5ff] bg-white/20 backdrop-blur-sm px-3 py-1 rounded-2xl shrink-0">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="text-center mt-10">
              <a data-field="menu.viewAll" href="#contact"
                className="inline-block bg-[#f7f9fb] text-[#003f87] border border-[#003f87]/20 px-10 py-3 rounded-full text-sm font-medium shadow-sm hover:bg-[#e0e3e5] transition-colors">
                {t.menu.viewAll}
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-20 px-6 max-w-7xl mx-auto relative overflow-hidden" id="reviews">
          <div aria-hidden className="absolute top-0 right-0 w-96 h-96 bg-[#93ccff]/30 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
          <div className="text-center mb-10">
            <h2 data-field="testimonials.title" className="font-lexend text-3xl font-semibold text-[#003f87] mb-3">{t.testimonials.title}</h2>
            <p data-field="testimonials.subtitle" className="text-base text-[#424752] max-w-150 mx-auto">{t.testimonials.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
            {t.testimonials.items.map((item, i) => (
              <div key={i} className={`bg-white/70 backdrop-blur border border-white/30 p-10 pt-16 rounded-3xl shadow-sm relative ${i === 1 ? 'md:-translate-y-5' : ''}`}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full overflow-hidden border-4 border-[#f7f9fb] shadow-sm">
                  <img className="w-full h-full object-cover" src={AVATARS[i]} alt={item.name} referrerPolicy="no-referrer" />
                </div>
                <div aria-hidden className="flex justify-center gap-0.5 text-[#006398] mb-3">
                  {Array.from({ length: 5 }).map((_, si) => <Star key={si} className="w-4 h-4 fill-current" />)}
                </div>
                <p data-field={`testimonials.items.${i}.quote`} className="text-base text-[#191c1e] text-center mb-6 italic leading-relaxed">"{item.quote}"</p>
                <p data-field={`testimonials.items.${i}.name`} className="text-sm text-[#003f87] text-center font-bold">{item.name}</p>
                <p data-field={`testimonials.items.${i}.role`} className="text-xs font-semibold text-[#424752] text-center">{item.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reservation + Contact */}
        <section data-section="reservation" className="py-20 bg-white border-t border-[#e0e3e5]" id="contact">
          <div className="px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
              {/* Form */}
              <div className="bg-[#f7f9fb] p-10 rounded-3xl shadow-sm border border-[#003f87]/10">
                <h2 data-field="reservation.title" className="font-lexend text-3xl font-semibold text-[#003f87] mb-6">{t.reservation.title}</h2>
                <p data-field="reservation.subtitle" className="text-base text-[#424752] mb-10">{t.reservation.subtitle}</p>
                <form className="space-y-6" onSubmit={e => e.preventDefault()}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#191c1e] mb-1">{t.reservation.nameLabel}</label>
                      <input type="text" placeholder={t.reservation.namePlaceholder}
                        className="w-full bg-white border border-[#c2c6d4] rounded-2xl px-3 py-3 text-base outline-none focus:border-[#006398] focus:ring-2 focus:ring-[#006398]/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#191c1e] mb-1">{t.reservation.phoneLabel}</label>
                      <input type="tel" placeholder={t.reservation.phonePlaceholder}
                        className="w-full bg-white border border-[#c2c6d4] rounded-2xl px-3 py-3 text-base outline-none focus:border-[#006398] focus:ring-2 focus:ring-[#006398]/20 transition-all" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#191c1e] mb-1">{t.reservation.dateLabel}</label>
                      <input type="date"
                        className="w-full bg-white border border-[#c2c6d4] rounded-2xl px-3 py-3 text-base outline-none focus:border-[#006398] focus:ring-2 focus:ring-[#006398]/20 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#191c1e] mb-1">{t.reservation.guestsLabel}</label>
                      <select className="w-full bg-white border border-[#c2c6d4] rounded-2xl px-3 py-3 text-base outline-none focus:border-[#006398] focus:ring-2 focus:ring-[#006398]/20 transition-all">
                        {t.reservation.guestOptions.map((o, i) => <option key={i}>{o.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#191c1e] mb-1">{t.reservation.noteLabel}</label>
                    <textarea rows={3} placeholder={t.reservation.notePlaceholder}
                      className="w-full bg-white border border-[#c2c6d4] rounded-2xl px-3 py-3 text-base outline-none focus:border-[#006398] focus:ring-2 focus:ring-[#006398]/20 transition-all" />
                  </div>
                  <button type="submit" data-track="booking"
                    className="w-full bg-[#003f87] text-white py-3 rounded-2xl text-sm font-medium shadow-sm hover:bg-[#0056b3] transition-colors cursor-pointer">
                    {t.reservation.submit}
                  </button>
                </form>
              </div>

              {/* Info + Map */}
              <div className="flex flex-col gap-6">
                <div className="space-y-6">
                  <h3 data-field="contact.title" className="font-lexend text-2xl font-semibold text-[#003f87]">{t.contact.title}</h3>
                  {([
                    { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                    { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                    { label: t.contact.hoursLabel, value: t.contact.hours, valueField: 'contact.hours' },
                  ]).map((row, ri) => {
                    const RowIcon = CONTACT_ICONS[ri];
                    return (
                    <div key={row.valueField} className="flex items-start gap-3">
                      <RowIcon aria-hidden className="w-5 h-5 mt-0.5 text-[#003f87]" />
                      <div>
                        <p className="text-sm font-medium text-[#191c1e]">{row.label}</p>
                        <p data-field={row.valueField} className="text-base text-[#424752]">{row.value}</p>
                      </div>
                    </div>
                    );
                  })}
                </div>
                <div className="w-full flex-grow min-h-62 bg-[#eceef0] rounded-3xl overflow-hidden shadow-sm relative">
                  {t.contact.mapUrl ? (
                    <iframe
                      src={toGoogleMapsEmbedUrl(t.contact.mapUrl)}
                      className="w-full h-full border-0 absolute inset-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Google Maps"
                    />
                  ) : (
                    <>
                      <img className="w-full h-full object-cover" src={IMG.map} alt="Map" />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                        <div className="bg-white p-2 rounded-full shadow-md">
                          <MapPin aria-hidden className="w-6 h-6 text-[#003f87]" />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="w-full py-16 bg-[#2d3133] text-[#f7f9fb] text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 max-w-7xl mx-auto gap-6">
          <span data-field="footer.brand" className="font-lexend text-2xl font-semibold">{t.footer.brand}</span>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-[#e0e3e5]/80 hover:text-[#93ccff] transition-colors" href="#">{t.footer.privacy}</a>
            <a className="text-[#e0e3e5]/80 hover:text-[#93ccff] transition-colors" href="#">{t.footer.terms}</a>
            <a className="text-[#e0e3e5]/80 hover:text-[#93ccff] transition-colors" href="#">{t.footer.partner}</a>
          </div>
          <span data-field="footer.copy" className="text-[#e0e3e5]/80">{t.footer.copy}</span>
        </div>
      </footer>
    </div>
  );
}
