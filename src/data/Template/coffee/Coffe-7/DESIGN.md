---
name: Earthy Wood
colors:
  surface: '#fbf9f5'
  surface-dim: '#dbdad6'
  surface-bright: '#fbf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ef'
  surface-container: '#efeeea'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e4e2de'
  on-surface: '#1b1c1a'
  on-surface-variant: '#50453b'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f0ed'
  outline: '#82756a'
  outline-variant: '#d4c4b7'
  surface-tint: '#7c5730'
  primary: '#79542e'
  on-primary: '#ffffff'
  primary-container: '#956c44'
  on-primary-container: '#fffbff'
  inverse-primary: '#eebd8e'
  secondary: '#536254'
  on-secondary: '#ffffff'
  secondary-container: '#d4e4d2'
  on-secondary-container: '#586658'
  tertiary: '#68594a'
  on-tertiary: '#ffffff'
  tertiary-container: '#827261'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcbd'
  primary-fixed-dim: '#eebd8e'
  on-primary-fixed: '#2c1600'
  on-primary-fixed-variant: '#61401b'
  secondary-fixed: '#d7e7d4'
  secondary-fixed-dim: '#bbcbb9'
  on-secondary-fixed: '#111f13'
  on-secondary-fixed-variant: '#3c4a3d'
  tertiary-fixed: '#f4dfcb'
  tertiary-fixed-dim: '#d7c3b0'
  on-tertiary-fixed: '#241a0e'
  on-tertiary-fixed-variant: '#524436'
  background: '#fbf9f5'
  on-background: '#1b1c1a'
  surface-variant: '#e4e2de'
typography:
  headline-lg:
    fontFamily: Lexend
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Lexend
    fontSize: 30px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Lexend
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Lexend
    fontSize: 22px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Lexend
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Lexend
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  body-sm:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
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
This design system captures the inviting, tactile essence of a high-end garden cafe. It prioritizes warmth and hospitality through an organic palette and soft UI structures. The target audience seeks a professional yet approachable digital environment that feels grounded, calm, and human-centric.

The aesthetic leans into **Modern Organic Minimalism**. It avoids the sterility of typical corporate interfaces by using "warmth-first" neutrals and subtle textures. The UI should evoke the sensory experience of natural materials—unfinished wood, linen, and ceramic—translated into a digital workspace that feels sturdy yet breathable.

## Colors
The color strategy is anchored in a "Harvest and Hearth" palette. 
- **Primary (#a67c52):** A warm, mid-tone wood brown used for key actions and brand presence.
- **Secondary (#5e6d5e):** A muted sage green used for success states and secondary visual interest, grounding the "garden" aspect of the theme.
- **Background (#fbf9f5):** A soft, warm cream that reduces eye strain and provides a premium, paper-like feel compared to pure white.
- **Surface Neutrals:** Use variations of the background (darkened by 3-5%) for container backgrounds to maintain a monochromatic, layered depth.

## Typography
Lexend is used across all levels to maximize readability and maintain a friendly, open character. 
- **Headings:** Utilize a tighter letter-spacing and medium-to-semibold weights to create a "sturdy" look reminiscent of carved signage.
- **Body:** Generous line-height (1.6) is mandatory to ensure the "breathable" nature of the design system. 
- **Hierarchy:** Use the Primary color sparingly in typography (only for links or key accents); otherwise, stick to a deep charcoal or dark wood brown for high-contrast legibility against the cream background.

## Layout & Spacing
The layout follows a **Fluid-Fixed hybrid model**. Content containers should have a maximum width of 1280px on desktop to maintain readability, while background elements can bleed to the edges.

A 12-column grid is utilized with a generous 24px gutter to reflect the "spacious cafe" feel. Spacing is strictly based on an 8px scale. For mobile, margins should shrink to 16px to maximize screen real estate, while maintaining the same 24px vertical rhythm between sections.

## Elevation & Depth
This design system avoids heavy shadows. Depth is primarily communicated through **Tonal Layering** and **Soft Ambient Occlusion**.
- **Surfaces:** Use a subtle "inset" look for form fields and a "raised" look for primary cards.
- **Shadows:** When necessary, use extremely soft, diffused shadows with a tint of the Primary color (e.g., `#a67c52` at 8% opacity) rather than pure black. This maintains the "warm" atmosphere.
- **Glassmorphism:** Use sparingly for navigation overlays. Use a high blur (20px+) and a warm-tinted white (`#ffffff` at 70% opacity) to simulate frosted glass in a sunlit room.

## Shapes
Shapes are "Rounded," providing a friendly and organic feel without appearing childish. 
- **Standard UI (Buttons, Inputs):** 0.5rem (8px) radius.
- **Large Containers (Cards, Modals):** 1.5rem (24px) radius to emphasize the soft, welcoming nature of the interface.
- **Interactive States:** When hovered, buttons may transition to a slightly higher roundedness to provide tactile feedback.

## Components
- **Buttons:** Primary buttons use a solid Wood Brown (#a67c52) with white text. Secondary buttons use an outline style with 1.5px border thickness.
- **Cards:** Cards should have no border, using a subtle background shift (a slightly darker cream) and a very soft, tinted ambient shadow to float off the page.
- **Input Fields:** Use a "warm-grey" border (1px) that darkens when focused. Backgrounds of inputs should be slightly lighter than the surrounding surface to indicate interactivity.
- **Chips/Tags:** Use the Secondary Sage color at low opacity (15%) for backgrounds with dark green text to signify categories or filters.
- **Navigation:** The top navigation should be clean with high vertical padding (24px), using a "pill-shaped" active state indicator for menu items.
- **Dividers:** Use a very thin (1px) line in a light tan color to separate content without creating harsh visual breaks.