# Neobrutalism Design System

## Overview
This document defines the complete design system for the Neobrutalism theme, providing developers and designers with comprehensive guidelines for implementing consistent, accessible, and visually striking components.

## Color Palette

### Primary Colors
```css
:root {
  /* Core Neobrutalism Colors */
  --neobrutalism-black: #000000;
  --neobrutalism-white: #FFFFFF;
  --neobrutalism-blue: #00BFFF;
  --neobrutalism-green: #00FF00;
  --neobrutalism-yellow: #FFFF00;
  --neobrutalism-red: #FF0000;
  --neobrutalism-purple: #800080;
}
```

### Color Usage Guidelines
- **Black (#000000)**: Primary text, borders, shadows
- **White (#FFFFFF)**: Backgrounds, light text on dark backgrounds
- **Electric Blue (#00BFFF)**: Primary CTAs, highlights, accents
- **Neon Green (#00FF00)**: Success states, positive actions
- **Yellow (#FFFF00)**: Warnings, attention-grabbing elements
- **Red (#FF0000)**: Errors, destructive actions
- **Purple (#800080)**: Special features, premium elements

### Contrast Ratios
- **Text on White**: Minimum 4.5:1 (WCAG AA)
- **Text on Black**: Minimum 4.5:1 (WCAG AA)
- **Large Text**: Minimum 3:1 (WCAG AA)
- **Interactive Elements**: Minimum 3:1 (WCAG AA)

## Typography

### Font Stack
```css
:root {
  /* Primary Fonts */
  --font-heading: 'Inter', 'Montserrat', sans-serif;
  --font-body: 'Roboto', 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### Typography Scale
```css
:root {
  /* Heading Sizes */
  --text-h1: 3rem;      /* 48px */
  --text-h2: 2.25rem;   /* 36px */
  --text-h3: 1.5rem;    /* 24px */
  --text-h4: 1.25rem;   /* 20px */
  
  /* Body Sizes */
  --text-lg: 1.125rem;  /* 18px */
  --text-base: 1rem;    /* 16px */
  --text-sm: 0.875rem;  /* 14px */
  --text-xs: 0.75rem;   /* 12px */
}
```

### Font Weights
- **Headings**: 700 (Bold)
- **Subheadings**: 600 (Semi-bold)
- **Body Text**: 400 (Regular)
- **Captions**: 500 (Medium)

## Spacing System

### Spacing Scale
```css
:root {
  --space-xs: 0.25rem;   /* 4px */
  --space-sm: 0.5rem;    /* 8px */
  --space-md: 1rem;       /* 16px */
  --space-lg: 1.5rem;     /* 24px */
  --space-xl: 2rem;       /* 32px */
  --space-2xl: 3rem;      /* 48px */
  --space-3xl: 4rem;      /* 64px */
}
```

### Component Spacing
- **Card Padding**: 24px (--space-lg)
- **Section Padding**: 32px (--space-xl)
- **Button Padding**: 16px vertical, 32px horizontal
- **Input Padding**: 12px vertical, 16px horizontal

## Border System

### Border Widths
```css
:root {
  --border-thin: 1px;
  --border-medium: 2px;
  --border-thick: 4px;
  --border-heavy: 8px;
}
```

### Border Styles
- **Default**: Solid borders only
- **Color**: Always black (#000000) unless specified
- **Radius**: Sharp corners (0px) for geometric look
- **Exceptions**: Subtle radius (2px) for interactive elements

## Shadow System

### Shadow Definitions
```css
:root {
  /* Neobrutalism Shadows */
  --shadow-sm: 2px 2px 0px #000000;
  --shadow-md: 4px 4px 0px #000000;
  --shadow-lg: 6px 6px 0px #000000;
  --shadow-xl: 8px 8px 0px #000000;
}
```

### Shadow Usage
- **Cards**: --shadow-md (4px offset)
- **Buttons**: --shadow-sm (2px offset)
- **Modals**: --shadow-lg (6px offset)
- **Hover States**: Increase shadow size

## Component Guidelines

### Buttons

#### Primary Button
```css
.neobrutalism-btn-primary {
  background: var(--neobrutalism-blue);
  color: var(--neobrutalism-black);
  border: var(--border-thick) solid var(--neobrutalism-black);
  box-shadow: var(--shadow-md);
  font-weight: 700;
  padding: var(--space-md) var(--space-xl);
  font-size: var(--text-base);
  transition: all 0.2s ease;
}

.neobrutalism-btn-primary:hover {
  background: var(--neobrutalism-green);
  transform: translate(-2px, -2px);
  box-shadow: var(--shadow-lg);
}
```

#### Secondary Button
```css
.neobrutalism-btn-secondary {
  background: var(--neobrutalism-white);
  color: var(--neobrutalism-black);
  border: var(--border-thick) solid var(--neobrutalism-black);
  box-shadow: var(--shadow-md);
  font-weight: 700;
  padding: var(--space-md) var(--space-xl);
}
```

### Cards

#### Standard Card
```css
.neobrutalism-card {
  background: var(--neobrutalism-white);
  border: var(--border-thick) solid var(--neobrutalism-black);
  box-shadow: var(--shadow-md);
  padding: var(--space-lg);
  border-radius: 0;
}
```

#### Highlighted Card
```css
.neobrutalism-card-highlight {
  background: var(--neobrutalism-yellow);
  border: var(--border-heavy) solid var(--neobrutalism-black);
  box-shadow: var(--shadow-lg);
  padding: var(--space-xl);
}
```

### Input Fields

#### Text Input
```css
.neobrutalism-input {
  background: var(--neobrutalism-white);
  border: var(--border-thick) solid var(--neobrutalism-black);
  box-shadow: var(--shadow-sm);
  padding: var(--space-sm) var(--space-md);
  font-size: var(--text-base);
  font-weight: 500;
}

.neobrutalism-input:focus {
  outline: none;
  box-shadow: var(--shadow-md);
  transform: translate(-1px, -1px);
}
```

### Navigation

#### Navigation Bar
```css
.neobrutalism-nav {
  background: var(--neobrutalism-white);
  border-bottom: var(--border-heavy) solid var(--neobrutalism-black);
  box-shadow: var(--shadow-sm);
  padding: var(--space-md) var(--space-xl);
}
```

#### Navigation Links
```css
.neobrutalism-nav-link {
  color: var(--neobrutalism-black);
  font-weight: 600;
  text-decoration: none;
  padding: var(--space-sm) var(--space-md);
  border: var(--border-medium) solid transparent;
  transition: all 0.2s ease;
}

.neobrutalism-nav-link:hover {
  background: var(--neobrutalism-blue);
  border-color: var(--neobrutalism-black);
  box-shadow: var(--shadow-sm);
}
```

## Layout Patterns

### Grid System
```css
.neobrutalism-grid {
  display: grid;
  gap: var(--space-lg);
  padding: var(--space-xl);
}

.neobrutalism-grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.neobrutalism-grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.neobrutalism-grid-4 {
  grid-template-columns: repeat(4, 1fr);
}
```

### Section Layouts
```css
.neobrutalism-section {
  padding: var(--space-3xl) var(--space-xl);
  border-bottom: var(--border-heavy) solid var(--neobrutalism-black);
}

.neobrutalism-section-alt {
  background: var(--neobrutalism-yellow);
  padding: var(--space-3xl) var(--space-xl);
}
```

## Animation Guidelines

### Transitions
```css
:root {
  --transition-fast: 0.15s ease;
  --transition-normal: 0.2s ease;
  --transition-slow: 0.3s ease;
}
```

### Hover Effects
- **Buttons**: Translate up and left (-2px, -2px)
- **Cards**: Increase shadow size
- **Links**: Background color change
- **Interactive Elements**: Subtle transform and shadow increase

### Micro-interactions
- **Button Press**: Scale down (0.95) on active
- **Card Hover**: Lift effect with increased shadow
- **Input Focus**: Border and shadow emphasis
- **Navigation**: Background color transitions

## Accessibility Guidelines

### Color Contrast
- **Minimum Ratio**: 4.5:1 for normal text
- **Large Text**: 3:1 minimum
- **Interactive Elements**: 3:1 minimum
- **Focus Indicators**: High contrast outlines

### Keyboard Navigation
- **Focus States**: Visible outline with high contrast
- **Tab Order**: Logical sequence
- **Skip Links**: Available for main content
- **ARIA Labels**: Proper labeling for screen readers

### Screen Reader Support
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: Descriptive image alternatives
- **ARIA Roles**: Appropriate role assignments
- **Live Regions**: Dynamic content announcements

## Implementation Checklist

### Before Implementation
- [ ] Verify color contrast ratios
- [ ] Test with keyboard navigation
- [ ] Validate semantic HTML structure
- [ ] Check responsive behavior

### During Implementation
- [ ] Use design system variables
- [ ] Follow spacing guidelines
- [ ] Apply consistent shadows
- [ ] Maintain typography hierarchy

### After Implementation
- [ ] Test with screen readers
- [ ] Validate accessibility standards
- [ ] Check cross-browser compatibility
- [ ] Verify responsive design

## Browser Support

### Modern Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Fallbacks
- **CSS Grid**: Flexbox fallback
- **Custom Properties**: Static values fallback
- **Box Shadow**: Border fallback for older browsers

---

*This design system is based on the Nielsen Norman Group's Neobrutalism guidelines and follows WCAG 2.1 AA accessibility standards.*
