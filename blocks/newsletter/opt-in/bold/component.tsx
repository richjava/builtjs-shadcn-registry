import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Download, ArrowRight, Sparkles, Crown, CheckCircle } from 'lucide-react'

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

export default function NewsletterOptInBold({ content }: NewsletterOptInProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Newsletter Opt-in Bold.</div>
  }

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-orange-900 via-red-900 to-pink-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Crown className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
              Exclusive Access
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            {data.subtitle}
          </p>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-pink-400 text-black px-6 py-3 rounded-full text-sm font-bold mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Premium Content</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {data.leadMagnet}
            </h3>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No Credit Card</span>
              </div>
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Free Forever</span>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="email" className="sr-only">
                    Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={data.placeholder}
                    className="h-14 px-6 text-lg bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 text-white placeholder-gray-300 focus:bg-opacity-20 focus:border-white focus:border-opacity-40"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  size="lg"
                  className="h-14 px-8 bg-gradient-to-r from-yellow-500 to-pink-600 hover:from-yellow-600 hover:to-pink-700 text-white font-bold text-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <Download className="w-5 h-5 mr-2" />
                  {data.buttonText}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <p>{data.privacyText}</p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
