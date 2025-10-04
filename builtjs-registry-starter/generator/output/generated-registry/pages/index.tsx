import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Header from '@/components/header'
import TemplatePreviewGrid from '@/components/template-preview-grid'
import fs from 'fs'
import path from 'path'
import type { GetStaticProps } from 'next'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="flex min-h-[60vh] flex-col items-center justify-center p-24">
          <div className="w-full max-w-5xl text-center">
            <h1 className="mb-4 text-4xl font-bold">BuiltJS Shadcn Registry</h1>
            <p className="mb-8 text-xl text-muted-foreground">
              A collection of reusable React templates and blocks built with shadcn/ui
            </p>
            
            <div className="space-x-4">
              <Button asChild>
                <Link href="/registry">
                  Browse All Templates
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/richjava/builtjs-shadcn-registry" target="_blank">
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Template Preview Grid */}
        <section className="px-4 py-16">
          <div className="mx-auto max-w-7xl">
            <TemplatePreviewGrid />
          </div>
        </section>

        {/* Categories Grid */}
        <section className="px-4 py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Browse by Category</h2>
              <p className="text-lg text-muted-foreground">
                Explore templates organized by use case and purpose
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div key={category.name} className="p-6 transition-shadow bg-white border rounded-lg hover:shadow-lg">
                  <h3 className="mb-2 text-lg font-semibold">{category.label}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">
                    Browse {category.label.toLowerCase()} templates
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/category/${category.name}`}>
                      View Templates
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

const categories = [
  { name: "main", label: "Main" },
  { name: "shop", label: "Shop" },
  { name: "about", label: "About" },
  { name: "blog", label: "Blog" },
  { name: "faq", label: "FAQ" },
  { name: "features", label: "Features" },
  { name: "gallery", label: "Gallery" },
  { name: "newsletter", label: "Newsletter" },
  { name: "logos", label: "Logos" },
  { name: "pricing", label: "Pricing" },
  { name: "services", label: "Services" },
  { name: "team", label: "Team" },
]

export const getStaticProps: GetStaticProps = async () => {
  return { 
    props: {} 
  }
}