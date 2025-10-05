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
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">L</span>
            </div>
            <span className="text-xl font-bold">Logo</span>
          </div>
          <nav className="items-center hidden space-x-6 md:flex">
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Home</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">About</a>
            <a href="#" className="text-sm font-medium transition-colors hover:text-primary">Contact</a>
          </nav>
          <Button variant="outline" size="sm">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  )
}