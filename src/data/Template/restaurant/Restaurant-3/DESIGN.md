---
name: Sizzling Hearth
colors:
  surface: '#fcf9f2'
  surface-dim: '#dcdad3'
  surface-bright: '#fcf9f2'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ec'
  surface-container: '#f0eee7'
  surface-container-high: '#ebe8e1'
  surface-container-highest: '#e5e2db'
  on-surface: '#1c1c18'
  on-surface-variant: '#5a403e'
  inverse-surface: '#31312c'
  inverse-on-surface: '#f3f0ea'
  outline: '#8e706d'
  outline-variant: '#e2beba'
  surface-tint: '#b52424'
  primary: '#8f000d'
  on-primary: '#ffffff'
  primary-container: '#b22222'
  on-primary-container: '#ffc8c2'
  inverse-primary: '#ffb4ac'
  secondary: '#795900'
  on-secondary: '#ffffff'
  secondary-container: '#ffbf00'
  on-secondary-container: '#6d5000'
  tertiary: '#454545'
  on-tertiary: '#ffffff'
  tertiary-container: '#5d5c5c'
  on-tertiary-container: '#d7d5d4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad6'
  primary-fixed-dim: '#ffb4ac'
  on-primary-fixed: '#410003'
  on-primary-fixed-variant: '#92030f'
  secondary-fixed: '#ffdfa0'
  secondary-fixed-dim: '#fbbc00'
  on-secondary-fixed: '#261a00'
  on-secondary-fixed-variant: '#5c4300'
  tertiary-fixed: '#e4e2e1'
  tertiary-fixed-dim: '#c8c6c6'
  on-tertiary-fixed: '#1b1c1c'
  on-tertiary-fixed-variant: '#474747'
  background: '#fcf9f2'
  on-background: '#1c1c18'
  surface-variant: '#e5e2db'
typography:
  display-lg:
    fontFamily: Lexend
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Lexend
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
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
  label-md:
    fontFamily: Lexend
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
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
  gutter-xs: 8px
  gutter-md: 16px
  gutter-lg: 24px
  margin-mobile: 16px
  margin-desktop: 48px
  container-max-width: 1200px
---

## Brand & Style

This design system centers on the communal and sensory experience of the hot pot—the steam, the vibrant spices, and the shared warmth of the table. The aesthetic is **Vibrant Modern-Tactile**, blending high-energy colors with soft, approachable shapes that evoke a sense of hospitality and "home-cooked" authenticity.

The target audience ranges from young social groups seeking an energetic night out to families looking for a cozy, reliable meal. The UI should feel "delicious"—using high-contrast imagery and warm background tones to stimulate appetite and evoke the literal glow of a simmering broth. It avoids corporate coldness in favor of a dense, lively layout that mirrors the organized chaos of a hot pot feast.

## Colors

The palette is driven by the ingredients and the atmosphere of a traditional broth house.
- **Primary (Chili Red):** Used for critical actions, branding, and highlighting "spicy" or "signature" menu items. It represents energy and appetite.
- **Secondary (Warm Amber):** Used for accents, ratings, and promotional highlights. This color provides the "glow" of the interior lighting and the golden hue of fried accompaniments.
- **Tertiary (Charcoal Grey):** Used for primary text and structural elements like borders or heavy buttons, grounding the design like a heavy cast-iron pot.
- **Neutral (Cream White):** The background is not a sterile white but a warm, paper-like cream (#FCF9F2) to enhance the coziness and make food photography pop.

## Typography

The design system exclusively utilizes **Lexend**. Chosen for its exceptional readability and friendly, geometric construction, Lexend scales perfectly from large, impactful "Today's Specials" headlines to dense, small-print ingredient lists.

Headlines should use Bold (700) or SemiBold (600) weights to command attention against vibrant backgrounds. Body text is kept at a comfortable 16px or 18px to ensure accessibility for all diners. Letter spacing is slightly tightened on large display type to create a more "editorial" and premium feel.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid with Generous Safe Zones**. 

- **Desktop:** A 12-column grid with 24px gutters. Content is centered in a container to maintain a "tabletop" focus.
- **Mobile:** A 4-column grid with 16px gutters and margins.
- **Spacing Rhythm:** Based on a 4px baseline. Components use 16px (gutter-md) for internal padding to ensure they feel substantial and easy to interact with during a busy dining experience. Elements should feel "packed" but organized, reflecting a table full of small plates.

## Elevation & Depth

To mimic the physical layers of a table setting, this design system uses **Tonal Layers with Ambient Shadows**.

- **Level 0 (Surface):** The Cream White background.
- **Level 1 (Plates):** White or slightly lighter cream cards used for menu items. These have a very soft, diffused shadow (8% opacity Charcoal) to make them appear slightly raised.
- **Level 2 (Modals/Pop-overs):** Used for ingredient selection or cart views. These feature a stronger shadow and a subtle inner stroke (1px) in Chili Red or Amber to draw the eye.
- **Interactive Depth:** On hover, buttons and cards should "lift" slightly (increase shadow spread) to provide tactile feedback, suggesting the element is ready to be "picked up."

## Shapes

The shape language is **Rounded**, reflecting the organic curves of bowls, pots, and spoons. 

- **Base Radius (0.5rem):** Applied to standard buttons, input fields, and small cards.
- **Large Radius (1rem):** Used for main container cards and featured banners.
- **Circular/Pill:** Used for "Add to Order" buttons and category chips, echoing the shape of soup ladles and rounded ingredients like fish balls or mushrooms. 

Avoid sharp 90-degree corners to maintain the welcoming, cozy brand voice.

## Components

### Buttons
- **Primary:** Chili Red background with white text. High-contrast and bold.
- **Secondary:** Charcoal Grey outline with Charcoal text for "Back" or "Cancel" actions.
- **Tertiary:** Warm Amber background for "Special Offers" or "Loyalty Points."

### Cards (Menu Items)
Menu cards must feature high-resolution food photography. The text overlay should use a Charcoal-to-transparent gradient at the bottom for legibility. Include a "Heat Level" indicator using small chili icons in Primary Red.

### Chips (Ingredients/Categories)
Small, pill-shaped elements with the Neutral background and a thin Charcoal border. When selected, they flip to a Solid Chili Red or Warm Amber background.

### Input Fields
Soft-rounded (0.5rem) with a subtle cream fill. The focus state uses a 2px Amber border to create a "glowing" effect around the active field.

### Lists (Order Summary)
Clean, text-heavy lists using Lexend Medium for item names and Charcoal Grey for prices. Use dashed dividers to evoke a traditional receipt or paper menu style.

### Steppers (Quantity Selector)
Crucial for hot pot ordering (e.g., "3x Beef Slices"). Use large, tactile "+" and "-" buttons in Charcoal Grey with the count in the middle for high visibility.