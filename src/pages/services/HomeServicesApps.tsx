import React from "react";
import SEO from "@/components/common/SEO";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Wrench, Calendar, CreditCard } from "lucide-react";
import ContactFormPopup from "@/components/common/ContactFormPopup";
import { useGallery } from "@/hooks/use-gallery";

// Images loaded from public/images/homeservicesapp/

const HomeServicesApps: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedService] = React.useState("home-services-apps");
  const { images: gallery } = useGallery("homeservicesapp");

  return (
    <div>
      <SEO
        title="Home Services & Marketplace Apps | DreamPath Solutions"
        description="Bookings, scheduling, service provider onboarding, payments and ratings."
        keywords={["home services app","marketplace","bookings","scheduling","payments"]}
        canonical="https://dreampathsolutions.in/homeservicesapps"
      />
      <PageHeader title="Home Services & Marketplace Apps" description="Book electricians, plumbers, cleaners and more." />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
                <CardDescription>Two-sided marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2"><Wrench className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Provider onboarding & KYC</li>
                  <li className="flex items-start gap-2"><Calendar className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Slots, scheduling, rescheduling</li>
                  <li className="flex items-start gap-2"><CreditCard className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Payments & payouts</li>
                  <li className="flex items-start gap-2"><Check className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Ratings, chat, notifications</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
                <CardDescription>UI references</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gallery.map((src, i) => (
                    <img key={i} src={src} alt={`homeservices-app-${i}`} className="w-full h-28 md:h-36 object-cover rounded" loading="lazy" />
                  ))}
                  {gallery.length === 0 && (
                    <div className="col-span-2 md:col-span-4 text-sm text-gray-500">Add images under public/images/homeservicesapp/ to populate this gallery.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>Reliable two-sided marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Frontend: React Native (apps), React (web)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Backend: Node.js/NestJS, PostgreSQL/Supabase</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Scheduling: calendars, slots, timezones</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Security: Auth, KYC, role-based access</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Payments, communications & more</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Payments & payouts (Razorpay/Stripe)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Notifications (push, SMS, email)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Maps & service radius</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Invoicing, taxes, coupons</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monetization</CardTitle>
                <CardDescription>Revenue levers</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Commission per booking</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Subscription plans for providers</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Lead packs, featured placement</li>
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
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Customer app, provider app, admin portal</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Scheduling, payouts, dispute tools</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Source code, CI/CD, documentation</li>
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
                  <li><strong>Disputes:</strong> Admin tools for refunds and resolution workflows.</li>
                  <li><strong>Timeline:</strong> 10–16 weeks for MVP with multi-actor flows.</li>
                  <li><strong>Quality:</strong> KYC and rating systems maintain standards.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Summary</CardTitle>
                <CardDescription>What we’ll ship</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">A complete on-demand marketplace with provider onboarding, scheduling, secure payments and payouts, real-time notifications, and an admin portal to manage categories, pricing, and service quality.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Multi-actor build</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>iOS</Badge>
                  <Badge>Android</Badge>
                  <Badge>Web</Badge>
                </div>
                <div className="p-4 rounded-md bg-gray-50">
                  <div className="text-sm text-gray-600">Estimated price range</div>
                  <div className="text-2xl font-semibold">₹30,000 – ₹100,000 INR</div>
                  <div className="text-xs text-gray-500">Depends on marketplace flows</div>
                </div>
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

export default HomeServicesApps;
