import React, { Suspense } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Check, ArrowRight, Code, Layout, Globe, Smartphone, Shield, Settings, Users, Award, Zap } from "lucide-react";
import { motion } from "framer-motion";
import LazySection from "@/components/common/LazySection";

// Lazy load heavy components
const ReviewsMarqueeLazy = React.lazy(() => import("@/components/home/ReviewsMarquee"));
const ServiceKeywordsLazy = React.lazy(() => import("@/components/services/ServiceKeywords"));
const ServicesSectionLazy = React.lazy(() => import("@/components/home/ServicesSection"));

// Simple animation variants for better performance
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

// Optimized hero image - Using WebP format for better performance
const heroImageUrl = "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1920&auto=format&fit=crop&fm=webp";

// Tech stack logos - Using a simple object for better performance
const techLogos: Record<string, string> = {
  'React': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
  'Node.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  'Python': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  'AWS': 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/aws-icon.png',
  'Flutter': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
  'MongoDB': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
  'Angular': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg',
  'Vue.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  'TypeScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
  'Go': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg',
  'Docker': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
  'Kubernetes': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg'
};

// Simple function to get tech logo URL
const getTechLogoUrl = (tech: string): string => {
  return techLogos[tech] || `https://ui-avatars.com/api/?name=${tech}&background=0D8ABC&color=fff`;
};

const Home = () => {
  // Remove unnecessary state and effects for scroll animations
  // Let CSS handle the animations for better performance

  const services = [
    {
      icon: <Code className="h-10 w-10 text-dreampath-secondary" />,
      title: "Custom Software Development",
      description: "Tailored solutions designed to address your unique business challenges and goals."
    },
    {
      icon: <Globe className="h-10 w-10 text-dreampath-secondary" />,
      title: "Web Development",
      description: "Responsive, fast and user-friendly websites optimized for performance and conversions."
    },
    {
      icon: <Smartphone className="h-10 w-10 text-dreampath-secondary" />,
      title: "Mobile App Development",
      description: "Native and cross-platform apps that deliver exceptional user experiences."
    },
    {
      icon: <Layout className="h-10 w-10 text-dreampath-secondary" />,
      title: "UI/UX Design",
      description: "User-centered design that creates intuitive, engaging and brand-aligned interfaces."
    },
    {
      icon: <Shield className="h-10 w-10 text-dreampath-secondary" />,
      title: "Cybersecurity",
      description: "Protect your digital assets with our comprehensive security solutions and services."
    },
    {
      icon: <Settings className="h-10 w-10 text-dreampath-secondary" />,
      title: "DevOps Solutions",
      description: "Streamline your development lifecycle with automation, CI/CD, and cloud infrastructure."
    }
  ];

  const Counter = ({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
      >
        <div className="flex justify-center mb-4">
          {icon}
        </div>
        <div className="text-3xl md:text-4xl font-bold text-dreampath-primary">
          {value.toLocaleString()}+
        </div>
        <p className="text-sm text-white/80">{label}</p>
      </motion.div>
    );
  };

  const stats = [
    { value: 120, label: "Clients Worldwide", icon: <Globe className="h-6 w-6" /> },
    { value: 350, label: "Projects Completed", icon: <Code className="h-6 w-6" /> },
    { value: 15, label: "Years Experience", icon: <Award className="h-6 w-6" /> },
    { value: 24, label: "Team Members", icon: <Users className="h-6 w-6" /> }
  ] as const;

  const cardVariants: Record<string, any> = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Reviews marquee moved to a lazy component so it loads and runs only when visible

  return (
    <div>
      {/* Parallax Hero Section */}
      <section
        id="hero"
        className="relative min-h-[90vh] md:min-h-screen overflow-hidden flex items-start pt-32 md:pt-40 pb-16"
      >
        {/* Optimized LCP image with fetchpriority="high" */}
        <div className="absolute inset-0">
          <img
            src={heroImageUrl}
            alt="AI and technology solutions"
            className="w-full h-full object-cover object-center"
            fetchPriority="high"
            width="1920"
            height="1080"
            decoding="async"
            loading="eager"
          />
        </div>
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/95 via-purple-900/85 to-violet-800/90" />
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        
        <div className="container-wide relative z-10 text-white h-full flex items-center">
          <div className="max-w-4xl text-left px-4 sm:px-6 md:px-8 w-full">
            <div
              className="inline-block px-4 py-2 mb-5 md:mb-6 text-base md:text-base font-medium text-brand-100 bg-brand-500/20 backdrop-blur-sm rounded-full border border-brand-400/20"
            >
              Welcome to the Future of Technology
            </div>

            <h1 
              className="text-6xl sm:text-7xl md:text-8xl font-bold leading-tight text-white pb-4 md:pb-6"
            >
              AI Powered Digital Solutions
            </h1>

            <p 
              className="mt-4 md:mt-6 text-xl md:text-2xl text-brand-100 max-w-3xl mx-auto leading-relaxed"
            >
              We build intelligent, scalable solutions that drive business growth through cutting-edge AI, cloud, and web3 technologies.
            </p>

            <div 
              className="mt-4 md:mt-10 flex flex-wrap justify-center gap-2 md:gap-4 animate-fade-up animate-delay-600"
            >
              <Button 
                asChild
                size="lg"
                className="bg-gradient-to-r from-violet-600 to-indigo-700 hover:from-violet-700 hover:to-indigo-800 text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <Link to="/services">
                  Discover Our Solutions
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105">
                <a href="#reviews">See Client Success</a>
              </Button>
            </div>
            
            {/* Tech stack pills */}
            <motion.div 
              className="mt-6 md:mt-8 w-full overflow-x-auto px-4 pb-6 md:pb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex flex-nowrap gap-2.5 md:gap-3 w-max max-w-full mx-auto">
                {['AI/ML', 'Blockchain', 'Cloud Native', 'IoT', 'AR/VR', 'Web3'].map((tech) => (
                  <span 
                    key={tech} 
                    className="flex-shrink-0 px-3 md:px-4 py-1.5 md:py-2 bg-white/5 backdrop-blur-sm rounded-full text-xs md:text-sm font-medium text-brand-100 border border-white/10 whitespace-nowrap"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        {/* floating accents */}
        <div className="pointer-events-none absolute -right-24 -top-24 w-96 h-96 bg-dreampath-secondary/30 rounded-full blur-3xl animate-float" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 w-96 h-96 bg-dreampath-primary/30 rounded-full blur-3xl animate-float-delayed" />
      </section>


      {/* Why Choose Us Section */}
      <LazySection minHeightClassName="min-h-[700px]" className="w-full [content-visibility:auto] [contain-intrinsic-size:800px]" threshold={0.35} rootMargin="0px 0px -2% 0px">
      <section id="why-choose-us" className="py-16 bg-gray-50">
        <motion.div className="container-wide" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dreampath-primary mb-4">Why Choose DreamPath Solutions</h2>
            <p className="text-lg text-gray-600">We combine technical expertise with a passion for delivering exceptional results</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {/* Work Ethics */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-dreampath-primary/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-dreampath-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Work Ethics</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>100% Transparency in Communication</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Strict Deadlines Adherence</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Code Quality & Best Practices</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                  <span>Data Security & Confidentiality</span>
                </li>
              </ul>
            </div>

            {/* Customer Stories */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-dreampath-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-dreampath-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Customer Success Stories</h3>
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm italic">"DreamPath transformed our e-commerce platform, resulting in a 120% increase in sales."</p>
                  <p className="text-sm font-medium mt-2">- Priya M., E-commerce Director</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm italic">"Their mobile app development expertise helped us reach 50K+ downloads in 3 months."</p>
                  <p className="text-sm font-medium mt-2">- Rohan K., Startup Founder</p>
                </div>
              </div>
            </div>

            {/* Development Process */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-dreampath-accent/10 rounded-full flex items-center justify-center mb-4">
                <Settings className="h-6 w-6 text-dreampath-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Our Process</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-dreampath-accent/10 text-dreampath-accent rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">1</div>
                  <div>
                    <h4 className="font-medium">Discovery</h4>
                    <p className="text-sm text-gray-600">Understanding your vision and requirements</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-dreampath-accent/10 text-dreampath-accent rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">2</div>
                  <div>
                    <h4 className="font-medium">Design</h4>
                    <p className="text-sm text-gray-600">Creating intuitive and beautiful interfaces</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-dreampath-accent/10 text-dreampath-accent rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">3</div>
                  <div>
                    <h4 className="font-medium">Development</h4>
                    <p className="text-sm text-gray-600">Building robust and scalable solutions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-dreampath-accent/10 text-dreampath-accent rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5 flex-shrink-0">4</div>
                  <div>
                    <h4 className="font-medium">Deployment</h4>
                    <p className="text-sm text-gray-600">Seamless launch and support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '98%', label: 'Client Satisfaction' },
              { number: '200+', label: 'Projects Completed' },
              { number: '15+', label: 'Years Experience' },
              { number: '24/7', label: 'Support' }
            ].map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-dreampath-primary mb-2">{stat.number}</div>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      </LazySection>

      {/* Trust badges / social proof */}
      <LazySection minHeightClassName="min-h-[280px]" className="w-full [content-visibility:auto] [contain-intrinsic-size:400px]" threshold={0.35} rootMargin="0px 0px -2% 0px">
      <section id="trust" className="bg-white py-12 border-b">
        <motion.div className="container-wide" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="text-center mb-8">
            <p className="uppercase tracking-widest text-xs text-gray-500">Trusted by builders and marketers</p>
            <h2 className="text-2xl md:text-3xl font-semibold mt-2">Trusted by creators of the modern web</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm text-gray-700">
            {[
              "Liked by Three.js community",
              "Loved by Framer designers",
              "Google SEO Partners",
              "Meta Ads Experts",
              "Cloud & DevOps Ready",
              "Secure by Design",
            ].map((label, i) => (
              <div key={i} className="glassmorphism rounded-lg py-3 px-4 text-center">
                {label}
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      </LazySection>

      {/* Reviews / Testimonials */}
      {/* Persistent anchor for hash navigation, even before lazy content mounts */}
      <div id="reviews" className="h-0 scroll-mt-24 md:scroll-mt-28" aria-hidden="true" />
      <LazySection minHeightClassName="min-h-[520px]" className="w-full [content-visibility:auto] [contain-intrinsic-size:560px]" threshold={0.4} rootMargin="0px 0px -1% 0px">
        <section className="py-16 bg-white overflow-hidden">
          <Suspense fallback={<div className="container-wide"><div className="h-64 rounded-lg bg-gray-50" /></div>}>
            <ReviewsMarqueeLazy />
          </Suspense>
        </section>
      </LazySection>

      {/* Available On (five) */}
      <LazySection minHeightClassName="min-h-[320px]" className="w-full [content-visibility:auto] [contain-intrinsic-size:360px]" threshold={0.35} rootMargin="0px 0px -2% 0px">
      <section id="available" className="section-padding bg-gray-50">
        <motion.div className="container-wide" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-bold text-dreampath-primary">Available On</h2>
            <p className="text-gray-600 mt-2">We work across your preferred platforms and ecosystems.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              "AWS Marketplace",
              "Vercel",
              "Netlify",
              "Google Cloud",
              "GitHub",
            ].map((p, i) => (
              <div key={i} className="glassmorphism rounded-lg py-6 text-center font-medium text-gray-800">
                {p}
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      </LazySection>

      {/* Our Team (no images) */}
      <LazySection minHeightClassName="min-h-[900px]" className="w-full [content-visibility:auto] [contain-intrinsic-size:960px]" threshold={0.35} rootMargin="0px 0px -2% 0px">
      <section id="team" className="section-padding bg-white">
        <motion.div className="container-wide" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-4 text-dreampath-primary">Our Team</h2>
            <p className="text-lg text-gray-600">Experienced specialists building products end‑to‑end.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Rohan Mehta", role: "Full‑Stack Engineer", exp: "7+ yrs" },
              { name: "Neha Iyer", role: "UI/UX Designer", exp: "6+ yrs" },
              { name: "Vikram Singh", role: "DevOps Engineer", exp: "8+ yrs" },
              { name: "Priya Nair", role: "Product Manager", exp: "9+ yrs" },
              { name: "Ankit Jain", role: "Mobile Engineer", exp: "6+ yrs" },
              { name: "Suhani Desai", role: "SEO Specialist", exp: "5+ yrs" },
              { name: "Aditya Kulkarni", role: "Backend Engineer", exp: "7+ yrs" },
              { name: "Ishita Bose", role: "Frontend Engineer", exp: "6+ yrs" },
              { name: "Karan Malhotra", role: "Data Engineer", exp: "7+ yrs" },
              { name: "Meera Krishnan", role: "QA Lead", exp: "8+ yrs" },
              { name: "Harsh Patel", role: "SRE", exp: "6+ yrs" },
              { name: "Ananya Rao", role: "Content Strategist", exp: "5+ yrs" },
              { name: "Arjun Kapoor", role: "Cloud Architect", exp: "10+ yrs" },
              { name: "Tanvi Shah", role: "Growth Marketer", exp: "6+ yrs" },
              { name: "Rahul Verma", role: "Solution Architect", exp: "11+ yrs" },
              { name: "Kriti Agarwal", role: "Business Analyst", exp: "7+ yrs" },
              { name: "Siddharth Menon", role: "Data Scientist", exp: "6+ yrs" },
              { name: "Pooja Chawla", role: "ML Engineer", exp: "5+ yrs" },
              { name: "Nikhil Sinha", role: "Performance Engineer", exp: "7+ yrs" },
              { name: "Shreya Pillai", role: "Security Engineer", exp: "6+ yrs" },
              { name: "Devika Reddy", role: "Project Manager", exp: "9+ yrs" },
              { name: "Aman Gupta", role: "Customer Success Lead", exp: "6+ yrs" },
              { name: "Ritika Bansal", role: "Copywriter", exp: "5+ yrs" },
            ].map((m, i) => (
              <Card key={i} className="h-full">
                <CardHeader>
                  <CardTitle className="text-xl">{m.name}</CardTitle>
                  <CardDescription>{m.role} • {m.exp} experience</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                    <li>Shipped production apps at scale</li>
                    <li>Strong ownership and communication</li>
                    <li>Focus on performance and DX</li>
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>
      </LazySection>

      {/* Roadmap / Process */}
      <LazySection minHeightClassName="min-h-[520px]" className="w-full [content-visibility:auto] [contain-intrinsic-size:560px]" threshold={0.4} rootMargin="0px 0px -1% 0px">
      <section id="roadmap" className="section-padding bg-gray-50">
        <motion.div className="container-wide" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-4 text-dreampath-primary">Business Development Roadmap</h2>
            <p className="text-lg text-gray-600">A clear, outcome‑driven path from idea to growth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { title: "Discovery", desc: "Workshops, goals, and success metrics" },
              { title: "MVP", desc: "Rapid iterations with user feedback" },
              { title: "Scale", desc: "Architecture, observability, automation" },
              { title: "Growth", desc: "SEO, ads, CRO, and product analytics" },
            ].map((s, i) => (
              <div key={i} className="relative">
                <div className="glassmorphism rounded-lg p-5 h-full">
                  <div className="text-sm text-gray-500 mb-1">Step {i + 1}</div>
                  <h3 className="text-xl font-semibold text-dreampath-primary">{s.title}</h3>
                  <p className="text-gray-700 mt-2">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
      </LazySection>

      {/* 3D Feature Section */}
      <LazySection minHeightClassName="min-h-[720px]" className="w-full [content-visibility:auto] [contain-intrinsic-size:760px]" threshold={0.4} rootMargin="0px 0px -1% 0px">
      <section className="relative bg-gradient-to-b from-white to-brand-50 py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-dreampath-secondary opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-dreampath-primary opacity-10 rounded-full blur-3xl"></div>
        
        <motion.div className="container-wide relative z-10" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-dreampath-primary to-dreampath-secondary">
              Innovative Solutions for Modern Businesses
            </h2>
            <p className="text-xl text-gray-700">
              Leverage our expertise to transform your ideas into powerful digital solutions
              that drive growth and efficiency.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-3xl font-bold mb-6 text-dreampath-primary">
                  Your Vision, Our Expertise
                </h3>
                <p className="text-lg mb-6">
                  DreamPath Solutions is a leading software development company 
                  that specializes in creating custom solutions for businesses of all sizes. 
                  With over a decade of experience, our team of expert developers, designers, 
                  and strategists work together to deliver innovative and reliable software.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mt-1 p-1 bg-dreampath-secondary/20 rounded-full">
                      <Check className="h-6 w-6 text-dreampath-secondary flex-shrink-0" />
                    </div>
                    <p className="ml-3">Industry-leading development practices and quality assurance</p>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 p-1 bg-dreampath-secondary/20 rounded-full">
                      <Check className="h-6 w-6 text-dreampath-secondary flex-shrink-0" />
                    </div>
                    <p className="ml-3">Dedicated project managers and transparent communication</p>
                  </div>
                  <div className="flex items-start">
                    <div className="mt-1 p-1 bg-dreampath-secondary/20 rounded-full">
                      <Check className="h-6 w-6 text-dreampath-secondary flex-shrink-0" />
                    </div>
                    <p className="ml-3">Ongoing support and maintenance to ensure long-term success</p>
                  </div>
                </div>
                <div className="mt-8">
                  <Link to="/about">
                    <Button className="bg-dreampath-primary hover:bg-dreampath-dark relative overflow-hidden group">
                      <span className="relative z-10">Learn More About Us</span>
                      <div className="absolute inset-0 bg-dreampath-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <div className="order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="relative"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-dreampath-secondary/30 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-dreampath-primary/30 rounded-full blur-xl"></div>
                <div className="rounded-2xl overflow-hidden shadow-2xl relative z-10 transform rotate-2 hover:rotate-0 transition-transform duration-500 cursor-pointer">
                  <img 
                    src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" 
                    alt="Team working on software development" 
                    className="w-full h-auto"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dreampath-primary/90 to-transparent p-6 text-white">
                    <h4 className="text-xl font-bold">Expert Team</h4>
                    <p>Our developers create custom solutions tailored to your needs</p>
                  </div>
                </div>
                
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white rounded-lg shadow-xl p-4 flex items-center justify-center">
                  <Zap className="h-10 w-10 text-dreampath-secondary" />
                  <span className="font-bold ml-2 text-dreampath-primary">Fast Delivery</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
      </LazySection>

      {/* Stats Section */}
      <LazySection minHeightClassName="min-h-[300px]" className="w-full [content-visibility:auto] [contain-intrinsic-size:340px]" threshold={0.4} rootMargin="0px 0px -1% 0px">
      <section className="bg-gradient-to-r from-dreampath-primary to-dreampath-dark text-white py-20">
        <motion.div className="container-wide" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Counter
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
              />
            ))}
          </div>
        </motion.div>
      </section>
      </LazySection>

      {/* Services section (lazy-loaded) */}
      <LazySection minHeightClassName="min-h-[900px]" className="w-full [content-visibility:auto] [contain-intrinsic-size:960px]" threshold={0.4} rootMargin="0px 0px -1% 0px">
        <Suspense fallback={<div className="container-wide"><div className="h-[480px] rounded-xl bg-gray-50" /></div>}>
          <ServicesSectionLazy />
        </Suspense>
      </LazySection>

      {/* Technology Section */}
      <LazySection minHeightClassName="min-h-[700px]" className="w-full [content-visibility:auto] [contain-intrinsic-size:740px]" threshold={0.4} rootMargin="0px 0px -1% 0px">
      <section className="bg-gray-50 py-20 overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-brand-50 to-transparent"></div>
        </div>
        
        <motion.div className="container-wide relative z-10" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold mb-6 text-dreampath-primary">
              Technologies We Work With
            </h2>
            <p className="text-lg text-gray-700">
              Our team stays up-to-date with the latest technologies to build
              high-performance applications that drive business growth
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
            {['React', 'Node.js', 'Python', 'AWS', 'Flutter', 'MongoDB', 'Angular', 'Vue.js', 'TypeScript', 'Go', 'Docker', 'Kubernetes'].map((tech, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex flex-col items-center"
              >
                <div className="h-24 w-24 rounded-full bg-white shadow-lg flex items-center justify-center mb-3 hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={getTechLogoUrl(tech)} 
                    alt={`${tech} logo`}
                    className="h-12 w-12 object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="font-medium text-dreampath-primary">{tech}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      </LazySection>

      {/* Service Keywords Section */}
      <LazySection minHeightClassName="min-h-[700px]" className="w-full [content-visibility:auto] [contain-intrinsic-size:740px]" threshold={0.45} rootMargin="0px 0px -1% 0px">
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-delayed"></div>
        </div>
        
        <motion.div className="container-wide relative z-10" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl font-bold mb-6 text-dreampath-primary">
              Explore Our Specialized Services
            </h2>
            <p className="text-xl text-gray-700">
              Click on any service to request more information or get a quote for your project.
            </p>
          </motion.div>
          
          <Suspense fallback={<div className="h-40 rounded-lg bg-gray-50" />}> 
            <ServiceKeywordsLazy displayStyle="categories" showTitles={true} />
          </Suspense>
          
          <div className="text-center mt-12">
            <Link to="/service-keywords">
              <Button className="bg-dreampath-primary hover:bg-dreampath-dark relative overflow-hidden group">
                <span className="relative z-10">View All Services</span>
                <div className="absolute inset-0 bg-dreampath-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
      </LazySection>

      {/* CTA section */}
      <LazySection minHeightClassName="min-h-[420px]" className="w-full [content-visibility:auto] [contain-intrinsic-size:460px]" threshold={0.45} rootMargin="0px 0px -1% 0px">
      <section className="relative section-padding bg-gradient-to-r from-dreampath-primary to-dreampath-dark text-white overflow-hidden">
        {/* Animated patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <svg className="absolute left-0 top-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="diagonalHatch" width="10" height="10" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="0" x2="0" y2="10" style={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: '1' }} />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#diagonalHatch)" />
            </svg>
          </div>
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white opacity-10 blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-white opacity-10 blur-3xl"></div>
        </div>
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8">
              Let's discuss your project and find the right solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact">
                <Button className="bg-white text-dreampath-primary hover:bg-gray-100 w-full sm:w-auto text-lg px-8 py-6">
                  Contact Us
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white/10 w-full sm:w-auto text-lg px-8 py-6">
                  View Our Work
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      </LazySection>
    </div>
  );
};

export default Home;
