import React from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Star, Heart, Check, Clock, Menu, Search } from 'lucide-react'

interface HomeSeoSeoSkeletonProps {
  content: {
    data?: {
      
    }
    collections?: {
      
    }
  }
}

export default function HomeSeoSeoSkeleton({ content }: HomeSeoSeoSkeletonProps) {
  const data = content.data || {
        pageTitle: "Home | E-Commerce ShadCN Built.js Theme",
    description: "Home page for a site built with the E-Commerce ShadCN Built.js Theme.",
    shareImage: {"url":"https://res.cloudinary.com/dn7feeelf/image/upload/v1725878797/image_ldyekv.png","path":"/images/image.png","width":1280,"height":768,"type":"image"},
    twitterCardType: "summary"
  }
  
  const collections = content.collections || {}
  
  return (
    <section className="py-20 bg-background">
            <div className="bg-background">
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              {data.heading || 'Section Title'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {data.blurb || 'Section description'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}