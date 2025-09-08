import { Button } from "@/components/ui/button"
import { Check, Mail, Building, User, Sparkles, Zap } from "lucide-react"

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
    <section className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500">
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-pink-400/20 rounded-full blur-xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-blue-400/20 rounded-full blur-xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-8">
              <Sparkles className="h-4 w-4 text-yellow-300" />
              <span className="text-white/90 text-sm font-medium">Limited Time Offer</span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-8 leading-tight">
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                {data.title}
              </span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed font-medium">
              {data.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Form */}
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Get Started Now</h3>
              </div>

              <form className="space-y-6">
                {data.formFields.map((field, index) => {
                  const IconComponent = iconMap[field.name as keyof typeof iconMap] || Mail
                  return (
                    <div key={index}>
                      <label className="block text-sm font-bold text-gray-700 mb-3">
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <IconComponent className="h-5 w-5 text-gray-400" />
                        </div>
                        {field.type === "select" ? (
                          <select
                            className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white font-medium"
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
                            className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 bg-white font-medium placeholder-gray-400"
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
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold text-lg py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-200"
                >
                  {data.ctaText}
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  {data.privacyText}
                </p>
              </form>
            </div>

            {/* Benefits */}
            <div className="text-white">
              <h3 className="text-3xl font-bold mb-8">
                What you'll get:
              </h3>
              <ul className="space-y-6">
                {data.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-6 shadow-lg">
                      <Check className="h-5 w-5 text-white font-bold" />
                    </div>
                    <span className="text-lg font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-12 p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Sparkles className="h-4 w-4 text-white" />
                  </div>
                  <h4 className="font-bold text-xl">Trusted by 10,000+ developers</h4>
                </div>
                <p className="text-white/90 leading-relaxed">
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
