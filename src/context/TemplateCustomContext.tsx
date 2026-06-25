import { createContext, useContext, type ReactNode } from 'react';

export interface TemplateCustomState {
  /** Deep partial override of the template's i18n data */
  customData: Record<string, unknown>;
  /** Map of imageKey → dataURL/URL override */
  images: Record<string, string>;
}

const EMPTY: TemplateCustomState = { customData: {}, images: {} };

const Ctx = createContext<TemplateCustomState>(EMPTY);

export function TemplateCustomProvider({
  value,
  children,
}: {
  value: TemplateCustomState;
  children: ReactNode;
}) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

/** Use inside template components to get customized data + images.
 *  Falls back to empty (templates render normally outside the editor). */
export const useTemplateCustom = () => useContext(Ctx);
