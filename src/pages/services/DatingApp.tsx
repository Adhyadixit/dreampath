import React from "react";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Shield, Smartphone, Video, Users, Heart, MessageSquare } from "lucide-react";
import ContactFormPopup from "@/components/common/ContactFormPopup";

const gallery = [
  // Sample UI screens (replace with your app screenshots as needed)
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1555421689-491a97ff2040?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551281044-8b4e0b8a0e52?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1517817748496-62a0f24c3f56?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1510519122035-7989e0bc29cf?q=80&w=1200&auto=format&fit=crop"
];

const DatingApp: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState("dating-video-chat-apps");

  return (
    <div>
      <PageHeader
        title="Dating & Video Chat Apps"
        description="We design and develop high-converting dating and live video chat apps with secure, scalable backends and delightful UX."
      />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What we build</CardTitle>
                <CardDescription>
                  Feature-rich apps similar to Tinder, Bumble, Hinge with integrated live video chat and moderation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2"><Check className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Swipe, match, and chat flows</li>
                  <li className="flex items-start gap-2"><Video className="h-5 w-5 text-dreampath-secondary mt-0.5"/> 1:1 and group video rooms</li>
                  <li className="flex items-start gap-2"><Users className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Interest-based discovery</li>
                  <li className="flex items-start gap-2"><Shield className="h-5 w-5 text-dreampath-secondary mt-0.5"/> AI moderation & reporting</li>
                  <li className="flex items-start gap-2"><Heart className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Premium subscriptions & boosts</li>
                  <li className="flex items-start gap-2"><MessageSquare className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Rich chat: voice notes, GIFs, attachments</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
                <CardDescription>Concept screenshots and UI inspirations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gallery.map((src, i) => (
                    <img key={i} src={src} alt={`dating-app-${i}`} className="w-full h-28 md:h-36 object-cover rounded" loading="lazy" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>Modern, scalable, secure</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Frontend: React Native / Flutter, React (web admin)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Backend: Node.js / NestJS, PostgreSQL/Supabase</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Realtime: WebRTC for video, WebSockets for chat</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Cloud: Vercel/Netlify + AWS/GCP for media services</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Everything needed for a dating platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Identity verification (OTP, KYC optional)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Payments: Stripe/Razorpay, in-app purchases</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Content moderation & reporting workflows</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Analytics, crash reporting, push notifications</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monetization</CardTitle>
                <CardDescription>Multiple revenue streams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Premium subscription (Plus/Gold tiers)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Boosts, Super Likes, profile spotlight</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Gifts and coins for live video</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deliverables</CardTitle>
                <CardDescription>What you receive</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> iOS & Android apps, Admin portal</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Source code, CI/CD setup, documentation</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> 30 days post-launch support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FAQs</CardTitle>
                <CardDescription>Common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li><strong>Timeline:</strong> 10–16 weeks for MVP, depending on features.</li>
                  <li><strong>Scalability:</strong> Built for thousands of concurrent video sessions with proper infra.</li>
                  <li><strong>Publishing:</strong> We assist with App Store and Play Store listing.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Smartphone className="h-5 w-5"/> Project Summary</CardTitle>
                <CardDescription>Typical scope and pricing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>iOS</Badge>
                  <Badge>Android</Badge>
                  <Badge>React Native</Badge>
                  <Badge>Web Admin</Badge>
                </div>
                <div className="p-4 rounded-md bg-gray-50">
                  <div className="text-sm text-gray-600">Estimated price range</div>
                  <div className="text-2xl font-semibold">₹30,000 – ₹100,000 INR</div>
                  <div className="text-xs text-gray-500">Final quote depends on scope and integrations</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-dreampath-secondary"/> 10–16 weeks timeline</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-dreampath-secondary"/> Monetization: subscription, pay-per-boost, gifts</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-dreampath-secondary"/> Admin portal with analytics & moderation</li>
                </ul>
                <Button className="w-full" onClick={() => setOpen(true)}>Get exact quote</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ContactFormPopup isOpen={open} onClose={() => setOpen(false)} preselectedService={selectedService} />
    </div>
  );
};

export default DatingApp;
