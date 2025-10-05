import fs from 'fs'
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
      const sectionKey = block.sectionName.toLowerCase().replace(/\s+/g, '-')
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
    block.moduleName.toLowerCase() === category && block.sectionName.toLowerCase().replace(/\s+/g, '-') === section
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
}