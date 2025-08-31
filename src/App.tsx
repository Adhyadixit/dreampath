import React, { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BackToTopButton from "./components/common/BackToTopButton";

// Lazy-load routed index and chat widget
const Index = lazy(() => import("./pages/Index"));
const LazyChatWidget = lazy(() => import("./components/chat/ChatWidget"));

const queryClient = new QueryClient();

const App = () => {
  // Gate ChatWidget loading until after page is idle or after a short delay
  const [loadChat, setLoadChat] = useState(false);

  useEffect(() => {
    const onIdle = (cb: () => void) => {
      if ((window as any).requestIdleCallback) {
        (window as any).requestIdleCallback(cb, { timeout: 2000 });
      } else {
        setTimeout(cb, 1500);
      }
    };
    // Also allow user interaction to trigger
    const onFirstInteraction = () => setLoadChat(true);
    window.addEventListener("scroll", onFirstInteraction, { once: true, passive: true });
    window.addEventListener("pointerdown", onFirstInteraction, { once: true });
    window.addEventListener("keydown", onFirstInteraction, { once: true });

    onIdle(() => setLoadChat(true));

    return () => {
      window.removeEventListener("scroll", onFirstInteraction as any);
      window.removeEventListener("pointerdown", onFirstInteraction as any);
      window.removeEventListener("keydown", onFirstInteraction as any);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={null}>
                <Index />
              </Suspense>
            </main>
            <Footer />
            <Toaster />
            <Sonner />
            <BackToTopButton />
            {loadChat && (
              <Suspense fallback={null}>
                <LazyChatWidget />
              </Suspense>
            )}
          </div>
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
