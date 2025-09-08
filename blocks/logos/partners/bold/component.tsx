import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ExternalLink, Users, Star, ArrowRight, Tag } from 'lucide-react'
import Image from 'next/image'

interface LogosPartnersProps {
  content: {
    data?: {
      title: string
      subtitle: string
      partners: {
        name: string
        logo: string
        website: string
        type: string
        description: string
      }[]
      ctaText: string
      ctaLink: string
    }
  }
}

export default function LogosPartnersBold({ content }: LogosPartnersProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Logos Partners Bold.</div>
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Users className="w-6 h-6 text-green-400" />
            <span className="text-green-400 font-semibold text-sm uppercase tracking-wider">
              Strategic Alliances
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {data.partners.map((partner, index) => (
            <div
              key={index}
              className="group bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <a
                href={partner.website}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="relative w-24 h-12">
                    <Image
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      width={200}
                      height={100}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-4 h-4 text-green-400" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-white text-center mb-2 group-hover:text-green-300 transition-colors">
                  {partner.name}
                </h3>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Tag className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-400">{partner.type}</span>
                </div>
                <p className="text-gray-300 text-sm text-center group-hover:text-green-200 transition-colors">
                  {partner.description}
                </p>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Star className="w-6 h-6 text-green-400" />
            <p className="text-gray-300 text-lg">{data.ctaText}</p>
          </div>
          <Button 
            size="lg"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <a href={data.ctaLink}>
              Explore Partnerships
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
