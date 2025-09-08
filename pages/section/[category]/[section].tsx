import fs from 'fs'
import path from 'path'
import type { GetStaticPaths, GetStaticProps } from 'next'
import SectionPreviewClient from '@/components/section-preview-client'

interface Template {
  name: string
  description?: string
  category?: string
  section?: string
  template?: string
  sectionName?: string
  templateName?: string
  themeName?: string
  theme?: string
}

interface Props {
  category: string
  categoryLabel?: string
  section: string
  sectionName?: string
  templates: Template[]
  themes: Array<{
    name: string
    label: string
    description: string
  }>
}

export default function SectionPreviewPage({ category, categoryLabel, section, sectionName, templates, themes }: Props) {
  return (
    <SectionPreviewClient 
      category={category}
      categoryLabel={categoryLabel}
      section={section}
      sectionName={sectionName}
      templates={templates}
      themes={themes}
    />
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  
  const paths: { params: { category: string; section: string } }[] = []
  
  // Group blocks by category and section
  const sectionsMap = new Map<string, Set<string>>()
  registry.blocks.forEach((block: any) => {
    if (block.category && block.section) {
      if (!sectionsMap.has(block.category)) {
        sectionsMap.set(block.category, new Set())
      }
      sectionsMap.get(block.category)!.add(block.section)
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
    block.category === category && block.section === section
  )
  
  // Get section name from the first template (they should all have the same sectionName)
  const sectionName = templates.length > 0 ? templates[0].sectionName : undefined
  
  // Get category label from registry
  const categoryLabel = (registry.categories || []).find((c: any) => c.name === category)?.label
  
  return { props: { category, categoryLabel, section, sectionName, templates, themes: registry.themes || [] } }
}
