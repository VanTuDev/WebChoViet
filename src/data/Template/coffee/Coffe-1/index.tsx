import viJson from './i18n/vi.json';
import enJson from './i18n/en.json';
import zhJson from './i18n/zh.json';
import koJson from './i18n/ko.json';
import { Map as MapIcon } from 'lucide-react';
import Reveal from '../../_shared/Reveal';
import { useTemplateCustom } from '../../../../context/TemplateCustomContext';
import { deepMerge } from '../../../../utils/deepMerge';
import { toGoogleMapsEmbedUrl } from '../../../../utils/googleMaps';

type Lang = 'vi' | 'en' | 'zh' | 'ko';
const translations = { vi: viJson, en: enJson, zh: zhJson, ko: koJson };

interface Props { lang?: Lang; }

const IMGS = {
  heroBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCNkqsQSsTeYHw1cnpeU4Uf8MH_blw-Fu7MpPh180Fi0B0ENa0grGwofz2i4Kx6-FbVrIAnE1ehmWhby5zlEGg4KI36Q6WrJoHaey7gbVBPY9dRIdT93aw_bKShcmlj3SnS8Opb797Fztt-vD1VVZUJs6kyb7idreLbbqq1czNPDN0Zp7jG91PZTCGE8r0PCllLuPuPPXOfMFrazJZyBMP6b61VbyI29Jw0ch2DFXnJW0vFekGId5arfP0JDJ7-WsaR0dS3_3QGKuU',
  heroMain: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBT1T29AWcpkBPubUTqh6dQGDlTVcUUDzLh_rT6_Z0HEDmdw-xPPTbGLDLCi0i3T_N88Yr8ARxjaX6DeEkTNNLpi87unSdAk5eKxlYEet0KO_OiFzgU1b240fnl4vdoFqEHwv_aUBXqg2-Lqp5H6ELolMgEVwvKUx6KpH1gwsStcyd2n85g7xbj45pczLxn0KfVvytlxUrNznItnfjdW9jl3BZCKdd7FJs9mK8WHuOAEzVu2sKxwAEcDCYVkNx0RnUgjgFlXAwTAc4',
  drink1: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhYysaf6Dsi-b4xGx0Gtp8JwHEChXeSlG2mCJcij7XHEIgCM_OZKUyd4qEDZegSq3kWtwcUo7giUXtyZUxzQifiBX8RZMBOIxtPR2GgaZzkh23IxX0AOuWw-ilfnmzEFHiefiOSQVenrFM8TByZ7PO9ouVxt5olp-VoPmcOQsw1bb-KJ41_uUczIeiFiVF2QN76CG5G99RW5HT6eg-hHjqGXyAPFjBCsjH3XzUQuEJHvHY4P8qBUAhhpEXNVQX4Pxp0k9GW_6QBC4',
  drink2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6IUgUjzgxFhoHjDdt6ZKZY2czsmyVVqBplHpHeJVipWBXYyNun8B-4P7UHCDDxlk8RorgFeqBqiDiPkQdjPMDYyEKyi7b7ihNvPpdkDvWilEqegwJ4tB6uKVfFI7DYcUP4Ls_xC3xMLSBpxU93VnhU3oaCqqOwxXB-iU_uwre9is_PMPOmVIX0cHJ99w-RdMSPz4b3QsEWMCyz2bqc47r7BdVYzHtPWxud0PYLO-lwz8Mnn-51NVBfnJpzD5uPObk3FVDybql3fA',
  drink3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAUk7HVg9JWjogGyybbLroGhwuDm8g8sSvoPhkMJBo0d8kVma61lYwf2yJfBcVvM6Kbzmor2NWimy7x6LwIcyA7dconhnn9sAy11MNRskv8RnSmvrHocX2yF_VrVD7GOkKGxGAsCPPoIICWh3AA0xGPp6j8mvGMeqrkST3q0o1DdU2zCUMRSako6n17nHpLBaLwc3sEytz8OoGeIfBb94aWC7YweW9KqlytD2uN4J-W2J-DOyJN-fRcsEbk5E8rwQDi6WjIsaoU5eg',
  galleryMain: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAiwCA6-9Nm7Vr8Y4arkvk5aV-3YguTyuqhKXeJbulipcwAXaWA87XlsZ8QpcbiMhCgBWtBHfQEX81syQkxjC4yuu46VYG4aGUC-xKHHNf33UsANIuEJj5Pq6INdysrhjvPNE1LOhdKzUGDpQV2DviLnaCSRYxVp64f2uD8pNPQ9MfPPpVfuqoKZdpZZ_rHXvkTE0AkPr5S2V1zU46uru7kLyHWuNflBiH_67SlxgX0f2av5RHoqMzxX6maxY6A0OQlhgKq41_59gA',
  gallery2: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBuQ2UP4nOD8HiXXgNFXajISfeCloB6FQgunov0MHp-J-WbuuBfvHY1b8meE-rk-AFB9C4GjLCfCAQzkQChjBVtx-g4aFMvMVQiN86ymbHW1VTV_kbGq_u3jUD12fYjGZTMjNIZrG3Wt2c2aGXKnapbSXeAqgmCaI_j7Xzw4lIrYaOzG73_fyen7eKlI83o7MO40MH9brUH7NXAEKl4tAvUU5j56kBobuu8YoHXIn1JpYZorcMpR6x-x5qA8DTus1YpyWN9we-J5A0',
  gallery3: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdQFfDbVSGSbbBBZkj4l3cPXiZH_yJssczjPgSZG5o1Yj5b9noIpmuA8xD6T4rJsaWk_qzwgJS9rav3qSRSCk9aPqCrTQwfK-CqKlvocg1SMHwjPRZzZZCTRNO3pv_453CnXn8_Ozn80ACzZ7CrI7NMF2ZlZG3pxsDf4CQv1SY4mJTTskkKtgE3uHGG4XPn4Zuce1m8_70k6pKm5BzTRXjpzTwqlC7XsJ_rEJzbT7MHF6PP0i89iKB2QaLrbgZ4jpeocc2FX53iG8',
  gallery4: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAhbuGZT_G_jOWqSCejeZLkTx2yGWMfDaZ0FEdL3I29eQMfPSX0OT-WRQDyoe9NmVYtiVZeWo_koSjeumPuuxcvCx1VZr6dHXn3Nmmi3ftT3QYssLVoE0IKxHkdW09yF5XSdZRBeQdpvWVaszMgniCKHPXuowTUYGBYiAfXRE8i0F36aF5_RG3YjGdfe54ZPRYl33G9kIaXh2JWG5HMOYCYOzYrCqHY3KrmTMgdNSe2aKuQudzQY_IYHkbu-prc1GiXkNKFLpMu2RY',
};

export default function Coffe1({ lang = 'vi' }: Props) {
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[lang] as Record<string, unknown>, customData) as typeof viJson;
  const img = (key: keyof typeof IMGS) => images[key] ?? IMGS[key];

  return (
    <div className="bg-[#f7f9fb] font-inter text-[#191c1e] antialiased">
      {/* Header */}
      <header data-section="nav" className="fixed top-0 w-full z-50 bg-[#f7f9fb]/80 backdrop-blur-md shadow-sm">
        <div className="flex justify-between items-center h-20 px-6 max-w-[1280px] mx-auto">
          <div data-field="nav.brand" className="font-lexend text-2xl font-bold text-[#191c1e]">{t.nav.brand}</div>
          <nav className="hidden md:flex gap-6 text-base">
            <a className="text-[#424752] hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200" href="#">{t.nav.features}</a>
            <a className="text-primary font-bold border-b-2 border-primary pb-1 px-3 py-2" href="#">{t.nav.templates}</a>
            <a className="text-[#424752] hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200" href="#">{t.nav.pricing}</a>
            <a className="text-[#424752] hover:text-primary px-3 py-2 rounded-lg hover:bg-primary/5 transition-all duration-200" href="#">{t.nav.resources}</a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium text-[#424752] hover:text-primary px-4 py-2 hidden sm:block cursor-pointer">{t.nav.login}</button>
            <button className="text-sm font-medium bg-primary text-white rounded-full px-6 py-2 hover:bg-primary-container transition-colors active:scale-95 duration-150 shadow-sm cursor-pointer">{t.nav.start}</button>
          </div>
        </div>
      </header>

      <main className="pt-20">
        {/* Hero */}
        <section data-section="hero" className="relative min-h-[921px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="bg-cover bg-center w-full h-full opacity-60"
              style={{ backgroundImage: `url('${img('heroBg')}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#f7f9fb] via-[#f7f9fb]/50 to-transparent" />
          </div>
          <div className="relative z-10 max-w-[1280px] mx-auto px-6 w-full flex flex-col md:flex-row items-center gap-20">
            <div className="flex-1 text-center md:text-left space-y-6">
              <Reveal as="span" data-field="hero.badge" variant="fade-up" className="inline-block py-1 px-3 rounded-full bg-[#E8F0E6] text-[#2E4E3F] text-sm font-medium tracking-[0.01em] border border-[#2E4E3F]/20">
                {t.hero.badge}
              </Reveal>
              <Reveal as="h1" variant="fade-up" delay={100} className="font-lexend text-[48px] leading-[1.2] font-bold tracking-[-0.02em] text-[#191c1e]">
                <span data-field="hero.title">{t.hero.title}</span><br />
                <span data-field="hero.titleHighlight" className="text-[#2E4E3F]">{t.hero.titleHighlight}</span>
              </Reveal>
              <Reveal as="p" data-field="hero.subtitle" variant="fade-up" delay={200} className="text-lg leading-[1.6] text-[#424752] max-w-xl mx-auto md:mx-0">{t.hero.subtitle}</Reveal>
              <Reveal variant="fade-up" delay={300} className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-3">
                <button data-field="hero.btnBook" data-track="book" className="text-sm font-medium bg-[#2E4E3F] text-white rounded-full px-8 py-4 hover:bg-[#2E4E3F]/90 transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer">
                  {t.hero.btnBook}
                </button>
                <button className="text-sm font-medium bg-white border border-[#c2c6d4] text-[#191c1e] rounded-full px-8 py-4 hover:bg-[#f2f4f6] transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <span className="material-symbols-outlined text-[#2E4E3F]">menu_book</span>
                  <span data-field="hero.btnMenu">{t.hero.btnMenu}</span>
                </button>
              </Reveal>
            </div>
            {/* Card ảnh bên trong có transform rotate hover riêng → Reveal bọc ngoài, không làm chính card */}
            <Reveal variant="blur-up" delay={250} duration={900} className="flex-1 hidden md:block relative">
              <div
                className="p-3 rounded-[2rem] w-4/5 ml-auto transform rotate-2 hover:rotate-0 transition-transform duration-500"
                style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 32px rgba(46,78,63,0.05)' }}
              >
                <img
                  className="rounded-[1.5rem] w-full h-[400px] object-cover"
                  src={img('heroMain')}
                  alt="Artisan Coffee"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Signature Drinks */}
        <section data-section="drinks" className="py-20 bg-[#f7f9fb]">
          <div className="max-w-[1280px] mx-auto px-6">
            <Reveal variant="fade-up" className="text-center space-y-3 mb-20">
              <h2 data-field="drinks.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-[#191c1e]">{t.drinks.sectionTitle}</h2>
              <p data-field="drinks.sectionSubtitle" className="text-base leading-[1.6] text-[#424752] max-w-2xl mx-auto">{t.drinks.sectionSubtitle}</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Item 1 — card có hover:-translate-y nên Reveal bọc ngoài */}
              <Reveal variant="fade-up">
              <div className="group h-full rounded-2xl bg-white border border-[#e0e3e5] overflow-hidden hover:shadow-[0_12px_32px_rgba(46,78,63,0.08)] transition-all duration-300 hover:-translate-y-1">
                <div className="h-64 overflow-hidden relative">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={img('drink1')} alt={t.drinks.items[0].name} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#2E4E3F]">{t.drinks.badgeBestseller}</div>
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 data-field="drinks.items.0.name" className="font-lexend text-2xl leading-[1.4] font-semibold text-[#191c1e]">{t.drinks.items[0].name}</h3>
                    <span data-field="drinks.items.0.price" className="text-sm font-medium text-[#8B5A2B] bg-[#f2f4f6] px-2 py-1 rounded-md">{t.drinks.items[0].price}</span>
                  </div>
                  <p data-field="drinks.items.0.desc" className="text-base leading-[1.6] text-[#424752] mb-6">{t.drinks.items[0].desc}</p>
                  <button className="w-full py-2 rounded-full border border-[#2E4E3F] text-[#2E4E3F] text-sm font-medium hover:bg-[#2E4E3F] hover:text-white transition-colors cursor-pointer">{t.drinks.addToOrder}</button>
                </div>
              </div>
              </Reveal>

              {/* Item 2 */}
              <Reveal variant="fade-up" delay={120}>
              <div className="group h-full rounded-2xl bg-white border border-[#e0e3e5] overflow-hidden hover:shadow-[0_12px_32px_rgba(46,78,63,0.08)] transition-all duration-300 hover:-translate-y-1">
                <div className="h-64 overflow-hidden">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={img('drink2')} alt={t.drinks.items[1].name} />
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 data-field="drinks.items.1.name" className="font-lexend text-2xl leading-[1.4] font-semibold text-[#191c1e]">{t.drinks.items[1].name}</h3>
                    <span data-field="drinks.items.1.price" className="text-sm font-medium text-[#8B5A2B] bg-[#f2f4f6] px-2 py-1 rounded-md">{t.drinks.items[1].price}</span>
                  </div>
                  <p data-field="drinks.items.1.desc" className="text-base leading-[1.6] text-[#424752] mb-6">{t.drinks.items[1].desc}</p>
                  <button className="w-full py-2 rounded-full border border-[#2E4E3F] text-[#2E4E3F] text-sm font-medium hover:bg-[#2E4E3F] hover:text-white transition-colors cursor-pointer">{t.drinks.addToOrder}</button>
                </div>
              </div>
              </Reveal>

              {/* Item 3 */}
              <Reveal variant="fade-up" delay={240}>
              <div className="group h-full rounded-2xl bg-white border border-[#e0e3e5] overflow-hidden hover:shadow-[0_12px_32px_rgba(46,78,63,0.08)] transition-all duration-300 hover:-translate-y-1">
                <div className="h-64 overflow-hidden relative">
                  <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={img('drink3')} alt={t.drinks.items[2].name} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-secondary">{t.drinks.badgeNew}</div>
                </div>
                <div className="p-10">
                  <div className="flex justify-between items-start mb-3">
                    <h3 data-field="drinks.items.2.name" className="font-lexend text-2xl leading-[1.4] font-semibold text-[#191c1e]">{t.drinks.items[2].name}</h3>
                    <span data-field="drinks.items.2.price" className="text-sm font-medium text-[#8B5A2B] bg-[#f2f4f6] px-2 py-1 rounded-md">{t.drinks.items[2].price}</span>
                  </div>
                  <p data-field="drinks.items.2.desc" className="text-base leading-[1.6] text-[#424752] mb-6">{t.drinks.items[2].desc}</p>
                  <button className="w-full py-2 rounded-full border border-[#2E4E3F] text-[#2E4E3F] text-sm font-medium hover:bg-[#2E4E3F] hover:text-white transition-colors cursor-pointer">{t.drinks.addToOrder}</button>
                </div>
              </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section data-section="gallery" className="py-20 bg-[#E8F0E6]/30">
          <div className="max-w-[1280px] mx-auto px-6">
            <Reveal variant="fade-up" className="flex flex-col md:flex-row justify-between items-end mb-10 gap-3">
              <div className="space-y-3">
                <h2 data-field="gallery.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-[#191c1e]">{t.gallery.sectionTitle}</h2>
                <p data-field="gallery.sectionSubtitle" className="text-base leading-[1.6] text-[#424752]">{t.gallery.sectionSubtitle}</p>
              </div>
              <button className="text-[#2E4E3F] text-sm font-medium flex items-center gap-1 hover:opacity-80 cursor-pointer">
                {t.gallery.viewAll} <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-[600px]">
              <Reveal variant="zoom-in" className="md:col-span-2 md:row-span-2 rounded-2xl overflow-hidden relative group">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={img('galleryMain')} alt="Gallery Main" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <span className="text-white text-sm font-medium">{t.gallery.labelIndoor}</span>
                </div>
              </Reveal>
              <Reveal variant="zoom-in" delay={100} className="md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden group hidden md:block">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={img('gallery2')} alt="Gallery 2" />
              </Reveal>
              <Reveal variant="zoom-in" delay={180} className="md:col-span-1 md:row-span-1 rounded-2xl overflow-hidden group hidden md:block">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={img('gallery3')} alt="Gallery 3" />
              </Reveal>
              <Reveal variant="zoom-in" delay={260} className="md:col-span-2 md:row-span-1 rounded-2xl overflow-hidden group hidden md:block">
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={img('gallery4')} alt="Gallery 4" />
              </Reveal>
            </div>
          </div>
        </section>

        {/* Location / Google Maps */}
        <section data-section="location" className="py-20 bg-[#f7f9fb]">
          <div className="max-w-[1280px] mx-auto px-6">
            <Reveal variant="fade-up" className="text-center space-y-3 mb-10">
              <h2 data-field="location.sectionTitle" className="font-lexend text-[32px] leading-[1.3] font-semibold text-[#191c1e]">{t.location.sectionTitle}</h2>
              <p data-field="location.sectionSubtitle" className="text-base leading-[1.6] text-[#424752] max-w-2xl mx-auto">{t.location.sectionSubtitle}</p>
            </Reveal>
            <Reveal variant="zoom-in" duration={800} className="rounded-2xl overflow-hidden h-[420px] border border-[#e0e3e5] shadow-sm">
              {t.location.mapUrl ? (
                <iframe
                  src={toGoogleMapsEmbedUrl(t.location.mapUrl)}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                />
              ) : (
                <div className="w-full h-full bg-[#E8F0E6]/40 flex items-center justify-center flex-col gap-3">
                  <MapIcon aria-hidden className="w-14 h-14 text-[#424752]" />
                  <p className="text-sm font-medium text-[#424752]">{t.location.mapPlaceholder}</p>
                </div>
              )}
            </Reveal>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="w-full py-20 bg-[#eceef0]">
        <Reveal variant="fade" className="flex flex-col md:flex-row justify-between items-center px-6 max-w-[1280px] mx-auto gap-6">
          <div data-field="footer.brand" className="font-lexend text-2xl font-bold text-[#191c1e]">{t.footer.brand}</div>
          <div data-field="footer.copyright" className="text-sm font-medium text-secondary">{t.footer.copyright}</div>
          <nav className="flex gap-6 text-sm font-medium">
            <a className="text-[#424752] hover:text-primary hover:opacity-80 transition-opacity cursor-pointer" href="#">{t.footer.privacy}</a>
            <a className="text-[#424752] hover:text-primary hover:opacity-80 transition-opacity cursor-pointer" href="#">{t.footer.terms}</a>
            <a className="text-[#424752] hover:text-primary hover:opacity-80 transition-opacity cursor-pointer" href="#">{t.footer.support}</a>
          </nav>
        </Reveal>
      </footer>
    </div>
  );
}
