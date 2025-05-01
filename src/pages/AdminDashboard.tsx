import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { HeroManager } from "@/components/admin/HeroManager";
import { ContactManager } from "@/components/admin/ContactManager";
import ChatManager from "@/components/admin/ChatManager";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if user is authenticated as admin
  useEffect(() => {
    const checkAuth = () => {
      const isAdmin = localStorage.getItem("isAdmin") === "true";
      
      if (!isAdmin) {
        // Redirect to admin login if not authenticated
        navigate("/admin");
        toast.error("Please login to access the admin dashboard");
      } else {
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    // Clear authentication
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("userEmail");
    
    // Redirect to login page
    navigate("/admin");
    toast.info("Logged out successfully");
  };

  if (!isAuthenticated) {
    // Show loading state while checking authentication
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-dreampath-primary border-t-transparent rounded-full"></div>
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dreampath-primary">Welcome, Admin</h2>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
        
        <Tabs defaultValue="portfolio" className="w-full">
          <div className="mb-8 border-b">
            <TabsList className="mx-auto">
              <TabsTrigger value="hero">Hero Section</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="contact">Contact Details</TabsTrigger>
              <TabsTrigger value="chat">Live Chat</TabsTrigger>
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
          
          <TabsContent value="chat">
            <ChatManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
