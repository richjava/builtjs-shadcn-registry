# Design System System Documentation

This document provides comprehensive definitions and guidelines for the four design systems available in the BuiltJS Shadcn Registry.

## Overview

The registry supports four distinct design systems, each targeting specific client types and use cases that digital agency designers commonly encounter.

## Design System Definitions

### Standard Design System
- **Name**: `standard`
- **Label**: "Standard"
- **Description**: "Clean, modern standard design with balanced design elements"
- **Target Audience**: General-purpose, professional websites
- **Characteristics**: Balanced, accessible, versatile

#### Design Principles
- Uses primary brand colors with shadcn/ui palette
- Balanced typography weights (font-bold, font-semibold)
- Standard spacing (py-20, mb-12, gap-8)
- Moderate effects (hover:shadow-lg, transition-colors)
- Professional and accessible design

#### Use Cases
- General business websites
- Professional services
- Corporate websites
- Versatile applications where brand flexibility is important

#### Example Classes
```css
/* Typography */
text-3xl font-bold mb-6
text-xl text-muted-foreground

/* Spacing */
py-20
mb-12
gap-8

/* Buttons */
bg-primary hover:bg-primary/90
border border-input hover:bg-accent
```

---

### Minimal Design System
- **Name**: `minimal`
- **Label**: "Minimal"
- **Description**: "Clean, modern minimal design with clean lines and minimal elements"
- **Target Audience**: High-end brands, luxury products, premium services
- **Characteristics**: Ultra-clean, sophisticated, subtle

#### Design Principles
- Light font weights (font-thin, font-light)
- Generous white space (py-40, py-32)
- Subtle colors (gray-900, gray-600, gray-500)
- Clean typography with tracking-tight
- Minimal icons and subtle hover effects

#### Use Cases
- Luxury brands
- Premium services
- High-end products
- Sophisticated clients who value elegance over flashiness
- Minimalist design preferences

#### Example Classes
```css
/* Typography */
text-6xl font-thin mb-12 text-gray-900 tracking-tight
text-xl text-gray-600 font-light leading-relaxed

/* Spacing */
py-40 bg-white
mb-32
gap-16

/* Buttons */
bg-gray-900 hover:bg-gray-800 text-white px-12 py-4 text-lg font-light
border-gray-300 text-gray-700 hover:bg-gray-50 px-12 py-4 text-lg font-light

/* Stats */
text-5xl font-thin text-gray-900 mb-3 tracking-tight
text-sm text-gray-500 font-light tracking-wider uppercase
```

---

### Bold Design System
- **Name**: `bold`
- **Label**: "Bold"
- **Description**: "Clean, modern bold design with vibrant colors and strong typography"
- **Target Audience**: Creative agencies, tech startups, innovative brands
- **Characteristics**: High-impact, vibrant, dynamic

#### Design Principles
- Heavy font weights (font-black, font-bold)
- **Strategic use of bold backgrounds** - only for hero/landing sections
- **Subtle bold approach** for content sections (light gradients, white backgrounds)
- Dynamic effects (hover:scale-105, transform, shadow-2xl)
- Vibrant buttons and interactive elements
- Gradient text effects and decorative elements

#### **Important: Bold Background Strategy**
Not all bold templates should have bold background colors. This ensures:
- **Site cohesion** when mixing different design system templates
- **Visual hierarchy** is maintained across the entire site
- **Only select templates** (hero sections, landing pages) use bold backgrounds
- **Content sections** (mission statements, values, etc.) use subtle bold styling

#### Use Cases
- Creative agencies
- Tech startups
- Innovative brands
- Companies wanting to stand out
- Modern, cutting-edge brands

#### Example Classes
```css
/* Typography */
text-7xl font-black mb-8 text-white tracking-tight
text-2xl text-blue-100 font-medium leading-relaxed

/* Bold Backgrounds (Hero/Landing only) */
py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900

/* Subtle Bold Backgrounds (Content sections) */
py-32 bg-white
bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-blue-200

/* Buttons */
bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white px-16 py-6 text-xl font-bold shadow-2xl transform hover:scale-105

/* Stats */
text-6xl font-black text-white mb-4 tracking-tight bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent
```

---

### Neobrutalism Design System
- **Name**: `neobrutalism`
- **Label**: "Neobrutalism"
- **Description**: "Clean, modern neobrutalism design with raw, unpolished aesthetics"
- **Target Audience**: Creative portfolios, experimental brands, design-forward projects
- **Characteristics**: Raw, unpolished, high-contrast

#### Design Principles
- **High Contrast & Bright Colors**: Bold black (#000000), Electric blue (#00BFFF), Neon green (#00FF00)
- **Thick Lines & Geometric Shapes**: 4-8px solid borders on key elements
- **Stark Drop Shadows**: Solid, single-color shadows (not gradients) with 4px offset
- **Bold Typography**: Bold, quirky sans-serif fonts with generous padding
- **Skeuomorphic Elements**: Retro UI, monospace fonts, pixel art, raw aesthetics

#### Use Cases
- Creative agencies
- Tech startups
- Portfolio sites
- Brand launches
- Creative showcases

#### Example Classes
```css
/* Neobrutalism Button Example */
.neobrutalism-button {
  background: #00BFFF;
  color: #000000;
  border: 4px solid #000000;
  box-shadow: 4px 4px 0px #000000;
  font-weight: 700;
  padding: 16px 32px;
  font-size: 16px;
}

.neobrutalism-button:hover {
  background: #00FF00;
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0px #000000;
}

/* Cards */
.neobrutalism-card {
  background: #FFFFFF;
  border: 4px solid #000000;
  box-shadow: 4px 4px 0px #000000;
  padding: 24px;
  border-radius: 0;
}
```

## Design System Selection Guidelines

### When to Use Standard Design System
- Client has no specific design preferences
- Need maximum versatility and accessibility
- Corporate or professional services
- Budget-conscious projects
- Quick turnaround requirements

### When to Use Minimal Design System
- Luxury or premium brand positioning
- Sophisticated target audience
- High-end products or services
- Client values elegance and simplicity
- Brand guidelines emphasize minimalism

### When to Use Bold Design System
- Creative or innovative brand
- Tech startup or modern company
- Need to stand out from competitors
- Target audience is design-savvy
- Brand guidelines emphasize impact and energy

### When to Use Neobrutalism Design System
- Creative portfolios or experimental brands
- Design-forward projects
- Need to make a bold statement
- Target audience appreciates raw aesthetics
- Brand guidelines emphasize authenticity and boldness

## Implementation Notes

### Design System Assignment
- All templates automatically get "standard" design system by default
- Design system is specified in registry files
- Build system assigns design system during registry generation
- Design system filtering is available in the header dropdown

### Template Categorization for Bold Design System
When creating bold design system templates, consider the template's role:

#### **Hero/Landing Templates** (Use Bold Backgrounds)
- Main landing sections
- Hero banners
- Primary call-to-action sections
- These can use dark gradients and bold backgrounds

#### **Content Templates** (Use Subtle Bold Styling)
- Mission statements
- Values sections
- Team sections
- About content
- These should use light backgrounds with bold typography and vibrant elements

### Customization
- Each design system can be customized by modifying the component files
- Design system-specific classes should be maintained for consistency
- New design systems can be added by extending the design system system
- **Follow the bold background strategy** when creating new bold templates

### Best Practices
- Maintain consistent spacing and typography within each design system
- Test accessibility across all design systems
- Ensure responsive design works with all design system variations
- Document any design system-specific customizations
- **Ensure site cohesion** when mixing different design system templates

## File Structure

```
blocks/
├── {module}/
│   └── {section}/
│       ├── {designSystem}/         # Standard design system
│       ├── minimal-{designSystem}/ # Minimal design system
│       ├── bold-{designSystem}/    # Bold design system
│       └── neobrutalism-{designSystem}/ # Neobrutalism design system
```

## Registry Configuration

Design systems are defined in `registry.json`:

```json
{
  "designSystems": [
    {
      "name": "standard",
      "label": "Standard",
      "description": "Clean, modern standard design with balanced design elements"
    },
    {
      "name": "minimal",
      "label": "Minimal", 
      "description": "Clean, modern minimal design with clean lines and minimal elements"
    },
    {
      "name": "bold",
      "label": "Bold",
      "description": "Clean, modern bold design with vibrant colors and strong typography"
    },
    {
      "name": "neobrutalism",
      "label": "Neobrutalism",
      "description": "Clean, modern neobrutalism design with raw, unpolished aesthetics"
    }
  ]
}
```

## Contributing

When adding new templates:

1. Create design system variations following the established patterns
2. Maintain consistency within each design system
3. Test all design system variations
4. Update this documentation if adding new design systems
5. Follow the naming convention: `{designSystem}-{template}` for variations

---

*Last updated: January 2025*