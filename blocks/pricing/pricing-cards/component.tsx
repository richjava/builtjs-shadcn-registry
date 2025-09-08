import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Star } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: 9,
    description: "Perfect for small projects and personal use",
    features: [
      "Up to 3 projects",
      "5GB storage",
      "Basic support",
      "SSL certificate",
      "Custom domain"
    ],
    popular: false
  },
  {
    name: "Pro",
    price: 29,
    description: "Best for growing teams and businesses",
    features: [
      "Unlimited projects",
      "100GB storage",
      "Priority support",
      "SSL certificate",
      "Custom domain",
      "Advanced analytics",
      "Team collaboration",
      "API access"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: 99,
    description: "For large organizations with advanced needs",
    features: [
      "Everything in Pro",
      "1TB storage",
      "24/7 dedicated support",
      "Advanced security",
      "SLA guarantee",
      "Custom integrations",
      "On-premise deployment",
      "Training and onboarding"
    ],
    popular: false
  }
]

export default function PricingCards() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Choose your plan
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start for free, upgrade when you need to. All plans include our core features.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Most Popular
                  </div>
                </div>
              )}
              
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="pt-6">
                <Button 
                  className={`w-full mb-6 ${plan.popular ? '' : 'variant-outline'}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.popular ? 'Get Started' : 'Choose Plan'}
                </Button>
                
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-4">
            Need a custom plan? We've got you covered.
          </p>
          <Button variant="outline">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  )
}
