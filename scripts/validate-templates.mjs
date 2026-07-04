#!/usr/bin/env node
/**
 * ─── Template Validator ────────────────────────────────────────────────────────
 *
 * Kiểm tra MỌI template đã convert (có index.tsx) trong src/data/Template/
 * tuân thủ bộ quy tắc chất lượng — xem .claude/skills/template-rules/SKILL.md
 * (repo root) để hiểu lý do từng quy tắc.
 *
 * Chạy:  node scripts/validate-templates.mjs
 * Exit 0 = tất cả đạt · Exit 1 = có lỗi (ERROR). WARN không chặn.
 */
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const TEMPLATE_DIR = join(ROOT, 'src', 'data', 'Template');
const CATEGORIES_DIR = join(ROOT, 'src', 'data', 'templates', 'categories');

const REQUIRED_LANGS = ['vi', 'en', 'zh', 'ko'];

/**
 * Section bắt buộc theo category — mảng con = "một trong các key này phải có".
 * Lý do: template ẩm thực mà không có menu, gym không có gói tập... là thiếu
 * phần cốt lõi người mua template mong đợi.
 */
const REQUIRED_SECTIONS = {
  coffee: [['menu', 'menuSection', 'drinks']],
  'milk-tea': [['menu', 'menuSection']],
  restaurant: [['menu', 'menuSection']],
  gym: [['programs', 'membership']],
  spa: [['services']],
  wedding: [['events', 'timeline'], ['rsvp']],
};

let errors = 0;
let warnings = 0;

function err(tpl, msg) {
  errors++;
  console.log(`  ✗ ERROR  [${tpl}] ${msg}`);
}
function warn(tpl, msg) {
  warnings++;
  console.log(`  ⚠ WARN   [${tpl}] ${msg}`);
}

/** So sánh cấu trúc key sâu — trả danh sách khác biệt giữa 2 object (base = vi). */
function diffKeyStructure(base, other, path = '') {
  const diffs = [];
  if (Array.isArray(base)) {
    if (!Array.isArray(other)) return [`${path}: vi là mảng, bản dịch không phải mảng`];
    if (base.length !== other.length) diffs.push(`${path}: mảng lệch độ dài (vi=${base.length}, dịch=${other.length})`);
    const n = Math.min(base.length, other.length);
    for (let i = 0; i < n; i++) diffs.push(...diffKeyStructure(base[i], other[i], `${path}[${i}]`));
    return diffs;
  }
  if (base !== null && typeof base === 'object') {
    if (other === null || typeof other !== 'object' || Array.isArray(other)) {
      return [`${path}: vi là object, bản dịch không phải object`];
    }
    for (const k of Object.keys(base)) {
      const p = path ? `${path}.${k}` : k;
      if (!(k in other)) diffs.push(`${p}: thiếu trong bản dịch`);
      else diffs.push(...diffKeyStructure(base[k], other[k], p));
    }
    for (const k of Object.keys(other)) {
      if (!(k in base)) diffs.push(`${path ? `${path}.` : ''}${k}: thừa so với vi.json`);
    }
    return diffs;
  }
  return diffs;
}

function hasKeyDeep(obj, keyName) {
  if (Array.isArray(obj)) return obj.some(v => hasKeyDeep(v, keyName));
  if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).some(k => k === keyName || hasKeyDeep(obj[k], keyName));
  }
  return false;
}

// ── Đọc nội dung các file category registry (để check template đã đăng ký) ──────
const categoryFileContents = {};
for (const f of readdirSync(CATEGORIES_DIR)) {
  if (f.endsWith('.ts')) categoryFileContents[f.replace(/\.ts$/, '')] = readFileSync(join(CATEGORIES_DIR, f), 'utf8');
}

// ── Quét từng template ───────────────────────────────────────────────────────────
console.log('── Kiểm tra template theo bộ quy tắc ──────────────────────────────\n');

const unconverted = [];

for (const category of readdirSync(TEMPLATE_DIR)) {
  const catPath = join(TEMPLATE_DIR, category);
  if (!statSync(catPath).isDirectory() || category.startsWith('_')) continue;

  for (const name of readdirSync(catPath)) {
    const tplPath = join(catPath, name);
    if (!statSync(tplPath).isDirectory()) continue;
    const tpl = `${category}/${name}`;
    const tsxPath = join(tplPath, 'index.tsx');

    if (!existsSync(tsxPath)) {
      unconverted.push(tpl);
      continue;
    }

    const tsx = readFileSync(tsxPath, 'utf8');

    // 1. i18n đủ 4 ngôn ngữ, vi.json là schema gốc
    const i18nDir = join(tplPath, 'i18n');
    let viJson = null;
    if (!existsSync(join(i18nDir, 'vi.json'))) {
      err(tpl, 'thiếu i18n/vi.json (schema gốc của template)');
    } else {
      viJson = JSON.parse(readFileSync(join(i18nDir, 'vi.json'), 'utf8'));
    }
    for (const lang of REQUIRED_LANGS) {
      const p = join(i18nDir, `${lang}.json`);
      if (!existsSync(p)) {
        err(tpl, `thiếu i18n/${lang}.json — mọi template phải đủ 4 ngôn ngữ vi/en/zh/ko`);
        continue;
      }
      if (lang !== 'vi' && viJson) {
        const other = JSON.parse(readFileSync(p, 'utf8'));
        const diffs = diffKeyStructure(viJson, other);
        for (const d of diffs.slice(0, 5)) err(tpl, `i18n/${lang}.json lệch cấu trúc: ${d}`);
        if (diffs.length > 5) err(tpl, `i18n/${lang}.json còn ${diffs.length - 5} lệch cấu trúc khác`);
      }
    }

    // 2. Google Maps: key mapUrl trong vi.json + iframe render thật trong tsx
    if (viJson && !hasKeyDeep(viJson, 'mapUrl')) {
      err(tpl, 'vi.json không có key "mapUrl" — mọi template phải cho user nhúng Google Maps');
    }
    if (!tsx.includes('<iframe')) {
      err(tpl, 'index.tsx không render <iframe> nào — mapUrl phải được nhúng thành bản đồ thật');
    } else {
      if (!tsx.includes('toGoogleMapsEmbedUrl')) {
        err(tpl, 'iframe không dùng toGoogleMapsEmbedUrl (utils/googleMaps) — bắt buộc để chuẩn hoá URL');
      }
      if (!tsx.includes('loading="lazy"')) warn(tpl, 'iframe bản đồ nên có loading="lazy"');
      if (!/title=/.test(tsx)) warn(tpl, 'iframe bản đồ nên có title (accessibility)');
    }

    // 3. Section bắt buộc theo category
    const required = REQUIRED_SECTIONS[category] ?? [];
    if (viJson) {
      for (const group of required) {
        if (!group.some(k => k in viJson)) {
          err(tpl, `vi.json thiếu section bắt buộc của category "${category}": cần một trong [${group.join(', ')}]`);
        }
      }
    }

    // 4. Ngôn ngữ phải theo prop — không giữ bug useState(initialLang) cũ
    if (tsx.includes('initialLang')) {
      err(tpl, 'còn pattern "initialLang" — lang phải lấy từ prop (hoặc useTemplateLang) để LanguageSwitcher hoạt động');
    }
    if (!/\blang\b/.test(tsx) || !(tsx.includes('useTemplateLang(') || /\{\s*lang\s*=\s*'vi'/.test(tsx) || /\{\s*lang:\s*propLang/.test(tsx))) {
      err(tpl, 'index.tsx không nhận prop lang đúng chuẩn (destructure `{ lang = \'vi\' }` hoặc dùng useTemplateLang)');
    }

    // 5. Icon: cả emoji lẫn Material Symbols đều được (index.html có load font
    //    Material Symbols Outlined) — không cần check gì thêm ở đây.

    // 6. Inline-edit & analytics attributes (khuyến nghị)
    const dataFieldCount = (tsx.match(/data-field=/g) ?? []).length;
    const dataSectionCount = (tsx.match(/data-section=/g) ?? []).length;
    if (dataFieldCount < 5) warn(tpl, `chỉ có ${dataFieldCount} data-field — nên đánh dấu ≥5 field để inline-edit hoạt động tốt`);
    if (dataSectionCount < 3) warn(tpl, `chỉ có ${dataSectionCount} data-section — nên đánh dấu ≥3 section`);
    if (!tsx.includes('data-track')) warn(tpl, 'không có data-track nào — CTA (gọi điện/đặt bàn/zalo) nên gắn để analytics đếm chuyển đổi');

    // 7. Đã đăng ký trong registry (categories/<category>.ts)
    const catFile = categoryFileContents[category];
    if (!catFile) {
      err(tpl, `không tìm thấy file categories/${category}.ts trong registry`);
    } else if (!catFile.includes(`/${category}/${name}/`)) {
      err(tpl, `chưa được đăng ký trong categories/${category}.ts (thiếu import schema + entry TemplateDefinition)`);
    }
  }
}

// ── Tổng kết ──────────────────────────────────────────────────────────────────
console.log('');
if (unconverted.length) {
  console.log(`ℹ Chưa convert (chỉ có code.html thô, bỏ qua): ${unconverted.join(', ')}\n`);
}
console.log(`Kết quả: ${errors} lỗi · ${warnings} cảnh báo`);
process.exit(errors > 0 ? 1 : 0);
