import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import ContactFormPopup from '@/components/common/ContactFormPopup';
import { 
  Smartphone, 
  Monitor, 
  Code, 
  Heart, 
  Home, 
  ShoppingBag, 
  Plane, 
  Video, 
  Globe, 
  LayoutGrid, 
  Briefcase, 
  Repeat
} from 'lucide-react';

// Define service categories with their keywords and icons
const serviceCategories = [
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    icon: <Smartphone className="h-6 w-6 mr-2" />,
    keywords: [
      { id: 'ios-app', label: 'iOS App Development', value: 'ios-app' },
      { id: 'android-app', label: 'Android App Development', value: 'android-app' },
      { id: 'mobile-app', label: 'Mobile Application Development', value: 'cross-platform' },
      { id: 'app-dev', label: 'App Development', value: 'cross-platform' },
      { id: 'app-dev-agency', label: 'App Development Agency', value: 'cross-platform' },
      { id: 'mobile-dev', label: 'Mobile Development', value: 'cross-platform' },
      { id: 'app-dev-software', label: 'App Development Software', value: 'cross-platform' },
      { id: 'mobile-app-software', label: 'Mobile App Development Software', value: 'cross-platform' },
      { id: 'low-cost-app', label: 'Low Cost Mobile App Development', value: 'cross-platform' },
      { id: 'affordable-app', label: 'Affordable App Development', value: 'cross-platform' },
      { id: 'cross-platform', label: 'Cross Platform App Development', value: 'cross-platform' },
    ]
  },
  {
    id: 'specialized-apps',
    title: 'Specialized App Solutions',
    icon: <Code className="h-6 w-6 mr-2" />,
    keywords: [
      { id: 'dating-app', label: 'Dating App Development', value: 'dating-app' },
      { id: 'real-estate-app', label: 'Real Estate App Development', value: 'real-estate-app' },
      { id: 'ecommerce-app', label: 'E-commerce App Development', value: 'ecommerce-app' },
      { id: 'travel-app', label: 'Travel App Development', value: 'travel-app' },
      { id: 'video-chat-app', label: 'Video Chat App Development', value: 'video-chat-app' },
      { id: 'tinder-clone', label: 'Dating App Development like Tinder', value: 'dating-app' },
      { id: 'tango-clone', label: 'Video Chat App like Tango', value: 'video-chat-app' },
      { id: 'real-estate-devs', label: 'Real Estate App Developers', value: 'real-estate-app' },
    ]
  },
  {
    id: 'web-development',
    title: 'Web Development',
    icon: <Globe className="h-6 w-6 mr-2" />,
    keywords: [
      { id: 'website-to-app', label: 'Website to App Development', value: 'website-to-app' },
      { id: 'custom-website', label: 'Custom Website Development', value: 'custom-website' },
      { id: 'turn-website-app', label: 'Turn Website into App', value: 'website-to-app' },
      { id: 'b2b-marketplace', label: 'B2B Marketplace Development', value: 'b2b-marketplace' },
    ]
  },
  {
    id: 'technologies',
    title: 'Technologies',
    icon: <LayoutGrid className="h-6 w-6 mr-2" />,
    keywords: [
      { id: 'react-native', label: 'React Native', value: 'react-native' },
      { id: 'react-native-software', label: 'React Native Software', value: 'react-native' },
    ]
  }
];

interface ServiceKeywordsProps {
  displayStyle?: 'grid' | 'categories';
  showTitles?: boolean;
}

const ServiceKeywords: React.FC<ServiceKeywordsProps> = ({ 
  displayStyle = 'categories',
  showTitles = true
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleServiceClick = (serviceValue: string) => {
    setSelectedService(serviceValue);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Render all keywords in a grid layout
  if (displayStyle === 'grid') {
    const allKeywords = serviceCategories.flatMap(category => category.keywords);
    
    return (
      <div className="w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {allKeywords.map((keyword) => (
            <Button
              key={keyword.id}
              variant="outline"
              className="h-auto py-3 px-4 text-sm justify-start hover:bg-dreampath-primary hover:text-white transition-colors"
              onClick={() => handleServiceClick(keyword.value)}
            >
              {keyword.label}
            </Button>
          ))}
        </div>
        
        <ContactFormPopup 
          isOpen={isPopupOpen} 
          onClose={closePopup} 
          preselectedService={selectedService} 
        />
      </div>
    );
  }

  // Render by categories
  return (
    <div className="w-full space-y-8">
      {serviceCategories.map((category) => (
        <div key={category.id} className="space-y-4">
          {showTitles && (
            <div className="flex items-center">
              {category.icon}
              <h3 className="text-xl font-bold text-dreampath-primary">{category.title}</h3>
            </div>
          )}
          
          <div className="flex flex-wrap gap-3">
            {category.keywords.map((keyword) => (
              <Button
                key={keyword.id}
                variant="outline"
                className="h-auto py-2 px-4 text-sm hover:bg-dreampath-primary hover:text-white transition-colors"
                onClick={() => handleServiceClick(keyword.value)}
              >
                {keyword.label}
              </Button>
            ))}
          </div>
        </div>
      ))}
      
      <ContactFormPopup 
        isOpen={isPopupOpen} 
        onClose={closePopup} 
        preselectedService={selectedService} 
      />
    </div>
  );
};

export default ServiceKeywords;
