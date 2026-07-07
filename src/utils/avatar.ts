/** URL avatar mặc định (dịch vụ ui-avatars.com) khi user/site owner chưa có ảnh đại diện thật. */
export function avatarUrl(name: string, avatar?: string | null): string {
  return avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=e8491f&color=fff`;
}
