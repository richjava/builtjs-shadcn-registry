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
          <div className="max-w-5xl w-full text-center">
            <h1 className="text-4xl font-bold mb-4">BuiltJS Shadcn Registry</h1>
            <p className="text-xl text-muted-foreground mb-8">
              A collection of reusable React templates and blocks built with shadcn/ui
            </p>
            
            <div className="space-x-4">
              <Button asChild>
                <Link href="/registry">
                  Browse All Templates
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/your-username/builtjs-shadcn-registry" target="_blank">
                  GitHub
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Template Preview Grid */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <TemplatePreviewGrid />
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
              <p className="text-lg text-muted-foreground">
                Explore templates organized by use case and purpose
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category.name} className="border rounded-lg p-6 hover:shadow-lg transition-shadow bg-white">
                  <h3 className="text-lg font-semibold mb-2">{category.label}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
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
  { name: "about", label: "About" },
  { name: "blog", label: "Blog" },
  { name: "faq", label: "FAQ" },
  { name: "features", label: "Features" },
  { name: "gallery", label: "Gallery" },
      { name: "main", label: "Main" },
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


