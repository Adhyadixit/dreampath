import React from "react";
import SEO from "@/components/common/SEO";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Wallet, Shield, CreditCard, TrendingUp } from "lucide-react";
import ContactFormPopup from "@/components/common/ContactFormPopup";
import { useGallery } from "@/hooks/use-gallery";

// Images loaded from public/images/fintechapp/

const FintechWalletApps: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const [selectedService] = React.useState("fintech-wallet-apps");
  const { images: gallery } = useGallery("fintechapp");

  return (
    <div>
      <SEO
        title="Fintech Wallet & Payments Apps | DreamPath Solutions"
        description="UPI, wallets, cards, P2P payments, KYC and analytics with bank-grade security."
        keywords={["fintech app","wallet app","payments","UPI","KYC"]}
        canonical="https://dreampathsolutions.in/fintechapps"
      />
      <PageHeader title="Fintech Wallet & Payments Apps" description="Secure, fast, compliant payments experiences." />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Capabilities</CardTitle>
                <CardDescription>Compliant infrastructure</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3">
                  <li className="flex items-start gap-2"><Wallet className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Wallets, UPI, cards</li>
                  <li className="flex items-start gap-2"><Shield className="h-5 w-5 text-dreampath-secondary mt-0.5"/> KYC, OTP, device security</li>
                  <li className="flex items-start gap-2"><CreditCard className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Subscriptions, payouts</li>
                  <li className="flex items-start gap-2"><TrendingUp className="h-5 w-5 text-dreampath-secondary mt-0.5"/> Analytics & fraud checks</li>
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
                    <img key={i} src={src} alt={`fintech-app-${i}`} className="w-full h-28 md:h-36 object-cover rounded" loading="lazy" />
                  ))}
                  {gallery.length === 0 && (
                    <div className="col-span-2 md:col-span-4 text-sm text-gray-500">Add images under public/images/fintechapp/ to populate this gallery.</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tech Stack</CardTitle>
                <CardDescription>Bank-grade security and scale</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Frontend: React Native, React (web)</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Backend: Node.js/NestJS, PostgreSQL/Supabase</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Security: JWT/OAuth, device binding, encryption</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Observability: logs, metrics, fraud signals</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Integrations</CardTitle>
                <CardDescription>Payments & compliance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid sm:grid-cols-2 gap-3 text-sm">
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> UPI, cards, payouts, subscriptions</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> KYC/AML vendors, OTP, SMS, email</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Ledgering & reconciliation pipelines</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Analytics & risk scoring</li>
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
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> MDR/fees, subscription tiers</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Float income, offers, rewards</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Data insights for partners</li>
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
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> iOS/Android wallet app + web portal</li>
                  <li className="flex items-start gap-2"><Check className="h-4 w-4 text-dreampath-secondary mt-0.5"/> Admin, ledger, reconciliation tools</li>
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
                  <li><strong>Compliance:</strong> KYC, RBI guidelines, audit logs, rate limits.</li>
                  <li><strong>Timeline:</strong> 12–20 weeks depending on flows and partners.</li>
                  <li><strong>Risk:</strong> Device binding, anomaly detection, OTP protections.</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Summary</CardTitle>
                <CardDescription>What we’ll ship</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700">A secure wallet and payments stack with UPI/cards, KYC, ledgering, reconciliations, analytics, and an admin portal—built for compliance and scale.</p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Pricing</CardTitle>
                <CardDescription>Security-first builds</CardDescription>
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
                  <div className="text-xs text-gray-500">Heavily depends on compliance</div>
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

export default FintechWalletApps;
