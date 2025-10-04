import fs from 'fs'
import path from 'path'
import type { GetServerSideProps } from 'next'
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
  categoryLabel: string
  section: string
  sectionName: string
  templates: Template[]
  designSystems: Array<{
    name: string
    label: string
    description: string
  }>
}

export default function SectionPreviewPage({ category, categoryLabel, section, sectionName, templates, designSystems }: Props) {
  return (
    <SectionPreviewClient 
      category={category}
      categoryLabel={categoryLabel}
      section={section}
      sectionName={sectionName}
      templates={templates}
      designSystems={designSystems}
    />
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const category = params?.category as string
  const section = params?.section as string
  
  if (!category || !section) {
    return {
      notFound: true,
    }
  }
  
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  
  const templates = (registry.blocks || []).filter((block: any) => 
    block.moduleName.toLowerCase() === category && block.sectionName.toLowerCase().replace(/\s+/g, '-') === section
  )
  
  const sectionName = templates.length > 0 ? templates[0].sectionName : 'Unknown'
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1)
  
  return { 
    props: { 
      category, 
      categoryLabel, 
      section, 
      sectionName, 
      templates, 
      designSystems: registry.designSystems || [] 
    } 
  }
}