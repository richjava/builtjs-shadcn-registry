# BuiltJS Shadcn Registry Documentation

This directory contains comprehensive documentation for the BuiltJS Shadcn Registry.

## Simplified Architecture

**IMPORTANT**: The registry uses a simplified architecture where registry files serve as the single source of truth.

### File Structure
```
├── registry.json                    # Main registry (ShadCN convention)
├── registry-data/                   # Registry data files
│   ├── blocks-index.json           # Complete block definitions with fields, data, collections
│   ├── collections-data.json       # All collection data (blogItem, teamMemberItem, etc.)
│   └── content-types.json          # Content type definitions (Built.js format)
├── blocks/                         # Template blocks organized by module/section/designSystem
│   └── [module]/[section]/[designSystem]/
│       └── component.tsx           # Only component files remain!
└── components/
    ├── ui/                         # ShadCN UI components
    └── shared/                     # Custom shared components
```

### Key Benefits
- **No build step required** - Edit registry files directly
- **Single source of truth** - All metadata in registry files
- **AI accessible** - All definition files are publicly available
- **Simplified workflow** - Edit component files + update registry files
- **Immediate changes** - No need to rebuild or restart

## Available Documentation

### [THEMES.md](./THEMES.md)
Complete guide to the design system system, including:
- Design system definitions and characteristics
- Target audiences and use cases
- Design principles and example classes
- Selection guidelines for designers
- Implementation notes and best practices

### [NEOBRUTALISM_DESIGN_SYSTEM.md](./NEOBRUTALISM_DESIGN_SYSTEM.md)
Comprehensive guide to the Neobrutalism design system, including:
- Design principles and characteristics
- Color palettes and typography
- Component styling guidelines
- Implementation examples

## Quick Reference

### Design System System
The registry supports four design systems designed for digital agency designers:

1. **Standard** - Clean, modern design with shadcn/ui components
2. **Minimal** - Ultra-clean, sophisticated design with subtle typography
3. **Bold** - High-impact design with vibrant colors and dynamic layouts
4. **Neobrutalism** - Raw, unpolished aesthetics with thick borders and stark shadows

### File Structure
```
blocks/
├── {module}/
│   └── {section}/
│       ├── {designSystem}/         # Standard design system
│       ├── minimal-{designSystem}/ # Minimal design system
│       ├── bold-{designSystem}/    # Bold design system
│       └── neobrutalism-{designSystem}/ # Neobrutalism design system
```

### Adding New Templates
1. Create component file in appropriate directory
2. Define component interface and logic
3. Update `registry-data/blocks-index.json` with block definition
4. Add collection data to `registry-data/collections-data.json` (if needed)
5. Add content type to `registry-data/content-types.json` (if needed)
6. Update `registry.json` with block metadata
7. Test all design system variations

### Custom Components in Templates

When creating templates that need custom components (not ShadCN UI components), follow Built.js conventions:

#### Component Location
- **Custom components** must be placed in `components/shared/`
- **ShadCN UI components** remain in `components/ui/`

#### Import Pattern
```typescript
// ✅ Correct - Import custom components from shared
import { createPortableTextComponents } from '@/components/shared'

// ✅ Correct - Import ShadCN components from ui
import { Button } from '@/components/ui/button'

// ❌ Incorrect - Don't import custom components from lib
import { createPortableTextComponents } from '@/lib/portable-text-components'
```

#### Shared Components Structure
```
components/
├── ui/                    # ShadCN UI components
└── shared/                # Custom shared components
    ├── index.ts          # Export all shared components
    ├── portable-text-components.tsx
    └── [other-custom-components].tsx
```

### Rich Content with PortableText

For templates that display rich text content (like blog articles), use PortableText with design system-aware styling:

#### Basic Usage
```typescript
import { PortableText } from '@portabletext/react'
import { createPortableTextComponents } from '@/components/shared'

// In your component
<PortableText 
  value={entry.content} 
  components={createPortableTextComponents('bold')} // Design System: 'standard', 'minimal', 'bold', 'neobrutalism'
/>
```

#### Supported Content Types
The `createPortableTextComponents` function provides design system-specific styling for:
- **Headings**: h1, h2, h3, h4 with design system-appropriate typography
- **Text**: Paragraphs with proper spacing and font weights
- **Lists**: Bullet and numbered lists with consistent styling
- **Formatting**: Bold, italic, and emphasis
- **Links**: Styled links with hover effects
- **Code**: Inline code and code blocks
- **Blockquotes**: Styled quote blocks

#### Design System-Specific Styling
Each design system provides distinct styling:

- **Standard**: Clean, professional typography with gray color scheme
- **Minimal**: Light, airy design with subtle fonts
- **Bold**: Strong, impactful typography with heavier weights and light colors for dark backgrounds
- **Neobrutalism**: Raw, high-contrast design with borders and shadows

## Contributing

When contributing to the registry:
- Follow the established design system patterns
- Maintain consistency within design systems
- Test all variations
- Update relevant documentation
- Follow naming conventions
- Update registry files directly (no build step needed)

## Development Workflow

### For Component Changes
1. Edit `blocks/{module}/{section}/{designSystem}/component.tsx`
2. Test in preview mode
3. No registry updates needed

### For Data/Schema Changes
1. Edit `registry-data/blocks-index.json` for block definitions
2. Edit `registry-data/collections-data.json` for collection data
3. Edit `registry-data/content-types.json` for content types
4. Test changes immediately (no build step)

### For New Blocks
1. Create component file
2. Update all relevant registry files
3. Test block rendering
4. Update documentation

---

For more detailed information, see the individual documentation files in this directory.