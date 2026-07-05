---
name: Ocean Oasis Wellness
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#404850'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#707881'
  outline-variant: '#bfc7d1'
  surface-tint: '#006399'
  primary: '#005d90'
  on-primary: '#ffffff'
  primary-container: '#0077b6'
  on-primary-container: '#f3f7ff'
  inverse-primary: '#94ccff'
  secondary: '#40646b'
  on-secondary: '#ffffff'
  secondary-container: '#c3e9f1'
  on-secondary-container: '#466a71'
  tertiary: '#864a00'
  on-tertiary: '#ffffff'
  tertiary-container: '#a95f00'
  on-tertiary-container: '#fff6f1'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cde5ff'
  primary-fixed-dim: '#94ccff'
  on-primary-fixed: '#001d32'
  on-primary-fixed-variant: '#004b74'
  secondary-fixed: '#c3e9f1'
  secondary-fixed-dim: '#a8cdd5'
  on-secondary-fixed: '#001f24'
  on-secondary-fixed-variant: '#284c53'
  tertiary-fixed: '#ffdcc0'
  tertiary-fixed-dim: '#ffb877'
  on-tertiary-fixed: '#2e1600'
  on-tertiary-fixed-variant: '#6c3a00'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-sm:
    fontFamily: Lexend
    fontSize: 13px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is anchored in a high-end, minimalist aesthetic that evokes the serenity and restorative power of the sea. It is designed for wellness and health platforms that prioritize clarity, breathing room, and a professional yet deeply approachable atmosphere.

The style is a blend of **Minimalism** and **Glassmorphism**, utilizing vast white space to represent the openness of the horizon, paired with translucent, frosted layers that mimic the clarity of water. The emotional response is one of immediate decompression—shifting the user from a state of digital noise to one of quiet, aquatic focus. Visuals are kept clean and purposeful, avoiding unnecessary ornamentation to ensure the content remains the primary focus.

## Colors

The palette is a monochromatic exploration of oceanic depths and surface reflections. 

- **Primary Blue (#0077b6):** Used for primary actions, critical brand moments, and high-level navigation. It represents the "Deep Sea"—stable, professional, and trustworthy.
- **Sky Blue (#caf0f8):** The "Shallow Water" tint. This is used for large background areas, soft highlights, and subtle component containers to keep the UI feeling airy and refreshing.
- **Pearl White (#f8f9fa):** The "Sea Foam" neutral. This serves as the primary canvas color, providing a crisp, clean base that allows the blues to feel more vibrant and less heavy.

For semantic states, use soft variations of the primary blue for info, muted teal for success, and a gentle coral-sand tint for warnings to maintain the organic, aquatic harmony.

## Typography

This design system utilizes **Lexend** across all levels. Lexend’s unique variable character spacing and clean, geometric construction enhance readability and mirror the "open" feel of the brand.

Headlines should be set with tighter letter-spacing and a bolder weight to provide a strong anchor to the page. Body text should maintain generous line heights (1.5x - 1.6x) to ensure the interface feels breathable and never cramped. All labels and overlines should be set in uppercase with slight tracking to provide a rhythmic contrast to the fluid body text.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model with an emphasis on "Safe Harbors"—large internal margins that prevent content from feeling crowded. 

- **Desktop:** A 12-column grid with wide 64px outer margins. Use the 8px base unit for all internal component spacing to maintain a mathematical rhythm.
- **Mobile:** A 4-column grid with 20px margins. 
- **Rhythm:** Vertical rhythm is driven by the 8px unit. Components should favor larger paddings (e.g., 24px or 32px) to reinforce the minimalist, premium wellness feel. Elements should often be centered or staggered to mimic the organic flow of water rather than a rigid, industrial block structure.

## Elevation & Depth

Depth in this design system is achieved through **Glassmorphism** and **Tonal Layers** rather than heavy shadows.

- **Surface 0:** Pearl White base canvas.
- **Surface 1 (Floating):** Sky Blue at 20% opacity with a 16px backdrop blur. This is used for cards and navigation bars, creating a "submerged" visual effect.
- **Surface 2 (Active):** Solid Pearl White or Sky Blue containers with a very soft, diffused primary-tinted shadow (Color: #0077b6, Opacity: 4%, Blur: 20px, Offset-Y: 4px).

Avoid harsh black shadows; depth should always feel like light passing through water.

## Shapes

The shape language is defined by **Complete Circularity (Pill-shaped)**. In keeping with the "Ocean" theme, there are no sharp corners. Every interaction point—from buttons to input fields—uses a full radius (`rounded-full`) to emulate the smooth, weathered texture of sea glass and river stones. 

Large containers like cards should use the `rounded-xl` token (3rem) to maintain a soft, organic silhouette that feels safe and welcoming.

## Components

- **Buttons:** Primary buttons are pill-shaped, using the Deep Sea Blue (#0077b6) with white text. Secondary buttons should use a Sky Blue ghost style with a subtle 1px border.
- **Chips:** Small, pill-shaped tags used for wellness categories. They should feature Sky Blue backgrounds with Primary Blue text to maintain high legibility without the weight of a full button.
- **Cards:** Use the Glassmorphism style—semi-transparent Sky Blue backgrounds with a 16px backdrop blur and a thin, 1px Pearl White border to define the edge.
- **Input Fields:** Pill-shaped with a soft Sky Blue stroke. On focus, the stroke should thicken slightly and transition to the Primary Blue, accompanied by a very faint blue outer glow.
- **Progress Indicators:** Use fluid, wave-like animations for loading states or progress bars, moving away from rigid linear increments to something more rhythmic and natural.
- **Checkboxes/Radios:** Circular by default. When selected, they should fill with the Primary Blue and feature a small white inner "pearl" or checkmark.