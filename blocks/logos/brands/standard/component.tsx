import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ExternalLink, Award, Tag } from 'lucide-react'
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
      }[]
      ctaText: string
      ctaLink: string
    }
  }
}

export default function LogosBrandsStandard({ content }: LogosBrandsProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Logos Brands Standard.</div>
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Award className="w-6 h-6 text-purple-600" />
            <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">
              Brand Recognition
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8 mb-12">
          {data.brands.map((brand, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-6 bg-gray-50 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-full relative"
              >
                <div className="mb-4">
                  <Image
                    src={brand.logo}
                    alt={`${brand.name} logo`}
                    width={200}
                    height={100}
                    className="max-h-12 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="w-4 h-4 text-purple-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-gray-900 text-center mb-2 group-hover:text-purple-600 transition-colors">
                  {brand.name}
                </h3>
                <div className="flex items-center space-x-1">
                  <Tag className="w-3 h-3 text-gray-500" />
                  <span className="text-sm text-gray-500">{brand.category}</span>
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-gray-600 mb-6">{data.ctaText}</p>
          <Button asChild>
            <a href={data.ctaLink}>Get Started</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
