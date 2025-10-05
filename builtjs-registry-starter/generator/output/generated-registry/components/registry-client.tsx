import React from 'react'
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
                  <Link href={`/preview/${block.name}`}>
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
}