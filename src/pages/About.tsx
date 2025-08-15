
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
        description="Learn more about DreamPath Solutions and our journey in creating impactful digital experiences."
      />

      {/* Company Story */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-dreampath-primary">Our Story</h2>
              <p className="mb-4 text-lg">
                Founded in 2021, Dreampath Solutions is a forward-thinking digital agency dedicated to building impactful, user-centric web and mobile experiences. What began as a small team of passionate developers and designers has grown into a trusted tech partner for startups, SMEs, and global brands alike.
              </p>
              <p className="mb-4">
                We specialize in delivering end-to-end digital solutions, including custom websites, web applications, mobile apps, UI/UX design, and performance-driven marketing assets. With over 20+ completed projects across various industries, we take pride in blending creativity with technical excellence to turn bold ideas into scalable digital products.
              </p>
              <p>
                At Dreampath Solutions, we don't just build websites—we craft digital pathways for businesses to grow, engage, and succeed.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1496171367470-9ed9a91ea931" 
                alt="Dreampath Solutions Office" 
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
            <h2 className="text-3xl font-bold mb-6 text-dreampath-primary">Our Mission</h2>
            <p className="text-lg">
              Our mission is to simplify technology and make great design accessible to every visionary.
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

      <section className="py-16 bg-gray-50">
        <div className="container-wide">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="text-2xl font-semibold text-dreampath-primary mb-4">Our Parent Company</h3>
            <p className="text-xl font-medium text-gray-800">
              DreamPath Solutions is a proud subsidiary of
            </p>
            <div className="mt-3">
              <span className="text-2xl font-bold text-dreampath-secondary">Shipio Logistics Private Limited</span>
            </div>
            <p className="mt-4 text-gray-600">
              A trusted name in logistics and business solutions since 2021
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
