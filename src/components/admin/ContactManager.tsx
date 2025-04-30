
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ContactDetails {
  email: string;
  phone: string;
  address: string;
  mapEmbedUrl: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
  };
}

export const ContactManager = () => {
  const [contactDetails, setContactDetails] = useState<ContactDetails>({
    email: "info@dreampathsolutions.in",
    phone: "+1 (831) 295-5365",
    whatsappPhone: "+1 (806) 240-7920",
    address: "10214 Maremont Cir Richmond VA, 23238-3604 United States",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.6495767312993!2d-122.08403558439696!3d37.42199997982631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fba02425dad8f%3A0x29cdf01a44fc687f!2sGoogle%20Building%2040!5e0!3m2!1sen!2sus!4v1651258593640!5m2!1sen!2sus",
    socialLinks: {
      facebook: "https://facebook.com/dreampath",
      twitter: "https://twitter.com/dreampath",
      linkedin: "https://linkedin.com/company/dreampath",
      instagram: "https://instagram.com/dreampath",
    }
  });
  
  const handleSave = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactDetails.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    // Validate phone number
    if (!contactDetails.phone.trim()) {
      toast.error("Phone number is required");
      return;
    }
    
    // In a real app, you would save this to your backend
    toast.success("Contact details updated successfully");
    console.log("Updated contact details:", contactDetails);
    
    // Force the component to re-render with the updated data
    setContactDetails({...contactDetails});
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="contact">
        <TabsList>
          <TabsTrigger value="contact">Contact Information</TabsTrigger>
          <TabsTrigger value="map">Map Location</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
        </TabsList>
        
        <TabsContent value="contact" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    value={contactDetails.email} 
                    onChange={(e) => setContactDetails({...contactDetails, email: e.target.value})}
                    type="email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    value={contactDetails.phone} 
                    onChange={(e) => setContactDetails({...contactDetails, phone: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Office Address</Label>
                  <Textarea 
                    id="address" 
                    value={contactDetails.address} 
                    onChange={(e) => setContactDetails({...contactDetails, address: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSave}>Save Contact Information</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="map" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Map Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mapEmbedUrl">Google Maps Embed URL</Label>
                <Textarea 
                  id="mapEmbedUrl" 
                  value={contactDetails.mapEmbedUrl} 
                  onChange={(e) => setContactDetails({...contactDetails, mapEmbedUrl: e.target.value})}
                  rows={4}
                  placeholder="Paste the Google Maps embed URL here"
                />
                <p className="text-sm text-gray-500">
                  To get an embed URL: Open Google Maps, search your location, click "Share", select "Embed a map", copy the iframe src URL
                </p>
              </div>
              
              <div className="pt-2">
                <Label>Map Preview</Label>
                <div className="mt-2 border rounded-lg overflow-hidden h-80">
                  <iframe 
                    src={contactDetails.mapEmbedUrl}
                    className="w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Office Location"
                  ></iframe>
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSave}>Save Map Location</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="social" className="pt-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook URL</Label>
                  <Input 
                    id="facebook" 
                    value={contactDetails.socialLinks.facebook} 
                    onChange={(e) => setContactDetails({
                      ...contactDetails, 
                      socialLinks: {...contactDetails.socialLinks, facebook: e.target.value}
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter URL</Label>
                  <Input 
                    id="twitter" 
                    value={contactDetails.socialLinks.twitter} 
                    onChange={(e) => setContactDetails({
                      ...contactDetails, 
                      socialLinks: {...contactDetails.socialLinks, twitter: e.target.value}
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input 
                    id="linkedin" 
                    value={contactDetails.socialLinks.linkedin} 
                    onChange={(e) => setContactDetails({
                      ...contactDetails, 
                      socialLinks: {...contactDetails.socialLinks, linkedin: e.target.value}
                    })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram URL</Label>
                  <Input 
                    id="instagram" 
                    value={contactDetails.socialLinks.instagram} 
                    onChange={(e) => setContactDetails({
                      ...contactDetails, 
                      socialLinks: {...contactDetails.socialLinks, instagram: e.target.value}
                    })}
                  />
                </div>
              </div>
              
              <div className="pt-4">
                <Button onClick={handleSave}>Save Social Links</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
