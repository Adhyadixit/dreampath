
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface HeroProps {
  title: string;
  subtitle: string;
  showCta?: boolean;
  ctaText?: string;
  ctaLink?: string;
  bgClass?: string;
  videoUrl?: string;
  youtubeVideoId?: string;
  imageUrl?: string;
}

const Hero = ({
  title,
  subtitle,
  showCta = true,
  ctaText = "Get Started",
  ctaLink = "/contact",
  bgClass = "bg-gradient-to-r from-dreampath-primary to-dreampath-dark",
  videoUrl,
  youtubeVideoId,
  imageUrl,
}: HeroProps) => {
  return (
    <div className="relative text-white">
      {imageUrl ? (
        // Image background
        <>
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <img 
              src={imageUrl}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
            {/* Overlay to ensure text is readable over image */}
            <div className="absolute inset-0 bg-black opacity-60"></div>
          </div>
          
          {/* Content */}
          <div className="relative py-16 md:py-32">
            <div className="container-wide">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
                <p className="text-lg md:text-xl mb-8 text-gray-100">{subtitle}</p>
                {showCta && (
                  <Link to={ctaLink}>
                    <Button className="bg-white text-dreampath-primary hover:bg-gray-100 text-lg px-8 py-6">
                      {ctaText}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      ) : youtubeVideoId ? (
        // YouTube video background
        <>
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <div className="relative w-full h-full pb-[56.25%] overflow-hidden">
              <iframe 
                className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none"
                src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${youtubeVideoId}&showinfo=0&rel=0&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              {/* Overlay to ensure text is readable over video */}
              <div className="absolute inset-0 bg-black opacity-60"></div>
            </div>
          </div>
          
          {/* Content */}
          <div className="relative py-16 md:py-32">
            <div className="container-wide">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
                <p className="text-lg md:text-xl mb-8 text-gray-100">{subtitle}</p>
                {showCta && (
                  <Link to={ctaLink}>
                    <Button className="bg-white text-dreampath-primary hover:bg-gray-100 text-lg px-8 py-6">
                      {ctaText}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      ) : videoUrl ? (
        // Local video background
        <>
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <video 
              className="absolute min-w-full min-h-full object-cover"
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {/* Overlay to ensure text is readable over video */}
            <div className="absolute inset-0 bg-black opacity-60"></div>
          </div>
          
          {/* Content */}
          <div className="relative py-16 md:py-32">
            <div className="container-wide">
              <div className="max-w-3xl mx-auto text-center">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
                <p className="text-lg md:text-xl mb-8 text-gray-100">{subtitle}</p>
                {showCta && (
                  <Link to={ctaLink}>
                    <Button className="bg-white text-dreampath-primary hover:bg-gray-100 text-lg px-8 py-6">
                      {ctaText}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        // Traditional gradient background
        <div className={`${bgClass} py-16 md:py-24`}>
          <div className="container-wide">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{title}</h1>
              <p className="text-lg md:text-xl mb-8 text-gray-100">{subtitle}</p>
              {showCta && (
                <Link to={ctaLink}>
                  <Button className="bg-white text-dreampath-primary hover:bg-gray-100 text-lg px-8 py-6">
                    {ctaText}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero;
