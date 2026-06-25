const KEY = 'wcv_user_id';

/** Returns a persistent user ID stored in localStorage, creating one on first call. */
export function getUserId(): string {
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = `user_${crypto.randomUUID().replace(/-/g, '').slice(0, 16)}`;
    localStorage.setItem(KEY, id);
  }
  return id;
}
