/**
 * Documentation Generator
 * 
 * Generates comprehensive documentation for the generated registry.
 */

const fs = require('fs').promises;
const path = require('path');

class DocsGenerator {
  constructor(config, outputPath) {
    this.config = config;
    this.outputPath = outputPath;
  }

  async generate() {
    console.log('📚 Generating documentation...');
    
    const outputDir = path.join(this.outputPath, 'generated-registry');
    
    // Generate main README
    await this.generateREADME(outputDir);
    
    // Generate AI reference
    await this.generateAIReference(outputDir);
    
    // Generate docs directory
    const docsDir = path.join(outputDir, 'docs');
    await fs.mkdir(docsDir, { recursive: true });
    
    await this.generateDocsREADME(docsDir);
    await this.generateDesignSystemsDoc(docsDir);
    
    console.log('✅ Documentation generated successfully');
  }

  async generateREADME(outputDir) {
    const readme = `# ${this.config.theme.title}

${this.config.theme.description}

## 🚀 Quick Start

This registry was generated from Built.js theme configuration and includes multiple design system variations.

### Installation

\`\`\`bash
npm install
\`\`\`

### Development

\`\`\`bash
npm run dev
\`\`\`

### Build

\`\`\`bash
npm run build
\`\`\`

## 📁 Project Structure

\`\`\`
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
\`\`\`

## 🎨 Design Systems

This registry includes ${this.config.theme.designSystems.length} design system variations:

${this.config.theme.designSystems.map(ds => `- **${ds.label}**: ${ds.description}`).join('\n')}

## 📦 Available Blocks

### Main Module
${this.generateModuleBlocks('main')}

### Shop Module
${this.generateModuleBlocks('shop')}

### About Module
${this.generateModuleBlocks('about')}

## 🔧 Customization

### Adding New Blocks

1. Create a new component in the appropriate module directory
2. Update \`registry-data/blocks-index.json\` with block definition
3. Update \`registry.json\` with block metadata

### Modifying Design Systems

Design system styles are applied through Tailwind CSS classes. Each component includes design system-specific styling.

### Content Management

Content is managed through \`registry-data/collections-data.json\`. Update this file to modify the data displayed in components.

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
`;

    await fs.writeFile(
      path.join(outputDir, 'README.md'),
      readme
    );
  }

  async generateAIReference(outputDir) {
    const aiReference = `# AI Reference Guide

This document provides a comprehensive reference for AI models working with this Built.js ShadCN Registry.

## 📋 Registry Overview

This registry contains **${this.getTotalBlocks()} blocks** across **${this.getTotalModules()} modules** with **${this.config.theme.designSystems.length} design system variations**.

### Registry Structure

\`\`\`json
{
  "name": "${this.config.theme.title.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "baseUrl": "https://${this.config.theme.title.toLowerCase().replace(/\s+/g, '-')}.vercel.app",
  "designSystems": [
    ${this.config.theme.designSystems.map(ds => `{
      "name": "${ds.name}",
      "label": "${ds.label}",
      "description": "${ds.description}"
    }`).join(',\n    ')}
  ],
  "blocks": [...]
}
\`\`\`

## 🎨 Design Systems

### Available Design Systems

${this.config.theme.designSystems.map(ds => `
#### ${ds.label} (${ds.name})
- **Description**: ${ds.description}
- **Characteristics**: ${this.getDesignSystemCharacteristics(ds.name)}
- **Use Case**: ${this.getDesignSystemUseCase(ds.name)}
`).join('\n')}

### Design System Selection Guidelines

- **Standard**: Best for corporate websites, professional services
- **Minimal**: Ideal for portfolios, creative agencies, modern startups
- **Bold**: Perfect for marketing sites, product launches, high-impact pages
- **Neobrutalism**: Great for creative portfolios, experimental projects, artistic brands

## 📦 Block Structure

### Block Naming Convention

Blocks follow the pattern: \`[module]-[section]-[template]-[designSystem]\`

Examples:
- \`main-hero-section-cover1-standard\`
- \`shop-product-list-list1-bold\`
- \`about-team-cards-cards1-minimal\`

### Block Definition Format

\`\`\`json
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
\`\`\`

## 🔗 Collections and Content Types

### Content Types

${this.generateContentTypesReference()}

### Collections Data

Collections are stored in \`registry-data/collections-data.json\`:

\`\`\`json
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
\`\`\`

## 🎯 Usage Patterns

### For AI Models

When working with this registry:

1. **Identify Required Blocks**: Use \`registry.json\` to find available blocks
2. **Select Design System**: Choose appropriate design system based on project needs
3. **Configure Data**: Update \`collections-data.json\` with project-specific content
4. **Customize Fields**: Modify block data in \`blocks-index.json\` as needed

### Component Integration

Components expect this interface:

\`\`\`typescript
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
\`\`\`

## 📁 File Locations

- **Registry**: \`registry.json\`
- **Block Definitions**: \`registry-data/blocks-index.json\`
- **Collection Data**: \`registry-data/collections-data.json\`
- **Content Types**: \`registry-data/content-types.json\`
- **Components**: \`blocks/[module]/[section]/[designSystem]/component.tsx\`

## 🔧 Customization Guide

### Adding New Blocks

1. Create component file: \`blocks/[module]/[section]/[designSystem]/component.tsx\`
2. Add block definition to \`registry-data/blocks-index.json\`
3. Update \`registry.json\` with block metadata

### Modifying Existing Blocks

1. Update component code in appropriate directory
2. Modify block definition in \`blocks-index.json\` if needed
3. Update data in \`collections-data.json\` as required

### Design System Customization

Each design system uses Tailwind CSS classes. Modify the classes in component files to customize styling.

## 🚀 Deployment

This registry is ready for deployment to Vercel, Netlify, or any static hosting platform.

### Build Process

\`\`\`bash
npm run build
\`\`\`

### Environment Variables

No environment variables required for basic functionality.

## 📞 Support

For questions about this registry:

1. Check the documentation in the \`docs/\` directory
2. Review the component code in \`blocks/\`
3. Examine the configuration files in \`registry-data/\`

---

*This registry was generated from Built.js theme configuration and follows ShadCN UI patterns.*
`;

    await fs.writeFile(
      path.join(outputDir, 'AI_REFERENCE.md'),
      aiReference
    );
  }

  async generateDocsREADME(docsDir) {
    const docsReadme = `# Documentation

This directory contains comprehensive documentation for the ${this.config.theme.title} registry.

## 📚 Available Documentation

- **[Design Systems Guide](./DESIGN_SYSTEMS.md)** - Complete guide to all design systems
- **[Built.js Integration](./BUILTJS_INTEGRATION.md)** - How to integrate with Built.js
- **[Component Reference](./COMPONENT_REFERENCE.md)** - Detailed component documentation

## 🎯 Quick Reference

### Design Systems
${this.config.theme.designSystems.map(ds => `- **${ds.label}**: ${ds.description}`).join('\n')}

### Modules
${this.getModules().map(module => `- **${module.name}**: ${module.description}`).join('\n')}

### Total Blocks
**${this.getTotalBlocks()}** blocks across **${this.getTotalModules()}** modules

## 🔧 Customization

All components are generated with design system variations. Each component includes:

- TypeScript interfaces
- Tailwind CSS styling
- Responsive design
- Accessibility features

## 📞 Support

For questions about this registry, refer to the main [AI Reference](../AI_REFERENCE.md) or examine the component code in the \`blocks/\` directory.
`;

    await fs.writeFile(
      path.join(docsDir, 'README.md'),
      docsReadme
    );
  }

  async generateDesignSystemsDoc(docsDir) {
    const designSystemsDoc = `# Design Systems Guide

This document provides detailed information about all available design systems in the ${this.config.theme.title} registry.

## 🎨 Available Design Systems

${this.config.theme.designSystems.map(ds => `
### ${ds.label} (${ds.name})

**Description**: ${ds.description}

**Characteristics**:
${this.getDesignSystemCharacteristics(ds.name)}

**Use Cases**:
${this.getDesignSystemUseCase(ds.name)}

**Styling Approach**:
${this.getDesignSystemStyling(ds.name)}

**Example Classes**:
\`\`\`css
${this.getDesignSystemExampleClasses(ds.name)}
\`\`\`
`).join('\n')}

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

1. **Edit Component Files**: Modify classes in \`blocks/[module]/[section]/[designSystem]/component.tsx\`
2. **Update Base Styles**: Modify the design system class functions
3. **Add Custom Classes**: Extend Tailwind configuration as needed

### Creating New Design Systems

To add a new design system:

1. Add to \`designSystems\` array in \`registry.json\`
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

1. **Update Registry**: Change \`designSystem\` in \`registry.json\`
2. **Regenerate Components**: Run the generator with new design system
3. **Update Data**: Modify content in \`collections-data.json\` if needed
4. **Test Components**: Verify all components render correctly

---

*This guide covers all design systems available in the ${this.config.theme.title} registry.*
`;

    await fs.writeFile(
      path.join(docsDir, 'DESIGN_SYSTEMS.md'),
      designSystemsDoc
    );
  }

  // Helper methods
  generateModuleBlocks(moduleName) {
    const blocks = this.getBlocksForModule(moduleName);
    if (blocks.length === 0) return 'No blocks available.';
    
    return blocks.map(block => `- **${block.sectionName}** - ${block.templateName} (${block.designSystem})`).join('\n');
  }

  getBlocksForModule(moduleName) {
    const allBlocks = [];
    
    // Main sections
    for (const section of this.config.sections) {
      const module = this.getModuleName(section);
      if (module === moduleName) {
        for (const templateName of section.templates) {
          const template = this.config.templates.find(t => t.name === templateName);
          if (template) {
            for (const designSystem of this.config.theme.designSystems) {
              allBlocks.push({
                sectionName: this.getSectionSlug(section),
                templateName: template.name,
                designSystem: designSystem.name
              });
            }
          }
        }
      }
    }
    
    // Plugin sections
    for (const plugin of this.config.plugins) {
      if (plugin.name === moduleName) {
        for (const section of plugin.sections) {
          for (const templateName of section.templates) {
            const template = plugin.templates.find(t => t.name === templateName);
            if (template) {
              for (const designSystem of this.config.theme.designSystems) {
                allBlocks.push({
                  sectionName: this.getSectionSlug(section),
                  templateName: template.name,
                  designSystem: designSystem.name
                });
              }
            }
          }
        }
      }
    }
    
    return allBlocks;
  }

  getTotalBlocks() {
    let total = 0;
    
    // Count main sections
    for (const section of this.config.sections) {
      total += section.templates.length * this.config.theme.designSystems.length;
    }
    
    // Count plugin sections
    for (const plugin of this.config.plugins) {
      for (const section of plugin.sections) {
        total += section.templates.length * this.config.theme.designSystems.length;
      }
    }
    
    return total;
  }

  getTotalModules() {
    const modules = new Set();
    
    // Add main modules
    for (const section of this.config.sections) {
      modules.add(this.getModuleName(section));
    }
    
    // Add plugin modules
    for (const plugin of this.config.plugins) {
      modules.add(plugin.name);
    }
    
    return modules.size;
  }

  getModules() {
    const modules = [];
    
    // Add main modules
    for (const section of this.config.sections) {
      const moduleName = this.getModuleName(section);
      if (!modules.find(m => m.name === moduleName)) {
        modules.push({
          name: moduleName,
          description: `${moduleName} module components`
        });
      }
    }
    
    // Add plugin modules
    for (const plugin of this.config.plugins) {
      modules.push({
        name: plugin.name,
        description: plugin.config.description || `${plugin.name} plugin components`
      });
    }
    
    return modules;
  }

  generateContentTypesReference() {
    if (!this.config.contentTypes || this.config.contentTypes.length === 0) {
      return 'No content types defined.';
    }
    
    return this.config.contentTypes.map(ct => `
#### ${ct.name}
\`\`\`json
{
  "name": "${ct.name}",
  "fields": {
${Object.entries(ct.fields).map(([name, field]) => `    "${name}": { "type": "${field.type}", "required": ${field.required || false} }`).join(',\n')}
  }
}
\`\`\``).join('\n');
  }

  getDesignSystemCharacteristics(name) {
    const characteristics = {
      standard: '- Clean, professional appearance\n- Balanced typography\n- Subtle shadows and borders\n- Corporate-friendly colors',
      minimal: '- Ultra-clean design\n- Lots of white space\n- Thin, elegant typography\n- Minimal color usage',
      bold: '- High contrast colors\n- Strong typography\n- Vibrant gradients\n- Eye-catching elements',
      neobrutalism: '- Raw, unpolished aesthetic\n- Thick black borders\n- High contrast\n- Bold, unconventional styling'
    };
    return characteristics[name] || '- Standard design characteristics';
  }

  getDesignSystemUseCase(name) {
    const useCases = {
      standard: '- Corporate websites\n- Professional services\n- Business applications\n- Government sites',
      minimal: '- Creative portfolios\n- Design agencies\n- Modern startups\n- Art galleries',
      bold: '- Marketing campaigns\n- Product launches\n- Event websites\n- E-commerce stores',
      neobrutalism: '- Creative portfolios\n- Experimental projects\n- Artistic brands\n- Design showcases'
    };
    return useCases[name] || '- General purpose websites';
  }

  getDesignSystemStyling(name) {
    const styling = {
      standard: 'Uses standard Tailwind classes with subtle enhancements',
      minimal: 'Emphasizes white space, thin fonts, and minimal color',
      bold: 'Uses gradients, bold colors, and strong typography',
      neobrutalism: 'Features thick borders, high contrast, and unconventional styling'
    };
    return styling[name] || 'Standard styling approach';
  }

  getDesignSystemExampleClasses(name) {
    const examples = {
      standard: '.text-foreground { color: hsl(var(--foreground)); }\n.bg-background { background-color: hsl(var(--background)); }',
      minimal: '.text-gray-900 { color: #111827; }\n.font-thin { font-weight: 100; }',
      bold: '.bg-gradient-to-br { background-image: linear-gradient(to bottom right, ...); }\n.font-black { font-weight: 900; }',
      neobrutalism: '.border-4 { border-width: 4px; }\n.border-black { border-color: #000000; }'
    };
    return examples[name] || '.standard-classes { /* standard styles */ }';
  }

  getModuleName(section) {
    if (section.name.includes('home')) return 'main';
    if (section.name.includes('product')) return 'shop';
    if (section.name.includes('about')) return 'about';
    if (section.name.includes('team')) return 'team';
    if (section.name.includes('blog')) return 'blog';
    if (section.name.includes('contact')) return 'main';
    return 'main';
  }

  getSectionSlug(section) {
    return section.name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '');
  }
}

module.exports = DocsGenerator;
