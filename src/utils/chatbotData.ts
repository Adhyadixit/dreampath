// Chatbot data for common questions and answers

export interface ChatbotResponse {
  keywords: string[];
  response: string;
}

export const businessHours: ChatbotResponse = {
  keywords: ['business hours', 'opening hours', 'hours', 'when are you open', 'working hours', 'timing', 'timings'],
  response: 'Our business hours are Monday to Friday, 9:00 AM to 6:00 PM (IST). We are closed on weekends and major holidays.'
};

export const services: ChatbotResponse[] = [
  {
    keywords: ['services', 'what do you offer', 'what services', 'offerings'],
    response: 'We offer a wide range of software development services including: Web Development, Mobile App Development, Custom Software Solutions, UI/UX Design, E-commerce Solutions, and Digital Transformation. What specific service are you interested in?'
  },
  {
    keywords: ['web', 'website', 'web development', 'web app', 'web application'],
    response: 'Our web development services include custom website development, web applications, progressive web apps (PWAs), responsive design, and CMS-based solutions using modern frameworks like React, Angular, and Vue.js.'
  },
  {
    keywords: ['mobile', 'app', 'android', 'ios', 'mobile app', 'mobile application'],
    response: 'We develop native and cross-platform mobile applications for iOS and Android using technologies like React Native, Flutter, and Swift/Kotlin. Our mobile apps are designed for performance, usability, and scalability.'
  },
  {
    keywords: ['custom', 'software', 'custom software', 'bespoke', 'tailored'],
    response: 'We build custom software solutions tailored to your specific business needs. This includes enterprise applications, automation tools, data management systems, and integration solutions.'
  },
  {
    keywords: ['ui', 'ux', 'design', 'user interface', 'user experience'],
    response: 'Our UI/UX design services focus on creating intuitive, engaging, and accessible interfaces. We follow user-centered design principles to ensure your digital products are both beautiful and functional.'
  },
  {
    keywords: ['ecommerce', 'e-commerce', 'online store', 'shop', 'shopping'],
    response: 'We develop e-commerce solutions using platforms like Shopify, WooCommerce, and custom implementations. Our e-commerce sites include features like secure payment processing, inventory management, and customer analytics.'
  }
];

export const pricing: ChatbotResponse = {
  keywords: ['price', 'pricing', 'cost', 'how much', 'rates', 'quote', 'estimate'],
  response: 'Our pricing depends on the scope and requirements of your project. We offer competitive rates and flexible engagement models including fixed-price projects, time and materials, and dedicated teams. Would you like to discuss your specific project for a custom quote?'
};

export const contactInfo: ChatbotResponse = {
  keywords: ['contact', 'email', 'phone', 'reach', 'get in touch', 'talk to'],
  response: 'You can reach us via email at info@dreampathsolutions.com, by phone at +1 (831) 295-5365, or through WhatsApp at +1 (806) 240-7920. Would you like to speak with a team member now?'
};

export const timeline: ChatbotResponse = {
  keywords: ['timeline', 'how long', 'time frame', 'deadline', 'delivery', 'when can you'],
  response: 'Project timelines vary based on complexity and requirements. A simple website might take 4-6 weeks, while complex applications can take several months. We\'ll provide a detailed timeline after understanding your specific needs. Would you like to discuss your project timeline?'
};

export const process: ChatbotResponse = {
  keywords: ['process', 'how do you work', 'methodology', 'approach', 'steps'],
  response: 'Our development process includes: 1) Discovery & Requirements, 2) Design & Prototyping, 3) Development, 4) Testing & QA, 5) Deployment, and 6) Ongoing Support & Maintenance. We follow agile methodologies and keep you involved throughout the process.'
};

export const technology: ChatbotResponse = {
  keywords: ['technology', 'tech stack', 'framework', 'programming', 'language', 'platform'],
  response: 'We work with a wide range of technologies including React, Angular, Vue.js, Node.js, Python, PHP, .NET, AWS, Azure, React Native, Flutter, and more. Our technology choices are guided by your project requirements and long-term goals.'
};

export const portfolio: ChatbotResponse = {
  keywords: ['portfolio', 'examples', 'previous work', 'case studies', 'projects'],
  response: 'We have worked on diverse projects across industries including healthcare, finance, education, e-commerce, and entertainment. Would you like to see specific examples of our work in your industry?'
};

export const fallbackResponses: string[] = [
  "I'm not sure I understand. Could you rephrase your question?",
  "I don't have information on that specific topic. Would you like to speak with a team member?",
  "That's a great question that might need a more detailed answer from our team. Would you like me to connect you with someone?",
  "I'm a simple assistant and might not have all the answers. Would you like to chat with a human agent?",
  "I'm still learning! That question might be better answered by our team. Would you like me to connect you?"
];

export const connectToAgentResponses: string[] = [
  "I'll connect you with a team member right away. Please wait a moment...",
  "Let me get a human agent to assist you better. One moment please...",
  "I'm transferring you to a team member who can help with your specific needs. Please wait...",
  "A team member will join this chat shortly to provide you with more detailed information."
];

export const whatsappFallback: string = 
  "It seems our team members are currently unavailable. For immediate assistance, please reach out via WhatsApp at +1 (806) 240-7920 or click this link: https://wa.me/18062407920";

export const greetings: string[] = [
  "Hello! How can I help you today?",
  "Hi there! Welcome to DreamPath Solutions. What can I assist you with?",
  "Welcome! I'm your virtual assistant. How may I help you?",
  "Greetings! I'm here to answer your questions about DreamPath Solutions."
];

// All responses combined for easy searching
export const allResponses: ChatbotResponse[] = [
  businessHours,
  ...services,
  pricing,
  contactInfo,
  timeline,
  process,
  technology,
  portfolio
];

// Function to find the best matching response
export function findBestResponse(userInput: string): string {
  const input = userInput.toLowerCase();
  
  // Check each response for keyword matches
  for (const response of allResponses) {
    for (const keyword of response.keywords) {
      if (input.includes(keyword.toLowerCase())) {
        return response.response;
      }
    }
  }
  
  // If no match is found, return a random fallback response
  return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
};
