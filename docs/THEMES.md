# Theme System Documentation

This document provides comprehensive definitions and guidelines for the three themes available in the BuiltJS Shadcn Registry.

## Overview

The registry supports three distinct design themes, each targeting specific client types and use cases that digital agency designers commonly encounter.

## Theme Definitions

### Standard Theme
- **Name**: `standard`
- **Label**: "Standard"
- **Description**: "Clean, modern design with shadcn/ui components"
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

### Minimal Theme
- **Name**: `minimal`
- **Label**: "Minimal"
- **Description**: "Ultra-clean, sophisticated design with subtle typography and spacing"
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

### Bold Theme
- **Name**: `bold`
- **Label**: "Bold"
- **Description**: "High-impact design with vibrant colors and dynamic layouts"
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
- **Site cohesion** when mixing different theme templates
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

## Theme Selection Guidelines

### When to Use Standard Theme
- Client has no specific design preferences
- Need maximum versatility and accessibility
- Corporate or professional services
- Budget-conscious projects
- Quick turnaround requirements

### When to Use Minimal Theme
- Luxury or premium brand positioning
- Sophisticated target audience
- High-end products or services
- Client values elegance and simplicity
- Brand guidelines emphasize minimalism

### When to Use Bold Theme
- Creative or innovative brand
- Tech startup or modern company
- Need to stand out from competitors
- Target audience is design-savvy
- Brand guidelines emphasize impact and energy

## Implementation Notes

### Theme Assignment
- All templates automatically get "standard" theme by default
- Theme is specified in `block.json` files
- Build system assigns theme during registry generation
- Theme filtering is available in the header dropdown

### Template Categorization for Bold Theme
When creating bold theme templates, consider the template's role:

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
- Each theme can be customized by modifying the component files
- Theme-specific classes should be maintained for consistency
- New themes can be added by extending the theme system
- **Follow the bold background strategy** when creating new bold templates

### Best Practices
- Maintain consistent spacing and typography within each theme
- Test accessibility across all themes
- Ensure responsive design works with all theme variations
- Document any theme-specific customizations
- **Ensure site cohesion** when mixing different theme templates

## File Structure

```
blocks/
├── {category}/
│   └── {section}/
│       ├── {template}/           # Standard theme
│       ├── minimal-{template}/   # Minimal theme
│       └── bold-{template}/      # Bold theme
```

## Registry Configuration

Themes are defined in `registry.json`:

```json
{
  "themes": [
    {
      "name": "standard",
      "label": "Standard",
      "description": "Clean, modern design with shadcn/ui components"
    },
    {
      "name": "minimal",
      "label": "Minimal", 
      "description": "Ultra-clean, sophisticated design with subtle typography and spacing"
    },
    {
      "name": "bold",
      "label": "Bold",
      "description": "High-impact design with vibrant colors and dynamic layouts"
    }
  ]
}
```

## Contributing

## Neobrutalism Theme

### Definition
Neobrutalism is a raw, unpolished design aesthetic that embraces bold contrasts, thick borders, stark shadows, and intentionally "unfinished" elements. It's characterized by high-impact visuals that prioritize functionality and authenticity over polish.

### Key Characteristics

#### **High Contrast & Bright Colors**
- **Primary Colors**: Bold black (#000000), Electric blue (#00BFFF), Neon green (#00FF00)
- **Background**: Pure white (#FFFFFF) with strategic color blocks
- **Text**: High-contrast combinations ensuring accessibility
- **Accent Colors**: Vibrant, saturated hues for CTAs and highlights

#### **Thick Lines & Geometric Shapes**
- **Borders**: 4-8px solid borders on key elements
- **Shapes**: Angular, geometric layouts with sharp corners
- **Lines**: Bold, solid dividers and separators
- **Layout**: Grid-based, structured arrangements

#### **Stark Drop Shadows**
- **Shadow Style**: Solid, single-color shadows (not gradients)
- **Offset**: 4px horizontal and vertical offset
- **Color**: Black (#000000) shadows for depth
- **Usage**: Applied to cards, buttons, and key elements

#### **Bold Typography**
- **Headings**: Bold, quirky sans-serif fonts (Inter Bold, Montserrat Bold)
- **Body Text**: Clean, readable fonts (Roboto, Inter)
- **Whitespace**: Generous padding (24-32px) for breathing room
- **Hierarchy**: Clear size variations (headlines 2x larger than body)

#### **Skeuomorphic Elements**
- **Retro UI**: Windows 98-style buttons and interfaces
- **Monospace Fonts**: For technical or nostalgic elements
- **Pixel Art**: Occasional pixel-style graphics
- **Raw Aesthetics**: Intentionally "unfinished" look

### Design Principles

#### **Usability First**
- Clear, recognizable buttons and interactive elements
- Readable text with proper contrast ratios
- Ample whitespace to prevent overwhelming users
- Intuitive navigation despite bold aesthetics

#### **Accessibility Standards**
- Meet WCAG contrast ratio requirements
- Avoid problematic color combinations (yellow/cyan)
- Ensure interactive elements are clearly identifiable
- Test with accessibility tools

#### **Strategic Color Limitation**
- Limit palette to 2-3 bold, high-contrast colors
- Use color intensity for hierarchy
- Avoid overwhelming users with too many colors
- Maintain brand consistency

#### **Balanced Raw Aesthetics**
- Offset dense elements with generous padding
- Create visual breathing room
- Guide users to key actions
- Maintain clear information hierarchy

### Implementation Guidelines

#### **Component Styling**
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
```

#### **Card Components**
- Thick black borders (4-8px)
- Stark drop shadows (4px offset)
- Bold, high-contrast colors
- Generous padding (24-32px)
- Angular, geometric shapes

#### **Typography Hierarchy**
- **H1**: 48px, Bold, High contrast
- **H2**: 36px, Bold, Medium contrast  
- **H3**: 24px, Bold, Standard contrast
- **Body**: 16px, Regular, Readable contrast
- **Small**: 14px, Regular, Subtle contrast

#### **Layout Patterns**
- Grid-based layouts with clear structure
- Generous whitespace between sections
- Bold dividers and separators
- Angular, geometric arrangements
- High-contrast section backgrounds

### Use Cases

#### **Best For**
- **Creative Agencies**: Bold, attention-grabbing designs
- **Tech Startups**: Modern, rebellious aesthetic
- **Portfolio Sites**: Standout, memorable experiences
- **Brand Launches**: High-impact, memorable presentations
- **Creative Showcases**: Artistic, expressive designs

#### **Avoid When**
- **Corporate B2B**: May be too bold for conservative audiences
- **Financial Services**: Raw aesthetic may seem unprofessional
- **Healthcare**: Bold colors may not convey trust
- **Accessibility Concerns**: Ensure proper contrast ratios

### Examples & Inspiration

#### **Successful Implementations**
- **Figma**: Bold contrasts with creative freedom
- **Gumroad**: Raw aesthetic empowering creators
- **Tony's Chocolonely**: Playful, bold brand expression
- **Halo Lab**: Structured layouts with striking visuals

#### **Design Patterns**
- High-contrast color combinations
- Thick, solid borders
- Stark drop shadows
- Bold, geometric layouts
- Generous whitespace usage

### Testing & Validation

#### **Accessibility Testing**
- Verify contrast ratios meet WCAG standards
- Test with screen readers
- Ensure keyboard navigation works
- Validate color combinations

#### **User Experience Testing**
- Test with target audience
- Verify usability despite bold aesthetics
- Ensure clear call-to-actions
- Validate information hierarchy

---

When adding new templates:

1. Create theme variations following the established patterns
2. Maintain consistency within each theme
3. Test all theme variations
4. Update this documentation if adding new themes
5. Follow the naming convention: `{theme}-{template}` for variations

---

*Last updated: January 2025*
