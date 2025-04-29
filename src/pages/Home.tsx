import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/common/Hero";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, ArrowRight, Code, Layout, Globe, Smartphone, Shield, Settings, Users, Zap, Award } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "react-countup";

// Default YouTube video ID - this would come from admin panel in production
const youtubeVideoId = "P8gB0vM6i7o";

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <div>
      <Hero 
        title="Transform Your Business with Custom Software Solutions" 
        subtitle="We build innovative, scalable, and high-performance software to help businesses thrive in the digital world."
        ctaText="Start Your Project"
        ctaLink="/contact"
        youtubeVideoId={youtubeVideoId}
      />

      {/* 3D Feature Section */}
      <section className="relative bg-gradient-to-b from-white to-blue-50 py-24 overflow-hidden">
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
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
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
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-t from-blue-50 to-transparent"></div>
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
                    src={`https://via.placeholder.com/100?text=${tech}`} 
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
