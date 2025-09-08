import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Download } from 'lucide-react'

interface NewsletterOptInProps {
  content: {
    data?: {
      title: string
      leadMagnet: string
      placeholder: string
      buttonText: string
    }
  }
}

export default function NewsletterOptInMinimal({ content }: NewsletterOptInProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Newsletter Opt-in Minimal.</div>
  }

  return (
    <section className="py-8 md:py-12 bg-white border border-gray-200 rounded-lg">
      <div className="container mx-auto px-4 max-w-md">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {data.title}
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            {data.leadMagnet}
          </p>
        </div>

        <form className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder={data.placeholder}
              className="flex-1 h-9 text-sm"
              required
            />
            <Button 
              type="submit" 
              size="sm"
              className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm"
            >
              <Download className="w-3 h-3 mr-1" />
              {data.buttonText}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
