---
name: Refreshing Professionalism
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#424752'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#727784'
  outline-variant: '#c2c6d4'
  surface-tint: '#115cb9'
  primary: '#003f87'
  on-primary: '#ffffff'
  primary-container: '#0056b3'
  on-primary-container: '#bbd0ff'
  inverse-primary: '#acc7ff'
  secondary: '#006398'
  on-secondary: '#ffffff'
  secondary-container: '#00a9fd'
  on-secondary-container: '#003a5c'
  tertiary: '#36444c'
  on-tertiary: '#ffffff'
  tertiary-container: '#4d5b64'
  on-tertiary-container: '#c3d2dd'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#acc7ff'
  on-primary-fixed: '#001a40'
  on-primary-fixed-variant: '#004491'
  secondary-fixed: '#cce5ff'
  secondary-fixed-dim: '#93ccff'
  on-secondary-fixed: '#001d31'
  on-secondary-fixed-variant: '#004b73'
  tertiary-fixed: '#d6e5ef'
  tertiary-fixed-dim: '#bac9d3'
  on-tertiary-fixed: '#0f1d25'
  on-tertiary-fixed-variant: '#3b4951'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.4'
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 40px
  xl: 80px
  container-max: 1280px
  gutter: 24px
---

## Brand & Style

The design system is engineered for the modern Vietnamese entrepreneur, balancing the authority of a professional tool with the refreshing, "mát mắt" aesthetic of a lifestyle brand. The brand personality is encouraging, clear, and sophisticated, aiming to lower the barrier for non-technical business owners while providing a high-end output.

The visual style is **Corporate Modern** infused with **Glassmorphism**. It prioritizes extreme clarity and high-quality whitespace to evoke a sense of calm and order. By utilizing translucent layers and soft gradients, the interface feels airy and lightweight, preventing the "information overload" often associated with website builders.

## Colors

The palette is anchored by **Deep Ocean Blue**, providing a foundation of trust and stability. **Light Azure** acts as the primary action color, injecting energy and a modern digital feel. To achieve the refreshing "mát mắt" atmosphere, **Soft Sky Blue** is used extensively for large background surfaces and subtle containers, reducing eye strain.

- **Primary (#0056b3):** Used for navigation headers, primary branding, and high-importance emphasis.
- **Secondary (#00aaff):** Reserved for primary calls-to-action and interactive states.
- **Tertiary (#e3f2fd):** The "coolant" of the UI, used for section backgrounds and soft highlights.
- **Neutral:** A range of cool grays starting from Crisp White (#ffffff) to Slate (#1e293b) to maintain a crisp, clean environment.

## Typography

This design system uses a dual-font strategy to balance character with utility. 

**Lexend** is the primary choice for headlines. Its wider proportions and hyper-legible design feel optimistic and friendly, perfect for business owners in the hospitality and wellness sectors. 

**Inter** is utilized for body copy and UI labels. Its systematic, neutral nature ensures that complex instructions or data-heavy dashboards remain legible and professional. 

For the Vietnamese language, special care is taken with line heights (1.6 for body) to ensure diacritics do not clash and the reading experience remains "airy."

## Layout & Spacing

The layout follows a **Fluid Grid** model built on an 8px base unit. To maintain the refreshing vibe, the design system mandates "active white space"—intentional gaps that guide the user's eye and prevent fatigue.

- **Desktop:** 12-column grid with 24px gutters and 40px side margins.
- **Tablet:** 8-column grid with 16px gutters and 24px side margins.
- **Mobile:** 4-column grid with 16px gutters and 16px side margins.

Horizontal spacing between sections should be generous (using the `xl` unit) to clearly delineate different website building modules.

## Elevation & Depth

Depth is conveyed through **Tonal Layers** and **Ambient Shadows** rather than harsh borders. This system avoids pure black shadows, opting instead for shadows tinted with the Primary color (e.g., `rgba(0, 86, 179, 0.08)`).

1.  **Level 0 (Floor):** The Soft Sky Blue or Crisp White base.
2.  **Level 1 (Raised):** Used for cards and secondary buttons. A soft, 4px blur with 2px offset.
3.  **Level 2 (Floating):** Used for navigation bars and active panels. A 12px blur with 4px offset.
4.  **Level 3 (Overlay):** Used for modals and dropdown menus. A 24px blur with 8px offset, accompanied by a backdrop blur (glassmorphism) of 10px.

Surfaces should feel like they are floating in a bright, sunlit space.

## Shapes

The shape language is defined by **Pill-shaped (Level 3)** roundedness. This "bubbly" and approachable geometry removes the perceived "coldness" of a technical tool.

- **Primary Buttons:** Fully pill-shaped (height/2).
- **Cards & Containers:** 1rem (16px) radius for standard, 2rem (32px) for large sections.
- **Inputs:** 0.75rem (12px) to provide enough internal space for the Vietnamese diacritics while maintaining the soft aesthetic.

Large-radius shapes are essential for the "friendly" feel required by small business owners who may be intimidated by complex software.

## Components

### Buttons
Buttons use high-contrast combinations. The primary button is a solid **Light Azure** with white text, using a subtle gradient to add a tactile, "clickable" feel. Hover states should brighten the color and slightly increase the shadow elevation.

### Cards
Cards are the primary organizational unit. They should have a thin 1px border in **Soft Sky Blue** and a very light ambient shadow. The background is always white to pop against the blue-tinted page background.

### Input Fields
Inputs use a "Soft-Focus" style. The default state is a light grey border; upon focus, the border transitions to **Secondary Blue** and gains a soft outer glow (the Light Azure color at 20% opacity).

### Chips & Tags
Used for categorizing templates (e.g., "Cafe," "Gym"). These are pill-shaped with **Soft Sky Blue** backgrounds and **Primary Blue** text, ensuring they look like clickable, interactive elements without the weight of a full button.

### Progress Indicators
For the web builder onboarding, use rounded progress bars in Light Azure. The movement should be smooth and fluid to reinforce the "easy to use" brand promise.