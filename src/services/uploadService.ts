import { apiFetch } from './apiClient';

/** Upload 1 ảnh (blob đã crop) lên backend → Cloudinary, trả về URL thật */
export async function uploadImage(blob: Blob, filename = 'image.jpg'): Promise<string> {
  const formData = new FormData();
  formData.append('file', blob, filename);

  // axios tự nhận diện FormData và set đúng Content-Type multipart + boundary
  const result = await apiFetch<{ url: string }>(
    '/uploads/image',
    { method: 'POST', data: formData },
    'Upload ảnh thất bại.',
  );
  return result.url;
}
