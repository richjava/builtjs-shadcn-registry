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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 mb-6 tracking-tight">
              {data.title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {data.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <div className="bg-gray-50 rounded-none p-12 border border-gray-200">
              <form className="space-y-8">
                {data.formFields.map((field, index) => {
                  const IconComponent = iconMap[field.name as keyof typeof iconMap] || Mail
                  return (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        {field.label}
                        {field.required && <span className="text-gray-400 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <IconComponent className="h-4 w-4 text-gray-400" />
                        </div>
                        {field.type === "select" ? (
                          <select
                            className="block w-full pl-12 pr-4 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-gray-900 rounded-none text-gray-900"
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
                            className="block w-full pl-12 pr-4 py-4 border-0 border-b-2 border-gray-300 bg-transparent focus:ring-0 focus:border-gray-900 rounded-none text-gray-900 placeholder-gray-400"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            required={field.required}
                          />
                        )}
                      </div>
                    </div>
                  )
                })}
                
                <Button 
                  type="submit" 
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium text-lg py-4 rounded-none border-0 mt-8"
                >
                  {data.ctaText}
                </Button>
                
                <p className="text-xs text-gray-400 text-center mt-4">
                  {data.privacyText}
                </p>
              </form>
            </div>

            {/* Benefits */}
            <div className="text-gray-900">
              <h3 className="text-xl font-light mb-8 text-gray-700">
                What you'll get:
              </h3>
              <ul className="space-y-6">
                {data.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 bg-gray-900 rounded-full flex items-center justify-center mr-4 mt-0.5">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 p-8 bg-gray-50 border border-gray-200">
                <h4 className="font-medium mb-3 text-gray-900">Trusted by 10,000+ developers</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
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
