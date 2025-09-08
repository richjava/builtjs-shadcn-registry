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

export default function Profiles({ content }: ProfilesProps) {
  const data = content.data || {
    title: "Our Team",
    subtitle: "The talented individuals behind our success.",
    profiles: [
      {
        name: "Sarah Johnson",
        role: "CEO & Founder",
        bio: "Visionary leader with 15+ years in tech innovation and business strategy.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        social: {
          linkedin: "https://linkedin.com/in/sarahjohnson",
          twitter: "https://twitter.com/sarahjohnson"
        }
      },
      {
        name: "Michael Chen",
        role: "CTO",
        bio: "Technical architect passionate about building scalable solutions and leading engineering teams.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        social: {
          linkedin: "https://linkedin.com/in/michaelchen",
          github: "https://github.com/michaelchen"
        }
      },
      {
        name: "Emily Rodriguez",
        role: "Head of Design",
        bio: "Creative director focused on user-centered design and brand experiences.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
        social: {
          linkedin: "https://linkedin.com/in/emilyrodriguez",
          dribbble: "https://dribbble.com/emilyrodriguez"
        }
      }
    ],
    ctaText: "Join Our Team",
    ctaLink: "/careers"
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            {data.title}
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto text-sm">
            {data.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {data.profiles.map((profile, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-4">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-2 border-gray-200 group-hover:border-gray-300 transition-colors duration-200">
                  <Image
                    src={profile.image}
                    alt={profile.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                {profile.name}
              </h3>
              
              <p className="text-blue-600 font-medium mb-3 text-sm">
                {profile.role}
              </p>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
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
                      className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
                    >
                      <IconComponent className="h-3 w-3" />
                    </a>
                  )
                })}
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
