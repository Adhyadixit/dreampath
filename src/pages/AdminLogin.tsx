import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

const AdminLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    setIsLoading(true);
    
    // Demo admin credentials check
    setTimeout(() => {
      if (email === "admin@dreampathsolutions.in" && password === "Assasin@123") {
        // Store admin status in localStorage (for demo purposes only)
        localStorage.setItem("isAdmin", "true");
        localStorage.setItem("userEmail", email);
        
        toast.success("Logged in as admin");
        // In a real app, use secure session management
        navigate("/admin-dashboard");
      } else {
        toast.error("Invalid admin credentials");
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-dreampath-primary">
          Admin Login
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Login to access the admin dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Admin Access Only</CardTitle>
            <CardDescription>
              Enter your admin credentials to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  placeholder="admin@dreampathsolutions.in" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  placeholder="Enter your admin password" 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-dreampath-primary hover:bg-dreampath-dark" 
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login to Admin"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="text-center justify-center">
            <p className="text-sm text-gray-600">
              Return to <a href="/" className="text-dreampath-secondary hover:text-dreampath-primary font-medium">website homepage</a>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;
