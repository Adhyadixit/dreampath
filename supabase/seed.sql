-- Insert initial project data
INSERT INTO projects (title, category, image, link, description, technologies)
VALUES
  ('Petrosia - Oil & Gas Solutions', 'web', 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=870&auto=format&fit=crop', 'https://petrosia.in', 'A comprehensive digital platform for an oil and gas company, featuring interactive dashboards and real-time data visualization tools for monitoring operations.', '["React", "Node.js", "D3.js", "MongoDB"]'),
  ('NerdyNuts - Tech Blog', 'web', 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=872&auto=format&fit=crop', 'https://nerdynuts.com', 'A modern tech blog with a custom CMS, advanced search functionality, and optimized reading experience for tech enthusiasts and professionals.', '["WordPress", "PHP", "MySQL", "ElasticSearch"]'),
  ('American Forces Travel', 'web', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=874&auto=format&fit=crop', 'https://www.americanforcestravel.com/', 'A travel booking platform exclusively for military personnel, featuring discounted rates, secure authentication, and specialized travel options.', '["Angular", "Java Spring Boot", "PostgreSQL", "AWS"]'),
  ('Riva Fin Corp - Financial Services', 'web', 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115&auto=format&fit=crop', 'https://rivafincorp.online', 'A secure financial services platform with client portals, document management, and integrated payment processing for a growing fintech company.', '["React", "Next.js", "TypeScript", "Stripe API"]'),
  ('Wanderlust - Travel Planning App', 'mobile', 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=870&auto=format&fit=crop', 'https://play.google.com/store', 'An all-in-one travel planning app with itinerary management, offline maps, budget tracking, and social sharing features for travelers.', '["React Native", "Firebase", "Google Maps API", "Redux"]'),
  ('ConnectMe - Dating Application', 'mobile', 'https://images.unsplash.com/photo-1516500896641-5949695ecb2e?q=80&w=772&auto=format&fit=crop', 'https://apps.apple.com/', 'A modern dating app with advanced matching algorithms, video chat features, and robust security measures to ensure authentic connections.', '["Swift", "Kotlin", "WebRTC", "MongoDB"]'),
  ('HealthTrack - Wellness Platform', 'mobile', 'https://images.unsplash.com/photo-1594882645126-14020914d58d?q=80&w=885&auto=format&fit=crop', 'https://apps.apple.com/', 'A comprehensive health tracking application that integrates with wearable devices, offering personalized insights and coaching for users wellness journeys.', '["Flutter", "Firebase", "HealthKit API", "Google Fit API"]');

-- Insert contact info
INSERT INTO contact_info (email, phone, address, map_embed_url, whatsapp_phone)
VALUES ('info@dreampathsolutions.in', '+1 (831) 295-5365', '10214 Maremont Cir Richmond VA, 23238-3604 United States', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.6495767312993!2d-122.08403558439696!3d37.42199997982631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x29cdf01a44fc687f!2sGoogle%20Building%2040!5e0!3m2!1sen!2sus!4v1651258593640!5m2!1sen!2sus', '+1 (806) 240-7920');

-- Insert social links
INSERT INTO social_links (platform, url)
VALUES
  ('facebook', 'https://facebook.com/dreampath'),
  ('twitter', 'https://twitter.com/dreampath'),
  ('linkedin', 'https://linkedin.com/company/dreampath'),
  ('instagram', 'https://instagram.com/dreampath');

-- Insert hero content
INSERT INTO hero_content (title, subtitle, show_cta, cta_text, cta_link, background_type, image_url)
VALUES (
  'Transform Your Business with Custom Software Solutions',
  'We build innovative, scalable, and high-performance software to help businesses thrive in the digital world.',
  true,
  'Start Your Project',
  '/contact',
  'image',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1920&auto=format&fit=crop'
);
