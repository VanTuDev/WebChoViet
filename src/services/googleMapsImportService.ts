import { apiFetch } from './apiClient';
import type { ImageSlot } from '../data/templates/registry';

interface NormalizedPlace {
  name: string;
  address: string | null;
  phone: string | null;
  website: string | null;
  category: string | null;
  rating: number | null;
  reviewsCount: number;
  location: { lat: number; lng: number } | null;
  openingHours: { day: string; hours: string }[];
  images: string[];
  reviews: {
    author: string;
    rating: number | null;
    text: string;
    publishedAt: string | null;
    /** Ảnh khách đính kèm review — backend dùng làm nguồn ảnh món cho slot menu */
    imageUrls: string[];
  }[];
  googleMapsUrl: string | null;
}

export interface AutofillResult {
  place: NormalizedPlace;
  /** Deep-partial khớp với templateSchema đã gửi lên — merge vào site.customData.vi */
  customData: Record<string, unknown>;
  /** imageSlotKey → URL ảnh cào được — merge vào site.images */
  images: Record<string, string>;
}

/** Backend chờ Apify cào (tối đa ~180s) + gọi Gemini — cho dư thời gian ở FE */
const REQUEST_TIMEOUT_MS = 200_000;

/**
 * Gọi backend POST /template-autofill/from-google-maps — cào 1 địa điểm Google Maps
 * qua Apify rồi dùng Gemini điền vào đúng cấu trúc `templateSchema` của template đang
 * chọn (xem BackEnd-WebChoViet/src/template-autofill).
 *
 * @param signal AbortSignal ngoài (vd: người dùng bấm Huỷ khi đang chờ) — được gộp
 * với timeout nội bộ của hàm này.
 */
export async function autofillTemplateFromGoogleMaps(
  googleMapsUrl: string,
  templateSchema: Record<string, unknown>,
  imageSlots: ImageSlot[],
  signal?: AbortSignal,
): Promise<AutofillResult> {
  const timeoutSignal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  const combinedSignal = signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal;

  return apiFetch<AutofillResult>(
    '/template-autofill/from-google-maps',
    {
      method: 'POST',
      data: {
        googleMapsUrl,
        templateSchema,
        imageSlots: imageSlots.map(s => ({ key: s.key, label: s.label })),
      },
      signal: combinedSignal,
    },
    'Tạo tự động thất bại.',
  );
}
