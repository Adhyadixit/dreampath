import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { getHeroContent, updateHeroContent } from "@/lib/api";
import { HeroContent } from "../../lib/types";

export const HeroManager = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  // Hero data state
  const [heroData, setHeroData] = useState<HeroContent | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<HeroContent | null>(null);

  // Fetch hero content on component mount
  useEffect(() => {
    const fetchHeroContent = async () => {
      try {
        const data = await getHeroContent();
        setHeroData(data);
        setEditData(data);
      } catch (error) {
        console.error("Error fetching hero content:", error);
        toast({
          title: "Error",
          description: "Failed to load hero content",
          variant: "destructive"
        });
        
        // Default data as fallback
        const defaultData: HeroContent = {
          id: 1,
          title: "Transforming Ideas into Digital Reality",
          subtitle: "Web Development & Software Solutions",
          description: "We create innovative digital solutions that help businesses grow, engage customers, and achieve their goals. Our expertise spans web development, mobile apps, and custom software.",
          video_url: null,
          image_url: "https://images.unsplash.com/photo-1573164713988-8665fc963095",
          cta_text: "Get Started",
          cta_url: "/contact",
          created_at: new Date().toISOString()
        };
        
        setHeroData(defaultData);
        setEditData(defaultData);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchHeroContent();
  }, [toast]);

  const handleEdit = () => {
    if (heroData) {
      setEditData({...heroData});
      setIsEditing(true);
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editData) return;
    
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editData) return;
    
    try {
      setIsLoading(true);
      await updateHeroContent(editData);
      setHeroData(editData);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Hero section updated successfully",
      });
    } catch (error) {
      console.error("Error updating hero content:", error);
      toast({
        title: "Error",
        description: "Failed to update hero content",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCancel = () => {
    setEditData(heroData);
    setIsEditing(false);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin h-8 w-8 border-4 border-dreampath-primary border-t-transparent rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!heroData) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center p-4">
            <p>Error loading hero content. Please try again.</p>
            <Button onClick={() => window.location.reload()} className="mt-2">Reload</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-dreampath-primary">Hero Section Manager</h2>
          {!isEditing && (
            <Button onClick={handleEdit} size="sm" variant="outline" disabled={isLoading}>Edit Content</Button>
          )}
        </div>
        
        {isEditing && editData ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={editData.title} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input id="subtitle" name="subtitle" value={editData.subtitle} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" value={editData.description} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="video_url">Video URL (YouTube embed URL)</Label>
              <Input id="video_url" name="video_url" value={editData.video_url || ''} onChange={handleChange} placeholder="https://www.youtube.com/embed/..." />
              <p className="text-xs text-gray-500">Leave empty to use an image instead</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL (Only used if no video URL is provided)</Label>
              <Input id="image_url" name="image_url" value={editData.image_url || ''} onChange={handleChange} placeholder="https://example.com/image.jpg" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cta_text">CTA Button Text</Label>
              <Input id="cta_text" name="cta_text" value={editData.cta_text} onChange={handleChange} required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cta_url">CTA Button URL</Label>
              <Input id="cta_url" name="cta_url" value={editData.cta_url} onChange={handleChange} required />
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <Button type="button" variant="outline" onClick={handleCancel} disabled={isLoading}>Cancel</Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span> Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-gray-700">Title</h3>
              <p>{heroData.title}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Subtitle</h3>
              <p>{heroData.subtitle}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Description</h3>
              <p>{heroData.description}</p>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Media</h3>
              <p>{heroData.video_url ? 'Video' : (heroData.image_url ? 'Image' : 'None')}</p>
              {heroData.video_url && <p className="text-sm text-gray-500">{heroData.video_url}</p>}
              {!heroData.video_url && heroData.image_url && <p className="text-sm text-gray-500">{heroData.image_url}</p>}
            </div>
            
            <div>
              <h3 className="font-medium text-gray-700">Call to Action</h3>
              <p>{heroData.cta_text} → {heroData.cta_url}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
