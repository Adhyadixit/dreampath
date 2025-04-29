
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface HeroContent {
  title: string;
  subtitle: string;
  showCta: boolean;
  ctaText: string;
  ctaLink: string;
  videoUrl: string;
  youtubeVideoId: string;
  useVideo: boolean;
  videoType: 'none' | 'file' | 'youtube';
}

export const HeroManager = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "Transform Your Business with Custom Software Solutions",
    subtitle: "We build innovative, scalable, and high-performance software to help businesses thrive in the digital world.",
    showCta: true,
    ctaText: "Start Your Project",
    ctaLink: "/contact",
    videoUrl: "https://player.vimeo.com/external/449759244.hd.mp4?s=d5f3da46ddc17aa69a7de84f1e420610ecea5106&profile_id=175",
    youtubeVideoId: "P8gB0vM6i7o",
    useVideo: true,
    videoType: 'youtube'
  });
  
  const handleSave = () => {
    // In a real app, you would save this to your backend
    toast.success("Hero content updated successfully");
    console.log("Updated hero content:", heroContent);
  };

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
  };
  
  const handleYoutubeUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    const id = extractYoutubeId(url);
    setHeroContent({...heroContent, youtubeVideoId: id || url});
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Hero Section Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={heroContent.title} 
                onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Textarea 
                id="subtitle" 
                value={heroContent.subtitle} 
                onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                rows={2}
              />
            </div>
            
            <div className="md:col-span-2">
              <Label className="mb-2 block">Background Type</Label>
              <Tabs 
                defaultValue={heroContent.videoType} 
                onValueChange={(value) => setHeroContent({
                  ...heroContent, 
                  videoType: value as 'none' | 'file' | 'youtube',
                  useVideo: value !== 'none'
                })}
                className="w-full"
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="none">Gradient</TabsTrigger>
                  <TabsTrigger value="file">Video File</TabsTrigger>
                  <TabsTrigger value="youtube">YouTube</TabsTrigger>
                </TabsList>
                <TabsContent value="file" className="pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="videoUrl">Video URL (MP4 format recommended)</Label>
                    <Input 
                      id="videoUrl" 
                      value={heroContent.videoUrl} 
                      onChange={(e) => setHeroContent({...heroContent, videoUrl: e.target.value})}
                      placeholder="https://example.com/video.mp4"
                    />
                    <p className="text-xs text-muted-foreground">Enter the direct URL to your video file</p>
                  </div>
                </TabsContent>
                <TabsContent value="youtube" className="pt-4">
                  <div className="space-y-2">
                    <Label htmlFor="youtubeUrl">YouTube Video URL or ID</Label>
                    <Input 
                      id="youtubeUrl" 
                      value={heroContent.youtubeVideoId} 
                      onChange={handleYoutubeUrlChange}
                      placeholder="https://www.youtube.com/watch?v=XXXXXXXXXXX or XXXXXXXXXXX"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter either the full YouTube URL or just the video ID (the part after v= in the URL)
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="showCta" 
                checked={heroContent.showCta}
                onCheckedChange={(checked) => setHeroContent({...heroContent, showCta: checked})}
              />
              <Label htmlFor="showCta">Show call-to-action button</Label>
            </div>
            
            {heroContent.showCta && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="ctaText">Button Text</Label>
                  <Input 
                    id="ctaText" 
                    value={heroContent.ctaText} 
                    onChange={(e) => setHeroContent({...heroContent, ctaText: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ctaLink">Button Link</Label>
                  <Input 
                    id="ctaLink" 
                    value={heroContent.ctaLink} 
                    onChange={(e) => setHeroContent({...heroContent, ctaLink: e.target.value})}
                  />
                </div>
              </>
            )}
          </div>
          
          <div className="pt-4">
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="relative">
              {heroContent.videoType === 'youtube' ? (
                <div className="relative w-full pb-[56.25%] bg-black">
                  <div className="absolute inset-0 bg-black">
                    <div className="w-full h-full relative overflow-hidden">
                      <iframe 
                        className="absolute inset-0 w-full h-full object-cover"
                        src={`https://www.youtube.com/embed/${heroContent.youtubeVideoId}?autoplay=0&mute=1&controls=0&loop=1&playlist=${heroContent.youtubeVideoId}&showinfo=0&rel=0&modestbranding=1`}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center max-w-2xl p-6">
                      <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">{heroContent.title}</h2>
                      <p className="text-gray-100 mb-6">{heroContent.subtitle}</p>
                      {heroContent.showCta && (
                        <Button className="bg-white text-dreampath-primary hover:bg-gray-100">
                          {heroContent.ctaText}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : heroContent.videoType === 'file' ? (
                <div className="relative w-full pb-[56.25%] bg-black">
                  <video 
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    src={heroContent.videoUrl}
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-center max-w-2xl p-6">
                      <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">{heroContent.title}</h2>
                      <p className="text-gray-100 mb-6">{heroContent.subtitle}</p>
                      {heroContent.showCta && (
                        <Button className="bg-white text-dreampath-primary hover:bg-gray-100">
                          {heroContent.ctaText}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-r from-dreampath-primary to-dreampath-dark p-12 text-center">
                  <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">{heroContent.title}</h2>
                  <p className="text-gray-100 mb-6">{heroContent.subtitle}</p>
                  {heroContent.showCta && (
                    <Button className="bg-white text-dreampath-primary hover:bg-gray-100">
                      {heroContent.ctaText}
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
