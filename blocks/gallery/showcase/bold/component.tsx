import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ExternalLink, Award, Star, ArrowRight, Sparkles, Trophy } from 'lucide-react'
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

export default function GalleryShowcaseBold({ content }: GalleryShowcaseProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Gallery Showcase Bold.</div>
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FFD700%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
              Award-Winning Work
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Featured Items */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.featuredItems.map((item, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={500}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="flex items-center space-x-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full">
                      <Award className="w-5 h-5" />
                      <span className="text-sm font-bold">{item.achievement}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                    <Button
                      size="sm"
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold"
                      asChild
                    >
                      <a href={item.link}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </a>
                    </Button>
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-bold text-yellow-400 bg-yellow-400/20 px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="inline-flex items-center text-xs text-gray-300 bg-white/10 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Button className="w-full group bg-yellow-400 hover:bg-yellow-500 text-black font-bold transition-all duration-300" asChild>
                    <a href={item.link}>
                      Explore Achievement
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Items */}
        <div>
          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              <h3 className="text-2xl font-bold text-white">More Achievements</h3>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.otherItems.map((item, index) => (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center space-x-1 bg-green-400 text-green-900 px-2 py-1 rounded-full">
                      <Star className="w-3 h-3" />
                      <span className="text-xs font-bold">{item.achievement}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-yellow-400 transition-colors">
                    {item.title}
                  </h4>
                  
                  <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                    {item.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-4">
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

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full group border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition-all duration-300" 
                    asChild
                  >
                    <a href={item.link}>
                      View Details
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
