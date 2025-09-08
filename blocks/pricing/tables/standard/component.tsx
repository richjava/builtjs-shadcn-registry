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

export default function PricingTablesStandard({ content }: PricingTablesProps) {
  const { data } = content

  if (!data) {
    return <div>No data provided for Pricing Tables Standard.</div>
  }

  const getFeatureValue = (value: string) => {
    if (value === "Yes") return <Check className="w-5 h-5 text-green-500" />
    if (value === "No") return <X className="w-5 h-5 text-gray-400" />
    return <span className="text-gray-700">{value}</span>
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

        {/* Mobile: Card Layout */}
        <div className="block md:hidden space-y-6">
          {data.plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-lg shadow-lg border-2 p-6",
                plan.popular
                  ? "border-blue-500"
                  : "border-gray-200"
              )}
            >
              {plan.popular && (
                <div className="flex justify-center mb-4">
                  <div className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    <Star className="w-3 h-3" />
                    <span>Popular</span>
                  </div>
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="font-bold text-gray-900 text-xl mb-2">
                  {plan.name}
                </h3>
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {plan.price}
                  <span className="text-sm font-normal text-gray-600 ml-1">
                    {plan.period}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
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

              <Button
                className={cn(
                  "w-full",
                  plan.popular
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-900 hover:bg-gray-800"
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
          <table className="w-full max-w-4xl mx-auto border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-4 px-6 font-semibold text-gray-900">
                  Features
                </th>
                {data.plans.map((plan, index) => (
                  <th key={index} className="text-center py-4 px-6">
                    <div className={cn(
                      "relative",
                      plan.popular && "bg-blue-50 rounded-lg p-4 -mx-2"
                    )}>
                      {plan.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                          <div className="flex items-center space-x-1 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                            <Star className="w-3 h-3" />
                            <span>Popular</span>
                          </div>
                        </div>
                      )}
                      <div className="font-bold text-gray-900 text-lg mb-1">
                        {plan.name}
                      </div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">
                        {plan.price}
                        <span className="text-sm font-normal text-gray-600 ml-1">
                          {plan.period}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">
                        {plan.description}
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.features.map((feature, featureIndex) => (
                <tr key={featureIndex} className="border-b border-gray-100 hover:bg-gray-50">
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
        <div className="hidden md:block mt-12">
          <div className="overflow-x-auto">
            <table className="w-full max-w-4xl mx-auto border-collapse">
              <tbody>
                <tr>
                  <td className="py-4 px-6"></td>
                  {data.plans.map((plan, index) => (
                    <td key={index} className="py-4 px-6 text-center">
                      <Button
                        className={cn(
                          "w-full",
                          plan.popular
                            ? "bg-blue-600 hover:bg-blue-700"
                            : "bg-gray-900 hover:bg-gray-800"
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
