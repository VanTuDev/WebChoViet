import { Flower2, Waves, Leaf, MapPin, Clock, Phone, Quote, ChevronsDown, Globe, Mail } from 'lucide-react';
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
  heroBg: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHb8V5K-haV2e-IrpZXgy2z0XdzTA6WQQF9XkzSGQMKhJaNCvSqyjGuH7GM_fLUmBFhv72wT3HmU7AKLwVcKQo2xi7N_UPybcaCnmtV1xE8wbV5GFFdy3ILyZ_lhCkH68K3hUObu9ya80EvZdQ6cdyBYpo6Fdy017PA1ODVqA1Pyy8vit0AvwDLP74Vg6BxeFHMf4R3eYL3tuau8JYiU87C4br8_BDQLB9KJFlXY5l8jsP5MjgC4D0',
  categoryMeditation: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZ2_To7iN9Dz7EC73l_NNvqzFEQDs4kUNo3JxR9Mx_9T--w1otFt7SF57ZD1o_Fby9_AFjNXv6Y69cXF7KB3gEUWthS4VVJTeexNn0YeWqSmItHoTXa5__rTw0Weclnitx3N9SvvKRw6q-InSYv2oOQJy4z7I-X1uINInf2W9UXWmoWbSjiTd4IZHMA6mohGO7xlCp8Jf24XOWENUsUBXKi19qjWkbtb--lxHBvgfimUMNZZhcfyUI',
  categoryYoga: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDmo4np6M62BIP-eWunwdQBSk4AYrf-h-YgCJmSbyM0HhweHaNEyhYfi6NKPKr6O5EeU401xwx-c0oa1LGKHzc45Gr5sRYr1CD4fkpbF5yqL258l7q-OsTnjEzZx4mYJNnGK8uoRxbLGbHzjibOLrUOrRGDW1daga5xH8gR79x8bh9ExaWvcTJvw0FP2i7qlKIoUO6idTNKXDE-NORDJXmZTA2uuao11qoZGMq9TMrB33eG66OXO9Py',
  categoryHotStone: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqsweb5mPTBm5Jq2NrHDLSannZaxvy3VIogVSZIZPf7cL16rhiryKF4atKvXnll4TrlFoaSg8bgsFZgmc4NlvhUQqQQu_r8l6TlZ72JYnI456wzHelcfYm5scT-EZTQPLRSltq4LuiKdVEWBYPfkdCn8LHj3IsS_x2Jb4bi121TiOEaGcd_3dlO7k-DBqpmNPjZC8c2YMUmb1DF2BD4bAO5t291DFRGcv027qYgLcFJc-Lqa7Tgs_6',
  categoryOil: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBCsPD3jWmD5_PQNuVKioOdfBdQhsnzOv9mYIBpvUo0vz7BQwVd9L0qCPlTmsjWCkVnSlio87E9IJ3OclntB9_njygpJMyIGfR-ClM4vlTw-RkTsQXRn8Oa2AnGJgAZfMr5FSvD_AaQy_SH-0bQtT20S-U4I0nt3XLKqIPs94c6DmcUA-5NeBAVIXoIv_IOSzoXJXYzEnb85w9gw9f4pk-KALw0HtN8QlCj8SrMsLRuVNtNbRIeUYo7',
  categoryDetox: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG4HpSfOsbGNip28J65NH68soH3QKAqospdCgh2m5pe1fkD3jnr6CYsBsUPnUXSSSmi-BXhl1_ttXQ6Tl2wPOm5FEkpSkaDsk0tgRi_Fa7TBLlMVcD63IIfywvH_qp-_BJxY_HWt1jX5I3JgndDJ__lWGat3oPYGzLmHqVn20gzLZbQbnhpij8BDriE-i7TcgMw06HyawqboMWtfuoXLC-9CZaPCMmo6Xjsqm853YPwg0xjVXmb-Gw',
  categoryFootBath: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBcweJYJN0GYvAiNHQLaygKXhmIzVC5UxLyK_hz4zuv4Cb_x4aRHgVqK_bRrbcKIIJKDM3GcO5kNyN16QafYg8sxYJFMCx_d9JBdft2MFByjQjndiK1TezE4XzUdxMVQLAh0BtrxAO2f1BEGYmFg7HpzWoQ6RS8GcrhKj4-z0j9mwJ6q33OhDlNtqHzEWJOZ3EwVGu7UsW6a4_w2663QYncg8otRcR5x6pbI2ObP5H0DhzDY6EbeXHQ',
  spaceLobby: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGwE56CL3Wd5TPUYLbAdyvTQT3_cRdUn8-AxjX54IZcX6PIlaRoCvSvpD3c7IbXJcJT5L94sM_I1JrZ2YNfuWFimYeOw-B_HyeM4WFuK5vbUMVLG-262EUC9jE06JZ0FiuIwEqOuUp6bE8CDqZ8W63Hg2BQ29xrrZEhtm8l2xdn1e7s_ywuwAQVMmjyMQgao_mIE8-B6cpspP-E51Yw0NxCh8TDi4SRgkJy51yU9FWw79h9TJ8T9ig',
  spaceRoom: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAJBXMW7Pkd1KOMSwsYJ7CiEcRpl40b9I_rZYfJl_JtCdUn5jqzQGtPScvdvLH62OP4MyPDgRRns9FcLluM1_b11dkV_NjRTKukLgJQ8h62IAMFmeVxxOcFwK9-0YauEQknftGm9g-28v2MJ9EQxN0NIBhA1WDh_ftqNPXFcmZXBDex-zBmfyJypweBssQFsdzcq2lXM-0bwLwBdSAcRCOeZPb5BJ_UxlQB9ZUZ7Cm7q-hHbC0jS4WN',
  spaceFacial: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxpOVL-fF-f_aG8mPFhU4wCuxpGnsi4Yg-dtqUhf6dsYQ3ZakrK81IQwXJNVOESkwyy5I_O-F2qKU9jHMfoLhgwNxGRN7HBfst_yW5zTr3TsxGEwToSKXmQKgp64Ny6KptuDzbIb6GqGoqpz-j6wbRhObWnAVqXu12PqchjgYfDWCmYn6uMGqWjwHrUvRCGBI7JYPgU12Oi1MQ6tZmlbwHgBsa85m-aLexdc0dIKkqBmvywpsqLW0d',
  spaceZenGarden: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDzOQCA4MZ3Ehb8P66-ytIIoifd99b_yTU3I4uzbGIW5_PB-JyzmFbaxNhB7meWC0874mITzQfwQccAKkkFFCzFVfdOPSBpfvjR1GrCNMEcKCoBWw2JmMN9wr_bYvagUcjg_dqy7pw7J4eBdytEHoPU5nX6UE7EPBZfsk89es9eJsh-qMHbWNPchDac6bnL_Sdc3CFhBUhE0ErZhcLCJv2IP_JNVvRzLZPLLPbCh4jPRl10mKonAlDh',
};

/** Icon nhóm chăm sóc — nằm ngoài i18n vì không phải nội dung dịch */
const CATEGORY_ICONS = [Flower2, Waves, Leaf];
const CATEGORY_IMAGES: string[][] = [
  ['categoryMeditation', 'categoryYoga'],
  ['categoryHotStone', 'categoryOil'],
  ['categoryDetox', 'categoryFootBath'],
];
const CONTACT_ICONS = [MapPin, Clock, Phone];

export default function Spa5({ lang = 'vi' }: Props) {
  const activeLang: Lang = (['vi', 'en', 'zh', 'ko'] as const).includes(lang as Lang) ? (lang as Lang) : 'vi';
  const { customData, images } = useTemplateCustom();
  const t = deepMerge(translations[activeLang] as Record<string, unknown>, customData) as typeof viJson;
  const IMG = { ...DEFAULT_IMGS, ...images } as Record<string, string>;

  return (
    <div className="bg-[#faf9f6] text-[#1a1c1a] font-sans antialiased" style={{ fontFamily: 'Lexend, sans-serif' }}>

      {/* Navbar */}
      <header data-section="nav" className="fixed top-0 left-0 w-full z-50 bg-[#faf9f6]/80 backdrop-blur-md">
        <div className="flex justify-between items-center px-6 md:px-8 py-6 max-w-[1440px] mx-auto">
          <span data-field="nav.brand" className="text-2xl font-light text-[#56642b] tracking-tighter">{t.nav.brand}</span>
          <nav className="hidden md:flex items-center gap-12">
            <a className="text-sm font-medium text-[#56642b] border-b-2 border-[#56642b] pb-1" href="#services">{t.nav.services}</a>
            <a className="text-sm font-medium text-[#46483c] hover:text-[#56642b] transition-colors" href="#pricing">{t.nav.pricing}</a>
            <a className="text-sm font-medium text-[#46483c] hover:text-[#56642b] transition-colors" href="#space">{t.nav.space}</a>
            <a className="text-sm font-medium text-[#46483c] hover:text-[#56642b] transition-colors" href="#reviews">{t.nav.reviews}</a>
          </nav>
          <button data-track="cta_navbar" className="bg-[#56642b] text-white px-6 py-3 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-all active:scale-95 cursor-pointer">
            {t.nav.cta}
          </button>
        </div>
      </header>

      <main className="pt-24 overflow-x-hidden">
        {/* Hero */}
        <section data-section="hero" className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 text-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#faf9f6] via-transparent to-[#faf9f6] z-10" />
            <img className="w-full h-full object-cover opacity-60" src={IMG.heroBg} alt="" />
          </div>
          <div className="relative z-20 max-w-4xl">
            <div aria-hidden className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#56642b] rounded-full filter blur-3xl opacity-20"
              style={{ animation: 'zenith-breathe 4s ease-in-out infinite' }} />
            <h1 className="text-4xl md:text-6xl font-light text-[#56642b] mb-6 leading-tight">
              <span data-field="hero.titleLine1">{t.hero.titleLine1}</span>
              <br />
              <span data-field="hero.titleLine2" className="italic font-light">{t.hero.titleLine2}</span>
            </h1>
            <p data-field="hero.subtitle" className="text-lg font-light text-[#46483c] mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a data-track="hero_primary" data-field="hero.btnPrimary" href="#services"
                className="bg-[#56642b] text-white px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-all shadow-[0_10px_40px_-10px_rgba(86,100,43,0.2)]">
                {t.hero.btnPrimary}
              </a>
              <a data-field="hero.btnSecondary" href="#space"
                className="border border-[#76786b] text-[#46483c] px-8 py-4 rounded-full text-sm font-medium tracking-wide hover:bg-[#efeeeb] transition-all">
                {t.hero.btnSecondary}
              </a>
            </div>
          </div>
          <div aria-hidden className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-40 animate-bounce">
            <ChevronsDown className="w-8 h-8 text-[#56642b]" />
          </div>
        </section>

        {/* Categories — Danh Mục Chăm Sóc */}
        <section data-section="categories" className="py-20 px-6 max-w-[1440px] mx-auto" id="services">
          <div className="mb-20 text-center">
            <h2 data-field="categories.title" className="text-3xl font-normal text-[#56642b] mb-3">{t.categories.title}</h2>
            <div className="w-16 h-1 bg-[#56642b]/20 mx-auto rounded-full" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {t.categories.groups.map((group, gi) => {
              const GroupIcon = CATEGORY_ICONS[gi] ?? Flower2;
              const imgKeys = CATEGORY_IMAGES[gi] ?? ['categoryMeditation', 'categoryYoga'];
              return (
                <div key={gi} className="flex flex-col gap-10">
                  <div>
                    <GroupIcon aria-hidden className="w-10 h-10 text-[#56642b] mb-3" />
                    <h3 data-field={`categories.groups.${gi}.title`} className="text-2xl font-normal text-[#56642b] mb-4">{group.title}</h3>
                    <p data-field={`categories.groups.${gi}.desc`} className="text-[#46483c] font-light leading-relaxed">{group.desc}</p>
                  </div>
                  <div className="space-y-10">
                    {group.items.map((item, ii) => (
                      <div key={ii} className="group cursor-pointer">
                        <div className="overflow-hidden rounded-2xl mb-3">
                          <img className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
                            src={IMG[imgKeys[ii] as string] ?? IMG.categoryMeditation} alt={item.name} />
                        </div>
                        <h4 data-field={`categories.groups.${gi}.items.${ii}.name`} className="text-xs font-medium text-[#56642b] tracking-widest uppercase mb-2">{item.name}</h4>
                        <p data-field={`categories.groups.${gi}.items.${ii}.desc`} className="text-[#46483c] text-sm font-light">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Services / Pricing */}
        <section data-section="services" className="py-20 px-6 bg-[#f4f3f1]" id="pricing">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-16 text-center">
              <h2 data-field="services.title" className="text-3xl font-normal text-[#56642b] mb-3">{t.services.title}</h2>
              <p data-field="services.subtitle" className="text-[#46483c] font-light max-w-xl mx-auto">{t.services.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.services.categories.map((cat, ci) => (
                <div key={ci} className={
                  'p-10 rounded-2xl border ' +
                  (cat.highlight
                    ? 'bg-[#8a9a5b]/10 border-[#56642b]/20 shadow-[0_10px_40px_-10px_rgba(86,100,43,0.1)]'
                    : 'bg-[#faf9f6] border-[#c6c8b8]/30 shadow-[0_10px_40px_-10px_rgba(86,100,43,0.06)]')
                }>
                  <h3 data-field={`services.categories.${ci}.title`} className="text-xl font-normal text-[#56642b] mb-6 pb-4 border-b border-[#c6c8b8]/50">
                    {cat.title}
                  </h3>
                  <ul className="space-y-6">
                    {cat.items.map((item, ii) => (
                      <li key={ii} className="flex justify-between items-end gap-4">
                        <div className="flex-1">
                          <p data-field={`services.categories.${ci}.items.${ii}.name`} className={'text-sm text-[#56642b]' + (cat.highlight ? ' font-bold' : ' font-medium')}>
                            {item.name}
                          </p>
                          <p data-field={`services.categories.${ci}.items.${ii}.duration`} className="text-xs text-[#46483c]">{item.duration}</p>
                          <p data-field={`services.categories.${ci}.items.${ii}.desc`} className="text-xs text-[#46483c] font-light mt-1">{item.desc}</p>
                        </div>
                        <span data-field={`services.categories.${ci}.items.${ii}.price`} className={'text-sm text-[#56642b] shrink-0' + (cat.highlight ? ' font-bold' : ' font-medium')}>
                          {item.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {cat.note && (
                    <div className="mt-8 p-4 bg-[#56642b]/5 rounded-xl">
                      <p data-field={`services.categories.${ci}.note`} className="text-xs text-[#46483c] text-center italic">{cat.note}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-14 text-center">
              <button data-track="cta_services" data-field="services.btnCta"
                className="bg-[#56642b] text-white px-12 py-5 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-all active:scale-95 shadow-[0_10px_40px_-10px_rgba(86,100,43,0.2)]">
                {t.services.btnCta}
              </button>
            </div>
          </div>
        </section>

        {/* Space — Bento gallery */}
        <section data-section="space" className="py-20 px-6 max-w-[1440px] mx-auto" id="space">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div className="max-w-xl">
              <h2 data-field="space.title" className="text-3xl font-normal text-[#56642b] mb-3">{t.space.title}</h2>
              <p data-field="space.subtitle" className="text-[#46483c] font-light">{t.space.subtitle}</p>
            </div>
            <a data-field="space.tourBtn" href="#" className="border-b border-[#56642b] text-[#56642b] text-sm font-medium pb-1 hover:opacity-70 transition-opacity">
              {t.space.tourBtn}
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:h-[700px]">
            <div className="md:col-span-2 md:row-span-2 overflow-hidden rounded-2xl h-64 md:h-auto">
              <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" src={IMG.spaceLobby} alt={t.space.title} />
            </div>
            <div className="md:col-span-2 overflow-hidden rounded-2xl hidden md:block">
              <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" src={IMG.spaceRoom} alt="" />
            </div>
            <div className="overflow-hidden rounded-2xl hidden md:block">
              <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" src={IMG.spaceFacial} alt="" />
            </div>
            <div className="overflow-hidden rounded-2xl hidden md:block">
              <img className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1.5s]" src={IMG.spaceZenGarden} alt="" />
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section data-section="testimonials" className="py-20 px-6 max-w-[1440px] mx-auto overflow-hidden" id="reviews">
          <h2 data-field="testimonials.title" className="text-3xl font-normal text-[#56642b] mb-16 text-center">{t.testimonials.title}</h2>
          <div className="flex gap-6 overflow-x-auto pb-12 snap-x" style={{ scrollbarWidth: 'none' }}>
            {t.testimonials.items.map((item, i) => (
              <div key={i} className="min-w-[320px] md:min-w-[450px] bg-[#efeeeb] rounded-2xl p-10 snap-center">
                <Quote aria-hidden className="w-9 h-9 text-[#8a9a5b] mb-6" />
                <p data-field={`testimonials.items.${i}.quote`} className="text-lg text-[#1a1c1a] mb-8 italic leading-relaxed font-light">
                  "{item.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div aria-hidden className="w-12 h-12 rounded-full bg-[#e0e5d4]" />
                  <div>
                    <p data-field={`testimonials.items.${i}.name`} className="text-sm font-medium text-[#56642b]">{item.name}</p>
                    <p data-field={`testimonials.items.${i}.role`} className="text-xs text-[#46483c]">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact + Map */}
        <section data-section="contact" className="py-20 px-6 max-w-[1440px] mx-auto" id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1 h-[420px] rounded-2xl overflow-hidden shadow-[0_10px_40px_-10px_rgba(86,100,43,0.1)]">
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
                <div className="w-full h-full bg-[#e9e8e5] flex items-center justify-center flex-col gap-3">
                  <MapPin aria-hidden className="w-14 h-14 text-[#56642b]" />
                  <p className="text-sm font-medium text-[#46483c]">{t.contact.mapLoading}</p>
                  <p data-field="contact.address" className="text-sm text-[#46483c] px-6 text-center">{t.contact.address}</p>
                </div>
              )}
            </div>
            <div className="order-1 lg:order-2 lg:pl-10">
              <h2 data-field="contact.title" className="text-3xl font-normal text-[#56642b] mb-3">{t.contact.title}</h2>
              <p data-field="contact.subtitle" className="text-[#46483c] font-light mb-10">{t.contact.subtitle}</p>
              <div className="space-y-6">
                {([
                  { label: t.contact.addressLabel, value: t.contact.address, valueField: 'contact.address' },
                  { label: t.contact.hoursLabel, value: t.contact.hours, valueField: 'contact.hours' },
                  { label: t.contact.phoneLabel, value: t.contact.phone, valueField: 'contact.phone' },
                ]).map((row, ri) => {
                  const RowIcon = CONTACT_ICONS[ri] ?? MapPin;
                  return (
                    <div key={row.valueField} className="flex gap-4">
                      <RowIcon aria-hidden className="w-5 h-5 mt-0.5 text-[#56642b]" />
                      <div>
                        <p className="text-sm font-medium text-[#56642b]">{row.label}</p>
                        <p data-field={row.valueField} className="text-[#46483c] font-light">{row.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <a data-track="cta_directions" data-field="contact.btnDirections"
                href={t.contact.mapUrl ? t.contact.mapUrl : `tel:${t.contact.phone.replace(/\s/g, '')}`}
                className="inline-block mt-10 bg-[#56642b] text-white px-10 py-4 rounded-full text-sm font-medium tracking-wide hover:opacity-90 transition-all">
                {t.contact.btnDirections}
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer data-section="footer" className="w-full py-10 px-6 flex flex-col md:flex-row justify-between items-center gap-6 bg-[#f4f3f1] border-t border-[#c6c8b8]/20">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span data-field="footer.brand" className="text-2xl font-normal text-[#56642b]">{t.footer.brand}</span>
          <p data-field="footer.copy" className="text-xs text-[#43493c]">{t.footer.copy}</p>
        </div>
        <nav className="flex gap-8">
          <a className="text-xs text-[#43493c] hover:text-[#56642b] transition-colors" href="#">{t.footer.privacy}</a>
          <a className="text-xs text-[#43493c] hover:text-[#56642b] transition-colors" href="#">{t.footer.terms}</a>
          <a className="text-xs text-[#43493c] hover:text-[#56642b] transition-colors" href="#">{t.footer.contact}</a>
        </nav>
        <div className="flex gap-4">
          <a aria-label={t.footer.socialWebsite} className="w-10 h-10 rounded-full flex items-center justify-center border border-[#c6c8b8] text-[#46483c] hover:border-[#56642b] hover:text-[#56642b] transition-all" href="#">
            <Globe aria-hidden className="w-4 h-4" />
          </a>
          <a aria-label={t.footer.socialEmail} className="w-10 h-10 rounded-full flex items-center justify-center border border-[#c6c8b8] text-[#46483c] hover:border-[#56642b] hover:text-[#56642b] transition-all" href="#">
            <Mail aria-hidden className="w-4 h-4" />
          </a>
        </div>
      </footer>

      <style>{`
        @keyframes zenith-breathe {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.15); opacity: 0.1; }
        }
      `}</style>
    </div>
  );
}
