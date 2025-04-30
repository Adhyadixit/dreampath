import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const UserAccount = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Profile form state
  const [profile, setProfile] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "",
    phone: "",
    company: ""
  });

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = () => {
      const email = localStorage.getItem("userEmail");
      const isLoggedIn = !!email && localStorage.getItem("isAdmin") !== "true";
      
      if (!isLoggedIn) {
        navigate("/login");
        toast.error("Please login to access your account");
      } else {
        setIsAuthenticated(true);
        setUserEmail(email);
        setProfile(prev => ({...prev, email}));
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/login");
    toast.info("Logged out successfully");
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would update the profile in Supabase
    toast.success("Profile updated successfully");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin h-10 w-10 border-4 border-dreampath-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Navigate will redirect, this prevents flash of content
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader 
        title="My Account" 
        description="Manage your personal information and preferences"
      />
      
      <div className="container-wide py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-dreampath-primary">Welcome, {userEmail}</h2>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
        
        <Tabs defaultValue="profile" className="w-full">
          <div className="mb-8 border-b">
            <TabsList className="mx-auto">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="projects">My Projects</TabsTrigger>
              <TabsTrigger value="settings">Account Settings</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input 
                        id="firstName" 
                        value={profile.firstName} 
                        onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input 
                        id="lastName" 
                        value={profile.lastName} 
                        onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profile.email} 
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      readOnly
                    />
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={profile.phone} 
                      onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Company (Optional)</Label>
                    <Input 
                      id="company" 
                      value={profile.company} 
                      onChange={(e) => setProfile({...profile, company: e.target.value})}
                    />
                  </div>
                  
                  <Button type="submit" className="bg-dreampath-primary hover:bg-dreampath-dark">
                    Update Profile
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>My Projects</CardTitle>
                <CardDescription>Track your projects with DreamPath Solutions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">You don't have any active projects yet.</p>
                  <Button onClick={() => navigate("/contact")} variant="outline">
                    Start a New Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Email Notifications</h3>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="marketingEmails" 
                      className="mr-2 h-4 w-4" 
                      defaultChecked 
                    />
                    <Label htmlFor="marketingEmails">
                      Receive updates about new services and promotions
                    </Label>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="font-medium mb-2 text-red-600">Danger Zone</h3>
                  <Button 
                    variant="destructive" 
                    onClick={() => toast.error("This feature is not available in the demo")}
                  >
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UserAccount;
