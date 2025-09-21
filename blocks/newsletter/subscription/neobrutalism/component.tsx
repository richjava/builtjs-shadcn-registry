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

export default function NewsletterSubscriptionNeobrutalism({ content }: NewsletterSubscriptionProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Newsletter Subscription Neobrutalism.</div>
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-black bg-electric-blue shadow-[4px_4px_0px_#000000] mb-6">
            <Settings className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="border-4 border-black bg-green-100 shadow-[8px_8px_0px_#000000] p-8 mb-8">
          <div className="flex items-center space-x-4">
            <div className="border-2 border-black p-2 bg-neon-green shadow-[2px_2px_0px_#000000]">
              <Mail className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-bold text-black text-lg border-b-2 border-black pb-1">Current Status</h3>
              <p className="text-black font-medium">{data.currentStatus}</p>
            </div>
          </div>
        </div>

        <div className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] p-8">
          <h3 className="text-2xl font-bold text-black mb-6 border-b-2 border-black pb-2">
            Notification Preferences
          </h3>
          
          <div className="space-y-6">
            {data.preferences.map((preference) => (
              <div key={preference.id} className="border-2 border-black p-6 bg-white shadow-[2px_2px_0px_#000000]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="border-2 border-black p-2 bg-electric-blue shadow-[1px_1px_0px_#000000]">
                      {preference.id === 'email' ? (
                        <Mail className="w-5 h-5 text-black" />
                      ) : preference.id === 'notifications' ? (
                        <Bell className="w-5 h-5 text-black" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-black" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-lg border-b border-black pb-1">
                        {preference.name}
                      </h4>
                      <p className="text-black border-l-2 border-black pl-2">
                        {preference.description}
                      </p>
                    </div>
                  </div>
                  <Switch
                    defaultChecked={preference.enabled}
                    className="border-2 border-black"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t-4 border-black pt-6">
            <Button 
              className="w-full border-4 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200 bg-electric-blue text-black font-bold"
            >
              Save Preferences
            </Button>
          </div>

          <div className="mt-6 text-center border-t-2 border-black pt-4">
            <p className="text-sm text-black border-l-4 border-black pl-4">
              {data.unsubscribeText}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
