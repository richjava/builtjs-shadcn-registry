#!/usr/bin/env tsx

import * as fs from "fs/promises"
import * as path from "path"
import { existsSync, readFileSync } from "fs"
import { generateBlockSlug, nameToSlug } from "../lib/slug-utils"

// Common shadcn components mapping
const SHADCN_COMPONENTS: Record<string, { importPath: string; category: string }> = {
  'Button': { importPath: '@/components/ui/button', category: 'ui' },
  'Input': { importPath: '@/components/ui/input', category: 'ui' },
  'Label': { importPath: '@/components/ui/label', category: 'ui' },
  'Card': { importPath: '@/components/ui/card', category: 'ui' },
  'Badge': { importPath: '@/components/ui/badge', category: 'ui' },
  'Avatar': { importPath: '@/components/ui/avatar', category: 'ui' },
  'Dialog': { importPath: '@/components/ui/dialog', category: 'ui' },
  'Sheet': { importPath: '@/components/ui/sheet', category: 'ui' },
  'DropdownMenu': { importPath: '@/components/ui/dropdown-menu', category: 'ui' },
  'Select': { importPath: '@/components/ui/select', category: 'ui' },
  'Textarea': { importPath: '@/components/ui/textarea', category: 'ui' },
  'Switch': { importPath: '@/components/ui/switch', category: 'ui' },
  'Checkbox': { importPath: '@/components/ui/checkbox', category: 'ui' },
  'RadioGroup': { importPath: '@/components/ui/radio-group', category: 'ui' },
  'Tabs': { importPath: '@/components/ui/tabs', category: 'ui' },
  'Accordion': { importPath: '@/components/ui/accordion', category: 'ui' },
  'Alert': { importPath: '@/components/ui/alert', category: 'ui' },
  'Toast': { importPath: '@/components/ui/toast', category: 'ui' },
  'Tooltip': { importPath: '@/components/ui/tooltip', category: 'ui' },
  'Popover': { importPath: '@/components/ui/popover', category: 'ui' },
  'Command': { importPath: '@/components/ui/command', category: 'ui' },
  'Calendar': { importPath: '@/components/ui/calendar', category: 'ui' },
  'DatePicker': { importPath: '@/components/ui/date-picker', category: 'ui' },
  'Slider': { importPath: '@/components/ui/slider', category: 'ui' },
  'Progress': { importPath: '@/components/ui/progress', category: 'ui' },
  'Separator': { importPath: '@/components/ui/separator', category: 'ui' },
  'Skeleton': { importPath: '@/components/ui/skeleton', category: 'ui' },
  'Table': { importPath: '@/components/ui/table', category: 'ui' },
  'ScrollArea': { importPath: '@/components/ui/scroll-area', category: 'ui' },
  'Resizable': { importPath: '@/components/ui/resizable', category: 'ui' },
  'Collapsible': { importPath: '@/components/ui/collapsible', category: 'ui' },
  'NavigationMenu': { importPath: '@/components/ui/navigation-menu', category: 'ui' },
  'Menubar': { importPath: '@/components/ui/menubar', category: 'ui' },
  'ContextMenu': { importPath: '@/components/ui/context-menu', category: 'ui' },
  'HoverCard': { importPath: '@/components/ui/hover-card', category: 'ui' },
  'Carousel': { importPath: '@/components/ui/carousel', category: 'ui' },
  'Breadcrumb': { importPath: '@/components/ui/breadcrumb', category: 'ui' },
  'Pagination': { importPath: '@/components/ui/pagination', category: 'ui' },
  'Form': { importPath: '@/components/ui/form', category: 'ui' },
  'cn': { importPath: '@/lib/utils', category: 'utility' }
}

interface RegistryItem {
  name: string
  type: "registry:block" | "registry:component"
  description?: string
  dependencies?: string[]
  devDependencies?: string[]
  files: string[]
  tailwind?: {
    config?: Record<string, any>
  }
  cssVars?: Record<string, any>
  moduleName: string
  sectionName: string
  templateName: string
  themeName: string
  theme?: string
  fields?: Record<string, string>
  data?: Record<string, any>
  // New collections reference format
  collections?: Record<string, {
    limit?: number
  }>
  // Enhanced metadata for AI decision-making
  useCase?: string
  businessTypes?: string[]
  scenarios?: string[]
  keyFeatures?: string[]
  // Master/Detail relationship for AI understanding
  masterDetail?: {
    isMaster: boolean
    isDetail: boolean
  }
  // Shadcn components used in this block
  shadcnComponents?: string[]
  lucideIcons?: string[]
}

interface Registry {
  name: string
  version: string
  baseUrl: string
  dependencies: string[]
  themes?: Array<{
    name: string
    label: string
    description: string
  }>
  contentTypes?: Record<string, any>
  // New top-level collections structure
  collections?: Record<string, any[]>
  modules: Array<{
    name: string
    label: string
    description: string
    useCase: string
    businessTypes: string[]
    sections: string[]
  }>
  sections?: Record<string, Record<string, {
    name: string
    description: string
    useCase: string
    businessTypes: string[]
    templates: string[]
  }>>
  blocks: RegistryItem[]
}

// Load existing collections from registry.json
function loadExistingCollections(): Record<string, any[]> {
  try {
    const registryPath = path.join(process.cwd(), 'registry.json')
    if (existsSync(registryPath)) {
      const registryContent = readFileSync(registryPath, 'utf8')
      const registry = JSON.parse(registryContent)
      return registry.collections || {}
    }
  } catch (error) {
    console.warn('⚠️  Could not load existing collections from registry.json')
  }
  return {}
}

// Generate content types in Built.js format
function generateContentTypes(): { contentTypes: any[] } {
  const contentTypes = [
    {
      name: "capabilityItem",
      title: "Capability Item",
      dataPosition: 1,
      fields: {
        "_id": {
          type: "string",
          required: true
        },
        "_type": {
          type: "string",
          required: true
        },
        "slug": {
          type: "uid",
          targetField: "category",
          required: true
        },
        "category": {
          type: "string",
          required: true
        },
        "features": {
          type: "array",
          required: true
        },
        "icon": {
          type: "string",
          required: true
        }
      }
    },
    {
      name: "blogItem",
      title: "Blog Item",
      dataPosition: 2,
      fields: {
        "_id": {
          type: "string",
          required: true
        },
        "_type": {
          type: "string",
          required: true
        },
        "slug": {
          type: "uid",
          targetField: "title",
          required: true
        },
        "title": {
          type: "string",
          required: true
        },
        "excerpt": {
          type: "text",
          required: true
        },
        "author": {
          type: "string",
          required: true
        },
        "publishedDate": {
          type: "date",
          required: true
        },
        "readTime": {
          type: "string",
          required: false
        },
        "image": {
          type: "image",
          required: false
        },
        "tags": {
          type: "array",
          required: false
        }
      }
    },
    {
      name: "serviceItem",
      title: "Service Item",
      dataPosition: 3,
      fields: {
        "_id": {
          type: "string",
          required: true
        },
        "_type": {
          type: "string",
          required: true
        },
        "slug": {
          type: "uid",
          targetField: "name",
          required: true
        },
        "name": {
          type: "string",
          required: true
        },
        "description": {
          type: "text",
          required: true
        },
        "price": {
          type: "string",
          required: false
        },
        "features": {
          type: "array",
          required: false
        },
        "icon": {
          type: "string",
          required: true
        }
      }
    },
    {
      name: "featureItem",
      title: "Feature Item",
      dataPosition: 4,
      fields: {
        "_id": {
          type: "string",
          required: true
        },
        "_type": {
          type: "string",
          required: true
        },
        "slug": {
          type: "uid",
          targetField: "title",
          required: true
        },
        "title": {
          type: "string",
          required: true
        },
        "description": {
          type: "text",
          required: true
        },
        "icon": {
          type: "string",
          required: true
        },
        "benefit": {
          type: "string",
          required: false
        }
      }
    },
    {
      name: "teamMemberItem",
      title: "Team Member Item",
      dataPosition: 5,
      fields: {
        "_id": {
          type: "string",
          required: true
        },
        "_type": {
          type: "string",
          required: true
        },
        "slug": {
          type: "uid",
          targetField: "name",
          required: true
        },
        "name": {
          type: "string",
          required: true
        },
        "role": {
          type: "string",
          required: true
        },
        "bio": {
          type: "text",
          required: true
        },
        "image": {
          type: "image",
          required: false
        },
        "social": {
          type: "object",
          required: false
        }
      }
    }
  ]

  return { contentTypes }
}

// Generate structured blocks index for O(1) lookup
function generateBlocksIndex(blocks: RegistryItem[]): Record<string, any> {
  const blocksIndex: Record<string, any> = {}
  
  blocks.forEach(block => {
    blocksIndex[block.name] = {
      fields: block.fields || {},
      data: block.data || {},
      collections: block.collections || {}
    }
  })
  
  return blocksIndex
}

// Extract collections data from blocks and create top-level collections
function extractCollectionsFromBlocks(blocks: RegistryItem[]): Record<string, any[]> {
  // Since we're using the new architecture, we'll generate collections data directly
  // This matches the data we have in the current registry
  const collections: Record<string, any[]> = {
    capabilityItem: [
      {
        "_id": "capability-1",
        "_type": "capabilityItem",
        "slug": "analytics",
        "category": "Analytics",
        "features": ["Real-time dashboards", "Custom reporting", "Data visualization"],
        "icon": "bar-chart"
      },
      {
        "_id": "capability-2",
        "_type": "capabilityItem",
        "slug": "collaboration",
        "category": "Collaboration",
        "features": ["Team workspaces", "Real-time editing", "Comment system"],
        "icon": "users"
      },
      {
        "_id": "capability-3",
        "_type": "capabilityItem",
        "slug": "security",
        "category": "Security",
        "features": ["End-to-end encryption", "SSO integration", "Audit logs"],
        "icon": "shield"
      },
      {
        "_id": "capability-4",
        "_type": "capabilityItem",
        "slug": "integration",
        "category": "Integration",
        "features": ["RESTful APIs", "Webhook support", "Third-party apps"],
        "icon": "plug"
      }
    ],
    blogItem: [
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
        "content": "<p>JavaScript has evolved significantly over the years. Modern JavaScript brings powerful features that make development more efficient and code more maintainable.</p><h2>ES6+ Features</h2><p>Modern JavaScript includes many powerful features like arrow functions, destructuring, template literals, and async/await that make code more readable and efficient.</p><h2>Module System</h2><p>The introduction of ES6 modules has revolutionized how we organize and structure JavaScript code, making it easier to create maintainable applications.</p><h2>Best Practices</h2><p>Following modern JavaScript best practices helps create more reliable, performant, and maintainable applications.</p>"
      },
      {
        "_id": "blog-post-2",
        "_type": "blogItem",
        "slug": "building-scalable-react-applications",
        "title": "Building Scalable React Applications",
        "excerpt": "Best practices for creating maintainable React applications.",
        "author": "Maria Rodriguez",
        "publishedDate": "2024-01-05",
        "readTime": "7 min read",
        "image": {
          "url": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop",
          "alt": "React development workspace with code"
        },
        "tags": ["React", "Best Practices"],
        "content": "<p>In today's fast-paced development environment, building scalable React applications is crucial for long-term success. This comprehensive guide will walk you through the essential patterns and practices that will help you create maintainable, performant, and scalable React applications.</p><h2>Understanding Scalability in React</h2><p>Scalability in React applications refers to the ability to handle increasing complexity, user load, and feature requirements without significant performance degradation or code maintainability issues.</p><h2>Key Principles for Scalable React Applications</h2><p>Here are the fundamental principles that will guide you in building scalable React applications:</p><h3>1. Component Architecture</h3><p>Design your components with single responsibility in mind. Each component should have a clear purpose and minimal dependencies.</p><h3>2. State Management</h3><p>Choose the right state management solution for your application's complexity. For simple apps, React's built-in state might be sufficient, while complex applications may benefit from Redux or Zustand.</p><h3>3. Performance Optimization</h3><p>Implement proper memoization, lazy loading, and code splitting to ensure your application remains performant as it scales.</p><h2>Best Practices</h2><p>Follow these best practices to ensure your React application scales effectively:</p><ul><li>Use TypeScript for better type safety</li><li>Implement proper error boundaries</li><li>Write comprehensive tests</li><li>Follow consistent coding standards</li><li>Document your components and APIs</li></ul><p>By following these guidelines, you'll be well on your way to building React applications that can scale with your business needs.</p>"
      },
      {
        "_id": "blog-post-3",
        "_type": "blogItem",
        "slug": "css-grid-vs-flexbox",
        "title": "CSS Grid vs Flexbox: When to Use What",
        "excerpt": "A comprehensive guide to choosing the right layout method.",
        "author": "David Kim",
        "publishedDate": "2024-01-01",
        "readTime": "6 min read",
        "image": {
          "url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
          "alt": "CSS Grid and Flexbox layout examples"
        },
        "tags": ["CSS", "Layout"],
        "content": "<p>CSS Grid and Flexbox are two powerful layout systems in CSS, each with its own strengths and use cases. Understanding when to use each can significantly improve your web development workflow and create better user experiences.</p><h2>CSS Grid: Two-Dimensional Layout</h2><p>CSS Grid is designed for two-dimensional layouts, allowing you to create complex grid-based designs with rows and columns. It's perfect for overall page layouts, card grids, and complex component arrangements.</p><h2>Flexbox: One-Dimensional Layout</h2><p>Flexbox is designed for one-dimensional layouts, making it ideal for aligning items in a single direction - either horizontally or vertically. It's perfect for navigation bars, button groups, and centering content.</p><h2>When to Use Each</h2><p>Use CSS Grid when you need to create layouts with both rows and columns. Use Flexbox when you need to align items in a single direction or create flexible components that need to adapt to their content.</p><h2>Combining Both</h2><p>Often, the best approach is to combine both: use CSS Grid for the overall page layout and Flexbox for individual components within the grid.</p>"
      }
    ],
    serviceItem: [
      {
        "_id": "service-1",
        "_type": "serviceItem",
        "slug": "web-development",
        "name": "Web Development",
        "description": "Custom websites and applications built with modern technologies.",
        "price": "From $5,000",
        "features": ["Responsive design", "SEO optimization", "Content management"],
        "icon": "code"
      },
      {
        "_id": "service-2",
        "_type": "serviceItem",
        "slug": "digital-marketing",
        "name": "Digital Marketing",
        "description": "Strategic marketing campaigns to grow your online presence.",
        "price": "From $2,500",
        "features": ["Social media management", "Content creation", "Analytics tracking"],
        "icon": "trending-up"
      },
      {
        "_id": "service-3",
        "_type": "serviceItem",
        "slug": "brand-design",
        "name": "Brand Design",
        "description": "Complete brand identity and visual design solutions.",
        "price": "From $3,000",
        "features": ["Logo design", "Brand guidelines", "Marketing materials"],
        "icon": "palette"
      }
    ],
    featureItem: [
      {
        "_id": "featureItem-1",
        "_type": "featureItem",
        "slug": "lightning-fast-performance",
        "title": "Lightning Fast Performance",
        "description": "Built for speed with optimized code and modern architecture patterns.",
        "icon": "zap",
        "benefit": "3x faster loading times"
      },
      {
        "_id": "featureItem-2",
        "_type": "featureItem",
        "slug": "enterprise-security",
        "title": "Enterprise Security",
        "description": "Bank-level security with end-to-end encryption and compliance standards.",
        "icon": "shield",
        "benefit": "SOC 2 compliant"
      },
      {
        "_id": "featureItem-3",
        "_type": "featureItem",
        "slug": "24-7-support",
        "title": "24/7 Support",
        "description": "Round-the-clock assistance from our dedicated support team.",
        "icon": "headphones",
        "benefit": "Always available"
      },
      {
        "_id": "featureItem-4",
        "_type": "featureItem",
        "slug": "scalable-infrastructure",
        "title": "Scalable Infrastructure",
        "description": "Grows with your business using cloud-native architecture.",
        "icon": "trending-up",
        "benefit": "Unlimited scaling"
      }
    ],
    teamMemberItem: [
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
      },
      {
        "_id": "teamMemberItem-2",
        "_type": "teamMemberItem",
        "slug": "mike-rodriguez",
        "name": "Mike Rodriguez",
        "role": "CTO & Co-Founder",
        "bio": "Technical architect and full-stack developer with expertise in scalable systems and modern frameworks.",
        "image": {
          "url": "https://placehold.co/400x400/000000/FFFFFF?text=MR",
          "alt": "Mike Rodriguez profile photo"
        },
        "social": {
          "linkedin": "https://linkedin.com/in/mikerodriguez",
          "github": "https://github.com/mikerodriguez"
        }
      },
      {
        "_id": "teamMemberItem-3",
        "_type": "teamMemberItem",
        "slug": "alex-kim",
        "name": "Alex Kim",
        "role": "Head of Design",
        "bio": "Creative director focused on user experience and visual design that drives engagement and conversion.",
        "image": {
          "url": "https://placehold.co/400x400/000000/FFFFFF?text=AK",
          "alt": "Alex Kim profile photo"
        },
        "social": {
          "linkedin": "https://linkedin.com/in/alexkim",
          "dribbble": "https://dribbble.com/alexkim"
        }
      }
    ]
  }
  
  console.log(`📚 Generated collections: ${Object.keys(collections).join(', ')}`)
  return collections
}

// Generate structured collections data for O(1) lookup
function generateCollectionsData(collections: Record<string, any[]>): Record<string, any[]> {
  return collections
}

// Convert collectionsData to collections reference format
function convertCollectionsDataToReferences(blocks: RegistryItem[]): RegistryItem[] {
  return blocks.map(block => {
    // Since we removed collectionsData from the interface, we just return the block as-is
    // The collections property should already be set in the block files
    return block
  })
}

// Mapping of shadcn components to their Radix UI dependencies
function getRadixDependenciesForShadcnComponent(componentName: string): string[] {
  const radixMapping: Record<string, string[]> = {
    'Button': ['@radix-ui/react-slot'],
    'Label': ['@radix-ui/react-label'],
    'Switch': ['@radix-ui/react-switch'],
    'DropdownMenu': ['@radix-ui/react-dropdown-menu'],
    'Accordion': ['@radix-ui/react-accordion'],
    'AlertDialog': ['@radix-ui/react-alert-dialog'],
    'Avatar': ['@radix-ui/react-avatar'],
    'Checkbox': ['@radix-ui/react-checkbox'],
    'Dialog': ['@radix-ui/react-dialog'],
    'Popover': ['@radix-ui/react-popover'],
    'ScrollArea': ['@radix-ui/react-scroll-area'],
    'Select': ['@radix-ui/react-select'],
    'Separator': ['@radix-ui/react-separator'],
    'Tabs': ['@radix-ui/react-tabs'],
    'Toast': ['@radix-ui/react-toast'],
    'Tooltip': ['@radix-ui/react-tooltip']
  }
  
  return radixMapping[componentName] || []
}

async function extractComponentsFromFile(filePath: string): Promise<{ shadcnComponents: string[], lucideIcons: string[], radixDependencies: string[] }> {
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    
    const shadcnComponents: string[] = []
    const lucideIcons: string[] = []
    const radixDependencies: string[] = []
    
    // Extract shadcn UI component imports
    const shadcnImportRegex = /import\s*{\s*([^}]+)\s*}\s+from\s+['"]@\/components\/ui\/([^'"]+)['"]/g
    let shadcnMatch
    while ((shadcnMatch = shadcnImportRegex.exec(content)) !== null) {
      const componentNames = shadcnMatch[1].split(',').map(name => name.trim())
      
      componentNames.forEach(componentName => {
        if (SHADCN_COMPONENTS[componentName]) {
          shadcnComponents.push(componentName)
          
          // Add Radix UI dependencies based on shadcn component
          const radixDeps = getRadixDependenciesForShadcnComponent(componentName)
          radixDependencies.push(...radixDeps)
        }
      })
    }
    
    // Extract lucide-react icons
    const lucideImportRegex = /import\s*{\s*([^}]+)\s*}\s+from\s+['"]lucide-react['"]/g
    let lucideMatch
    while ((lucideMatch = lucideImportRegex.exec(content)) !== null) {
      const icons = lucideMatch[1].split(',').map(icon => icon.trim())
      lucideIcons.push(...icons)
    }
    
    return {
      shadcnComponents: Array.from(new Set(shadcnComponents)),
      lucideIcons: Array.from(new Set(lucideIcons)),
      radixDependencies: Array.from(new Set(radixDependencies))
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return { shadcnComponents: [], lucideIcons: [], radixDependencies: [] }
  }
}

// Transform entry data into references
function transformEntryDataToReferences(data: any): any {
  if (!data || typeof data !== 'object') {
    return data
  }

  const transformedData = { ...data }

  // Check if this data object has an entry field
  if (transformedData.entry && typeof transformedData.entry === 'object' && transformedData.entry._type && transformedData.entry.slug) {
    // Transform the entry from a full object to a reference
    const entryType = transformedData.entry._type
    const entrySlug = transformedData.entry.slug

    transformedData.entry = {
      [entryType]: { slug: entrySlug }
    }
  }

  return transformedData
}

async function buildRegistry() {
  console.log("🏗️  Building registry...")

  // Read registry.json
  const registryPath = path.join(process.cwd(), "registry.json")
  const registryContent = await fs.readFile(registryPath, "utf-8")
  const registry: Registry = JSON.parse(registryContent)
  
  // Clear existing blocks to prevent duplicates
  registry.blocks = []

  // Generate enhanced module metadata
  registry.modules = Object.entries(categoryMetadata).map(([name, meta]) => ({
    name,
    label: slugToName(name),
    ...meta
  }))

  // Generate section metadata
  registry.sections = sectionMetadata

  // Create public/registry directory
  const outputDir = path.join(process.cwd(), "public", "registry")
  await fs.mkdir(outputDir, { recursive: true })

  // Build blocks from the blocks directory
  const blocksDir = path.join(process.cwd(), "blocks")
  
  if (existsSync(blocksDir)) {
    const modules = await fs.readdir(blocksDir, { withFileTypes: true })
    
    for (const moduleDir of modules) {
      if (!moduleDir.isDirectory()) continue
      
      const modulePath = path.join(blocksDir, moduleDir.name)
      const blocks = await fs.readdir(modulePath, { withFileTypes: true })
      
      for (const sectionDir of blocks) {
        if (!sectionDir.isDirectory()) continue
        
        const sectionPath = path.join(modulePath, sectionDir.name)
        const templates = await fs.readdir(sectionPath, { withFileTypes: true })
        
        for (const templateDir of templates) {
          if (!templateDir.isDirectory()) continue
          
          const templatePath = path.join(sectionPath, templateDir.name)
          
          // Since block.json files are removed, use default empty config
          let blockConfig: Partial<RegistryItem> = {}
          
          // Find all files in the template directory
          const files = await getBlockFiles(templatePath, templatePath)
          
          // Extract shadcn components from the main component file
          const componentPath = path.join(templatePath, "component.tsx")
          const { shadcnComponents, lucideIcons, radixDependencies } = await extractComponentsFromFile(componentPath)
          
          // Extract theme from template directory name
          const theme = extractThemeFromTemplateName(templateDir.name)
          
          // Get template metadata for AI decision-making
          const templateMeta = templateMetadata[theme] || templateMetadata["standard"]
          
          // Generate human-readable names
          const moduleName = getModuleName(moduleDir.name)
          const sectionName = getSectionName(sectionDir.name)
          let templateName = getTemplateName(templateDir.name, theme)
          // If template name is null, use section name as template name
          if (templateName === null) {
            templateName = sectionName
          }
          const themeName = getThemeName(theme)
          
          
          // Generate the block slug dynamically
          const blockName = generateBlockSlug(moduleName, sectionName, themeName, templateName)
          
          const { registryDependencies, ...blockConfigWithoutOldFields } = blockConfig as any
          
          // Generate theme-specific description
          const themeSpecificDescription = generateThemeSpecificDescription(
            blockConfig.description || `${moduleName} ${sectionName} ${templateName} template`,
            theme,
            templateMeta
          )
          
          // Determine master/detail properties
          const moduleKey = moduleDir.name.toLowerCase()
          const sectionKey = sectionDir.name.toLowerCase()
          const masterDetail = masterDetailMapping[moduleKey]?.[sectionKey] || { isMaster: false, isDetail: false }
          
          const registryItem: RegistryItem = {
            ...blockConfigWithoutOldFields,
            name: blockName,
            type: "registry:block",
            description: themeSpecificDescription,
            moduleName,
            sectionName,
            templateName,
            themeName,
            theme: theme,
            // Enhanced metadata for AI decision-making
            useCase: templateMeta.useCase,
            businessTypes: templateMeta.businessTypes,
            scenarios: templateMeta.scenarios,
            keyFeatures: templateMeta.keyFeatures,
            // Master/Detail relationship for AI understanding
            masterDetail,
            files: files.map(f => f.replace(process.cwd() + "/", "")),
            dependencies: [...(blockConfig.dependencies || []), ...radixDependencies],
            devDependencies: blockConfig.devDependencies || [],
            tailwind: blockConfig.tailwind || {},
            cssVars: blockConfig.cssVars || {},
            fields: transformFieldsFormat(blockConfig.fields || {}, blockConfig.data || {}),
            data: transformEntryDataToReferences(blockConfig.data || {}),
            // Shadcn components used in this block
            shadcnComponents,
            lucideIcons
          }
          
          // Add to registry
          registry.blocks.push(registryItem)
          
          console.log(`✅ Built block: ${blockName}`)
        }
      }
    }
  }

  // Validate theme implementation and directory structure
  validateThemeImplementation(registry.blocks)
  validateDirectoryStructure(registry.blocks)
  
  // Extract collections data and create top-level collections
  registry.collections = extractCollectionsFromBlocks(registry.blocks)
  
  // Convert blocks to use new collections reference format
  registry.blocks = convertCollectionsDataToReferences(registry.blocks)
  
  // Generate new architecture files
  const contentTypes = generateContentTypes()
  const blocksIndex = generateBlocksIndex(registry.blocks)
  const collectionsData = generateCollectionsData(registry.collections || {})
  
        // Create minimal registry (remove fields, data, collections from blocks)
        const minimalRegistry = {
          name: registry.name,
          version: registry.version,
          baseUrl: registry.baseUrl,
          dependencies: registry.dependencies,
          themes: THEME_CONFIG.themes.map(theme => ({
            name: theme,
            label: THEME_CONFIG.themeNames[theme as keyof typeof THEME_CONFIG.themeNames],
            description: `Clean, modern ${THEME_CONFIG.themeNames[theme as keyof typeof THEME_CONFIG.themeNames].toLowerCase()} design with ${theme === 'neobrutalism' ? 'raw, unpolished aesthetics' : theme === 'bold' ? 'vibrant colors and strong typography' : theme === 'minimal' ? 'clean lines and minimal elements' : 'balanced design elements'}`
          })),
          blocks: registry.blocks.map(block => {
            // Parse block name to extract module, section, template, theme info
            const nameParts = block.name.split('-')
            const moduleName = nameParts[0] || 'unknown'
            const rawSectionName = nameParts[1] || 'unknown'
            const rawTemplateName = nameParts[2] || 'unknown'
            const themeName = nameParts[3] || 'unknown'
            
            // Create meaningful section names by combining section and template parts
            let combinedSectionName = rawSectionName
            if (rawSectionName === 'call' && rawTemplateName === 'to') {
              combinedSectionName = 'call-to-action'
            } else if (rawSectionName === 'contact' && rawTemplateName === 'lead') {
              combinedSectionName = 'contact-lead-generation'
            } else if (rawSectionName === 'hero' && rawTemplateName === 'section') {
              combinedSectionName = 'hero-section'
            } else if (rawSectionName === 'problem' && rawTemplateName === 'solution') {
              combinedSectionName = 'problem-solution'
            } else if (rawSectionName === 'social' && rawTemplateName === 'proof') {
              combinedSectionName = 'social-proof'
            } else if (rawSectionName === 'trust' && rawTemplateName === 'indicators') {
              combinedSectionName = 'trust-indicators'
            } else if (rawSectionName === 'value' && rawTemplateName === 'proposition') {
              combinedSectionName = 'value-proposition'
            }
            
            const sectionName = combinedSectionName
            const templateName = rawTemplateName
            
            return {
              name: block.name,
              description: block.description,
              theme: block.theme,
              files: block.files,
              dependencies: block.dependencies,
              devDependencies: block.devDependencies,
              tailwind: block.tailwind,
              cssVars: block.cssVars,
              shadcnComponents: block.shadcnComponents,
              lucideIcons: block.lucideIcons,
              masterDetail: block.masterDetail,
              // Add parsed properties for backward compatibility
              moduleName: moduleName.charAt(0).toUpperCase() + moduleName.slice(1),
              sectionName: sectionName.charAt(0).toUpperCase() + sectionName.slice(1).replace(/-/g, ' '),
              templateName: templateName.charAt(0).toUpperCase() + templateName.slice(1).replace(/-/g, ' '),
              themeName: themeName.charAt(0).toUpperCase() + themeName.slice(1)
            }
          }),
          modules: registry.modules
        }
  
  // Write all files
  await fs.writeFile(registryPath, JSON.stringify(minimalRegistry, null, 2))
  
  // Write public files
  const publicDir = path.join(process.cwd(), 'public')
  await fs.writeFile(path.join(publicDir, 'registry.json'), JSON.stringify(minimalRegistry, null, 2))
  await fs.writeFile(path.join(publicDir, 'content-types.json'), JSON.stringify(contentTypes, null, 2))
  await fs.writeFile(path.join(publicDir, 'blocks-index.json'), JSON.stringify(blocksIndex, null, 2))
  await fs.writeFile(path.join(publicDir, 'collections-data.json'), JSON.stringify(collectionsData, null, 2))
  
  // Write index.json for the registry
  const indexPath = path.join(outputDir, "index.json")
  await fs.writeFile(indexPath, JSON.stringify(minimalRegistry, null, 2))
  
  console.log(`🎉 Registry built successfully! Generated ${registry.blocks.length} blocks.`)
  console.log(`📚 Collections: ${Object.keys(registry.collections || {}).join(', ')}`)
  console.log(`📋 Generated new architecture files:`)
  console.log(`   - registry.json (minimal)`)
  console.log(`   - content-types.json (Built.js format)`)
  console.log(`   - blocks-index.json (O(1) lookup)`)
  console.log(`   - collections-data.json (O(1) lookup)`)
}

async function getBlockFiles(dir: string, basePath: string): Promise<string[]> {
  const files: string[] = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    
    if (entry.isDirectory()) {
      // Recursively get files from subdirectories
      const subFiles = await getBlockFiles(fullPath, basePath)
      files.push(...subFiles)
    } else {
      // Add file to the list
      files.push(fullPath)
    }
  }
  
  return files
}

// Helper function to convert slug to human-readable name
function slugToName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Helper function to get module name from module slug
function getModuleName(moduleSlug: string): string {
  return slugToName(moduleSlug)
}

// Helper function to get template name from template slug
function getTemplateName(templateSlug: string, theme: string): string | null {
  // If template slug is just the theme name (e.g., "bold", "minimal", "standard"),
  // then the template name should be derived from the section name
  if (templateSlug === theme) {
    return null // Will be set to section name in the main loop
  }
  
  // Remove theme prefix if present (e.g., "bold-narrative" -> "narrative", "minimal-stats" -> "stats")
  let baseTemplate = templateSlug
  if (theme !== "standard") {
    baseTemplate = templateSlug.replace(`${theme}-`, '')
  }
  
  return slugToName(baseTemplate)
}

// Helper function to get section name from section slug
function getSectionName(sectionSlug: string): string {
  // For about sections, remove category prefix (e.g., "about-company-story" -> "company-story")
  // For main sections, keep the full name (e.g., "call-to-action" -> "Call to Action")
  if (sectionSlug.startsWith('about-')) {
    const parts = sectionSlug.split('-')
    return slugToName(parts.slice(1).join('-'))
  }
  return slugToName(sectionSlug)
}

// Centralized theme configuration
const THEME_CONFIG = {
  themes: ['bold', 'minimal', 'standard', 'neobrutalism'],
  themeNames: {
    'standard': 'Standard',
    'minimal': 'Minimal',
    'bold': 'Bold',
    'neobrutalism': 'Neobrutalism'
  }
}

// Theme validation function
function validateThemeImplementation(blocks: RegistryItem[]): void {
  const themeCounts: Record<string, number> = {}
  const missingThemes: string[] = []
  
  // Count blocks by theme
  blocks.forEach(block => {
    const theme = block.theme || 'standard'
    themeCounts[theme] = (themeCounts[theme] || 0) + 1
  })
  
  // Check if all themes are represented
  THEME_CONFIG.themes.forEach(theme => {
    if (!themeCounts[theme]) {
      missingThemes.push(theme)
    }
  })
  
  if (missingThemes.length > 0) {
    console.warn(`⚠️  Warning: Missing theme implementations: ${missingThemes.join(', ')}`)
  }
  
  console.log(`📊 Theme distribution:`, themeCounts)
}

// Directory structure validation function
function validateDirectoryStructure(blocks: RegistryItem[]): void {
  const structureIssues: string[] = []
  
  blocks.forEach(block => {
    const files = block.files || []
    const componentFile = files.find(file => file.endsWith('component.tsx'))
    
    if (!componentFile) {
      structureIssues.push(`Block ${block.name}: Missing component.tsx file`)
      return
    }
    
    // Check if file actually exists
    const fullPath = path.join(process.cwd(), componentFile)
    if (!existsSync(fullPath)) {
      structureIssues.push(`Block ${block.name}: Component file not found at ${componentFile}`)
    }
  })
  
  if (structureIssues.length > 0) {
    console.warn(`⚠️  Directory structure issues:`)
    structureIssues.forEach(issue => console.warn(`  - ${issue}`))
  } else {
    console.log(`✅ All component files exist and are properly structured`)
  }
}

// Helper function to extract theme from template directory name
function extractThemeFromTemplateName(templateName: string): string {
  // Check for theme prefixes first (e.g., "bold-image", "minimal-stats")
  for (const theme of THEME_CONFIG.themes) {
    if (templateName.startsWith(`${theme}-`)) {
      return theme
    }
  }
  
  // Check for exact theme matches (e.g., "bold", "minimal", "standard")
  if (THEME_CONFIG.themes.includes(templateName)) {
    return templateName
  }
  
  // Default to standard theme
  return 'standard'
}

// Helper function to get theme name from theme slug
function getThemeName(themeSlug: string): string {
  return THEME_CONFIG.themeNames[themeSlug as keyof typeof THEME_CONFIG.themeNames] || 'Standard'
}

// Helper function to generate theme-specific descriptions
function generateThemeSpecificDescription(baseDescription: string, theme: string, templateMeta: any): string {
  const themeDescriptions: Record<string, string> = {
    'standard': `${baseDescription} with professional styling and balanced design.`,
    'minimal': `${baseDescription} with clean, minimalist design and subtle styling.`,
    'bold': `${baseDescription} with bold colors, strong typography, and high visual impact.`,
    'neobrutalism': `${baseDescription} with raw, unpolished aesthetics, thick borders, stark shadows, and high-contrast colors.`
  }
  
  return themeDescriptions[theme] || baseDescription
}

// Transform fields format from simple strings to structured objects
function transformFieldsFormat(fields: any, data?: any): any {
  if (!fields || typeof fields !== 'object') return fields
  
  const transformedFields: any = {}
  
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value === 'string') {
      // Simple field types - check if it's an object type that needs fields
      if (value === 'object' && data && data[key]) {
        // Generate fields array based on the data structure
        const objectData = data[key]
        if (typeof objectData === 'object' && objectData !== null) {
          const fieldsArray = Object.entries(objectData).map(([fieldKey, fieldValue]) => {
            let fieldType = 'string'
            if (typeof fieldValue === 'number') fieldType = 'number'
            else if (typeof fieldValue === 'boolean') fieldType = 'boolean'
            else if (typeof fieldValue === 'object' && fieldValue !== null) {
              if (Array.isArray(fieldValue)) fieldType = 'array'
              else fieldType = 'object'
            }
            
            return {
              name: fieldKey,
              title: fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1).replace(/([A-Z])/g, ' $1'),
              type: fieldType
            }
          })
          
          transformedFields[key] = {
            type: 'object',
            fields: fieldsArray
          }
        } else {
          transformedFields[key] = { type: value }
        }
      } else {
        // Simple field types
        transformedFields[key] = { type: value }
      }
    } else if (typeof value === 'object' && value !== null) {
      // Check if this is an object field that needs a fields array
      if ('type' in value && value.type === 'object' && !('fields' in value) && data && data[key]) {
        // Generate fields array based on the data structure
        const objectData = data[key]
        if (typeof objectData === 'object' && objectData !== null) {
          const fieldsArray = Object.entries(objectData).map(([fieldKey, fieldValue]) => {
            let fieldType = 'string'
            if (typeof fieldValue === 'number') fieldType = 'number'
            else if (typeof fieldValue === 'boolean') fieldType = 'boolean'
            else if (typeof fieldValue === 'object' && fieldValue !== null) {
              if (Array.isArray(fieldValue)) fieldType = 'array'
              else fieldType = 'object'
            }
            
            return {
              name: fieldKey,
              title: fieldKey.charAt(0).toUpperCase() + fieldKey.slice(1).replace(/([A-Z])/g, ' $1'),
              type: fieldType
            }
          })
          
          transformedFields[key] = {
            type: 'object',
            fields: fieldsArray
          }
        } else {
          transformedFields[key] = { type: 'object' }
        }
      } else {
        // Complex field types (already in new format or complex objects)
        transformedFields[key] = value
      }
    }
  }
  
  return transformedFields
}

// Category metadata for AI decision-making
const categoryMetadata: Record<string, {
  description: string
  useCase: string
  businessTypes: string[]
  sections: string[]
}> = {
  "main": {
    description: "Primary landing page sections for homepage",
    useCase: "Homepage hero, value proposition, social proof, and conversion sections",
    businessTypes: ["SaaS", "Agency", "E-commerce", "Portfolio", "Corporate", "Startup"],
    sections: ["hero-section", "value-proposition", "social-proof", "call-to-action", "trust-indicators", "problem-solution", "contact-lead-generation"]
  },
  "features": {
    description: "Feature showcase and product highlights",
    useCase: "Product features, capabilities, and key benefits",
    businessTypes: ["SaaS", "Agency", "E-commerce", "Corporate", "Startup"],
    sections: ["showcase", "highlights", "capabilities"]
  },
  "about": {
    description: "Company information and team sections",
    useCase: "About page content, team profiles, company story, and mission statements",
    businessTypes: ["Agency", "SaaS", "Corporate", "Startup", "E-commerce", "Portfolio"],
    sections: ["company-story", "team", "mission", "values", "landing"]
  },
  "blog": {
    description: "Blog and content sections",
    useCase: "Blog posts, articles, and content marketing sections",
    businessTypes: ["Agency", "SaaS", "Corporate", "Startup", "E-commerce"],
    sections: ["blog-article", "blog-posts", "featured-posts"]
  },
  "faq": {
    description: "Frequently asked questions and help sections",
    useCase: "Customer support, help center, and FAQ content",
    businessTypes: ["SaaS", "E-commerce", "Agency", "Corporate", "Startup"],
    sections: ["questions", "help", "support"]
  },
  "gallery": {
    description: "Image galleries and visual content",
    useCase: "Portfolio showcases, product galleries, and visual content",
    businessTypes: ["Agency", "Portfolio", "E-commerce", "Corporate", "SaaS"],
    sections: ["portfolio", "products", "showcase"]
  },
  "logos": {
    description: "Client logos and brand partnerships",
    useCase: "Social proof, client showcases, and brand partnerships",
    businessTypes: ["Agency", "SaaS", "Corporate", "Startup"],
    sections: ["clients", "partners", "brands"]
  },
  "pricing": {
    description: "Pricing plans and subscription options",
    useCase: "Pricing tables, subscription plans, and billing information",
    businessTypes: ["SaaS", "Agency", "E-commerce", "Corporate"],
    sections: ["plans", "tables", "subscription"]
  },
  "services": {
    description: "Service offerings and solutions",
    useCase: "Service descriptions, solutions, and offerings",
    businessTypes: ["Agency", "SaaS", "Corporate", "Startup"],
    sections: ["offerings", "solutions", "services"]
  },
  "team": {
    description: "Team members and company culture",
    useCase: "Team profiles, company culture, and employee showcases",
    businessTypes: ["Agency", "SaaS", "Corporate", "Startup", "E-commerce"],
    sections: ["profiles", "culture", "members"]
  },
  "newsletter": {
    description: "Newsletter signup and subscription forms",
    useCase: "Email list building, lead generation, and customer engagement",
    businessTypes: ["SaaS", "Agency", "E-commerce", "Corporate", "Startup", "Blog"],
    sections: ["signup", "subscription", "opt-in"]
  }
}

// Section metadata for AI decision-making
const sectionMetadata: Record<string, Record<string, {
  name: string
  description: string
  useCase: string
  businessTypes: string[]
  templates: string[]
}>> = {
  "main": {
    "hero-section": {
      name: "Hero Section",
      description: "Primary landing area with headline and CTA",
      useCase: "First impression, value proposition, and conversion",
      businessTypes: ["SaaS", "Agency", "E-commerce", "Portfolio", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    },
    "value-proposition": {
      name: "Value Proposition",
      description: "Clear value statement and benefits",
      useCase: "Explain what makes your business unique",
      businessTypes: ["SaaS", "Agency", "Corporate", "Startup", "E-commerce"],
      templates: ["standard", "minimal", "bold"]
    },
    "social-proof": {
      name: "Social Proof",
      description: "Customer testimonials and social validation",
      useCase: "Build trust and credibility with customer feedback",
      businessTypes: ["SaaS", "Agency", "E-commerce", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    },
    "call-to-action": {
      name: "Call to Action",
      description: "Conversion-focused action sections",
      useCase: "Drive user action and conversions",
      businessTypes: ["SaaS", "Agency", "E-commerce", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    },
    "trust-indicators": {
      name: "Trust Indicators",
      description: "Security, certifications, and trust signals",
      useCase: "Build trust and reduce friction in conversion",
      businessTypes: ["SaaS", "E-commerce", "Corporate", "Agency"],
      templates: ["standard", "minimal", "bold"]
    },
    "problem-solution": {
      name: "Problem Solution",
      description: "Problem identification and solution presentation",
      useCase: "Address customer pain points and present solutions",
      businessTypes: ["SaaS", "Agency", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    },
    "contact-lead-generation": {
      name: "Contact Lead Generation",
      description: "Lead capture and contact forms",
      useCase: "Generate leads and capture contact information",
      businessTypes: ["SaaS", "Agency", "Corporate", "Startup", "E-commerce"],
      templates: ["standard", "minimal", "bold"]
    }
  },
  "features": {
    "showcase": {
      name: "Showcase",
      description: "Feature showcase with visual demonstrations",
      useCase: "Highlight key features with compelling visuals",
      businessTypes: ["SaaS", "Agency", "E-commerce", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    },
    "highlights": {
      name: "Highlights",
      description: "Key feature highlights with benefits",
      useCase: "Emphasize core value propositions and benefits",
      businessTypes: ["SaaS", "Agency", "E-commerce", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    },
    "capabilities": {
      name: "Capabilities",
      description: "Comprehensive capability overview",
      useCase: "Show complete feature set and capabilities",
      businessTypes: ["SaaS", "Agency", "E-commerce", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    }
  },
  "about": {
    "company-story": {
      name: "Company Story",
      description: "Company history and narrative",
      useCase: "Share company background and mission",
      businessTypes: ["Agency", "SaaS", "Corporate", "Startup", "E-commerce"],
      templates: ["narrative", "timeline", "story"]
    },
    "team": {
      name: "Team",
      description: "Team member profiles and introductions",
      useCase: "Introduce team members and company culture",
      businessTypes: ["Agency", "SaaS", "Corporate", "Startup", "E-commerce"],
      templates: ["cards", "grid", "profiles"]
    },
    "mission": {
      name: "Mission",
      description: "Company mission and values",
      useCase: "Communicate company purpose and values",
      businessTypes: ["Agency", "SaaS", "Corporate", "Startup", "E-commerce"],
      templates: ["statement", "values", "purpose"]
    },
    "values": {
      name: "Values",
      description: "Company values and principles",
      useCase: "Showcase company values and culture",
      businessTypes: ["Agency", "SaaS", "Corporate", "Startup", "E-commerce"],
      templates: ["grid", "list", "showcase"]
    },
    "landing": {
      name: "About Landing",
      description: "About page hero and introduction",
      useCase: "About page introduction and key messaging",
      businessTypes: ["Agency", "SaaS", "Corporate", "Startup", "E-commerce"],
      templates: ["stats", "image", "minimal-stats", "bold-stats", "minimal-image", "bold-image"]
    }
  },
  "blog": {
    "blog-article": {
      name: "Blog Article",
      description: "Individual blog article layouts and templates",
      useCase: "Full blog post pages, article content, and long-form content",
      businessTypes: ["Agency", "SaaS", "Corporate", "Startup", "E-commerce"],
      templates: ["standard", "minimal", "bold"]
    },
    "blog-posts": {
      name: "Blog Posts",
      description: "Blog post previews and listings",
      useCase: "Blog post cards, post previews, and post listings",
      businessTypes: ["Agency", "SaaS", "Corporate", "Startup", "E-commerce"],
      templates: ["standard", "minimal", "bold"]
    },
    "featured-posts": {
      name: "Featured Posts",
      description: "Featured blog posts and content highlights",
      useCase: "Showcase important posts, featured content, and content marketing",
      businessTypes: ["Agency", "SaaS", "Corporate", "Startup", "E-commerce"],
      templates: ["standard", "minimal", "bold"]
    }
  },
  "faq": {
    "questions": {
      name: "Questions",
      description: "Frequently asked questions with expandable answers",
      useCase: "Answer common customer questions and reduce support load",
      businessTypes: ["SaaS", "E-commerce", "Agency", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    },
    "help": {
      name: "Help Center",
      description: "Comprehensive help and support center",
      useCase: "Provide detailed help documentation and support resources",
      businessTypes: ["SaaS", "E-commerce", "Agency", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    },
    "support": {
      name: "Support",
      description: "Customer support and contact information",
      useCase: "Provide support contact options and assistance",
      businessTypes: ["SaaS", "E-commerce", "Agency", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    }
  },
  "logos": {
    "clients": {
      name: "Clients",
      description: "Client logo showcase and testimonials",
      useCase: "Display client logos for social proof and credibility",
      businessTypes: ["Agency", "SaaS", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    },
    "partners": {
      name: "Partners",
      description: "Partner and vendor logo displays",
      useCase: "Showcase business partnerships and collaborations",
      businessTypes: ["Agency", "SaaS", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    },
    "brands": {
      name: "Brands",
      description: "Brand logo collections and showcases",
      useCase: "Display brand logos for recognition and association",
      businessTypes: ["Agency", "SaaS", "Corporate", "Startup"],
      templates: ["standard", "minimal", "bold"]
    }
  },
  "newsletter": {
    "signup": {
      name: "Signup",
      description: "Newsletter signup forms and email collection",
      useCase: "Collect email addresses for newsletter subscriptions",
      businessTypes: ["SaaS", "Agency", "E-commerce", "Corporate", "Startup", "Blog"],
      templates: ["standard", "minimal", "bold"]
    },
    "subscription": {
      name: "Subscription",
      description: "Subscription management and preferences",
      useCase: "Manage newsletter subscriptions and preferences",
      businessTypes: ["SaaS", "Agency", "E-commerce", "Corporate", "Startup", "Blog"],
      templates: ["standard", "minimal", "bold"]
    },
    "opt-in": {
      name: "Opt-in",
      description: "Email opt-in forms and lead magnets",
      useCase: "Convert visitors to subscribers with lead magnets",
      businessTypes: ["SaaS", "Agency", "E-commerce", "Corporate", "Startup", "Blog"],
      templates: ["standard", "minimal", "bold"]
    }
  }
}

// Master/Detail mapping for AI understanding
const masterDetailMapping: Record<string, Record<string, { isMaster: boolean; isDetail: boolean }>> = {
  "blog": {
    "blog-article": { isMaster: false, isDetail: true },
    "blog-posts": { isMaster: true, isDetail: false },
    "featured-posts": { isMaster: true, isDetail: false }
  },
  "gallery": {
    "portfolio": { isMaster: true, isDetail: false },
    "products": { isMaster: true, isDetail: false },
    "showcase": { isMaster: true, isDetail: false }
  },
  "team": {
    "profiles": { isMaster: true, isDetail: false },
    "culture": { isMaster: true, isDetail: false },
    "members": { isMaster: true, isDetail: false }
  },
  "about": {
    "company-story": { isMaster: true, isDetail: false },
    "team": { isMaster: true, isDetail: false },
    "mission": { isMaster: true, isDetail: false },
    "values": { isMaster: true, isDetail: false },
    "landing": { isMaster: true, isDetail: false }
  },
  "main": {
    "hero-section": { isMaster: false, isDetail: false },
    "value-proposition": { isMaster: false, isDetail: false },
    "social-proof": { isMaster: false, isDetail: false },
    "call-to-action": { isMaster: false, isDetail: false },
    "trust-indicators": { isMaster: false, isDetail: false },
    "problem-solution": { isMaster: false, isDetail: false },
    "contact-lead-generation": { isMaster: false, isDetail: false }
  },
  "features": {
    "showcase": { isMaster: false, isDetail: false },
    "highlights": { isMaster: false, isDetail: false },
    "capabilities": { isMaster: false, isDetail: false }
  },
  "services": {
    "offerings": { isMaster: false, isDetail: false },
    "services": { isMaster: false, isDetail: false },
    "solutions": { isMaster: false, isDetail: false }
  },
  "faq": {
    "questions": { isMaster: false, isDetail: false },
    "help": { isMaster: false, isDetail: false },
    "support": { isMaster: false, isDetail: false }
  },
  "logos": {
    "clients": { isMaster: false, isDetail: false },
    "partners": { isMaster: false, isDetail: false },
    "brands": { isMaster: false, isDetail: false }
  },
  "newsletter": {
    "signup": { isMaster: false, isDetail: false },
    "subscription": { isMaster: false, isDetail: false },
    "opt-in": { isMaster: false, isDetail: false }
  },
  "pricing": {
    "plans": { isMaster: false, isDetail: false },
    "subscription": { isMaster: false, isDetail: false },
    "tables": { isMaster: false, isDetail: false }
  }
}

// Template metadata for AI decision-making
const templateMetadata: Record<string, {
  useCase: string
  businessTypes: string[]
  scenarios: string[]
  keyFeatures: string[]
}> = {
  "standard": {
    useCase: "Professional and balanced design for established businesses",
    businessTypes: ["SaaS", "Agency", "Corporate", "E-commerce"],
    scenarios: ["Product launch", "Service showcase", "Portfolio display", "Corporate presentation"],
    keyFeatures: ["Clean layout", "Professional typography", "Balanced spacing", "Subtle animations"]
  },
  "minimal": {
    useCase: "Clean and focused design for modern, minimalist brands",
    businessTypes: ["SaaS", "Agency", "Startup", "Portfolio"],
    scenarios: ["Product focus", "Clean presentation", "Modern branding", "Minimalist approach"],
    keyFeatures: ["Minimal design", "White space", "Simple typography", "Clean lines"]
  },
  "bold": {
    useCase: "Eye-catching and impactful design for attention-grabbing presentations",
    businessTypes: ["Agency", "Startup", "E-commerce", "Portfolio"],
    scenarios: ["Brand launch", "Creative showcase", "Attention-grabbing", "Bold presentation"],
    keyFeatures: ["Bold colors", "Strong typography", "Visual impact", "Creative elements"]
  }
}

// Run the build
buildRegistry().catch(console.error)
