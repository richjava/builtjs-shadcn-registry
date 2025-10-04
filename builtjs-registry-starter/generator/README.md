# BuiltJS Registry Generator

A comprehensive generator that converts Built.js theme configuration to ShadCN registry format with multiple design system variations.

## 🚀 Quick Start

```bash
# Navigate to generator directory
cd builtjs-registry-starter/generator

# Run generator with your data
node index.js ../data

# Output will be in ./output/generated-registry/
```

## 📁 Project Structure

```
generator/
├── index.js                    # Main generator entry point
├── parsers/
│   └── config-parser.js       # Configuration file parser
├── generators/
│   ├── registry-generator.js   # Registry file generator
│   ├── component-generator.js  # React component generator
│   └── docs-generator.js       # Documentation generator
├── templates/                  # Template files (future use)
├── utils/                      # Utility functions (future use)
├── package.json               # Generator dependencies
└── GENERATOR_ARCHITECTURE.md  # Detailed architecture documentation
```

## 📋 Features

- **Configuration Parsing**: Reads Built.js theme configuration files
- **Design System Support**: Generates components for each design system defined in `theme.json`
- **Component Generation**: Creates React components with TypeScript interfaces
- **Registry Generation**: Generates ShadCN-compatible registry files
- **Documentation**: Auto-generates comprehensive documentation
- **Project Setup**: Creates complete Next.js project structure

## 🎯 Input Configuration

The generator reads from the `data/` directory:

```
data/
├── theme.json                 # Theme definition with design systems
├── global.json               # Global configuration
├── modules.json              # Module definitions
├── sections.json             # Section definitions
├── templates.json            # Template definitions
├── schemas/
│   └── content-types.json    # Content type schemas
├── collections/              # Collection data
│   ├── products.json
│   ├── categories.json
│   └── benefits.json
└── plugins/                  # Plugin configurations
    └── [plugin-name]/
        ├── plugin.json
        ├── sections.json
        ├── templates.json
        └── collections/
```

## 📤 Output Structure

The generator creates a complete ShadCN registry in `output/generated-registry/`:

```
generated-registry/
├── registry.json              # Main registry file
├── registry-data/             # Registry data files
├── blocks/                    # Generated components
├── components/shared/         # Shared components
├── docs/                      # Documentation
├── package.json              # Project configuration
├── next.config.js            # Next.js configuration
├── tailwind.config.js        # Tailwind configuration
└── tsconfig.json            # TypeScript configuration
```

## 🔧 Configuration

### Design Systems

Define design systems in `data/theme.json`:

```json
{
  "theme": {
    "title": "E-Commerce",
    "description": "A shadcn/ui theme for e-commerce websites",
    "designSystems": [
      {
        "name": "skeleton",
        "label": "Skeleton",
        "description": "No styles, just the structure and functionality"
      }
    ]
  }
}
```

### Sections and Templates

Define sections in `data/sections.json`:

```json
{
  "sections": [
    {
      "name": "homeLanding",
      "title": "Home Landing",
      "templates": ["cover1"],
      "collections": {
        "product": {},
        "category": {}
      }
    }
  ]
}
```

## 🎨 Generated Components

Each component includes:

- **TypeScript Interfaces**: Proper type definitions
- **Design System Styling**: Tailwind CSS classes based on design system
- **Data Handling**: Support for content data and collections
- **Responsive Design**: Mobile-first responsive patterns
- **Accessibility**: ARIA labels and semantic HTML

### Example Generated Component

```typescript
interface HomeLandingCover1SkeletonProps {
  content: {
    data?: {
      heading: string
      blurb: string
    }
    collections?: {
      product?: any[]
      category?: any[]
    }
  }
}

export default function HomeLandingCover1Skeleton({ content }: HomeLandingCover1SkeletonProps) {
  // Component implementation with skeleton design system styling
}
```

## 📚 Documentation

- **[Generator Architecture](./GENERATOR_ARCHITECTURE.md)** - Detailed explanation of how the generator works
- **[Generated Registry README](./output/generated-registry/README.md)** - Documentation for the generated registry
- **[AI Reference](./output/generated-registry/AI_REFERENCE.md)** - Reference for AI models
- **[Design Systems Guide](./output/generated-registry/docs/DESIGN_SYSTEMS.md)** - Design system documentation

## 🔄 Customization

### Adding New Design Systems

1. Add to `data/theme.json`:
```json
{
  "designSystems": [
    {
      "name": "custom",
      "label": "Custom",
      "description": "Custom design system"
    }
  ]
}
```

2. Update design system classes in `generators/component-generator.js`
3. Regenerate components

### Adding New Sections

1. Add to `data/sections.json`
2. Add corresponding templates to `data/templates.json`
3. Regenerate components

## 🚀 Usage Examples

### Basic Generation
```bash
node index.js ../data
```

### Custom Output Directory
```bash
node index.js ../data --output ./custom-output
```

## 🛠️ Development

### Prerequisites
- Node.js 14+
- Built.js theme configuration files

### Dependencies
- `fs` - File system operations
- `path` - Path manipulation

### Running Tests
```bash
npm test
```
```
node generator/index.js
```

## 📝 Notes

- The generator respects your `theme.json` configuration exactly
- Only generates design systems defined in your configuration
- Creates components for all section + template + design system combinations
- Maintains consistent directory structure across all generated components
- Includes proper TypeScript interfaces and design system styling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with sample configuration
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

*This generator converts Built.js theme configuration to ShadCN registry format, creating a complete, functional registry with multiple design system variations.*
