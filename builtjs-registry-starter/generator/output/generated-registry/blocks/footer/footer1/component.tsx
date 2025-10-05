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
    <footer className="border-t bg-background">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="flex items-center mb-4 space-x-2 md:mb-0">
            <div className="flex items-center justify-center w-6 h-6 rounded bg-primary">
              <span className="text-xs font-bold text-primary-foreground">L</span>
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