'use client'

import { useState } from 'react'
import Link from 'next/link'

interface TemplatePreview {
  category: string
  categoryLabel: string
  templateName: string
  templateUrl: string
  description: string
}

const templatePreviews: TemplatePreview[] = [
  {
    category: "about",
    categoryLabel: "About",
    templateName: "about-landing-standard",
    templateUrl: "/preview/about-landing-standard",
    description: "About page landing with statistics"
  },
  {
    category: "main",
    categoryLabel: "Main",
    templateName: "main-hero-section-standard",
    templateUrl: "/preview/main-hero-section-standard",
    description: "Hero section for main landing pages"
  },
  {
    category: "main",
    categoryLabel: "Main",
    templateName: "main-call-to-action-standard",
    templateUrl: "/preview/main-call-to-action-standard",
    description: "Call to action section"
  },
  {
    category: "main",
    categoryLabel: "Main",
    templateName: "main-problem-solution-standard",
    templateUrl: "/preview/main-problem-solution-standard",
    description: "Problem and solution showcase"
  }
]

export default function TemplatePreviewGrid() {
  const [loadedIframes, setLoadedIframes] = useState<Set<number>>(new Set())

  const handleIframeLoad = (index: number) => {
    setLoadedIframes(prev => new Set(prev).add(index))
  }

  return (
    <div className="w-full">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Template Previews</h2>
        <p className="text-lg text-muted-foreground">
          See our templates in action across different categories
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {templatePreviews.map((preview, index) => (
          <div key={preview.templateName} className="group">
            <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              {/* Header */}
              <div className="p-4 bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">{preview.categoryLabel}</h3>
                    <p className="text-sm text-gray-600">{preview.description}</p>
                  </div>
                  <Link 
                    href={`/category/${preview.category}`}
                    className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View All →
                  </Link>
                </div>
              </div>
              
              {/* Iframe Container */}
              <div className="relative bg-white">
                {/* Loading State */}
                {!loadedIframes.has(index) && (
                  <div className="h-96 flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-sm text-gray-500">Loading preview...</p>
                    </div>
                  </div>
                )}
                
                {/* Iframe */}
                <iframe
                  src={`${preview.templateUrl}?thumbnail=true`}
                  className={`w-full h-96 border-0 transition-opacity duration-300 ${
                    loadedIframes.has(index) ? 'opacity-100' : 'opacity-0 absolute'
                  }`}
                  onLoad={() => handleIframeLoad(index)}
                  title={`${preview.categoryLabel} template preview`}
                  sandbox="allow-scripts allow-same-origin"
                />
                
                {/* Overlay for interaction */}
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
              </div>
              
              {/* Footer */}
              <div className="p-4 bg-white border-t">
                <Link 
                  href={preview.templateUrl}
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  View Full Template →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
