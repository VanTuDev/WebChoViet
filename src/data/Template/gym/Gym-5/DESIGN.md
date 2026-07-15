---
name: Oxidized Iron Edition
colors:
  surface: '#121416'
  surface-dim: '#121416'
  surface-bright: '#37393b'
  surface-container-lowest: '#0c0e10'
  surface-container-low: '#1a1c1e'
  surface-container: '#1e2022'
  surface-container-high: '#282a2c'
  surface-container-highest: '#333537'
  on-surface: '#e2e2e5'
  on-surface-variant: '#dcc1b9'
  inverse-surface: '#e2e2e5'
  inverse-on-surface: '#2f3133'
  outline: '#a38c84'
  outline-variant: '#55423d'
  surface-tint: '#ffb59d'
  primary: '#ffb59d'
  on-primary: '#5d1800'
  primary-container: '#a64d2e'
  on-primary-container: '#ffe0d7'
  inverse-primary: '#9b4426'
  secondary: '#ffb95a'
  on-secondary: '#462a00'
  secondary-container: '#c68315'
  on-secondary-container: '#3d2400'
  tertiary: '#c2c7cc'
  on-tertiary: '#2c3135'
  tertiary-container: '#63686c'
  on-tertiary-container: '#e3e7ec'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#7c2e11'
  secondary-fixed: '#ffddb6'
  secondary-fixed-dim: '#ffb95a'
  on-secondary-fixed: '#2a1800'
  on-secondary-fixed-variant: '#643f00'
  tertiary-fixed: '#dfe3e8'
  tertiary-fixed-dim: '#c2c7cc'
  on-tertiary-fixed: '#171c20'
  on-tertiary-fixed-variant: '#42474b'
  background: '#121416'
  on-background: '#e2e2e5'
  surface-variant: '#333537'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 64px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 20px
  margin-desktop: 40px
  container-max: 1280px
---

## Brand & Style
The design system embodies a rugged, industrial aesthetic tailored for an elite fitness environment. The brand personality is raw and powerful, drawing inspiration from high-end "underground" gyms where weathered materials meet modern performance. 

The visual style leverages a mix of **Industrial Minimalism** and **Tactile Textures**. It avoids sterile, plastic finishes in favor of "oxidized" surfaces and heavy-duty structural elements. The UI should evoke the sensation of cold steel and warm, focused lighting, creating an atmosphere of intensity, discipline, and durability. High contrast and purposeful use of "imperfections" (like subtle grain or noise) reinforce the raw, unrefined aesthetic.

## Colors
The palette is rooted in the "Oxidized Iron" concept, utilizing a dark-mode-first approach to simulate a dimly lit, industrial space.

- **Primary (Rusty Orange):** Used for primary actions and brand emphasis. It mimics oxidized metal and provides a high-energy contrast against dark backgrounds.
- **Secondary (Warm Amber):** Used sparingly for "spotlight" effects, notifications, or active states. It represents the warm incandescent lighting of a warehouse gym.
- **Tertiary (Weathered Iron):** A mid-tone gray with a slight blue-cool undertone, used for secondary containers and structural lines.
- **Neutral (Deep Charcoal):** The foundation of the UI, representing the shadowed corners and heavy machinery of the environment.

Backgrounds should use `#121416` to provide depth beneath the charcoal containers.

## Typography
The typography system uses **Plus Jakarta Sans** for its heavy geometric weight and high legibility, providing the "heavy grotesque" look required for an elite fitness brand. Headlines should be set with tight tracking to feel dense and impactful.

**JetBrains Mono** is introduced as a secondary label font to evoke "industrial specs" and technical precision, used for data points, workout metrics, and technical labels. This contrast between the bold, humanist-geometric sans and the technical monospace reinforces the "Elite/Industrial" narrative.

## Layout & Spacing
The layout follows a **Rigid Grid System**, reflecting the structural integrity of industrial architecture. 

- **Grid:** A 12-column grid for desktop and a 4-column grid for mobile. 
- **Rhythm:** An 8px baseline grid is used for vertical rhythm, though the base unit is 4px for fine-tuning technical data displays.
- **Density:** Elements should feel substantial. Use generous internal padding within cards to allow typography to breathe, but keep gutters tight (16px) to maintain a compact, "heavy" feel.
- **Alignment:** Prefer hard-edged alignments and vertical stacks. Asymmetrical layouts are encouraged for editorial-style workout highlights.

## Elevation & Depth
In this design system, depth is conveyed through **Tonal Layering** and **Material Texture** rather than traditional soft shadows.

- **Stacking:** Use increasing brightness of the "Weathered Iron" palette to indicate elevation. Lower levels are `#121416`, while cards and active containers use `#1a1c1e` or `#232629`.
- **Borders:** Instead of shadows, use **1px Solid Borders** in `#3d4246` to define element boundaries. 
- **Inner Glows:** For primary buttons or active states, use a very subtle inner "amber" glow (0.5px stroke or low-spread shadow) to simulate the way light catches the edge of a steel beam.
- **Overlays:** Use a subtle grain texture overlay (3-5% opacity) on large surfaces to mimic the feel of cast iron or oxidized metal.

## Shapes
The shape language is dominated by **Hard Edges**. A "Soft" setting (0.25rem) is used only to prevent the UI from feeling digitally "sharp" or painful, mimicking the slightly eased edges of machined metal parts.

- **Standard Elements:** 4px (0.25rem) radius.
- **Large Containers:** 8px (0.5rem) radius max.
- **Icons:** Use thick-stroke (2px minimum) icons with square caps and joins to match the industrial feel.

## Components

- **Buttons:** Primary buttons use the Rusty Orange (`#a64d2e`) background with black, bold text. Secondary buttons are "Ghost" style with a heavy 2px border in Weathered Iron. Use a "pressed" state that shifts the background to a deeper, darker orange.
- **Chips/Tags:** Use the monospace font (**JetBrains Mono**). Tags should have a dark gray background with a 1px border, looking like stamped metal plates.
- **Input Fields:** Bottom-border only or full borders in a dark gray. Focus states use the Rusty Orange for the border and a subtle amber text cursor.
- **Cards:** Heavy containers with a subtle grain texture. Headlines inside cards should always be uppercase to maintain the "Industrial" strength.
- **Progress Bars:** Use a "segmented" look rather than a smooth fill, resembling mechanical gauges or power levels. Use Rusty Orange for the fill and Charcoal for the track.
- **Lists:** Separated by 1px horizontal lines that extend to the edges of the container, mimicking structural beams.