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

export default function MembersNeobrutalism({ content }: MembersProps) {
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
        skills: ["UI/UX Design", "Figma", "Prototyping", "User Testing"]
      },
      {
        name: "Sarah Johnson",
        role: "Marketing Director",
        department: "Marketing",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
        bio: "Marketing strategist with expertise in digital campaigns and brand building.",
        skills: ["Digital Marketing", "Brand Strategy", "Content Marketing", "SEO"]
      }
    ],
    ctaText: "View All Team Members",
    ctaLink: "/team"
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 border-4 border-black p-8 bg-yellow-300 shadow-[8px_8px_0px_#000000]">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-6 border-b-4 border-black pb-4">
            {data.title}
          </h2>
          <p className="text-xl text-black border-l-4 border-black pl-4">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {data.members.map((member, index) => (
            <div
              key={index}
              className="group border-4 border-black bg-white shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 p-6"
            >
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4 border-2 border-black bg-gray-50 shadow-[2px_2px_0px_#000000] rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-black text-lg border-b border-black pb-1 mb-2">
                  {member.name}
                </h3>
                <div className="inline-flex items-center space-x-1 border border-black bg-neon-green shadow-[1px_1px_0px_#000000] px-2 py-1 mb-3">
                  <span className="text-black text-xs font-medium">
                    {member.department}
                  </span>
                </div>
                <p className="font-bold text-black text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-black font-mono text-sm mb-4">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-1 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-block border border-black bg-electric-blue shadow-[1px_1px_0px_#000000] px-2 py-1 text-xs font-medium text-black"
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
          <Button 
            asChild
            className="border-4 border-black shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 bg-electric-blue text-black font-bold text-lg px-8 py-4"
          >
            <a href={data.ctaLink}>
              {data.ctaText}
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
