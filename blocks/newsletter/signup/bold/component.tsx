import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Mail, ArrowRight, Sparkles } from 'lucide-react'

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

export default function NewsletterSignupBold({ content }: NewsletterSignupProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Newsletter Signup Bold.</div>
  }

  return (
    <section className="relative py-16 md:py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 max-w-3xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 mb-6">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
              Exclusive Access
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
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
                {data.buttonText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
            <Mail className="w-4 h-4 text-green-400" />
            <p>{data.privacyText}</p>
          </div>
        </form>
      </div>
    </section>
  )
}
