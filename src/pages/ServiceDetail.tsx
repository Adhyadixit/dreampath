import React from "react";
import { useParams, Link } from "react-router-dom";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Check, Shield, Zap, Rocket, Crown, ArrowRight } from "lucide-react";

// Define the content for each service slug
const SERVICES_CONTENT: Record<string, {
  title: string;
  subtitle: string;
  overview: string[];
  whyChooseUs: string[];
  benefits: string[];
  faqs: { q: string; a: string }[];
  comparison: { feature: string; us: string; competitors: string }[];
}> = {
  "custom-software-development": {
    title: "Custom Software Development",
    subtitle: "Tailored solutions that fit your business like a glove",
    overview: [
      "We design and build bespoke software that solves your unique business challenges.",
      "From discovery to deployment, our team delivers maintainable, scalable solutions aligned with your goals.",
      "Own your roadmap, integrate with your stack, and adapt quickly as your business evolves."
    ],
    whyChooseUs: [
      "Full-stack expertise across web, mobile, and cloud",
      "Agile delivery with transparent milestones and demos",
      "Security-first development and rigorous QA",
      "Scalable architectures and future-ready tech choices"
    ],
    benefits: [
      "No vendor lock-in — you fully own the IP",
      "Built for your exact workflows (not generic workflows)",
      "Lower total cost of ownership over time",
      "Seamless integrations with your existing systems"
    ],
    faqs: [
      { q: "How long does a custom project take?", a: "Most MVPs ship in 6–12 weeks. Larger engagements vary based on scope and integrations." },
      { q: "Do you provide maintenance?", a: "Yes. We offer ongoing support, SLAs, and iterative enhancements post launch." },
      { q: "Can you modernize legacy systems?", a: "Absolutely. We refactor, replatform, or rebuild while minimizing downtime." }
    ],
    comparison: [
      { feature: "Code Ownership", us: "You own 100%", competitors: "Often restricted or shared" },
      { feature: "Fit to Processes", us: "Exact fit", competitors: "You adapt to the tool" },
      { feature: "Scalability", us: "Cloud-native, modular", competitors: "Limited by vendor roadmap" },
      { feature: "Security", us: "Security by design", competitors: "Generic defaults" }
    ]
  },
  "web-development": {
    title: "Web Development",
    subtitle: "High-performance websites and web apps that convert",
    overview: [
      "We build blazing-fast, SEO-friendly websites and complex web apps that scale.",
      "From landing pages to multi-tenant SaaS, we cover the full spectrum."
    ],
    whyChooseUs: [
      "Performance-first builds (Core Web Vitals)",
      "Accessible, responsive UX across devices",
      "Modern stacks (React, Next.js, Node, Postgres)",
      "Automated CI/CD and observability"
    ],
    benefits: [
      "Better rankings and conversions",
      "Lower bounce rates and higher session times",
      "Maintainable code and rapid deployments"
    ],
    faqs: [
      { q: "Do you handle SEO?", a: "Yes. We implement technical SEO best practices and can coordinate content strategy." },
      { q: "Can you migrate from WordPress?", a: "Yes. We migrate content and preserve SEO equity with redirects and sitemaps." }
    ],
    comparison: [
      { feature: "Performance", us: "A+ Lighthouse", competitors: "Inconsistent" },
      { feature: "SEO Readiness", us: "Built-in", competitors: "Add-ons required" },
      { feature: "Maintainability", us: "Component-driven", competitors: "Monolithic themes" }
    ]
  },
  "mobile-app-development": {
    title: "Mobile App Development",
    subtitle: "Native-quality apps for iOS and Android",
    overview: [
      "Design and build mobile experiences that users love and retain.",
      "We ship fast with native or cross-platform stacks based on your needs."
    ],
    whyChooseUs: [
      "Native iOS/Android and React Native expertise",
      "Design systems for consistent UX",
      "Offline-first and real-time features",
      "App Store and Play Store launch support"
    ],
    benefits: [
      "Faster time-to-market",
      "Lower development cost with shared codebases",
      "Robust analytics and growth tooling"
    ],
    faqs: [
      { q: "Do you provide post-launch support?", a: "Yes, including crash analytics, hotfixes, and new feature sprints." },
      { q: "Can you take over an existing app?", a: "We audit, stabilize and enhance existing codebases." }
    ],
    comparison: [
      { feature: "UX Quality", us: "Design-led, tested", competitors: "Template-driven" },
      { feature: "Delivery Speed", us: "Rapid sprints", competitors: "Waterfall delays" },
      { feature: "Cost Efficiency", us: "Cross-platform options", competitors: "Separate native teams" }
    ]
  },
  "ui-ux-design": {
    title: "UI/UX Design",
    subtitle: "Delightful, conversion-focused digital experiences",
    overview: [
      "We craft research-driven interfaces that improve usability and business outcomes.",
      "From discovery to high-fidelity prototypes and design systems."
    ],
    whyChooseUs: [
      "User research and testing",
      "Accessibility and heuristics baked in",
      "Design systems for scale",
      "Collaboration with engineering early"
    ],
    benefits: [
      "Higher conversion and engagement",
      "Reduced dev rework with clear specs",
      "Consistent brand experience"
    ],
    faqs: [
      { q: "Do you provide clickable prototypes?", a: "Yes, with Figma and interactive flows for stakeholder reviews." },
      { q: "Can you audit existing UX?", a: "We run heuristic evaluations and usability tests to prioritize improvements." }
    ],
    comparison: [
      { feature: "Research Rigor", us: "Structured", competitors: "Ad hoc" },
      { feature: "Design System", us: "Reusable tokens", competitors: "One-off screens" },
      { feature: "Handoff", us: "Dev-ready", competitors: "Static files" }
    ]
  },
  "database-development": {
    title: "Database Development",
    subtitle: "Secure, scalable data foundations",
    overview: [
      "We design, optimize, and manage databases for performance, reliability, and cost-efficiency.",
      "From schema design to migrations, replication, and reporting."
    ],
    whyChooseUs: [
      "Relational and NoSQL expertise",
      "Query optimization and indexing",
      "Backup, HA/DR strategies",
      "Data pipelines and BI"
    ],
    benefits: [
      "Faster queries and happier users",
      "Reduced downtime and risks",
      "Better decision-making with trustworthy data"
    ],
    faqs: [
      { q: "Do you handle migrations?", a: "Yes, with near-zero downtime strategies and rollback plans." },
      { q: "Can you set up analytics?", a: "We implement reliable pipelines to your BI tools." }
    ],
    comparison: [
      { feature: "Performance", us: "Tuned & monitored", competitors: "Untuned defaults" },
      { feature: "Reliability", us: "HA/DR ready", competitors: "Single points of failure" },
      { feature: "Cost Control", us: "Right-sized", competitors: "Over/under provisioned" }
    ]
  },
  "cybersecurity": {
    title: "Cybersecurity",
    subtitle: "Proactive protection for your business",
    overview: [
      "Identify vulnerabilities, harden systems, and ensure compliance.",
      "We help you build robust security practices end-to-end."
    ],
    whyChooseUs: [
      "Security audits and pentesting",
      "Secure SDLC and code reviews",
      "Cloud security and zero-trust setups",
      "Compliance guidance (ISO, SOC, GDPR)"
    ],
    benefits: [
      "Lower breach risks and costs",
      "Higher customer trust",
      "Audit readiness and peace of mind"
    ],
    faqs: [
      { q: "Do you offer ongoing monitoring?", a: "Yes, with alerting, patching, and incident response guidance." },
      { q: "Can you help with compliance?", a: "We align controls and evidence to your required frameworks." }
    ],
    comparison: [
      { feature: "Approach", us: "Proactive", competitors: "Reactive" },
      { feature: "Depth", us: "App + infra + people", competitors: "Surface checks" },
      { feature: "Enablement", us: "Dev-friendly", competitors: "Blocks releases" }
    ]
  },
  "cloud-solutions": {
    title: "Cloud Solutions",
    subtitle: "Scale faster with the cloud",
    overview: [
      "Migrate, modernize, and optimize on AWS, Azure, or GCP.",
      "Automation-first approach with IaC, cost governance, and observability."
    ],
    whyChooseUs: [
      "Well-Architected best practices",
      "Terraform, Pulumi, CDK",
      "Kubernetes and serverless",
      "FinOps and security built-in"
    ],
    benefits: [
      "Lower costs and better reliability",
      "Faster deployments and scaling",
      "Reduced operational toil"
    ],
    faqs: [
      { q: "Do you handle multi-cloud?", a: "Yes. We also standardize with abstractions where it makes sense." },
      { q: "Can you improve costs?", a: "We right-size resources and add budgets and alerts." }
    ],
    comparison: [
      { feature: "Reliability", us: "IaC + SRE", competitors: "Manual ops" },
      { feature: "Security", us: "Guardrails", competitors: "As an afterthought" },
      { feature: "Velocity", us: "Automated", competitors: "Ticket-based" }
    ]
  },
  "devops-solutions": {
    title: "DevOps Solutions",
    subtitle: "Ship faster with confidence",
    overview: [
      "We streamline your SDLC with CI/CD, automation, and robust observability.",
      "Empower teams to deliver reliable software at high velocity."
    ],
    whyChooseUs: [
      "CI/CD pipelines and environments",
      "IaC and GitOps workflows",
      "Monitoring, logging, and alerting",
      "Developer experience improvements"
    ],
    benefits: [
      "Shorter lead times",
      "Higher deployment frequency",
      "Lower change failure rate"
    ],
    faqs: [
      { q: "Do you work with monorepos?", a: "Yes. We set up caching, parallelism, and per-project pipelines." },
      { q: "Do you support on-prem?", a: "We adapt to your infra and tools, cloud or on-prem." }
    ],
    comparison: [
      { feature: "Delivery", us: "Automated & observable", competitors: "Manual & opaque" },
      { feature: "Stability", us: "Tested gates", competitors: "Hotfix cycles" },
      { feature: "DX", us: "Faster feedback", competitors: "Slow loops" }
    ]
  },
  "it-consulting": {
    title: "IT Consulting",
    subtitle: "Make smarter technology decisions",
    overview: [
      "Strategic advisory to align technology investments with business goals.",
      "Assessments, roadmaps, vendor selection, and transformation guidance."
    ],
    whyChooseUs: [
      "Senior architects and consultants",
      "Experience across industries",
      "Data-driven recommendations",
      "Clear ROI and prioritization"
    ],
    benefits: [
      "Reduced risk and waste",
      "Faster time-to-value",
      "Aligned teams and stakeholders"
    ],
    faqs: [
      { q: "Do you help with RFPs?", a: "Yes. We define requirements and evaluate vendors objectively." },
      { q: "Do you provide interim CTO services?", a: "We can provide fractional leadership and advisory." }
    ],
    comparison: [
      { feature: "Experience", us: "Hands-on practitioners", competitors: "PowerPoint-only" },
      { feature: "Outcomes", us: "Measured", competitors: "Vague" },
      { feature: "Alignment", us: "Exec + Eng + Ops", competitors: "Siloed" }
    ]
  }
};

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug ? SERVICES_CONTENT[slug] : undefined;

  if (!data) {
    return (
      <div>
        <PageHeader title="Service Not Found" description="The service you're looking for doesn't exist." />
        <div className="section-padding">
          <div className="container-wide text-center">
            <p className="mb-6">Please explore our services or contact us for assistance.</p>
            <Link to="/services" className="text-dreampath-primary underline mr-6">Back to Services</Link>
            <Link to="/contact" className="text-dreampath-secondary underline">Contact Us</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title={data.title} description={data.subtitle} />

      <section className="section-padding bg-white">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>What We Do</CardTitle>
                <CardDescription>{data.subtitle}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2">
                  {data.overview.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Crown className="h-5 w-5 text-dreampath-secondary mr-2"/> Why Choose Us</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {data.whyChooseUs.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-dreampath-secondary mr-2 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center"><Shield className="h-5 w-5 text-dreampath-secondary mr-2"/> Benefits Over Alternatives</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {data.benefits.map((b, i) => (
                    <li key={i} className="flex items-start">
                      <Zap className="h-5 w-5 text-dreampath-secondary mr-2 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>FAQs</CardTitle>
                <CardDescription>Answers to common questions</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {data.faqs.map((f, i) => (
                    <AccordionItem key={i} value={`item-${i}`}>
                      <AccordionTrigger>{f.q}</AccordionTrigger>
                      <AccordionContent>{f.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Competitors vs Us</CardTitle>
                <CardDescription>How we compare</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200 text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 border-b">Feature</th>
                        <th className="text-left p-3 border-b">DreamPath</th>
                        <th className="text-left p-3 border-b">Competitors</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.comparison.map((row, i) => (
                        <tr key={i} className="odd:bg-white even:bg-gray-50">
                          <td className="p-3 border-b">{row.feature}</td>
                          <td className="p-3 border-b font-medium text-green-700">{row.us}</td>
                          <td className="p-3 border-b text-gray-600">{row.competitors}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ready to get started?</CardTitle>
                <CardDescription>Talk to our experts about {data.title.toLowerCase()}.</CardDescription>
              </CardHeader>
              <CardContent>
                <Link to="/contact">
                  <Button className="bg-dreampath-primary hover:bg-dreampath-dark w-full">
                    Contact Us <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="section-padding bg-dreampath-primary text-white">
        <div className="container-wide text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Let's build something great together</h2>
          <p className="opacity-90 mb-6">From strategy to engineering, we partner with you at every step.</p>
          <Link to="/contact">
            <Button variant="secondary" className="text-dreampath-primary">
              Start a Conversation
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetail;
