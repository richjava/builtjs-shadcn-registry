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
    <section className="py-24 bg-white">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-6xl font-black mb-8 text-black border-4 border-black bg-green-500 text-black px-8 py-6 shadow-[4px_4px_0px_#000000]">
            {finalData.title}
          </h2>
          <p className="text-2xl text-black font-bold max-w-4xl mx-auto leading-relaxed">
            {finalData.subtitle}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member) => (
            <Card key={member._id} className="text-center bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_#000000] hover:shadow-[6px_6px_0px_#000000] hover:-translate-x-1 hover:-translate-y-1 transition-all duration-200">
              <CardContent className="pt-8 pb-8 px-6">
                <div className="w-40 h-40 bg-red-500 border-4 border-black rounded-none mx-auto mb-6 flex items-center justify-center shadow-[2px_2px_0px_#000000]">
                  {member.image ? (
                    <img 
                      src={member.image.url} 
                      alt={member.image.alt}
                      className="w-full h-full object-cover border-2 border-black"
                    />
                  ) : (
                    <div className="text-6xl font-black">👤</div>
                  )}
                </div>
                <h3 className="text-2xl font-black mb-2 text-black">{member.name}</h3>
                <p className="text-blue-500 font-black mb-4 text-lg border-2 border-black bg-white px-4 py-2 shadow-[2px_2px_0px_#000000]">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="text-sm text-black font-bold leading-relaxed">{member.bio}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
