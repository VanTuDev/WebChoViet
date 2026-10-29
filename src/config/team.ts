// ─── Đội ngũ sản phẩm VNGOWEB — dùng cho trang /about ─────────────────────────
// Tên hiển thị tạm lấy theo tên file ảnh (assets/aboutUs/*) — thay `name` bằng họ tên đầy đủ
// khi có; vai trò/mô tả nằm trong i18n (about.json → team.members.<id>), không sửa ở đây.
// Ảnh đã xuất WebP 4:5 tại public/team/<id>-480.webp và <id>-800.webp (nguồn gốc ở assets/aboutUs).

export type TeamGroupId = 'ops' | 'marketing';

export interface TeamMember {
  /** Khoá i18n (about:team.members.<id>) đồng thời là tiền tố tên file ảnh trong public/team */
  id: 'hieu' | 'khoa' | 'hoai-mi' | 'linh' | 'nga';
  name: string;
  group: TeamGroupId;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'hieu', name: 'Hieu', group: 'ops' },
  { id: 'khoa', name: 'Khoa', group: 'ops' },
  { id: 'hoai-mi', name: 'Hoai Mi', group: 'marketing' },
  { id: 'linh', name: 'Linh', group: 'marketing' },
  { id: 'nga', name: 'Nga', group: 'marketing' },
];

/** Ảnh người sáng lập — public/team/tu-*.webp */
export const FOUNDER_PHOTO_ID = 'tu';

export const teamPhoto = (id: string, width: 480 | 800 = 800) => `/team/${id}-${width}.webp`;
