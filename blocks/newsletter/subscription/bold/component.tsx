import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Settings, Sparkles, AlertTriangle } from 'lucide-react'

interface NewsletterSubscriptionProps {
  content: {
    data?: {
      title: string
      subtitle: string
      preferences: {
        id: string
        name: string
        description: string
        enabled: boolean
      }[]
      unsubscribeText: string
    }
  }
}

export default function NewsletterSubscriptionBold({ content }: NewsletterSubscriptionProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Newsletter Subscription Bold.</div>
  }

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
              Personalization
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {data.preferences.map((preference) => (
            <div key={preference.id} className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-xl p-6 hover:bg-opacity-20 transition-all duration-300">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Settings className="w-5 h-5 text-yellow-400" />
                    <Label htmlFor={preference.id} className="text-lg font-semibold text-white">
                      {preference.name}
                    </Label>
                  </div>
                  <p className="text-gray-300 text-sm">{preference.description}</p>
                </div>
                <Switch
                  id={preference.id}
                  defaultChecked={preference.enabled}
                  className="ml-6 scale-110"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white border-opacity-20">
          <Button 
            variant="outline"
            size="lg"
            className="w-full h-14 text-red-400 border-red-400 hover:bg-red-400 hover:text-white font-semibold text-lg"
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            {data.unsubscribeText}
          </Button>
        </div>
      </div>
    </section>
  )
}
