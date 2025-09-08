import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart, Heart, Tag } from 'lucide-react'
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

export default function GalleryProductsStandard({ content }: GalleryProductsProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Gallery Products Standard.</div>
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.products.map((product, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      "px-3 py-1 text-xs font-semibold rounded-full",
                      product.badge === "Best Seller" && "bg-green-100 text-green-800",
                      product.badge === "New" && "bg-blue-100 text-blue-800",
                      product.badge === "Sale" && "bg-red-100 text-red-800",
                      product.badge === "Popular" && "bg-purple-100 text-purple-800"
                    )}>
                      {product.badge}
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                  {product.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <Button className="w-full group" asChild>
                  <a href={product.link}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
