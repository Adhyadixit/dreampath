import React from "react";
import SEO from "@/components/common/SEO";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Building2, MapPin, CreditCard, Search } from "lucide-react";
import ContactFormPopup from "@/components/common/ContactFormPopup";
import { useGallery } from "@/hooks/use-gallery";

// Images will be auto-loaded from public/images/realestateapp/

const RealEstateApps: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedService] = React.useState("real-estate-apps");
  const { images: gallery } = useGallery("realestateapp");

  return (
    <div>
      <SEO
        title="Real Estate Search & Property Apps | DreamPath Solutions"
        description="Property search, broker CRM, rentals, payments, maps and 3D tours. Build your Zillow/NoBroker-like experience."
        keywords={["real estate app","property search","broker crm","rentals app","property management"]}
        canonical="https://dreampathsolutions.in/realestateapps"
      />
      <PageHeader
        title="Real Estate Search & Property Apps"
        description="Listings, maps, payments and CRM — everything your real estate business needs."
      />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">What we build</CardTitle>
                <CardDescription>Buyer, seller, broker & admin workflows</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2"><Search className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Advanced property search & filters</li>
                  <li className="flex items-start gap-2"><MapPin className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Maps, geofencing, nearby alerts</li>
                  <li className="flex items-start gap-2"><Building2 className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Projects, units, site visits</li>
                  <li className="flex items-start gap-2"><CreditCard className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Payments, bookings, agreements</li>
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
                    <img key={i} src={src} alt={`realestate-app-${i}`} className="w-full h-28 md:h-36 object-cover rounded" loading="lazy" />
                  ))}
                  {gallery.length === 0 && (
                    <div className="col-span-2 md:col-span-4 text-sm text-gray-500">Add images under public/images/realestateapp/ to populate this gallery.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>Modern, scalable real estate platform</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Frontend: React Native/Flutter, React (web)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Backend: Node.js/NestJS, PostgreSQL/Supabase</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Infra: CDN, image optimization, maps caching</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Security: RBAC, audit logs, e-sign support</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Property ecosystem connectivity</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Maps & geocoding (Google/Mapbox)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Payments & escrow (Stripe/Razorpay)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Lead sources & CRMs (HubSpot, Zoho)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> E-sign & docs (DocuSign, PDF toolchain)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monetization</CardTitle>
                <CardDescription>Revenue streams</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Featured listings & highlights</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Subscription plans for brokers/builders</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Lead packages and commissions</li>
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
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Buyer, seller, broker apps + admin portal</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> CRM, lead routing, reports, analytics</li>
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
                  <li><strong>Data accuracy:</strong> Import feeds and admin checks keep listings clean.</li>
                  <li><strong>Timeline:</strong> 10–16 weeks for an MVP, more for CRM automations.</li>
                  <li><strong>Docs:</strong> E-sign and digital agreements supported as add-ons.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Summary</CardTitle>
                <CardDescription>What we’ll ship</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">A complete property discovery and transaction platform with maps, advanced search, appointments, payments, CRM integrations, and an admin portal. Built for performance and growth with analytics, SEO, and automation.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>iOS/Android + web portal</CardDescription>
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
                  <div className="text-xs text-gray-500">Varies by CRM & payment flows</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-dreampath-secondary"/> Broker CRM & lead routing</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-dreampath-secondary"/> Site visit scheduling & feedback</li>
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

export default RealEstateApps;
