import { cn } from '@/lib/utils'
import { Star, ArrowRight } from 'lucide-react'
import Image from 'next/image'

interface GalleryProductsProps {
  content: {
    data?: {
      title: string
      subtitle: string
      products: {
        name: string
        price: string
        originalPrice: string | null
        image: string
        description: string
        rating: number
        reviews: number
        badge: string | null
        link: string
      }[]
    }
  }
}

export default function GalleryProductsMinimal({ content }: GalleryProductsProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Gallery Products Minimal.</div>
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
          {data.products.map((product, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="relative overflow-hidden mb-6">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-medium text-gray-600 bg-white/90 px-2 py-1 rounded">
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{product.rating}</span>
                    <span className="text-sm text-gray-400">({product.reviews})</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
                </div>
                
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-sm text-gray-600 leading-relaxed">
                  {product.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-semibold text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
