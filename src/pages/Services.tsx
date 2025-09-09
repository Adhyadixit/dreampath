import React, { useState, lazy, Suspense } from "react";
import PageHeader from "@/components/common/PageHeader";
import LazyServiceCard from "@/components/services/LazyServiceCard";
import { 
  Code, 
  Globe, 
  Smartphone, 
  Database, 
  Lock, 
  Cloud, 
  GitBranch, 
  Server, 
  Zap, 
  Cpu, 
  BarChart3, 
  LayoutTemplate, 
  Box, 
  ShoppingCart, 
  LayoutDashboard, 
  Layers, 
  Cable,
  Layout,
  Shield,
  Settings,
  Clock,
  Star,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ContactFormPopup from "@/components/common/ContactFormPopup";
import LazySection from "@/components/common/LazySection";

const ServiceKeywordsLazy = lazy(() => import("@/components/services/ServiceKeywords"));

const Services = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleServiceClick = (serviceValue: string) => {
    setSelectedService(serviceValue);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const services = [
    {
      icon: <Code className="h-10 w-10 text-dreampath-secondary" />,
      title: "Custom Software Development",
      description: "Tailor-made solutions designed to address your specific business challenges. We handle the entire development lifecycle, from requirements gathering to deployment and maintenance.",
      features: [
        "Full-stack development",
        "Enterprise solutions",
        "Legacy system modernization",
        "Integration services"
      ],
      value: "custom-software-development"
    },
    {
      icon: <ShoppingCart className="h-10 w-10 text-dreampath-secondary" />,
      title: "Shopify Development",
      description: "High-converting e-commerce stores on Shopify with custom themes, apps, and performance optimization to drive sales and enhance customer experience.",
      features: [
        "Shopify Plus expertise",
        "Custom app development",
        "Conversion optimization",
        "Third-party integrations"
      ],
      value: "shopify-development"
    },
    {
      icon: <LayoutTemplate className="h-10 w-10 text-dreampath-secondary" />,
      title: "WordPress Development",
      description: "Powerful, scalable WordPress websites with custom themes, plugins, and enterprise-grade security for businesses of all sizes.",
      features: [
        "Headless WordPress",
        "Custom plugin development",
        "Performance optimization",
        "E-commerce solutions"
      ],
      value: "wordpress-development"
    },
    {
      icon: <Box className="h-10 w-10 text-dreampath-secondary" />,
      title: "3D Website Development",
      description: "Immersive 3D web experiences using WebGL and Three.js for product configurators, portfolios, and virtual showrooms.",
      features: [
        "WebGL & Three.js",
        "3D model integration",
        "Performance optimization",
        "Cross-device compatibility"
      ],
      value: "3d-website-development"
    },
    {
      icon: <LayoutDashboard className="h-10 w-10 text-dreampath-secondary" />,
      title: "Wix Studio Development",
      description: "Professional websites with Wix Studio's advanced capabilities, custom designs, animations, and e-commerce functionality.",
      features: [
        "Custom code implementation",
        "Advanced animations",
        "E-commerce integration",
        "Responsive design"
      ],
      value: "wix-studio-development"
    },
    {
      icon: <Layers className="h-10 w-10 text-dreampath-secondary" />,
      title: "Framer Development",
      description: "Beautiful, interactive websites with Framer's powerful design and development tools, perfect for modern web experiences.",
      features: [
        "Custom animations",
        "Responsive design",
        "CMS integration",
        "Visual development"
      ],
      value: "framer-development"
    },
    {
      icon: <Smartphone className="h-10 w-10 text-dreampath-secondary" />,
      title: "Progressive Web Apps",
      description: "App-like experiences on the web with offline functionality, push notifications, and home screen installation.",
      features: [
        "Offline-first approach",
        "Push notifications",
        "App store deployment",
        "Cross-platform"
      ],
      value: "progressive-web-apps"
    },
    {
      icon: <Cable className="h-10 w-10 text-dreampath-secondary" />,
      title: "API Development",
      description: "Custom API development and integration services to connect your systems and data with REST, GraphQL, and WebSockets.",
      features: [
        "API-first approach",
        "Enterprise integration",
        "Microservices architecture",
        "Comprehensive documentation"
      ],
      value: "api-development"
    },
    {
      icon: <Globe className="h-10 w-10 text-dreampath-secondary" />,
      title: "Web Development",
      description: "Responsive, fast, and user-friendly websites optimized for performance and conversions. Our web solutions range from simple corporate websites to complex web applications.",
      features: [
        "Responsive website design",
        "Progressive web apps (PWAs)",
        "E-commerce solutions",
        "Content management systems"
      ],
      value: "web-development"
    },
    {
      icon: <Smartphone className="h-10 w-10 text-dreampath-secondary" />,
      title: "Mobile App Development",
      description: "Native and cross-platform apps that deliver exceptional user experiences across iOS and Android devices. We build apps that are fast, reliable, and align with your brand.",
      features: [
        "iOS and Android development",
        "Cross-platform solutions",
        "App store optimization",
        "Maintenance and updates"
      ],
      value: "mobile-app-development"
    },
    {
      icon: <Layout className="h-10 w-10 text-dreampath-secondary" />,
      title: "UI/UX Design",
      description: "User-centered design that creates intuitive, engaging, and brand-aligned interfaces. We focus on creating designs that not only look good but also provide excellent usability.",
      features: [
        "User research",
        "Wireframing and prototyping",
        "Visual design",
        "Usability testing"
      ],
      value: "ui-ux-design"
    },
    {
      icon: <Database className="h-10 w-10 text-dreampath-secondary" />,
      title: "Database Development",
      description: "Robust and scalable database solutions that securely store and efficiently manage your data. We design database architectures optimized for your specific needs.",
      features: [
        "Database design and optimization",
        "Data migration",
        "Database administration",
        "BI and reporting solutions"
      ],
      value: "database-development"
    },
    {
      icon: <Shield className="h-10 w-10 text-dreampath-secondary" />,
      title: "Cybersecurity",
      description: "Protect your digital assets with our comprehensive security solutions and services. We help identify vulnerabilities and implement robust security measures.",
      features: [
        "Security audits",
        "Penetration testing",
        "Secure coding practices",
        "Compliance solutions"
      ],
      value: "cybersecurity"
    },
    {
      icon: <Cloud className="h-10 w-10 text-dreampath-secondary" />,
      title: "Cloud Solutions",
      description: "Leverage the power of cloud computing to improve scalability, reduce costs, and enhance business agility. We help you migrate to and optimize your presence in the cloud.",
      features: [
        "Cloud migration",
        "Infrastructure as Code",
        "Serverless applications",
        "Cloud optimization"
      ],
      value: "cloud-solutions"
    },
    {
      icon: <Settings className="h-10 w-10 text-dreampath-secondary" />,
      title: "DevOps Solutions",
      description: "Streamline your development lifecycle with automation, CI/CD, and cloud infrastructure. Our DevOps services help you deliver software faster and more reliably.",
      features: [
        "CI/CD pipeline setup",
        "Infrastructure automation",
        "Containerization",
        "Monitoring and logging"
      ],
      value: "devops-solutions"
    },
    {
      icon: <Clock className="h-10 w-10 text-dreampath-secondary" />,
      title: "IT Consulting",
      description: "Strategic guidance to help you leverage technology effectively and make informed business decisions. Our consultants bring deep industry and technical expertise.",
      features: [
        "Technical strategy development",
        "Technology assessment",
        "Digital transformation",
        "Vendor selection"
      ],
      value: "it-consulting"
    },
    {
      icon: <Star className="h-10 w-10 text-dreampath-secondary" />,
      title: "Online Reputation & Local SEO",
      description: "Enhance your online presence with our comprehensive reputation management and local SEO services. We help you build trust, improve visibility, and manage your digital reputation effectively.",
      features: [
        "Google My Business optimization",
        "Trustpilot & review management",
        "Local SEO & citations",
        "Negative PR mitigation"
      ],
      value: "reputation-management"
    }
  ];

  return (
    <div>
      <PageHeader 
        title="Our Services" 
        description="Comprehensive software development and technology services to drive your business forward"
      />

      {/* Services List */}
      <LazySection minHeightClassName="min-h-screen">
        <section className="section-padding bg-white">
          <motion.div className="container-wide" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-dreampath-primary">How We Can Help</h2>
            <p className="mt-4 text-lg text-gray-700">
              Our comprehensive range of software development and IT services are designed to meet the diverse needs of modern businesses.
              From initial concept to ongoing support, we're your trusted technology partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <LazyServiceCard 
                key={index} 
                service={service} 
                index={index} 
                handleServiceClick={handleServiceClick} 
              />
            ))}
          </div>
        </motion.div>
      </section>
      </LazySection>

      {/* Process */}
      <LazySection minHeightClassName="min-h-[400px]">
        <section className="section-padding bg-gray-50">
          <motion.div className="container-wide" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-dreampath-primary">Our Development Process</h2>
            <p className="mt-4 text-lg text-gray-700">
              We follow a proven, systematic approach to software development that ensures quality, 
              transparency and successful outcomes for your projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-dreampath-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                1
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">Discovery</h3>
              <p className="text-gray-600">
                We work closely with you to understand your business, goals, and requirements to define the project scope.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dreampath-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                2
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">Design</h3>
              <p className="text-gray-600">
                Our team creates detailed technical designs and user interfaces that align with your brand and requirements.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dreampath-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                3
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">Development</h3>
              <p className="text-gray-600">
                We build your solution using modern technologies and best practices, with regular updates and demos.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dreampath-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto">
                4
              </div>
              <h3 className="text-xl font-bold mt-4 mb-2">Delivery & Support</h3>
              <p className="text-gray-600">
                After thorough testing, we deploy your solution and provide ongoing maintenance and support.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
      </LazySection>

      {/* Service Keywords Section */}
      <LazySection minHeightClassName="min-h-[500px]">
        <section className="section-padding bg-gray-50">
          <motion.div className="container-wide" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-dreampath-primary">Explore Our Specialized Services</h2>
            <p className="mt-4 text-lg text-gray-700">
              Click on any service to request more information or get a quote for your project.
            </p>
          </div>
          
                    <Suspense fallback={<div className="h-40 rounded-lg bg-gray-100" />}>
            <ServiceKeywordsLazy displayStyle="grid" showTitles={false} />
          </Suspense>
          
          <div className="text-center mt-10">
            <Link to="/service-keywords" className="inline-block bg-dreampath-primary text-white hover:bg-dreampath-dark px-6 py-3 rounded-md font-medium transition-colors">
              View All Services
            </Link>
          </div>
        </motion.div>
      </section>
      </LazySection>

      <ContactFormPopup 
        isOpen={isPopupOpen} 
        onClose={closePopup} 
        preselectedService={selectedService} 
      />

      {/* CTA */}
      <LazySection minHeightClassName="min-h-[350px]">
        <section className="section-padding bg-dreampath-primary text-white">
        <motion.div className="container-wide" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-6 text-dreampath-accent" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8">
              Contact us today to discuss how we can help bring your ideas to life with our expert services.
            </p>
            <Link to="/contact" className="inline-block bg-white text-dreampath-primary hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg transition-colors">
              Get in Touch
            </Link>
          </div>
        </motion.div>
      </section>
      </LazySection>
    </div>
  );
};

export default Services;
