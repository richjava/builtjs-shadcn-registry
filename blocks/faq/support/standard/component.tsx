import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { MessageCircle, Mail, Phone, BookOpen, Clock, CheckCircle, AlertCircle } from 'lucide-react'

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
  'phone': Phone,
  'book-open': BookOpen,
}

const statusConfig = {
  online: { color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle },
  available: { color: 'text-blue-600', bg: 'bg-blue-100', icon: CheckCircle },
  offline: { color: 'text-gray-600', bg: 'bg-gray-100', icon: AlertCircle },
}

export default function FAQSupportStandard({ content }: FAQSupportProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for FAQ Support Standard.</div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {data.contactMethods.map((method, index) => {
            const IconComponent = iconMap[method.icon] || MessageCircle
            const statusInfo = statusConfig[method.status as keyof typeof statusConfig] || statusConfig.available
            const StatusIcon = statusInfo.icon

            return (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => window.open(method.link, '_blank')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <IconComponent className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex items-center space-x-1">
                    <StatusIcon className={cn("w-4 h-4", statusInfo.color)} />
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full", statusInfo.color, statusInfo.bg)}>
                      {method.status}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {method.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{method.responseTime}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-blue-50 rounded-lg p-8 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Support Hours
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-2">Weekdays</h4>
              <p className="text-gray-600 text-sm">{data.supportHours.weekdays}</p>
            </div>
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-2">Weekends</h4>
              <p className="text-gray-600 text-sm">{data.supportHours.weekends}</p>
            </div>
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-2">Emergency</h4>
              <p className="text-gray-600 text-sm">{data.supportHours.emergency}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {data.ctaText}
          </h3>
          <p className="text-gray-600 mb-6">
            For critical issues that need immediate attention.
          </p>
          <Button asChild>
            <a href={data.ctaLink}>Emergency Support</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
