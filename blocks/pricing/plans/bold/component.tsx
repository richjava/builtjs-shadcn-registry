import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Check, Star, Zap, Crown } from 'lucide-react'

interface PricingPlansProps {
  content: {
    data?: {
      title: string
      subtitle: string
      plans: {
        name: string
        price: string
        period: string
        description: string
        features: string[]
        ctaText: string
        ctaLink: string
        popular: boolean
      }[]
    }
  }
}

export default function PricingPlansBold({ content }: PricingPlansProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Pricing Plans Bold.</div>
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FFD700%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
              Flexible Pricing
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative bg-white/10 backdrop-blur-sm rounded-2xl border-2 p-8 transition-all duration-500 hover:bg-white/20 transform hover:-translate-y-2 hover:scale-105",
                plan.popular
                  ? "border-yellow-400"
                  : "border-white/20 hover:border-white/40"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-2 bg-yellow-400 text-yellow-900 px-4 py-2 rounded-full text-sm font-bold">
                    <Crown className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {plan.name}
                </h3>
                <p className="text-gray-300 mb-4">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-300 ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full font-bold transition-all duration-300",
                  plan.popular
                    ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                    : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                )}
                asChild
              >
                <a href={plan.ctaLink}>
                  {plan.ctaText}
                </a>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
