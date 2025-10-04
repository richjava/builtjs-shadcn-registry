# AI Reference Guide

This document provides a comprehensive reference for AI models working with this Built.js ShadCN Registry.

## 📋 Registry Overview

This registry contains **7 blocks** across **3 modules** with **1 design system variations**.

### Registry Structure

```json
{
  "name": "e-commerce",
  "version": "1.0.0",
  "baseUrl": "https://e-commerce.vercel.app",
  "designSystems": [
    {
      "name": "skeleton",
      "label": "undefined",
      "description": "Minimal styling, focus on structure. Use default Tailwind colors. Clean, functional appearance. No decorative elements."
    }
  ],
  "blocks": [...]
}
```

## 🎨 Design Systems

### Available Design Systems


#### undefined (skeleton)
- **Description**: Minimal styling, focus on structure. Use default Tailwind colors. Clean, functional appearance. No decorative elements.
- **Characteristics**: - Standard design characteristics
- **Use Case**: - General purpose websites


### Design System Selection Guidelines

- **Standard**: Best for corporate websites, professional services
- **Minimal**: Ideal for portfolios, creative agencies, modern startups
- **Bold**: Perfect for marketing sites, product launches, high-impact pages
- **Neobrutalism**: Great for creative portfolios, experimental projects, artistic brands

## 📦 Block Structure

### Block Naming Convention

Blocks follow the pattern: `[module]-[section]-[template]-[designSystem]`

Examples:
- `main-hero-section-cover1-standard`
- `shop-product-list-list1-bold`
- `about-team-cards-cards1-minimal`

### Block Definition Format

```json
{
  "fields": {
    "heading": { "type": "string" },
    "blurb": { "type": "text" },
    "image": { "type": "image" }
  },
  "data": {
    "heading": "Welcome to Our Site",
    "blurb": "This is a sample description",
    "image": { "url": "...", "alt": "..." }
  },
  "collections": {
    "product": { "config": { "limit": 6 } }
  },
  "dependencies": ["@radix-ui/react-slot"],
  "shadcnComponents": ["Button", "Card"],
  "lucideIcons": ["ArrowRight", "Star"],
  "masterDetail": { "isMaster": false, "isDetail": false }
}
```

## 🔗 Collections and Content Types

### Content Types


#### primaryMenuItem
```json
{
  "name": "primaryMenuItem",
  "fields": {
    "slug": { "type": "uid", "required": true },
    "label": { "type": "string", "required": true },
    "url": { "type": "string", "required": true }
  }
}
```

#### product
```json
{
  "name": "product",
  "fields": {
    "name": { "type": "string", "required": false },
    "slug": { "type": "uid", "required": true },
    "description": { "type": "string", "required": true },
    "price": { "type": "number", "required": false },
    "price_id": { "type": "string", "required": false },
    "image": { "type": "image", "required": false },
    "images": { "type": "array", "required": false },
    "category": { "type": "relation", "required": false }
  }
}
```

#### category
```json
{
  "name": "category",
  "fields": {
    "name": { "type": "string", "required": false },
    "slug": { "type": "uid", "required": true }
  }
}
```

#### benefit
```json
{
  "name": "benefit",
  "fields": {
    "title": { "type": "string", "required": false },
    "icon": { "type": "string", "required": false },
    "description": { "type": "string", "required": false }
  }
}
```

### Collections Data

Collections are stored in `registry-data/collections-data.json`:

```json
{
  "product": [
    {
      "_id": "product1",
      "_type": "product",
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "image": { "url": "...", "alt": "..." }
    }
  ]
}
```

## 🎯 Usage Patterns

### For AI Models

When working with this registry:

1. **Identify Required Blocks**: Use `registry.json` to find available blocks
2. **Select Design System**: Choose appropriate design system based on project needs
3. **Configure Data**: Update `collections-data.json` with project-specific content
4. **Customize Fields**: Modify block data in `blocks-index.json` as needed

### Component Integration

Components expect this interface:

```typescript
interface ComponentProps {
  content: {
    data?: {
      heading: string
      blurb: string
      // ... other fields
    }
    collections?: {
      product?: Product[]
      // ... other collections
    }
  }
}
```

## 📁 File Locations

- **Registry**: `registry.json`
- **Block Definitions**: `registry-data/blocks-index.json`
- **Collection Data**: `registry-data/collections-data.json`
- **Content Types**: `registry-data/content-types.json`
- **Components**: `blocks/[module]/[section]/[designSystem]/component.tsx`

## 🔧 Customization Guide

### Adding New Blocks

1. Create component file: `blocks/[module]/[section]/[designSystem]/component.tsx`
2. Add block definition to `registry-data/blocks-index.json`
3. Update `registry.json` with block metadata

### Modifying Existing Blocks

1. Update component code in appropriate directory
2. Modify block definition in `blocks-index.json` if needed
3. Update data in `collections-data.json` as required

### Design System Customization

Each design system uses Tailwind CSS classes. Modify the classes in component files to customize styling.

## 🚀 Deployment

This registry is ready for deployment to Vercel, Netlify, or any static hosting platform.

### Build Process

```bash
npm run build
```

### Environment Variables

No environment variables required for basic functionality.

## 📞 Support

For questions about this registry:

1. Check the documentation in the `docs/` directory
2. Review the component code in `blocks/`
3. Examine the configuration files in `registry-data/`

---

*This registry was generated from Built.js theme configuration and follows ShadCN UI patterns.*
