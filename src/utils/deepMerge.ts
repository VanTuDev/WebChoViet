/** Deep-merge `override` into `base` — returns a new object, does not mutate.
 *
 *  Handles the case where base has an array but override supplies an
 *  indexed-string-key object (e.g. { "0": {...}, "1": {...} }) by
 *  merging each element rather than replacing the whole array.
 */
export function deepMerge<T extends Record<string, unknown>>(
  base: T,
  override: Record<string, unknown>,
): T {
  const result = { ...base } as Record<string, unknown>;

  for (const key of Object.keys(override)) {
    const overrideVal = override[key];
    const baseVal = result[key];

    if (Array.isArray(baseVal)) {
      if (Array.isArray(overrideVal)) {
        // Both arrays → deep-merge each element (override may be longer or shorter)
        const maxLen = Math.max(baseVal.length, overrideVal.length);
        result[key] = Array.from({ length: maxLen }, (_, i) => {
          const b = baseVal[i];
          const o = overrideVal[i];
          if (o === undefined) return b;
          if (b === undefined) return o;
          if (
            o !== null && typeof o === 'object' && !Array.isArray(o) &&
            b !== null && typeof b === 'object' && !Array.isArray(b)
          ) {
            return deepMerge(b as Record<string, unknown>, o as Record<string, unknown>);
          }
          return o;
        });
      } else if (overrideVal !== null && typeof overrideVal === 'object') {
        // Override is an indexed-key object → merge into array elements
        const indexed = overrideVal as Record<string, unknown>;
        result[key] = baseVal.map((baseItem, i) => {
          const patch = indexed[String(i)];
          if (patch === undefined) return baseItem;
          if (
            patch !== null && typeof patch === 'object' && !Array.isArray(patch) &&
            baseItem !== null && typeof baseItem === 'object' && !Array.isArray(baseItem)
          ) {
            return deepMerge(baseItem as Record<string, unknown>, patch as Record<string, unknown>);
          }
          return patch;
        });
      } else if (overrideVal !== undefined && overrideVal !== '') {
        result[key] = overrideVal;
      }
    } else if (
      overrideVal !== null &&
      typeof overrideVal === 'object' &&
      !Array.isArray(overrideVal) &&
      baseVal !== null &&
      typeof baseVal === 'object' &&
      !Array.isArray(baseVal)
    ) {
      result[key] = deepMerge(
        baseVal as Record<string, unknown>,
        overrideVal as Record<string, unknown>,
      );
    } else if (overrideVal !== undefined && overrideVal !== '') {
      result[key] = overrideVal;
    }
  }

  return result as T;
}
