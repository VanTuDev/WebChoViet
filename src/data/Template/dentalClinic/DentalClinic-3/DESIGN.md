---
name: Clinical Clarity
colors:
  surface: '#fbf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#414754'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0f0'
  outline: '#717786'
  outline-variant: '#c1c6d7'
  surface-tint: '#005bc0'
  primary: '#0059bb'
  on-primary: '#ffffff'
  primary-container: '#0070ea'
  on-primary-container: '#fefcff'
  inverse-primary: '#adc7ff'
  secondary: '#54606a'
  on-secondary: '#ffffff'
  secondary-container: '#d8e4f1'
  on-secondary-container: '#5a6671'
  tertiary: '#5a5c5d'
  on-tertiary: '#ffffff'
  tertiary-container: '#737576'
  on-tertiary-container: '#fcfdfe'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc7ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004493'
  secondary-fixed: '#d8e4f1'
  secondary-fixed-dim: '#bcc8d4'
  on-secondary-fixed: '#111d26'
  on-secondary-fixed-variant: '#3d4852'
  tertiary-fixed: '#e1e3e4'
  tertiary-fixed-dim: '#c5c7c8'
  on-tertiary-fixed: '#191c1d'
  on-tertiary-fixed-variant: '#454748'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  caption:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1200px
  gutter: 24px
  section-padding-desktop: 80px
  section-padding-mobile: 40px
---

## Brand & Style
The design system is built for a premium dental environment, focusing on trust, hygiene, and modern medical excellence. The aesthetic follows a **Corporate / Modern** style with subtle **Minimalist** influences to ensure information is easily digestible for patients.

The emotional response should be one of calm and confidence. We use ample white space to signify cleanliness and a structured layout to demonstrate professional precision. Visual elements avoid clutter, utilizing thin icons and clear photographic backgrounds to create a welcoming, "high-tech yet human" atmosphere.

## Colors
The palette is rooted in medical reliability.
- **Primary Blue (#007BFF):** Used for primary actions, branding, and highlighting key information. It represents authority and health.
- **Secondary Blue (#E6F2FF):** A soft wash used for section backgrounds and hover states to maintain the clinical theme without being aggressive.
- **Surface Neutrals:** Pure white (#FFFFFF) is the primary surface color to emphasize sterility. Light grays (#F8F9FA) provide subtle depth for container backgrounds.
- **Text:** High-contrast dark gray (#333333) ensures readability, while a lighter gray (#666666) is reserved for secondary metadata and captions.

## Typography
This design system utilizes **Manrope** for its modern, balanced, and highly legible characteristics. The geometric nature of the font aligns with the precision of dental care.

Headlines use a bold weight to establish clear information hierarchy. Body text is set with generous line height (1.5x) to ensure comfortably readable content, especially for clinical descriptions and service details. For Vietnamese characters, ensure the font handles diacritics with proper vertical clearance.

## Layout & Spacing
The system uses a **Fixed Grid** approach for desktop (1200px max-width) to maintain a controlled, professional appearance. 

- **Grid:** 12-column system for desktop, 4-column for mobile.
- **Vertical Rhythm:** A base 8px unit governs all spacing. Section gaps are generous (80px) to give the content "room to breathe," reflecting a calm clinic environment.
- **Mobile Adaption:** Service cards stack vertically. Horizontal carousels (for testimonials) allow for touch-swipe interaction with visible pagination dots.

## Elevation & Depth
Depth is created using **Tonal Layers** and **Ambient Shadows** to suggest a clean, multi-layered interface.

- **Low Elevation:** Cards and UI containers use a very soft, diffused shadow (0px 4px 20px rgba(0, 123, 255, 0.08)) to appear slightly lifted from the background without creating harsh edges.
- **Structural Outlines:** Subtle 1px borders in a light blue-gray are used for table rows and input fields to maintain grid alignment without heavy visual weight.
- **Backgrounds:** Alternating between white and very light blue (#F0F7FF) sections helps differentiate content areas like "Services" and "Pricing."

## Shapes
Shapes are **Rounded** (0.5rem base) to soften the clinical aesthetic and make the clinic feel more approachable and less "sharp."

- **Buttons:** Rounded-md for a stable, professional feel.
- **Cards:** Rounded-lg (1rem) for service and testimonial cards to create a modern container look.
- **Input Fields:** Standardized with rounded-md corners for consistency with buttons.

## Components
- **Service Cards:** Feature a top-aligned blue icon, bold headline (headline-md), and short description. Include a "Tìm hiểu thêm" (Learn more) text link with a chevron.
- **Pricing Tables:** Use a clean, tabular layout. Headers should have a light blue background (#E6F2FF). Alternate row colors are not needed; use subtle 1px dividers instead.
- **Testimonial Carousel:** Cards containing a circular patient avatar, star rating, 5-line limit quote, and patient name. Navigation arrows should be placed on the sides or as centered dots below.
- **Buttons:** 
    - *Primary:* Solid Blue (#007BFF) with white text.
    - *Secondary:* Ghost style with blue border and text.
- **Footer:** Two-column layout on tablet+. Left side contains contact info and social links; right side features an embedded Google Map with a customized light-blue styling to match the brand.
- **Sticky CTA:** A floating "Đặt lịch khám" (Book Appointment) button should remain accessible on mobile for high conversion.