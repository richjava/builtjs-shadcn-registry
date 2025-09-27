"use client"

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/header'
import ThemeSelector from '@/components/theme-selector'
import { useState, useEffect } from 'react'

interface Template {
  name: string
  description?: string
  moduleName: string
  sectionName: string
  templateName: string
  themeName: string
  theme?: string
}

interface Theme {
  name: string
  label: string
  description: string
}

interface SectionPreviewClientProps {
  category: string
  categoryLabel?: string
  section: string
  sectionName?: string
  templates: Template[]
  themes: Theme[]
}

export default function SectionPreviewClient({ category, categoryLabel, section, sectionName, templates, themes }: SectionPreviewClientProps) {
  const [selectedTheme, setSelectedTheme] = useState("all")
  const [filteredTemplates, setFilteredTemplates] = useState(templates)

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme")
    if (savedTheme) {
      setSelectedTheme(savedTheme)
    }
  }, [])

  // Filter templates based on selected theme
  useEffect(() => {
    if (selectedTheme === "all") {
      setFilteredTemplates(templates)
    } else {
      setFilteredTemplates(templates.filter(template => template.theme === selectedTheme))
    }
  }, [selectedTheme, templates])

  // Save theme to localStorage when changed
  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme)
    localStorage.setItem("selectedTheme", theme)
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/category/${category}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {categoryLabel || category}
            </Link>
          </Button>
        </div>
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            <div>
              <h2 className="text-2xl font-bold mb-2">
                {sectionName || section} - Template Variations
              </h2>
              <p className="text-muted-foreground">
                Choose from {filteredTemplates.length} template variation{filteredTemplates.length !== 1 ? 's' : ''} for the {sectionName || section} section.
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div key={template.name} className="border rounded-lg overflow-hidden">
              {/* Thumbnail */}
              <div className="relative w-full h-48 bg-gray-50 border-b">
                <iframe
                  src={`/preview/${template.name}?thumbnail=true`}
                  className="w-full h-full scale-50 origin-top-left"
                  style={{ 
                    width: '200%', 
                    height: '200%',
                    pointerEvents: 'none',
                    border: 'none'
                  }}
                  loading="lazy"
                  title={`${template.templateName} preview`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2">{template.templateName} {template.themeName}</h3>
                {template.description ? (
                  <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                ) : null}
                <div className="flex space-x-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/preview/${template.name}`}>
                      Preview
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
