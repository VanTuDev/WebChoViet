---
name: Aether Kinetic
colors:
  surface: '#141313'
  surface-dim: '#141313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2b2a2a'
  surface-container-highest: '#353434'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c4c7c7'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8e9192'
  outline-variant: '#444748'
  surface-tint: '#c9c6c5'
  primary: '#c9c6c5'
  on-primary: '#313030'
  primary-container: '#050505'
  on-primary-container: '#797777'
  inverse-primary: '#5f5e5e'
  secondary: '#b9c7e4'
  on-secondary: '#233148'
  secondary-container: '#3c4962'
  on-secondary-container: '#abb9d6'
  tertiary: '#edb1ff'
  on-tertiary: '#520070'
  tertiary-container: '#0e0016'
  on-tertiary-container: '#a457c2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e5e2e1'
  primary-fixed-dim: '#c9c6c5'
  on-primary-fixed: '#1c1b1b'
  on-primary-fixed-variant: '#474646'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#b9c7e4'
  on-secondary-fixed: '#0d1c32'
  on-secondary-fixed-variant: '#39475f'
  tertiary-fixed: '#f9d8ff'
  tertiary-fixed-dim: '#edb1ff'
  on-tertiary-fixed: '#320046'
  on-tertiary-fixed-variant: '#6e208c'
  background: '#141313'
  on-background: '#e5e2e1'
  surface-variant: '#353434'
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
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0em
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.08em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1440px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system embodies "Aether Kinetic"—a luxury fitness experience that merges high-performance technology with the vast, immersive aesthetic of deep space. The target audience consists of high-net-worth individuals and tech-forward athletes who seek a training environment that feels like a premium cosmic voyage.

The design style is **Futuristic Glassmorphism** layered over a **High-Depth 3D** foundation. It utilizes deep gradients, glowing interactive borders, and luminous highlights to create a sense of infinite scale and technical precision. The emotional response is one of awe, focus, and elite exclusivity. Every element should feel like a piece of advanced instrumentation floating within a nebula.

## Colors

The palette is rooted in the darkness of the void to emphasize depth and luxury.

- **Primary (Deep Space Black):** Used for the core canvas and deepest background layers.
- **Secondary (Midnight Blue):** Used for structural containers, cards, and subtle depth transitions.
- **Tertiary (Nebula Violet):** Reserved for energetic accents, progress states, and premium "hero" moments.
- **Accent (Electric Cyan):** The primary tactical color. Used for critical data visualization, active states, and interactive glowing borders.

Backgrounds should utilize radial gradients transitioning from `#0A192F` at the center to `#050505` at the edges to simulate the curvature of space.

## Typography

This design system utilizes **Lexend** exclusively to maintain a clean, athletic, and hyper-modern feel. Its geometric clarity ensures legibility even when layered over complex cosmic backgrounds.

Headlines should be set with tight tracking to feel "built" and architectural. Labels and captions should use increased letter spacing and uppercase styling to evoke technical readouts. For "Display" sizes, apply a subtle text-shadow of `0 0 10px rgba(0, 242, 255, 0.3)` to create a light-emissive effect.

## Layout & Spacing

The layout follows a **Fluid Grid** philosophy with generous breathing room to mimic the expansiveness of space. 

- **Desktop:** 12-column grid with 24px gutters. Content is centered in a 1440px max-width container.
- **Tablet:** 8-column grid with 20px gutters.
- **Mobile:** 4-column grid with 16px gutters and 20px side margins.

Spacing should follow a strict 8px base unit. Use larger spacing increments (64px, 80px, 128px) between major sections to emphasize the premium, airy nature of the brand.

## Elevation & Depth

Depth is conveyed through **Atmospheric Layering** and **Luminous Borders** rather than traditional drop shadows.

- **Level 0 (Void):** Pure `#050505` background.
- **Level 1 (Satellite):** Secondary color `#0A192F` with 40% opacity and a 20px backdrop blur.
- **Level 2 (Active):** Midnight blue base with a 1px inner border using a linear gradient of `Electric Cyan` to `Transparent`.
- **Glow Effects:** Interactive elements should emit a soft outer glow (`box-shadow: 0 0 20px rgba(0, 242, 255, 0.15)`) when focused or hovered.

Depth is further enhanced by subtle, slow-moving background blurs in `Nebula Violet` positioned behind primary content cards.

## Shapes

The shape language is defined by **Geometric Precision**. A consistent 8px (`0.5rem`) corner radius is applied to all standard components to balance technical sharpness with modern approachability.

- **Standard Containers:** 8px radius.
- **Large Sections/Cards:** 16px (`1rem`) radius.
- **Interactive Pills:** Fully rounded (32px+) for specific call-to-actions or status chips.

All borders should be thin (1px) and use semi-transparent or gradient strokes to maintain a lightweight, holographic appearance.

## Components

### Buttons
Primary buttons use a solid `Electric Cyan` background with black text for maximum contrast. Secondary buttons feature a "Ghost" style: 1px `Electric Cyan` border with a subtle 10% opacity cyan fill.

### Cards & Containers
Cards must use the Level 1 elevation (Backdrop blur 20px, 40% Midnight Blue). On hover, the border should animate from a subtle grey to a glowing `Electric Cyan` gradient.

### Input Fields
Inputs are dark and recessed. Use a 1px border of `#1A2B45`. On focus, the border glows `Electric Cyan` and a subtle inner shadow is applied to simulate depth.

### Data Visualization
Fitness metrics should use "Glow Lines." Instead of flat strokes, charts use `Electric Cyan` lines with a multi-layered blur to simulate light trails.

### Progress Rings
Utilize the `Nebula Violet` to `Electric Cyan` gradient for progress indicators, emphasizing the "energy" of the workout.

### Navigation
The navigation bar is a floating "Glass" island at the top of the screen with a heavy backdrop blur and a thin bottom border that reflects the nebula colors.