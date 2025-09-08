import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Award, Users, Zap } from "lucide-react"
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
    title: "Meet Our Exceptional Team",
    subtitle: "The brilliant minds and passionate professionals who drive innovation, excellence, and success across every aspect of our organization.",
    members: [
      {
        name: "Alex Thompson",
        role: "Senior Lead Developer",
        department: "Engineering",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        bio: "Full-stack architect with 8+ years of experience building scalable applications and leading engineering teams to deliver cutting-edge solutions.",
        skills: ["React", "Node.js", "TypeScript", "AWS", "Docker", "Kubernetes", "Microservices"]
      },
      {
        name: "Maria Garcia",
        role: "Senior Product Manager",
        department: "Product",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
        bio: "Strategic product leader with a proven track record of driving user-centric growth and delivering products that exceed market expectations.",
        skills: ["Product Strategy", "User Research", "Analytics", "Agile", "Data Science", "Growth Hacking", "Market Analysis"]
      },
      {
        name: "David Kim",
        role: "Principal UX Designer",
        department: "Design",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
        bio: "Award-winning designer passionate about creating intuitive, accessible, and beautiful user experiences that drive engagement and satisfaction.",
        skills: ["UI/UX", "Figma", "Prototyping", "User Testing", "Design Systems", "Accessibility", "Motion Design"]
      },
      {
        name: "Lisa Wang",
        role: "VP of Marketing",
        department: "Marketing",
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face",
        bio: "Growth-focused marketing executive with expertise in digital campaigns, brand strategy, and building high-performing marketing teams.",
        skills: ["Digital Marketing", "SEO", "Content Strategy", "Analytics", "Brand Management", "Campaign Optimization", "Team Leadership"]
      }
    ],
    ctaText: "Join Our Team",
    ctaLink: "/careers"
  }

  return (
    <section className="py-24 bg-gradient-to-br from-amber-900 via-orange-900 to-red-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.08%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {data.title}
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {data.members.map((member, index) => (
            <div key={index} className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-center mb-6">
                  <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white/30 group-hover:border-orange-400 transition-colors duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">
                    {member.name}
                  </h3>
                  
                  <p className="text-orange-300 font-semibold mb-2">
                    {member.role}
                  </p>
                  
                  <div className="flex items-center justify-center mb-4">
                    <Award className="h-4 w-4 text-yellow-400 mr-2" />
                    <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
                      {member.department}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">
                    {member.bio}
                  </p>
                  
                  <div className="mb-6">
                    <div className="flex items-center mb-3">
                      <Zap className="h-4 w-4 text-orange-400 mr-2" />
                      <span className="text-white text-sm font-semibold">Expertise</span>
                    </div>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {member.skills.slice(0, 3).map((skill, skillIndex) => (
                        <span
                          key={skillIndex}
                          className="bg-white/20 text-white text-xs px-2 py-1 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                      {member.skills.length > 3 && (
                        <span className="text-orange-300 text-xs">
                          +{member.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold px-8 py-4 text-lg">
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
