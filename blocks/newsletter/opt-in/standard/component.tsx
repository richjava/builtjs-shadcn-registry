import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Download, CheckCircle, Gift } from 'lucide-react'

interface NewsletterOptInProps {
  content: {
    data?: {
      title: string
      subtitle: string
      leadMagnet: string
      placeholder: string
      buttonText: string
      privacyText: string
    }
  }
}

export default function NewsletterOptInStandard({ content }: NewsletterOptInProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Newsletter Opt-in Standard.</div>
  }

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <Gift className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            {data.subtitle}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="text-center mb-6">
            <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <CheckCircle className="w-4 h-4" />
              <span>Free Download</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {data.leadMagnet}
            </h3>
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
                  <Download className="w-4 h-4 mr-2" />
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
      </div>
    </section>
  )
}
