#!/usr/bin/env node

/**
 * BuiltJS Registry Generator
 * 
 * Converts Built.js theme configuration to ShadCN registry format
 * with multiple design system variations.
 */

const fs = require('fs');
const path = require('path');

// Import generators
const ConfigParser = require('./parsers/config-parser');
const RegistryGenerator = require('./generators/registry-generator');
const ComponentGenerator = require('./generators/component-generator');
const DocsGenerator = require('./generators/docs-generator');

class RegistryGeneratorMain {
  constructor(configPath = './data') {
    this.configPath = configPath;
    this.outputPath = path.join(__dirname, 'output');
    this.parsedConfig = null;
  }

  async generate() {
    try {
      console.log('🚀 Starting BuiltJS Registry Generator...');
      
      // Step 1: Parse configuration
      console.log('📋 Parsing configuration files...');
      this.parsedConfig = await this.parseConfiguration();
      
      // Step 2: Generate registry files
      console.log('📁 Generating registry files...');
      await this.generateRegistryFiles();
      
      // Step 3: Generate components
      console.log('⚛️ Generating React components...');
      await this.generateComponents();
      
      // Step 4: Generate documentation
      console.log('📚 Generating documentation...');
      await this.generateDocumentation();
      
      // Step 5: Generate project files
      console.log('📦 Generating project files...');
      await this.generateProjectFiles();
      
      console.log('✅ Registry generation complete!');
      console.log(`📁 Output directory: ${this.outputPath}`);
      
    } catch (error) {
      console.error('❌ Generation failed:', error.message);
      process.exit(1);
    }
  }

  async parseConfiguration() {
    const parser = new ConfigParser(this.configPath);
    return await parser.parse();
  }

  async generateRegistryFiles() {
    const generator = new RegistryGenerator(this.parsedConfig, this.outputPath);
    await generator.generate();
  }

  async generateComponents() {
    const generator = new ComponentGenerator(this.parsedConfig, this.outputPath);
    await generator.generate();
  }

  async generateDocumentation() {
    const generator = new DocsGenerator(this.parsedConfig, this.outputPath);
    await generator.generate();
  }

  async generateProjectFiles() {
    // Generate package.json, Next.js config, etc.
    await this.generatePackageJson();
    await this.generateNextConfig();
    await this.generateTailwindConfig();
    await this.generateTypeScriptConfig();
    await this.generatePagesStructure();
    await this.generateComponentsStructure();
    await this.generateStylesStructure();
  }

  async generatePackageJson() {
    const packageJson = {
      "name": this.parsedConfig.theme.title.toLowerCase().replace(/\s+/g, '-'),
      "version": "1.0.0",
      "private": true,
      "scripts": {
        "dev": "next dev",
        "build": "next build",
        "start": "next start",
        "lint": "next lint"
      },
      "dependencies": {
        "next": "^14.0.0",
        "react": "^18.0.0",
        "react-dom": "^18.0.0",
        "@portabletext/react": "^3.0.0",
        "@radix-ui/react-slot": "^1.0.0",
        "@radix-ui/react-select": "^2.0.0",
        "class-variance-authority": "^0.7.0",
        "clsx": "^2.0.0",
        "lucide-react": "^0.300.0",
        "tailwind-merge": "^2.0.0",
        "tailwindcss-animate": "^1.0.0"
      },
      "devDependencies": {
        "@types/node": "^20.0.0",
        "@types/react": "^18.0.0",
        "@types/react-dom": "^18.0.0",
        "autoprefixer": "^10.0.0",
        "eslint": "^8.0.0",
        "eslint-config-next": "^14.0.0",
        "postcss": "^8.0.0",
        "tailwindcss": "^3.0.0",
        "typescript": "^5.0.0"
      }
    };

    const outputDir = path.join(this.outputPath, 'generated-registry');
    await fs.promises.mkdir(outputDir, { recursive: true });
    await fs.promises.writeFile(
      path.join(outputDir, 'package.json'),
      JSON.stringify(packageJson, null, 2)
    );
  }

  async generateNextConfig() {
    const nextConfig = `/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      }
    ],
  },
}

module.exports = nextConfig`;

    const outputDir = path.join(this.outputPath, 'generated-registry');
    await fs.promises.writeFile(
      path.join(outputDir, 'next.config.js'),
      nextConfig
    );
  }

  async generateTailwindConfig() {
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './blocks/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}`;

    const outputDir = path.join(this.outputPath, 'generated-registry');
    await fs.promises.writeFile(
      path.join(outputDir, 'tailwind.config.js'),
      tailwindConfig
    );
  }

  async generateTypeScriptConfig() {
    const tsConfig = `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`;

    const outputDir = path.join(this.outputPath, 'generated-registry');
    await fs.promises.writeFile(
      path.join(outputDir, 'tsconfig.json'),
      tsConfig
    );
  }

  async generatePagesStructure() {
    const outputDir = path.join(this.outputPath, 'generated-registry');
    
    // Read the generated registry file
    const registryPath = path.join(outputDir, 'registry.json');
    const registry = JSON.parse(await fs.promises.readFile(registryPath, 'utf-8'));
    
    // Create pages directory
    const pagesDir = path.join(outputDir, 'pages');
    await fs.promises.mkdir(pagesDir, { recursive: true });
    
    // Create API directory and subdirectories
    const apiDir = path.join(pagesDir, 'api');
    await fs.promises.mkdir(apiDir, { recursive: true });
    await fs.promises.mkdir(path.join(apiDir, 'component'), { recursive: true });
    await fs.promises.mkdir(path.join(apiDir, 'thumbnail'), { recursive: true });
    
    // Create dynamic route directories
    await fs.promises.mkdir(path.join(pagesDir, 'preview'), { recursive: true });
    await fs.promises.mkdir(path.join(pagesDir, 'category'), { recursive: true });
    await fs.promises.mkdir(path.join(pagesDir, 'section', '[category]'), { recursive: true });
    await fs.promises.mkdir(path.join(pagesDir, 'registry'), { recursive: true });
    
    // Create index page (home page)
    const indexPage = `import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import TemplatePreviewGrid from '@/components/template-preview-grid'
import fs from 'fs'
import path from 'path'
import type { GetStaticProps } from 'next'

interface Category {
  name: string
  label: string
}

interface Props {
  categories: Category[]
  registryName: string
  repository: {
    provider: string
    url: string
  }
}

export default function Home({ categories, registryName, repository }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Header registryName={registryName} />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="flex min-h-[60vh] flex-col items-center justify-center p-24">
          <div className="w-full max-w-5xl text-center">
            <h1 className="mb-4 text-4xl font-bold">{registryName}</h1>
            <p className="mb-8 text-xl text-muted-foreground">
              A collection of reusable Built.js React templates
            </p>
            
            <div className="space-x-4">
              <Button asChild>
                <Link href="/registry">
                  Browse All Templates
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={repository.url} target="_blank">
                  {repository.provider}
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Template Preview Grid */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <TemplatePreviewGrid />
          </div>
        </section>

        {/* Categories Grid */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Browse by Module</h2>
              <p className="text-lg text-muted-foreground">
                Explore templates organized by use case and purpose
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div key={category.name} className="p-6 transition-shadow bg-white border rounded-lg hover:shadow-lg">
                  <h3 className="mb-2 text-lg font-semibold">{category.label}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Browse {category.label.toLowerCase()} templates
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={\`/category/\${category.name}\`}>
                      View Templates
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  
  // Extract unique modules from blocks
  const moduleMap = new Map()
  if (registry.blocks) {
    registry.blocks.forEach((block: any) => {
      if (block.moduleName && !moduleMap.has(block.moduleName)) {
        moduleMap.set(block.moduleName, {
          name: block.moduleName.toLowerCase(),
          label: block.moduleName.charAt(0).toUpperCase() + block.moduleName.slice(1)
        })
      }
    })
  }
  
  const categories = Array.from(moduleMap.values())
  
  // Convert registry name to title case and append " Built.js Registry"
  const registryName = registry.name 
    ? registry.name.charAt(0).toUpperCase() + registry.name.slice(1) + ' Built.js Registry'
    : 'Built.js Registry'
  
  // Extract repository information
  const repository = {
    provider: registry.repository?.provider || 'Github',
    url: registry.repository?.url || '#'
  }
  
  return { 
    props: { 
      categories,
      registryName,
      repository
    } 
  }
}`;

    await fs.promises.writeFile(
      path.join(pagesDir, 'index.tsx'),
      indexPage
    );

    // Create _app.tsx
    const appPage = `import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}`;

    await fs.promises.writeFile(
      path.join(pagesDir, '_app.tsx'),
      appPage
    );

    // Create registry page
    const registryPage = `import fs from 'fs'
import path from 'path'
import type { GetStaticProps } from 'next'
import RegistryClient from '@/components/registry-client'

interface RegistryItem {
  name: string
  description?: string
  moduleName: string
  sectionName: string
  templateName: string
  designSystem: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
}

interface Module {
  name: string
  label: string
}

interface DesignSystem {
  name: string
  label: string
  description: string
}

interface RegistryData {
  categories: Module[]
  blocks: RegistryItem[]
  designSystems: DesignSystem[]
}

export default function RegistryPage({ registry, registryName }: { registry: RegistryData, registryName: string }) {
  return (
    <RegistryClient 
      categories={registry.categories}
      blocks={registry.blocks}
      designSystems={registry.designSystems}
      registryName={registryName}
    />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  
  // Map modules to categories for backward compatibility
  const registryData = {
    ...registry,
    categories: Array.isArray(registry.modules) ? registry.modules : [],
    blocks: Array.isArray(registry.blocks) ? registry.blocks : [],
    designSystems: Array.isArray(registry.designSystems) ? registry.designSystems : []
  }
  
  // Convert registry name to title case and append " Built.js Registry"
  const registryName = registry.name 
    ? registry.name.charAt(0).toUpperCase() + registry.name.slice(1) + ' Built.js Registry'
    : 'Built.js Registry'
  
  return { props: { registry: registryData, registryName } }
}`;

    await fs.promises.writeFile(
      path.join(pagesDir, 'registry', 'index.tsx'),
      registryPage
    );

    // Create category page
    const categoryPage = `import fs from 'fs'
import path from 'path'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/header'

interface Module {
  name: string
  label: string
}

interface BlockItem {
  name: string
  description?: string
  moduleName: string
  sectionName: string
  templateName: string
  designSystem: string
}

interface Section {
  name: string
  sectionName: string
  templates: BlockItem[]
}

interface Props {
  category: Module
  sections: Section[]
  registryName: string
}

export default function CategoryPage({ category, sections, registryName }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Header registryName={registryName} />
      <main className="container px-4 py-12 mx-auto">
        <div className="mb-8">
          <Button size="sm" variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
        <h1 className="mb-6 text-3xl font-bold">{category.label}</h1>
        <p className="mb-8 text-muted-foreground">Browse sections in the {category.label} module.</p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) => (
            <div key={section.name} className="p-6 border rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">{section.sectionName}</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {section.templates.length} template variation{section.templates.length !== 1 ? 's' : ''}
              </p>
              <div className="flex space-x-2">
                <Button asChild variant="outline" size="sm">
                  <Link href={\`/section/\${category.name}/\${section.name}\`}>
                    Preview Section
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  const paths = (registry.modules || []).map((c: Module) => ({ params: { name: c.name } }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const name = params?.name as string
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  const category = (registry.modules || []).find((c: Module) => c.name === name) || { name, label: name }
  const blocks = (registry.blocks || []).filter((b: BlockItem) => b.moduleName.toLowerCase() === name)
  
  // Group blocks by section
  const sectionsMap = new Map<string, BlockItem[]>()
  blocks.forEach((block: BlockItem) => {
    if (block.sectionName) {
      const sectionKey = block.sectionName.toLowerCase().replace(/\\s+/g, '-')
      if (!sectionsMap.has(sectionKey)) {
        sectionsMap.set(sectionKey, [])
      }
      sectionsMap.get(sectionKey)!.push(block)
    }
  })
  
  const sections: Section[] = Array.from(sectionsMap.entries()).map(([sectionKey, templates]) => ({
    name: sectionKey,
    sectionName: templates[0]?.sectionName || sectionKey,
    templates
  }))
  
  // Convert registry name to title case and append " Built.js Registry"
  const registryName = registry.name 
    ? registry.name.charAt(0).toUpperCase() + registry.name.slice(1) + ' Built.js Registry'
    : 'Built.js Registry'
  
  return { props: { category, sections, registryName } }
}`;

    await fs.promises.writeFile(
      path.join(pagesDir, 'category', '[name].tsx'),
      categoryPage
    );

    // Create section page
    const sectionPage = `import fs from 'fs'
import path from 'path'
import type { GetStaticPaths, GetStaticProps } from 'next'
import SectionPreviewClient from '@/components/section-preview-client'

interface Template {
  name: string
  description?: string
  moduleName: string
  sectionName: string
  templateName: string
  designSystem: string
}

interface Props {
  category: string
  categoryLabel?: string
  section: string
  sectionName?: string
  templates: Template[]
  designSystems: Array<{
    name: string
    label: string
    description: string
  }>
  registryName: string
}

export default function SectionPreviewPage({ category, categoryLabel, section, sectionName, templates, designSystems, registryName }: Props) {
  return (
    <SectionPreviewClient 
      category={category}
      categoryLabel={categoryLabel}
      section={section}
      sectionName={sectionName}
      templates={templates}
      designSystems={designSystems}
      registryName={registryName}
    />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  
  const paths: { params: { category: string; section: string } }[] = []
  
  // Group blocks by module and section
  const sectionsMap = new Map<string, Set<string>>()
  registry.blocks.forEach((block: any) => {
    if (block.moduleName && block.sectionName) {
      const moduleKey = block.moduleName.toLowerCase()
      const sectionKey = block.sectionName.toLowerCase().replace(/\\s+/g, '-')
      if (!sectionsMap.has(moduleKey)) {
        sectionsMap.set(moduleKey, new Set())
      }
      sectionsMap.get(moduleKey)!.add(sectionKey)
    }
  })
  
  sectionsMap.forEach((sections, category) => {
    sections.forEach((section) => {
      paths.push({ params: { category, section } })
    })
  })
  
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const category = params?.category as string
  const section = params?.section as string
  
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  
  const templates = (registry.blocks || []).filter((block: any) => 
    block.moduleName.toLowerCase() === category && block.sectionName.toLowerCase().replace(/\\s+/g, '-') === section
  )
  
  // Get section name from the first template (they should all have the same sectionName)
  const sectionName = templates.length > 0 ? templates[0].sectionName : undefined
  
  // Get module label from registry
  const categoryLabel = category
  
  // Convert registry name to title case and append " Built.js Registry"
  const registryName = registry.name 
    ? registry.name.charAt(0).toUpperCase() + registry.name.slice(1) + ' Built.js Registry'
    : 'Built.js Registry'
  
  return { props: { category, categoryLabel, section, sectionName, templates, designSystems: registry.designSystems || [], registryName } }
}`;

    await fs.promises.writeFile(
      path.join(pagesDir, 'section', '[category]', '[section].tsx'),
      sectionPage
    );

    // Generate component imports and mapping
    const generateComponentImports = (blocks) => {
      const imports = []
      const mappings = []
      
      blocks.forEach(block => {
        const componentName = block.name.replace(/-/g, '').replace(/([A-Z])/g, '$1').replace(/^./, str => str.toUpperCase())
        const importPath = `@/blocks/${block.moduleName}/${block.sectionName}/${block.templateName}-${block.designSystem}/component`
        
        imports.push(`import ${componentName} from '${importPath}'`)
        mappings.push(`  '${block.name}': ${componentName}`)
      })
      
      return {
        imports: imports.join('\n'),
        mappings: mappings.join(',\n')
      }
    }

    const componentData = generateComponentImports(registry.blocks || [])

    // Create preview page
    const previewPage = `import { useRouter } from 'next/router'
import * as fs from 'fs'
import * as path from 'path'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Check } from 'lucide-react'
import Header from '@/components/header'
import TemplateNavigation from '@/components/template-navigation'
import { useState, useEffect } from 'react'

// Import all block components
${componentData.imports}

// Component mapping
const blockComponents: Record<string, React.ComponentType<any>> = {
${componentData.mappings}
}

interface BlockData {
  name: string
  description?: string
  moduleName: string
  sectionName: string
  templateName: string
  designSystem: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
  fields?: Record<string, string>
  data?: Record<string, any>
  collectionsData?: Record<string, any>
}

interface NavigationTemplate {
  name: string
  templateName?: string
  designSystem?: string
}

interface Props {
  block: BlockData
  componentName: string
  navigation?: {
    previous?: NavigationTemplate | null
    next?: NavigationTemplate | null
    currentIndex: number
    totalTemplates: number
  }
}

export default function BlockPreview({ block, componentName, navigation }: Props) {
  const router = useRouter()
  const Component = blockComponents[componentName]
  const [copied, setCopied] = useState(false)
  const [isThumbnail, setIsThumbnail] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)
    // Check for thumbnail parameter on client side
    const urlParams = new URLSearchParams(window.location.search)
    setIsThumbnail(urlParams.get('thumbnail') === 'true')
  }, [])

  const handleCopyCode = async () => {
    try {
      // Fetch the component content from the API
      const response = await fetch(\`/api/component/\${componentName}\`)
      if (!response.ok) {
        throw new Error('Failed to fetch component content')
      }
      
      const data = await response.json()
      
      // Copy to clipboard
      await navigator.clipboard.writeText(data.content)
      setCopied(true)
      
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Template Not Found</h1>
          <p className="mb-4 text-muted-foreground">
            The template "{componentName}" could not be loaded.
          </p>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Show loading state during SSR and initial client render to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-background">
        <div className="text-center">
          <div className="w-6 h-6 mx-auto mb-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="text-xs text-gray-500">Loading preview...</p>
        </div>
      </div>
    )
  }

  // Thumbnail mode - just render the component
  if (isThumbnail) {
    return (
      <div className="w-full h-full bg-background">
        <Component content={{ data: block.data, collections: block.collectionsData }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Custom Header for Preview */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-lg font-semibold">
                  {block.templateName} - {block.designSystem}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {block.moduleName} Module
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={handleCopyCode}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className={\`preview-container \${navigation ? 'pb-20' : ''}\`}>
        <Component content={{ data: block.data, collections: block.collectionsData }} />
      </div>

      {/* Bottom Navigation */}
      {navigation && (
        <TemplateNavigation
          previous={navigation.previous}
          next={navigation.next}
          currentIndex={navigation.currentIndex}
          totalTemplates={navigation.totalTemplates}
          sectionName={block.sectionName}
        />
      )}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  const paths = (registry.blocks || []).map((block: any) => ({
    params: { block: block.name }
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blockId = params?.block as string
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  const block = (registry.blocks || []).find((b: any) => b.name === blockId)
  
  if (!block) {
    return { notFound: true }
  }

  // Generate navigation data for templates in the same section
  let navigation = null
  if (block.moduleName && block.sectionName) {
    const sectionTemplates = (registry.blocks || [])
      .filter((b: any) => b.moduleName === block.moduleName && b.sectionName === block.sectionName)
      .sort((a: any, b: any) => {
        // Sort by design system: skeleton first, then others
        const designSystemOrder = { 'skeleton': 0, 'standard': 1, 'minimal': 2, 'bold': 3 }
        const aOrder = designSystemOrder[a.designSystem as keyof typeof designSystemOrder] ?? 4
        const bOrder = designSystemOrder[b.designSystem as keyof typeof designSystemOrder] ?? 4
        return aOrder - bOrder
      })

    const currentIndex = sectionTemplates.findIndex((b: any) => b.name === blockId)
    
    if (sectionTemplates.length > 1) {
      navigation = {
        previous: currentIndex > 0 ? {
          name: sectionTemplates[currentIndex - 1].name,
          templateName: sectionTemplates[currentIndex - 1].templateName,
          designSystem: sectionTemplates[currentIndex - 1].designSystem
        } : null,
        next: currentIndex < sectionTemplates.length - 1 ? {
          name: sectionTemplates[currentIndex + 1].name,
          templateName: sectionTemplates[currentIndex + 1].templateName,
          designSystem: sectionTemplates[currentIndex + 1].designSystem
        } : null,
        currentIndex,
        totalTemplates: sectionTemplates.length
      }
    }
  }

  return { 
    props: { 
      block: {
        ...block,
        data: block.data || {},
        collectionsData: block.collectionsData || {}
      },
      componentName: blockId,
      navigation
    }
  }
}`;

    await fs.promises.writeFile(
      path.join(pagesDir, 'preview', '[block].tsx'),
      previewPage
    );

    // Create API routes
    const apiRegistry = `import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const registryPath = path.join(process.cwd(), 'registry.json')
    const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
    
    res.status(200).json(registry)
  } catch (error) {
    console.error('Error reading registry:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}`;

    await fs.promises.writeFile(
      path.join(apiDir, 'registry.ts'),
      apiRegistry
    );

    const apiComponent = `import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { block } = req.query

  if (!block || typeof block !== 'string') {
    return res.status(400).json({ message: 'Block name is required' })
  }

  try {
    // Map block name to actual file path
    // Block names like "main-home-landing-cover1-skeleton" should map to 
    // "blocks/main/home-landing/cover1-skeleton/component.tsx"
    const blockParts = block.split('-')
    let moduleName = blockParts[0]
    let sectionName = blockParts.slice(1, -2).join('-') // Everything except last 2 parts
    let templateDesignSystem = blockParts.slice(-2).join('-') // Last 2 parts
    
    const componentPath = path.join(process.cwd(), 'blocks', moduleName, sectionName, templateDesignSystem, 'component.tsx')
    
    if (!fs.existsSync(componentPath)) {
      return res.status(404).json({ message: 'Component not found' })
    }

    const content = fs.readFileSync(componentPath, 'utf-8')
    
    res.status(200).json({ content })
  } catch (error) {
    console.error('Error reading component:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}`;

    await fs.promises.writeFile(
      path.join(apiDir, 'component', '[block].ts'),
      apiComponent
    );

    const apiThumbnail = `import fs from 'fs'
import path from 'path'
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { block } = req.query

  if (!block || typeof block !== 'string') {
    return res.status(400).json({ message: 'Block name is required' })
  }

  try {
    // For now, just return a placeholder
    // In a real implementation, you might generate thumbnails
    res.status(200).json({ 
      thumbnail: '/placeholder-thumbnail.png',
      message: 'Thumbnail generation not implemented'
    })
  } catch (error) {
    console.error('Error generating thumbnail:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}`;

    await fs.promises.writeFile(
      path.join(apiDir, 'thumbnail', '[block].ts'),
      apiThumbnail
    );
  }

  async generateComponentsStructure() {
    const outputDir = path.join(this.outputPath, 'generated-registry');
    
    // Create components directory
    const componentsDir = path.join(outputDir, 'components');
    await fs.promises.mkdir(componentsDir, { recursive: true });
    
    // Create ui directory
    const uiDir = path.join(componentsDir, 'ui');
    await fs.promises.mkdir(uiDir, { recursive: true });
    
    // Create basic button component
    const buttonComponent = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }`;

    await fs.promises.writeFile(
      path.join(uiDir, 'button.tsx'),
      buttonComponent
    );

    // Create Select component
    const selectComponent = `import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"

const Select = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="w-4 h-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronUp className="w-4 h-4" />
  </SelectPrimitive.ScrollUpButton>
))
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className
    )}
    {...props}
  >
    <ChevronDown className="w-4 h-4" />
  </SelectPrimitive.ScrollDownButton>
))
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="w-4 h-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = SelectPrimitive.Separator.displayName

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
}`;

    await fs.promises.writeFile(
      path.join(uiDir, 'select.tsx'),
      selectComponent
    );

    // Create Header component
    const headerComponent = `import Link from "next/link"

interface HeaderProps {
  registryName: string
}

export default function Header({ registryName }: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">B</span>
              </div>
              <span className="text-xl font-bold">{registryName}</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="items-center hidden space-x-6 md:flex">
            <Link href="/" className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/registry" className="text-sm font-medium transition-colors text-muted-foreground hover:text-foreground">
              Registry
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}`;

    await fs.promises.writeFile(
      path.join(componentsDir, 'header.tsx'),
      headerComponent
    );

    // Create TemplatePreviewGrid component
    const templatePreviewGridComponent = `'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Block {
  name: string
  moduleName: string
  sectionName: string
  templateName: string
  designSystem: string
  description: string
}

interface Module {
  name: string
  label: string
  sections: Section[]
}

interface Section {
  name: string
  label: string
  blocks: Block[]
}

// Design system colors mapping
const designSystemColors: Record<string, string> = {
  'skeleton': 'bg-gray-100 border-gray-300',
  'standard': 'bg-blue-100 border-blue-300',
  'minimal': 'bg-gray-100 border-gray-300',
  'bold': 'bg-purple-100 border-purple-300',
  'neobrutalism': 'bg-yellow-100 border-yellow-300'
}

// Helper function to convert camelCase to Title Case
function toTitleCase(str: string): string {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

function TemplatePreviewGrid() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [modules, setModules] = useState<Module[]>([])
  const [designSystems, setDesignSystems] = useState<Array<{name: string, label: string, color: string}>>([])
  const [selectedModule, setSelectedModule] = useState<string>('Main')
  const [selectedSection, setSelectedSection] = useState<string>('')
  const [loadedIframes, setLoadedIframes] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load registry data
    const loadRegistry = async () => {
      try {
        const response = await fetch('/api/registry')
        const data = await response.json()
        const blocksData: Block[] = data.blocks || []
        setBlocks(blocksData)
        
        // Load design systems from registry
        const registryDesignSystems = (data.designSystems || []).map((ds: any) => ({
          name: ds.name,
          label: ds.title || ds.name,
          color: designSystemColors[ds.name] || 'bg-gray-100 border-gray-300'
        }))
        setDesignSystems(registryDesignSystems)
        
        // Group blocks by module and section
        const moduleMap = new Map<string, Module>()
        
        blocksData.forEach(block => {
          const moduleName = block.moduleName
          const sectionName = block.sectionName
          
          if (!moduleMap.has(moduleName)) {
            moduleMap.set(moduleName, {
              name: moduleName,
              label: toTitleCase(moduleName),
              sections: []
            })
          }
          
          const module = moduleMap.get(moduleName)!
          let section = module.sections.find(s => s.name === sectionName)
          
          if (!section) {
            section = {
              name: sectionName,
              label: toTitleCase(sectionName),
              blocks: []
            }
            module.sections.push(section)
          }
          
          section.blocks.push(block)
        })
        
        const modulesArray = Array.from(moduleMap.values())
        setModules(modulesArray)
        
        // Set default module and section for Main module
        const mainModule = modulesArray.find(m => m.name === 'main')
        if (mainModule && mainModule.sections.length > 0) {
          setSelectedModule(mainModule.label)
          setSelectedSection(mainModule.sections[0].label)
        }
        
        setLoading(false)
      } catch (err) {
        console.error('Failed to load registry:', err)
        setLoading(false)
      }
    }
    
    loadRegistry()
  }, [])

  const handleIframeLoad = (blockName: string) => {
    setLoadedIframes(prev => new Set(prev).add(blockName))
  }

  const handleModuleChange = (newModule: string) => {
    setSelectedModule(newModule)
    
    // Automatically select the first section of the new module
    const module = modules.find(m => m.label === newModule)
    if (module && module.sections.length > 0) {
      setSelectedSection(module.sections[0].label)
    } else {
      setSelectedSection('')
    }
  }

  const getCurrentSectionBlocks = () => {
    const module = modules.find(m => m.label === selectedModule)
    if (!module) return []
    
    const section = module.sections.find(s => s.label === selectedSection)
    if (!section) return []
    
    // Group blocks by design system
    const designSystemMap = new Map<string, Block>()
    section.blocks.forEach(block => {
      designSystemMap.set(block.designSystem, block)
    })
    
    return Array.from(designSystemMap.values())
  }

  const currentBlocks = getCurrentSectionBlocks()

  if (loading) {
    return (
      <div className="w-full">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Template Previews</h2>
          <p className="text-lg text-muted-foreground">
            See our templates in action across different design systems
          </p>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold">Template Previews</h2>
        <p className="text-lg text-muted-foreground">
          See our templates in action across different design systems
        </p>
      </div>
      
      {/* Module and Section Selectors */}
      <div className="flex flex-col justify-center gap-4 mb-8 sm:flex-row">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Module</label>
          <Select value={selectedModule} onValueChange={handleModuleChange}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {modules.map(module => (
                <SelectItem key={module.name} value={module.label}>
                  {module.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Section</label>
          <Select 
            value={selectedSection} 
            onValueChange={setSelectedSection}
            disabled={!selectedModule}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select section" />
            </SelectTrigger>
            <SelectContent>
              {modules
                .find(m => m.label === selectedModule)
                ?.sections.map(section => (
                  <SelectItem key={section.name} value={section.label}>
                    {section.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Design System Preview Cards */}
      {currentBlocks.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {currentBlocks.map(block => {
            const designSystem = designSystems.find(ds => ds.name === block.designSystem)
            if (!designSystem) return null

            return (
              <div key={block.name} className="group">
                <div className={\`border-2 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 \${designSystem.color}\`}>
                  {/* Header */}
                  <div className="p-4 bg-white border-b">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900">{designSystem.label}</h3>
                        <p className="text-sm leading-relaxed text-gray-600 line-clamp-2">{block.description}</p>
                      </div>
                      <div className={\`w-3 h-3 rounded-full \${designSystem.color.split(' ')[0]} border\`}></div>
                    </div>
                  </div>
                  
                  {/* Iframe Container */}
                  <div className="relative bg-white">
                    {/* Loading State */}
                    {!loadedIframes.has(block.name) && (
                      <div className="flex items-center justify-center h-64 bg-gray-50">
                        <div className="text-center">
                          <div className="w-6 h-6 mx-auto mb-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
                          <p className="text-xs text-gray-500">Loading...</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Iframe */}
                    <iframe
                      src={\`/preview/\${block.name}?thumbnail=true\`}
                      className={\`w-full h-64 border-0 transition-opacity duration-300 \${
                        loadedIframes.has(block.name) ? 'opacity-100' : 'opacity-0 absolute'
                      }\`}
                      onLoad={() => handleIframeLoad(block.name)}
                      title={\`\${designSystem.label} design system preview\`}
                      sandbox="allow-scripts allow-same-origin"
                    />
                    
                    {/* Overlay for interaction */}
                    <div className="absolute inset-0 transition-colors duration-300 bg-transparent pointer-events-none group-hover:bg-black/5" />
                  </div>
                  
                  {/* Footer */}
                  <div className="p-4 bg-white border-t">
                    <div className="flex items-center justify-between">
                      <Link 
                        href={\`/preview/\${block.name}\`}
                        className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
                      >
                        View Template →
                      </Link>
                      <Link 
                        href={\`/category/\${selectedModule.toLowerCase()}\`}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Browse All
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          }).filter(Boolean)}
        </div>
      )}

      {/* No blocks message */}
      {currentBlocks.length === 0 && selectedModule && selectedSection && (
        <div className="py-12 text-center">
          <p className="text-gray-500">No templates available for the selected section.</p>
        </div>
      )}
    </div>
  )
}

export default dynamic(() => Promise.resolve(TemplatePreviewGrid), { ssr: false })`;

    await fs.promises.writeFile(
      path.join(componentsDir, 'template-preview-grid.tsx'),
      templatePreviewGridComponent
    );

    // Create placeholder components for other required components
    const registryClientComponent = `import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/header'

interface RegistryItem {
  name: string
  description?: string
  moduleName: string
  sectionName: string
  templateName: string
  designSystem: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
}

interface Module {
  name: string
  label: string
}

interface DesignSystem {
  name: string
  label: string
  description: string
}

interface Props {
  categories: Module[]
  blocks: RegistryItem[]
  designSystems: DesignSystem[]
  registryName: string
}

export default function RegistryClient({ categories, blocks, designSystems, registryName }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Header registryName={registryName} />
      <div className="container px-4 py-12 mx-auto">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
        <h1 className="mb-6 text-3xl font-bold">Registry</h1>
        <p className="mb-8 text-muted-foreground">
          Browse all available templates and components.
        </p>
        
        <div className="space-y-4">
          {blocks.map((block) => (
            <div key={block.name} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h3 className="mb-1 text-lg font-semibold">{block.templateName}</h3>
                <p className="mb-2 text-sm text-muted-foreground">{block.description}</p>
                <div className="text-xs text-gray-500">
                  <span className="mr-4">Module: {block.moduleName}</span>
                  <span className="mr-4">Section: {block.sectionName}</span>
                  <span>Design System: {block.designSystem}</span>
                </div>
              </div>
              <div className="ml-4">
                <Button asChild size="sm" variant="outline">
                  <Link href={\`/preview/\${block.name}\`}>
                    Preview Template
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`;

    await fs.promises.writeFile(
      path.join(componentsDir, 'registry-client.tsx'),
      registryClientComponent
    );

    const sectionPreviewClientComponent = `import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/header'

interface Template {
  name: string
  description?: string
  moduleName: string
  sectionName: string
  templateName: string
  designSystem: string
}

interface Props {
  category: string
  categoryLabel?: string
  section: string
  sectionName?: string
  templates: Template[]
  designSystems: Array<{
    name: string
    label: string
    description: string
  }>
  registryName: string
}

export default function SectionPreviewClient({ 
  category, 
  categoryLabel, 
  section, 
  sectionName, 
  templates, 
  designSystems,
  registryName
}: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Header registryName={registryName} />
      <div className="container px-4 py-12 mx-auto">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href={\`/category/\${category}\`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
        <h1 className="mb-6 text-3xl font-bold">{sectionName || section}</h1>
        <p className="mb-8 text-muted-foreground">
          Browse templates in the {categoryLabel || category} module.
        </p>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div key={template.name} className="p-6 border rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">{template.templateName}</h3>
              <p className="mb-2 text-sm text-muted-foreground">{template.description}</p>
              <div className="mb-4 text-xs text-gray-500">
                <p>Design System: {template.designSystem}</p>
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={\`/preview/\${template.name}\`}>
                    Preview Template
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}`;

    await fs.promises.writeFile(
      path.join(componentsDir, 'section-preview-client.tsx'),
      sectionPreviewClientComponent
    );

    const templateNavigationComponent = `import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NavigationTemplate {
  name: string
  templateName?: string
  designSystem?: string
}

interface Props {
  previous?: NavigationTemplate | null
  next?: NavigationTemplate | null
  currentIndex: number
  totalTemplates: number
  sectionName: string
}

export default function TemplateNavigation({ 
  previous, 
  next, 
  currentIndex, 
  totalTemplates, 
  sectionName 
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {previous ? (
              <Button variant="outline" size="sm" asChild>
                <Link href={\`/preview/\${previous.name}\`}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} of {totalTemplates} templates
            </p>
            <p className="text-xs text-gray-500">{sectionName}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {next ? (
              <Button variant="outline" size="sm" asChild>
                <Link href={\`/preview/\${next.name}\`}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}`;

    await fs.promises.writeFile(
      path.join(componentsDir, 'template-navigation.tsx'),
      templateNavigationComponent
    );

    // Create lib directory and utils
    const libDir = path.join(outputDir, 'lib');
    await fs.promises.mkdir(libDir, { recursive: true });
    
    const utilsFile = `import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}`;

    await fs.promises.writeFile(
      path.join(libDir, 'utils.ts'),
      utilsFile
    );
  }

  async generateStylesStructure() {
    const outputDir = path.join(this.outputPath, 'generated-registry');
    
    // Create styles directory
    const stylesDir = path.join(outputDir, 'styles');
    await fs.promises.mkdir(stylesDir, { recursive: true });
    
    // Create globals.css
    const globalsCss = `@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;

    await fs.promises.writeFile(
      path.join(stylesDir, 'globals.css'),
      globalsCss
    );

    // Create postcss.config.js
    const postcssConfig = `module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}`;

    await fs.promises.writeFile(
      path.join(outputDir, 'postcss.config.js'),
      postcssConfig
    );
  }
}

// CLI interface
if (require.main === module) {
  const configPath = process.argv[2] || './data';
  const generator = new RegistryGeneratorMain(configPath);
  generator.generate().catch(console.error);
}

module.exports = RegistryGeneratorMain;
