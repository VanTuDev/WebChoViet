---
name: Sage Sanctuary
colors:
  surface: '#f7faf7'
  surface-dim: '#d8dbd8'
  surface-bright: '#f7faf7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f1'
  surface-container: '#ecefec'
  surface-container-high: '#e6e9e6'
  surface-container-highest: '#e0e3e0'
  on-surface: '#181c1b'
  on-surface-variant: '#424845'
  inverse-surface: '#2d3130'
  inverse-on-surface: '#eef1ee'
  outline: '#727875'
  outline-variant: '#c2c8c4'
  surface-tint: '#4e635a'
  primary: '#4e635a'
  on-primary: '#ffffff'
  primary-container: '#8da399'
  on-primary-container: '#263932'
  inverse-primary: '#b5ccc1'
  secondary: '#52625b'
  on-secondary: '#ffffff'
  secondary-container: '#d5e7de'
  on-secondary-container: '#586861'
  tertiary: '#55615c'
  on-tertiary: '#ffffff'
  tertiary-container: '#94a19b'
  on-tertiary-container: '#2c3834'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e8dd'
  primary-fixed-dim: '#b5ccc1'
  on-primary-fixed: '#0b1f18'
  on-primary-fixed-variant: '#374b43'
  secondary-fixed: '#d5e7de'
  secondary-fixed-dim: '#b9cac2'
  on-secondary-fixed: '#101e19'
  on-secondary-fixed-variant: '#3b4a44'
  tertiary-fixed: '#d8e5df'
  tertiary-fixed-dim: '#bcc9c3'
  on-tertiary-fixed: '#121e1a'
  on-tertiary-fixed-variant: '#3d4945'
  background: '#f7faf7'
  on-background: '#181c1b'
  surface-variant: '#e0e3e0'
typography:
  headline-xl:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '500'
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
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '500'
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
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
This design system is a study in organic minimalism, designed to evoke the tranquility of a botanical garden at dawn. The brand personality is serene, nurturing, and intentional, targeting users seeking mental clarity and a respite from digital noise. 

The visual style merges **Minimalism** with subtle **Tactile** cues. It utilizes expansive white space, a monochromatic sage palette, and soft-focus depth to create a sense of breathability. The emotional response is one of "quiet confidence"—professional enough for productivity but soft enough for wellness. All elements should feel lightweight, as if floating within a structured, airy grid.

## Colors
The palette is rooted in a soft, elegant Sage Green. 

- **Primary (#8DA399):** Used for key actions, active states, and brand-defining moments.
- **Secondary (#5D6D66):** A deeper forest shade for high-contrast text and grounding elements.
- **Tertiary (#C2CFC9):** A muted mist green for decorative accents, disabled states, or subtle dividers.
- **Neutral (#F4F7F4):** The foundational background color, providing a warm, organic alternative to pure white.

Avoid pure black; use the deep charcoal-green variant for all typography to maintain the soft aesthetic.

## Typography
Lexend is utilized across all levels to leverage its hyper-legible, expansive character. 

For headlines, use medium weights with tighter letter-spacing to create a contemporary, editorial feel. Body copy should favor the "Light" (300) weight to maximize the "airy" quality of the design, ensuring line heights are generous to prevent visual crowding. Labels and captions use slightly heavier weights and increased letter-spacing to ensure hierarchy and clarity at small scales.

## Layout & Spacing
The layout follows a **Fluid Grid** model with an emphasis on "macro-spacing." Large margins (64px+) on desktop platforms are encouraged to frame content as if it were a gallery piece.

- **Desktop:** 12-column grid, 24px gutters, dynamic outer margins.
- **Tablet:** 8-column grid, 20px gutters, 32px margins.
- **Mobile:** 4-column grid, 16px gutters, 16px margins.

Spacing should prioritize vertical rhythm. Use `lg` and `xl` spacing tokens between major sections to maintain the minimalist, unhurried pace of the design system.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and **Ambient Shadows** rather than harsh borders. 

Surfaces should feel integrated with the background. Use a "Soft Lift" effect for interactive cards: a very wide (30px-40px blur), low-opacity (5-8%) shadow tinted with the Primary color (#8DA399). This makes elements feel like they are floating gently above the sage-tinted base. For secondary depth, use a subtle 1px stroke in a color slightly darker than the background (`#E6EBE6`) instead of a shadow.

## Shapes
The shape language is "Organic Geometric." A **Rounded** setting (0.5rem base) is applied to keep the UI approachable.

- **Standard Elements:** 8px (0.5rem) radius for buttons and input fields.
- **Containers:** 16px (1rem) radius for cards and modals.
- **Feature Elements:** 24px (1.5rem) radius for hero sections or large imagery to emphasize the "soft" brand character.
- **Icons:** Use a 1.5pt rounded cap stroke weight to match the corner radii of the components.

## Components
- **Buttons:** Primary buttons use a solid Sage (#8DA399) fill with white text. Secondary buttons use a ghost style with a 1.5px Sage border. Transition states should be a gentle darkening of the fill, never a sharp color shift.
- **Chips:** Highly rounded (pill-shaped) with a Tertiary (#C2CFC9) background and Secondary (#5D6D66) text.
- **Input Fields:** Use a subtle background fill (#EDF1EE) rather than a box border. On focus, transition to a 1.5px Primary border with a soft glow.
- **Cards:** No borders. Use the "Soft Lift" ambient shadow. Padding within cards should be generous (`md` spacing).
- **Selection Controls:** Checkboxes and radios should be slightly oversized with rounded inner indicators to reinforce the friendly aesthetic.
- **Progress Bars:** Use a thick, rounded track with a soft green-to-sage gradient to imply growth and movement.