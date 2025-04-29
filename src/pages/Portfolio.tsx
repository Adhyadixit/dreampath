
import React, { useState } from "react";
import PageHeader from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: "web" | "mobile" | "desktop";
  image: string;
  link: string;
  description: string;
  technologies: string[];
}

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "web" | "mobile" | "desktop">("all");

  const projects: Project[] = [
    {
      id: "petrosia",
      title: "Petrosia - Oil & Gas Solutions",
      category: "web",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=870&auto=format&fit=crop",
      link: "https://petrosia.in",
      description: "A comprehensive digital platform for an oil and gas company, featuring interactive dashboards and real-time data visualization tools for monitoring operations.",
      technologies: ["React", "Node.js", "D3.js", "MongoDB"]
    },
    {
      id: "nerdynuts",
      title: "NerdyNuts - Tech Blog",
      category: "web",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=872&auto=format&fit=crop",
      link: "https://nerdynuts.com",
      description: "A modern tech blog with a custom CMS, advanced search functionality, and optimized reading experience for tech enthusiasts and professionals.",
      technologies: ["WordPress", "PHP", "MySQL", "ElasticSearch"]
    },
    {
      id: "americanforces",
      title: "American Forces Travel",
      category: "web",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=874&auto=format&fit=crop",
      link: "https://www.americanforcestravel.com/",
      description: "A travel booking platform exclusively for military personnel, featuring discounted rates, secure authentication, and specialized travel options.",
      technologies: ["Angular", "Java Spring Boot", "PostgreSQL", "AWS"]
    },
    {
      id: "rivafincorp",
      title: "Riva Fin Corp - Financial Services",
      category: "web",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop",
      link: "https://rivafincorp.online",
      description: "A secure financial services platform with client portals, document management, and integrated payment processing for a growing fintech company.",
      technologies: ["React", "Next.js", "TypeScript", "Stripe API"]
    },
    {
      id: "wanderlust",
      title: "Wanderlust - Travel Planning App",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=870&auto=format&fit=crop",
      link: "https://play.google.com/store",
      description: "An all-in-one travel planning app with itinerary management, offline maps, budget tracking, and social sharing features for travelers.",
      technologies: ["React Native", "Firebase", "Google Maps API", "Redux"]
    },
    {
      id: "connectme",
      title: "ConnectMe - Dating Application",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1516500896641-5949695ecb2e?q=80&w=772&auto=format&fit=crop",
      link: "https://apps.apple.com/",
      description: "A modern dating app with advanced matching algorithms, video chat features, and robust security measures to ensure authentic connections.",
      technologies: ["Swift", "Kotlin", "WebRTC", "MongoDB"]
    },
    {
      id: "healthtrack",
      title: "HealthTrack - Wellness Platform",
      category: "mobile",
      image: "https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=885&auto=format&fit=crop",
      link: "https://apps.apple.com/",
      description: "A comprehensive health tracking application that integrates with wearable devices, offering personalized insights and coaching for users' wellness journeys.",
      technologies: ["Flutter", "Firebase", "HealthKit", "Machine Learning"]
    },
    {
      id: "dataflow",
      title: "DataFlow - Analytics Suite",
      category: "desktop",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=870&auto=format&fit=crop",
      link: "https://www.dataflowapp.com",
      description: "A powerful desktop analytics suite for businesses, with data visualization, reporting tools, and integration capabilities with various data sources.",
      technologies: ["Electron", "Python", "Tableau", "SQL"]
    }
  ];

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(project => project.category === activeCategory);

  return (
    <div>
      <PageHeader 
        title="Our Portfolio" 
        description="Explore our diverse range of successful projects across web, mobile, and desktop platforms"
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-dreampath-primary mb-4">Showcasing Our Work</h2>
            <p className="text-lg text-gray-700">
              Browse through our collection of successful projects that demonstrate our expertise in creating innovative and effective digital solutions.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setActiveCategory("all")}>All Projects</TabsTrigger>
                <TabsTrigger value="web" onClick={() => setActiveCategory("web")}>Web</TabsTrigger>
                <TabsTrigger value="mobile" onClick={() => setActiveCategory("mobile")}>Mobile</TabsTrigger>
                <TabsTrigger value="desktop" onClick={() => setActiveCategory("desktop")}>Desktop</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="font-bold text-xl">{project.title}</h3>
                          <p className="text-sm text-gray-200 capitalize">{project.category}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-dreampath-secondary hover:text-dreampath-primary">
                        Visit Website <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="web" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="font-bold text-xl">{project.title}</h3>
                          <p className="text-sm text-gray-200 capitalize">{project.category}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-dreampath-secondary hover:text-dreampath-primary">
                        Visit Website <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="mobile" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="font-bold text-xl">{project.title}</h3>
                          <p className="text-sm text-gray-200 capitalize">{project.category}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-dreampath-secondary hover:text-dreampath-primary">
                        View App <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="desktop" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-4 text-white">
                          <h3 className="font-bold text-xl">{project.title}</h3>
                          <p className="text-sm text-gray-200 capitalize">{project.category}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{project.description}</p>
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-dreampath-secondary hover:text-dreampath-primary">
                        Learn More <ExternalLink className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Client testimonial section */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-dreampath-primary mb-4">Client Testimonials</h2>
            <p className="text-lg text-gray-700">
              Don't just take our word for it. Here's what our clients have to say about working with us.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-dreampath-secondary text-4xl mr-2">❝</div>
              </div>
              <p className="italic mb-6">
                "DreamPath Solutions transformed our outdated systems into a modern, efficient platform that has significantly improved our operations. Their team was responsive, knowledgeable, and delivered beyond our expectations."
              </p>
              <div className="mt-auto">
                <p className="font-bold">Sarah Johnson</p>
                <p className="text-sm text-gray-600">CTO, Petrosia</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-dreampath-secondary text-4xl mr-2">❝</div>
              </div>
              <p className="italic mb-6">
                "Working with DreamPath was a game-changer for our startup. They not only built our mobile app on time and within budget, but also provided valuable insights that helped us refine our product strategy."
              </p>
              <div className="mt-auto">
                <p className="font-bold">Michael Chen</p>
                <p className="text-sm text-gray-600">Founder, ConnectMe</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="text-dreampath-secondary text-4xl mr-2">❝</div>
              </div>
              <p className="italic mb-6">
                "The team at DreamPath Solutions demonstrated exceptional technical expertise and commitment to quality. They were true partners in our digital transformation journey and continue to support our growing needs."
              </p>
              <div className="mt-auto">
                <p className="font-bold">Rachel Torres</p>
                <p className="text-sm text-gray-600">Digital Director, Riva Fin Corp</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-dreampath-primary text-white text-center">
        <div className="container-wide max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Build Something Amazing?</h2>
          <p className="text-xl mb-8">
            Let's discuss how we can help bring your vision to life with our expert development team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-white text-dreampath-primary hover:bg-gray-100 w-full sm:w-auto">
                Start a Project
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="border-white text-white hover:bg-white/10 w-full sm:w-auto">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
