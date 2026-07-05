---
name: Saffron & Silk
colors:
  surface: '#fff8f4'
  surface-dim: '#e8d7c9'
  surface-bright: '#fff8f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fff1e7'
  surface-container: '#fdebdc'
  surface-container-high: '#f7e5d7'
  surface-container-highest: '#f1dfd1'
  on-surface: '#231a11'
  on-surface-variant: '#554434'
  inverse-surface: '#392f25'
  inverse-on-surface: '#ffeee0'
  outline: '#887361'
  outline-variant: '#dbc2ad'
  surface-tint: '#8a5100'
  primary: '#8a5100'
  on-primary: '#ffffff'
  primary-container: '#ff9900'
  on-primary-container: '#653a00'
  inverse-primary: '#ffb86f'
  secondary: '#a63b00'
  on-secondary: '#ffffff'
  secondary-container: '#ff5e00'
  on-secondary-container: '#531900'
  tertiary: '#3b6934'
  on-tertiary: '#ffffff'
  tertiary-container: '#8cbe80'
  on-tertiary-container: '#204d1c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdcbd'
  primary-fixed-dim: '#ffb86f'
  on-primary-fixed: '#2c1600'
  on-primary-fixed-variant: '#693c00'
  secondary-fixed: '#ffdbce'
  secondary-fixed-dim: '#ffb599'
  on-secondary-fixed: '#370e00'
  on-secondary-fixed-variant: '#7f2b00'
  tertiary-fixed: '#bcf0ae'
  tertiary-fixed-dim: '#a1d494'
  on-tertiary-fixed: '#002201'
  on-tertiary-fixed-variant: '#23501e'
  background: '#fff8f4'
  on-background: '#231a11'
  surface-variant: '#f1dfd1'
typography:
  display:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Lexend
    fontSize: 28px
    fontWeight: '600'
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
  label-md:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Lexend
    fontSize: 12px
    fontWeight: '600'
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
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system captures the vibrant energy and refined elegance of contemporary Thai hospitality. The brand personality is welcoming, flavorful, and sophisticated, aiming to evoke the warmth of a tropical sunset and the intricate craftsmanship of Thai heritage.

The visual style is **Tropical Minimalist with Decorative Accents**. It balances clean, functional layouts with rich, tactile details inspired by Thai silk weaving and the tiered rooflines of traditional architecture. 

**Key Brand Attributes:**
- **Vibrant & Energetic:** Using high-chroma accents to stimulate appetite and interest.
- **Crafted & Elegant:** Utilizing fine lines and patterns to suggest quality and attention to detail.
- **Warm & Approachable:** Combining soft shadows with organic spacing to create an inviting digital environment.

## Colors

The palette is anchored by the glow of Saffron Gold and Sunset Orange, representing heat, spices, and spirit.

- **Primary (Saffron Gold):** Used for primary actions, highlights, and active states. It should feel radiant against light backgrounds.
- **Secondary (Sunset Orange):** Used for emphasis, promotions, and price tags to create a "zesty" visual hierarchy.
- **Tertiary (Lotus Leaf):** A deep, earthy green used for decorative elements, success states, and healthy menu categories to balance the warmth of the oranges.
- **Neutral (Teak):** A warm, dark charcoal-brown used for primary text and borders, avoiding the harshness of pure black to maintain a natural, wooden feel.
- **Background:** A soft cream (#FFFBF5) serves as the primary canvas to reduce eye strain and enhance the "premium paper menu" feel.

## Typography

This design system utilizes **Lexend** exclusively to ensure maximum readability and a modern, geometric feel that contrasts beautifully with traditional decorative patterns.

- **Headlines:** Use Bold and SemiBold weights. Large displays should have a slight negative letter-spacing to feel more compact and impactful, reminiscent of modern editorial design.
- **Body:** Use Regular weight for optimal legibility in menu descriptions. Maintain generous line heights to evoke a sense of "breathable" luxury.
- **Labels:** Use Medium weight and slight letter-spacing for UI micro-copy (buttons, tags, and categories).

## Layout & Spacing

The layout follows a **Fluid Grid** model with a focus on vertical rhythm and "white space as a luxury."

- **Desktop:** 12-column grid with 64px outer margins. Content containers for long-form text (like "Our Story") should be centered and restricted to 8 columns for readability.
- **Mobile:** 4-column grid with 16px outer margins.
- **Spacing Logic:** All spacing must be a multiple of 8px. Use larger gaps (stack-lg) between distinct menu sections (e.g., Starters vs. Mains) to create a clear visual break.
- **Decorative Breaks:** Use thin horizontal rules or silk-inspired pattern dividers to separate sections rather than heavy boxes.

## Elevation & Depth

To maintain an elegant and tropical feel, the design system avoids heavy shadows in favor of **Tonal Layers** and **Soft Ambient Occlusion**.

- **Surface Tiers:** Use subtle color shifts (from Cream to a slightly darker Sand) to define card backgrounds.
- **Shadows:** Only used for "floating" elements like FABs (Floating Action Buttons) or sticky carts. Use a very soft, diffused shadow: `0 8px 24px rgba(74, 63, 53, 0.08)`.
- **Outlines:** Use low-contrast 1px borders in the neutral "Teak" color at 10% opacity for input fields and card boundaries.
- **Patterns:** Apply low-opacity (5%) Thai silk patterns to the lowest background layer to provide depth without cluttering the content.

## Shapes

The shape language is **Rounded and Organic**, echoing the soft curves of lotus petals and traditional Thai ceramics.

- **Base Radius:** 8px for standard components (buttons, input fields, cards).
- **Large Radius:** 16px for prominent containers like featured menu items or modal overlays.
- **Circular Elements:** Use fully pill-shaped (999px) containers for status chips and category filters.
- **Architectural Accents:** Occasional use of 45-degree clipped corners on large hero images can be used to subtly reference the peaked roofs of Thai architecture.

## Components

### Buttons
- **Primary:** Saffron Gold background with White text. Bold weight. 8px corner radius. High-impact for "Order Now" or "Book a Table."
- **Secondary:** Transparent background with Saffron Gold 2px border and text.
- **Tertiary:** Teak text with no background, used for "Cancel" or "View Details."

### Cards (Menu Items)
- **Structure:** Large image at the top (8px radius), followed by the dish name in Headline-MD, and price in Secondary color.
- **Interaction:** On hover, the image should scale slightly (1.05x) and the card should gain a soft ambient shadow.

### Inputs & Selection
- **Inputs:** Soft cream background with a 1px Teak-10% border. Transitions to a 2px Saffron Gold border on focus.
- **Checkboxes:** Rounded squares with a Sunset Orange fill when active.

### Specialized Components
- **Silk Dividers:** Thin horizontal lines featuring a subtle repeating geometric pattern.
- **Spice Level Indicator:** Custom icons (Chilis) using the Sunset Orange color to indicate heat levels.
- **Dietary Tags:** Small pill-shaped chips using the Tertiary (Green) color for Vegan/Gluten-Free options.