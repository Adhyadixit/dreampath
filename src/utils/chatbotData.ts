// Chatbot data for common questions and answers

export interface ChatbotResponse {
  keywords: string[];
  response: string;
}

// Casual greetings and conversation starters
export const casualConversation: ChatbotResponse[] = [
  {
    keywords: ['hi', 'hello', 'hey', 'howdy', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    response: 'Hello there! How can I help you today? I can provide information about our services, pricing, or answer any questions you might have about DreamPath Solutions.'
  },
  {
    keywords: ['how are you', 'how\'s it going', 'how are things', 'what\'s up', 'sup'],
    response: 'I\'m doing great, thanks for asking! I\'m here to help you with any questions about our services. What can I assist you with today?'
  },
  {
    keywords: ['thank you', 'thanks', 'appreciate it', 'thx'],
    response: 'You\'re welcome! Is there anything else I can help you with today?'
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'talk later', 'good night'],
    response: 'Thank you for chatting with us! If you have any more questions later, feel free to come back. Have a great day!'
  }
];

export const businessHours: ChatbotResponse = {
  keywords: ['business hours', 'opening hours', 'hours', 'when are you open', 'working hours', 'timing', 'timings', 'schedule', 'availability'],
  response: 'Our business hours are Monday to Friday, 9:00 AM to 6:00 PM (IST). We are closed on weekends and major holidays. However, you can always reach out via email or leave a message here, and we\'ll get back to you as soon as possible.'
};

export const services: ChatbotResponse[] = [
  {
    keywords: ['services', 'what do you offer', 'what services', 'offerings', 'what do you do', 'what can you do', 'help me with'],
    response: 'We offer a wide range of software development services including: Web Development, Mobile App Development, Custom Software Solutions, UI/UX Design, E-commerce Solutions, and Digital Transformation. What specific service are you interested in?'
  },
  {
    keywords: ['web', 'website', 'web development', 'web app', 'web application', 'website development', 'website design', 'landing page'],
    response: 'Our web development services include custom website development, web applications, progressive web apps (PWAs), responsive design, and CMS-based solutions using modern frameworks like React, Angular, and Vue.js. We focus on creating fast, secure, and user-friendly websites that help achieve your business goals. Would you like to discuss a specific web project?'
  },
  {
    keywords: ['mobile', 'app', 'android', 'ios', 'mobile app', 'mobile application', 'iphone app', 'smartphone', 'tablet'],
    response: 'We develop native and cross-platform mobile applications for iOS and Android using technologies like React Native, Flutter, and Swift/Kotlin. Our mobile apps are designed for performance, usability, and scalability. We can help with everything from concept to deployment on app stores. What kind of mobile app are you interested in?'
  },
  {
    keywords: ['custom', 'software', 'custom software', 'bespoke', 'tailored', 'enterprise', 'solution', 'application'],
    response: 'We build custom software solutions tailored to your specific business needs. This includes enterprise applications, automation tools, data management systems, and integration solutions. Our custom software development process starts with understanding your business requirements and ends with a solution that improves efficiency and productivity. Would you like to discuss your specific needs?'
  },
  {
    keywords: ['ui', 'ux', 'design', 'user interface', 'user experience', 'interface design', 'usability', 'wireframe', 'prototype'],
    response: 'Our UI/UX design services focus on creating intuitive, engaging, and accessible interfaces. We follow user-centered design principles to ensure your digital products are both beautiful and functional. Our design process includes research, wireframing, prototyping, and user testing to create designs that delight your users and achieve your business goals. Would you like to see some examples of our design work?'
  },
  {
    keywords: ['ecommerce', 'e-commerce', 'online store', 'shop', 'shopping', 'sell online', 'online business', 'marketplace'],
    response: 'We develop e-commerce solutions using platforms like Shopify, WooCommerce, and custom implementations. Our e-commerce sites include features like secure payment processing, inventory management, customer analytics, and mobile optimization. We can help you set up a new online store or improve an existing one to increase sales and customer satisfaction. What kind of products do you sell or plan to sell online?'
  },
  {
    keywords: ['digital transformation', 'digitization', 'modernize', 'automation', 'digital strategy', 'digital adoption'],
    response: 'Our digital transformation services help businesses modernize their operations through technology. This includes process automation, data analytics, cloud migration, and implementing digital workflows. We work with you to identify opportunities for improvement and implement solutions that increase efficiency and competitiveness in the digital age. Would you like to discuss how we can help transform your business?'
  }
];

export const pricing: ChatbotResponse = {
  keywords: ['price', 'pricing', 'cost', 'how much', 'rates', 'quote', 'estimate', 'budget', 'fee', 'charge', 'expensive', 'affordable', 'cheap'],
  response: 'Our pricing depends on the scope and requirements of your project. We offer competitive rates and flexible engagement models including fixed-price projects, time and materials, and dedicated teams. For web development, basic websites typically start at $3,000, while complex web applications can range from $10,000 to $50,000+. Mobile apps typically start at $15,000. Would you like to discuss your specific project for a custom quote?'
};

export const contactInfo: ChatbotResponse = {
  keywords: ['contact', 'email', 'phone', 'reach', 'get in touch', 'talk to', 'call', 'number', 'address', 'location', 'office'],
  response: 'You can reach us via email at info@dreampathsolutions.com, by phone at +1 (831) 295-5365, or through WhatsApp at +1 (806) 240-7920. Our main office is located in Silicon Valley, California, with a development center in Bangalore, India. Would you like to speak with a team member now?'
};

export const timeline: ChatbotResponse = {
  keywords: ['timeline', 'how long', 'time frame', 'deadline', 'delivery', 'when can you', 'duration', 'schedule', 'complete', 'finish'],
  response: 'Project timelines vary based on complexity and requirements. A simple website might take 4-6 weeks, while complex applications can take several months. Mobile apps typically require 3-6 months from concept to launch. E-commerce sites usually take 2-4 months depending on complexity. We\'ll provide a detailed timeline after understanding your specific needs. Would you like to discuss your project timeline?'
};

export const process: ChatbotResponse = {
  keywords: ['process', 'how do you work', 'methodology', 'approach', 'steps', 'workflow', 'procedure', 'development process'],
  response: 'Our development process includes: 1) Discovery & Requirements - We learn about your business and project needs; 2) Design & Prototyping - We create wireframes and visual designs; 3) Development - Our engineers build the solution; 4) Testing & QA - We ensure quality and performance; 5) Deployment - We launch your solution; and 6) Ongoing Support & Maintenance. We follow agile methodologies and keep you involved throughout the process with regular updates and feedback sessions.'
};

export const technology: ChatbotResponse = {
  keywords: ['technology', 'tech stack', 'framework', 'programming', 'language', 'platform', 'tools', 'software', 'development tools'],
  response: 'We work with a wide range of technologies including React, Angular, Vue.js, Node.js, Python, PHP, .NET, AWS, Azure, React Native, Flutter, and more. For databases, we use MySQL, PostgreSQL, MongoDB, and Firebase. Our technology choices are guided by your project requirements and long-term goals, ensuring we select the best tools for your specific needs. Is there a particular technology you\'re interested in?'
};

export const portfolio: ChatbotResponse = {
  keywords: ['portfolio', 'examples', 'previous work', 'case studies', 'projects', 'clients', 'showcase', 'work', 'sample'],
  response: 'We have worked on diverse projects across industries including healthcare, finance, education, e-commerce, and entertainment. Our portfolio includes mobile apps for healthcare providers, e-commerce platforms for retail businesses, custom CRM systems for financial services, and educational platforms for schools and universities. Would you like to see specific examples of our work in your industry?'
};

export const team: ChatbotResponse = {
  keywords: ['team', 'developers', 'staff', 'employees', 'experts', 'specialists', 'who works', 'company size'],
  response: 'Our team consists of experienced designers, developers, project managers, and QA specialists. We have over 50 professionals with expertise in various technologies and domains. Our team members have an average of 5+ years of experience in software development and have worked on projects for clients ranging from startups to Fortune 500 companies. Would you like to know more about our team\'s expertise in a specific area?'
};

export const support: ChatbotResponse = {
  keywords: ['support', 'maintenance', 'after launch', 'updates', 'bugs', 'issues', 'help', 'assistance'],
  response: 'We provide comprehensive support and maintenance services after your project launches. This includes bug fixes, security updates, performance optimization, and feature enhancements. We offer various support packages ranging from basic maintenance to 24/7 dedicated support, depending on your needs. Our goal is to ensure your solution continues to perform optimally and evolves with your business needs.'
};

export const security: ChatbotResponse = {
  keywords: ['security', 'secure', 'protection', 'data protection', 'privacy', 'encryption', 'compliance', 'gdpr', 'hipaa'],
  response: 'Security is a top priority in all our development work. We implement industry best practices for secure coding, data encryption, and protection against common vulnerabilities. Our solutions can be built to comply with regulations like GDPR, HIPAA, and PCI DSS depending on your requirements. We also conduct security audits and testing to ensure your application is protected against potential threats.'
};

export const fallbackResponses: string[] = [
  "I couldn't understand your query. Would you like to connect with an agent?",
  "I'm not sure I understand. Would you like to connect with an agent?",
  "I don't have information on that specific topic. Would you like to speak with a team member?",
  "That's a great question that might need a more detailed answer from our team. Would you like me to connect you with someone?",
  "I'm a simple assistant and might not have all the answers. Would you like to chat with a human agent?"
];

export const connectToAgentResponses: string[] = [
  "For immediate assistance, please reach out via WhatsApp at +1 (806) 240-7920 or click this link: https://wa.me/18062407920",
  "Our team is available on WhatsApp to help with your specific needs. Contact us at +1 (806) 240-7920 or click: https://wa.me/18062407920",
  "For personalized assistance, please contact our team on WhatsApp at +1 (806) 240-7920 or click: https://wa.me/18062407920",
  "Our experts are ready to assist you on WhatsApp. Reach us at +1 (806) 240-7920 or click: https://wa.me/18062407920"
];

export const whatsappFallback: string = 
  "It seems our team members are currently unavailable. For immediate assistance, please reach out via WhatsApp at +1 (806) 240-7920 or click this link: https://wa.me/18062407920";

export const whatsappDirectLink: string = "https://wa.me/+18062407920";

export const greetings: string[] = [
  "Hello! How can I help you today?",
  "Hi there! Welcome to DreamPath Solutions. What can I assist you with?",
  "Welcome! I'm your virtual assistant. How may I help you?",
  "Greetings! I'm here to answer your questions about DreamPath Solutions."
];

// All responses combined for easy searching
export const allResponses: ChatbotResponse[] = [
  ...casualConversation,
  businessHours,
  ...services,
  pricing,
  contactInfo,
  timeline,
  process,
  technology,
  portfolio,
  team,
  support,
  security
];

// Function to find the best matching response
export function findBestResponse(userInput: string): string {
  const input = userInput.toLowerCase().trim();
  
  // Handle empty or very short inputs
  if (input.length < 2) {
    return "I didn't catch that. Could you please provide more details or ask a specific question?";
  }
  
  // Split input into words for better matching
  const inputWords = input.split(/\s+/);
  
  // Track best match and its score
  let bestResponse: ChatbotResponse | null = null;
  let highestScore = 0;
  
  // Check each response for keyword matches
  for (const response of allResponses) {
    let currentScore = 0;
    
    for (const keyword of response.keywords) {
      // Exact phrase match gets highest score
      if (input.includes(keyword.toLowerCase())) {
        currentScore += keyword.split(/\s+/).length * 2; // Weight by number of words in keyword
      } else {
        // Check for individual word matches
        const keywordWords = keyword.toLowerCase().split(/\s+/);
        for (const keywordWord of keywordWords) {
          if (keywordWord.length > 3 && inputWords.includes(keywordWord)) { // Only count significant words
            currentScore += 1;
          }
        }
      }
    }
    
    // Update best match if current score is higher
    if (currentScore > highestScore) {
      highestScore = currentScore;
      bestResponse = response;
    }
  }
  
  // Return the best match if score is above threshold, otherwise fallback
  if (bestResponse && highestScore > 0) {
    return bestResponse.response;
  }
  
  // If no match is found, return a random fallback response
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
}
