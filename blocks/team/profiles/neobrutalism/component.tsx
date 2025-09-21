import { Button } from "@/components/ui/button"
import { ArrowRight, Linkedin, Twitter, Github, Dribbble } from "lucide-react"
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

export default function ProfilesNeobrutalism({ content }: ProfilesProps) {
  const data = content.data || {
    title: "Meet Our Team",
    subtitle: "The talented individuals behind our success.",
    profiles: [
      {
        name: "Sarah Johnson",
        role: "CEO & Founder",
        bio: "Visionary leader with 15+ years in tech innovation and business strategy.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
        social: {
          linkedin: "https://linkedin.com/in/sarahjohnson",
          twitter: "https://twitter.com/sarahjohnson"
        }
      },
      {
        name: "Michael Chen",
        role: "CTO",
        bio: "Technical architect passionate about scalable systems and cutting-edge technology.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        social: {
          linkedin: "https://linkedin.com/in/michaelchen",
          github: "https://github.com/michaelchen"
        }
      },
      {
        name: "Emily Rodriguez",
        role: "Head of Design",
        bio: "Creative director focused on user-centered design and brand excellence.",
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
        social: {
          linkedin: "https://linkedin.com/in/emilyrodriguez",
          dribbble: "https://dribbble.com/emilyrodriguez"
        }
      },
      {
        name: "James Wilson",
        role: "Lead Developer",
        bio: "Full-stack engineer with expertise in modern web technologies and DevOps.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
        social: {
          linkedin: "https://linkedin.com/in/jameswilson",
          github: "https://github.com/jameswilson",
          twitter: "https://twitter.com/jameswilson"
        }
      }
    ],
    ctaText: "Join Our Team",
    ctaLink: "/careers"
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
          {data.profiles.map((profile, index) => (
            <div
              key={index}
              className="group border-4 border-black bg-white shadow-[6px_6px_0px_#000000] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_#000000] transition-all duration-200 p-6"
            >
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4 border-2 border-black bg-gray-50 shadow-[2px_2px_0px_#000000] rounded-full overflow-hidden">
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-bold text-black text-lg border-b border-black pb-1 mb-2">
                  {profile.name}
                </h3>
                <p className="font-bold text-black text-sm mb-3">
                  {profile.role}
                </p>
                <p className="text-black font-mono text-sm mb-4">
                  {profile.bio}
                </p>
                <div className="flex justify-center space-x-2">
                  {Object.entries(profile.social).map(([platform, url]) => {
                    const IconComponent = socialIcons[platform as keyof typeof socialIcons]
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center w-8 h-8 border border-black bg-neon-green shadow-[1px_1px_0px_#000000] hover:bg-electric-blue transition-colors"
                      >
                        <IconComponent className="w-4 h-4 text-black" />
                      </a>
                    )
                  })}
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
