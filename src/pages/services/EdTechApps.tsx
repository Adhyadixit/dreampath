import React from "react";
import SEO from "@/components/common/SEO";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, BookOpen, Video, Award } from "lucide-react";
import ContactFormPopup from "@/components/common/ContactFormPopup";
import { useGallery } from "@/hooks/use-gallery";

// Images loaded from public/images/edtechapp/

const EdTechApps: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedService] = React.useState("edtech-apps");
  const { images: gallery } = useGallery("edtechapp");

  return (
    <div>
      <SEO
        title="EdTech & Learning Apps | DreamPath Solutions"
        description="Video classes, quizzes, progress tracking, certificates and subscriptions."
        keywords={["edtech app","learning app","courses","quizzes","certificates"]}
        canonical="https://dreampathsolutions.in/edtechapps"
      />
      <PageHeader title="EdTech & Learning Apps" description="Engaging learning with video, quizzes and certificates." />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Modules</CardTitle>
                <CardDescription>Student, teacher, admin</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2"><Video className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Video lessons & notes</li>
                  <li className="flex items-start gap-2"><BookOpen className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Quizzes & assignments</li>
                  <li className="flex items-start gap-2"><Award className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Certificates & progress</li>
                  <li className="flex items-start gap-2"><Check className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Subscriptions & coupons</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Gallery</CardTitle>
                <CardDescription>UI samples</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {gallery.map((src, i) => (
                    <img key={i} src={src} alt={`edtech-app-${i}`} className="w-full h-28 md:h-36 object-cover rounded" loading="lazy" />
                  ))}
                  {gallery.length === 0 && (
                    <div className="col-span-2 md:col-span-4 text-sm text-gray-500">Add images under public/images/edtechapp/ to populate this gallery.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>Learning-first performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Frontend: React Native (apps), React (web)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Backend: Node.js/NestJS, PostgreSQL/Supabase</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Video: HLS, DRM-ready, CDN caching</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Assessments: question banks, grading</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>EdTech ecosystem</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Payments, subscriptions, coupons</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Video hosting/CDN, live classes</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Notifications: push, email, SMS</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Analytics: cohort and engagement</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Monetization</CardTitle>
                <CardDescription>Sustainable revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Course sales, bundles, memberships</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Live class tickets and replays</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Certificates and exam fees</li>
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
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> iOS/Android learner app + web portal</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> CMS for courses, lectures, quizzes</li>
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
                  <li><strong>Offline:</strong> Download controls and DRM options available.</li>
                  <li><strong>Timeline:</strong> 10–16 weeks depending on content and live stack.</li>
                  <li><strong>Scalability:</strong> CDN and caching for large course catalogs.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Summary</CardTitle>
                <CardDescription>What we’ll ship</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">A complete learning platform with course CMS, video streaming, assessments, progress tracking, payments, and analytics—across web and mobile.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Multi-role platform</CardDescription>
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
                  <div className="text-xs text-gray-500">Depends on content volume</div>
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

export default EdTechApps;
