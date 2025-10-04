"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/header'
import DesignSystemSelector from '@/components/design-system-selector'
import { useState, useEffect } from 'react'

// Helper function to convert camelCase to Title Case
function toTitleCase(str: string | undefined): string {
  if (!str) return ''
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())
}

interface Module {
  name: string
  label: string
}

interface RegistryItem {
  name: string
  description?: string
  moduleName: string
  sectionName: string
  templateName: string
  designSystem: string
}

interface DesignSystem {
  name: string
  label: string
  description: string
}

interface RegistryClientProps {
  categories: Module[]
  blocks: RegistryItem[]
  designSystems: DesignSystem[]
}

export default function RegistryClient({ categories, blocks, designSystems }: RegistryClientProps) {
  const [selectedDesignSystem, setSelectedDesignSystem] = useState("all")
  const [filteredBlocks, setFilteredBlocks] = useState(blocks)

  // Load designSystem from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedDesignSystem")
    if (savedTheme) {
      setSelectedDesignSystem(savedTheme)
    }
  }, [])

  // Filter blocks based on selected designSystem
  useEffect(() => {
    if (!Array.isArray(blocks)) {
      console.error('Blocks is not an array:', blocks)
      setFilteredBlocks([])
      return
    }
    
    if (selectedDesignSystem === "all") {
      setFilteredBlocks(blocks)
    } else {
      setFilteredBlocks(blocks.filter(block => block.designSystem === selectedDesignSystem))
    }
  }, [selectedDesignSystem, blocks])

  // Save designSystem to localStorage when changed
  const handleThemeChange = (designSystem: string) => {
    setSelectedDesignSystem(designSystem)
    localStorage.setItem("selectedDesignSystem", designSystem)
  }

  // Filter modules to only show those that have templates
  const modulesWithTemplates = categories.filter(module => 
    Array.isArray(filteredBlocks) && filteredBlocks.some(block => block.moduleName.toLowerCase() === module.name)
  )

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
        
        <div className="mb-8">
          <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">All Templates</h1>
              <p className="text-muted-foreground">
                Browse {filteredBlocks.length} template{filteredBlocks.length !== 1 ? 's' : ''} across {modulesWithTemplates.length} module{modulesWithTemplates.length !== 1 ? 's' : ''}.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Filter by designSystem:</span>
              <DesignSystemSelector
                designSystems={[
                  { name: "all", label: "All Themes", description: "Show all template variations" },
                  ...designSystems
                ]}
                selectedDesignSystem={selectedDesignSystem}
                onDesignSystemChange={handleThemeChange}
              />
            </div>
          </div>
        </div>

        {/* Modules with templates */}
        <div className="grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3">
          {modulesWithTemplates.map((module) => {
            const moduleBlocks = filteredBlocks.filter(block => block.moduleName.toLowerCase() === module.name)
            return (
              <div key={module.name} className="p-6 transition-shadow border rounded-lg hover:shadow-lg">
                <h3 className="mb-2 text-lg font-semibold">{module.label}</h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {moduleBlocks.length} template{moduleBlocks.length !== 1 ? 's' : ''}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/category/${module.name}`}>
                    View Templates
                  </Link>
                </Button>
              </div>
            )
          })}
        </div>

        {/* All blocks list */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">All Templates</h2>
          <div className="grid gap-4">
            {filteredBlocks.map((block) => (
              <div key={block.name} className="p-6 transition-shadow border rounded-lg hover:shadow-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-semibold">
                      {toTitleCase(block.sectionName)} - {toTitleCase(block.templateName)} ({toTitleCase(block.designSystem)})
                    </h3>
                    {block.description && (
                      <p className="mb-2 text-sm text-muted-foreground">{block.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="px-2 py-1 rounded bg-muted">Module: {toTitleCase(block.moduleName)}</span>
                      <span className="px-2 py-1 rounded bg-muted">Section: {toTitleCase(block.sectionName)}</span>
                      <span className="px-2 py-1 rounded bg-muted">Template: {toTitleCase(block.templateName)}</span>
                      <span className="px-2 py-1 rounded bg-muted">Design System: {toTitleCase(block.designSystem)}</span>
                    </div>
                  </div>
                  <div className="flex ml-4 space-x-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/preview/${block.name}`}>
                        Preview
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
