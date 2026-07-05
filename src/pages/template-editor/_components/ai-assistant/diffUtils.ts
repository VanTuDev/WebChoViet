export interface DiffLeaf {
  label: string;
  oldValue?: string;
  newValue: string;
}

/**
 * So sánh `updates` (deep-partial trả về từ AI) với nội dung hiện tại → danh sách
 * thay đổi dạng phẳng để xem trước trước khi áp dụng.
 *
 * AI trả về nguyên cả object/mảng dù chỉ đổi 1 field bên trong (theo đúng hướng dẫn
 * trong prompt — xem aiAssistantService.ts) — nên chỉ liệt kê field THẬT SỰ đổi
 * (oldValue !== newValue) để preview là 1 diff thật, không phải danh sách toàn bộ
 * nội dung không đổi.
 */
export function flattenChanges(
  updates: Record<string, unknown>,
  current: Record<string, unknown>,
  pathLabel = '',
): DiffLeaf[] {
  const out: DiffLeaf[] = [];
  for (const [key, val] of Object.entries(updates)) {
    const label = pathLabel ? `${pathLabel} › ${key}` : key;
    const currentVal = current?.[key];

    if (typeof val === 'string') {
      const oldValue = typeof currentVal === 'string' ? currentVal : undefined;
      if (oldValue !== val) out.push({ label, oldValue, newValue: val });
    } else if (Array.isArray(val)) {
      val.forEach((item, i) => {
        const currItem = Array.isArray(currentVal) ? currentVal[i] : undefined;
        if (typeof item === 'string') {
          const oldValue = typeof currItem === 'string' ? currItem : undefined;
          if (oldValue !== item) out.push({ label: `${label} #${i + 1}`, oldValue, newValue: item });
        } else if (item && typeof item === 'object') {
          out.push(
            ...flattenChanges(
              item as Record<string, unknown>,
              (currItem as Record<string, unknown>) ?? {},
              `${label} #${i + 1}`,
            ),
          );
        }
      });
    } else if (val && typeof val === 'object') {
      out.push(...flattenChanges(val as Record<string, unknown>, (currentVal as Record<string, unknown>) ?? {}, label));
    }
  }
  return out;
}
