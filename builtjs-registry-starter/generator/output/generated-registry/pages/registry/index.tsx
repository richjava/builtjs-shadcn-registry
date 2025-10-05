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
}