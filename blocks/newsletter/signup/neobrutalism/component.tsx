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

export default function NewsletterSignupNeobrutalism({ content }: NewsletterSignupProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Newsletter Signup Neobrutalism.</div>
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-black bg-electric-blue shadow-[4px_4px_0px_#000000] mb-6">
            <Mail className="w-8 h-8 text-black" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] p-8">
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-black font-bold border-l-4 border-black pl-3">
                Email Address
              </Label>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input
                  id="email"
                  type="email"
                  placeholder={data.placeholder}
                  className="flex-1 border-4 border-black shadow-[4px_4px_0px_#000000] focus:shadow-[6px_6px_0px_#000000] focus:translate-x-[-2px] focus:translate-y-[-2px] transition-all duration-200 text-black placeholder:text-gray-600"
                  required
                />
                <Button 
                  type="submit"
                  className="border-4 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200 bg-neon-green text-black font-bold px-8"
                >
                  {data.buttonText}
                </Button>
              </div>
            </div>

            <p className="text-sm text-black text-center border-t-2 border-black pt-4">
              {data.privacyText}
            </p>
          </form>

          {/* Benefits */}
          <div className="mt-8 border-t-4 border-black pt-6">
            <h3 className="text-xl font-bold text-black mb-4 border-b-2 border-black pb-2 text-center">
              What You'll Get
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center border-2 border-black p-4 bg-green-100 shadow-[2px_2px_0px_#000000]">
                <CheckCircle className="w-6 h-6 text-black mx-auto mb-2" />
                <div className="text-sm text-black font-medium">Weekly Updates</div>
              </div>
              <div className="text-center border-2 border-black p-4 bg-green-100 shadow-[2px_2px_0px_#000000]">
                <CheckCircle className="w-6 h-6 text-black mx-auto mb-2" />
                <div className="text-sm text-black font-medium">Exclusive Content</div>
              </div>
              <div className="text-center border-2 border-black p-4 bg-green-100 shadow-[2px_2px_0px_#000000]">
                <CheckCircle className="w-6 h-6 text-black mx-auto mb-2" />
                <div className="text-sm text-black font-medium">Early Access</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
