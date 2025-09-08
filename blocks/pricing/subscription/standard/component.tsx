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

export default function PricingSubscriptionStandard({ content }: PricingSubscriptionProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Pricing Subscription Standard.</div>
  }

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 rounded-lg p-1 flex">
            {data.billingOptions.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium flex items-center space-x-2",
                  option.active
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-600"
                )}
              >
                <Calendar className="w-4 h-4" />
                <span>{option.name}</span>
                {option.discount > 0 && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                    Save {option.discount}%
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {data.plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative bg-white rounded-lg shadow-lg border-2 p-8 transition-all duration-300 hover:shadow-xl",
                plan.popular
                  ? "border-blue-500 transform scale-105"
                  : "border-gray-200 hover:border-gray-300"
              )}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="flex items-center space-x-1 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.monthlyPrice}
                  </span>
                  <span className="text-gray-600 ml-1">
                    /month
                  </span>
                  <div className="text-sm text-gray-500 mt-1">
                    or {plan.annualPrice}/year (save 20%)
                  </div>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={cn(
                  "w-full",
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-900 hover:bg-gray-800"
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

        <div className="text-center mt-12">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <CreditCard className="w-4 h-4" />
            <span>All plans include 14-day free trial • Cancel anytime • No setup fees</span>
          </div>
        </div>
      </div>
    </section>
  )
}
