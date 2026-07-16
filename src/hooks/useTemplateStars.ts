import { useEffect, useSyncExternalStore } from 'react';
import {
  fetchTemplateStarCounts,
  fetchMyStarredTemplateIds,
  toggleTemplateStar,
} from '../services/templateStarsService';
import { useAppContext } from '../store/AppContext';

// Store module-level dùng chung cho mọi component (Marketplace, TemplateCard × N,
// TemplatePreviewPage...) — chỉ load /templates/stars 1 lần mỗi phiên, và mọi nơi bấm
// sao ở bất kỳ card nào cũng phải phản ánh ngay ra các nơi khác (vd số sao hiển thị trên
// TemplatePreviewPage sau khi vừa bấm sao ở TemplateCard) — dùng useSyncExternalStore
// thay vì useState riêng từng hook instance để tránh state bị lệch nhau giữa các component.
let counts: Record<string, number> = {};
let countsLoaded = false;
let countsInflight: Promise<void> | null = null;

let starredIds = new Set<string>();
// userId mà `starredIds` đang phản ánh — user đổi (đăng nhập tài khoản khác/đăng xuất)
// thì cache "đã sao" cũ PHẢI bỏ, không thì lộ trạng thái sao của người dùng trước.
let starredUserId: string | null = null;
let starredInflight: Promise<void> | null = null;

let version = 0;
const listeners = new Set<() => void>();
function bump() { version++; listeners.forEach(l => l()); }
function subscribe(listener: () => void) { listeners.add(listener); return () => listeners.delete(listener); }
function getVersion() { return version; }

function ensureCountsLoaded() {
  if (countsLoaded || countsInflight) return;
  countsInflight = fetchTemplateStarCounts()
    .then(data => { counts = data; })
    .catch(() => { counts = {}; })
    .finally(() => { countsLoaded = true; countsInflight = null; bump(); });
}

function ensureStarredLoaded(userId: string | null) {
  if (!userId) {
    if (starredUserId !== null || starredIds.size > 0) { starredIds = new Set(); starredUserId = null; bump(); }
    return;
  }
  if (starredUserId === userId) return;
  if (starredInflight) return;
  starredInflight = fetchMyStarredTemplateIds()
    .then(ids => { starredIds = new Set(ids); starredUserId = userId; })
    .catch(() => { starredIds = new Set(); starredUserId = userId; })
    .finally(() => { starredInflight = null; bump(); });
}

/**
 * Sao kiểu GitHub cho template: đếm tổng lượt sao (public) + trạng thái "user hiện tại đã
 * sao chưa" (cần đăng nhập) + bật/tắt sao có optimistic update (đổi UI ngay, rollback nếu
 * request thất bại) — thay cho rating tĩnh 1-5 sao cũ.
 */
export function useTemplateStars() {
  const { user } = useAppContext();
  const userId = user?._id ?? null;

  useEffect(() => {
    ensureCountsLoaded();
    ensureStarredLoaded(userId);
  }, [userId]);

  useSyncExternalStore(subscribe, getVersion, getVersion);

  function getStarCount(templateId: string): number {
    return counts[templateId] ?? 0;
  }

  function isStarred(templateId: string): boolean {
    return starredUserId === userId && userId !== null && starredIds.has(templateId);
  }

  async function toggleStar(templateId: string): Promise<void> {
    if (!userId) return; // caller phải tự chặn + mở modal đăng nhập trước khi gọi

    const wasStarred = starredIds.has(templateId);
    if (wasStarred) { starredIds.delete(templateId); counts[templateId] = Math.max(0, (counts[templateId] ?? 1) - 1); }
    else { starredIds.add(templateId); counts[templateId] = (counts[templateId] ?? 0) + 1; }
    bump();

    try {
      const result = await toggleTemplateStar(templateId);
      if (result.starred) starredIds.add(templateId); else starredIds.delete(templateId);
      counts[templateId] = result.count;
      bump();
    } catch (err) {
      // Rollback optimistic update — request thất bại (mạng lỗi, hết phiên...)
      if (wasStarred) { starredIds.add(templateId); counts[templateId] = (counts[templateId] ?? 0) + 1; }
      else { starredIds.delete(templateId); counts[templateId] = Math.max(0, (counts[templateId] ?? 1) - 1); }
      bump();
      throw err;
    }
  }

  return { getStarCount, isStarred, toggleStar };
}
