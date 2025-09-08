import { Card, CardContent } from "@/components/ui/card"

interface AboutTeamProps {
  content: {
    data?: {
      title: string;
      subtitle: string;
    };
    collections?: {
      teamMemberItem?: {
        _id: string;
        _type: string;
        slug: string;
        name: string;
        role: string;
        image?: {
          url: string;
          alt: string;
        };
        bio?: string;
      }[];
    };
  };
}

export default function AboutTeam({ content }: AboutTeamProps) {
  const { data, collections } = content;
  
  // Fallback data
  const fallbackData = {
    title: "Meet Our Team",
    subtitle: "The passionate individuals behind our mission to transform web development."
  };

  const fallbackTeamMembers = [
    {
      _id: "teamMemberItem-1",
      _type: "teamMemberItem",
      slug: "sarah-chen",
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image: {
        url: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face",
        alt: "Professional woman in business attire"
      },
      bio: "Former tech lead at major SaaS companies with 10+ years building scalable products."
    },
    {
      _id: "teamMemberItem-2",
      _type: "teamMemberItem",
      slug: "marcus-johnson",
      name: "Marcus Johnson",
      role: "CTO & Co-Founder",
      image: {
        url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
        alt: "Professional man in business attire"
      },
      bio: "Full-stack engineer passionate about developer tools and open-source technologies."
    },
    {
      _id: "teamMemberItem-3",
      _type: "teamMemberItem",
      slug: "emily-rodriguez",
      name: "Emily Rodriguez",
      role: "Head of Design",
      image: {
        url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
        alt: "Creative designer woman"
      },
      bio: "Design systems expert focused on creating intuitive and accessible user experiences."
    }
  ];

  const finalData = data || fallbackData;
  const teamMembers = collections?.teamMemberItem || fallbackTeamMembers;

  return (
    <section className="py-40 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-24">
          <h2 className="text-5xl font-thin mb-8 text-gray-900 tracking-tight">{finalData.title}</h2>
          <p className="text-xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto">
            {finalData.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-16 max-w-5xl mx-auto">
          {teamMembers.map((member) => (
            <Card key={member._id} className="text-center border-0 shadow-none bg-transparent">
              <CardContent className="pt-0">
                <div className="w-40 h-40 bg-gray-100 rounded-full mx-auto mb-8 flex items-center justify-center">
                  {member.image ? (
                    <img 
                      src={member.image.url} 
                      alt={member.image.alt}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="text-6xl font-thin text-gray-400">👤</div>
                  )}
                </div>
                <h3 className="text-2xl font-light mb-2 text-gray-900 tracking-tight">{member.name}</h3>
                <p className="text-gray-600 font-light mb-6 text-lg">{member.role}</p>
                {member.bio && (
                  <p className="text-gray-500 font-light leading-relaxed text-base">{member.bio}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
