import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface LogosClientsProps {
  content: {
    data?: {
      title: string
      subtitle: string
      clients: {
        name: string
        logo: string
        website: string
      }[]
      ctaText: string
      ctaLink: string
    }
  }
}

export default function LogosClientsMinimal({ content }: LogosClientsProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Logos Clients Minimal.</div>
  }

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {data.clients.map((client, index) => (
            <div
              key={index}
              className="group flex items-center justify-center p-4 bg-white rounded-md hover:shadow-sm transition-shadow duration-200"
            >
              <a
                href={client.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-12 relative"
              >
                <Image
                  src={client.logo}
                  alt={`${client.name} logo`}
                  width={150}
                  height={75}
                  className="max-h-8 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-200"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <ExternalLink className="w-3 h-3 text-gray-600" />
                </div>
              </a>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="sm" asChild>
            <a href={data.ctaLink}>{data.ctaText}</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
