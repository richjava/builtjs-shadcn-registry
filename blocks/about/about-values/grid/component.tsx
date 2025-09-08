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
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{finalData.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {finalData.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {finalData.values.map((value, index) => {
            const Icon = iconMap[value.icon] || Heart; // Fallback to Heart if icon not found
            return (
              <Card key={index} className="text-center border-0 shadow-none">
                <CardContent className="pt-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
