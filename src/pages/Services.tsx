import React from "react";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Code, Layout, Globe, Smartphone, Shield, Settings, Database, Cloud, Clock, Sparkle } from "lucide-react";
import { Link } from "react-router-dom";
import ServiceKeywords from "@/components/services/ServiceKeywords";

const Services = () => {
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
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
      ]
    }
  ];

  return (
    <div>
      <PageHeader 
        title="Our Services" 
        description="Comprehensive software development and technology services to drive your business forward"
      />

      {/* Services List */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-dreampath-primary">How We Can Help</h2>
            <p className="mt-4 text-lg text-gray-700">
              Our comprehensive range of software development and IT services are designed to meet the diverse needs of modern businesses.
              From initial concept to ongoing support, we're your trusted technology partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="border hover:shadow-md transition-all duration-300">
                <CardHeader>
                  <div className="mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base mt-2 text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <ul className="space-y-1">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <ArrowRight className="h-4 w-4 text-dreampath-secondary mr-2 mt-1" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
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
        </div>
      </section>

      {/* Service Keywords Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-dreampath-primary">Explore Our Specialized Services</h2>
            <p className="mt-4 text-lg text-gray-700">
              Click on any service to request more information or get a quote for your project.
            </p>
          </div>
          
          <ServiceKeywords displayStyle="grid" showTitles={false} />
          
          <div className="text-center mt-10">
            <Link to="/service-keywords" className="inline-block bg-dreampath-primary text-white hover:bg-dreampath-dark px-6 py-3 rounded-md font-medium transition-colors">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-dreampath-primary text-white">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkle className="h-12 w-12 mx-auto mb-6 text-dreampath-accent" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Project?</h2>
            <p className="text-xl mb-8">
              Contact us today to discuss how we can help bring your ideas to life with our expert services.
            </p>
            <Link to="/contact" className="inline-block bg-white text-dreampath-primary hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg transition-colors">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
