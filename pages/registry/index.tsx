import fs from 'fs'
import path from 'path'
import type { GetStaticProps } from 'next'
import RegistryClient from '@/components/registry-client'

interface RegistryItem {
  name: string
  description?: string
  category?: string
  section?: string
  template?: string
  sectionName?: string
  templateName?: string
  themeName?: string
  theme?: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
}

interface Category {
  name: string
  label: string
}

interface Theme {
  name: string
  label: string
  description: string
}

interface RegistryData {
  categories: Category[]
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
  return { props: { registry } }
}