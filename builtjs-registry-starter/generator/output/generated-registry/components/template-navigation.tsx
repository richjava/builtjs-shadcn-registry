import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface NavigationTemplate {
  name: string
  templateName?: string
  designSystem?: string
}

interface Props {
  previous?: NavigationTemplate | null
  next?: NavigationTemplate | null
  currentIndex: number
  totalTemplates: number
  sectionName: string
}

export default function TemplateNavigation({ 
  previous, 
  next, 
  currentIndex, 
  totalTemplates, 
  sectionName 
}: Props) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {previous ? (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/preview/${previous.name}`}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {currentIndex + 1} of {totalTemplates} templates
            </p>
            <p className="text-xs text-gray-500">{sectionName}</p>
          </div>
          
          <div className="flex items-center space-x-4">
            {next ? (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/preview/${next.name}`}>
                  Next
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}