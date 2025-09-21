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

export default function GalleryProductsNeobrutalism({ content }: GalleryProductsProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Gallery Products Neobrutalism.</div>
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.products.map((product, index) => (
            <div
              key={index}
              className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#000000] transition-all duration-200"
            >
              <div className="relative overflow-hidden border-b-4 border-black">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4 border-2 border-black px-3 py-1 bg-neon-green shadow-[2px_2px_0px_#000000]">
                    <span className="text-sm font-bold text-black">{product.badge}</span>
                  </div>
                )}
                <div className="absolute top-4 right-4 border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Heart className="h-4 w-4 text-black" />
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-2">
                  {product.name}
                </h3>
                <p className="text-black mb-4 border-l-4 border-black pl-4">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center mb-4">
                  <div className="flex items-center border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000]">
                    <Star className="h-4 w-4 text-black fill-current mr-1" />
                    <span className="text-sm font-bold text-black">{product.rating}</span>
                  </div>
                  <div className="ml-2 border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000]">
                    <span className="text-sm font-bold text-black">({product.reviews} reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-black border-2 border-black px-3 py-1 bg-electric-blue shadow-[2px_2px_0px_#000000]">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="ml-2 text-lg text-black line-through border-2 border-black px-2 py-1 bg-white shadow-[1px_1px_0px_#000000]">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <Button 
                  className="w-full bg-neon-green text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-electric-blue text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
          >
            View All Products
            <ShoppingCart className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
