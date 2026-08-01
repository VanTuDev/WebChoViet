// ─── Định nghĩa các bước hướng dẫn (product tour) — dữ liệu thuần, không JSX ───
// Mỗi bước trỏ tới 1 phần tử thật trên trang qua CSS selector [data-tour="..."]
// (gắn trực tiếp trong component tương ứng), để người dùng thao tác lên chính
// phần tử thật — không phải ảnh chụp/giả lập. Nội dung hiển thị (title/body)
// lấy qua i18n namespace "onboarding", key = `steps.${id}.title|body`.
import {
  Compass, Sparkles, Filter, MousePointerClick, SlidersHorizontal, Wand2, Bot, Rocket,
  type LucideIcon,
} from 'lucide-react';
import { ROUTES } from '../config/routes';

/** Cách bước hiện tại chuyển sang bước tiếp theo */
export type TourAdvanceMode =
  | 'next'   // người dùng bấm nút "Tiếp theo" trong tooltip (bước thông tin, không điều hướng)
  | 'route'  // tự động sang bước kế khi URL đổi khớp route của bước kế (người dùng bấm nút/link thật)
  | 'finish'; // bước cuối — bấm nút sẽ kết thúc toàn bộ hướng dẫn

export type TourPlacement = 'top' | 'bottom' | 'left' | 'right';

export interface TourStep {
  id: string;
  icon: LucideIcon;
  /** Route nơi phần tử này tồn tại — dùng để biết khi nào cần "chờ" người dùng điều hướng tới */
  route: string;
  /** So khớp route mềm hơn (vd mọi path con của /template-editor/) — ưu tiên hơn so khớp tuyệt đối */
  routeTest?: (pathname: string) => boolean;
  /** CSS selector trỏ tới phần tử thật cần làm nổi bật */
  target: string;
  placement: TourPlacement;
  advance: TourAdvanceMode;
  /** Ép hiển thị phần tử vốn chỉ hiện khi hover (vd nút trong overlay hover của thẻ mẫu) */
  forceVisible?: boolean;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: 'dashboard-sidebar',
    icon: Compass,
    route: ROUTES.DASHBOARD_PROJECTS,
    target: '[data-tour="dashboard-sidebar"]',
    placement: 'right',
    advance: 'next',
  },
  {
    id: 'dashboard-create-cta',
    icon: Sparkles,
    route: ROUTES.DASHBOARD_PROJECTS,
    target: '[data-tour="create-website-btn"]',
    placement: 'bottom',
    advance: 'route',
  },
  {
    id: 'marketplace-categories',
    icon: Filter,
    route: ROUTES.MARKETPLACE,
    target: '[data-tour="marketplace-categories"]',
    placement: 'right',
    advance: 'next',
  },
  {
    id: 'marketplace-pick-template',
    icon: MousePointerClick,
    route: ROUTES.MARKETPLACE,
    target: '[data-tour="template-card-cta"]',
    placement: 'top',
    advance: 'route',
    forceVisible: true,
  },
  {
    id: 'editor-panel',
    icon: SlidersHorizontal,
    route: ROUTES.TEMPLATE_EDITOR_NEW,
    routeTest: p => p.startsWith('/template-editor/'),
    target: '[data-tour="editor-panel"]',
    placement: 'right',
    advance: 'next',
  },
  {
    id: 'editor-ai-tools',
    icon: Wand2,
    route: ROUTES.TEMPLATE_EDITOR_NEW,
    routeTest: p => p.startsWith('/template-editor/'),
    target: '[data-tour="editor-ai-tools"]',
    placement: 'bottom',
    advance: 'next',
  },
  {
    id: 'ai-assistant-widget',
    icon: Bot,
    route: ROUTES.TEMPLATE_EDITOR_NEW,
    routeTest: p => p.startsWith('/template-editor/'),
    target: '[data-tour="ai-assistant-widget"]',
    placement: 'left',
    advance: 'next',
  },
  {
    id: 'editor-publish',
    icon: Rocket,
    route: ROUTES.TEMPLATE_EDITOR_NEW,
    routeTest: p => p.startsWith('/template-editor/'),
    target: '[data-tour="publish-btn"]',
    placement: 'bottom',
    advance: 'finish',
  },
];

/** Path hiện tại có khớp route của 1 bước không — ưu tiên routeTest nếu có */
export function stepMatchesPath(step: TourStep, pathname: string): boolean {
  return step.routeTest ? step.routeTest(pathname) : pathname === step.route;
}
