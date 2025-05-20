import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from '@/lib/supabase';

// Simple form data type
type FormData = {
  name: string;
  email: string;
  phone: string;
  company?: string;
  message: string;
  service?: string;
};

// Facebook Pixel type declaration
declare global {
  interface Window {
    fbq?: (event: string, eventName: string, options?: any) => void;
  }
}

const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
  
  // Set the service from URL if available
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.includes('/services/')) {
        const serviceId = path.split('/').pop();
        if (serviceId) {
          setValue('service', serviceId);
        }
      }
    }
  }, [setValue]);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      console.log('Submitting form with data:', data);
      
      // Basic validation
      if (!data.name || !data.email || !data.phone || !data.message) {
        throw new Error('Please fill in all required fields');
      }
      
      // Save to Supabase
      const { error } = await supabase
        .from('project_inquiries')
        .insert([
          { 
            name: data.name,
            email: data.email,
            phone: data.phone,
            company: data.company || null,
            message: data.message,
            service: data.service || null,
            status: 'new',
            created_at: new Date().toISOString()
          }
        ]);
      
      if (error) throw error;
      
      // Show success message
      toast({
        title: 'Thank you!',
        description: 'We\'ve received your inquiry and will get back to you soon.',
      });
      
      // Track with Facebook Pixel if available
      try {
        if (typeof window !== 'undefined' && window.fbq) {
          window.fbq('track', 'Lead');
        }
      } catch (pixelError) {
        console.error('Error tracking with Facebook Pixel:', pixelError);
      }
      
      // Call success callback
      onSuccess();
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      const errorMessage = error instanceof Error 
        ? error.message 
        : 'There was an error submitting your form. Please try again.';
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
          Full Name *
        </label>
        <Input
          id="name"
          placeholder="John Doe"
          {...register('name', { required: 'Name is required' })}
          className={`w-full ${errors.name ? 'border-red-500' : ''}`}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <Input
            id="email"
            type="email"
            placeholder="email@example.com"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className={`w-full ${errors.email ? 'border-red-500' : ''}`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone *
          </label>
          <Input
            id="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            {...register('phone', { 
              required: 'Phone number is required',
              minLength: { value: 10, message: 'Phone number must be at least 10 digits' }
            })}
            className={`w-full ${errors.phone ? 'border-red-500' : ''}`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
          Company (Optional)
        </label>
        <Input
          id="company"
          placeholder="Company Name"
          {...register('company')}
          className="w-full"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
          Tell us about your project *
        </label>
        <Textarea
          id="message"
          placeholder="Please describe your project requirements, timeline, and any other relevant details."
          className={`min-h-[120px] w-full ${errors.message ? 'border-red-500' : ''}`}
          {...register('message', { 
            required: 'Project details are required',
            minLength: { value: 10, message: 'Please provide more details about your project' }
          })}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
        )}
      </div>
      
      <input type="hidden" {...register('service')} />
      
      <Button 
        type="submit" 
        className="w-full bg-dreampath-primary hover:bg-dreampath-primary/90" 
        size="lg"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting...
          </>
        ) : 'Submit Request'}
      </Button>
    </form>
  )
}

export default RegisterForm;
