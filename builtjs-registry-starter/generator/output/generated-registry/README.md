# E-Commerce

A shadcn/ui theme for e-commerce websites

## 🚀 Quick Start

This registry was generated from Built.js theme configuration and includes multiple design system variations.

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 📁 Project Structure

```
├── blocks/                    # Generated components
│   ├── main/                  # Main module components
│   ├── shop/                  # Shop module components
│   └── about/                 # About module components
├── components/               # Shared components
│   ├── ui/                    # ShadCN UI components
│   └── shared/                # Custom shared components
├── registry-data/            # Registry configuration
│   ├── blocks-index.json     # Block definitions
│   ├── collections-data.json  # Collection data
│   └── content-types.json    # Content type schemas
├── registry.json             # Main registry file
└── docs/                     # Documentation
```

## 🎨 Design Systems

This registry includes 1 design system variations:

- **undefined**: Minimal styling, focus on structure. Use default Tailwind colors. Clean, functional appearance. No decorative elements.

## 📦 Available Blocks

### Main Module
- **header** - header1 (skeleton)
- **footer** - footer1 (skeleton)
- **home-seo** - seo (skeleton)
- **home-landing** - cover1 (skeleton)
- **benefit-list** - list2 (skeleton)

### Shop Module
- **product-article-landing** - article1 (skeleton)
- **product-category-list-landing** - list1 (skeleton)

### About Module
No blocks available.

## 🔧 Customization

### Adding New Blocks

1. Create a new component in the appropriate module directory
2. Update `registry-data/blocks-index.json` with block definition
3. Update `registry.json` with block metadata

### Modifying Design Systems

Design system styles are applied through Tailwind CSS classes. Each component includes design system-specific styling.

### Content Management

Content is managed through `registry-data/collections-data.json`. Update this file to modify the data displayed in components.

## 📚 Documentation

- [Design Systems Guide](./docs/DESIGN_SYSTEMS.md)
- [AI Reference](./AI_REFERENCE.md)
- [Built.js Integration](./docs/BUILTJS_INTEGRATION.md)

## 🤝 Contributing

This registry was generated from Built.js theme configuration. To modify:

1. Update the source configuration files
2. Re-run the generator
3. Test the generated components

## 📄 License

MIT License - see LICENSE file for details.
