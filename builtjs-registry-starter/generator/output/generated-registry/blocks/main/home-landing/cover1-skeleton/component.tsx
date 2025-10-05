import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Heart, Check, Clock, Menu, Search } from 'lucide-react'

interface HomeLandingCover1SkeletonProps {
  content?: {
    data?: {
      
    };
    collections?: {
            category?: any[]
      product?: any[]
    };
  };
}

export default function HomeLandingCover1Skeleton({ content }: HomeLandingCover1SkeletonProps) {
  const data = content?.data || {
        image1: {"url":"https://images.unsplash.com/photo-1518459031867-a89b944bffe4?w=500&h=500&fit=crop&q=80","width":500,"height":500,"type":"image"},
    image2: {"url":"https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop&q=80","width":500,"height":500,"type":"image"},
    heading: "Elevate Your Style with Premium Sportswear",
    blurb: "Discover our collection of premium athletic wear designed for performance and style. From innovative footwear to comfortable apparel, find your perfect fit."
  }
  
  const collections = content?.collections || {}
  
  
  
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 py-20 mx-auto">
        <h2 className="mb-4 text-2xl font-bold">Home Landing</h2>
        <p className="text-muted-foreground">Template-based component for Home Landing</p>
        
      </div>
    </section>
  )
}