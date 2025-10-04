# BuiltJS Shadcn Registry - AI Reference Guide

## Overview

This is a **custom shadcn/ui registry** that extends the standard shadcn registry format with enhanced metadata for AI-powered component selection and generation. The registry contains 160+ pre-built blocks organized into modules, sections, and templates across 4 design systems.

## Architecture

**IMPORTANT**: This registry uses a simplified architecture where public files serve as the single source of truth.

### File Structure

```
├── registry.json                    # Main registry (ShadCN convention)
├── registry-data/                   # Registry data files
│   ├── blocks-index.json           # Complete block definitions with fields, data, collections
│   ├── collections-data.json       # All collection data (blogItem, teamMemberItem, etc.)
│   └── content-types.json          # Content type definitions (Built.js format)
├── blocks/                         # Template blocks organized by module/section/designSystem
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
└── components/
    ├── ui/                         # ShadCN UI components
    └── shared/                     # Custom shared components
```

### Key Benefits
- **No build step required** - Edit files directly
- **Single source of truth** - All metadata in registry files
- **AI accessible** - All definition files are publicly available
- **Simplified workflow** - Edit component files + update registry files
- **Immediate changes** - No need to rebuild or restart

## Registry Structure

### Core Organization
- **Modules**: Top-level groupings (About, Main, Features, Services, Team, FAQ, Logos, Newsletter, Blog, Gallery, Pricing)
- **Sections**: Specific functionality within modules (e.g., "hero-section", "team-profiles", "pricing-plans")
- **Templates**: Design system variations of sections (Standard, Minimal, Bold, Neobrutalism)

### Block Naming Convention
Blocks follow the pattern: `{module}-{section}-{template}-{designSystem}`
- Example: `main-hero-section-hero-section-standard`
- Example: `about-team-cards-bold`
- Example: `pricing-plans-plans-minimal`

## Registry Files Structure

### 1. `registry.json` - Main Registry
This file contains essential metadata following ShadCN conventions:

```json
{
  "name": "builtjs-registry",
  "version": "1.0.0",
  "baseUrl": "https://builtjs-shadcn-registry.vercel.app",
  
  "designSystems": [
    {
      "name": "standard",
      "label": "Standard", 
      "description": "Clean, modern standard design with balanced design elements"
    },
    {
      "name": "minimal",
      "label": "Minimal",
      "description": "Clean, modern minimal design with clean lines and minimal elements"
    },
    {
      "name": "bold", 
      "label": "Bold",
      "description": "Clean, modern bold design with vibrant colors and strong typography"
    },
    {
      "name": "neobrutalism",
      "label": "Neobrutalism",
      "description": "Clean, modern neobrutalism design with raw, unpolished aesthetics"
    }
  ],
  
  "blocks": [
    {
      "name": "main-hero-section-hero-section-standard",
      "moduleName": "main",
      "sectionName": "hero-section",
      "templateName": "section",
      "designSystem": "standard",
      "description": "Hero section template with clean, modern styling and professional design."
    }
  ]
}
```

### 2. `registry-data/blocks-index.json` - Complete Block Definitions
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
        "config": {
          "limit": 3
        }
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

### 3. `registry-data/collections-data.json` - Collection Data
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
      "content": [
        {
          "_type": "block",
          "children": [
            {
              "_type": "span",
              "text": "JavaScript has evolved significantly..."
            }
          ]
        }
      ]
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

### 4. `registry-data/content-types.json` - Content Type Definitions
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
        "type": "portableText",
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

## Design System System

### Standard Design System
- **Purpose**: Clean, professional design for broad appeal
- **Characteristics**: Minimal colors, clear typography, subtle shadows
- **Best for**: Corporate, SaaS, professional services
- **Color palette**: Neutral with one accent color
- **Typography**: Clean sans-serif fonts

### Bold Design System  
- **Purpose**: Eye-catching design with strong visual impact
- **Characteristics**: Vibrant colors, large typography, strong contrasts
- **Best for**: Creative agencies, startups, brand launches
- **Color palette**: High contrast, multiple accent colors
- **Typography**: Bold, attention-grabbing fonts

### Minimal Design System
- **Purpose**: Ultra-clean design with maximum focus on content
- **Characteristics**: Minimal elements, lots of whitespace, subtle interactions
- **Best for**: Portfolio, minimalist brands, content-focused sites
- **Color palette**: Monochromatic with subtle accents
- **Typography**: Clean, readable fonts

### Neobrutalism Design System
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
        content: any[] // PortableText array
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

## Custom Components in Templates

When creating templates that need custom components (not ShadCN UI components), follow Built.js conventions:

### Component Location
- **Custom components** must be placed in `components/shared/`
- **ShadCN UI components** remain in `components/ui/`

### Import Pattern
```typescript
// ✅ Correct - Import custom components from shared
import { createPortableTextComponents } from '@/components/shared'

// ✅ Correct - Import ShadCN components from ui
import { Button } from '@/components/ui/button'

// ❌ Incorrect - Don't import custom components from lib
import { createPortableTextComponents } from '@/lib/portable-text-components'
```

### Shared Components Structure
```
components/
├── ui/                    # ShadCN UI components
└── shared/                # Custom shared components
    ├── index.ts          # Export all shared components
    ├── portable-text-components.tsx
    └── [other-shared-components].tsx
```

## Rich Content with PortableText

For templates that display rich text content (like blog articles), use PortableText with design system-aware styling:

### Basic Usage
```typescript
import { PortableText } from '@portabletext/react'
import { createPortableTextComponents } from '@/components/shared'

// In your component
<PortableText 
  value={entry.content} 
  components={createPortableTextComponents('bold')} // Design System: 'standard', 'minimal', 'bold', 'neobrutalism'
/>
```

### Supported Content Types
The `createPortableTextComponents` function provides design system-specific styling for:
- **Headings**: h1, h2, h3, h4 with design system-appropriate typography
- **Text**: Paragraphs with proper spacing and font weights
- **Lists**: Bullet and numbered lists with consistent styling
- **Formatting**: Bold, italic, and emphasis
- **Links**: Styled links with hover effects
- **Code**: Inline code and code blocks
- **Blockquotes**: Styled quote blocks

### Design System-Specific Styling
Each design system provides distinct styling:

- **Standard**: Clean, professional typography with gray color scheme
- **Minimal**: Light, airy design with subtle fonts
- **Bold**: Strong, impactful typography with heavier weights and light colors for dark backgrounds
- **Neobrutalism**: Raw, high-contrast design with borders and shadows

## Master/Detail Relationship System

The registry includes a `masterDetail` property for each block to help AI models understand the relationship between list views and detail views.

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

## AI Decision Framework

### Section Selection by Use Case
- **Landing Page**: `hero-section`, `features-showcase`, `social-proof`, `pricing-plans`
- **About Page**: `about-landing`, `team-profiles`, `company-story`, `values-grid`
- **Contact Page**: `contact-lead-generation`, `trust-indicators`
- **Pricing Page**: `pricing-plans`, `pricing-tables`, `value-proposition`
- **Blog Page**: `blog-posts`, `featured-posts`, `blog-article`

### Design System Selection by Brand
- **Professional/Corporate**: `standard`
- **Creative/Startup**: `bold`
- **Minimalist/Portfolio**: `minimal`
- **Experimental/Creative**: `neobrutalism`

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

## Key Differences from Standard Shadcn

1. **Enhanced metadata** for AI decision-making
2. **Module/Section/Template organization** instead of flat categories
3. **Design system system** with Standard/Bold/Minimal/Neobrutalism variations
4. **Component dependency tracking** (shadcnComponents, lucideIcons)
5. **Structured content data** with fields and collections
6. **Business context** (businessTypes, scenarios, useCase)

This registry is designed to enable AI models to make intelligent decisions about component selection, content generation, and design system application while maintaining consistency with the established design system.