"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/header'
import ThemeSelector from '@/components/theme-selector'
import { useState, useEffect } from 'react'

interface Category {
  name: string
  label: string
}

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
}

interface Theme {
  name: string
  label: string
  description: string
}

interface RegistryClientProps {
  categories: Category[]
  blocks: RegistryItem[]
  themes: Theme[]
}

export default function RegistryClient({ categories, blocks, themes }: RegistryClientProps) {
  const [selectedTheme, setSelectedTheme] = useState("all")
  const [filteredBlocks, setFilteredBlocks] = useState(blocks)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme")
    if (savedTheme) {
      setSelectedTheme(savedTheme)
    }
  }, [])

  // Filter blocks based on selected theme
  useEffect(() => {
    if (selectedTheme === "all") {
      setFilteredBlocks(blocks)
    } else {
      setFilteredBlocks(blocks.filter(block => block.theme === selectedTheme))
    }
  }, [selectedTheme, blocks])

  // Save theme to localStorage when changed
  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme)
    localStorage.setItem("selectedTheme", theme)
  }

  // Filter categories to only show those that have templates
  const categoriesWithTemplates = categories.filter(category => 
    filteredBlocks.some(block => block.category === category.name)
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
        
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">All Templates</h1>
              <p className="text-muted-foreground">
                Browse {filteredBlocks.length} template{filteredBlocks.length !== 1 ? 's' : ''} across {categoriesWithTemplates.length} categor{categoriesWithTemplates.length !== 1 ? 'ies' : 'y'}.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">Filter by theme:</span>
              <ThemeSelector
                themes={[
                  { name: "all", label: "All Themes", description: "Show all template variations" },
                  ...themes
                ]}
                selectedTheme={selectedTheme}
                onThemeChange={handleThemeChange}
              />
            </div>
          </div>
        </div>

        {/* Categories with templates */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categoriesWithTemplates.map((category) => {
            const categoryBlocks = filteredBlocks.filter(block => block.category === category.name)
            return (
              <div key={category.name} className="border rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-2">{category.label}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {categoryBlocks.length} template{categoryBlocks.length !== 1 ? 's' : ''}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/category/${category.name}`}>
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
              <div key={block.name} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      {block.templateName ? `${block.sectionName} - ${block.templateName}` : block.name}
                    </h3>
                    {block.description && (
                      <p className="text-sm text-muted-foreground mb-2">{block.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {block.category && (
                        <span className="bg-muted px-2 py-1 rounded">Category: {block.category}</span>
                      )}
                      {block.sectionName && (
                        <span className="bg-muted px-2 py-1 rounded">Section: {block.sectionName}</span>
                      )}
                      {block.templateName && (
                        <span className="bg-muted px-2 py-1 rounded">Template: {block.templateName}</span>
                      )}
                      {block.themeName && (
                        <span className="bg-muted px-2 py-1 rounded">Theme: {block.themeName}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/preview/${block.name}`}>
                        Preview
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/registry/${block.name}.json`}>
                        View JSON
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
