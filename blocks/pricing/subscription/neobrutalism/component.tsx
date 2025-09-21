import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Check, Star, Calendar, CreditCard } from 'lucide-react'

interface PricingSubscriptionProps {
  content: {
    data?: {
      title: string
      subtitle: string
      billingOptions: {
        name: string
        discount: number
        active: boolean
      }[]
      plans: {
        name: string
        monthlyPrice: string
        annualPrice: string
        description: string
        features: string[]
        ctaText: string
        ctaLink: string
        popular: boolean
      }[]
    }
  }
}

export default function PricingSubscriptionNeobrutalism({ content }: PricingSubscriptionProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Pricing Subscription Neobrutalism.</div>
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

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="border-4 border-black bg-white shadow-[4px_4px_0px_#000000] p-2 flex">
            {data.billingOptions.map((option, index) => (
              <button
                key={index}
                className={cn(
                  "px-6 py-3 font-bold text-sm border-2 border-black transition-all duration-200",
                  option.active
                    ? "bg-electric-blue text-black shadow-[2px_2px_0px_#000000]"
                    : "bg-white text-black hover:bg-green-100"
                )}
              >
                <div className="flex items-center">
                  {option.name === 'Monthly' ? (
                    <Calendar className="h-4 w-4 mr-2" />
                  ) : (
                    <CreditCard className="h-4 w-4 mr-2" />
                  )}
                  {option.name}
                  {option.discount > 0 && (
                    <span className="ml-2 border border-black px-2 py-1 bg-neon-green shadow-[1px_1px_0px_#000000] text-xs">
                      Save {option.discount}%
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative border-4 border-black bg-white shadow-[8px_8px_0px_#000000] p-8 transition-all duration-200 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[12px_12px_0px_#000000]",
                plan.popular
                  ? "border-black bg-electric-blue transform scale-105"
                  : "border-black bg-white"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 border-2 border-black px-4 py-1 bg-neon-green shadow-[2px_2px_0px_#000000]">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-black mr-1" />
                    <span className="text-sm font-bold text-black">Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-extrabold text-black border-2 border-black px-4 py-2 bg-white shadow-[2px_2px_0px_#000000]">
                      {data.billingOptions[0]?.active ? plan.monthlyPrice : plan.annualPrice}
                    </span>
                    <span className="text-lg text-black ml-2 border-2 border-black px-2 py-1 bg-white shadow-[1px_1px_0px_#000000]">
                      {data.billingOptions[0]?.active ? '/month' : '/year'}
                    </span>
                  </div>
                  {!data.billingOptions[0]?.active && (
                    <div className="mt-2 border-2 border-black px-3 py-1 bg-green-100 shadow-[1px_1px_0px_#000000] inline-block">
                      <span className="text-sm font-bold text-black">
                        Save ${(parseFloat(plan.monthlyPrice.replace('$', '')) * 12 - parseFloat(plan.annualPrice.replace('$', ''))).toFixed(0)}/year
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-black border-l-4 border-black pl-4">
                  {plan.description}
                </p>
              </div>

              <div className="mb-8">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <div className="border-2 border-black p-1 bg-neon-green shadow-[1px_1px_0px_#000000] mr-3">
                        <Check className="h-4 w-4 text-black" />
                      </div>
                      <span className="text-black font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button 
                className={cn(
                  "w-full border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200",
                  plan.popular
                    ? "bg-neon-green text-black"
                    : "bg-electric-blue text-black"
                )}
              >
                {plan.ctaText}
              </Button>
            </div>
          ))}
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
