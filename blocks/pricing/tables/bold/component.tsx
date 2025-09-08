import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Check, X, Star, Zap, Crown } from 'lucide-react'

interface PricingTablesProps {
  content: {
    data?: {
      title: string
      subtitle: string
      plans: {
        name: string
        price: string
        period: string
        description: string
        popular?: boolean
      }[]
      features: {
        name: string
        starter: string
        professional: string
        enterprise: string
      }[]
    }
  }
}

export default function PricingTablesBold({ content }: PricingTablesProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Pricing Tables Bold.</div>
  }

  const getFeatureValue = (value: string) => {
    if (value === "Yes") return <Check className="w-5 h-5 text-green-400" />
    if (value === "No") return <X className="w-5 h-5 text-gray-500" />
    return <span className="text-gray-300">{value}</span>
  }

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23FFD700%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Zap className="w-6 h-6 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
              Feature Comparison
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
            {data.title}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Mobile: Card Layout */}
        <div className="block md:hidden space-y-6">
          {data.plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative bg-white/10 backdrop-blur-sm rounded-2xl border-2 p-6 transition-all duration-300",
                plan.popular
                  ? "border-yellow-400"
                  : "border-white/20"
              )}
            >
              {plan.popular && (
                <div className="flex justify-center mb-4">
                  <div className="flex items-center space-x-2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                    <Crown className="w-4 h-4" />
                    <span>Popular</span>
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="font-bold text-white text-xl mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-yellow-400 mb-2">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-300 ml-1">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-gray-300">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {data.features.map((feature, featureIndex) => {
                  const planKey = plan.name.toLowerCase() as 'starter' | 'professional' | 'enterprise'
                  return (
                    <div key={featureIndex} className="flex items-center justify-between">
                      <span className="text-sm text-gray-300">{feature.name}</span>
                      <div className="flex justify-center">
                        {getFeatureValue(feature[planKey])}
                      </div>
                    </div>
                  )
                })}
              </div>

              <Button
                className={cn(
                  "w-full font-bold transition-all duration-300",
                  plan.popular
                    ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                    : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                )}
                asChild
              >
                <a href="#">
                  Choose {plan.name}
                </a>
              </Button>
            </div>
          ))}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full max-w-5xl mx-auto border-collapse">
            <thead>
              <tr className="border-b-2 border-white/20">
                <th className="text-left py-6 px-6 font-bold text-white text-lg">
                  Features
                </th>
                {data.plans.map((plan, index) => (
                  <th key={index} className="text-center py-6 px-6">
                    <div className={cn(
                      "relative bg-white/10 backdrop-blur-sm rounded-xl p-6 -mx-2 transition-all duration-300 hover:bg-white/20",
                      plan.popular && "border-2 border-yellow-400"
                    )}>
                      {plan.popular && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <div className="flex items-center space-x-2 bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-bold">
                            <Crown className="w-4 h-4" />
                            <span>Popular</span>
                          </div>
                        </div>
                      )}
                      <div className="font-bold text-white text-xl mb-2">
                        {plan.name}
                      </div>
                      <div className="text-3xl font-bold text-yellow-400 mb-2">
                        {plan.price}
                        <span className="text-sm font-normal text-gray-300 ml-1">
                          {plan.period}
                        </span>
                      </div>
                      <div className="text-sm text-gray-300">
                        {plan.description}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.features.map((feature, featureIndex) => (
                <tr key={featureIndex} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-semibold text-white">
                    {feature.name}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center">
                      {getFeatureValue(feature.starter)}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center">
                      {getFeatureValue(feature.professional)}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex justify-center">
                      {getFeatureValue(feature.enterprise)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Desktop: Button Row */}
        <div className="hidden md:block mt-16">
          <div className="overflow-x-auto">
            <table className="w-full max-w-5xl mx-auto border-collapse">
              <tbody>
                <tr>
                  <td className="py-4 px-6"></td>
                  {data.plans.map((plan, index) => (
                    <td key={index} className="py-4 px-6 text-center">
                      <Button
                        className={cn(
                          "w-full font-bold transition-all duration-300",
                          plan.popular
                            ? "bg-yellow-400 hover:bg-yellow-500 text-black"
                            : "bg-white/20 hover:bg-white/30 text-white border border-white/30"
                        )}
                        asChild
                      >
                        <a href="#">
                          Choose {plan.name}
                        </a>
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
