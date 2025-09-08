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

export default function FAQHelpStandard({ content }: FAQHelpProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for FAQ Help Standard.</div>
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            {data.subtitle}
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search help articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {data.categories.map((category, categoryIndex) => {
            const IconComponent = iconMap[category.icon] || Settings
            return (
              <div
                key={categoryIndex}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{category.name}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <div
                      key={articleIndex}
                      className="flex items-center justify-between p-2 hover:bg-white rounded-md transition-colors cursor-pointer group"
                    >
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600">
                          {article.title}
                        </h4>
                        <p className="text-gray-500 text-xs">{article.description}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
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

        <div className="bg-blue-50 rounded-lg p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {data.ctaText}
          </h3>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you with any questions or issues.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <a href={data.ctaLink}>Contact Support</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/live-chat">Live Chat</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
