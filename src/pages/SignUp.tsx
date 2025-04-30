
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    company: "",
    terms: false,
    marketing: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Basic validation
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    if (!formData.terms) {
      toast({
        title: "Error",
        description: "You must agree to the Terms of Service.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }
    
    try {
      // In a real app, this would register with Supabase Auth
      // const { data, error } = await supabase.auth.signUp({ email: formData.email, password: formData.password });
      
      // For demo purposes, we're simulating a successful signup
      
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      
      // Store the email in localStorage for demo purposes
      localStorage.setItem("userEmail", formData.email);
      
      // Redirect to user account
      setTimeout(() => {
        navigate('/account');
      }, 1000);
      
    } catch (error) {
      console.error("Error signing up:", error);
      toast({
        title: "Sign up failed",
        description: "There was an error creating your account.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-dreampath-primary">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Join DreamPath Solutions to start your project and get exclusive updates
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Fill in your details to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input 
                    id="firstName" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required 
                    placeholder="Enter your first name" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input 
                    id="lastName" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required 
                    placeholder="Enter your last name" 
                  />
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  placeholder="Enter your email address" 
                />
              </div>
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  name="password"
                  type="password" 
                  value={formData.password}
                  onChange={handleChange}
                  required 
                  placeholder="Create a strong password" 
                />
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters with a number and special character
                </p>
              </div>
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  name="confirmPassword"
                  type="password" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required 
                  placeholder="Confirm your password" 
                />
              </div>
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input 
                  id="company" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter your company name" 
                />
              </div>
              
              <div className="flex items-center mt-6 space-x-2">
                <Checkbox 
                  id="terms" 
                  name="terms"
                  checked={formData.terms}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, terms: checked as boolean }))}
                  required 
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <Link to="/terms" className="text-dreampath-secondary hover:text-dreampath-primary">Terms of Service</Link> and <Link to="/privacy" className="text-dreampath-secondary hover:text-dreampath-primary">Privacy Policy</Link>
                </label>
              </div>
              
              <div className="flex items-center mt-4 space-x-2">
                <Checkbox 
                  id="marketing" 
                  name="marketing"
                  checked={formData.marketing}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, marketing: checked as boolean }))}
                />
                <label htmlFor="marketing" className="text-sm text-gray-600">
                  I want to receive news, updates and offers from DreamPath Solutions
                </label>
              </div>
              
              <Button type="submit" className="w-full mt-6 bg-dreampath-primary hover:bg-dreampath-dark" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
              Already have an account? <Link to="/login" className="text-dreampath-secondary hover:text-dreampath-primary font-medium">Log in</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;
