#!/usr/bin/env tsx

import * as fs from "fs/promises"
import * as path from "path"
import { existsSync } from "fs"
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
  collectionsData?: Record<string, any>
  // Enhanced metadata for AI decision-making
  useCase?: string
  businessTypes?: string[]
  scenarios?: string[]
  keyFeatures?: string[]
  // Shadcn components used in this block
  shadcnComponents?: string[]
  lucideIcons?: string[]
}

interface Registry {
  name: string
  version: string
  baseUrl: string
  themes?: Array<{
    name: string
    label: string
    description: string
  }>
  contentTypes?: Record<string, any>
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
          
          // Check if template has a config file
          const configPath = path.join(templatePath, "block.json")
          let blockConfig: Partial<RegistryItem> = {}
          
          if (existsSync(configPath)) {
            const configContent = await fs.readFile(configPath, "utf-8")
            blockConfig = JSON.parse(configContent)
          }
          
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
            files: files.map(f => f.replace(process.cwd() + "/", "")),
            dependencies: [...(blockConfig.dependencies || []), ...radixDependencies],
            devDependencies: blockConfig.devDependencies || [],
            tailwind: blockConfig.tailwind || {},
            cssVars: blockConfig.cssVars || {},
            fields: transformFieldsFormat(blockConfig.fields || {}, blockConfig.data || {}),
            data: blockConfig.data || {},
            collectionsData: blockConfig.collectionsData || {},
            // Shadcn components used in this block
            shadcnComponents,
            lucideIcons
          }
          
          // Add to registry
          registry.blocks.push(registryItem)
          
          // Create individual registry file
          const itemOutputPath = path.join(outputDir, `${blockName}.json`)
          await fs.writeFile(itemOutputPath, JSON.stringify(registryItem, null, 2))
          
          console.log(`✅ Built block: ${blockName}`)
        }
      }
    }
  }

  // Write updated registry.json
  await fs.writeFile(registryPath, JSON.stringify(registry, null, 2))
  
  // Validate theme implementation and directory structure
  validateThemeImplementation(registry.blocks)
  validateDirectoryStructure(registry.blocks)
  
  // Write index.json for the registry
  const indexPath = path.join(outputDir, "index.json")
  await fs.writeFile(indexPath, JSON.stringify(registry, null, 2))
  
  console.log(`🎉 Registry built successfully! Generated ${registry.blocks.length} blocks.`)
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
      if (value.type === 'object' && !value.fields && data && data[key]) {
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
