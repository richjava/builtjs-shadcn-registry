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

  // Color schemes for each value
  const colorSchemes = [
    { bg: "bg-gradient-to-br from-pink-500 to-rose-600", icon: "text-white", text: "text-white" },
    { bg: "bg-gradient-to-br from-blue-500 to-cyan-600", icon: "text-white", text: "text-white" },
    { bg: "bg-gradient-to-br from-purple-500 to-indigo-600", icon: "text-white", text: "text-white" },
    { bg: "bg-gradient-to-br from-orange-500 to-red-600", icon: "text-white", text: "text-white" }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black mb-6 text-white tracking-tight">
            {finalData.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
            {finalData.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {finalData.values.map((value, index) => {
            const Icon = iconMap[value.icon] || Heart;
            const colors = colorSchemes[index % colorSchemes.length];
            return (
              <Card key={index} className={`${colors.bg} border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-3xl`}>
                <CardContent className="pt-8 pb-8 text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                    <Icon className={`h-10 w-10 ${colors.icon}`} />
                  </div>
                  <h3 className={`text-2xl font-bold mb-4 ${colors.text} tracking-wide`}>
                    {value.title}
                  </h3>
                  <p className={`text-sm ${colors.text} opacity-90 leading-relaxed font-medium`}>
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
