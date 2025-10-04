import fs from 'fs'
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
}

export default function CategoryPage({ category, sections }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container px-4 py-12 mx-auto">
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild>
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
                  <Link href={`/section/${category.name}/${section.name}`}>
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
      const sectionKey = block.sectionName.toLowerCase().replace(/\s+/g, '-')
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
  
  return { props: { category, sections } }
}