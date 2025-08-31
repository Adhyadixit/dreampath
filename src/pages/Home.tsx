import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Code, Layout, Globe, Smartphone, Shield, Settings, Users, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import ServiceKeywords from "@/components/services/ServiceKeywords";

// Default hero image URL - Futuristic tech/AI theme (responsive variants)
const heroImageBase =
  "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=70";
const heroImageUrl = `${heroImageBase}&w=1280`;
const heroImageSrcSet = [
  `${heroImageBase}&w=768 768w`,
  `${heroImageBase}&w=1280 1280w`,
  `${heroImageBase}&w=1920 1920w`,
].join(", ");

// Function to get reliable tech logo URLs
const getTechLogoUrl = (tech: string): string => {
  const logos: Record<string, string> = {
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
  
  return logos[tech] || `https://ui-avatars.com/api/?name=${tech}&background=0D8ABC&color=fff`;
};

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const scrollElements = document.querySelectorAll('.scroll-animate');
      
      scrollElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const offsetTop = rect.top + window.scrollY;
        const elementHeight = rect.height;
        const windowHeight = window.innerHeight;
        
        if (scrollPos > offsetTop - windowHeight + elementHeight / 4) {
          el.classList.add('animate-in');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const stats = [
    { value: 120, label: "Clients Worldwide", icon: <Globe className="h-8 w-8" /> },
    { value: 350, label: "Projects Completed", icon: <Code className="h-8 w-8" /> },
    { value: 15, label: "Years Experience", icon: <Award className="h-8 w-8" /> },
    { value: 24, label: "Team Members", icon: <Users className="h-8 w-8" /> }
  ];

  // Reviews list for marquee (50 items). Includes Indian and international names.
  const reviews = [
    // Indian (moved to the beginning as requested)
    { name: "Aarav Sharma", role: "Founder, Fintech Startup", quote: "DreamPath delivered our MVP 3 weeks ahead of schedule with top-notch quality." },
    { name: "Ishita Gupta", role: "Head of Marketing, D2C Brand", quote: "Site speed jumped 40% and our conversions improved dramatically." },
    { name: "Rahul Verma", role: "Product Manager, HealthTech", quote: "Clean architecture and reliable releases from a proactive team." },
    { name: "Priya Patel", role: "CEO, MedTech Solutions", quote: "Their attention to detail and proactive approach is remarkable." },
    { name: "Arjun Kapoor", role: "CTO, EduTech Innovations", quote: "Our platform's performance improved by 200% after their optimizations." },
    { name: "Ananya Iyer", role: "Founder, StyleBazaar", quote: "E-commerce revenue doubled within 3 months of their redesign." },
    { name: "Vikram Singh", role: "CEO, AgriTech Solutions", quote: "Transformed our agricultural platform with cutting-edge technology." },
    { name: "Meera Nair", role: "Head of Product, FinServe", quote: "Exceptional fintech solutions with a deep understanding of Indian markets." },
    { name: "Rohan Mehta", role: "Founder, TravelMint", quote: "Built our travel platform from scratch with amazing attention to detail." },
    { name: "Neha Reddy", role: "CTO, HealthFirst", quote: "Reliable healthcare solutions that scale with our growing user base." },
    { name: "Karthik Nair", role: "CEO, EduFutura", quote: "Our learning platform's engagement tripled after their optimizations." },
    { name: "Divya Menon", role: "Product Lead, ShopEase", quote: "Seamless e-commerce integration with multiple payment gateways." },
    { name: "Sanjay Deshmukh", role: "CTO, AgroNext", quote: "IoT integrations were smooth and scalable." },
    { name: "Pooja Kulkarni", role: "COO, FreshKart", quote: "Checkout experience improved and cart drops reduced 35%." },
    { name: "Nikhil Bansal", role: "VP Engineering, LendFast", quote: "Robust architecture with clean DevOps pipelines." },
    { name: "Aisha Khan", role: "Founder, HealWell", quote: "HIPAA-ready workflows implemented flawlessly." },
    { name: "Ritika Agarwal", role: "Head of Product, EduSpark", quote: "Gamification boosted retention across cohorts." },
    { name: "Manish Soni", role: "CTO, FleetGo", quote: "Real-time tracking with impressive reliability." },
    { name: "Neeraj Malhotra", role: "CEO, InsureNow", quote: "Underwriting automation cut processing time by 60%." },
    { name: "Kavya Rao", role: "Product Lead, PayWave", quote: "UPI-first flows integrated with stellar UX." },
    { name: "Harsh Vardhan", role: "Founder, BuildMate", quote: "B2B marketplace scaled to 100k SKUs seamlessly." },
    { name: "Sneha Pillai", role: "Growth Lead, LearnUp", quote: "Onboarding completion increased by 47%." },
    { name: "Rohit Kulkarni", role: "CTO, SportsHub", quote: "Live scoring and streaming handled flawlessly." },
    { name: "Shreya Banerjee", role: "CEO, CraftCart", quote: "SEO clicks up 120% with lightning-fast pages." },
    { name: "Tarun Kapoor", role: "Head of Engineering, SafeBank", quote: "Top-tier security and compliance from day one." },
    { name: "Ankit Jain", role: "Founder, Tutorly", quote: "Launched our mobile app in 6 weeks. Smooth process." },
    { name: "Bhavya Shah", role: "COO, MedLink", quote: "Interoperability with existing systems was seamless." },
    { name: "Gaurav Mishra", role: "VP Product, GameOn", quote: "Scalable realtime infra for tournaments worked great." },
    { name: "Tanya Chopra", role: "CMO, BeautyBay", quote: "Personalization increased AOV significantly." },
    { name: "Yash Patel", role: "Head of Product, QuickServe", quote: "Service uptime at 99.99% since launch." },
    { name: "Aman Arora", role: "CEO, RealtyPro", quote: "Listings load instantly with great map UX." },
    { name: "Kritika Sinha", role: "Product Manager, FitLife", quote: "Habit streaks and push flows boosted engagement." },

    // International (follow after Indian)
    { name: "Emily Johnson", role: "CEO, TechStart Inc.", quote: "DreamPath transformed our platform completely. 150% ROI in 6 months!" },
    { name: "Michael Chen", role: "CTO, HealthPlus", quote: "Their team's expertise in healthcare tech is unmatched. Delivered ahead of schedule." },
    { name: "Sarah Williams", role: "Founder, EduTech Pro", quote: "Our user engagement tripled after their redesign. Exceptional work!" },
    { name: "David Kim", role: "Product Lead, Finova", quote: "Reliable, professional, and incredibly skilled. A true partner in every sense." },
    { name: "Olivia Martinez", role: "CMO, StyleHub", quote: "Our e-commerce revenue grew by 180% post their optimizations." },
    { name: "James Wilson", role: "Director, CloudNova", quote: "Best decision we made was choosing DreamPath for our cloud migration." },
    { name: "Robert Taylor", role: "Head of Product, EduFuture", quote: "We've worked with many firms, but DreamPath stands out." },
    { name: "Jennifer Lee", role: "Founder, GreenTech", quote: "Sustainable solutions that actually work. Highly recommended!" },
    { name: "Thomas Brown", role: "CTO, SecureNet", quote: "Security-first approach gave us the confidence we needed." },
    { name: "Liam Thompson", role: "COO, RetailWorks", quote: "Inventory accuracy and speed improved dramatically." },
    { name: "Emma Davis", role: "VP Growth, MediaMax", quote: "Analytics we can trust, finally. Great team to work with." },
    { name: "Noah Anderson", role: "Founder, SaaSly", quote: "From idea to launch in record time with zero compromises." },
    { name: "Sophia Garcia", role: "Head of Design, PixelPro", quote: "World-class UX delivered on time and on budget." },
    { name: "Mason White", role: "CTO, FinEdge", quote: "Secure, compliant, and fast. Exactly what we needed." },
    { name: "Isabella Moore", role: "CMO, FoodJoy", quote: "Conversion rates up 2.4x after their CRO work." },
    { name: "Jack Miller", role: "CPO, FinCore", quote: "APIs are clean, well-documented, and reliable." },
    { name: "Ava Robinson", role: "CEO, TravelMore", quote: "Search speed and relevancy are on another level." },
    { name: "Ethan Walker", role: "CTO, HealthSync", quote: "Data pipelines with zero data loss. Impressive." },
    { name: "Mia Young", role: "Head of Marketing, ShopVerse", quote: "Attribution is finally accurate. ROAS up 1.8x." },
    { name: "Lucas Hall", role: "Founder, CloudEdge", quote: "Infra costs reduced 30% without performance loss." },
    { name: "Amelia Allen", role: "Product Lead, EduFlow", quote: "Students love the new experience. NPS +22." },
    { name: "Benjamin Scott", role: "CTO, AutoSense", quote: "ML models deployed with solid MLOps discipline." },
    { name: "Charlotte King", role: "Founder, EduPilot", quote: "Cohort analytics gave us actionable insights quickly." },
    { name: "Henry Adams", role: "Head of Ops, ShipFast", quote: "Order throughput doubled after workflow revamp." },
    { name: "Victoria Brooks", role: "CIO, SecurePay", quote: "Audit-ready logs and excellent alerting." },
    { name: "Daniel Perez", role: "CEO, GreenLeaf", quote: "Sustainability features that actually drive savings." },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  // Limit number of review cards to reduce initial DOM size, then duplicate for seamless marquee
  const MAX_REVIEWS = 25;
  const baseReviews = reviews.slice(0, MAX_REVIEWS);
  const allReviews = [...baseReviews, ...baseReviews];
  
  // Marquee refs/state for JS-driven smooth loop
  const trackRef = useRef<HTMLDivElement | null>(null);
  const reviewsSectionRef = useRef<HTMLElement | null>(null);
  const [halfWidth, setHalfWidth] = useState(0);
  const offsetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const speedPxPerSec = 60; // tune for desired speed (faster so all reviews surface sooner)
  const lastTsRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [activeDot, setActiveDot] = useState(0);
  const [reviewsInView, setReviewsInView] = useState(false);
  
  // Measure half width after layout
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const handleChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', handleChange);

    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      // Because content is duplicated once, half of scrollWidth equals one full set width
      const newHalf = el.scrollWidth / 2;
      setHalfWidth(newHalf);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      mq.removeEventListener('change', handleChange);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  // RAF loop for smooth, seamless translateX
  useEffect(() => {
    if (reducedMotion || halfWidth <= 0 || !reviewsInView) return;
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000; // seconds
      lastTsRef.current = ts;
      // advance offset
      offsetRef.current += speedPxPerSec * dt;
      // wrap seamlessly when passing one copy width
      if (offsetRef.current >= halfWidth) {
        offsetRef.current -= halfWidth;
      }
      const el = trackRef.current;
      if (el) {
        el.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      // update active dot when crossing boundaries (5 segments)
      const fraction = offsetRef.current / halfWidth; // 0..1
      const dot = Math.floor((fraction * 5) % 5);
      if (dot !== activeDot) setActiveDot(dot);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [halfWidth, reducedMotion, activeDot, reviewsInView]);

  // Observe reviews section visibility
  useEffect(() => {
    const section = reviewsSectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === section) {
            setReviewsInView(e.isIntersecting);
          }
        }
      },
      { root: null, threshold: 0.1 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  const jumpToFraction = (fraction: number) => {
    if (halfWidth <= 0) return;
    offsetRef.current = (halfWidth * fraction) % halfWidth;
    const el = trackRef.current;
    if (el) {
      el.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    }
    // set dot immediately
    setActiveDot(Math.floor((fraction * 5) % 5));
  };

  return (
    <div>
      {/* Parallax Hero Section */}
      <section
        id="hero"
        className="relative min-h-[90vh] md:min-h-screen overflow-hidden flex items-start pt-32 md:pt-40 pb-16"
      >
        {/* Background image (optimized) */}
        <img
          src={heroImageUrl}
          srcSet={heroImageSrcSet}
          sizes="100vw"
          alt="Futuristic AI technology background"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
          decoding="async"
          fetchPriority="high"
        />
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950/95 via-purple-900/85 to-violet-800/90" />
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
        
        <div className="container-wide relative z-10 text-white h-full flex items-center">
          <div className="max-w-4xl text-left px-4 sm:px-6 md:px-8 w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-2 mb-5 md:mb-6 text-base md:text-base font-medium text-brand-100 bg-brand-500/20 backdrop-blur-sm rounded-full border border-brand-400/20"
            >
              Welcome to the Future of Technology
            </motion.div>
            
            <motion.h1 
              className="text-6xl sm:text-7xl md:text-8xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-brand-100 pb-4 md:pb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              AI-Powered Digital Solutions
            </motion.h1>
            
            <motion.p 
              className="mt-4 md:mt-6 text-xl md:text-2xl text-brand-100 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              We build intelligent, scalable solutions that drive business growth through cutting-edge AI, cloud, and web3 technologies.
            </motion.p>
            
            <motion.div 
              className="mt-4 md:mt-10 flex flex-wrap justify-center gap-2 md:gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
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
              
              <Button 
                variant="outline"
                size="lg"
                className="text-base md:text-lg px-6 md:px-8 py-5 md:py-6 rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  const element = document.getElementById('reviews');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                See Client Success
              </Button>
            </motion.div>
            
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
      <section id="why-choose-us" className="py-16 bg-gray-50">
        <div className="container-wide">
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
        </div>
      </section>

      {/* Trust badges / social proof */}
      <section id="trust" className="bg-white py-12 border-b">
        <div className="container-wide">
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
        </div>
      </section>

      {/* Reviews / Testimonials */}
      <section id="reviews" ref={(el) => (reviewsSectionRef.current = el)} className="py-16 bg-white overflow-hidden">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold mb-4 text-dreampath-primary">What Our Clients Say</h2>
            <p className="text-lg text-gray-600">Hear from 50+ founders, product leaders, and marketers who trusted us.</p>
          </div>
          
          <div className="relative">
            {/* Animated Reviews Carousel */}
            <div className="relative h-64 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full flex items-center">
                <div ref={trackRef} data-marquee-track className="w-max flex flex-nowrap whitespace-nowrap will-change-transform">
                  {allReviews.map((review, idx) => (
                    <div
                      key={`rev-${idx}`}
                      aria-hidden={idx >= reviews.length}
                      className="w-56 sm:w-60 mx-1 sm:mx-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow whitespace-normal break-words overflow-hidden align-top shrink-0"
                    >
                      <div className="flex items-center mb-4">
                        <div className="h-12 w-12 rounded-full bg-dreampath-primary/10 flex items-center justify-center text-dreampath-primary font-bold text-xl">
                          {review.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold">{review.name}</h4>
                          <p className="text-sm text-gray-500">{review.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-700 italic break-words leading-relaxed">"{review.quote}"</p>
                      <div className="mt-3 flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Gradient Fade Effect */}
            <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
            <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          </div>
          
          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <button
                key={i}
                onClick={() => jumpToFraction(i / 5)}
                className={`w-2 h-2 rounded-full ${i === activeDot ? 'bg-dreampath-primary' : 'bg-gray-300'} hover:bg-dreampath-primary/80`}
                aria-label={`Jump to position ${i + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Keep reduced-motion behavior for JS-driven marquee */}
        <style>{`
          @media (prefers-reduced-motion: reduce) {
            [data-marquee-track] { transform: none !important; }
          }
        `}</style>
      </section>

      {/* Available On (five) */}
      <section id="available" className="section-padding bg-gray-50">
        <div className="container-wide">
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
        </div>
      </section>

      {/* Our Team (no images) */}
      <section id="team" className="section-padding bg-white">
        <div className="container-wide">
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
        </div>
      </section>

      {/* Roadmap / Process */}
      <section id="roadmap" className="section-padding bg-gray-50">
        <div className="container-wide">
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
        </div>
      </section>

      {/* 3D Feature Section */}
      <section className="relative bg-gradient-to-b from-white to-brand-50 py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-dreampath-secondary opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-dreampath-primary opacity-10 rounded-full blur-3xl"></div>
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
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
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
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
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
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
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-dreampath-primary to-dreampath-dark text-white py-20">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="flex justify-center mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-4xl font-bold mb-2">
                  <CountUp end={stat.value} duration={2.5} />+
                </h3>
                <p className="text-sm text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-10"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-delayed"></div>
        </div>
        
        <div className="container-wide relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16 scroll-animate">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-6 text-dreampath-primary">
                Our Services
              </h2>
              <p className="text-xl text-gray-700">
                We offer a comprehensive range of software development services 
                to help businesses transform their operations and achieve their goals.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                className="scroll-animate"
              >
                <Card className="h-full border border-gray-100 hover:border-dreampath-secondary transition-all duration-300 hover:shadow-xl group">
                  <CardHeader>
                    <div className="mb-4 rounded-full bg-dreampath-light p-3 w-16 h-16 flex items-center justify-center group-hover:bg-dreampath-secondary/20 transition-colors duration-300">
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Link to="/services" className="text-dreampath-secondary hover:text-dreampath-primary inline-flex items-center group">
                      Learn More 
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button className="bg-dreampath-primary hover:bg-dreampath-dark relative overflow-hidden group">
                <span className="relative z-10">View All Services</span>
                <div className="absolute inset-0 bg-dreampath-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className="bg-gray-50 py-20 overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand-50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-brand-50 to-transparent"></div>
        </div>
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
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
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex flex-col items-center"
              >
                <div className="h-24 w-24 rounded-full bg-white shadow-lg flex items-center justify-center mb-3 hover:shadow-xl transition-shadow duration-300">
                  <img 
                    src={getTechLogoUrl(tech)} 
                    alt={`${tech} logo`}
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <span className="font-medium text-dreampath-primary">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Keywords Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
          <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-delayed"></div>
        </div>
        
        <div className="container-wide relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
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
          
          <ServiceKeywords displayStyle="categories" showTitles={true} />
          
          <div className="text-center mt-12">
            <Link to="/service-keywords">
              <Button className="bg-dreampath-primary hover:bg-dreampath-dark relative overflow-hidden group">
                <span className="relative z-10">View All Services</span>
                <div className="absolute inset-0 bg-dreampath-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA section */}
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
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
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
    </div>
  );
};

export default Home;
