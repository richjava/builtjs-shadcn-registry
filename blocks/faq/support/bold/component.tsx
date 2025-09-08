import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { MessageCircle, Mail, Phone, Video, BookOpen, Users, Clock, CheckCircle, AlertCircle, Sparkles } from 'lucide-react'

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
  'video': Video,
  'book-open': BookOpen,
  'users': Users,
}

const statusConfig = {
  online: { color: 'text-green-400', bg: 'bg-green-500', icon: CheckCircle, label: 'Online' },
  available: { color: 'text-blue-400', bg: 'bg-blue-500', icon: CheckCircle, label: 'Available' },
  offline: { color: 'text-gray-400', bg: 'bg-gray-500', icon: AlertCircle, label: 'Offline' },
}

export default function FAQSupportBold({ content }: FAQSupportProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for FAQ Support Bold.</div>
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
              Premium Support
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {data.contactMethods.map((method, index) => {
            const IconComponent = iconMap[method.icon] || MessageCircle
            const statusInfo = statusConfig[method.status as keyof typeof statusConfig] || statusConfig.available
            const StatusIcon = statusInfo.icon

            return (
              <div
                key={index}
                className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300 transform hover:scale-105 cursor-pointer group"
                onClick={() => window.open(method.link, '_blank')}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={cn("w-2 h-2 rounded-full", statusInfo.bg)}></div>
                    <span className="text-xs font-medium text-gray-300">
                      {statusInfo.label}
                    </span>
                  </div>
                </div>
                
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-300 transition-colors">
                  {method.name}
                </h3>
                <p className="text-gray-300 text-sm mb-3">{method.description}</p>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">{method.responseTime}</span>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Support Hours</h3>
            <p className="text-gray-300">We're here when you need us most</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h4 className="font-bold text-white text-lg mb-2">Weekdays</h4>
              <p className="text-gray-300">{data.supportHours.weekdays}</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-white text-lg mb-2">Weekends</h4>
              <p className="text-gray-300">{data.supportHours.weekends}</p>
            </div>
            <div className="text-center">
              <h4 className="font-bold text-white text-lg mb-2">Emergency</h4>
              <p className="text-gray-300">{data.supportHours.emergency}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <h3 className="text-2xl font-bold text-white">
              {data.ctaText}
            </h3>
          </div>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            For critical issues that require immediate expert attention and resolution.
          </p>
          <Button 
            size="lg"
            className="px-8 py-4 rounded-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold shadow-lg transition-all duration-300 transform hover:scale-105"
            asChild
          >
            <a href={data.ctaLink}>Emergency Support</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
