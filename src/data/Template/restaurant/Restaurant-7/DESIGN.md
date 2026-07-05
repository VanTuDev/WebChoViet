---
name: Crimson & Charcoal Minimal
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#20201f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353535'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e3bebd'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#aa8989'
  outline-variant: '#5b4040'
  surface-tint: '#ffb3b4'
  primary: '#ffb3b4'
  on-primary: '#680016'
  primary-container: '#c41e3a'
  on-primary-container: '#ffdada'
  inverse-primary: '#ba1434'
  secondary: '#c6c6c7'
  on-secondary: '#2f3131'
  secondary-container: '#454747'
  on-secondary-container: '#b4b5b5'
  tertiary: '#c8c6c6'
  on-tertiary: '#303030'
  tertiary-container: '#666565'
  on-tertiary-container: '#e5e3e2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad9'
  primary-fixed-dim: '#ffb3b4'
  on-primary-fixed: '#40000a'
  on-primary-fixed-variant: '#920023'
  secondary-fixed: '#e2e2e2'
  secondary-fixed-dim: '#c6c6c7'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#454747'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353535'
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
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Lexend
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: 0.02em
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '300'
    lineHeight: 24px
    letterSpacing: 0em
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  stack-lg: 48px
  stack-md: 24px
  stack-sm: 12px
---

## Brand & Style

This design system embodies the essence of high-end Japanese gastronomy: precision, balance, and intentionality. The aesthetic is rooted in **Minimalism** with a heavy focus on high-contrast visuals that mimic the experience of a dark, intimate Omakase bar. 

The target audience consists of discerning diners seeking a premium, culturally authentic experience. The UI evokes an emotional response of "Shibui"—an aesthetic of simple, subtle, and unobtrusive beauty. Key visual drivers include expansive negative space, razor-sharp alignment, and a dramatic interplay between deep shadows and vibrant crimson accents.

## Colors

The palette is strictly curated to reinforce a premium nighttime atmosphere. 

- **Primary (Deep Crimson):** Used sparingly as a "stamp of quality" (Hanko), drawing the eye to call-to-actions, price points, or critical highlights.
- **Background (Jet Black):** The canvas for all content, providing a deep, infinite field that allows food photography to pop.
- **Secondary (Pure White):** Reserved for primary typography and essential iconography to ensure maximum legibility against the dark background.
- **Accent (Dark Charcoal):** Used for structural elements like dividers, input fields, and container surfaces to provide subtle depth without breaking the dark aesthetic.

## Typography

Lexend is utilized to provide a modern, highly readable contrast to the traditional subject matter. Its geometric clarity aligns with the "clean lines" of Japanese architecture.

- **Headlines:** Use Bold or SemiBold weights. Large display titles should use tighter letter spacing for a compact, authoritative look.
- **Body:** Use Light or Regular weights to maintain an airy, sophisticated feel. Vietnamese diacritics must be handled with generous line-heights to avoid visual clutter.
- **Price Labels:** Should use the primary crimson color and a slightly heavier weight to emphasize value within the minimalist layout.
- **Utility Text:** Small labels (e.g., "MÓN KHAI VỊ") should be tracked out (0.1em) and capitalized to act as structural anchors.

## Layout & Spacing

The layout philosophy follows a **fixed-width centered grid** for desktop to maintain a cinematic, gallery-like feel, and a fluid 4-column grid for mobile.

- **Negative Space:** Whitespace (or "Blackspace" in this context) is treated as a functional element. Sections are separated by large vertical stacks (48px+) to prevent the UI from feeling crowded.
- **Rhythm:** An 8px base unit drives all padding and margins. 
- **Asymmetry:** Occasionally break the grid with large, high-resolution imagery of sushi that bleeds off the edge of the screen to create a sense of scale and luxury.

## Elevation & Depth

To maintain a minimalist profile, the design system avoids traditional drop shadows.

- **Tonal Layering:** Depth is created using color levels. The base layer is `#1a1a1a`. Hover states or floating cards use `#2d2d2d`.
- **Low-Contrast Outlines:** Instead of shadows, use 1px borders in `#2d2d2d` to define card boundaries.
- **Inner Glow:** For primary buttons or active states, a subtle, low-opacity inner glow of the primary crimson can be used to simulate a neon or "lacquerware" shine.
- **Backdrop Blurs:** Navigation bars should use a 20px blur with a 70% opacity version of the background color to create a glass-like transition over images.

## Shapes

The shape language is strictly **Sharp (0px)**. This mimics the precision of a Yanagiba (sushi knife) and the architectural lines of traditional Japanese joinery.

- **Containers:** All images, buttons, and cards must have perfectly square corners.
- **Dividers:** Use thin, 1px horizontal lines in Dark Charcoal to separate menu items.
- **Imagery:** Photography should be framed in strict rectangular or square aspect ratios. No circular elements should be used, except for very specific functional icons.

## Components

- **Primary Button:** Rectangular, sharp corners. Background: Deep Crimson (#c41e3a), Text: Pure White. Hover state: slight increase in saturation.
- **Ghost Button:** 1px Pure White border, no background. Used for secondary actions like "Xem thực đơn".
- **Menu List Item:** A clean row with the dish name in White (Headline-md), the description in Charcoal (Body-md), and the price in Crimson. Separated by a thin 1px line.
- **Reservation Card:** A Dark Charcoal (#2d2d2d) container with no shadow. Inputs should have a 1px white bottom-border only (minimalist style) rather than a full box.
- **Chips/Tags:** Small, rectangular boxes with Crimson text and a 1px Crimson border for labels like "Bán chạy" or "Món mới".
- **Category Navigation:** Horizontal scrolling text labels with no background. The active category is indicated by a 2px Crimson underline that spans the width of the text.