import { cn } from '@/lib/utils'
import { Check, ArrowRight } from 'lucide-react'

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

export default function PricingPlansMinimal({ content }: PricingPlansProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Pricing Plans Minimal.</div>
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
                    {plan.price}
                  </span>
                  <span className="text-gray-500 ml-1">
                    {plan.period}
                  </span>
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
      </div>
    </section>
  )
}
