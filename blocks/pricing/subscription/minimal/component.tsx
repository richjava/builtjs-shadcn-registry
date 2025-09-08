import { cn } from '@/lib/utils'
import { Check, ArrowRight, Calendar } from 'lucide-react'

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

export default function PricingSubscriptionMinimal({ content }: PricingSubscriptionProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Pricing Subscription Minimal.</div>
  }

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-light text-gray-900 mb-3">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        {/* Billing Options */}
        <div className="flex justify-center mb-16">
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            {data.billingOptions.map((option, index) => (
              <div
                key={index}
                className={cn(
                  "px-6 py-2 rounded-md text-sm font-medium flex items-center space-x-2 transition-colors",
                  option.active
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:text-gray-900"
                )}
              >
                <Calendar className="w-4 h-4" />
                <span>{option.name}</span>
                {option.discount > 0 && (
                  <span className="text-xs text-gray-400">
                    (save {option.discount}%)
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {data.plans.map((plan, index) => (
            <div
              key={index}
              className="group cursor-pointer"
            >
              <div className="text-center mb-8">
                <h3 className="text-xl font-medium text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  {plan.description}
                </p>
                <div className="mb-8">
                  <span className="text-3xl font-light text-gray-900">
                    {plan.monthlyPrice}
                  </span>
                  <span className="text-gray-500 ml-1">
                    /month
                  </span>
                  <div className="text-xs text-gray-400 mt-1">
                    or {plan.annualPrice}/year
                  </div>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="w-4 h-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="text-center">
                <a
                  href={plan.ctaLink}
                  className="inline-flex items-center text-sm text-gray-900 hover:text-gray-700 transition-colors group-hover:translate-x-1 transform duration-200"
                >
                  {plan.ctaText}
                  <ArrowRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-sm text-gray-500">
            All plans include 14-day free trial • Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}
