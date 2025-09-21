import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PlayCircle, CreditCard, Settings, Wrench, Clock, ArrowRight, Search } from 'lucide-react'

interface FAQHelpProps {
  content: {
    data?: {
      title: string
      subtitle: string
      categories: {
        name: string
        description: string
        icon: string
        articles: {
          title: string
          description: string
          readTime: string
        }[]
      }[]
      ctaText: string
      ctaLink: string
    }
  }
}

const iconMap: Record<string, React.ElementType> = {
  'play-circle': PlayCircle,
  'credit-card': CreditCard,
  'settings': Settings,
  'wrench': Wrench,
}

export default function FAQHelpNeobrutalism({ content }: FAQHelpProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for FAQ Help Neobrutalism.</div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {data.categories.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Settings
            return (
              <div key={index} className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-electric-blue border-4 border-black rounded-full mr-4 shadow-[4px_4px_0px_#000000]">
                      <IconComponent className="h-6 w-6 text-black" />
                    </div>
                    <div className="text-sm font-bold text-black border-2 border-black px-2 py-1 bg-neon-green">
                      {category.articles.length} articles
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-2">
                    {category.name}
                  </h3>
                  
                  <p className="text-black mb-4 border-l-4 border-black pl-4">
                    {category.description}
                  </p>
                  
                  <div className="space-y-2">
                    {category.articles.slice(0, 3).map((article, articleIndex) => (
                      <div key={articleIndex} className="border-2 border-black p-3 bg-green-100 shadow-[2px_2px_0px_#000000]">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-bold text-black">{article.title}</h4>
                          <div className="flex items-center border-2 border-black px-2 py-1 bg-white shadow-[1px_1px_0px_#000000]">
                            <Clock className="h-3 w-3 mr-1 text-black" />
                            <span className="text-xs font-bold text-black">{article.readTime}</span>
                          </div>
                        </div>
                        <p className="text-xs text-black">{article.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-electric-blue text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
                  >
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-neon-green text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
          >
            {data.ctaText}
            <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  )
}
