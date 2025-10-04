# Design Systems Guide

This document provides detailed information about all available design systems in the E-Commerce registry.

## 🎨 Available Design Systems


### undefined (skeleton)

**Description**: Minimal styling, focus on structure. Use default Tailwind colors. Clean, functional appearance. No decorative elements.

**Characteristics**:
- Standard design characteristics

**Use Cases**:
- General purpose websites

**Styling Approach**:
Standard styling approach

**Example Classes**:
```css
.standard-classes { /* standard styles */ }
```


## 🎯 Design System Selection

### When to Use Each Design System

#### Standard
- Corporate websites
- Professional services
- Business applications
- Government sites
- Educational platforms

#### Minimal
- Creative portfolios
- Design agencies
- Modern startups
- Art galleries
- Photography sites

#### Bold
- Marketing campaigns
- Product launches
- Event websites
- E-commerce stores
- Brand showcases

#### Neobrutalism
- Creative portfolios
- Experimental projects
- Artistic brands
- Design showcases
- Alternative aesthetics

## 🔧 Customization

### Modifying Design Systems

Each design system is implemented through Tailwind CSS classes. To customize:

1. **Edit Component Files**: Modify classes in `blocks/[module]/[section]/[designSystem]/component.tsx`
2. **Update Base Styles**: Modify the design system class functions
3. **Add Custom Classes**: Extend Tailwind configuration as needed

### Creating New Design Systems

To add a new design system:

1. Add to `designSystems` array in `registry.json`
2. Generate components for the new design system
3. Implement design system-specific classes
4. Update documentation

## 📱 Responsive Design

All design systems include responsive design patterns:

- **Mobile First**: Components start with mobile styles
- **Breakpoints**: Standard Tailwind breakpoints (sm, md, lg, xl, 2xl)
- **Flexible Layouts**: Grid and flexbox for responsive layouts
- **Typography Scaling**: Responsive text sizing

## ♿ Accessibility

Each design system includes accessibility features:

- **Color Contrast**: WCAG AA compliant color combinations
- **Focus States**: Visible focus indicators
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Screen Reader Support**: ARIA labels and descriptions

## 🎨 Color Palettes

### Standard
- Primary: Blue tones
- Secondary: Gray tones
- Accent: Subtle highlights
- Background: White/light gray

### Minimal
- Primary: Black/white
- Secondary: Light gray
- Accent: Minimal color
- Background: Pure white

### Bold
- Primary: Vibrant colors
- Secondary: Complementary tones
- Accent: High contrast
- Background: Gradients

### Neobrutalism
- Primary: Black/white
- Secondary: Bright colors
- Accent: High contrast
- Background: White with borders

## 📐 Typography

### Font Weights
- **Standard**: Regular (400), Medium (500), Semibold (600), Bold (700)
- **Minimal**: Thin (100), Light (300), Regular (400)
- **Bold**: Medium (500), Bold (700), Black (900)
- **Neobrutalism**: Bold (700), Black (900)

### Font Sizes
- **Headings**: 2xl to 7xl (responsive)
- **Body**: Base to xl
- **Small**: xs to sm

## 🎭 Component Variations

Each component includes design system-specific variations:

- **Headers**: Navigation styling
- **Heroes**: Background and typography
- **Cards**: Border and shadow styles
- **Buttons**: Color and shape variations
- **Lists**: Layout and spacing

## 🔄 Migration Between Design Systems

To switch design systems:

1. **Update Registry**: Change `designSystem` in `registry.json`
2. **Regenerate Components**: Run the generator with new design system
3. **Update Data**: Modify content in `collections-data.json` if needed
4. **Test Components**: Verify all components render correctly

---

*This guide covers all design systems available in the E-Commerce registry.*
