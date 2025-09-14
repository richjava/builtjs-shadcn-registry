# BuiltJS Shadcn Registry - AI Reference Guide

## Overview

This is a **custom shadcn/ui registry** that extends the standard shadcn registry format with enhanced metadata for AI-powered component selection and generation. The registry contains 120+ pre-built blocks organized into modules, sections, and templates.

## Registry Structure

### Core Organization
- **Modules** (formerly categories): Top-level groupings (About, Main, Features, Services, Team, FAQ, Logos, Newsletter, Blog, Gallery, Pricing)
- **Sections**: Specific functionality within modules (e.g., "hero-section", "team-profiles", "pricing-plans")
- **Templates**: Theme variations of sections (Standard, Minimal, Bold)

### Block Naming Convention
Blocks follow the pattern: `{module}-{section}-{theme}`
- Example: `main-hero-section-standard`
- Example: `about-team-profiles-bold`
- Example: `pricing-plans-minimal`

## Registry Structure

The `registry.json` file follows this complete structure:

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
    }
  ],
  
  "contentTypes": {
    "teamMemberItem": {
      "name": "teamMemberItem",
      "title": "Team Member Item",
      "fields": {
        "name": { "type": "string" },
        "role": { "type": "string" },
        "bio": { "type": "text" },
        "image": { "type": "image" }
      }
    }
  },
  
  "modules": [
    {
      "name": "About",
      "label": "About",
      "description": "About page sections and components",
      "sections": [
        {
          "name": "About Team",
          "label": "About Team", 
          "description": "Team member showcase sections",
          "templates": [
            // Array of template objects
          ]
        }
      ]
    }
  ]
}
```

### Top-Level Properties

- **`$schema`**: JSON schema reference for validation
- **`name`**: Registry identifier (`builtjs-registry`)
- **`version`**: Registry version number
- **`baseUrl`**: Base URL for the registry
- **`themes`**: Array of available theme definitions
- **`contentTypes`**: Object defining reusable content types
- **`modules`**: Array of module objects containing sections and templates

### Theme Structure

Each theme object contains:
```json
{
  "name": "theme-slug",           // URL-friendly identifier
  "label": "Theme Label",         // Human-readable name
  "description": "Theme description" // Detailed explanation
}
```

### Content Type Structure

Each content type contains:
```json
{
  "name": "contentTypeName",      // Internal identifier
  "title": "Content Type Title",  // Display name
  "fields": {                     // Field definitions
    "fieldName": {
      "type": "dataType"          // Sanity data type
    }
  }
}
```

### Module Structure

Each module contains:
```json
{
  "name": "ModuleName",           // Internal identifier
  "label": "Module Label",        // Display name
  "description": "Module description",
  "sections": [                   // Array of section objects
    {
      "name": "SectionName",      // Internal identifier
      "label": "Section Label",   // Display name
      "description": "Section description",
      "templates": [              // Array of template objects
        // Individual block definitions
      ]
    }
  ]
}
```

## Registry Block Structure

Each block in `registry.json` contains:

```json
{
  "name": "block-slug",
  "type": "registry:block",
  "description": "Human-readable description",
  "moduleName": "Module Name",
  "sectionName": "Section Name", 
  "templateName": "Template Name",
  "themeName": "Theme Name",
  "theme": "theme-slug",
  
  // Enhanced AI metadata
  "useCase": "Primary use case description",
  "businessTypes": ["SaaS", "Agency", "E-commerce"],
  "scenarios": ["Landing page", "Product launch"],
  "keyFeatures": ["Bold colors", "Strong typography"],
  
  // Component dependencies
  "dependencies": ["lucide-react", "@radix-ui/react-label"],
  "devDependencies": [],
  "shadcnComponents": ["Button", "Input", "Label"],
  "lucideIcons": ["ArrowRight", "Play", "Sparkles"],
  
  // Content structure
  "fields": {
    "headline": "string",
    "subheadline": "string",
    "ctaText": "string"
  },
  "data": {
    "headline": "Example headline",
    "subheadline": "Example subheadline",
    "ctaText": "Get Started"
  },
  "collectionsData": {
    "items": [
      {"name": "Item 1", "description": "Description 1"},
      {"name": "Item 2", "description": "Description 2"}
    ]
  },
  
  // Technical
  "files": ["blocks/path/to/component.tsx"],
  "tailwind": {},
  "cssVars": {}
}
```

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
- **New Template**: Add theme variation to existing section (e.g., "bold" theme for "hero-section")

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

### 5. **Implementation Flow**

#### **Step 1: Create Block Directory Structure**
```
blocks/{module}/{section}/{theme}/
├── block.json
├── component.tsx
└── (optional files)
```

#### **Step 2: Define Block Configuration**
- Set `moduleName`, `sectionName`, `templateName`, `themeName`
- Define `useCase`, `businessTypes`, `scenarios`
- Specify `keyFeatures` for the theme
- List `dependencies`, `shadcnComponents`, `lucideIcons`

#### **Step 3: Create Component Interface**
- Define `ComponentProps` interface
- Structure `content.data` fields
- Structure `content.collections` if using content types
- Add default data fallbacks

#### **Step 4: Implement Component Logic**
- Extract data from props
- Handle theme-specific styling
- Implement responsive design
- Add accessibility features

#### **Step 5: Update Registry**
- Add block to appropriate module/section/template
- Update `blockComponents` mapping in preview page
- Test block rendering

### 6. **Alternative Flows**

#### **Flow A: Simple Block (No Content Types)**
1. Plan simple data structure
2. Create single theme variation
3. Use basic shadcn components
4. Implement with simple props interface

#### **Flow B: Complex Block (With Content Types)**
1. Define content type in `contentTypes` section
2. Create multiple theme variations
3. Use advanced shadcn components
4. Implement with collections interface

#### **Flow C: Theme-Specific Block**
1. Create only relevant theme(s)
2. Optimize for specific use case
3. Use theme-appropriate components
4. Implement with theme-specific styling

#### **Flow D: Reusable Block**
1. Create content type for reusability
2. Design flexible data structure
3. Use modular components
4. Implement with generic interface

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
