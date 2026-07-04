import { getApiBaseUrl, getToken } from './authService';

/** Upload 1 ảnh (blob đã crop) lên backend → Cloudinary, trả về URL thật */
export async function uploadImage(blob: Blob, filename = 'image.jpg'): Promise<string> {
  const token = getToken();
  const formData = new FormData();
  formData.append('file', blob, filename);

  const res = await fetch(`${getApiBaseUrl()}/uploads/image`, {
    method: 'POST',
    headers: {
      // Không set Content-Type thủ công — browser tự thêm multipart boundary
      'ngrok-skip-browser-warning': 'true',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  const body = await res.json().catch(() => null);
  if (!res.ok || !body?.success) {
    const msg = Array.isArray(body?.message) ? body.message.join(', ') : body?.message;
    throw new Error(msg || `Upload ảnh thất bại (${res.status})`);
  }
  return body.data.url as string;
}
