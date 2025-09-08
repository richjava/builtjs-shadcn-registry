import { Button } from "@/components/ui/button"
import { ArrowRight, Linkedin, Twitter, Github, Dribbble, Star, Award, Crown } from "lucide-react"
import Image from "next/image"

interface ProfilesProps {
  content: {
    data?: {
      title: string
      subtitle: string
      profiles: Array<{
        name: string
        role: string
        bio: string
        image: string
        social: {
          linkedin?: string
          twitter?: string
          github?: string
          dribbble?: string
        }
      }>
      ctaText: string
      ctaLink: string
    }
  }
}

const socialIcons = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  dribbble: Dribbble
}

export default function Profiles({ content }: ProfilesProps) {
  const data = content.data || {
    title: "Meet Our Leadership Team",
    subtitle: "The visionary leaders and industry experts who drive innovation, shape our culture, and guide our organization toward unprecedented success and growth.",
    profiles: [
      {
        name: "Sarah Johnson",
        role: "CEO & Founder",
        bio: "Visionary leader with 15+ years in tech innovation and business strategy. Sarah has built three successful startups and led teams of 200+ across multiple continents.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        social: {
          linkedin: "https://linkedin.com/in/sarahjohnson",
          twitter: "https://twitter.com/sarahjohnson"
        }
      },
      {
        name: "Michael Chen",
        role: "Chief Technology Officer",
        bio: "Technical architect and engineering leader with expertise in scalable systems, cloud infrastructure, and AI/ML technologies. Michael has architected solutions serving millions of users.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        social: {
          linkedin: "https://linkedin.com/in/michaelchen",
          github: "https://github.com/michaelchen"
        }
      },
      {
        name: "Emily Rodriguez",
        role: "Chief Design Officer",
        bio: "Award-winning creative director with a passion for user-centered design and brand experiences. Emily's work has been featured in top design publications and won multiple industry awards.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face",
        social: {
          linkedin: "https://linkedin.com/in/emilyrodriguez",
          dribbble: "https://dribbble.com/emilyrodriguez"
        }
      }
    ],
    ctaText: "Join Our Leadership",
    ctaLink: "/careers"
  }

  return (
    <section className="py-24 bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 relative overflow-hidden">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {data.profiles.map((profile, index) => (
            <div key={index} className="group">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105">
                <div className="text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/30 group-hover:border-cyan-400 transition-colors duration-300">
                      <Image
                        src={profile.image}
                        alt={profile.name}
                        width={128}
                        height={128}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center">
                      <Crown className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {profile.name}
                  </h3>
                  
                  <div className="flex items-center justify-center mb-4">
                    <Award className="h-4 w-4 text-yellow-400 mr-2" />
                    <p className="text-cyan-300 font-semibold text-lg">
                      {profile.role}
                    </p>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                    {profile.bio}
                  </p>
                  
                  <div className="flex justify-center space-x-3 mb-6">
                    {Object.entries(profile.social).map(([platform, url]) => {
                      const IconComponent = socialIcons[platform as keyof typeof socialIcons]
                      return (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors duration-300"
                        >
                          <IconComponent className="h-5 w-5" />
                        </a>
                      )
                    })}
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-2" />
                    <span className="text-cyan-300 text-sm font-medium">Leadership Team</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-8 py-4 text-lg">
            {data.ctaText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
