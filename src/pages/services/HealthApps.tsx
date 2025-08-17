import React from "react";
import SEO from "@/components/common/SEO";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Apple, Dumbbell, HeartPulse, Salad, Check } from "lucide-react";
import ContactFormPopup from "@/components/common/ContactFormPopup";
import { useGallery } from "@/hooks/use-gallery";

const HealthApps: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState("health-fitness-calorie-apps");
  const { images: gallery } = useGallery("healthapp");

  return (
    <div>
      <SEO
        title="Health, Fitness & Calorie Counting App Development | DreamPath Solutions"
        description="We build secure, user-loved health & fitness apps with calorie tracking, wearable sync, workouts, habits, and analytics. HIPAA/GDPR-ready architecture."
        keywords={[
          "health app development",
          "fitness app development",
          "calorie counting app",
          "google fit integration",
          "apple health integration",
          "wearable app development",
          "react native health app",
          "india app development company"
        ]}
        canonical="https://dreampathsolutions.in/healthapps"
      />
      <PageHeader
        title="Health, Fitness & Calorie Counting Apps"
        description="From step tracking to nutrition logging and wearable integrations — we build compliant, user-loved health apps."
      />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Key Capabilities</CardTitle>
                <CardDescription>Evidence-based features to drive outcomes</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2"><Activity className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Activity & steps tracking</li>
                  <li className="flex items-start gap-2"><Salad className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Calorie & macro counters</li>
                  <li className="flex items-start gap-2"><HeartPulse className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Apple Health / Google Fit sync</li>
                  <li className="flex items-start gap-2"><Dumbbell className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Workout plans & progress</li>
                  <li className="flex items-start gap-2"><Apple className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Fasting, habits, reminders</li>
                  <li className="flex items-start gap-2"><Check className="h-5 w-5 text-dreampath-secondary mt-0.5"/> HIPAA/GDPR-ready architecture</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
                <CardDescription>UI examples and inspiration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gallery.map((src, i) => (
                    <img key={i} src={src} alt={`health-app-${i}`} className="w-full h-28 md:h-36 object-cover rounded" loading="lazy" />
                  ))}
                  {gallery.length === 0 && (
                    <div className="col-span-2 md:col-span-4 text-sm text-gray-500">Add images under public/images/healthapp/ to populate this gallery.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>Secure and compliant</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Frontend: React Native/Flutter</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Backend: Node.js/NestJS, PostgreSQL/Supabase</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Integrations: Apple Health, Google Fit</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Infra: Cloud storage, CDN, monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Health ecosystem support</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Wearables: Apple Watch, Fitbit (where available)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Nutrition DB, barcode scanning</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Analytics & A/B testing</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Notifications & reminders</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analytics & Monetization</CardTitle>
                <CardDescription>Data-driven growth</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Funnels, cohorts, retention dashboards</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Subscriptions, premium plans, add-ons</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Coach marketplace & programs</li>
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
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> iOS & Android apps, optional web portal</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Source code, CI/CD, documentation</li>
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
                  <li><strong>Compliance:</strong> We follow best practices to be HIPAA/GDPR-ready as needed.</li>
                  <li><strong>Timeline:</strong> 10–16 weeks for an MVP depending on features.</li>
                  <li><strong>Data ownership:</strong> 100% source code handover and data ownership.</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Mobile apps + optional web portal</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge>iOS</Badge>
                  <Badge>Android</Badge>
                  <Badge>Wearables</Badge>
                  <Badge>Analytics</Badge>
                </div>
                <div className="p-4 rounded-md bg-gray-50">
                  <div className="text-sm text-gray-600">Estimated price range</div>
                  <div className="text-2xl font-semibold">₹30,000 – ₹100,000 INR</div>
                  <div className="text-xs text-gray-500">Varies by integrations (wearables, nutrition DB, etc.)</div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-dreampath-secondary"/> 10–16 weeks baseline</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-dreampath-secondary"/> Nutrition DB and barcode scanning optional</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 mt-0.5 text-dreampath-secondary"/> Coaching & communities add-on</li>
                </ul>
                <Button className="w-full" onClick={() => setOpen(true)}>Talk to an expert</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <ContactFormPopup isOpen={open} onClose={() => setOpen(false)} preselectedService={selectedService} />
    </div>
  );
};

export default HealthApps;
