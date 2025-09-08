import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail } from 'lucide-react'

interface NewsletterSignupProps {
  content: {
    data?: {
      title: string
      subtitle: string
      placeholder: string
      buttonText: string
    }
  }
}

export default function NewsletterSignupMinimal({ content }: NewsletterSignupProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Newsletter Signup Minimal.</div>
  }

  return (
    <section className="py-8 md:py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="text-center mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {data.title}
          </h3>
          <p className="text-sm text-gray-600">
            {data.subtitle}
          </p>
        </div>

        <form className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder={data.placeholder}
              className="flex-1 h-9 text-sm border-gray-300 focus:border-gray-400"
              required
            />
            <Button 
              type="submit" 
              size="sm"
              className="h-9 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm"
            >
              {data.buttonText}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
