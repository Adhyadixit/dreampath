import React from "react";
import SEO from "@/components/common/SEO";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Car, MapPin, Clock, CreditCard } from "lucide-react";
import ContactFormPopup from "@/components/common/ContactFormPopup";
import { useGallery } from "@/hooks/use-gallery";

// Images loaded from public/images/ridehailingapp/

const RideHailingApps: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedService] = React.useState("ride-hailing-apps");
  const { images: gallery } = useGallery("ridehailingapp");

  return (
    <div>
      <SEO
        title="Ride Hailing & Delivery Rider Apps | DreamPath Solutions"
        description="Real-time tracking, dispatch, fares, payments, and driver apps for mobility businesses."
        keywords={["ride hailing app","taxi app","driver app","dispatch","tracking"]}
        canonical="https://dreampathsolutions.in/ridehailingapps"
      />
      <PageHeader title="Ride Hailing & Driver Apps" description="Reliable, live-tracked rides with secure payments." />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Modules</CardTitle>
                <CardDescription>Rider, driver and admin</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2"><Car className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Booking & dispatch</li>
                  <li className="flex items-start gap-2"><MapPin className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Live GPS & navigation</li>
                  <li className="flex items-start gap-2"><Clock className="h-5 w-5 text-dreampath-secondary mt-0.5"/> ETA, surge pricing</li>
                  <li className="flex items-start gap-2"><CreditCard className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Wallets & receipts</li>
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
                    <img key={i} src={src} alt={`ridehailing-app-${i}`} className="w-full h-28 md:h-36 object-cover rounded" loading="lazy" />
                  ))}
                  {gallery.length === 0 && (
                    <div className="col-span-2 md:col-span-4 text-sm text-gray-500">Add images under public/images/ridehailingapp/ to populate this gallery.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>Realtime, reliable, scalable</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Frontend: React Native for rider/driver, React web</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Backend: Node.js/NestJS, PostgreSQL/Supabase</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Realtime: Sockets for dispatch, location streams</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Maps: Google/Mapbox SDKs, routing & ETA</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Mobility ecosystem</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Maps, places, geocoding (Google/Mapbox)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Payments: wallets, cards, UPI, COD</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Notifications: push, SMS, email</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Analytics & anti-fraud signals</li>
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
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Commissions per ride and surge pricing</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Subscriptions for drivers/fleets</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Ads and promoted drivers</li>
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
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Rider app, driver app, admin panel</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Dispatch, pricing rules, reports</li>
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
                  <li><strong>Accuracy:</strong> GPS smoothing and snap-to-road improve tracking.</li>
                  <li><strong>Timeline:</strong> 12–18 weeks for MVP with live dispatch.</li>
                  <li><strong>Scale:</strong> Rate limits, queues, and caching to handle peaks.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Summary</CardTitle>
                <CardDescription>What we’ll ship</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">A complete mobility platform with real-time dispatch, reliable navigation, secure payments, and an admin dashboard to manage drivers, pricing, and operations.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Multi-app setup</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>iOS</Badge>
                  <Badge>Android</Badge>
                  <Badge>Web</Badge>
                </div>
                <div className="p-4 rounded-md bg-gray-50">
                  <div className="text-sm text-gray-600">Estimated price range</div>
                  <div className="text-2xl font-semibold">₹40,000 – ₹120,000 INR</div>
                  <div className="text-xs text-gray-500">Varies by live features</div>
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

export default RideHailingApps;
