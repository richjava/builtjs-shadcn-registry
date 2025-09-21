import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Check, X, Star } from 'lucide-react'

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

export default function PricingTablesNeobrutalism({ content }: PricingTablesProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Pricing Tables Neobrutalism.</div>
  }

  const getFeatureValue = (value: string) => {
    if (value === "Yes") return <Check className="w-5 h-5 text-black" />
    if (value === "No") return <X className="w-5 h-5 text-black" />
    return <span className="text-black font-medium">{value}</span>
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black max-w-3xl mx-auto border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        {/* Pricing Table */}
        <div className="border-4 border-black bg-white shadow-[8px_8px_0px_#000000] overflow-hidden">
          {/* Header */}
          <div className="border-b-4 border-black">
            <div className="grid grid-cols-4">
              <div className="border-r-4 border-black p-6 bg-green-100">
                <h3 className="text-lg font-bold text-black border-b-2 border-black pb-2">
                  Features
                </h3>
              </div>
              {data.plans.map((plan, index) => (
                <div key={index} className={cn(
                  "border-r-4 border-black p-6 text-center",
                  index === data.plans.length - 1 ? "border-r-0" : "",
                  plan.popular ? "bg-electric-blue" : "bg-white"
                )}>
                  {plan.popular && (
                    <div className="mb-4 border-2 border-black px-3 py-1 bg-neon-green shadow-[2px_2px_0px_#000000] inline-block">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-black mr-1" />
                        <span className="text-sm font-bold text-black">Popular</span>
                      </div>
                    </div>
                  )}
                  <h3 className="text-xl font-bold text-black mb-2 border-b-2 border-black pb-2">
                    {plan.name}
                  </h3>
                  <div className="mb-2">
                    <span className="text-3xl font-extrabold text-black border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_#000000]">
                      {plan.price}
                    </span>
                    <span className="text-sm text-black ml-1 border border-black px-2 py-1 bg-white shadow-[1px_1px_0px_#000000]">
                      {plan.period}
                    </span>
                  </div>
                  <p className="text-black text-sm border-l-4 border-black pl-3 mb-4">
                    {plan.description}
                  </p>
                  <Button 
                    className={cn(
                      "w-full border-2 border-black shadow-[2px_2px_0px_#000000] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[3px_3px_0px_#000000] transition-all duration-200",
                      plan.popular
                        ? "bg-neon-green text-black"
                        : "bg-electric-blue text-black"
                    )}
                  >
                    Get Started
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="divide-y-4 divide-black">
            {data.features.map((feature, featureIndex) => (
              <div key={featureIndex} className="grid grid-cols-4">
                <div className="border-r-4 border-black p-4 bg-green-100">
                  <span className="text-black font-medium border-l-4 border-black pl-3">
                    {feature.name}
                  </span>
                </div>
                <div className="border-r-4 border-black p-4 text-center bg-white">
                  <div className="flex justify-center">
                    {getFeatureValue(feature.starter)}
                  </div>
                </div>
                <div className="border-r-4 border-black p-4 text-center bg-white">
                  <div className="flex justify-center">
                    {getFeatureValue(feature.professional)}
                  </div>
                </div>
                <div className="p-4 text-center bg-white">
                  <div className="flex justify-center">
                    {getFeatureValue(feature.enterprise)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 border-4 border-black p-6 bg-green-100 shadow-[6px_6px_0px_#000000]">
          <p className="text-black font-medium border-l-4 border-black pl-4">
            All plans include 30-day money-back guarantee. No hidden fees. Cancel anytime.
          </p>
        </div>
      </div>
    </section>
  )
}
