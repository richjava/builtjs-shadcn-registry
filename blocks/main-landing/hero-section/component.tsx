import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium mb-8">
            ✨ Introducing our new features
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Build amazing products with{" "}
            <span className="text-primary">modern tools</span>
          </h1>

          {/* Description */}
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Create beautiful, responsive websites and applications with our comprehensive
            toolkit. Everything you need to bring your ideas to life.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="min-w-[200px]">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" className="min-w-[200px]">
              <Play className="mr-2 h-4 w-4" />
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground mb-6">
              Trusted by teams at leading companies
            </p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="font-semibold">Company A</div>
              <div className="font-semibold">Company B</div>
              <div className="font-semibold">Company C</div>
              <div className="font-semibold">Company D</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
