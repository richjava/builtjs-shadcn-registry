import React from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

interface HeaderHeader1Props {
  content?: {
    data?: {
      
    }
    collections?: {
            primaryMenuItem?: any[]
    }
  }
}

export default function HeaderHeader1({ content }: HeaderHeader1Props) {
  const data = content?.data || {
    
  }
  
  const collections = content?.collections || {}
  
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">L</span>
            </div>
            <span className="font-bold text-xl">Logo</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Home</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">About</a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">Contact</a>
          </nav>
          <Button variant="outline" size="sm">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}