import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, CheckCircle } from 'lucide-react'

interface NewsletterSignupProps {
  content: {
    data?: {
      title: string
      subtitle: string
      placeholder: string
      buttonText: string
      privacyText: string
    }
  }
}

export default function NewsletterSignupStandard({ content }: NewsletterSignupProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Newsletter Signup Standard.</div>
  }

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
            <Mail className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600">
            {data.subtitle}
          </p>
        </div>

        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="sr-only">
              Email address
            </Label>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                id="email"
                type="email"
                placeholder={data.placeholder}
                className="flex-1 h-12 px-4 text-base"
                required
              />
              <Button 
                type="submit" 
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {data.buttonText}
              </Button>
            </div>
          </div>
          
          <div className="flex items-start space-x-2 text-sm text-gray-500">
            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
            <p>{data.privacyText}</p>
          </div>
        </form>
      </div>
    </section>
  )
}
