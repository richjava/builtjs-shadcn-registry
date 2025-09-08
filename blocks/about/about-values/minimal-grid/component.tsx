import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Target, Award, Zap, Shield, Globe, Lightbulb } from "lucide-react"

interface AboutValuesProps {
  content: {
    data?: {
      title: string;
      subtitle: string;
      values: Array<{
        icon: string;
        title: string;
        description: string;
      }>;
    };
  };
}

export default function AboutValues({ content }: AboutValuesProps) {
  const { data } = content;
  
  // Fallback data
  const fallbackData = {
    title: "Our Values",
    subtitle: "The principles that guide everything we do and shape our company culture.",
    values: [
      {
        icon: "Heart",
        title: "Passion-Driven",
        description: "We believe in the power of passion to drive innovation and create meaningful impact."
      },
      {
        icon: "Users",
        title: "People-First",
        description: "Our team and customers are at the heart of everything we do. Their success is our success."
      },
      {
        icon: "Target",
        title: "Purpose-Led",
        description: "Every decision we make is guided by our mission to make technology more accessible."
      },
      {
        icon: "Award",
        title: "Excellence",
        description: "We strive for excellence in every project, pushing boundaries to deliver exceptional results."
      }
    ]
  };

  const finalData = data || fallbackData;

  // Icon mapping
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Heart,
    Users,
    Target,
    Award,
    Zap,
    Shield,
    Globe,
    Lightbulb
  };

  return (
    <section className="py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-light mb-6 text-gray-900 tracking-tight">{finalData.title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            {finalData.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 max-w-6xl mx-auto">
          {finalData.values.map((value, index) => {
            const Icon = iconMap[value.icon] || Heart;
            return (
              <div key={index} className="text-center group">
                <div className="w-12 h-12 mx-auto mb-8 flex items-center justify-center text-gray-400 group-hover:text-gray-600 transition-colors duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-light mb-4 text-gray-900 tracking-wide">{value.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-light">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
