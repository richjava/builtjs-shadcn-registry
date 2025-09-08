import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Settings, Mail, Bell, AlertCircle } from 'lucide-react'

interface NewsletterSubscriptionProps {
  content: {
    data?: {
      title: string
      subtitle: string
      currentStatus: string
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

export default function NewsletterSubscriptionStandard({ content }: NewsletterSubscriptionProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Newsletter Subscription Standard.</div>
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <Settings className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600">
            {data.subtitle}
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Current Status</h3>
              <p className="text-sm text-gray-600">{data.currentStatus}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Preferences</h3>
          
          {data.preferences.map((preference) => (
            <div key={preference.id} className="flex items-start justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Bell className="w-4 h-4 text-gray-500" />
                  <Label htmlFor={preference.id} className="font-medium text-gray-900">
                    {preference.name}
                  </Label>
                </div>
                <p className="text-sm text-gray-600">{preference.description}</p>
              </div>
              <Switch
                id={preference.id}
                defaultChecked={preference.enabled}
                className="ml-4"
              />
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <Button 
            variant="outline" 
            className="w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            {data.unsubscribeText}
          </Button>
        </div>
      </div>
    </section>
  )
}
