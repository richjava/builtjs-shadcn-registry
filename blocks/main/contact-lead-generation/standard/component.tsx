import { Button } from "@/components/ui/button"
import { Check, Mail, Building, User } from "lucide-react"

interface ContactLeadGenerationProps {
  content: {
    data?: {
      title: string
      subtitle: string
      formType: string
      formFields: Array<{
        name: string
        type: string
        label: string
        required: boolean
        options?: string[]
      }>
      ctaText: string
      privacyText: string
      benefits: string[]
    }
  }
}

const iconMap = {
  email: Mail,
  company: Building,
  role: User
}

export default function ContactLeadGeneration({ content }: ContactLeadGenerationProps) {
  const data = content.data || {
    title: "Ready to Transform Your Development?",
    subtitle: "Get started with a free trial and see the difference our platform can make for your team.",
    formType: "signup",
    formFields: [
      {
        name: "email",
        type: "email",
        label: "Email Address",
        required: true
      },
      {
        name: "company",
        type: "text",
        label: "Company Name",
        required: true
      },
      {
        name: "role",
        type: "select",
        label: "Role",
        required: true,
        options: ["Developer", "CTO", "Product Manager", "Other"]
      }
    ],
    ctaText: "Start Free Trial",
    privacyText: "We respect your privacy. Unsubscribe at any time.",
    benefits: [
      "14-day free trial",
      "No credit card required",
      "Full access to all features",
      "24/7 support included"
    ]
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {data.title}
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              {data.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <form className="space-y-6">
                {data.formFields.map((field, index) => {
                  const IconComponent = iconMap[field.name as keyof typeof iconMap] || Mail
                  return (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <IconComponent className="h-5 w-5 text-gray-400" />
                        </div>
                        {field.type === "select" ? (
                          <select
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required={field.required}
                          >
                            <option value="">Select {field.label}</option>
                            {field.options?.map((option, optionIndex) => (
                              <option key={optionIndex} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            name={field.name}
                            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            required={field.required}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-3">
                  {data.ctaText}
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  {data.privacyText}
                </p>
              </form>
            </div>

            {/* Benefits */}
            <div className="text-white">
              <h3 className="text-2xl font-bold mb-6">
                What you'll get:
              </h3>
              <ul className="space-y-4">
                {data.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 p-6 bg-white/10 rounded-lg backdrop-blur-sm">
                <h4 className="font-semibold mb-2">Trusted by 10,000+ developers</h4>
                <p className="text-white/80 text-sm">
                  Join companies like TechCorp, StartupXYZ, and hundreds of others who are already building the future with our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
