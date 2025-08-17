import React from "react";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, ShoppingBag, MapPin, Bike, Smartphone, Globe } from "lucide-react";
import ContactFormPopup from "@/components/common/ContactFormPopup";

const gallery = [
  // Replace with your actual app screenshots when available
  "https://images.unsplash.com/photo-1598514982926-916a67939b6b?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515777315835-281b94c9589f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556909212-d5b604d0c90f?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565895405138-6c3a10f4b4d4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1556741533-411cf82e4e2d?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542744094-24638eff58bb?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1200&auto=format&fit=crop"
];

const FoodDeliveryApp: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState("food-delivery-app-website");

  return (
    <div>
      <PageHeader
        title="Food Delivery – Website + App"
        description="Build your Swiggy/Zomato-like platform: customer apps, restaurant dashboard, delivery partner app, and powerful admin portal."
      />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Included Modules</CardTitle>
                <CardDescription>End-to-end ecosystem covering website + mobile apps</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2"><ShoppingBag className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Customer app (browse, cart, pay)</li>
                  <li className="flex items-start gap-2"><Globe className="h-5 w-5 text-dreampath-secondary mt-0.5"/> SEO-optimized website for ordering</li>
                  <li className="flex items-start gap-2"><MapPin className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Live order tracking & maps</li>
                  <li className="flex items-start gap-2"><Bike className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Rider app with delivery workflow</li>
                  <li className="flex items-start gap-2"><Smartphone className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Restaurant dashboard & menu manager</li>
                  <li className="flex items-start gap-2"><Check className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Payments, coupons, ratings, support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
                <CardDescription>Screens and UX samples</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gallery.map((src, i) => (
                    <img key={i} src={src} alt={`food-app-${i}`} className="w-full h-28 md:h-36 object-cover rounded" loading="lazy" />
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>Reliable, scalable commerce stack</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Frontend: React/Next.js (web), React Native (apps)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Backend: Node.js/NestJS, PostgreSQL/Supabase</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Realtime: WebSockets for order status</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Maps/Geo: Google Maps/Mapbox routing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Essential services for delivery platforms</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Payments: Razorpay/Stripe, COD flows</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Notifications: SMS/Email/Push</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> KDS & Printer support</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Tax, GST invoices, coupons & loyalty</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Model</CardTitle>
                <CardDescription>Grow sustainably</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Delivery fees, surge pricing</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Restaurant commissions & subscriptions</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Featured listings and ads</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deliverables</CardTitle>
                <CardDescription>What you get</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Website, Customer app, Rider app, Restaurant portal, Admin dashboard</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> DevOps pipelines, documentation, training</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> 30 days hypercare support</li>
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
                  <li><strong>Timeline:</strong> 12–18 weeks baseline.</li>
                  <li><strong>Scale:</strong> Designed for high order volume with proper infra.</li>
                  <li><strong>Delivery logistics:</strong> Supports single or marketplace models.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Website + Android/iOS apps</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>Website</Badge>
                  <Badge>iOS</Badge>
                  <Badge>Android</Badge>
                  <Badge>Admin</Badge>
                </div>
                <div className="p-4 rounded-md bg-gray-50">
                  <div className="text-sm text-gray-600">Estimated price range</div>
                  <div className="text-2xl font-semibold">₹30,000 – ₹100,000 INR</div>
                  <div className="text-xs text-gray-500">Actual pricing depends on exact scope</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-dreampath-secondary"/> 12–18 weeks timeline</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-dreampath-secondary"/> Integrations: Maps, Payments, SMS/Email</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-dreampath-secondary"/> Multi-tenant support optional</li>
                </ul>
                <Button className="w-full" onClick={() => setOpen(true)}>Request proposal</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ContactFormPopup isOpen={open} onClose={() => setOpen(false)} preselectedService={selectedService} />
    </div>
  );
};

export default FoodDeliveryApp;
