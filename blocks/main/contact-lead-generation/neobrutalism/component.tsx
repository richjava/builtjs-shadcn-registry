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

export default function ContactLeadGenerationNeobrutalism({ content }: ContactLeadGenerationProps) {
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
        options: ["Developer", "CTO", "Product Manager", "Designer", "Other"]
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
            <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
              {data.title}
            </h2>
            <p className="text-xl text-black max-w-3xl mx-auto border-l-4 border-black pl-4">
              {data.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Form */}
            <div className="border-4 border-black p-8 bg-white shadow-[8px_8px_0px_#000000]">
              <h3 className="text-2xl font-bold text-black mb-6 border-b-4 border-black pb-4">
                Get Started Today
              </h3>
              <form className="space-y-6">
                {data.formFields.map((field, index) => {
                  const IconComponent = iconMap[field.name as keyof typeof iconMap] || Mail
                  return (
                    <div key={index}>
                      <label className="block text-sm font-bold text-black mb-2 border-b-2 border-black pb-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </label>
                      {field.type === "select" ? (
                        <select className="w-full p-4 border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000000] focus:border-electric-blue focus:shadow-[4px_4px_0px_#00BFFF] transition-all duration-200">
                          <option value="">Select {field.label}</option>
                          {field.options?.map((option, optIndex) => (
                            <option key={optIndex} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <div className="relative">
                          <IconComponent className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-black" />
                          <input
                            type={field.type}
                            className="w-full p-4 pl-12 border-2 border-black bg-white text-black shadow-[2px_2px_0px_#000000] focus:border-electric-blue focus:shadow-[4px_4px_0px_#00BFFF] transition-all duration-200"
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
                <Button 
                  type="submit"
                  className="w-full bg-electric-blue text-black border-2 border-black shadow-[4px_4px_0px_#000000] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000000] transition-all duration-200 text-lg py-4"
                >
                  {data.ctaText}
                </Button>
                <p className="text-sm text-black text-center border-t-2 border-black pt-4">
                  {data.privacyText}
                </p>
              </form>
            </div>

            {/* Benefits */}
            <div className="border-4 border-black p-8 bg-green-100 shadow-[8px_8px_0px_#000000]">
              <h3 className="text-2xl font-bold text-black mb-6 border-b-4 border-black pb-4">
                What You Get
              </h3>
              <div className="space-y-4">
                {data.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center border-2 border-black p-4 bg-white shadow-[4px_4px_0px_#000000]">
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-green-500 border-2 border-black rounded-full mr-4 shadow-[2px_2px_0px_#000000]">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-bold text-black">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
