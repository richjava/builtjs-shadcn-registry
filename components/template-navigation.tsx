"use client"

import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface NavigationTemplate {
  name: string
  templateName?: string
  themeName?: string
}

interface TemplateNavigationProps {
  previous?: NavigationTemplate | null
  next?: NavigationTemplate | null
  currentIndex: number
  totalTemplates: number
  sectionName?: string
}

export default function TemplateNavigation({ 
  previous, 
  next, 
  currentIndex, 
  totalTemplates,
  sectionName 
}: TemplateNavigationProps) {
  const router = useRouter()

  // Don't show navigation if there's only one template
  if (totalTemplates <= 1) {
    return null
  }

  const handlePrevious = () => {
    if (previous) {
      router.push(`/preview/${previous.name}`)
    }
  }

  const handleNext = () => {
    if (next) {
      router.push(`/preview/${next.name}`)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft' && previous) {
        handlePrevious()
      } else if (event.key === 'ArrowRight' && next) {
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [previous, next])

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Previous Button */}
          <div className="flex-1">
            {previous ? (
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                className="w-full max-w-xs justify-start"
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                <div className="text-left">
                  <div className="text-sm font-medium">Previous</div>
                  <div className="text-xs text-muted-foreground">
                    {previous.templateName}
                    {previous.themeName && ` (${previous.themeName})`}
                  </div>
                </div>
              </Button>
            ) : (
              <div className="w-full max-w-xs" />
            )}
          </div>

          {/* Center Info */}
          <div className="flex-1 text-center">
            <div className="text-sm font-medium">
              {sectionName && `${sectionName} - `}
              Template {currentIndex + 1} of {totalTemplates}
            </div>
            <div className="text-xs text-muted-foreground">
              Use arrow keys to navigate
            </div>
          </div>

          {/* Next Button */}
          <div className="flex-1 flex justify-end">
            {next ? (
              <Button 
                variant="outline" 
                onClick={handleNext}
                className="w-full max-w-xs justify-end"
              >
                <div className="text-right">
                  <div className="text-sm font-medium">Next</div>
                  <div className="text-xs text-muted-foreground">
                    {next.templateName}
                    {next.themeName && ` (${next.themeName})`}
                  </div>
                </div>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <div className="w-full max-w-xs" />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
