---
name: Luminous Precision
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#424752'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#727784'
  outline-variant: '#c2c6d4'
  surface-tint: '#115cb9'
  primary: '#003f87'
  on-primary: '#ffffff'
  primary-container: '#0056b3'
  on-primary-container: '#bbd0ff'
  inverse-primary: '#acc7ff'
  secondary: '#0c6780'
  on-secondary: '#ffffff'
  secondary-container: '#9ae1ff'
  on-secondary-container: '#09657f'
  tertiary: '#3a4347'
  on-tertiary: '#ffffff'
  tertiary-container: '#515a5f'
  on-tertiary-container: '#c8d1d7'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7e2ff'
  primary-fixed-dim: '#acc7ff'
  on-primary-fixed: '#001a40'
  on-primary-fixed-variant: '#004491'
  secondary-fixed: '#baeaff'
  secondary-fixed-dim: '#89d0ed'
  on-secondary-fixed: '#001f29'
  on-secondary-fixed-variant: '#004d62'
  tertiary-fixed: '#dbe4ea'
  tertiary-fixed-dim: '#bfc8ce'
  on-tertiary-fixed: '#141d21'
  on-tertiary-fixed-variant: '#3f484d'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '600'
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
  title-md:
    fontFamily: Lexend
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
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
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max: 1280px
---

## Brand & Style
The design system is built on a foundation of clinical excellence and premium hospitality. The target audience includes high-end clientele seeking medical-grade beauty treatments within a trustworthy, sophisticated environment. The emotional response should be one of "calm confidence"—the feeling of entering a sterile, high-tech facility that remains welcoming and luxurious.

The visual style is a hybrid of **Minimalism** and **Glassmorphism**. It utilizes expansive white space to evoke cleanliness, paired with high-tech frosted glass layers to represent modern dermatological science. Every interface element must feel precise, intentional, and impeccably polished, mirroring the results of a professional beauty procedure.

## Colors
The palette is rooted in a "Clinical Blue" spectrum. 
- **Primary (#0056b3):** Used for primary actions, authoritative headers, and brand-critical touchpoints. It conveys medical stability and professional depth.
- **Secondary (#87CEEB):** A light sky blue used for accents, active states, and secondary visual interest. It prevents the UI from feeling overly cold.
- **Surface/Tertiary (#F0F9FF):** A very faint, cool-tinted blue used for background sections and container fills to distinguish them from the pure white base.
- **Neutral (#1E293B):** A deep slate-blue used exclusively for high-contrast typography and iconography to ensure legibility.
- **Functional White (#FFFFFF):** The dominant background color to maintain a "sterile-luxury" aesthetic.

## Typography
Lexend is used across all levels to optimize readability and provide a modern, accessible feel. The type scale emphasizes generous leading (line height) to maintain a feeling of "airiness." 

Headlines should use medium weights to establish authority without appearing aggressive. Body text is set in a light weight (300) to enhance the premium, delicate nature of the beauty industry. All labels and functional text use uppercase or semi-bold weights to ensure they are distinct from editorial content.

## Layout & Spacing
The layout follows a **Fixed Grid** model on desktop to maintain a boutique, curated feel, transitioning to a fluid model on mobile devices. 

A 12-column grid is used for desktop (1280px max-width) with 24px gutters. Spacing follows a strict 4px baseline, but "macro-spacing" (64px, 80px, or 120px) is encouraged between major sections to emphasize the minimalist aesthetic. Elements should often be center-aligned or offset with generous margins to create a high-fashion editorial flow.

## Elevation & Depth
In this design system, depth is achieved through **Tonal Layers** and **Backdrop Blurs**. 
- **Level 0 (Base):** Pure #FFFFFF.
- **Level 1 (Cards/Containers):** #F0F9FF with a subtle 1px stroke of #0056b3 at 5% opacity.
- **Level 2 (Overlays/Modals):** Glassmorphism effect—semi-transparent white (80% opacity) with a 20px background blur.
- **Shadows:** Avoid heavy, dark shadows. Use only ultra-diffused "light-leaks" using the Primary color at 4% opacity for floating elements (e.g., `0px 10px 30px rgba(0, 86, 179, 0.04)`).

## Shapes
The shape language is defined by "Organic Precision." All interactive elements like buttons, input fields, and tags use a **Pill-shaped (ROUND_FULL)** radius. This eliminates harsh corners, evoking a sense of safety, softness, and biological harmony. Large containers or images may use `rounded-xl` (3rem) to maintain consistency with the circular motif without becoming full ellipses.

## Components
- **Buttons:** Primary buttons are pill-shaped, using the Primary Blue background with white text. Secondary buttons use a Primary Blue 1.5px border with a transparent background.
- **Input Fields:** Fully rounded with a light #F0F9FF fill. On focus, the border transitions to Primary Blue.
- **Chips/Badges:** Used for treatment categories (e.g., "Facial," "Laser"). These should be small, pill-shaped, with Secondary Blue backgrounds and Primary Blue text.
- **Cards:** Use the Level 1 elevation (Tonal Layer) with high-quality, bright photography. Images within cards should also have rounded corners.
- **Progress Indicators:** For multi-step booking or treatment plans, use thin, rounded lines in Primary Blue.
- **Service Lists:** Use generous vertical padding (32px+) between items, separated by light, 1px horizontal lines at 10% opacity.