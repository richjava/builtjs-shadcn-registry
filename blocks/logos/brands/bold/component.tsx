import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ExternalLink, Award, Star, ArrowRight, Tag } from 'lucide-react'
import Image from 'next/image'

interface LogosBrandsProps {
  content: {
    data?: {
      title: string
      subtitle: string
      brands: {
        name: string
        logo: string
        website: string
        category: string
        description: string
      }[]
      ctaText: string
      ctaLink: string
    }
  }
}

export default function LogosBrandsBold({ content }: LogosBrandsProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Logos Brands Bold.</div>
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Award className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
              Brand Excellence
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {data.brands.map((brand, index) => (
            <div
              key={index}
              className="group bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-24 h-12">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} logo`}
                      width={200}
                      height={100}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-4 h-4 text-purple-400" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-white text-center mb-2 group-hover:text-purple-300 transition-colors">
                  {brand.name}
                </h3>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Tag className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{brand.category}</span>
                </div>
                <p className="text-gray-300 text-sm text-center group-hover:text-purple-200 transition-colors italic">
                  "{brand.description}"
                </p>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Star className="w-6 h-6 text-yellow-400" />
            <p className="text-gray-300 text-lg">{data.ctaText}</p>
          </div>
          <Button 
            size="lg"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <a href={data.ctaLink}>
              Start Your Brand Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
