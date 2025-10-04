# BuiltJS Registry Starter Project - Planning Document

## Project Overview

**Goal**: Create a starter registry project that can accept JSON configuration files to generate a complete shadcn/ui registry with blocks, components, and documentation.

**Approach**: JSON-driven configuration system that allows users to define their registry structure, blocks, design systems, and content through configuration files.

## Architecture Planning

### Core Concept
The starter project will be a **template generator** that:
1. Accepts JSON configuration files
2. Generates a complete registry project structure
3. Creates all necessary files (components, registry data, documentation)
4. Follows the established patterns from the reference project

### Key Requirements
- ✅ JSON-driven configuration
- ✅ Follows reference project standards
- ✅ Generates complete registry structure
- ✅ Includes all 4 design systems
- ✅ Creates proper documentation
- ✅ Maintains Built.js compatibility
- ✅ Supports custom components and PortableText

## Configuration System Design

### 1. Registry Configuration (`registry-config.json`)
```json
{
  "name": "my-custom-registry",
  "version": "1.0.0",
  "baseUrl": "https://my-registry.vercel.app",
  "description": "Custom registry for my project",
  "modules": [
    {
      "name": "main",
      "label": "Main",
      "description": "Primary landing page sections",
      "sections": ["hero-section", "features", "cta"]
    }
  ],
  "designSystems": [
    {
      "name": "standard",
      "label": "Standard",
      "description": "Clean, professional design"
    }
  ]
}
```

### 2. Blocks Configuration (`blocks-config.json`)
```json
{
  "blocks": [
    {
      "name": "main-hero-section-standard",
      "module": "main",
      "section": "hero-section",
      "designSystem": "standard",
      "fields": {
        "headline": { "type": "string", "required": true },
        "subheadline": { "type": "text", "required": false },
        "ctaText": { "type": "string", "required": true },
        "ctaLink": { "type": "url", "required": true }
      },
      "data": {
        "headline": "Welcome to Our Platform",
        "subheadline": "Build amazing products with our tools",
        "ctaText": "Get Started",
        "ctaLink": "/signup"
      },
      "collections": {
        "featureItem": { "config": { "limit": 3 } }
      },
      "dependencies": ["lucide-react"],
      "shadcnComponents": ["Button"],
      "lucideIcons": ["ArrowRight"],
      "masterDetail": {
        "isMaster": false,
        "isDetail": false
      }
    }
  ]
}
```

### 3. Collections Configuration (`collections-config.json`)
```json
{
  "collections": {
    "featureItem": [
      {
        "_id": "feature-1",
        "_type": "featureItem",
        "slug": "advanced-analytics",
        "title": "Advanced Analytics",
        "description": "Get detailed insights into your business performance",
        "icon": "BarChart3",
        "benefit": "Make data-driven decisions",
        "category": "Analytics"
      }
    ],
    "teamMemberItem": [
      {
        "_id": "team-1",
        "_type": "teamMemberItem",
        "slug": "john-doe",
        "name": "John Doe",
        "role": "CEO & Founder",
        "bio": "Visionary leader with 10+ years experience",
        "image": {
          "url": "https://placehold.co/400x400",
          "alt": "John Doe profile"
        }
      }
    ]
  }
}
```

### 4. Content Types Configuration (`content-types-config.json`)
```json
{
  "contentTypes": {
    "featureItem": {
      "name": "featureItem",
      "title": "Feature Item",
      "dataPosition": 1,
      "fields": [
        {
          "name": "title",
          "type": "string",
          "required": true
        },
        {
          "name": "description",
          "type": "text",
          "required": true
        },
        {
          "name": "icon",
          "type": "string",
          "required": false
        }
      ]
    }
  }
}
```

## Generator System Design

### File Structure
```
builtjs-registry-starter/
├── config/                          # JSON configuration files
│   ├── registry-config.json
│   ├── blocks-config.json
│   ├── collections-config.json
│   ├── content-types-config.json
│   └── templates-config.json
├── generator/                       # Generator scripts
│   ├── index.js                     # Main generator
│   ├── registry-generator.js        # Registry file generation
│   ├── component-generator.js       # Component generation
│   ├── docs-generator.js            # Documentation generation
│   └── utils/                       # Utility functions
├── templates/                       # Template files
│   ├── component-template.tsx
│   ├── registry-template.json
│   ├── docs-template.md
│   └── package-template.json
├── output/                          # Generated project
│   └── [generated-registry-project]/
└── README.md                        # Usage instructions
```

### Generator Workflow
1. **Parse Configuration**: Read and validate all JSON config files
2. **Generate Registry Files**: Create `registry.json`, `blocks-index.json`, etc.
3. **Generate Components**: Create all block components with proper structure
4. **Generate Documentation**: Create AI_REFERENCE.md and docs/
5. **Generate Project Files**: Create package.json, Next.js config, etc.
6. **Validate Output**: Ensure all files are properly generated

## Component Generation Strategy

### Template-Based Generation
- Use template files for consistent structure
- Replace placeholders with configuration data
- Maintain proper TypeScript interfaces
- Follow established patterns from reference project

### Design System Support
- Generate all 4 design system variations
- Apply appropriate styling patterns
- Maintain consistency within each design system
- Support custom styling overrides

### Custom Components
- Generate shared components in `components/shared/`
- Include PortableText components
- Support custom component definitions
- Maintain Built.js compatibility

## Documentation Generation

### Auto-Generated Documentation
- Create AI_REFERENCE.md from configuration
- Generate design system documentation
- Create usage examples and guidelines
- Include API reference for configuration

### Customizable Documentation
- Allow custom documentation sections
- Support markdown templates
- Include generated examples
- Maintain consistency with reference project

## Implementation Phases

### Phase 1: Core Generator
- [ ] Basic JSON parsing and validation
- [ ] Registry file generation
- [ ] Simple component generation
- [ ] Basic documentation generation

### Phase 2: Advanced Features
- [ ] Design system variations
- [ ] Collection and content type support
- [ ] Custom component generation
- [ ] PortableText integration

### Phase 3: Polish & Testing
- [ ] Error handling and validation
- [ ] Template customization
- [ ] Documentation generation
- [ ] Testing and validation

### Phase 4: Documentation & Examples
- [ ] Comprehensive README
- [ ] Example configurations
- [ ] Usage tutorials
- [ ] Best practices guide

## Technical Considerations

### Dependencies
- Node.js for generator scripts
- Template engine (Handlebars or similar)
- JSON schema validation
- File system operations

### Validation
- JSON schema validation for all config files
- Required field checking
- Type validation
- Cross-reference validation

### Error Handling
- Clear error messages for invalid configurations
- Validation warnings
- Graceful fallbacks
- Helpful suggestions for fixes

## Success Criteria

### Functional Requirements
- ✅ Generates complete registry project
- ✅ All files follow reference project standards
- ✅ Supports all 4 design systems
- ✅ Includes proper documentation
- ✅ Maintains Built.js compatibility

### Quality Requirements
- ✅ Clean, readable generated code
- ✅ Proper TypeScript interfaces
- ✅ Consistent file structure
- ✅ Comprehensive documentation
- ✅ Easy to use and understand

## Next Steps

1. **Review Configuration Structure**: Validate the JSON schema design
2. **Create Generator Scripts**: Implement core generation logic
3. **Build Template System**: Create reusable templates
4. **Test with Sample Data**: Validate with example configurations
5. **Iterate and Refine**: Improve based on testing results

---

*This planning document will be updated as we progress through the implementation phases.*
