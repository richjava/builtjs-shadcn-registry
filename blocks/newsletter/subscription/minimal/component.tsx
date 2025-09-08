import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface NewsletterSubscriptionProps {
  content: {
    data?: {
      title: string
      preferences: {
        id: string
        name: string
        enabled: boolean
      }[]
      unsubscribeText: string
    }
  }
}

export default function NewsletterSubscriptionMinimal({ content }: NewsletterSubscriptionProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Newsletter Subscription Minimal.</div>
  }

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          {data.title}
        </h3>

        <div className="space-y-4">
          {data.preferences.map((preference) => (
            <div key={preference.id} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-b-0">
              <Label htmlFor={preference.id} className="text-sm text-gray-700">
                {preference.name}
              </Label>
              <Switch
                id={preference.id}
                defaultChecked={preference.enabled}
                className="scale-90"
              />
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button 
            variant="ghost" 
            size="sm"
            className="w-full text-gray-500 hover:text-red-600 hover:bg-red-50"
          >
            {data.unsubscribeText}
          </Button>
        </div>
      </div>
    </section>
  )
}
