import Link from 'next/link'
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
                    <Link href={`/category/${category.name}`}>
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
    provider: registry.repository?.provider || 'GitHub',
    url: registry.repository?.url || 'https://github.com/richjava/builtjs-shadcn-registry'
  }
  
  return { 
    props: { 
      categories,
      registryName,
      repository
    } 
  }
}