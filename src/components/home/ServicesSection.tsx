import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Layout, Globe, Smartphone, Shield, Settings } from "lucide-react";

// Using inline transitions for simpler typing and smaller bundle

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

const ServicesSection: React.FC = () => {
  return (
    <section className="section-padding bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent z-10"></div>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-float-delayed"></div>
      </div>

      <motion.div className="container-wide relative z-10" initial={{ opacity: 0, filter: "blur(12px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: "easeOut" }}>
        <div className="text-center max-w-3xl mx-auto mb-16 scroll-animate">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-6 text-dreampath-primary">Our Services</h2>
            <p className="text-xl text-gray-700">
              We offer a comprehensive range of software development services to help businesses transform
              their operations and achieve their goals.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
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
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;
