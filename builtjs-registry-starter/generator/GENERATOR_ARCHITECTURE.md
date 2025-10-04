# Generator Architecture Documentation

This document explains how the BuiltJS Registry Generator creates the `output/generated-registry` directory structure from Built.js theme configuration.

## 📁 Directory Creation Process

The `output/generated-registry` directory is created through a **5-step process** in the main generator:

### **🏗️ Step-by-Step Creation Process:**

#### **1. Main Generator Initialization**
```javascript
// In index.js constructor
this.outputPath = './output';  // Base output directory
```

#### **2. Registry Files Generation**
```javascript
// In RegistryGenerator.generate()
const outputDir = path.join(this.outputPath, 'generated-registry');
await fs.mkdir(outputDir, { recursive: true });  // Creates ./output/generated-registry/

// Creates subdirectories:
const registryDataDir = path.join(outputDir, 'registry-data');
await fs.mkdir(registryDataDir, { recursive: true });  // Creates ./output/generated-registry/registry-data/
```

#### **3. Component Generation**
```javascript
// In ComponentGenerator.generate()
const outputDir = path.join(this.outputPath, 'generated-registry');

// For each section + template + design system combination:
const componentDir = path.join(outputDir, 'blocks', moduleName, sectionSlug, designSystem.name);
await fs.mkdir(componentDir, { recursive: true });  // Creates ./output/generated-registry/blocks/[module]/[section]/[designSystem]/
```

#### **4. Documentation Generation**
```javascript
// In DocsGenerator.generate()
const outputDir = path.join(this.outputPath, 'generated-registry');
const docsDir = path.join(outputDir, 'docs');
await fs.mkdir(docsDir, { recursive: true });  // Creates ./output/generated-registry/docs/
```

#### **5. Project Files Generation**
```javascript
// In generatePackageJson(), generateNextConfig(), etc.
const outputDir = path.join(this.outputPath, 'generated-registry');
await fs.promises.mkdir(outputDir, { recursive: true });  // Ensures directory exists
```

## 📂 Final Directory Structure

```
output/
└── generated-registry/                    # Created by RegistryGenerator
    ├── registry.json                      # Main registry file
    ├── registry-data/                     # Registry data directory
    │   ├── blocks-index.json             # Block definitions
    │   ├── collections-data.json         # Collection data
    │   └── content-types.json            # Content type schemas
    ├── blocks/                           # Component directory
    │   ├── main/                        # Main module
    │   │   ├── header/
    │   │   │   └── skeleton/
    │   │   │       └── component.tsx
    │   │   ├── footer/
    │   │   │   └── skeleton/
    │   │   │       └── component.tsx
    │   │   └── home-landing/
    │   │       └── skeleton/
    │   │           └── component.tsx
    │   ├── shop/                        # Shop module
    │   │   ├── product-article-landing/
    │   │   │   └── skeleton/
    │   │   │       └── component.tsx
    │   │   └── product-category-list-landing/
    │   │       └── skeleton/
    │   │           └── component.tsx
    │   └── richjava_about-shadcn/       # Plugin module
    │       ├── header/
    │       │   └── skeleton/
    │       │       └── component.tsx
    │       └── about-hero/
    │           └── skeleton/
    │               └── component.tsx
    ├── components/                      # Shared components
    │   └── shared/
    │       ├── portable-text-components.tsx
    │       └── index.ts
    ├── docs/                           # Documentation
    │   ├── README.md
    │   └── DESIGN_SYSTEMS.md
    ├── package.json                    # Project files
    ├── next.config.js
    ├── tailwind.config.js
    ├── tsconfig.json
    ├── README.md
    └── AI_REFERENCE.md
```

## 🔧 Key Creation Methods

### **Directory Creation:**
- `fs.mkdir(path, { recursive: true })` - Creates directories recursively
- `fs.promises.mkdir()` - Async version for project files

### **File Creation:**
- `fs.writeFile()` - Writes component files
- `fs.promises.writeFile()` - Writes project configuration files

### **Path Construction:**
- `path.join(outputDir, 'blocks', moduleName, sectionSlug, designSystem.name)` - Builds component paths
- `path.join(outputDir, 'registry-data')` - Builds registry data paths

## 🎯 Dynamic Path Generation

The generator creates paths dynamically based on your configuration:

### **1. Module Names**
Derived from section names:
- `homeLanding` → `main`
- `productArticleLanding` → `shop`
- `aboutHero` → `about`
- Plugin sections → plugin namespace (e.g., `richjava_about-shadcn`)

### **2. Section Slugs**
Converted from camelCase to kebab-case:
- `homeLanding` → `home-landing`
- `productArticleLanding` → `product-article-landing`
- `aboutHero` → `about-hero`

### **3. Design System Names**
From your `theme.json` configuration:
- Uses `designSystem.name` property
- Example: `"skeleton"` from your config

### **4. Template Names**
From your `templates.json`:
- `header1`, `cover1`, `article1`, etc.

## 📋 Generation Flow

### **Phase 1: Configuration Parsing**
1. Parse `theme.json` → Extract design systems
2. Parse `sections.json` → Extract sections and templates
3. Parse `collections/` → Extract collection data
4. Parse `plugins/` → Extract plugin configurations

### **Phase 2: Registry Generation**
1. Create `generated-registry/` directory
2. Generate `registry.json` with design systems and blocks
3. Create `registry-data/` subdirectory
4. Generate `blocks-index.json`, `collections-data.json`, `content-types.json`

### **Phase 3: Component Generation**
1. For each section + template + design system combination:
   - Create component directory: `blocks/[module]/[section]/[designSystem]/`
   - Generate `component.tsx` file
2. Create `components/shared/` directory
3. Generate shared components (`portable-text-components.tsx`, `index.ts`)

### **Phase 4: Documentation Generation**
1. Create `docs/` directory
2. Generate `README.md`, `DESIGN_SYSTEMS.md`
3. Generate `AI_REFERENCE.md` in root

### **Phase 5: Project Files Generation**
1. Generate `package.json` with dependencies
2. Generate `next.config.js` with Next.js configuration
3. Generate `tailwind.config.js` with Tailwind setup
4. Generate `tsconfig.json` with TypeScript configuration

## 🎨 Component Structure

Each generated component follows this structure:

```
blocks/[module]/[section]/[designSystem]/component.tsx
```

### **Example:**
```
blocks/shop/product-article-landing/skeleton/component.tsx
```

### **Component Content:**
- TypeScript interfaces for props
- Design system-specific styling
- Data handling for content and collections
- Responsive design patterns
- Accessibility features

## 🔄 Customization Points

### **Adding New Design Systems**
1. Add to `theme.json` designSystems array
2. Update design system class methods in `component-generator.js`
3. Regenerate components

### **Adding New Sections**
1. Add to `sections.json`
2. Add corresponding templates to `templates.json`
3. Regenerate components

### **Modifying Component Structure**
1. Update `generateComponentContent()` method
2. Modify design system class methods
3. Regenerate components

## 🚀 Usage

```bash
# Run the generator
node index.js ../data

# Output will be created in:
./output/generated-registry/
```

## 📝 Notes

- The generator respects your `theme.json` configuration exactly
- Only generates design systems defined in your configuration
- Creates components for all section + template + design system combinations
- Maintains consistent directory structure across all generated components
- Includes proper TypeScript interfaces and design system styling

---

*This documentation explains the complete process of how the BuiltJS Registry Generator creates the `output/generated-registry` directory structure from your Built.js theme configuration.*
