import React from 'react'

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
}

export default function RegistryClient({ categories, blocks, designSystems }: Props) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">Registry</h1>
        <p className="mb-8 text-muted-foreground">
          Browse all available templates and components.
        </p>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blocks.map((block) => (
            <div key={block.name} className="p-6 border rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">{block.templateName}</h3>
              <p className="mb-2 text-sm text-muted-foreground">{block.description}</p>
              <div className="text-xs text-gray-500">
                <p>Module: {block.moduleName}</p>
                <p>Section: {block.sectionName}</p>
                <p>Design System: {block.designSystem}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}