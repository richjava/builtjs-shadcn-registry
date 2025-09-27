# BuiltJS Shadcn Registry - AI Reference Guide

## Overview

This is a **custom shadcn/ui registry** that extends the standard shadcn registry format with enhanced metadata for AI-powered component selection and generation. The registry contains 160+ pre-built blocks organized into modules, sections, and templates.

## New Simplified Architecture

**IMPORTANT**: This registry has been restructured to eliminate redundant `block.json` files and use a simplified architecture where public files serve as the single source of truth.

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

### Key Changes

1. **No `block.json` files** - All block metadata is now in `public/registry/blocks-index.json`
2. **Centralized collections** - All collection data is in `public/registry/collections-data.json`
3. **Direct editing** - Modify public files directly, no build step required
4. **AI accessible** - All definition files are in the public directory
5. **Simplified workflow** - Edit component files + update public registry files

## Registry Structure

### Core Organization
- **Modules** (formerly categories): Top-level groupings (About, Main, Features, Services, Team, FAQ, Logos, Newsletter, Blog, Gallery, Pricing)
- **Sections**: Specific functionality within modules (e.g., "hero-section", "team-profiles", "pricing-plans")
- **Templates**: Theme variations of sections (Standard, Minimal, Bold, Neobrutalism)

### Block Naming Convention
Blocks follow the pattern: `{module}-{section}-{template}-{theme}`
- Example: `main-hero-section-hero-section-standard`
- Example: `about-team-cards-bold`
- Example: `pricing-plans-plans-minimal`

## Registry Files Structure

### 1. `public/registry.json` - Minimal Registry
This file contains only essential metadata following ShadCN conventions:

```json
{
  "$schema": "https://ui.shadcn.com/registry.json",
  "name": "builtjs-registry",
  "version": "1.0.0",
  "baseUrl": "https://builtjs-shadcn-registry.vercel.app",
  
  "themes": [
    {
      "name": "standard",
      "label": "Standard", 
      "description": "Clean, modern design with shadcn/ui components"
    },
    {
      "name": "minimal",
      "label": "Minimal",
      "description": "Ultra-clean, sophisticated design with subtle typography and spacing"
    },
    {
      "name": "bold", 
      "label": "Bold",
      "description": "High-impact design with vibrant colors and dynamic layouts"
    },
    {
      "name": "neobrutalism",
      "label": "Neobrutalism",
      "description": "Raw, unpolished aesthetics with thick borders and stark shadows"
    }
  ],
  
  "blocks": [
    {
      "name": "main-hero-section-hero-section-standard",
      "moduleName": "Main",
      "sectionName": "Hero Section",
      "templateName": "Hero Section",
      "themeName": "Standard",
      "theme": "standard",
      "description": "Hero section template with clean, modern styling and professional design."
    }
  ]
}
```

### 2. `public/registry/blocks-index.json` - Complete Block Definitions
This file contains the full block definitions with fields, data, and collections:

```json
{
  "main-hero-section-hero-section-standard": {
    "fields": {
      "headline": {
        "type": "string"
      },
      "subheadline": {
        "type": "text"
      },
      "ctaText": {
        "type": "string"
      },
      "ctaLink": {
        "type": "url"
      }
    },
    "data": {
      "headline": "Build Amazing Products",
      "subheadline": "Create stunning user experiences with our comprehensive design system and component library.",
      "ctaText": "Get Started",
      "ctaLink": "/signup"
    },
    "collections": {
      "featureItem": {
        "limit": 3
      }
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

### 3. `public/registry/collections-data.json` - Collection Data
This file contains all the data for collections referenced by blocks:

```json
{
  "blogItem": [
    {
      "_id": "blog-post-1",
      "_type": "blogItem",
      "slug": "getting-started-modern-javascript",
      "title": "Getting Started with Modern JavaScript",
      "excerpt": "Learn the fundamentals of modern JavaScript and best practices.",
      "author": "Alex Chen",
      "publishedDate": "2024-01-10",
      "readTime": "5 min read",
      "image": {
        "url": "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&h=400&fit=crop",
        "alt": "JavaScript code on computer screen"
      },
      "tags": ["JavaScript", "Tutorial"],
      "content": "<p>JavaScript has evolved significantly...</p>"
    }
  ],
  "teamMemberItem": [
    {
      "_id": "teamMemberItem-1",
      "_type": "teamMemberItem",
      "slug": "sarah-chen",
      "name": "Sarah Chen",
      "role": "CEO & Co-Founder",
      "bio": "Visionary leader with 15+ years in tech, passionate about building products that make a difference.",
      "image": {
        "url": "https://placehold.co/400x400/000000/FFFFFF?text=SC",
        "alt": "Sarah Chen profile photo"
      },
      "social": {
        "linkedin": "https://linkedin.com/in/sarahchen",
        "twitter": "https://twitter.com/sarahchen"
      }
    }
  ]
}
```

### 4. `public/registry/content-types.json` - Content Type Definitions
This file contains Built.js format content type definitions:

```json
{
  "blogItem": {
    "name": "blogItem",
    "title": "Blog Item",
    "dataPosition": 1,
    "fields": [
      {
        "name": "title",
        "type": "string",
        "required": true
      },
      {
        "name": "excerpt",
        "type": "text",
        "required": true
      },
      {
        "name": "content",
        "type": "text",
        "required": true
      },
      {
        "name": "image",
        "type": "image",
        "required": false
      }
    ]
  }
}
```

## Registry Block Structure

Each block in `public/registry/blocks-index.json` contains:

```json
{
  "block-name": {
    "fields": {
      "headline": {
        "type": "string"
      },
      "subheadline": {
        "type": "text"
      },
      "ctaText": {
        "type": "string"
      }
    },
    "data": {
      "headline": "Example headline",
      "subheadline": "Example subheadline",
      "ctaText": "Get Started"
    },
    "collections": {
      "featureItem": {
        "limit": 3
      }
    },
    "dependencies": ["lucide-react"],
    "shadcnComponents": ["Button", "Input", "Label"],
    "lucideIcons": ["ArrowRight", "Play", "Sparkles"],
    "masterDetail": {
      "isMaster": false,
      "isDetail": true
    }
  }
}
```

### Block Properties

- **`fields`**: Schema definition for the block's data structure
- **`data`**: Default/example data for the block
- **`collections`**: References to collection data with optional limits
- **`dependencies`**: Required npm packages
- **`shadcnComponents`**: Required ShadCN UI components
- **`lucideIcons`**: Required Lucide React icons
- **`masterDetail`**: Master/detail relationship indicators

## Theme System

### Standard Theme
- **Purpose**: Clean, professional design for broad appeal
- **Characteristics**: Minimal colors, clear typography, subtle shadows
- **Best for**: Corporate, SaaS, professional services
- **Color palette**: Neutral with one accent color
- **Typography**: Clean sans-serif fonts

### Bold Theme  
- **Purpose**: Eye-catching design with strong visual impact
- **Characteristics**: Vibrant colors, large typography, strong contrasts
- **Best for**: Creative agencies, startups, brand launches
- **Color palette**: High contrast, multiple accent colors
- **Typography**: Bold, attention-grabbing fonts

### Minimal Theme
- **Purpose**: Ultra-clean design with maximum focus on content
- **Characteristics**: Minimal elements, lots of whitespace, subtle interactions
- **Best for**: Portfolio, minimalist brands, content-focused sites
- **Color palette**: Monochromatic with subtle accents
- **Typography**: Clean, readable fonts

### Neobrutalism Theme
- **Purpose**: Raw, unpolished aesthetics with bold design choices
- **Characteristics**: Thick borders, stark shadows, high-contrast colors, raw typography
- **Best for**: Creative portfolios, experimental brands, design-forward projects
- **Color palette**: High contrast, bold colors, stark black/white combinations
- **Typography**: Bold, impactful fonts with strong character

## Component Interface Pattern

All components follow this interface structure:

```typescript
interface ComponentProps {
  content: {
    data?: {
      // Field definitions from registry
      headline: string
      subheadline: string
      ctaText: string
    }
    collections?: {
      // Content types for reusable data structures
      featureItem?: {
        _id: string
        _type: string
        slug: string
        title: string
        description: string
        icon?: string
        image?: {
          url: string
          alt: string
        }
        benefit?: string
        category?: string
      }[]
      serviceItem?: {
        _id: string
        _type: string
        slug: string
        title: string
        description: string
        price?: string
        features?: string[]
        image?: {
          url: string
          alt: string
        }
      }[]
      blogItem?: {
        _id: string
        _type: string
        slug: string
        title: string
        excerpt: string
        content: string
        publishedAt: string
        author?: {
          name: string
          image?: {
            url: string
            alt: string
          }
        }
        image?: {
          url: string
          alt: string
        }
        tags?: string[]
      }[]
    }
  }
}

export default function Component({ content }: ComponentProps) {
  const data = content.data || {
    // Default data from registry
    headline: "Default headline",
    subheadline: "Default subheadline",
    ctaText: "Get Started"
  }
  
  const collections = content.collections || {}
  
  return (
    <section>
      {/* Component implementation */}
    </section>
  )
}
```

## Content Type Definition Guidelines

### When to Define Content Types

Content types should be defined when:

1. **Reused Across Multiple Sections**: If the same data structure appears in multiple sections
   - `featureItem`: Used in Features Showcase, Hero Features, Feature Grid
   - `serviceItem`: Used in Services Offerings, Pricing Plans, Service Cards
   - `teamItem`: Used in Team Profiles, About Team, Leadership Team

2. **Has Dedicated Pages**: If the content type has its own detail pages
   - `blogItem`: Has individual blog post pages (`/blog/[slug]`)
   - `portfolioItem`: Has individual portfolio pages (`/portfolio/[slug]`)
   - `productItem`: Has individual product pages (`/products/[slug]`)

3. **Complex Data Structure**: If the content has multiple fields and relationships
   - `testimonialItem`: Author, company, role, content, rating, image
   - `caseStudyItem`: Client, project, results, images, testimonial

### Content Type Naming Convention

- Use descriptive names ending in `Item`
- Examples: `featureItem`, `serviceItem`, `blogItem`, `teamItem`
- Keep names consistent across the registry

### Content Type Structure

Each content type should include:

```typescript
{
  _id: string           // Unique identifier
  _type: string         // Content type name
  slug: string          // URL-friendly identifier
  title: string         // Primary display text
  description: string  // Supporting text
  // Additional fields specific to the content type
}
```

## Sanity CMS Data Types

Content type fields in the `contentTypes` section should use **Sanity CMS data types**:

### Basic Types
- **`string`**: Short text fields (titles, names, labels)
- **`text`**: Long text fields (descriptions, content, excerpts)
- **`number`**: Numeric values (prices, ratings, counts)
- **`boolean`**: True/false values (featured, active, published)
- **`date`**: Date values (publishedAt, createdAt, updatedAt)
- **`datetime`**: Date and time values

### Complex Types
- **`image`**: Image objects with url, alt, dimensions
- **`array`**: Lists of items (features, tags, categories)
- **`object`**: Nested objects (author, location, metadata)
- **`reference`**: References to other content types
- **`slug`**: URL-friendly identifiers
- **`url`**: Web addresses and links
- **`email`**: Email addresses
- **`phone`**: Phone numbers

### Field Configuration Examples
```json
{
  "contentTypes": {
    "blogItem": {
      "name": "Blog Post",
      "description": "A blog post with content and metadata",
      "fields": {
        "title": "string",
        "excerpt": "text", 
        "content": "text",
        "publishedAt": "datetime",
        "author": "object",
        "image": "image",
        "tags": "array",
        "slug": "slug",
        "featured": "boolean"
      }
    }
  }
}
```

### Sanity Field Validation
- **Required fields**: Use `required: true` in field definitions
- **Field validation**: Sanity provides built-in validation rules
- **Custom validation**: Define custom validation functions
- **Field groups**: Organize related fields into groups

## Master/Detail Relationship System

The registry includes a `masterDetail` property for each block to help AI models understand the relationship between list views and detail views. This is crucial for proper content architecture and navigation.

### Master/Detail Property Structure

```json
{
  "masterDetail": {
    "isMaster": boolean,
    "isDetail": boolean
  }
}
```

### Master/Detail Patterns

#### Blog Module
- **Master Blocks** (`isMaster: true, isDetail: false`):
  - `blog-posts`: Blog post listings and previews
  - `featured-posts`: Featured blog post collections
- **Detail Blocks** (`isMaster: false, isDetail: true`):
  - `blog-article`: Individual blog post pages

#### Gallery Module
- **Master Blocks** (`isMaster: true, isDetail: false`):
  - `portfolio`: Portfolio item listings
  - `products`: Product gallery listings
  - `showcase`: Showcase item collections

#### Team Module
- **Master Blocks** (`isMaster: true, isDetail: false`):
  - `profiles`: Team member listings
  - `culture`: Company culture sections
  - `members`: Team member collections

#### Other Modules
- **Neither Master nor Detail** (`isMaster: false, isDetail: false`):
  - Most sections in `main`, `features`, `services`, `faq`, `logos`, `newsletter`, `pricing`
  - These are standalone sections without master/detail relationships

### AI Decision Making with Master/Detail

#### Content Architecture
- **For List Pages**: Use master blocks (`isMaster: true`) to display collections of items
- **For Detail Pages**: Use detail blocks (`isDetail: true`) to display individual item content
- **For Standalone Pages**: Use neither master nor detail blocks for self-contained sections

#### Navigation Patterns
- **Master → Detail**: Link from master blocks to detail blocks using appropriate routing
- **Detail → Master**: Provide "back to list" navigation from detail blocks
- **Cross-References**: Use master blocks to show related items from other collections

#### Content Generation
- **Master Blocks**: Generate summary content, previews, and collection metadata
- **Detail Blocks**: Generate full content, detailed descriptions, and comprehensive information
- **Standalone Blocks**: Generate complete, self-contained content

## AI Decision Framework

### Section Selection by Use Case
- **Landing Page**: `hero-section`, `features-showcase`, `social-proof`, `pricing-plans`
- **About Page**: `about-landing`, `team-profiles`, `company-story`, `values-grid`
- **Contact Page**: `contact-lead-generation`, `trust-indicators`
- **Pricing Page**: `pricing-plans`, `pricing-tables`, `value-proposition`
- **Blog Page**: `blog-posts`, `featured-posts`, `blog-article`

### Theme Selection by Brand
- **Professional/Corporate**: `standard`
- **Creative/Startup**: `bold`
- **Minimalist/Portfolio**: `minimal`

### Business Type Mapping
- **SaaS**: `hero-section`, `features-showcase`, `pricing-plans`, `faq-questions`
- **E-commerce**: `hero-section`, `product-showcase`, `testimonials`, `pricing-plans`
- **Agency**: `hero-section`, `portfolio-showcase`, `team-profiles`, `services-offerings`
- **Blog**: `blog-posts`, `featured-posts`, `newsletter-signup`

## Content Generation Guidelines

### Headlines
- **Hero sections**: 5-8 words, value proposition focused
- **Feature sections**: Benefit-focused, action-oriented
- **Team sections**: Personal, approachable tone

### CTAs (Call-to-Actions)
- **Primary**: "Get Started", "Try Free", "Learn More", "Sign Up"
- **Secondary**: "View Demo", "See Examples", "Contact Sales"

### Descriptions
- **Subheadlines**: 1-2 sentences, supporting explanation
- **Feature descriptions**: Benefit-focused, outcome-oriented
- **Team bios**: Personal, expertise-focused

## Shadcn Component Usage

### Common Components
- **Button**: Primary interaction element
- **Input**: Form fields, search boxes
- **Label**: Form labels, accessibility
- **Card**: Content containers, feature cards
- **Badge**: Status indicators, tags

### Icon Usage Patterns
- **ArrowRight**: CTAs, navigation
- **Play**: Video content, demos
- **Star**: Ratings, favorites
- **Check**: Success states, features
- **Sparkles**: Premium features, highlights

## Data Structure Patterns

### Simple Fields
```json
{
  "fields": {
    "headline": "string",
    "subheadline": "string",
    "ctaText": "string"
  }
}
```

### Object Fields
```json
{
  "fields": {
    "heroImage": "object"
  },
  "data": {
    "heroImage": {
      "url": "https://example.com/image.jpg",
      "alt": "Descriptive alt text"
    }
  }
}
```

### Collection Fields (Content Types)
```json
{
  "collectionsData": {
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
      },
      {
        "_id": "feature-2",
        "_type": "featureItem", 
        "slug": "real-time-monitoring",
        "title": "Real-time Monitoring",
        "description": "Monitor your systems 24/7 with instant alerts",
        "icon": "Activity",
        "benefit": "Prevent downtime",
        "category": "Monitoring"
      }
    ]
  }
}
```

## Block Creation Process Flow

### 1. **Initial Planning Phase**

#### **Decision Point: What type of block is needed?**
- **New Module**: Create entirely new module (e.g., "E-commerce", "Dashboard")
- **New Section**: Add section to existing module (e.g., "Contact Form" to "Main")
- **New Template**: Add theme variation to existing section (e.g., "neobrutalism" theme for "hero-section")

#### **Decision Point: Which module should contain this block?**
- **About**: Company information, team, values, story
- **Main**: Landing page elements, hero sections, CTAs
- **Features**: Product features, capabilities, benefits
- **Services**: Service offerings, pricing, packages
- **Team**: Team members, leadership, profiles
- **FAQ**: Questions, answers, help content
- **Logos**: Brand showcases, client logos, partnerships
- **Newsletter**: Email signup, subscription forms
- **Blog**: Blog posts, articles, content
- **Gallery**: Portfolio, images, media
- **Pricing**: Pricing plans, tiers, packages

### 2. **Content Structure Planning**

#### **Decision Point: Does this block need content types?**
**YES** - Create content type if:
- Data structure will be reused across multiple sections
- Block has dedicated detail pages (e.g., blog posts, portfolio items)
- Complex data with multiple fields and relationships

**NO** - Use simple data fields if:
- Block-specific data that won't be reused
- Simple structure with few fields
- One-time use content

#### **Decision Point: What data fields are needed?**
- **Required fields**: `title`, `description`, `ctaText`
- **Optional fields**: `subheadline`, `image`, `icon`, `benefit`
- **Content type fields**: Based on content type definition
- **Theme-specific fields**: Fields that vary by theme

### 3. **Theme Selection Process**

#### **Decision Point: Which theme fits the use case?**
- **Standard**: Professional, corporate, SaaS, broad appeal
- **Bold**: Creative, startup, brand launch, high impact
- **Minimal**: Portfolio, minimalist brand, content-focused
- **Neobrutalism**: Creative, experimental, design-forward, raw aesthetics

#### **Decision Point: Should all themes be created?**
- **YES**: If the section will be used across different brand personalities
- **NO**: If the section is theme-specific (e.g., minimalist portfolio)

### 4. **Component Selection Process**

#### **Decision Point: Which shadcn components are needed?**
- **Layout**: `Card`, `Container`, `Grid`
- **Navigation**: `Button`, `Link`, `Tabs`
- **Forms**: `Input`, `Label`, `Select`, `Textarea`
- **Feedback**: `Alert`, `Badge`, `Toast`
- **Data Display**: `Table`, `List`, `Avatar`

#### **Decision Point: Which Lucide icons are appropriate?**
- **Actions**: `ArrowRight`, `Play`, `Download`
- **Features**: `Star`, `Check`, `Shield`
- **Navigation**: `Menu`, `Search`, `Filter`
- **Status**: `AlertCircle`, `CheckCircle`, `Info`

### 4.5. **Custom Components**

#### **Decision Point: Do you need custom components?**
Custom components used within block templates must be placed in the `components/shared` directory and imported from there:

```typescript
// ✅ Correct - Import from components/shared
import { createPortableTextComponents } from '@/components/shared'

// ❌ Incorrect - Don't import from lib or other locations
import { createPortableTextComponents } from '@/lib/portable-text-components'
```

#### **Shared Components Structure**
```
components/
├── ui/                    # ShadCN UI components
└── shared/                # Custom shared components
    ├── index.ts          # Export all shared components
    ├── portable-text-components.tsx
    └── [other-shared-components].tsx
```

#### **PortableText Components**
The registry includes theme-aware PortableText components for rendering rich text content:

```typescript
import { PortableText } from '@portabletext/react'
import { createPortableTextComponents } from '@/components/shared'

// In your component
<PortableText 
  value={entry.content} 
  components={createPortableTextComponents('bold')} // 'standard', 'minimal', 'bold', 'neobrutalism'
/>
```

The `createPortableTextComponents` function provides theme-specific styling for:
- Headings (h1, h2, h3, h4)
- Paragraphs and text formatting
- Lists (bullet and numbered)
- Links and emphasis
- Code blocks and inline code
- Blockquotes

### 5. **Implementation Flow**

#### **Step 1: Create Component File**
```
blocks/{module}/{section}/{template}/
└── component.tsx
```

#### **Step 2: Define Component Interface**
- Define `ComponentProps` interface
- Structure `content.data` fields
- Structure `content.collections` if using content types
- Add default data fallbacks

#### **Step 3: Implement Component Logic**
- Extract data from props
- Handle theme-specific styling
- Implement responsive design
- Add accessibility features

#### **Step 4: Update Registry Files**
- Add block definition to `public/registry/blocks-index.json`
- Add collection data to `public/registry/collections-data.json` (if needed)
- Add content type to `public/registry/content-types.json` (if needed)
- Update `public/registry.json` with block metadata

#### **Step 5: Test Block Rendering**
- Test block rendering in preview
- Verify data structure matches interface
- Test all theme variations (if multiple created)

### 6. **Alternative Flows**

#### **Flow A: Simple Block (No Content Types)**
1. Plan simple data structure
2. Create single theme variation
3. Use basic shadcn components
4. Implement with simple props interface
5. Update `blocks-index.json` only

#### **Flow B: Complex Block (With Content Types)**
1. Define content type in `content-types.json`
2. Create multiple theme variations
3. Use advanced shadcn components
4. Implement with collections interface
5. Update all registry files

#### **Flow C: Theme-Specific Block**
1. Create only relevant theme(s)
2. Optimize for specific use case
3. Use theme-appropriate components
4. Implement with theme-specific styling
5. Update registry files accordingly

#### **Flow D: Reusable Block**
1. Create content type for reusability
2. Design flexible data structure
3. Use modular components
4. Implement with generic interface
5. Update all registry files

### 7. **Validation Checklist**

#### **Before Implementation**
- [ ] Block purpose is clearly defined
- [ ] Appropriate module/section selected
- [ ] Theme choice matches use case
- [ ] Content type decision is made
- [ ] Required components identified

#### **After Implementation**
- [ ] Block renders correctly in preview
- [ ] All themes work (if multiple created)
- [ ] Data structure matches interface
- [ ] Components are properly imported
- [ ] Accessibility features included
- [ ] Responsive design implemented
- [ ] Registry files updated correctly

## AI Generation Best Practices

1. **Use the registry metadata** to understand context and purpose
2. **Follow the theme characteristics** for consistent design
3. **Leverage the component dependencies** to understand available UI elements
4. **Use the data structure** to generate appropriate content
5. **Consider the business type and scenarios** for relevant content
6. **Maintain consistency** with the established patterns
7. **Follow the block creation process flow** for systematic development

## Key Differences from Standard Shadcn

1. **Enhanced metadata** for AI decision-making
2. **Module/Section/Template organization** instead of flat categories
3. **Theme system** with Standard/Bold/Minimal variations
4. **Component dependency tracking** (shadcnComponents, lucideIcons)
5. **Structured content data** with fields and collectionsData
6. **Business context** (businessTypes, scenarios, useCase)

This registry is designed to enable AI models to make intelligent decisions about component selection, content generation, and theme application while maintaining consistency with the established design system.
