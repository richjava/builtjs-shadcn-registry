import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PlayCircle, CreditCard, Settings, Clock, ArrowRight } from 'lucide-react'

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
}

export default function FAQHelpMinimal({ content }: FAQHelpProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for FAQ Help Minimal.</div>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {data.categories.map((category, categoryIndex) => {
            const IconComponent = iconMap[category.icon] || Settings
            return (
              <div
                key={categoryIndex}
                className="bg-white rounded-lg p-4 border border-gray-200"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <IconComponent className="w-5 h-5 text-blue-600" />
                  <h3 className="font-medium text-gray-900">{category.name}</h3>
                </div>
                <p className="text-gray-500 text-sm mb-3">{category.description}</p>
                <div className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <div
                      key={articleIndex}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded transition-colors cursor-pointer group"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600">
                          {article.title}
                        </h4>
                        <p className="text-gray-500 text-xs">{article.description}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{article.readTime}</span>
                        <ArrowRight className="w-3 h-3 group-hover:text-blue-600" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-lg p-6 text-center border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {data.ctaText}
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            Contact our support team for personalized assistance.
          </p>
          <Button variant="outline" size="sm" asChild>
            <a href={data.ctaLink}>Get Help</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
