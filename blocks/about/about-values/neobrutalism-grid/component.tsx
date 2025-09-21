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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black mb-8 text-black border-4 border-black bg-yellow-400 text-black px-8 py-6 shadow-[4px_4px_0px_#000000]">
            {finalData.title}
          </h2>
          <p className="text-2xl text-black font-bold max-w-4xl mx-auto leading-relaxed">
            {finalData.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {finalData.values.map((value, index) => {
            const Icon = iconMap[value.icon] || Heart; // Fallback to Heart if icon not found
            return (
              <Card key={index} className="bg-blue-500 border-4 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
                <CardContent className="pt-8 pb-8 px-6">
                  <div className="w-20 h-20 bg-red-500 border-4 border-black rounded-none flex items-center justify-center mx-auto mb-6 shadow-[2px_2px_0px_#000000]">
                    <Icon className="h-10 w-10 text-black" />
                  </div>
                  <h3 className="text-2xl font-black mb-4 text-black">{value.title}</h3>
                  <p className="text-black font-bold leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
