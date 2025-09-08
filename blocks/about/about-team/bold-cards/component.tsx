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
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl font-black mb-8 text-gray-900 tracking-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {finalData.title}
            </span>
          </h2>
          <p className="text-2xl text-gray-700 font-semibold leading-relaxed max-w-4xl mx-auto">
            {finalData.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <Card key={member._id} className="text-center border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              
              <CardContent className="pt-8 pb-8">
                <div className="relative">
                  <div className="w-36 h-36 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full mx-auto mb-6 flex items-center justify-center border-4 border-white shadow-lg">
                    {member.image ? (
                      <img 
                        src={member.image.url} 
                        alt={member.image.alt}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="text-5xl font-black">👤</div>
                    )}
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full animate-pulse"></div>
                </div>
                <h3 className="text-2xl font-black mb-2 text-gray-900 tracking-tight">{member.name}</h3>
                <p className="text-lg font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{member.role}</p>
                {member.bio && (
                  <p className="text-gray-600 font-medium leading-relaxed">{member.bio}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
