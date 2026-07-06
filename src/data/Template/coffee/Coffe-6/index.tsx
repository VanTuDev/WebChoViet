import { Coffee, Bean, Leaf, CakeSlice, MapPin, Phone, Clock, Map as MapIcon } from 'lucide-react';
import Reveal from '../../_shared/Reveal';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';
import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations: Record<Lang, typeof viJson> = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: string }

const DEFAULT_IMGS = {
  heroBg:      'https://lh3.googleusercontent.com/aida-public/AB6AXuCNkqsQSsTeYHw1cnpeU4Uf8MH_blw-Fu7MpPh180Fi0B0ENa0grGwofz2i4Kx6-FbVrIAnE1ehmWhby5zlEGg4KI36Q6WrJoHaey7gbVBPY9dRIdT93aw_bKShcmlj3SnS8Opb797Fztt-vD1VVZUJs6kyb7idreLbbqq1czNPDN0Zp7jG91PZTCGE8r0PCllLuPuPPXOfMFrazJZyBMP6b61VbyI29Jw0ch2DFXnJW0vFekGId5arfP0JDJ7-WsaR0dS3_3QGKuU',
  galleryMain: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiwCA6-9Nm7Vr8Y4arkvk5aV-3YguTyuqhKXeJbulipcwAXaWA87XlsZ8QpcbiMhCgBWtBHfQEX81syQkxjC4yuu46VYG4aGUC-xKHHNf33UsANIuEJj5Pq6INdysrhjvPNE1LOhdKzUGDpQV2DviLnaCSRYxVp64f2uD8pNPQ9MfPPpVfuqoKZdpZZ_rHXvkTE0AkPr5S2V1zU46uru7kLyHWuNflBiH_67SlxgX0f2av5RHoqMzxX6maxY6A0OQlhgKq41_59gA',
  gallery2:    'https://lh3.googleusercontent.com/aida-public/AB6AXuBuQ2UP4nOD8HiXXgNFXajISfeCloB6FQgunov0MHp-J-WbuuBfvHY1b8meE-rk-AFB9C4GjLCfCAQzkQChjBVtx-g4aFMvMVQiN86ymbHW1VTV_kbGq_u3jUD12fYjGZTMjNIZrG3Wt2c2aGXKnapbSXeAqgmCaI_j7Xzw4lIrYaOzG73_fyen7eKlI83o7MO40MH9brUH7NXAEKl4tAvUU5j56kBobuu8YoHXIn1JpYZorcMpR6x-x5qA8DTus1YpyWN9we-J5A0',
  gallery3:    'https://lh3.googleusercontent.com/aida-public/AB6AXuCdQFfDbVSGSbbBBZkj4l3cPXiZH_yJssczjPgSZG5o1Yj5b9noIpmuA8xD6T4rJsaWk_qSXNXpv_453CnXn8_Ozn80ACzZ7CrI7NMF2ZlZG3pxsDf4CQv1SY4mJTTskkKtgE3uHGG4XPn4Zuce1m8_70k6pKm5BzTRXjpzTwqlC7XsJ_rEJzbT7MHF6PP0i89iKB2QaLrbgZ4jpeocc2FX53iG8',
  gallery4:    'https://lh3.googleusercontent.com/aida-public/AB6AXuAhbuGZT_G_jOWqSCejeZLkTx2yGWMfDaZ0FEdL3I29eQMfPSX0OT-WRQDyoe9NmVYtiVZeWo_koSjeumPuuxcvCx1VZr6dHXn3Nmmi3ftT3QYssLVoE0IKxHkdW09yF5XSdZRBeQdpvWVaszMgniCKHPXuowTUYGBYiAfXRE8i0F36aF5_RG3YjGdfe54ZPRYl33G9kIaXh2JWG5HMOYCYOzYrCqHY3KrmTMgdNSe2aKuQudzQY_IYHkbu-prc1GiXkNKFLpMu2RY',
};

/** Icon cho 4 nhóm menu — nằm ngoài i18n vì không phải nội dung dịch */
const CATEGORY_ICONS = [Coffee, Bean, Leaf, CakeSlice];
const CONTACT_ICONS = [MapPin, Phone, Clock];

export default function Coffe6({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-sans antialiased">

      {/* Navbar */}
      <header data-section="nav" className="sticky top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-md border-b border-[#c2c6d4]/30">
        <div className="flex justify-between items-center h-20 px-6 max-w-7xl mx-auto">
          <span data-field="nav.brand" className="font-lexend text-2xl font-bold text-[#003f87]">{t.nav.brand}</span>
          <nav className="hidden md:flex gap-10 text-sm font-medium">
            <a className="text-[#003f87] font-bold border-b-2 border-[#003f87] pb-1" href="#">{t.nav.home}</a>
            <a className="text-[#424752] hover:text-[#003f87] transition-colors" href="#menu">{t.nav.menu}</a>
            <a className="text-[#424752] hover:text-[#003f87] transition-colors" href="#gallery">{t.nav.gallery}</a>
            <a className="text-[#424752] hover:text-[#003f87] transition-colors" href="#contact">{t.nav.contact}</a>
          </nav>
          <button data-track="cta" className="text-sm font-medium bg-[#003f87] text-white rounded-full px-6 py-2.5 hover:opacity-90 transition-all active:scale-95 shadow-sm cursor-pointer">
            {t.nav.reserve}
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative min-h-[85vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="bg-cover bg-center w-full h-full" style={{ backgroundImage: `url('${IMG.heroBg}')` }} />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f7f9fb]/90 via-[#f7f9fb]/60 to-transparent" />
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-6 text-center md:text-left">
              <Reveal as="span" data-field="hero.badge" variant="fade-up" className="inline-block py-1 px-4 rounded-full bg-[#003f87]/10 text-[#003f87] text-xs font-semibold tracking-wide">
                {t.hero.badge}
              </Reveal>
              <Reveal as="h1" variant="fade-up" delay={100} className="font-lexend text-4xl lg:text-5xl font-bold leading-tight text-[#191c1e]">
                <span data-field="hero.title">{t.hero.title}</span>{' '}
                <span data-field="hero.titleHighlight" className="text-[#003f87]">{t.hero.titleHighlight}</span>
              </Reveal>
              <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={200} className="text-lg leading-relaxed text-[#424752] max-w-lg mx-auto md:mx-0">
                {t.hero.subtitle}
              </Reveal>
              <Reveal variant="fade-up" delay={300} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
                <a data-field="hero.btnMenu" className="bg-[#003f87] text-white text-sm font-medium px-8 py-4 rounded-full shadow-lg hover:bg-[#0056b3] transition-all text-center" href="#menu">
                  {t.hero.btnMenu}
                </a>
                <a data-field="hero.btnGallery" className="bg-white border border-[#c2c6d4] text-[#191c1e] text-sm font-medium px-8 py-4 rounded-full hover:bg-[#eceef0] transition-all text-center" href="#gallery">
                  {t.hero.btnGallery}
                </a>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Menu — 4 nhóm × 4 món */}
        <section data-section="menuSection" className="py-20 bg-white" id="menu">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal variant="fade-up" className="text-center space-y-3 mb-16">
              <h2 data-field="menuSection.title" className="font-lexend text-3xl font-semibold text-[#191c1e]">{t.menuSection.title}</h2>
              <div className="w-20 h-1 bg-[#003f87] mx-auto rounded-full" />
            </Reveal>

            {t.menuSection.categories.map((cat, ci) => {
              const CatIcon = CATEGORY_ICONS[ci] ?? Coffee;
              return (
              <div key={ci} className={ci < t.menuSection.categories.length - 1 ? 'mb-16' : ''}>
                <Reveal as="h3" variant="fade-up" className="font-lexend text-2xl font-semibold text-[#003f87] mb-8 flex items-center gap-3">
                  <CatIcon aria-hidden className="w-6 h-6" />
                  <span data-field={`menuSection.categories.${ci}.title`}>{cat.title}</span>
                </Reveal>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {cat.items.map((item, i) => (
                    <Reveal key={i} variant="fade-up" delay={i * 80}>
                    <div className="p-6 rounded-2xl border border-[#e0e3e5] hover:-translate-y-1 hover:shadow-lg transition-all h-full">
                      <div className="flex justify-between gap-2 mb-1">
                        <h4 data-field={`menuSection.categories.${ci}.items.${i}.name`} className="text-sm font-bold text-[#191c1e]">{item.name}</h4>
                        <span data-field={`menuSection.categories.${ci}.items.${i}.price`} className="text-[#003f87] font-bold shrink-0">{item.price}</span>
                      </div>
                      <p data-field={`menuSection.categories.${ci}.items.${i}.desc`} className="text-xs leading-relaxed text-[#424752]">{item.desc}</p>
                    </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              );
            })}
          </div>
        </section>

        {/* Gallery bento */}
        <section data-section="gallery" className="py-20 bg-[#f2f4f6]" id="gallery">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal variant="fade-up" className="space-y-3 mb-10">
              <h2 data-field="gallery.title" className="font-lexend text-3xl font-semibold text-[#191c1e]">{t.gallery.title}</h2>
              <p data-field="gallery.subtitle" className="text-base text-[#424752]">{t.gallery.subtitle}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[600px]">
              <Reveal variant="zoom-in" className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group h-64 md:h-auto">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMG.galleryMain} alt={t.gallery.caption} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span data-field="gallery.caption" className="text-white text-sm font-medium">{t.gallery.caption}</span>
                </div>
              </Reveal>
              <Reveal variant="zoom-in" delay={100} className="md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden group hidden md:block">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMG.gallery2} alt="" />
              </Reveal>
              <Reveal variant="zoom-in" delay={180} className="md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden group hidden md:block">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMG.gallery3} alt="" />
              </Reveal>
              <Reveal variant="zoom-in" delay={260} className="md:col-span-2 md:row-span-1 rounded-2xl overflow-hidden group hidden md:block">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={IMG.gallery4} alt="" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-20 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <Reveal as="h2" data-field="testimonials.title" variant="fade-up" className="font-lexend text-3xl font-semibold text-[#191c1e] text-center mb-16">{t.testimonials.title}</Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {t.testimonials.items.map((item, i) => (
                <Reveal key={i} variant="fade-up" delay={i * 120} className="p-10 rounded-2xl bg-white border border-[#c2c6d4]/30 relative shadow-sm">
                  <span aria-hidden className="absolute top-4 right-5 text-4xl text-[#003f87]/20 font-serif leading-none">❝</span>
                  <p data-field={`testimonials.items.${i}.quote`} className="text-base text-[#191c1e] mb-6 italic leading-relaxed">"{item.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div aria-hidden className="w-10 h-10 rounded-full bg-[#0056b3]" />
                    <div>
                      <p data-field={`testimonials.items.${i}.name`} className="text-sm font-medium text-[#191c1e]">{item.name}</p>
                      <p data-field={`testimonials.items.${i}.role`} className="text-xs font-semibold text-[#424752]">{item.role}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section data-section="contact" className="py-20 bg-[#f7f9fb]" id="contact">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
              <Reveal variant="fade-right" className="space-y-10">
                <h2 data-field="contact.title" className="font-lexend text-3xl font-semibold text-[#191c1e]">{t.contact.title}</h2>
                <div className="space-y-6">
                  {([
                    { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                    { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                    { label: t.contact.hoursLabel, value: t.contact.hours, valueField: 'contact.hours' },
                  ]).map((row, ri) => {
                    const RowIcon = CONTACT_ICONS[ri];
                    return (
                    <div key={row.valueField} className="flex items-start gap-6">
                      <RowIcon aria-hidden className="w-5 h-5 mt-0.5 text-[#003f87]" />
                      <div>
                        <h4 className="text-sm font-medium text-[#191c1e]">{row.label}</h4>
                        <p data-field={row.valueField} className="text-[#424752]">{row.value}</p>
                      </div>
                    </div>
                    );
                  })}
                </div>
                <div className="pt-3">
                  <a data-track="cta" data-field="contact.btnMessage" href={`tel:${t.contact.phone.replace(/\s/g, '')}`}
                    className="inline-block bg-[#003f87] text-white text-sm font-medium px-8 py-3 rounded-full hover:opacity-90 transition-all">
                    {t.contact.btnMessage}
                  </a>
                </div>
              </Reveal>
              <Reveal variant="fade-left" delay={150} className="rounded-2xl overflow-hidden h-100 border border-[#c2c6d4]/30">
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
                  <div className="w-full h-full bg-[#e0e3e5] flex items-center justify-center flex-col gap-3">
                    <MapIcon aria-hidden className="w-14 h-14 text-[#003f87]" />
                    <p className="text-sm font-medium text-[#424752]">{t.contact.mapLoading}</p>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="w-full py-16 bg-[#e0e3e5] border-t border-[#c2c6d4]/30">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal variant="fade" className="flex flex-col md:flex-row justify-between items-center gap-6">
            <span data-field="footer.brand" className="font-lexend text-2xl font-bold text-[#003f87]">{t.footer.brand}</span>
            <span data-field="footer.copy" className="text-sm text-[#424752]">{t.footer.copy}</span>
            <nav className="flex gap-6 text-sm">
              <a className="text-[#424752] hover:text-[#003f87] transition-colors" href="#">{t.footer.privacy}</a>
              <a className="text-[#424752] hover:text-[#003f87] transition-colors" href="#">{t.footer.terms}</a>
              <a className="text-[#424752] hover:text-[#003f87] transition-colors" href="#">{t.footer.support}</a>
            </nav>
          </Reveal>
        </div>
      </footer>
    </div>
  );
}
