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
    <section className="py-20">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">{finalData.title}</h2>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground">
            {finalData.subtitle}
          </p>
        </div>
        <div className="grid max-w-4xl gap-8 mx-auto md:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member._id} className="text-center">
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-32 h-32 mx-auto mb-4 rounded-full bg-muted">
                  {member.image ? (
                    <img 
                      src={member.image.url} 
                      alt={member.image.alt}
                      className="object-cover w-full h-full rounded-full"
                    />
                  ) : (
                    <div className="text-4xl">👤</div>
                  )}
                </div>
                <h3 className="mb-1 text-xl font-semibold">{member.name}</h3>
                <p className="mb-3 font-medium text-primary">{member.role}</p>
                {member.bio && (
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
