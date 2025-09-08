import { cn } from '@/lib/utils'
import { Check, X, ArrowRight } from 'lucide-react'

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

export default function PricingTablesMinimal({ content }: PricingTablesProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Pricing Tables Minimal.</div>
  }

  const getFeatureValue = (value: string) => {
    if (value === "Yes") return <Check className="w-4 h-4 text-gray-600" />
    if (value === "No") return <X className="w-4 h-4 text-gray-300" />
    return <span className="text-sm text-gray-600">{value}</span>
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

        {/* Mobile: Card Layout */}
        <div className="block md:hidden space-y-8">
          {data.plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm border p-6"
            >
              <div className="text-center mb-6">
                <h3 className="font-medium text-gray-900 text-lg mb-2">
                  {plan.name}
                </h3>
                <div className="text-2xl font-light text-gray-900 mb-2">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-500 ml-1">
                    {plan.period}
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  {plan.description}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                {data.features.map((feature, featureIndex) => {
                  const planKey = plan.name.toLowerCase() as 'starter' | 'professional' | 'enterprise'
                  return (
                    <div key={featureIndex} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{feature.name}</span>
                      <div className="flex justify-center">
                        {getFeatureValue(feature[planKey])}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="text-center">
                <a
                  href="#"
                  className="group flex items-center justify-center text-sm text-gray-900 hover:text-gray-700 transition-colors"
                >
                  Choose {plan.name}
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: Table Layout */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full max-w-4xl mx-auto border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-6 px-6 font-medium text-gray-900">
                  Features
                </th>
                {data.plans.map((plan, index) => (
                  <th key={index} className="text-center py-6 px-6">
                    <div className={cn(
                      "space-y-2",
                      plan.popular && "bg-white rounded-lg p-4 -mx-2 shadow-sm"
                    )}>
                      <div className="font-medium text-gray-900 text-lg">
                        {plan.name}
                      </div>
                      <div className="text-2xl font-light text-gray-900">
                        {plan.price}
                        <span className="text-sm font-normal text-gray-500 ml-1">
                          {plan.period}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {plan.description}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.features.map((feature, featureIndex) => (
                <tr key={featureIndex} className="border-b border-gray-100">
                  <td className="py-4 px-6 font-medium text-gray-900">
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
            <table className="w-full max-w-4xl mx-auto border-collapse">
              <tbody>
                <tr>
                  <td className="py-4 px-6"></td>
                  {data.plans.map((plan, index) => (
                    <td key={index} className="py-4 px-6 text-center">
                      <a
                        href="#"
                        className="group flex items-center justify-center text-sm text-gray-900 hover:text-gray-700 transition-colors"
                      >
                        Choose {plan.name}
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </a>
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
