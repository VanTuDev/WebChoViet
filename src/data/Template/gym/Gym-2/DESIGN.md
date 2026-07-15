---
name: Crimson Peak 3D
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#393939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
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
  tertiary: '#c8c6c5'
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
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474746'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-xl:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Lexend
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
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
  label-bold:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '700'
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
  unit: 4px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

The design system is engineered for high-performance fitness environments, targeting athletes and tech-forward users who seek motivation through a powerful, visceral UI. The personality is aggressive, energetic, and premium, utilizing a "Hyper-Depth" aesthetic.

The style fuses **3D Depth** with **Glassmorphism** and **Metallic Textures**. Elements are not merely flat shapes but physical objects existing in a multi-layered space. We employ heavy backdrop blurs, internal glows, and stacking orders that create a sense of verticality and "peak" performance. The emotional response should be one of intensity, focus, and momentum.

## Colors

This design system utilizes a high-contrast dark mode palette to emphasize energy and focus.

*   **Primary (Crimson Red):** Used for critical actions, active states, and "hot" data points. It is often accompanied by a light-source glow.
*   **Surface (Deep Charcoal):** The foundation. It provides the dark "void" from which 3D elements emerge.
*   **Secondary (Pure White):** Reserved for high-readability text and primary icons to ensure maximum contrast against the dark background.
*   **Glass Accents:** Semi-transparent variations of the primary and neutral colors are used for frosted overlays, utilizing `rgba(196, 30, 58, 0.1)` for red tints and `rgba(255, 255, 255, 0.05)` for neutral glass.

## Typography

The typography uses **Lexend** exclusively. Its geometric clarity and varied weights allow for a "tech-forward" and athletic feel.

Headlines should be set with tight tracking and heavy weights (700-800) to command attention. Use uppercase transformations for labels and secondary navigation items to evoke the feel of professional athletic timing equipment. For long-form data or fitness metrics, prioritize `body-lg` for instant legibility during high-activity movement.

## Layout & Spacing

This design system follows a **Fluid Grid** model with an emphasis on "Safe Zones" for 3D elements to breathe.

*   **Desktop:** 12-column grid, 24px gutters, 40px outer margins.
*   **Mobile:** 4-column grid, 16px gutters, 16px outer margins.

Spacing is based on a 4px base unit. Because elements use 3D lifts and shadows, internal padding within cards and containers must be generous (minimum 24px) to prevent the visual weight of shadows from "clamping" the content. Use vertical stacks to group related metrics, ensuring ample "air" between the 3D planes.

## Elevation & Depth

Hierarchy is established through **Physical Layering** and **Luminance**:

1.  **Level 0 (Floor):** The Deep Charcoal (#131313) background.
2.  **Level 1 (The Track):** Sub-containers with a subtle metallic gradient (Linear: #1A1A1A to #131313) and a 1px inner border to simulate a beveled edge.
3.  **Level 2 (Glass):** Floating informational panels using `backdrop-filter: blur(12px)` and a white stroke at 10% opacity.
4.  **Level 3 (Action):** Interactive elements that use "Crimson Glow." These utilize a dual-shadow system: a sharp, dark drop shadow for lift, and a soft, Crimson Red outer glow (`0px 10px 30px rgba(196, 30, 58, 0.4)`) to simulate light emission.

Use metallic textures sparingly on primary surfaces to indicate "hard" industrial strength, achieved through subtle noise textures and brushed-metal SVG overlays.

## Shapes

The shape language is **Aggressive yet Ergonomic**. 

Standard components use a 0.5rem (8px) radius to maintain a modern, technical appearance. Larger containers and floating cards use 1rem (16px) to emphasize their "object" quality in 3D space. 

Interactive elements like buttons should never be fully circular unless they are icon-only; instead, use the `rounded-lg` (16px) setting to create a sturdy, "stamped" look that feels like physical hardware.

## Components

### Buttons (The "Power" Component)
Buttons must feature a 3D lift. The default state is Crimson Red with a 2px bottom "lip" (a darker shade of red) to simulate physical depth. On hover, the button should "sink" (translate-y: 2px) and the Crimson Glow should intensify.

### Glass Cards
Use for secondary data like "Previous Workouts." Background: `rgba(42, 42, 42, 0.6)`. Backdrop blur: 16px. Border: 1.5px solid `rgba(255, 255, 255, 0.1)`.

### Input Fields
Inputs are recessed into the UI. Use an inner shadow (`inset 0 2px 4px rgba(0,0,0,0.5)`) and a Deep Charcoal background. When focused, the border transforms into a 2px Crimson Red stroke with a faint glow.

### Fitness Chips
Small, high-contrast pills used for categories (e.g., "HIIT", "Strength"). Background should be semi-transparent white or red with `Lexend` Bold text in uppercase.

### Progress Gauges
Utilize metallic gradients for the "unfilled" portion of the track. The "filled" portion uses a Crimson-to-Bright-Red gradient to simulate energy flow.