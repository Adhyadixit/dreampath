import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/lib/supabase";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if this is an admin login attempt
      if (email === "admin@dreampathsolutions.in" && password === "password") {
        // This is an admin, redirect to admin login
        navigate('/admin');
        return;
      }
      
      // For demo purposes, we're simulating a successful login for any credentials
      // In a real app, you would verify with Supabase auth
      
      // Store the user email in localStorage
      localStorage.setItem("userEmail", email);
      
      toast({
        title: "Login successful",
        description: "Welcome back to DreamPath Solutions.",
      });
      
      // Redirect to user account
      navigate('/account');
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
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
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Access your DreamPath Solutions dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" required placeholder="Enter your email address" />
              </div>
              
              <div className="mt-4 space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required placeholder="Enter your password" />
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <Link to="/forgot-password" className="text-sm text-dreampath-secondary hover:text-dreampath-primary">
                  Forgot your password?
                </Link>
                <p className="text-xs text-gray-500 mt-1">
                  Admin? Use admin@dreampathsolutions.in / password
                </p>
              </div>
              
              <Button type="submit" className="w-full mt-6 bg-dreampath-primary hover:bg-dreampath-dark" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account? <Link to="/signup" className="text-dreampath-secondary hover:text-dreampath-primary font-medium">Sign up</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
