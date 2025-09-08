import { cn } from '@/lib/utils'
import { Tag, ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface GalleryPortfolioProps {
  content: {
    data?: {
      title: string
      subtitle: string
      projects: {
        title: string
        category: string
        image: string
        description: string
        tags: string[]
        link: string
      }[]
    }
  }
}

export default function GalleryPortfolioMinimal({ content }: GalleryPortfolioProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Gallery Portfolio Minimal.</div>
  }

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {data.projects.map((project, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-4">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {project.category}
                  </span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-2">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="text-xs text-gray-400"
                    >
                      {tag}
                      {tagIndex < project.tags.length - 1 && <span className="mx-1">•</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
