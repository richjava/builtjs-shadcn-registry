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
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
        bio: "Full-stack developer with expertise in React and Node.js.",
        skills: ["React", "Node.js", "TypeScript", "AWS"]
      },
      {
        name: "Maria Garcia",
        role: "Product Manager",
        department: "Product",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=300&fit=crop&crop=face",
        bio: "Strategic product leader focused on user experience and growth.",
        skills: ["Product Strategy", "User Research", "Analytics", "Agile"]
      },
      {
        name: "David Kim",
        role: "UX Designer",
        department: "Design",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop&crop=face",
        bio: "Creative designer passionate about intuitive user interfaces.",
        skills: ["UI/UX", "Figma", "Prototyping", "User Testing"]
      },
      {
        name: "Lisa Wang",
        role: "Marketing Director",
        department: "Marketing",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=300&fit=crop&crop=face",
        bio: "Growth-focused marketer with expertise in digital campaigns.",
        skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics"]
      }
    ],
    ctaText: "View All Team",
    ctaLink: "/team"
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {data.members.map((member, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
              <div className="relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={300}
                  height={300}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {member.department}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                
                <p className="text-blue-600 font-medium mb-3">
                  {member.role}
                </p>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg">
            {data.ctaText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
