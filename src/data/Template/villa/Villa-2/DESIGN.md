---
name: Zenith Minimalist Wellness
colors:
  surface: '#faf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#faf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f4f3f1'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1a1c1a'
  on-surface-variant: '#46483c'
  inverse-surface: '#2f312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#76786b'
  outline-variant: '#c6c8b8'
  surface-tint: '#56642b'
  primary: '#56642b'
  on-primary: '#ffffff'
  primary-container: '#8a9a5b'
  on-primary-container: '#253000'
  inverse-primary: '#bdce89'
  secondary: '#5b6053'
  on-secondary: '#ffffff'
  secondary-container: '#e0e5d4'
  on-secondary-container: '#616659'
  tertiary: '#59623c'
  on-tertiary: '#ffffff'
  tertiary-container: '#8e986d'
  on-tertiary-container: '#272f0e'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d9eaa3'
  primary-fixed-dim: '#bdce89'
  on-primary-fixed: '#161f00'
  on-primary-fixed-variant: '#3e4c16'
  secondary-fixed: '#e0e5d4'
  secondary-fixed-dim: '#c3c9b8'
  on-secondary-fixed: '#181d13'
  on-secondary-fixed-variant: '#43493c'
  tertiary-fixed: '#dde8b7'
  tertiary-fixed-dim: '#c1cc9c'
  on-tertiary-fixed: '#171e01'
  on-tertiary-fixed-variant: '#414a26'
  background: '#faf9f6'
  on-background: '#1a1c1a'
  surface-variant: '#e3e2e0'
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '300'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Lexend
    fontSize: 36px
    fontWeight: '300'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '400'
    lineHeight: 40px
  headline-sm:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '400'
    lineHeight: 32px
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '300'
    lineHeight: 28px
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '300'
    lineHeight: 24px
  label-md:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-padding: 32px
  gutter: 24px
  section-gap: 80px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system is built on the principles of **Japanese Minimalism** and **Biophilic Design**. The core objective is to reduce cognitive load and evoke a sense of immediate tranquility. The target audience seeks a sanctuary from digital noise—individuals focused on mindfulness, health, and intentional living.

The visual style is characterized by:
- **Spaciousness:** Generous negative space to allow content to "breathe."
- **Softness:** Every interaction and edge is rounded, mimicking the smoothness of river stones.
- **Organic Balance:** A focus on asymmetrical yet balanced layouts that feel natural rather than rigid.
- **Intentionality:** Every element serves a purpose; decorative flourishes are replaced by subtle shifts in tone and texture.

## Colors

The palette is derived from a misty forest floor, using muted, earthy tones to ground the user experience.

- **Primary (Moss Green):** Used for primary actions, active states, and brand highlights. It represents growth and vitality.
- **Secondary (Pale Sage):** A soft tint used for subtle backgrounds, secondary buttons, or decorative containers.
- **Surface (Off-White/Parchment):** The foundational color for the UI, providing a warmer, more eye-friendly alternative to pure white.
- **Neutral (Stone Gray):** Used for borders, dividers, and secondary text to maintain a low-contrast, gentle hierarchy.

## Typography

The design system utilizes **Lexend** exclusively. Originally designed to reduce visual stress and improve reading proficiency, its clean, hyper-legible forms align perfectly with a wellness-focused narrative.

- **Weight Strategy:** Use 'Light' (300) for body text and large displays to maintain an airy feel. 'Medium' (500) is reserved for labels and navigation to ensure clarity without being heavy.
- **Scale:** Large, light-weight headlines create a sense of quiet authority.
- **Spacing:** Increased line heights (1.5x - 1.6x) are mandated to ensure text blocks never feel dense or overwhelming.

## Layout & Spacing

This design system employs a **Fluid-Floating Grid**. Elements do not feel tethered to the screen edges; instead, they float within generous margins.

- **Grid Model:** A 12-column system for desktop, 8-column for tablet, and 4-column for mobile.
- **Rhythm:** An 8px base unit is used, but the system prioritizes "macro-spacing" (64px+) between sections to define clear mental boundaries between different types of information.
- **Margins:** Large outer margins (up to 120px on desktop) are encouraged to focus the user's attention on the center of the screen, mimicking the focus of a meditation practice.

## Elevation & Depth

To maintain a serene and flat aesthetic, traditional heavy shadows are avoided. Instead, hierarchy is created through:

- **Tonal Layering:** Distinct areas are separated by subtle shifts in background color (e.g., moving from the `#faf9f6` surface to a `#f2f1ed` container).
- **Soft Diffusion:** If a shadow is required for interaction (like a floating action button), use a "Zen Shadow"—an extremely long, soft, and low-opacity (4-6%) shadow tinted with the Moss Green primary color.
- **Negative Space as Depth:** Proximity is the primary indicator of relationship. Elements that belong together are grouped closely, while distinct concepts are separated by vast "voids" of white space.

## Shapes

The shape language is strictly **Organic and Full**. This system avoids sharp angles entirely to eliminate "visual friction."

- **Pill-Shaped (Full Radius):** All buttons, tags, and small interactive elements must be fully rounded (pill-shaped).
- **Smooth Containers:** Larger cards and modals use a minimum of `2rem` (32px) corner radius, creating a "smooth stone" appearance.
- **Icons:** Use rounded-end caps and soft corners for all iconography to match the Lexend typeface.

## Components

### Buttons & Interaction
- **Primary Buttons:** Pill-shaped, Moss Green background with off-white text. No border.
- **Ghost Buttons:** Pill-shaped, transparent background with a 1px Stone Gray border.
- **Hover States:** Instead of getting darker, buttons should subtly shift in opacity (from 100% to 90%) or use a slight vertical lift (2px) with a soft blur.

### Form Elements
- **Input Fields:** Use a subtle background fill rather than a box. A single bottom border or a very soft, fully rounded container is preferred. Focus states are indicated by a soft Moss Green glow.
- **Selection:** Checkboxes and Radio buttons are replaced by large, pill-shaped toggle-chips that feel more tactile and less like a "form."

### Content Containers
- **Cards:** No borders. Use subtle tonal shifts or extremely soft shadows to separate from the background. Padding within cards should be generous (minimum 32px).
- **Progress Indicators:** Use soft, thick lines with rounded caps to represent progress in wellness tracks or meditation sessions.

### Specialized Components
- **Breathing Indicator:** A pulsating, semi-transparent circle used during loading states or transition moments to encourage user mindfulness.
- **Empty States:** Use minimalist line art and high-centered text to maintain the "Zen" aesthetic even when content is missing.