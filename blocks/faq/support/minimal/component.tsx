import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { MessageCircle, Mail, BookOpen, Clock, CheckCircle } from 'lucide-react'

interface FAQSupportProps {
  content: {
    data?: {
      title: string
      subtitle: string
      contactMethods: {
        name: string
        description: string
        icon: string
        status: string
        responseTime: string
        link: string
      }[]
      supportHours: {
        weekdays: string
        weekends: string
        emergency: string
      }
      ctaText: string
      ctaLink: string
    }
  }
}

const iconMap: Record<string, React.ElementType> = {
  'message-circle': MessageCircle,
  'mail': Mail,
  'book-open': BookOpen,
}

export default function FAQSupportMinimal({ content }: FAQSupportProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for FAQ Support Minimal.</div>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {data.contactMethods.map((method, index) => {
            const IconComponent = iconMap[method.icon] || Mail

            return (
              <div
                key={index}
                className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => window.open(method.link, '_blank')}
              >
                <div className="flex items-center space-x-3 mb-3">
                  <IconComponent className="w-5 h-5 text-blue-600" />
                  <div className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-green-600" />
                    <span className="text-xs text-green-600 font-medium">
                      {method.status}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-medium text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {method.name}
                </h3>
                <p className="text-gray-500 text-sm mb-2">{method.description}</p>
                <div className="flex items-center space-x-1 text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{method.responseTime}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
          <h3 className="font-medium text-gray-900 mb-4 text-center">
            Support Hours
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <h4 className="font-medium text-gray-900 text-sm mb-1">Weekdays</h4>
              <p className="text-gray-500 text-xs">{data.supportHours.weekdays}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm mb-1">Weekends</h4>
              <p className="text-gray-500 text-xs">{data.supportHours.weekends}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 text-sm mb-1">Emergency</h4>
              <p className="text-gray-500 text-xs">{data.supportHours.emergency}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-medium text-gray-900 mb-2">
            {data.ctaText}
          </h3>
          <p className="text-gray-500 text-sm mb-4">
            For critical issues requiring immediate attention.
          </p>
          <Button variant="outline" size="sm" asChild>
            <a href={data.ctaLink}>Emergency Support</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
