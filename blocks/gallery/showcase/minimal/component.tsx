import { cn } from '@/lib/utils'
import { Award, ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface GalleryShowcaseProps {
  content: {
    data?: {
      title: string
      subtitle: string
      featuredItems: {
        title: string
        category: string
        image: string
        description: string
        achievement: string
        tags: string[]
        link: string
      }[]
      otherItems: {
        title: string
        category: string
        image: string
        description: string
        achievement: string
        tags: string[]
        link: string
      }[]
    }
  }
}

export default function GalleryShowcaseMinimal({ content }: GalleryShowcaseProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Gallery Showcase Minimal.</div>
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

        {/* Featured Items */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {data.featuredItems.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-8">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={500}
                    className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center space-x-2 bg-white/90 text-gray-800 px-4 py-2 rounded">
                      <Award className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.achievement}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  
                  <h3 className="text-2xl font-light text-gray-900 group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-4">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs text-gray-400"
                      >
                        {tag}
                        {tagIndex < item.tags.length - 1 && <span className="mx-1">•</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Items */}
        <div>
          <h3 className="text-xl font-light text-gray-900 mb-12 text-center">Additional Work</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.otherItems.map((item, index) => (
              <div
                key={index}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden mb-6">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <div className="bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-medium">
                      {item.achievement}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  
                  <h4 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                    {item.title}
                  </h4>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 pt-2">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-xs text-gray-400"
                      >
                        {tag}
                        {tagIndex < item.tags.length - 1 && <span className="mx-1">•</span>}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
