import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { PlayCircle, CreditCard, Settings, Wrench, Clock, ArrowRight, Search, Sparkles } from 'lucide-react'

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

export default function FAQHelpBold({ content }: FAQHelpProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for FAQ Help Bold.</div>
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
              Knowledge Base
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {data.subtitle}
          </p>
          
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search our knowledge base..."
                className="w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-xl text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {data.categories.map((category, categoryIndex) => {
            const IconComponent = iconMap[category.icon] || Settings
            return (
              <div
                key={categoryIndex}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-white text-lg">{category.name}</h3>
                </div>
                <p className="text-gray-300 text-sm mb-4">{category.description}</p>
                <div className="space-y-2">
                  {category.articles.map((article, articleIndex) => (
                    <div
                      key={articleIndex}
                      className="flex items-center justify-between p-3 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-white text-sm group-hover:text-blue-300">
                          {article.title}
                        </h4>
                        <p className="text-gray-300 text-xs">{article.description}</p>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Clock className="w-3 h-3" />
                        <span className="text-xs">{article.readTime}</span>
                        <ArrowRight className="w-3 h-3 group-hover:text-blue-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-8 text-center">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white">
              {data.ctaText}
            </h3>
          </div>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Our expert support team is standing by to provide personalized assistance and ensure your success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
              asChild
            >
              <a href={data.ctaLink}>Contact Support</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-4 rounded-full border-white border-opacity-30 text-white hover:bg-white hover:bg-opacity-10 font-semibold transition-all duration-300"
              asChild
            >
              <a href="/live-chat">Live Chat</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
