// Template stars service — gọi các endpoint /templates/stars* của backend, kiểu GitHub
// star (đếm số lượt bấm sao), thay cho rating tĩnh 1-5 sao cũ. Song song với
// templateBillingService.ts. Xem BackEnd-WebChoViet/src/templates.
import { apiFetch } from './apiClient';

interface TemplateStarToggleResult {
  starred: boolean;
  count: number;
}

/** Tổng số sao của MỌI template — public, key là templateId. Template chưa có trong
 * response nghĩa là chưa ai sao (0 sao). */
export function fetchTemplateStarCounts(): Promise<Record<string, number>> {
  return apiFetch<Record<string, number>>('/templates/stars');
}

/** Danh sách templateId mà user hiện tại đã sao — cần đăng nhập. */
export function fetchMyStarredTemplateIds(): Promise<string[]> {
  return apiFetch<string[]>('/templates/stars/mine');
}

/** Bật/tắt sao cho 1 template — cần đăng nhập. Trả về trạng thái mới + tổng số sao mới nhất. */
export function toggleTemplateStar(templateId: string): Promise<TemplateStarToggleResult> {
  return apiFetch<TemplateStarToggleResult>(`/templates/${templateId}/star/toggle`, { method: 'POST' });
}
