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

export default function NewsletterOptInNeobrutalism({ content }: NewsletterOptInProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Newsletter Opt-in Neobrutalism.</div>
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <div className="inline-flex items-center justify-center w-20 h-20 border-4 border-black bg-electric-blue shadow-[4px_4px_0px_#000000] mb-6">
            <Gift className="w-10 h-10 text-black" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 border-2 border-black bg-neon-green shadow-[2px_2px_0px_#000000] px-4 py-2 mb-6">
              <CheckCircle className="w-5 h-5 text-black" />
              <span className="text-black font-bold">FREE DOWNLOAD</span>
            </div>
            <h3 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">
              {data.leadMagnet}
            </h3>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black font-bold border-l-4 border-black pl-3">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder={data.placeholder}
                className="border-4 border-black shadow-[4px_4px_0px_#000000] focus:shadow-[6px_6px_0px_#000000] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all duration-200 text-black placeholder:text-gray-600"
                required
              />
            </div>

            <Button 
              type="submit"
              className="w-full border-4 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 bg-electric-blue text-black font-bold text-lg py-4"
            >
              <Download className="w-5 h-5 mr-2" />
              {data.buttonText}
            </Button>

            <p className="text-sm text-black text-center border-t-2 border-black pt-4">
              {data.privacyText}
            </p>
          </form>

          {/* Trust Indicators */}
          <div className="mt-8 border-t-4 border-black pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center border-2 border-black p-4 bg-green-100 shadow-[2px_2px_0px_#000000]">
                <div className="text-2xl font-bold text-black mb-1">10K+</div>
                <div className="text-sm text-black font-medium">Downloads</div>
              </div>
              <div className="text-center border-2 border-black p-4 bg-green-100 shadow-[2px_2px_0px_#000000]">
                <div className="text-2xl font-bold text-black mb-1">4.9★</div>
                <div className="text-sm text-black font-medium">Rating</div>
              </div>
              <div className="text-center border-2 border-black p-4 bg-green-100 shadow-[2px_2px_0px_#000000]">
                <div className="text-2xl font-bold text-black mb-1">100%</div>
                <div className="text-sm text-black font-medium">Free</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
