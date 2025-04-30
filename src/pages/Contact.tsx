
import React from "react";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

// Define the form schema with validation
const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^\+?[0-9\-\s()]{10,15}$/, { 
    message: "Please enter a valid phone number (10-15 digits)." 
  }),
  company: z.string().optional(),
  service: z.string({
    required_error: "Please select a service you're interested in.",
  }),
  budget: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

// Define the type based on the schema
type FormValues = z.infer<typeof formSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize the form with react-hook-form and zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      service: "",
      budget: "",
      message: "",
    },
  });

  // Handle form submission
  const handleSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      // Initiate Supabase client - in production, you should use environment variables
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
      const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Insert data into the user_requirements table
      const { error } = await supabase
        .from('user_requirements')
        .insert([
          { 
            first_name: data.firstName,
            last_name: data.lastName,
            email: data.email,
            phone: data.phone,
            company: data.company,
            service_interested: data.service,
            budget_range: data.budget,
            message: data.message,
            status: 'new' 
          }
        ]);

      if (error) throw error;

      // Show success toast
      toast({
        title: "Form submitted successfully",
        description: "We'll get back to you as soon as possible.",
      });

      // Reset the form
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // Show error toast
      toast({
        title: "Error",
        description: "There was a problem submitting your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="bg-gray-50 p-6 md:p-8 rounded-lg order-1 lg:order-1">
              <h2 className="text-2xl font-bold mb-6 text-dreampath-primary">Send Us a Message</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your first name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your last name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email address" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your phone number (e.g., 123-456-7890)" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="service"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Interested In *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a service" />
                            </SelectTrigger>
                          </FormControl>
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget Range</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a budget range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="500-2000">$500 - $2,000</SelectItem>
                            <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                            <SelectItem value="5000-10000">$5,000 - $10,000</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about your project and requirements" 
                            className="min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-dreampath-primary hover:bg-dreampath-dark"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div className="order-2 lg:order-2">
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
                    <p className="text-gray-700">+1 (806) 240-7920</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-dreampath-secondary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-700">info@dreampathsolutions.in</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-dreampath-secondary mr-4 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold">Office</h3>
                    <p className="text-gray-700">
                      10214 Maremont Cir<br />
                      Richmond VA, 23238-3604<br />
                      United States
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
