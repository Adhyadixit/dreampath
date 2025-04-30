import React, { useState, useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { projectsApi } from "@/lib/api";
import type { Project } from "@/lib/types";

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState<"all" | "web" | "mobile" | "desktop">("all");
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch all projects when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const data = await projectsApi.getAll();
        console.log("Fetched projects:", data);
        setProjects(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, []);

  // Filter projects based on active category
  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Render project card
  const renderProject = (project: Project) => (
    <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative overflow-hidden h-52">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <span className="text-white text-xs font-medium px-2 py-1 rounded-full bg-dreampath-primary/80">
            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 text-dreampath-primary">{project.title}</h3>
        <p className="text-gray-700 mb-4 line-clamp-3">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies && project.technologies.map((tech, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <div>
          <a 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center text-dreampath-secondary hover:text-dreampath-primary transition-colors font-medium"
          >
            View Project <ExternalLink className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );

  // Render content based on loading state
  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center p-12">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
          </div>
          <p className="mt-2 text-gray-600">Loading projects...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      );
    }
    
    if (filteredProjects.length === 0) {
      return (
        <div className="text-center p-12 border border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-4">No projects found in this category</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {filteredProjects.map(renderProject)}
      </div>
    );
  };

  return (
    <div className="min-h-screen">
      <PageHeader
        title="Our Portfolio"
        description="Explore our projects across web, mobile, and desktop platforms."
        bgImage="https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=1170&auto=format&fit=crop"
      />

      <section className="section-padding">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-dreampath-primary mb-4">Featured Projects</h2>
            <p className="text-lg text-gray-700">
              Browse through our portfolio of successful projects across different platforms.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setActiveCategory(value as any)}>
            <TabsList className="grid grid-cols-4 mb-8 max-w-md mx-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="web">Web</TabsTrigger>
              <TabsTrigger value="mobile">Mobile</TabsTrigger>
              <TabsTrigger value="desktop">Desktop</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              {renderContent()}
            </TabsContent>
            <TabsContent value="web">
              {renderContent()}
            </TabsContent>
            <TabsContent value="mobile">
              {renderContent()}
            </TabsContent>
            <TabsContent value="desktop">
              {renderContent()}
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
