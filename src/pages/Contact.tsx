
import React from "react";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real app, you'd send this data to your backend
    toast({
      title: "Message sent",
      description: "We'll get back to you as soon as possible.",
    });
    
    // Reset form
    e.currentTarget.reset();
  };

  return (
    <div>
      <PageHeader 
        title="Contact Us" 
        description="Get in touch with our team to discuss your project or ask any questions"
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-dreampath-primary">Get in Touch</h2>
              <p className="mb-6 text-gray-700">
                We're eager to hear about your project. Fill out the form and one of our experts will contact you 
                to discuss how we can help bring your vision to life.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-dreampath-secondary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Phone</h3>
                    <p className="text-gray-700">+1 (555) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-dreampath-secondary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-700">info@dreampathsolutions.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-dreampath-secondary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Office</h3>
                    <p className="text-gray-700">
                      123 Tech Street, Innovation Park<br />
                      San Francisco, CA 94107
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-6 w-6 text-dreampath-secondary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Business Hours</h3>
                    <p className="text-gray-700">
                      Monday - Friday: 9am - 6pm PST<br />
                      Saturday & Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="rounded-lg overflow-hidden h-64">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43759999999999!3d37.75769999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1649556078576!5m2!1sen!2sus" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-6 text-dreampath-primary">Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input id="firstName" required placeholder="Enter your first name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input id="lastName" required placeholder="Enter your last name" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" required placeholder="Enter your email address" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="Enter your phone number" />
                  </div>
                </div>
                
                <div className="mb-4 space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Enter your company name" />
                </div>
                
                <div className="mb-4 space-y-2">
                  <Label htmlFor="service">Service Interested In *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="mobile">Mobile App Development</SelectItem>
                      <SelectItem value="custom">Custom Software Development</SelectItem>
                      <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                      <SelectItem value="cloud">Cloud Solutions</SelectItem>
                      <SelectItem value="consulting">IT Consulting</SelectItem>
                      <SelectItem value="other">Other Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mb-4 space-y-2">
                  <Label htmlFor="budget">Budget Range</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under10k">Under $10,000</SelectItem>
                      <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                      <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                      <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                      <SelectItem value="over100k">Over $100,000</SelectItem>
                      <SelectItem value="notSure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="mb-6 space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" required placeholder="Tell us about your project and requirements" className="min-h-[120px]" />
                </div>
                
                <Button type="submit" className="w-full bg-dreampath-primary hover:bg-dreampath-dark">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ section */}
      <section className="section-padding bg-gray-50">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-dreampath-primary mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-700">
              Have questions about working with us? Find quick answers to common questions below.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-3">What is your typical process for new projects?</h3>
              <p className="text-gray-600">
                We start with a discovery phase to understand your requirements, followed by planning, design, development, testing, and deployment. Throughout the process, we maintain regular communication and provide updates.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-3">How long does it take to develop a typical project?</h3>
              <p className="text-gray-600">
                Project timelines vary based on complexity and requirements. A simple website might take 4-6 weeks, while a complex application could take several months. We provide detailed timelines during the planning phase.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-3">Do you provide ongoing maintenance and support?</h3>
              <p className="text-gray-600">
                Yes, we offer various maintenance and support packages to ensure your software remains secure, up-to-date, and performing optimally. Our support team is available to address any issues that arise.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-bold text-xl mb-3">How do you handle project pricing?</h3>
              <p className="text-gray-600">
                We offer both fixed-price and time-and-materials pricing models depending on your project's needs. After the initial consultation, we provide detailed proposals with transparent pricing.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
