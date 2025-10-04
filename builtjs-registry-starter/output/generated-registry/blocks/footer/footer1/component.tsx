import React from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

interface FooterFooter1Props {
  content?: {
    data?: {
      
    }
    collections?: {
      
    }
  }
}

export default function FooterFooter1({ content }: FooterFooter1Props) {
  const data = content?.data || {
    
  }
  
  const collections = content?.collections || {}
  
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="h-6 w-6 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xs">L</span>
            </div>
            <span className="font-semibold">Logo</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2024 Your Company. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}