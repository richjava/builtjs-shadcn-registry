import fs from 'fs'
import path from 'path'
import type { GetStaticProps } from 'next'
import RegistryClient from '@/components/registry-client'

interface RegistryItem {
  name: string
  description?: string
  moduleName: string
  sectionName: string
  templateName: string
  themeName: string
  theme?: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
}

interface Module {
  name: string
  label: string
}

interface Theme {
  name: string
  label: string
  description: string
}

interface RegistryData {
  categories: Module[]
  blocks: RegistryItem[]
  themes: Theme[]
}

export default function RegistryPage({ registry }: { registry: RegistryData }) {
  return (
    <RegistryClient 
      categories={registry.categories}
      blocks={registry.blocks}
      themes={registry.themes}
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
    themes: Array.isArray(registry.themes) ? registry.themes : []
  }
  
  return { props: { registry: registryData } }
}