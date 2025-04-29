
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { HeroManager } from "@/components/admin/HeroManager";
import { ContactManager } from "@/components/admin/ContactManager";

// Simple auth check - in a real app, you'd use a proper auth system
const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Simple authentication - in a real app, replace with proper auth
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo credentials - in a real app, use proper auth
    if (username === "admin" && password === "password") {
      setIsAuthenticated(true);
      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid credentials");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader 
          title="Admin Login" 
          description="Please enter your credentials to access the admin panel"
        />
        <div className="container-wide py-12">
          <div className="max-w-md mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Admin Login</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your username"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Login</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="Admin Dashboard" 
        description="Manage your website content"
      />
      
      <div className="container-wide py-8">
        <Tabs defaultValue="portfolio" className="w-full">
          <div className="mb-8 border-b">
            <TabsList className="mx-auto">
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="hero">
            <HeroManager />
          </TabsContent>
          
          <TabsContent value="portfolio">
            <PortfolioManager />
          </TabsContent>
          
          <TabsContent value="contact">
            <ContactManager />
          </TabsContent>
        </Tabs>
        
        <div className="mt-6 text-center">
          <Button 
            variant="outline" 
            onClick={() => {
              setIsAuthenticated(false);
              navigate("/");
              toast.info("Logged out successfully");
            }}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
