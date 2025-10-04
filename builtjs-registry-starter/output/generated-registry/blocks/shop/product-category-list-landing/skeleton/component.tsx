import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Heart, Check, Clock, Menu, Search } from 'lucide-react'

interface ProductCategoryListLandingList1SkeletonProps {
  content: {
    data?: {
      
    }
    collections?: {
            product?: any[]
    }
  }
}

export default function ProductCategoryListLandingList1Skeleton({ content }: ProductCategoryListLandingList1SkeletonProps) {
  const data = content.data || {
    
  }
  
  const collections = content.collections || {}
  
  return (
    <section className="py-20 bg-background">
            <div className="bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              {data.heading || 'Features'}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.benefit?.slice(0, 6).map((benefit, index) => (
              <div key={index} className="p-6 rounded-lg bg-card hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
                    <Check className="h-4 w-4 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-lg">{benefit.title}</h3>
                </div>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}