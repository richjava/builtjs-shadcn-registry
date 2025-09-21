import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ExternalLink, Users, Tag } from 'lucide-react'
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
      }[]
      ctaText: string
      ctaLink: string
    }
  }
}

export default function LogosPartnersNeobrutalism({ content }: LogosPartnersProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Logos Partners Neobrutalism.</div>
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <div className="inline-flex items-center space-x-3 mb-6 border-2 border-black bg-electric-blue shadow-[2px_2px_0px_#000000] px-4 py-2">
            <Users className="w-6 h-6 text-black" />
            <span className="text-black font-bold text-sm uppercase tracking-wider">
              PARTNERSHIPS
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {data.partners.map((partner, index) => (
            <div
              key={index}
              className="group border-4 border-black bg-white shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 p-6"
            >
              <div className="relative h-20 mb-4 border-2 border-black bg-gray-50 shadow-[2px_2px_0px_#000000] p-3">
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-center">
                <h3 className="font-bold text-black text-sm border-b border-black pb-1 mb-2">
                  {partner.name}
                </h3>
                <div className="inline-flex items-center space-x-1 border border-black bg-neon-green shadow-[1px_1px_0px_#000000] px-2 py-1 mb-3">
                  <Tag className="w-3 h-3 text-black" />
                  <span className="text-black text-xs font-medium">
                    {partner.type}
                  </span>
                </div>
                <a
                  href={partner.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 text-black hover:text-gray-600 transition-colors border border-black bg-white shadow-[1px_1px_0px_#000000] px-2 py-1"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span className="text-xs font-medium">Visit</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            asChild
            className="border-4 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 bg-electric-blue text-black font-bold text-lg px-8 py-4"
          >
            <a href={data.ctaLink}>
              {data.ctaText}
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
