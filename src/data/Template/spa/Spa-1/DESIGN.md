---
name: Serene Breath
colors:
  surface: '#fbf9f9'
  surface-dim: '#dbdad9'
  surface-bright: '#fbf9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#e9e8e7'
  surface-container-highest: '#e3e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#41474e'
  inverse-surface: '#303031'
  inverse-on-surface: '#f2f0f0'
  outline: '#72787f'
  outline-variant: '#c1c7cf'
  surface-tint: '#30628a'
  primary: '#30628a'
  on-primary: '#ffffff'
  primary-container: '#a2d2ff'
  on-primary-container: '#275b82'
  inverse-primary: '#9bcbf8'
  secondary: '#50616b'
  on-secondary: '#ffffff'
  secondary-container: '#d3e5f1'
  on-secondary-container: '#566771'
  tertiary: '#40627b'
  on-tertiary: '#ffffff'
  tertiary-container: '#aed1ef'
  on-tertiary-container: '#385a73'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cde5ff'
  primary-fixed-dim: '#9bcbf8'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#104a70'
  secondary-fixed: '#d3e5f1'
  secondary-fixed-dim: '#b7c9d5'
  on-secondary-fixed: '#0c1e26'
  on-secondary-fixed-variant: '#384953'
  tertiary-fixed: '#cae6ff'
  tertiary-fixed-dim: '#a8cbe8'
  on-tertiary-fixed: '#001e2f'
  on-tertiary-fixed-variant: '#274a63'
  background: '#fbf9f9'
  on-background: '#1b1c1c'
  surface-variant: '#e3e2e2'
typography:
  headline-xl:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Lexend
    fontSize: 28px
    fontWeight: '500'
    lineHeight: 36px
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
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
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
---

## Brand & Style

The design system is built for a **Therapeutic Spa** environment, focusing on the intersection of professional licensed therapy and deep, restorative relaxation. The target audience seeks relief from skin concerns like acne or physical tension, but wants to avoid the cold, sterile atmosphere of a medical clinic.

The visual style is **Soft Minimalism**. It prioritizes heavy whitespace, a "breathable" interface, and high-quality imagery of natural textures. The emotional response should be one of immediate calm, safety, and professional expertise. By utilizing a clinical layout with organic, fully rounded shapes, the design system bridges the gap between effective treatment and holistic wellness.

## Colors

The palette is anchored by a calming **Pastel Light Blue**, designed to lower cortisol and evoke a sense of purity. 

- **Primary (#A2D2FF):** Used for call-to-actions and key brand moments. It is soft enough to be relaxing but saturated enough to pass accessibility standards against white.
- **Secondary (#E0F2FE):** A very light, airy blue used for large surface areas, background sections, and subtle highlights.
- **Neutral:** A range of soft grays (anchored at #737373) used for secondary text, ensuring the interface never feels "harsh" like pure black would.
- **Pure White (#FFFFFF):** The foundational surface color. It provides a clinical, hygienic feel that reinforces the expertise of licensed therapists.

## Typography

This design system utilizes **Lexend** exclusively. Originally designed to improve reading proficiency, its hyper-legible and open character shapes complement the therapeutic narrative perfectly.

- **Headlines:** Set with slightly tighter letter-spacing and medium weights to feel grounded and professional.
- **Body Text:** Generous line-heights are employed to ensure the content feels unhurried and easy to digest.
- **Hierarchy:** We use size and weight contrast rather than color contrast to maintain the soft aesthetic. Important labels use a semi-bold weight but stay within the neutral palette.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** with intentional "breathable" margins. 

- **Desktop:** A 12-column grid with wide 64px outer margins. Content is often centered with significant horizontal whitespace to mimic the airy feel of a spa lobby.
- **Mobile:** A 4-column grid with 20px margins. 
- **Spacing Rhythm:** We lean into larger vertical gaps (`lg` and `xl`) between sections to prevent the UI from feeling cluttered. Elements related to skin care routines or therapist bios should use `md` padding to feel like distinct, organized "modules" of information.

## Elevation & Depth

To maintain the "Soft Minimalism" style, elevation is achieved through **Tonal Layering** and **Ambient Shadows** rather than harsh lines.

- **Surface Tiers:** Backgrounds are pure white, while interactive containers (like cards) use the secondary pastel blue (#E0F2FE) or a very subtle off-white.
- **Shadows:** Shadows are extremely diffused, using the primary color as a tint (e.g., `box-shadow: 0 10px 30px rgba(162, 210, 255, 0.2)`). This creates a "floating" effect that feels light and ethereal.
- **Glassmorphism:** Reserved for navigation bars and overlays. Use a high-density background blur (20px+) with a 70% opaque white fill to maintain the clean, clinical look while adding depth.

## Shapes

The shape language is **Fully Rounded (Pill-shaped)**. This eliminates all "sharp edges" from the user experience, psychologically reinforcing the concepts of comfort, safety, and gentleness.

- **Containers:** All cards and modals must use at least `rounded-xl` (1.5rem / 24px) to feel organic.
- **Buttons & Inputs:** Must be fully pill-shaped.
- **Imagery:** Photos of treatment rooms or therapists should have generous corner radii to match the UI elements.

## Components

- **Buttons:** Primary buttons are pill-shaped, filled with the pastel primary blue, using white text. Hover states involve a slight scale increase (1.02x) rather than a dramatic color shift.
- **Inputs:** Fields are pill-shaped with a soft 1px border in a light blue tint. On focus, the border thickens slightly and a soft blue outer glow appears.
- **Cards:** Used for service listings (e.g., "Acne Clarifying Facial"). Cards should have no border, a subtle primary-tinted shadow, and plenty of internal padding (`md`).
- **Chips:** Used for therapist specialties (e.g., "Extractions," "Lymphatic Drainage"). These are small, pill-shaped elements with a secondary blue background and primary blue text.
- **Selection Controls:** Checkboxes and Radio buttons are replaced with large, soft "Choice Chips" wherever possible to maintain the high-end spa feel.
- **Treatment Progress:** A custom component featuring a soft, horizontal "stepper" using rounded dots to track skin progress or booking steps.