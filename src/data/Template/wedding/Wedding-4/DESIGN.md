---
name: Lễ Thành Hôn
colors:
  surface: '#fdf9f1'
  surface-dim: '#dddad2'
  surface-bright: '#fdf9f1'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f3eb'
  surface-container: '#f1ede5'
  surface-container-high: '#ece8e0'
  surface-container-highest: '#e6e2da'
  on-surface: '#1c1c17'
  on-surface-variant: '#4e4639'
  inverse-surface: '#31302b'
  inverse-on-surface: '#f4f0e8'
  outline: '#7f7667'
  outline-variant: '#d1c5b4'
  surface-tint: '#775a19'
  primary: '#775a19'
  on-primary: '#ffffff'
  primary-container: '#c5a059'
  on-primary-container: '#4e3700'
  inverse-primary: '#e9c176'
  secondary: '#6b5b52'
  on-secondary: '#ffffff'
  secondary-container: '#f1dbd0'
  on-secondary-container: '#705f56'
  tertiary: '#485e8b'
  on-tertiary: '#ffffff'
  tertiary-container: '#8fa5d6'
  on-tertiary-container: '#233a65'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea5'
  primary-fixed-dim: '#e9c176'
  on-primary-fixed: '#261900'
  on-primary-fixed-variant: '#5d4201'
  secondary-fixed: '#f4ded3'
  secondary-fixed-dim: '#d7c2b7'
  on-secondary-fixed: '#241912'
  on-secondary-fixed-variant: '#52443b'
  tertiary-fixed: '#d8e2ff'
  tertiary-fixed-dim: '#b0c6f9'
  on-tertiary-fixed: '#001a41'
  on-tertiary-fixed-variant: '#304671'
  background: '#fdf9f1'
  on-background: '#1c1c17'
  surface-variant: '#e6e2da'
  parchment: '#F5F1E9'
  antique-gold: '#C5A059'
  ebony-wood: '#6B5B52'
  soft-olive: '#8B8C74'
typography:
  display-wedding:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-wedding-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Source Serif 4
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Source Serif 4
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Source Serif 4
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.0'
    letterSpacing: 0.1em
spacing:
  unit: 8px
  margin-safe: 32px
  gutter: 24px
  section-gap: 80px
---

## Brand & Style
The design system centers on the concept of "Timeless Heritage." It is crafted for couples seeking a sophisticated, romantic, and deeply traditional aesthetic for their wedding digital presence and physical stationery.

The style is **Minimalist-Classical**. It prioritizes heavy whitespace (the parchment texture), high-quality serif typography, and delicate botanical motifs. The emotional response should be one of warmth, reverence, and understated luxury. We avoid modern glossy effects in favor of tactile, organic textures and a palette that feels like heirloom paper and gold leaf.

## Colors
The palette is inspired by natural materials and traditional Vietnamese aesthetics. 

- **Primary (Antique Gold):** Used for accents, borders, and decorative illustrations. It represents prosperity and elegance.
- **Secondary (Ebony Wood):** The primary color for all text and structural lines, ensuring high legibility against the cream background while feeling softer than pure black.
- **Neutral (Parchment):** The foundation of the system. This is not a flat hex code but should be implemented with a subtle, non-distracting paper grain texture.
- **Named Color (Soft Olive):** To be used sparingly for botanical illustrations (leaves and stems) to complement the gold and brown.

## Typography
The typography is the soul of this design system. We use a combination of classic serifs to evoke the "Hoàng Nam & Thảo Vy" literary aesthetic.

- **Display & Headlines:** `Libre Caslon Text` provides a refined, historical feel with its elegant curves and high contrast. It should be used for the names of the couple and section headers.
- **Body & Labels:** `Source Serif 4` is used for long-form details, addresses, and logistical information. It is highly legible and maintains the scholarly, traditional atmosphere without being overly ornate.
- **Styling Note:** For the most prominent display text (e.g., the couple's names), use "Antique Gold." All other informational text should remain in "Ebony Wood."

## Layout & Spacing
The layout follows a **Fixed Grid** approach that mimics the proportions of a physical wedding card. On desktop, content is centered within a 12-column grid with generous outer margins to simulate the invitation being placed on a table.

- **Rhythm:** Use an 8px base unit. Spacing should be generous; "breathing room" is a luxury indicator in this system.
- **Mobile:** Transition to a single-column layout with 24px side margins. Botanical illustrations should reflow to sit at the top and bottom of the viewport, acting as a frame for the text.
- **Alignment:** Central alignment is preferred for all primary invitation text. Left alignment is reserved for auxiliary details like "Order of Events" or RSVP forms.

## Elevation & Depth
Depth is achieved through **Tonal Layering** and **Subtle Shadows** rather than high-tech blurs.

- **Layers:** Use the Parchment texture as the base. Higher-level cards (like an RSVP modal or a "Save the Date" popup) should use a slightly lighter version of the parchment with a very soft, diffused shadow (15% opacity Ebony Wood, 20px blur) to suggest a physical piece of paper floating slightly above the background.
- **Outlines:** Use thin (1px) solid lines in "Antique Gold" to frame important content. Double-line borders are encouraged for a more "Imperial" Vietnamese look.

## Shapes
This design system utilizes **Sharp** edges for a formal, traditional look. Rectangles and squares mirror the cut of high-quality cardstock. 

Occasional use of organic shapes is permitted only through the botanical illustrations. Interactive elements like buttons should remain perfectly rectangular with thin borders to maintain the architectural integrity of the classic layout.

## Components
- **Buttons:** Rectangular with a 1px Antique Gold border. Background is transparent. Text is "Label-Caps" in Ebony Wood. On hover, the background fills with a very faint tint of Gold.
- **Cards:** Use a double-line border (one thick, one thin) in Antique Gold. The background should always be the parchment texture.
- **Inputs:** Simple bottom-border only in Ebony Wood. Labeling should be in "Source Serif 4" small-caps.
- **Botanical Illustrations:** These should be hand-drawn style, placed in corners or used as dividers between sections. They must be SVG or high-res PNGs with transparency, tinted in Gold or Soft Olive.
- **Dividers:** Use a single horizontal line with a small botanical "leaf" icon in the center rather than a plain rule.