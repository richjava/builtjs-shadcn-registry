import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

interface MembersProps {
  content: {
    data?: {
      title: string
      subtitle: string
      members: Array<{
        name: string
        role: string
        department: string
        image: string
        bio: string
        skills: string[]
      }>
      ctaText: string
      ctaLink: string
    }
  }
}

export default function Members({ content }: MembersProps) {
  const data = content.data || {
    title: "Our Team",
    subtitle: "Meet the people who make it all possible.",
    members: [
      {
        name: "Alex Thompson",
        role: "Lead Developer",
        department: "Engineering",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
        bio: "Full-stack developer with expertise in React and Node.js.",
        skills: ["React", "Node.js", "TypeScript", "AWS"]
      },
      {
        name: "Maria Garcia",
        role: "Product Manager",
        department: "Product",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&crop=face",
        bio: "Strategic product leader focused on user experience and growth.",
        skills: ["Product Strategy", "User Research", "Analytics", "Agile"]
      },
      {
        name: "David Kim",
        role: "UX Designer",
        department: "Design",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face",
        bio: "Creative designer passionate about intuitive user interfaces.",
        skills: ["UI/UX", "Figma", "Prototyping", "User Testing"]
      },
      {
        name: "Lisa Wang",
        role: "Marketing Director",
        department: "Marketing",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop&crop=face",
        bio: "Growth-focused marketer with expertise in digital campaigns.",
        skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"]
      }
    ],
    ctaText: "View All Team",
    ctaLink: "/team"
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {data.members.map((member, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-sm transition-shadow duration-200">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-3 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                
                <p className="text-xs text-blue-600 font-medium mb-1">
                  {member.role}
                </p>
                
                <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded mb-2">
                  {member.department}
                </span>
                
                <p className="text-xs text-gray-600 leading-relaxed mb-3">
                  {member.bio}
                </p>
                
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.skills.slice(0, 2).map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gray-100 text-gray-700 text-xs px-1 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {member.skills.length > 2 && (
                    <span className="text-xs text-gray-500">
                      +{member.skills.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="sm">
            {data.ctaText}
            <ArrowRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
    </section>
  )
}
