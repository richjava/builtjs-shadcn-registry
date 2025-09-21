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

export default function FAQSupportNeobrutalism({ content }: FAQSupportProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for FAQ Support Neobrutalism.</div>
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
          {data.contactMethods.map((method, index) => {
            const IconComponent = iconMap[method.icon] || MessageCircle
            const status = statusConfig[method.status as keyof typeof statusConfig] || statusConfig.available
            const StatusIcon = status.icon
            
            return (
              <div key={index} className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-electric-blue border-4 border-black rounded-full shadow-[4px_4px_0px_#000000]">
                      <IconComponent className="h-6 w-6 text-black" />
                    </div>
                    <div className={`flex items-center border-2 border-black px-2 py-1 ${status.bg} shadow-[1px_1px_0px_#000000]`}>
                      <StatusIcon className={`h-3 w-3 mr-1 ${status.color}`} />
                      <span className={`text-xs font-bold ${status.color}`}>{method.status}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-black mb-3 border-b-2 border-black pb-2">
                    {method.name}
                  </h3>
                  
                  <p className="text-black mb-4 border-l-4 border-black pl-4">
                    {method.description}
                  </p>
                  
                  <div className="flex items-center mb-4 border-2 border-black p-2 bg-green-100 shadow-[2px_2px_0px_#000000]">
                    <Clock className="h-4 w-4 mr-2 text-black" />
                    <span className="text-sm font-bold text-black">{method.responseTime}</span>
                  </div>
                  
                  <Button 
                    className="w-full bg-electric-blue text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200"
                  >
                    Get Support
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="border-4 border-black p-8 bg-green-100 shadow-[8px_8px_0px_#000000] mb-12">
          <h3 className="text-2xl font-bold text-black mb-6 border-b-4 border-black pb-2">
            Support Hours
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0px_#000000]">
              <h4 className="text-lg font-bold text-black mb-2 border-b-2 border-black pb-1">
                Weekdays
              </h4>
              <p className="text-black">{data.supportHours.weekdays}</p>
            </div>
            <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0px_#000000]">
              <h4 className="text-lg font-bold text-black mb-2 border-b-2 border-black pb-1">
                Weekends
              </h4>
              <p className="text-black">{data.supportHours.weekends}</p>
            </div>
            <div className="border-2 border-black p-4 bg-white shadow-[2px_2px_0px_#000000]">
              <h4 className="text-lg font-bold text-black mb-2 border-b-2 border-black pb-1">
                Emergency
              </h4>
              <p className="text-black">{data.supportHours.emergency}</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-neon-green text-black border-2 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 text-lg px-8 py-4"
          >
            {data.ctaText}
          </Button>
        </div>
      </div>
    </section>
  )
}
