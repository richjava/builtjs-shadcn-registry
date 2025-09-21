import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ExternalLink, Award, Star, ArrowRight } from 'lucide-react'
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

export default function GalleryShowcaseNeobrutalism({ content }: GalleryShowcaseProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Gallery Showcase Neobrutalism.</div>
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <div className="flex items-center justify-center mb-4">
            <Award className="h-8 w-8 text-black mr-3 border-2 border-black p-1 bg-white shadow-[2px_2px_0px_#000000]" />
            <h2 className="text-4xl md:text-5xl font-extrabold text-black border-b-4 border-black pb-4">
              {data.title}
            </h2>
            <Award className="h-8 w-8 text-black ml-3 border-2 border-black p-1 bg-white shadow-[2px_2px_0px_#000000]" />
          </div>
          <p className="text-xl text-black max-w-3xl mx-auto border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        {/* Featured Items */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-black mb-8 border-b-4 border-black pb-2 text-center">
            Featured Work
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.featuredItems.map((item, index) => (
              <div
                key={index}
                className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#000000] transition-all duration-200"
              >
                <div className="relative overflow-hidden border-b-4 border-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4 border-2 border-black px-3 py-1 bg-electric-blue shadow-[2px_2px_0px_#000000]">
                    <span className="text-sm font-bold text-black">{item.category}</span>
                  </div>
                  <div className="absolute top-4 right-4 border-2 border-black px-3 py-1 bg-neon-green shadow-[2px_2px_0px_#000000]">
                    <Award className="h-4 w-4 text-black" />
                  </div>
                </div>

                <div className="p-8">
                  <h4 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                    {item.title}
                  </h4>
                  <p className="text-black mb-4 border-l-4 border-black pl-4">
                    {item.description}
                  </p>
                  
                  {/* Achievement */}
                  <div className="mb-4 border-2 border-black p-3 bg-green-100 shadow-[2px_2px_0px_#000000]">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-black mr-2" />
                      <span className="text-sm font-bold text-black">{item.achievement}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <div key={tagIndex} className="border-2 border-black px-2 py-1 bg-white shadow-[1px_1px_0px_#000000]">
                          <span className="text-xs font-bold text-black">{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-electric-blue text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
                  >
                    View Details
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Items */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-black mb-8 border-b-4 border-black pb-2 text-center">
            More Work
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.otherItems.map((item, index) => (
              <div
                key={index}
                className="border-4 border-black bg-white shadow-[6px_6px_0px_#000000] overflow-hidden hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200"
              >
                <div className="relative overflow-hidden border-b-4 border-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={400}
                    height={250}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-2 left-2 border-2 border-black px-2 py-1 bg-electric-blue shadow-[1px_1px_0px_#000000]">
                    <span className="text-xs font-bold text-black">{item.category}</span>
                  </div>
                </div>

                <div className="p-4">
                  <h5 className="text-lg font-bold text-black mb-2 border-b-2 border-black pb-1">
                    {item.title}
                  </h5>
                  <p className="text-black mb-3 border-l-4 border-black pl-3 text-sm">
                    {item.description}
                  </p>
                  
                  {/* Achievement */}
                  <div className="mb-3 border-2 border-black p-2 bg-green-100 shadow-[1px_1px_0px_#000000]">
                    <div className="flex items-center">
                      <Star className="h-3 w-3 text-black mr-1" />
                      <span className="text-xs font-bold text-black">{item.achievement}</span>
                    </div>
                  </div>

                  <Button 
                    size="sm"
                    className="w-full bg-neon-green text-black border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] transition-all duration-200"
                  >
                    View
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-neon-green text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
          >
            View All Work
            <ExternalLink className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
