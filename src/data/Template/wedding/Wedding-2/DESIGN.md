---
name: Red Envelope & Gold Silk
colors:
  surface: '#fff8f7'
  surface-dim: '#edd4d3'
  surface-bright: '#fff8f7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff0ef'
  surface-container: '#ffe9e8'
  surface-container-high: '#fce2e1'
  surface-container-highest: '#f6dddc'
  on-surface: '#251818'
  on-surface-variant: '#594140'
  inverse-surface: '#3c2d2c'
  inverse-on-surface: '#ffedec'
  outline: '#8d706f'
  outline-variant: '#e0bfbd'
  surface-tint: '#b02b36'
  primary: '#86041d'
  on-primary: '#ffffff'
  primary-container: '#a82431'
  on-primary-container: '#ffbfbe'
  inverse-primary: '#ffb3b2'
  secondary: '#735c00'
  on-secondary: '#ffffff'
  secondary-container: '#fed65b'
  on-secondary-container: '#745c00'
  tertiary: '#434040'
  on-tertiary: '#ffffff'
  tertiary-container: '#5b5757'
  on-tertiary-container: '#d3cdcc'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#ffb3b2'
  on-primary-fixed: '#410008'
  on-primary-fixed-variant: '#8f0e22'
  secondary-fixed: '#ffe088'
  secondary-fixed-dim: '#e9c349'
  on-secondary-fixed: '#241a00'
  on-secondary-fixed-variant: '#574500'
  tertiary-fixed: '#e8e1e0'
  tertiary-fixed-dim: '#cbc5c4'
  on-tertiary-fixed: '#1d1b1b'
  on-tertiary-fixed-variant: '#494646'
  background: '#fff8f7'
  on-background: '#251818'
  surface-variant: '#f6dddc'
typography:
  display-lg:
    fontFamily: Playfair Display
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Playfair Display
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '300'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  section-gap: 80px
---

## Brand & Style
This design system marries the deep-rooted traditions of Vietnamese heritage with the airy sophistication of modern luxury. It is designed to evoke a sense of "Hỷ" (joy) and "Phúc" (fortune), creating an emotional bridge between classical ceremony and contemporary celebration. 

The aesthetic is **Luxury Editorial**, characterized by expansive whitespace, masterful typography, and a "physical stationery" feel. We avoid digital-first coldness in favor of warmth and tactile depth. Visuals should lean heavily on high-resolution photography of floral arrangements (peonies, lotuses) and macro shots of silk textures or gold-leaf detailing.

## Colors
The palette is centered on **Heritage Red**, a sophisticated crimson that feels authoritative yet celebratory. **Champagne Gold** is used sparingly for accents, borders, and interactive states to signify premium quality. **Soft Cream** replaces pure white to provide a gentle, paper-like background that reduces eye strain and feels more organic.

- **Primary (Heritage Red):** Used for primary actions, headlines, and critical brand symbols.
- **Secondary (Champagne Gold):** Used for decorative elements, "ghost" borders, and shimmering states.
- **Tertiary (Soft Cream):** The primary surface color for all containers and page backgrounds.
- **Text:** Dark grey (#2d2926) is used for body text to maintain high legibility against the cream background without the harshness of pure black.

## Typography
The typographic strategy balances the romantic drama of **Playfair Display** with the functional clarity of **Lexend**. 

- **Headlines:** Always in Playfair Display. Use italic styles for names or emotive quotes to enhance the romantic feel.
- **Body Text:** Lexend is utilized at a lighter weight (300) for long-form content to maintain an airy, modern feel.
- **Labels:** Use uppercase Lexend with increased letter spacing for small metadata, like timestamps or location labels, to ensure a structured, organized look.
- **Scale:** Large display sizes should be centered to mimic traditional invitation layouts.

## Layout & Spacing
The layout follows a **Fixed Centered Grid** for desktop to simulate the experience of opening a physical invitation card. For mobile, the content flows fluidly but maintains significant side margins to preserve the feeling of "luxury through space."

- **Symmetry:** Whenever possible, use center-aligned layouts for key invitation sections (The Couple, The Schedule, RSVP).
- **Rhythm:** Use large section gaps (80px+) to allow the eye to rest and to frame the photography effectively.
- **Safe Zones:** Ensure a minimum margin of 24px around all text blocks to prevent the UI from feeling "crowded," which is the antithesis of luxury.

## Elevation & Depth
Depth is conveyed through **Tonal Layering** and **Ambient Shadows** that mimic heavy cardstock.

- **The Invitation Layer:** The main content card should feature a very soft, diffused shadow with a hint of red tint (`rgba(168, 36, 49, 0.05)`) to feel as if it is floating slightly above the cream background.
- **Gold Foiling:** Use subtle 1px inner borders in Champagne Gold to simulate the look of metallic foil-pressed edges.
- **Glassmorphism:** For overlays or navigation bars, use a high-blur backdrop filter (20px+) with a semi-transparent Soft Cream fill to maintain context while keeping the focus on the content.

## Shapes
We use a **Soft (Level 1)** roundedness approach. While sharp edges are traditional, a subtle 4px–8px radius on cards and buttons suggests a premium, custom-cut paper quality.

- **Image Masks:** Photography may occasionally use arched top borders (Gothic or Roman arch) to lean into the romantic, architectural theme.
- **Icons:** Use thin-stroke (1px) icons in Gold or Red. Avoid filled, chunky icons.

## Components
- **Buttons:** Primary buttons are solid Heritage Red with white or gold text. Secondary buttons are "Ghost" style with a Champagne Gold border and a subtle hover lift.
- **RSVP Inputs:** Use minimal underline-style inputs rather than boxed fields. This maintains the "handwritten" invitation aesthetic.
- **Cards:** Content cards should always have a 1px Gold border or a "frame" motif using delicate floral patterns in the corners.
- **Chips/Badges:** Use for "Dress Code" or "Map Tags" with a Soft Cream background and a Heritage Red border.
- **Floral Dividers:** Custom SVG dividers featuring minimalist lotus or peony line art should be used to separate major sections instead of simple horizontal lines.
- **Countdown Timer:** A sophisticated, low-contrast display using Playfair Display for numbers and Lexend for units (Days, Hours, Mins).