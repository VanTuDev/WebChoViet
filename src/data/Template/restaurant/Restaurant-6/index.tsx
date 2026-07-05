import { UtensilsCrossed, Leaf, Star, MapPin, Phone, Mail, CalendarClock, Soup, Flame, Fish, IceCreamCone } from 'lucide-react';
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
  heroBg:    'https://lh3.googleusercontent.com/aida-public/AB6AXuBeTeyoTSBoeRNZi9Z51asYa0n1aRiwNbWC7hbPfBS85JXAncu0W_nYIf-l79kWR8JU7xBO7dagoZo4N6sril7279DzmV8z3iLg6fBhx_SUzv5RsT_eL-7LPDpUMGfjK-j0V9rax2j-TqCsjEK7W8hPnwdcu42VzuVAa_EDdZf-I8cPGXw6FdhDbjjCGwXnQWSYed8ALI-LwmKI5rgW2TWwNVpDZt29_XznbMUuGJaswxFcYGiI7dBL',
  cat_0:     'https://lh3.googleusercontent.com/aida-public/AB6AXuCQr_JBaXlk2GO6lnVd2t5OVv6JQhSavAkHC0r61rUydOoL2LsLYbriCWU8V_FvaRH-UoiTXpcSxNH--K5IUnmlb0xtWAV8CAxqT-dBpgz8otO-JO5f67wJK_VZb_hc6ze5n8tr6_psdugRWe8VXvvruT6_SB58EGSwaFUTM48GM5vHHW5p2ZCa1mIDQIjKAu1XU3KkdyoSyYZ0q8Ixh1PujczHL6CRpXMLxdXZaoxdA_MQ5MQ01Es2',
  cat_1:     'https://lh3.googleusercontent.com/aida-public/AB6AXuDG7DSAQOTU_99xYd3SaTvyVS_lHOCIn8SQdvfxhho2c7c2vKZnGxk-tbTSbBmtLjWrJ8U-D_MkK3ukiu34LxJGtC6E5AlsSAHuRSkjNDwBmURucR_ZGJxtcjApIy08CpYadPYnQBlr2GBGkq7Ro5rJvzWajno4OS63n1W0X0f4oub7j20v4zpmcgEflKPMxLJNDPCf7n0-jZCx6bqVVByCkWG152XGtVsR4X9ll5as54BkqNGONzSN',
  cat_2:     'https://lh3.googleusercontent.com/aida-public/AB6AXuArPrn8yShVGeOOUVLRYM2GGUpQDSLwavgajDA_scBA2q88KuOUcD-fp6gZgcbOIoGALmPg-Y_Xq_9ZfrJeE7XK22FsYaBC1Udt5WV5f4-N7Gy4SBfwFkqTF31829cBMcPf7-1MEtHDVMhXShefOoDTnFi-BRHr_V33B9y8A0jZz77YHrHOK04180VwJHvZZZRG4EAQUwg4DpL0R2cd2d91pOMNsRJ0cjR9SgOzDY2ziLh8u46FAqPp',
  signature: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2nay-m4ZWsa2NFXT4GIcJu21-Ttzn8J0EHO9xY_VKIYEabWk9qAHRBmCIPArQ7nL6lhvR0CjtguZugKMYybTQ73iFCuHubYRuVHCJISEjjVhi6NtYVg6ZlTGV1VCmVFrJTeyc7VS8BxODDUOVRvKpFC34DDhltkorHA-w4-RRRFmdAegv4oTvIYei-7Viknfjm6kwUkLBZHjAt2LjEeygALyQoNqGOmJQYr-j9UVFSTUHT5NQvs9C',
  chef_0:    'https://lh3.googleusercontent.com/aida-public/AB6AXuCwryYFlsvJmpr0rpXZp6iaZYAkqhiXAky0DL7Qs99dwujgv8_gEUwdWH8hcABgXvgh1N3izXyilviLVxT4KdXhdaOyxs0doElkOV-XXo0yexBGnkaM18Mrz12mkOU6eBWeMGEFRefIyX8IaPgM4ewmAwl7cLrDFpAFXSGL4oC9dNJh8RUBzeYPcprof52ULUxgoqlqqnkQojpg9JT5htsKKS_EaLTGVWqkroXFpebfOVLJi1i6cEyY',
  chef_1:    'https://lh3.googleusercontent.com/aida-public/AB6AXuBrVOyBxfx7i62BgvgF7GL1uFkVq1mYdM1QkwpEExHDG58yoV-bFe4PlZJ0PNDY2VwBtMhwx3ocJXNfg6SFwg9SxbVB-osYiIFFNrqfRA706adaqAvZlB7GhTs3NCPSX-G7xUKRfMwrOVIh5W6szGowAkkUVKGuX0vKnodMJ-e1pDVvDkNDOfhqucrnuDO1365hyowq1zZ8ZByqmpUbvfQOpYa52m46tmZs97YporDqPp4EQYw2Qjb6',
  chef_2:    'https://lh3.googleusercontent.com/aida-public/AB6AXuC6DW1Evoocaf5Tbk_Iuz_YtZ_N8ZnCfEuVrpCqBx3n0TI7NERM9OJdYtdAdvNAcSEcgQHP6XUkmfGhI2iyLJa2R7axhmLaLeIHzjmPiR9NnDfaOb2Xs8icq8ZYsdhKX_2xbW3mUMM0ClDkOsOsm7xbYrPnO860n8AeKmesqEFbApvotiRUOtGAzqjBq_HBDV9uJDU_k6UoA7e4VsD5a2urufpnvy8bD02CZ88MK4eAZhXMk1rg5VM-',
  map:       'https://lh3.googleusercontent.com/aida-public/AB6AXuAzhEQ7ib6nvs8r57oKwWa6vbLA0NStGz5Wd1cqEKd6FDaj0oX6W97OZrNLp2RyXtluqrX7Ie9yfDXSybqf2x5s1PrNAhiNviS0ZDhDmYoOnzcy96FvCdd9YYRRaGe7pEK9EwzCKFFxR8YOF7FeTeOEnCw3SV4K8J2_T8DcT6e93ji9_2b8P9Uq26zfLRpuQjmnGq-WqMR64K8QqzASESWZZ8MC0C6zn7Adxai-5J-_smdvHw_BJikO',
};

/** Ảnh 3 danh mục bento — khớp thứ tự categories.items trong i18n (trang trí, không phải nội dung dịch) */
const CATEGORY_IMGS = [DEFAULT_IMGS.cat_0, DEFAULT_IMGS.cat_1, DEFAULT_IMGS.cat_2];
/** Icon 4 nhóm thực đơn — nằm ngoài i18n vì không phải nội dung dịch */
const MENU_ICONS = [Soup, Flame, Fish, IceCreamCone];
const CONTACT_ICONS = [MapPin, Phone, Mail];

export default function Restaurant6({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images };
  const CHEFS = [IMG.chef_0, IMG.chef_1, IMG.chef_2];

  return (
    <div className="bg-[#fbf9f1] text-[#1b1c17] font-sans antialiased">

      {/* Navbar */}
      <header data-section="nav" className="sticky top-0 w-full z-50 bg-[#fbf9f1]/95 backdrop-blur-md border-b border-[#72796e]/10 shadow-sm">
        <div className="flex justify-between items-center px-6 py-3 max-w-7xl mx-auto">
          <span data-field="nav.brand" className="font-['Lexend'] text-2xl font-bold text-[#154212]">{t.nav.brand}</span>
          <nav className="hidden md:flex gap-8 text-sm">
            <a className="text-[#446900] font-bold border-b-2 border-[#446900] pb-1" href="#menu">{t.nav.menu}</a>
            <a className="text-[#42493e] hover:text-[#154212] transition-colors duration-300" href="#space">{t.nav.space}</a>
            <a className="text-[#42493e] hover:text-[#154212] transition-colors duration-300" href="#reviews">{t.nav.reviews}</a>
            <a className="text-[#42493e] hover:text-[#154212] transition-colors duration-300" href="#contact">{t.nav.contact}</a>
          </nav>
          <button data-track="reserve" className="bg-[#2d5a27] text-[#9dd090] px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-[#154212] hover:text-white transition-all cursor-pointer">
            {t.nav.cta}
          </button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section data-section="hero" className="relative h-[80vh] flex items-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover brightness-75" src={IMG.heroBg} alt={t.hero.title} />
          </div>
          <div className="relative z-10 px-6 max-w-4xl mx-auto md:mx-0 md:pl-16">
            <h1 data-field="hero.title" className="text-white font-['Lexend'] text-4xl md:text-5xl font-bold leading-tight mb-4">
              {t.hero.title}
            </h1>
            <p data-field="hero.subtitle" className="text-white/90 text-lg leading-relaxed mb-8 max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <a data-track="reserve" data-field="hero.btnReserve" href="#contact"
                className="bg-[#c1ee7d] text-[#486d04] px-8 py-3 rounded-lg font-bold text-base hover:shadow-xl transition-all">
                {t.hero.btnReserve}
              </a>
              <a data-field="hero.btnMenu" href="#menu"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-bold text-base hover:bg-white/10 transition-all">
                {t.hero.btnMenu}
              </a>
            </div>
          </div>
        </section>

        {/* Categories bento */}
        <section data-section="categories" className="py-20 px-6 max-w-7xl mx-auto" id="space">
          <div className="flex flex-col items-center mb-12">
            <h2 data-field="categories.title" className="font-['Lexend'] text-3xl font-semibold text-[#154212] text-center">{t.categories.title}</h2>
            <div aria-hidden className="w-32 h-0.5 mx-auto mt-4 bg-gradient-to-r from-transparent via-[#154212]/20 to-transparent" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:h-100">
            {t.categories.items.map((cat, i) => (
              <div key={i} className={`${i === 0 ? 'md:col-span-2' : ''} relative group overflow-hidden rounded-xl bg-[#f6f4ec] shadow-sm cursor-pointer border border-[#72796e]/10 h-64 md:h-auto`}>
                <div aria-hidden className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all z-10" />
                <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={CATEGORY_IMGS[i] ?? CATEGORY_IMGS[0]} alt={cat.title} />
                <div className="absolute bottom-6 left-6 z-20">
                  <span data-field={`categories.items.${i}.title`} className="text-white font-['Lexend'] text-2xl font-semibold">{cat.title}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Signature dish highlight */}
        <section data-section="signature" className="bg-[#f0eee6] py-20 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16">
            <div className="w-full md:w-1/2">
              <span data-field="signature.eyebrow" className="text-[#446900] text-sm font-semibold tracking-widest uppercase">{t.signature.eyebrow}</span>
              <h2 data-field="signature.title" className="font-['Lexend'] text-3xl font-semibold text-[#154212] mt-2 mb-6">{t.signature.title}</h2>
              <p data-field="signature.desc" className="text-[#42493e] text-lg leading-relaxed mb-8">
                {t.signature.desc}
              </p>
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center text-[#446900]">
                  <UtensilsCrossed aria-hidden className="w-7 h-7" />
                  <span data-field="signature.badge1" className="ml-2 font-bold">{t.signature.badge1}</span>
                </div>
                <div className="flex items-center text-[#446900]">
                  <Leaf aria-hidden className="w-7 h-7" />
                  <span data-field="signature.badge2" className="ml-2 font-bold">{t.signature.badge2}</span>
                </div>
              </div>
              <a data-field="signature.cta" href="#menu"
                className="inline-block bg-[#154212] text-white px-10 py-4 rounded-lg font-bold shadow-lg hover:bg-[#446900] transition-colors">
                {t.signature.cta}
              </a>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div aria-hidden className="absolute -inset-4 bg-[#2d5a27]/10 rounded-full blur-3xl z-0" />
              <img className="relative z-10 w-full rounded-2xl shadow-2xl transition-transform hover:rotate-2 duration-700" src={IMG.signature} alt={t.signature.title} />
            </div>
          </div>
        </section>

        {/* Menu — required section */}
        <section data-section="menuSection" className="py-20 px-6 max-w-7xl mx-auto" id="menu">
          <div className="text-center mb-16">
            <h2 data-field="menuSection.title" className="font-['Lexend'] text-3xl font-semibold text-[#154212] mb-3">{t.menuSection.title}</h2>
            <p data-field="menuSection.subtitle" className="text-[#42493e] text-base max-w-2xl mx-auto">{t.menuSection.subtitle}</p>
          </div>

          {t.menuSection.categories.map((cat, ci) => {
            const CatIcon = MENU_ICONS[ci] ?? Soup;
            return (
              <div key={ci} className={ci < t.menuSection.categories.length - 1 ? 'mb-14' : ''}>
                <h3 className="font-['Lexend'] text-xl font-semibold text-[#154212] mb-6 flex items-center gap-3">
                  <CatIcon aria-hidden className="w-6 h-6 text-[#446900]" />
                  <span data-field={`menuSection.categories.${ci}.title`}>{cat.title}</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cat.items.map((item, i) => (
                    <div key={i} className="p-6 rounded-xl bg-[#f6f4ec] border border-[#72796e]/10 hover:shadow-md transition-all">
                      <div className="flex justify-between items-start gap-3 mb-2">
                        <h4 data-field={`menuSection.categories.${ci}.items.${i}.name`} className="font-semibold text-[#1b1c17]">{item.name}</h4>
                        <span data-field={`menuSection.categories.${ci}.items.${i}.price`} className="shrink-0 font-['Lexend'] font-semibold text-[#8b5e3c]">{item.price}</span>
                      </div>
                      <p data-field={`menuSection.categories.${ci}.items.${i}.desc`} className="text-sm text-[#42493e] leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </section>

        {/* Kitchen team */}
        <section data-section="team" className="py-20 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 data-field="team.title" className="font-['Lexend'] text-3xl font-semibold text-[#154212]">{t.team.title}</h2>
            <p data-field="team.subtitle" className="text-[#42493e] mt-2">{t.team.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.team.members.map((m, i) => (
              <div key={i} className="bg-[#f6f4ec] p-6 rounded-2xl border border-[#72796e]/10 hover:shadow-md transition-all">
                <img className="w-full aspect-square object-cover rounded-xl mb-4" src={CHEFS[i] ?? CHEFS[0]} alt={m.name} />
                <h3 data-field={`team.members.${i}.name`} className="font-['Lexend'] text-xl font-semibold text-[#154212]">{m.name}</h3>
                <p data-field={`team.members.${i}.role`} className="text-[#446900] text-sm font-semibold">{m.role}</p>
                <p data-field={`team.members.${i}.quote`} className="text-[#42493e] mt-2 text-sm italic">&ldquo;{m.quote}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="bg-[#dcdad2] py-20" id="reviews">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 data-field="testimonials.title" className="font-['Lexend'] text-3xl font-semibold text-[#154212]">{t.testimonials.title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.testimonials.items.map((item, i) => (
                <div key={i} className="bg-[#fbf9f1] p-8 rounded-xl shadow-sm border-l-4 border-[#154212]">
                  <div aria-hidden className="flex text-[#154212] mb-2 gap-0.5">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <Star key={si} className="w-4 h-4" fill={si < Math.floor(item.rating) ? 'currentColor' : (si < item.rating ? 'currentColor' : 'none')} />
                    ))}
                  </div>
                  <p data-field={`testimonials.items.${i}.quote`} className="text-[#42493e] italic mb-4 leading-relaxed">&ldquo;{item.quote}&rdquo;</p>
                  <div data-field={`testimonials.items.${i}.name`} className="font-bold text-[#154212]">{item.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Map & Contact */}
        <section data-section="contact" className="py-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8" id="contact">
          <div className="w-full md:w-2/3 h-96 rounded-2xl overflow-hidden shadow-lg border border-[#72796e]/10">
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
              <div className="relative w-full h-full">
                <img className="w-full h-full object-cover grayscale-[20%] contrast-[1.1]" src={IMG.map} alt="" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/10">
                  <div className="bg-white p-3 rounded-full shadow-md">
                    <MapPin aria-hidden className="w-7 h-7 text-[#154212]" />
                  </div>
                  <p data-field="contact.mapLoading" className="text-sm font-medium bg-white/90 px-3 py-1 rounded-full text-[#42493e]">{t.contact.mapLoading}</p>
                </div>
              </div>
            )}
          </div>
          <div className="w-full md:w-1/3 flex flex-col justify-center gap-4">
            <h2 data-field="contact.title" className="font-['Lexend'] text-2xl font-semibold text-[#154212]">{t.contact.title}</h2>
            {([
              { Icon: CONTACT_ICONS[0], value: t.contact.address, field: 'contact.address', href: undefined },
              { Icon: CONTACT_ICONS[1], value: t.contact.phone, field: 'contact.phone', href: `tel:${t.contact.phone.replace(/[^\d+]/g, '')}` },
              { Icon: CONTACT_ICONS[2], value: t.contact.email, field: 'contact.email', href: `mailto:${t.contact.email}` },
            ]).map((row) => (
              <div key={row.field} className="flex items-start gap-3">
                <row.Icon aria-hidden className="w-5 h-5 mt-0.5 text-[#446900]" />
                {row.href ? (
                  <a data-track="call" data-field={row.field} href={row.href} className="text-[#42493e] hover:text-[#154212] transition-colors">{row.value}</a>
                ) : (
                  <p data-field={row.field} className="text-[#42493e]">{row.value}</p>
                )}
              </div>
            ))}
            <div aria-hidden className="h-0.5 my-4 bg-gradient-to-r from-transparent via-[#154212]/20 to-transparent" />
            <h3 data-field="contact.hoursTitle" className="text-sm font-bold flex items-center gap-2 text-[#1b1c17]">
              <CalendarClock aria-hidden className="w-4 h-4 text-[#446900]" /> {t.contact.hoursTitle}
            </h3>
            <p className="text-sm text-[#42493e]">
              <span data-field="contact.lunchLabel">{t.contact.lunchLabel}</span>: <span data-field="contact.lunchHours">{t.contact.lunchHours}</span>
            </p>
            <p className="text-sm text-[#42493e]">
              <span data-field="contact.dinnerLabel">{t.contact.dinnerLabel}</span>: <span data-field="contact.dinnerHours">{t.contact.dinnerHours}</span>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="bg-[#e4e3db] border-t border-[#72796e]/10">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 py-12 gap-6 max-w-7xl mx-auto">
          <div className="flex flex-col gap-1 items-center md:items-start">
            <span data-field="footer.brand" className="font-['Lexend'] text-2xl font-semibold text-[#154212]">{t.footer.brand}</span>
            <span data-field="footer.copy" className="text-[#42493e] text-xs">{t.footer.copy}</span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <a className="text-[#42493e] hover:text-[#446900] text-xs hover:underline transition-all" href="#">{t.footer.privacy}</a>
            <a className="text-[#42493e] hover:text-[#446900] text-xs hover:underline transition-all" href="#">{t.footer.terms}</a>
            <a className="text-[#42493e] hover:text-[#446900] text-xs hover:underline transition-all" href="#">{t.footer.careers}</a>
            <a className="text-[#42493e] hover:text-[#446900] text-xs hover:underline transition-all" href="#">{t.footer.press}</a>
          </div>
        </div>
      </footer>

      {/* FAB for quick booking */}
      <a data-track="reserve" href="#contact" aria-label={t.fab.label}
        className="fixed bottom-8 right-8 z-40 md:hidden bg-[#c1ee7d] text-[#486d04] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
        <CalendarClock aria-hidden className="w-7 h-7" />
      </a>
    </div>
  );
}
