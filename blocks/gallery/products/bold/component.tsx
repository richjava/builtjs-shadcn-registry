import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Star, ShoppingCart, Heart, Sparkles, Zap } from 'lucide-react'
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

export default function GalleryProductsBold({ content }: GalleryProductsProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Gallery Products Bold.</div>
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FF6B6B%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/20 to-red-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
              Featured Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.products.map((product, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className={cn(
                      "px-3 py-1 text-xs font-bold rounded-full",
                      product.badge === "Best Seller" && "bg-green-400 text-green-900",
                      product.badge === "New" && "bg-blue-400 text-blue-900",
                      product.badge === "Sale" && "bg-red-400 text-red-900",
                      product.badge === "Popular" && "bg-purple-400 text-purple-900"
                    )}>
                      {product.badge}
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-bold text-white">{product.rating}</span>
                    <span className="text-sm text-gray-300">({product.reviews})</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-yellow-400 transition-colors">
                  {product.name}
                </h3>
                
                <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-white">{product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                </div>

                <Button className="w-full group bg-yellow-400 hover:bg-yellow-500 text-black font-bold transition-all duration-300" asChild>
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
