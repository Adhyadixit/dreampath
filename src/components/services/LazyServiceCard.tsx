import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface Service {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  value: string;
}

interface LazyServiceCardProps {
  service: Service;
  index: number;
  handleServiceClick: (serviceValue: string) => void;
}

const LazyServiceCard: React.FC<LazyServiceCardProps> = ({ service, index, handleServiceClick }) => {

  const cardVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)",
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: (index % 3) * 0.1 // Stagger animation
      }
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={cardVariants}
      className="h-full"
    >
      <Card className="border hover:shadow-md transition-all duration-300 h-full flex flex-col">
        <CardHeader>
          <div className="mb-4">
            {service.icon}
          </div>
          <CardTitle className="text-xl">{service.title}</CardTitle>
          <CardDescription className="text-base mt-2 text-gray-600">
            {service.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <h4 className="font-medium mb-2">Key Features:</h4>
          <ul className="space-y-2">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <ArrowRight className="h-5 w-5 text-dreampath-secondary mr-2 mt-0.5 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className="flex justify-between pt-4 mt-auto">
          <div>
              <Link to={`/services/${service.value}`} className="text-dreampath-secondary hover:text-dreampath-primary inline-flex items-center group">
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
              </Link>
          </div>
          <Button 
            variant="default" 
            className="bg-dreampath-primary hover:bg-dreampath-dark"
            onClick={() => handleServiceClick(service.value || service.title.toLowerCase().replace(/\s+/g, '-'))}
          >
            Request Info
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default LazyServiceCard;
