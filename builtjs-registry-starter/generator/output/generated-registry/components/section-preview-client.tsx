import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Header from '@/components/header'

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

export default function SectionPreviewClient({ 
  category, 
  categoryLabel, 
  section, 
  sectionName, 
  templates, 
  designSystems,
  registryName
}: Props) {
  return (
    <div className="min-h-screen bg-background">
      <Header registryName={registryName} />
      <div className="container px-4 py-12 mx-auto">
        <div className="mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/category/${category}`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>
        <h1 className="mb-6 text-3xl font-bold">{sectionName || section}</h1>
        <p className="mb-8 text-muted-foreground">
          Browse templates in the {categoryLabel || category} module.
        </p>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div key={template.name} className="p-6 border rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">{template.templateName}</h3>
              <p className="mb-2 text-sm text-muted-foreground">{template.description}</p>
              <div className="mb-4 text-xs text-gray-500">
                <p>Design System: {template.designSystem}</p>
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline">
                  <Link href={`/preview/${template.name}`}>
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