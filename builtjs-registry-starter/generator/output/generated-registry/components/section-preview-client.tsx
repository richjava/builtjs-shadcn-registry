import React from 'react'

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
}

export default function SectionPreviewClient({ 
  category, 
  categoryLabel, 
  section, 
  sectionName, 
  templates, 
  designSystems 
}: Props) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="mb-6 text-3xl font-bold">{sectionName || section}</h1>
        <p className="mb-8 text-muted-foreground">
          Browse templates in the {categoryLabel || category} module.
        </p>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <div key={template.name} className="p-6 border rounded-lg">
              <h3 className="mb-2 text-lg font-semibold">{template.templateName}</h3>
              <p className="mb-2 text-sm text-muted-foreground">{template.description}</p>
              <div className="text-xs text-gray-500">
                <p>Design System: {template.designSystem}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}