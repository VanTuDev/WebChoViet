---
name: Earthen Kinetic
colors:
  surface: '#141312'
  surface-dim: '#141312'
  surface-bright: '#3b3937'
  surface-container-lowest: '#0f0e0d'
  surface-container-low: '#1d1b1a'
  surface-container: '#211f1e'
  surface-container-high: '#2b2a28'
  surface-container-highest: '#363433'
  on-surface: '#e6e1df'
  on-surface-variant: '#d4c4b7'
  inverse-surface: '#e6e1df'
  inverse-on-surface: '#32302f'
  outline: '#9c8e83'
  outline-variant: '#50453b'
  surface-tint: '#eebd8e'
  primary: '#eebd8e'
  on-primary: '#472a06'
  primary-container: '#b4885d'
  on-primary-container: '#3f2302'
  inverse-primary: '#7c5730'
  secondary: '#d7c3b0'
  on-secondary: '#3a2e21'
  secondary-container: '#544738'
  on-secondary-container: '#c8b5a3'
  tertiary: '#cfc4be'
  on-tertiary: '#362f2b'
  tertiary-container: '#988f89'
  on-tertiary-container: '#2f2824'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdcbd'
  primary-fixed-dim: '#eebd8e'
  on-primary-fixed: '#2c1600'
  on-primary-fixed-variant: '#61401b'
  secondary-fixed: '#f4dfcb'
  secondary-fixed-dim: '#d7c3b0'
  on-secondary-fixed: '#241a0e'
  on-secondary-fixed-variant: '#524436'
  tertiary-fixed: '#ece0da'
  tertiary-fixed-dim: '#cfc4be'
  on-tertiary-fixed: '#201a17'
  on-tertiary-fixed-variant: '#4d4541'
  background: '#141312'
  on-background: '#e6e1df'
  surface-variant: '#363433'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-caps:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.1em
  metric-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.04em
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
  lg: 40px
  xl: 64px
  container-max: 1200px
  gutter: 20px
---

## Brand & Style

The design system is engineered for a premium, high-performance fitness experience that departs from the cold, clinical aesthetic of traditional trackers. It targets the "conscious athlete"—individuals who value longevity, natural materials, and sophisticated strength. 

The design style is a hybrid of **Tactile Neomorphism** and **Glassmorphism**. It utilizes soft, extruded surfaces that mimic physical equipment and high-end gym interiors. The UI should feel grounded and heavy, yet responsive. Every interaction evokes a sense of physical resistance and quality craftsmanship, blending the warmth of natural tones with the precision of modern technology.

## Colors

The palette is anchored by a rich **Earth Bronze**, serving as the primary energetic driver. This color is used for active states, key metrics, and primary calls to action, standing out against a deep, warm-black background. 

- **Primary (#a67c52):** A metallic, warm bronze representing strength and groundedness.
- **Secondary (#d9c5b2):** A soft sand tone used for subtle accents and high-readability text.
- **Tertiary (#2a2420):** A deep espresso used for container backgrounds and low-level elevation.
- **Neutral (#121110):** A near-black with warm undertones to maintain a premium dark-mode feel without the harshness of pure black.

Surfaces should utilize subtle gradients of the tertiary color to create the 3D "extruded" effect.

## Typography

Typography prioritizes clarity and a sense of "engineered" beauty. 
- **Headlines:** Use **Plus Jakarta Sans** for its friendly yet precise geometric shapes. The extra-bold weights are reserved for fitness metrics and progress titles to create a strong visual hierarchy.
- **Body:** **Hanken Grotesk** provides a clean, contemporary feel for instructions and descriptions, ensuring high legibility during movement.
- **Labels:** **Space Grotesk** is used for technical data, timestamps, and secondary labels to inject a subtle "high-tech equipment" vibe.

Metric typography should always be high contrast (Secondary color or White) against the dark Bronze backgrounds.

## Layout & Spacing

The layout follows a **Fluid Grid** model with generous inner-container padding to support the 3D elevation effects. 

- **Desktop:** 12-column grid with 24px gutters. Content is centered in a max-width container.
- **Tablet:** 8-column grid with 20px gutters. 
- **Mobile:** 4-column grid with 16px gutters and 20px side margins.

A strict 8px rhythmic system is used for all component dimensions. Horizontal spacing in lists and cards should be wider than vertical spacing to create a sense of stability and breadth.

## Elevation & Depth

Hierarchy is established through **Tonal Sculpting**. Unlike flat design, this system uses dual shadows and inner glows to create tactile surfaces.

- **Raised Elements:** Use a top-left light shadow (Primary color at 10% opacity) and a bottom-right dark shadow (Black at 40% opacity).
- **Recessed Elements (Inputs/Active States):** Use inner shadows to create a "pressed" or "carved" look, signifying that the user has interacted with the element.
- **Glass Overlays:** For modal or floating elements, use a 20px backdrop blur with a 1px border colored at #a67c52 at 20% opacity to simulate a premium frosted lens effect.

## Shapes

The shape language is **Rounded**, reflecting the ergonomic nature of fitness equipment and human anatomy. 
- Standard components (Buttons, Cards) use a **0.5rem (8px)** radius.
- Large containers and workout overview cards use **1rem (16px)**.
- Pill shapes are reserved strictly for status indicators (e.g., "Active," "Completed") and floating navigation bars.

## Components

- **Buttons:** Primary buttons are "extruded" bronze blocks with a slight gradient. They transition to a "pressed" recessed state on tap. Text is always uppercase and bold.
- **Cards:** Cards use the tertiary background (#2a2420) with a subtle 1px top-border highlight in Bronze to define the edge against the dark background.
- **Inputs:** Input fields are recessed into the surface, using a dark-espresso fill and a bronze focus ring.
- **Chips:** Small, pill-shaped tags used for workout categories (e.g., "Strength," "Yoga"). These use a low-opacity bronze fill with high-contrast text.
- **Progress Rings:** Use thick, 12px strokes. The background track is the tertiary color, and the active progress is a vibrant bronze-to-gold gradient.
- **Lists:** Items are separated by subtle 1px dividers that fade at the edges, maintaining a clean, "unbordered" look.