
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created",
        description: "Check your email to verify your account.",
      });
      // Reset form
      e.currentTarget.reset();
    }, 1500);
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
                  <Input id="firstName" required placeholder="Enter your first name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" required placeholder="Enter your last name" />
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required placeholder="Enter your email address" />
              </div>
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required placeholder="Create a strong password" />
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters with a number and special character
                </p>
              </div>
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" required placeholder="Confirm your password" />
              </div>
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="company">Company (Optional)</Label>
                <Input id="company" placeholder="Enter your company name" />
              </div>
              
              <div className="flex items-center mt-6 space-x-2">
                <Checkbox id="terms" required />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the <Link to="/terms" className="text-dreampath-secondary hover:text-dreampath-primary">Terms of Service</Link> and <Link to="/privacy" className="text-dreampath-secondary hover:text-dreampath-primary">Privacy Policy</Link>
                </label>
              </div>
              
              <div className="flex items-center mt-4 space-x-2">
                <Checkbox id="marketing" />
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
