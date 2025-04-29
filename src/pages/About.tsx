
import React from "react";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const team = [
    {
      name: "Alex Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      bio: "With over 15 years of experience in software development and business leadership, Alex founded DreamPath Solutions to create technology that transforms businesses."
    },
    {
      name: "Sarah Chen",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
      bio: "Sarah leads our technical strategy and oversees all development projects, bringing 12 years of experience in software architecture and engineering leadership."
    },
    {
      name: "Marcus Rivera",
      role: "Head of Design",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
      bio: "Marcus ensures all our products deliver exceptional user experiences, with a background in both digital product design and psychology."
    },
    {
      name: "Emily Patel",
      role: "Project Director",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop",
      bio: "Emily manages our client relationships and ensures projects are delivered on time and exceed expectations, with a focus on transparent communication."
    }
  ];

  return (
    <div>
      <PageHeader 
        title="About Us" 
        description="Learn more about DreamPath Solutions and our mission to transform businesses through innovative software."
      />

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-dreampath-primary">Our Story</h2>
              <p className="mb-4 text-lg">
                Founded in 2012, DreamPath Solutions began with a simple mission: to create software that makes a difference. Our founder, Alex Johnson, saw that many businesses were struggling with inefficient processes and outdated technology that couldn't keep up with their growth.
              </p>
              <p className="mb-4">
                What started as a small team of passionate developers has grown into a full-service software development company with over 60 team members across three continents. Despite our growth, we've maintained our core values and commitment to quality.
              </p>
              <p>
                Today, we're proud to partner with businesses ranging from innovative startups to Fortune 500 companies, helping them leverage technology to achieve their goals and stay ahead in an increasingly digital world.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931" 
                alt="DreamPath Solutions Office" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 text-dreampath-primary">Our Mission and Values</h2>
            <p className="text-lg">
              At DreamPath Solutions, our mission is to empower businesses through innovative and practical technology solutions that drive growth, efficiency, and competitive advantage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white border border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="font-bold text-xl mb-3 text-dreampath-primary">Innovation</h3>
                <p>
                  We constantly explore new technologies and approaches to solve complex problems in creative ways, always staying ahead of industry trends.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="font-bold text-xl mb-3 text-dreampath-primary">Quality</h3>
                <p>
                  We're committed to excellence in everything we do, from our code to our communication, ensuring reliable, high-performance solutions.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border border-gray-100 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <h3 className="font-bold text-xl mb-3 text-dreampath-primary">Partnership</h3>
                <p>
                  We build long-term relationships with our clients, taking the time to understand their business and working collaboratively toward shared goals.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-6 text-dreampath-primary">Our Leadership Team</h2>
            <p className="text-lg">
              Meet the experienced professionals who guide our company and ensure we deliver exceptional results for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                  <p className="text-dreampath-secondary mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-dreampath-primary text-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <p className="text-xl">Years of Experience</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">200+</div>
              <p className="text-xl">Projects Completed</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">60+</div>
              <p className="text-xl">Team Members</p>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <p className="text-xl">Countries Served</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
