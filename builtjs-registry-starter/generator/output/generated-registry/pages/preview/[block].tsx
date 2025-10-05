import { useRouter } from 'next/router'
import * as fs from 'fs'
import * as path from 'path'
import type { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, Check } from 'lucide-react'
import Header from '@/components/header'
import TemplateNavigation from '@/components/template-navigation'
import { useState, useEffect } from 'react'

// Import all block components
import Mainhomeseoseoskeleton from '@/blocks/main/home-seo/seo-skeleton/component'
import Mainhomelandingcover1skeleton from '@/blocks/main/home-landing/cover1-skeleton/component'
import Shopproductarticlelandingarticle1skeleton from '@/blocks/shop/product-article-landing/article1-skeleton/component'
import Shopproductcategorylistlandinglist1skeleton from '@/blocks/shop/product-category-list-landing/list1-skeleton/component'
import Mainbenefitlistlist2skeleton from '@/blocks/main/benefit-list/list2-skeleton/component'

// Component mapping
const blockComponents: Record<string, React.ComponentType<any>> = {
  'main-home-seo-seo-skeleton': Mainhomeseoseoskeleton,
  'main-home-landing-cover1-skeleton': Mainhomelandingcover1skeleton,
  'shop-product-article-landing-article1-skeleton': Shopproductarticlelandingarticle1skeleton,
  'shop-product-category-list-landing-list1-skeleton': Shopproductcategorylistlandinglist1skeleton,
  'main-benefit-list-list2-skeleton': Mainbenefitlistlist2skeleton
}

interface BlockData {
  name: string
  description?: string
  moduleName: string
  sectionName: string
  templateName: string
  designSystem: string
  files: string[]
  dependencies: string[]
  registryDependencies: string[]
  fields?: Record<string, string>
  data?: Record<string, any>
  collectionsData?: Record<string, any>
}

interface NavigationTemplate {
  name: string
  templateName?: string
  designSystem?: string
}

interface Props {
  block: BlockData
  componentName: string
  navigation?: {
    previous?: NavigationTemplate | null
    next?: NavigationTemplate | null
    currentIndex: number
    totalTemplates: number
  }
}

export default function BlockPreview({ block, componentName, navigation }: Props) {
  const router = useRouter()
  const Component = blockComponents[componentName]
  const [copied, setCopied] = useState(false)
  const [isThumbnail, setIsThumbnail] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Check if we're on the client side
  useEffect(() => {
    setIsClient(true)
    // Check for thumbnail parameter on client side
    const urlParams = new URLSearchParams(window.location.search)
    setIsThumbnail(urlParams.get('thumbnail') === 'true')
  }, [])

  const handleCopyCode = async () => {
    try {
      // Fetch the component content from the API
      const response = await fetch(`/api/component/${componentName}`)
      if (!response.ok) {
        throw new Error('Failed to fetch component content')
      }
      
      const data = await response.json()
      
      // Copy to clipboard
      await navigator.clipboard.writeText(data.content)
      setCopied(true)
      
      // Reset after 2 seconds
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy code:', error)
    }
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Template Not Found</h1>
          <p className="mb-4 text-muted-foreground">
            The template "{componentName}" could not be loaded.
          </p>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  // Show loading state during SSR and initial client render to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-background">
        <div className="text-center">
          <div className="w-6 h-6 mx-auto mb-2 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="text-xs text-gray-500">Loading preview...</p>
        </div>
      </div>
    )
  }

  // Thumbnail mode - just render the component
  if (isThumbnail) {
    return (
      <div className="w-full h-full bg-background">
        <Component content={{ data: block.data, collections: block.collectionsData }} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Custom Header for Preview */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-lg font-semibold">
                  {block.templateName} - {block.designSystem}
                </h1>
                <p className="text-sm text-muted-foreground">
                  {block.moduleName} Module
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" onClick={handleCopyCode}>
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    Copy Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className={`preview-container ${navigation ? 'pb-20' : ''}`}>
        <Component content={{ data: block.data, collections: block.collectionsData }} />
      </div>

      {/* Bottom Navigation */}
      {navigation && (
        <TemplateNavigation
          previous={navigation.previous}
          next={navigation.next}
          currentIndex={navigation.currentIndex}
          totalTemplates={navigation.totalTemplates}
          sectionName={block.sectionName}
        />
      )}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  const paths = (registry.blocks || []).map((block: any) => ({
    params: { block: block.name }
  }))
  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const blockId = params?.block as string
  const registryPath = path.join(process.cwd(), 'registry.json')
  const registry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'))
  const block = (registry.blocks || []).find((b: any) => b.name === blockId)
  
  if (!block) {
    return { notFound: true }
  }

  // Generate navigation data for templates in the same section
  let navigation = null
  if (block.moduleName && block.sectionName) {
    const sectionTemplates = (registry.blocks || [])
      .filter((b: any) => b.moduleName === block.moduleName && b.sectionName === block.sectionName)
      .sort((a: any, b: any) => {
        // Sort by design system: skeleton first, then others
        const designSystemOrder = { 'skeleton': 0, 'standard': 1, 'minimal': 2, 'bold': 3 }
        const aOrder = designSystemOrder[a.designSystem as keyof typeof designSystemOrder] ?? 4
        const bOrder = designSystemOrder[b.designSystem as keyof typeof designSystemOrder] ?? 4
        return aOrder - bOrder
      })

    const currentIndex = sectionTemplates.findIndex((b: any) => b.name === blockId)
    
    if (sectionTemplates.length > 1) {
      navigation = {
        previous: currentIndex > 0 ? {
          name: sectionTemplates[currentIndex - 1].name,
          templateName: sectionTemplates[currentIndex - 1].templateName,
          designSystem: sectionTemplates[currentIndex - 1].designSystem
        } : null,
        next: currentIndex < sectionTemplates.length - 1 ? {
          name: sectionTemplates[currentIndex + 1].name,
          templateName: sectionTemplates[currentIndex + 1].templateName,
          designSystem: sectionTemplates[currentIndex + 1].designSystem
        } : null,
        currentIndex,
        totalTemplates: sectionTemplates.length
      }
    }
  }

  return { 
    props: { 
      block: {
        ...block,
        data: block.data || {},
        collectionsData: block.collectionsData || {}
      },
      componentName: blockId,
      navigation
    }
  }
}