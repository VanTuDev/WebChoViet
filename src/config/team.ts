// ─── Đội ngũ sáng lập VNGOWEB — dùng cho trang /about ─────────────────────────
// 5 đồng sáng lập (danh sách dưới đây) + Nguyễn Văn Tú (nhà sáng lập, phát triển hệ thống — xem contact.ts).
// `id` là tiền tố tên file ảnh (khớp assets/aboutUs/*); `name` là họ tên đầy đủ hiển thị trên trang.
// Ảnh đã xuất WebP 4:5 tại public/team/<id>-480.webp và <id>-800.webp (nguồn gốc ở assets/aboutUs).

export interface TeamMember {
  /** Tiền tố tên file ảnh trong public/team */
  id: 'hieu' | 'khoa' | 'hoai-mi' | 'linh' | 'nga';
  name: string;
}

export const TEAM_MEMBERS: TeamMember[] = [
  { id: 'hieu', name: 'Nguyễn Thanh Hiếu' },
  { id: 'khoa', name: 'Trần Quang Khoa' },
  { id: 'hoai-mi', name: 'Nguyễn Lê Hoài Mi' },
  { id: 'linh', name: 'Nguyễn Thị Thảo Linh' },
  { id: 'nga', name: 'Nguyễn Thị Nga' },
];

/** Ảnh người sáng lập — public/team/tu-*.webp */
export const FOUNDER_PHOTO_ID = 'tu';

export const teamPhoto = (id: string, width: 480 | 800 = 800) => `/team/${id}-${width}.webp`;
