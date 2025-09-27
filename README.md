# Built.js Shadcn Registry

A comprehensive shadcn/ui registry for a [Built.js](https://builtjs.com) theme featuring reusable React templates and blocks for building modern web applications.

## 🚀 Features

- **160+ Templates**: Across 11 modules with 4 theme variations each
- **4 Theme System**: Standard, Minimal, Bold, and Neobrutalism themes
- **Shadcn/ui Compatible**: Fully compatible with shadcn/ui component system
- **TypeScript Ready**: Built with TypeScript for better developer experience
- **Responsive Design**: All templates are mobile-first and fully responsive
- **Modern Stack**: Next.js 14, Tailwind CSS, and Radix UI primitives
- **Simplified Architecture**: No build step required, direct file editing

## 🎨 Theme System

### Standard Theme
Clean, professional design for broad appeal - perfect for corporate, SaaS, and professional services.

### Minimal Theme
Ultra-clean, sophisticated design with subtle typography and spacing - ideal for portfolios and minimalist brands.

### Bold Theme
High-impact design with vibrant colors and dynamic layouts - great for creative agencies and startups.

### Neobrutalism Theme
Raw, unpolished aesthetics with thick borders and stark shadows - perfect for creative portfolios and experimental brands.

## 📦 Template Modules

- **About** - Company information, team, values, story sections
- **Main** - Landing page elements, hero sections, CTAs
- **Features** - Product features, capabilities, benefits
- **Services** - Service offerings, pricing, packages
- **Team** - Team members, leadership, profiles
- **FAQ** - Questions, answers, help content
- **Logos** - Brand showcases, client logos, partnerships
- **Newsletter** - Email signup, subscription forms
- **Blog** - Blog posts, articles, content
- **Gallery** - Portfolio, images, media
- **Pricing** - Pricing plans, tiers, packages

## 🏗️ New Simplified Architecture

**IMPORTANT**: The registry has been restructured to eliminate redundant `block.json` files and use a simplified architecture where public files serve as the single source of truth.

### File Structure
```
public/
├── registry.json                    # Minimal registry (ShadCN convention)
└── registry/
    ├── blocks-index.json           # Complete block definitions with fields, data, collections
    ├── collections-data.json       # All collection data (blogItem, teamMemberItem, etc.)
    └── content-types.json          # Content type definitions (Built.js format)

blocks/
└── [module]/[section]/[template]/
    └── component.tsx               # Only component files remain!
```

### Key Benefits
- **No build step required** - Edit public files directly
- **Single source of truth** - All metadata in public directory
- **AI accessible** - All definition files are publicly available
- **Simplified workflow** - Edit component files + update public registry files
- **Immediate changes** - No need to rebuild or restart

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

For templates that display rich text content (like blog articles), use PortableText with theme-aware styling:

#### Basic Usage
```typescript
import { PortableText } from '@portabletext/react'
import { createPortableTextComponents } from '@/components/shared'

// In your component
<PortableText 
  value={entry.content} 
  components={createPortableTextComponents('bold')} // Theme: 'standard', 'minimal', 'bold', 'neobrutalism'
/>
```

#### Supported Content Types
The `createPortableTextComponents` function provides theme-specific styling for:
- **Headings**: h1, h2, h3, h4 with theme-appropriate typography
- **Text**: Paragraphs with proper spacing and font weights
- **Lists**: Bullet and numbered lists with consistent styling
- **Formatting**: Bold, italic, and emphasis
- **Links**: Styled links with hover effects
- **Code**: Inline code and code blocks
- **Blockquotes**: Styled quote blocks

#### Theme-Specific Styling
Each theme provides distinct styling:

- **Standard**: Clean, professional typography with gray color scheme
- **Minimal**: Light, airy design with subtle fonts
- **Bold**: Strong, impactful typography with heavier weights and light colors for dark backgrounds
- **Neobrutalism**: Raw, high-contrast design with borders and shadows

## 🛠️ Getting Started

### Installation

1. Clone the repository:
```bash
git clone https://github.com/richjava/builtjs-shadcn-registry.git
cd builtjs-shadcn-registry
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the registry

### Development Workflow

#### For Component Changes
1. Edit `blocks/{module}/{section}/{template}/component.tsx`
2. Test in preview mode
3. No registry updates needed

#### For Data/Schema Changes
1. Edit `public/registry/blocks-index.json` for block definitions
2. Edit `public/registry/collections-data.json` for collection data
3. Edit `public/registry/content-types.json` for content types
4. Test changes immediately (no build step)

#### For New Blocks
1. Create component file in appropriate directory
2. Update `public/registry/blocks-index.json` with block definition
3. Add collection data to `public/registry/collections-data.json` (if needed)
4. Add content type to `public/registry/content-types.json` (if needed)
5. Update `public/registry.json` with block metadata
6. Test block rendering

## 🏗️ Project Structure

```
├── public/                   # Public files (served statically)
│   ├── registry.json        # Minimal registry (ShadCN convention)
│   └── registry/            # Registry data files
│       ├── blocks-index.json    # Complete block definitions
│       ├── collections-data.json # Collection data
│       └── content-types.json   # Content type definitions
├── blocks/                  # Template blocks organized by module/section/template
│   ├── about/
│   ├── main/
│   ├── features/
│   ├── services/
│   ├── team/
│   ├── faq/
│   ├── logos/
│   ├── newsletter/
│   ├── blog/
│   ├── gallery/
│   └── pricing/
├── components/              # UI components
│   ├── ui/                 # ShadCN UI components
│   └── shared/             # Custom shared components
├── lib/                     # Utility functions and helpers
├── pages/                   # Next.js pages
├── scripts/                 # Build and utility scripts
└── docs/                    # Documentation
```

### Key Files

- **`public/registry.json`** - Minimal registry following ShadCN conventions
- **`public/registry/blocks-index.json`** - Complete block definitions with fields, data, collections
- **`public/registry/collections-data.json`** - All collection data (blogItem, teamMemberItem, etc.)
- **`public/registry/content-types.json`** - Content type definitions in Built.js format
- **`lib/collection-resolver.ts`** - Utility for resolving collections and block data

## 📝 Adding New Templates

1. Create a new directory in the appropriate module/section/template structure:
```bash
mkdir -p blocks/{module}/{section}/{template}
```

2. Create your component file:
```bash
touch blocks/{module}/{section}/{template}/component.tsx
```

3. Implement your component following the established patterns

4. Update the registry files:
   - Add block definition to `public/registry/blocks-index.json`
   - Add collection data to `public/registry/collections-data.json` (if needed)
   - Add content type to `public/registry/content-types.json` (if needed)
   - Update `public/registry.json` with block metadata

5. Test your template in the preview system

### Template Configuration

Each template should be defined in `public/registry/blocks-index.json`:

```json
{
  "block-name": {
    "fields": {
      "headline": { "type": "string" },
      "subheadline": { "type": "text" },
      "ctaText": { "type": "string" }
    },
    "data": {
      "headline": "Example headline",
      "subheadline": "Example subheadline", 
      "ctaText": "Get Started"
    },
    "collections": {
      "featureItem": { "limit": 3 }
    },
    "dependencies": ["lucide-react"],
    "shadcnComponents": ["Button", "Card"],
    "lucideIcons": ["ArrowRight", "Star"],
    "masterDetail": {
      "isMaster": false,
      "isDetail": false
    }
  }
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component system
- [Built.js](https://builtjs.com) for the CMS platform
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for the accessible component primitives

## 🚀 Deployment

The registry is designed to be deployed on Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with the provided configuration

The registry will be available at your Vercel URL and can be used with the shadcn/ui CLI.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing component system
- [Radix UI](https://www.radix-ui.com/) for the primitive components
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
