import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ExternalLink, Tag, Eye } from 'lucide-react'
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

export default function GalleryPortfolioNeobrutalism({ content }: GalleryPortfolioProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Gallery Portfolio Neobrutalism.</div>
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project, index) => (
            <div
              key={index}
              className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#000000] transition-all duration-200"
            >
              <div className="relative overflow-hidden border-b-4 border-black">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 border-2 border-black px-3 py-1 bg-electric-blue shadow-[2px_2px_0px_#000000]">
                  <span className="text-sm font-bold text-black">{project.category}</span>
                </div>
                <div className="absolute top-4 right-4 border-2 border-black px-3 py-1 bg-neon-green shadow-[2px_2px_0px_#000000] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Eye className="h-4 w-4 text-black" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-2">
                  {project.title}
                </h3>
                <p className="text-black mb-4 border-l-4 border-black pl-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <div key={tagIndex} className="flex items-center border-2 border-black px-2 py-1 bg-green-100 shadow-[1px_1px_0px_#000000]">
                        <Tag className="h-3 w-3 mr-1 text-black" />
                        <span className="text-xs font-bold text-black">{tag}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full bg-electric-blue text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
                >
                  View Project
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-neon-green text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
          >
            View All Projects
            <ExternalLink className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
