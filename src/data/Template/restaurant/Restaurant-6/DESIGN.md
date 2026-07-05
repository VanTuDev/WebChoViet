---
name: Lush Tropical Fine Dining
colors:
  surface: '#fbf9f1'
  surface-dim: '#dcdad2'
  surface-bright: '#fbf9f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f4ec'
  surface-container: '#f0eee6'
  surface-container-high: '#eae8e0'
  surface-container-highest: '#e4e3db'
  on-surface: '#1b1c17'
  on-surface-variant: '#42493e'
  inverse-surface: '#30312c'
  inverse-on-surface: '#f3f1e9'
  outline: '#72796e'
  outline-variant: '#c2c9bb'
  surface-tint: '#3b6934'
  primary: '#154212'
  on-primary: '#ffffff'
  primary-container: '#2d5a27'
  on-primary-container: '#9dd090'
  inverse-primary: '#a1d494'
  secondary: '#446900'
  on-secondary: '#ffffff'
  secondary-container: '#c1ee7d'
  on-secondary-container: '#486d04'
  tertiary: '#553112'
  on-tertiary: '#ffffff'
  tertiary-container: '#704727'
  on-tertiary-container: '#f0b78f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#bcf0ae'
  primary-fixed-dim: '#a1d494'
  on-primary-fixed: '#002201'
  on-primary-fixed-variant: '#23501e'
  secondary-fixed: '#c3f180'
  secondary-fixed-dim: '#a8d567'
  on-secondary-fixed: '#111f00'
  on-secondary-fixed-variant: '#324f00'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#f4bb92'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#653d1e'
  background: '#fbf9f1'
  on-background: '#1b1c17'
  surface-variant: '#e4e3db'
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
  label-lg:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style
The design system embodies a "Modern Tropical Heritage" aesthetic, positioning the brand as a high-end Thai culinary destination. It balances the raw, organic energy of a rainforest with the structured refinement of luxury hospitality.

The visual style is **Modern Corporate** with a **Tactile** twist, using high-quality imagery, generous whitespace, and subtle natural textures (wood, woven bamboo) to ground the digital experience in a physical, sensory world. The goal is to evoke a sense of exclusivity, freshness, and professional warmth, moving away from stereotypical tropes toward a sophisticated, minimalist interpretation of Thai culture.

## Colors
The palette is centered on a "Forest and Timber" concept. 

- **Primary (#2d5a27):** A deep forest green used for headers, primary actions, and brand-heavy backgrounds. It represents the dense Thai canopy and stability.
- **Secondary (#a3cf62):** A vibrant lime accent used sparingly for highlights, status indicators, or "Fresh" callouts to add energy and a modern edge.
- **Tertiary (#8b5e3c):** A warm wood tone used for decorative elements, dividers, and grounding icons, reflecting the teak and bamboo architecture of the region.
- **Neutral (#fcfaf2):** An off-white, parchment-like "Bone" color used as the primary background to reduce glare and feel more organic than pure white.
- **Surface:** Use a 5% opacity of the primary green over the neutral background to create soft "Moss" containers.

## Typography
Lexend is used exclusively to maintain a clean, rhythmic, and highly readable interface. Its geometric clarity prevents the "lush" design from feeling cluttered.

- **Headlines:** Use Bold weights for Display sizes to anchor the page. Tighten letter spacing slightly on larger titles for a more "designed" editorial feel.
- **Body:** Use Regular weight for primary reading. The generous x-height of Lexend ensures legibility even in low-light dining environments.
- **Labels:** Use Medium or SemiBold with slight tracking (letter spacing) and uppercase for navigation and category headers (e.g., "APPETIZERS," "CURRIES") to create a structured hierarchy.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to ensure content remains centered and prestigious, while transitioning to a fluid model on mobile.

- **Desktop:** 12-column grid, 1280px max-width. Use "Airy" spacing (multiples of 24px/32px) between sections to evoke a sense of calm and luxury.
- **Mobile:** 4-column grid with 20px side margins.
- **Negative Space:** High-end appeal is achieved through "oversized" margins around food photography. Avoid crowding text near edges; let the Forest Green backgrounds breathe.

## Elevation & Depth
This design system avoids heavy drop shadows in favor of **Tonal Layers** and **Subtle Skeuomorphism**.

1.  **Level 0 (Base):** Neutral Bone (#fcfaf2) background.
2.  **Level 1 (Cards/Containers):** A very thin 1px border in #2d5a27 at 10% opacity, or a subtle wood-tinted fill.
3.  **Level 2 (Interactive):** Elements that require focus (like a "Book a Table" modal) use a deep forest green background with a soft, diffused "Umbra" shadow—low opacity (#2d5a27 at 15%), large blur (20px), and no offset.
4.  **Glassmorphism:** Use backdrop blurs (10px) on sticky navigation bars with a semi-transparent version of the Neutral base color to maintain context of the lush imagery behind it.

## Shapes
A **Rounded (2)** shape language is used to mimic the organic curves found in nature—leaves, river stones, and ceramic dinnerware. 

- **Standard Elements:** 0.5rem (8px) for input fields and small cards.
- **Large Elements:** 1.5rem (24px) for featured menu cards and hero image containers to create a soft, inviting frame.
- **Buttons:** Use fully rounded (pill-shaped) ends for primary CTA buttons to make them feel "touchable" and friendly.

## Components
- **Buttons:** Primary buttons are Solid Forest Green with Bone text. Secondary buttons are Wood Brown (#8b5e3c) outlines. All buttons use high horizontal padding (24px+) to feel substantial.
- **Menu Chips:** Used for dietary filters (e.g., Vegan, Spicy). These should be light lime-green tints with dark green text, using the "Pill" shape.
- **Cards:** Menu item cards should feature a prominent photo. Text is left-aligned with the price in a SemiBold Lexend weight. Hover states should slightly scale the image (1.05x) for a tactile feel.
- **Input Fields:** Minimalist design. A single bottom border in Forest Green or a subtle 4-sided stroke. Focus state changes the border to Lime Green.
- **Interactive Map:** For location pages, use a custom-styled map with a "Monochrome Green" filter to match the brand palette.
- **Lists:** Menu lists use "dotted leaders" (e.g., Pad Thai ........ $18) in the Wood Brown color to guide the eye in a classic, professional manner.