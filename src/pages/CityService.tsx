import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams, Navigate, useLocation } from "react-router-dom";
import LazySection from "@/components/common/LazySection";
import { motion } from "framer-motion";
import { projectsApi } from "@/lib/api";
import type { Project } from "@/lib/types";

// Slug helpers
const toSlug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");

// Supported cities with local context for unique content
const cities = [
  {
    name: "Jaipur",
    hubs: ["Malviya Nagar", "World Trade Park", "Sitapura", "Vaishali Nagar"],
    industries: ["Tourism", "Jewelry", "Textiles", "Real Estate", "Education"],
    landmarks: ["Hawa Mahal", "Amer Fort", "City Palace", "Jantar Mantar"],
  },
  {
    name: "Delhi",
    hubs: ["Connaught Place", "Saket", "Nehru Place", "Dwarka"],
    industries: ["D2C", "Fintech", "Healthcare", "Legal", "IT Services"],
    landmarks: ["India Gate", "Qutub Minar", "Red Fort"],
  },
  { name: "Mumbai", hubs: ["BKC", "Andheri", "Powai"], industries: ["Finance", "Media", "Logistics"], landmarks: ["Marine Drive", "Gateway of India"] },
  { name: "Noida", hubs: ["Sector 62", "Sector 18"], industries: ["IT", "Startups", "EdTech"], landmarks: ["Okhla Bird Sanctuary"] },
  { name: "Pune", hubs: ["Hinjawadi", "Kharadi"], industries: ["SaaS", "Automotive", "Education"], landmarks: ["Shaniwar Wada"] },
  { name: "Bangalore", hubs: ["Koramangala", "HSR", "Whitefield"], industries: ["SaaS", "Fintech", "HealthTech"], landmarks: ["Lalbagh", "Cubbon Park"] },
  { name: "Chennai", hubs: ["OMR", "T. Nagar"], industries: ["Manufacturing", "Logistics", "IT"], landmarks: ["Marina Beach"] },
  { name: "Indore", hubs: ["Vijay Nagar"], industries: ["Food Processing", "Retail"], landmarks: ["Rajwada"] },
  { name: "Surat", hubs: ["Ring Road"], industries: ["Textiles", "Diamond"], landmarks: ["Gopi Talav"] },
  { name: "Ahmedabad", hubs: ["SG Highway", "GIFT City (nearby)", "Vastrapur"], industries: ["Manufacturing", "Textiles", "Startups"], landmarks: ["Sabarmati Ashram"] },
  { name: "Jodhpur", hubs: ["Ratanada"], industries: ["Tourism", "Handicrafts"], landmarks: ["Mehrangarh Fort"] },
  { name: "Nashik", hubs: ["Satpur"], industries: ["Wineries", "Agritech"], landmarks: ["Sula Vineyards"] },
];

const services = [
  { slug: "mobile-app-development", label: "Mobile App Development" },
  { slug: "website-development", label: "Website Development" },
  { slug: "web-app-development", label: "Web App Development" },
  { slug: "seo-services", label: "SEO Services" },
  { slug: "local-seo", label: "Local SEO" },
  { slug: "google-ads", label: "Google Ads Management" },
  { slug: "meta-ads", label: "Meta Ads (Facebook/Instagram)" },
  { slug: "review-management", label: "Review Management" },
];

// Generate set of valid slugs for quick lookup
const cityMap = Object.fromEntries(cities.map((c) => [toSlug(c.name), c]));
const serviceMap = Object.fromEntries(services.map((s) => [s.slug, s]));

const getMetaDescription = (serviceLabel: string, cityName: string) =>
  `${serviceLabel} in ${cityName} by a trusted custom company. ROI-focused strategy, UX, and engineering. Hire ${serviceLabel} experts in ${cityName}.`;

const bulletsByService: Record<string, string[]> = {
  "mobile-app-development": [
    "Native & cross-platform (Android, iOS, React Native, Flutter)",
    "Offline-first data sync and performance tuning",
    "Payments (UPI/cards), notifications, analytics",
    "App store readiness (ASO), QA automation, CI/CD",
  ],
  "website-development": [
    "Corporate sites, landing pages, and headless CMS",
    "Technical SEO, schema, Core Web Vitals optimization",
    "CRM/marketing integrations and lead automation",
    "Accessibility and security best practices",
  ],
  "web-app-development": [
    "Modern SPAs/SSR (React/Next.js)",
    "Role-based access, dashboards, reporting",
    "Payments, real-time updates, and file workflows",
    "Scalable hosting, observability, and CI/CD",
  ],
  "seo-services": [
    "Technical audits, on-page, content strategy",
    "Schema, internal linking, and crawl budget",
    "Local and national keyword growth",
    "Analytics, GSC, and reporting dashboards",
  ],
  "local-seo": [
    "GMB optimization, NAP consistency, citations",
    "Local landing pages and geo schema",
    "Reviews growth and spam mitigation",
    "Call tracking and conversion uplift",
  ],
  "google-ads": [
    "Search/Performance Max with SKAG/intent clusters",
    "Conversion tracking (GA4/GAds) and LTV cohorts",
    "Landing page CRO and budget pacing",
    "Ad copy testing and Quality Score improvements",
  ],
  "meta-ads": [
    "Prospecting/retargeting funnels (IG/FB)",
    "Creative testing and audience segmentation",
    "Pixel/CAPI integration and events",
    "ROAS optimization with first-party data",
  ],
  "review-management": [
    "Review acquisition flows (email/SMS/WhatsApp)",
    "Trustpilot/Google rating growth and monitoring",
    "Response playbooks and negative PR mitigation",
    "Centralized dashboard and alerts",
  ],
};

export default function CityService() {
  const params = useParams();
  const location = useLocation();

  // Extract from params when available
  let citySlug = params.citySlug;
  let serviceSlug = params.serviceSlug;

  // Fallback: parse pathname '/city-service' when router didn't split params
  if (!citySlug || !serviceSlug) {
    const path = location.pathname.replace(/^\//, "").replace(/\/$/, ""); // remove leading and trailing slashes
    // Try to find a known service slug at the end of the path
    const matchedService = services.find(s => path.endsWith(s.slug));
    if (matchedService) {
      serviceSlug = matchedService.slug;
      const possibleCity = path.slice(0, path.length - matchedService.slug.length).replace(/-$/, "");
      if (possibleCity) citySlug = possibleCity;
    }
    // If not matched at the end, try service-first pattern: '/service/city'
    if (!serviceSlug || !citySlug) {
      const segments = path.split('/').filter(Boolean);
      if (segments.length >= 2) {
        const [first, second] = segments;
        if (services.some(s => s.slug === first)) {
          serviceSlug = first;
          citySlug = second;
        }
      }
    }
  }

  // Normalize for robust matching
  const normCity = citySlug ? citySlug.toLowerCase() : undefined;
  const normService = serviceSlug ? serviceSlug.toLowerCase() : undefined;

  const city = useMemo(() => (normCity ? cityMap[normCity] : undefined), [normCity]);
  const service = useMemo(() => (normService ? serviceMap[normService] : undefined), [normService]);

  if (!city || !service) {
    return <Navigate to="/not-found" replace />;
  }

  const title = `${service.label} in ${city.name}`;
  const metaDescription = getMetaDescription(service.label, city.name);

  // Basic SEO tags without adding new dependencies
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', metaDescription);
  }, [title, metaDescription]);

  const bullets = bulletsByService[service.slug] || [];

  // Small display of original portfolio (internal API)
  const [proj, setProj] = useState<Project[]>([]);
  const [loadingProj, setLoadingProj] = useState<boolean>(false);
  const [projError, setProjError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoadingProj(true);
        const data = await projectsApi.getAll();
        if (mounted) {
          setProj(Array.isArray(data) ? data.slice(0, 3) : []);
          setProjError(null);
        }
      } catch (e) {
        if (mounted) setProjError("Couldn't load portfolio items.");
      } finally {
        if (mounted) setLoadingProj(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="min-h-screen pt-20 md:pt-0">
      <section className="section-padding pt-64 sm:pt-56 md:pt-32">
        <div className="container-wide text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-dreampath-primary mb-4">{title}</h1>
          <p className="text-lg text-gray-700">
            We build high-performance solutions tailored to {city.name}'s market dynamics—covering
            {" "}
            {city.industries.slice(0, 3).join(", ")}, and beyond. From strategy and UX to
            engineering and growth, our team delivers measurable impact.
          </p>
        </div>
      </section>

      {/* Why choose us */}
      <LazySection minHeightClassName="min-h-[420px]">
        <section className="section-padding bg-gray-50">
          <motion.div
            className="container-wide"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-dreampath-primary mb-4">Why Choose Us in {city.name}</h2>
              <p className="text-gray-700 mb-6">
                We understand {city.name}'s local context: buyer behavior, growth channels, and operational realities. We
                frequently work with teams near {city.hubs.slice(0, 2).join(" and ")}, and we optimize for mobile traffic,
                multilingual content, and performance during peak hours. Landmarks like {city.landmarks[0]} and
                {" "}
                {city.landmarks[1] || city.landmarks[0]} anchor the region's tourism and commerce—our experiences factor
                these nuances to help your product win locally and scale nationally.
              </p>
              <ul className="list-disc list-inside grid md:grid-cols-2 gap-2 text-gray-800">
                <li>Local industry alignment: {city.industries.join(", ")}</li>
                <li>Performance on real devices and networks common in the city</li>
                <li>Analytics, SEO/ASO, and paid media readiness from day one</li>
                <li>Secure architectures, audit logs, and role-based access</li>
              </ul>
            </div>
          </motion.div>
        </section>
      </LazySection>

      {/* Expertise */}
      <LazySection minHeightClassName="min-h-[420px]">
        <section className="section-padding">
          <motion.div
            className="container-wide"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-dreampath-primary mb-4">Our {service.label} Expertise</h2>
            <ul className="list-disc list-inside grid md:grid-cols-2 gap-2 text-gray-800">
              {bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </motion.div>
        </section>
      </LazySection>

      {/* Portfolio */}
      <LazySection minHeightClassName="min-h-[540px]">
        <section className="section-padding bg-gray-50">
          <motion.div
            className="container-wide"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >

            {/* Small feed from actual portfolio API */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-dreampath-primary mb-4">From our portfolio</h3>
              {projError && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-3 mb-4">{projError}</div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(loadingProj ? [0,1,2] : proj).map((p: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm border">
                    <div className="h-40 overflow-hidden bg-gray-100">
                      {loadingProj ? (
                        <div className="h-full w-full animate-pulse bg-gray-200" />
                      ) : (
                        <img src={p.image} alt={p.title} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="font-semibold line-clamp-1">{loadingProj ? 'Loading…' : p.title}</div>
                      {!loadingProj && (
                        <div className="mt-2 text-sm">
                          <a href={p.link} target="_blank" rel="noopener noreferrer" className="text-dreampath-secondary hover:text-dreampath-primary font-medium inline-flex items-center">View Project →</a>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center mt-8">
              <Link to="/portfolio" className="text-dreampath-secondary hover:text-dreampath-primary font-medium">View our full portfolio →</Link>
            </div>
          </motion.div>
        </section>
      </LazySection>

      {/* App & Website Types We Build */}
      <LazySection minHeightClassName="min-h-[520px]">
        <section className="section-padding">
          <motion.div
            className="container-wide"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-dreampath-primary mb-6">App & Website Types We Build</h2>
            <p className="text-gray-700 mb-6">Explore popular categories we deliver across {city.name}. Each category links to more details and examples.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { to: "/datingapps", title: "Dating App Development", desc: "Real-time chat, profiles, matching, subscriptions." },
                { to: "/travelapps", title: "Travel App Development", desc: "Itineraries, bookings, maps, multilingual content." },
                { to: "/realestateapps", title: "Real Estate App Development", desc: "Listings, site-visits, CRM, digital KYC." },
                { to: "/fintechapps", title: "Fintech App Development", desc: "UPI/cards, KYC, ledgers, compliance-ready." },
                { to: "/ecommerceapps", title: "E‑commerce App Development", desc: "Catalog, cart, orders, returns, payments." },
                { to: "/healthapps", title: "Health App Development", desc: "Appointments, tele-consult, records, HIPAA-aware." },
                { to: "/ridehailingapps", title: "Ride‑Hailing Apps", desc: "Driver-rider flows, geofencing, pricing, tracking." },
                { to: "/homeservicesapps", title: "Home Services Apps", desc: "Bookings, provider marketplace, in-app payments." },
                { to: "/edtechapps", title: "EdTech Apps", desc: "Courses, live classes, quizzes, leaderboards." },
                { to: "/astrologyapps", title: "Astrology Apps", desc: "Reports, chat, calls, wallet, notifications." },
              ].map((item, i) => (
                <Link key={i} to={item.to} className="group block rounded-lg border bg-white p-5 hover:shadow-md transition">
                  <div className="font-semibold text-dreampath-primary group-hover:text-dreampath-secondary">{item.title}</div>
                  <div className="text-sm text-gray-700 mt-1">{item.desc}</div>
                  <div className="mt-3 text-dreampath-secondary group-hover:text-dreampath-primary text-sm font-medium">Learn more →</div>
                </Link>
              ))}
            </div>
          </motion.div>
        </section>
      </LazySection>

      {/* Case study */}
      <LazySection minHeightClassName="min-h-[420px]">
        <section className="section-padding">
          <motion.div
            className="container-wide"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-dreampath-primary mb-4">Case Study: {service.label} for a {city.name} Business</h2>
            <p className="text-gray-700">
              A {city.industries[0]} company in {city.name} needed a {service.label.toLowerCase()} initiative to drive growth.
              We delivered a phased rollout focused on performance, tracking, and conversions.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-4 text-sm">
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="font-semibold">Challenge</div>
                <p>Unreliable funnels and poor device performance.</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="font-semibold">Solution</div>
                <p>Optimized UX, analytics, and integrations aligned to {city.name} cohorts.</p>
              </div>
              <div className="bg-white p-4 rounded shadow-sm">
                <div className="font-semibold">Impact (90 days)</div>
                <p>Higher conversions, reduced costs, and better retention.</p>
              </div>
            </div>
          </motion.div>
        </section>
      </LazySection>

      {/* FAQ */}
      <LazySection minHeightClassName="min-h-[420px]">
        <section className="section-padding bg-gray-50">
          <motion.div
            className="container-wide"
            initial={{ opacity: 0, filter: "blur(12px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold text-dreampath-primary mb-4">FAQs — {service.label} in {city.name}</h2>
            <div className="space-y-6 max-w-4xl">
              <div>
                <h3 className="font-semibold">What does affordable {service.label.toLowerCase()} in {city.name} cost?</h3>
                <p className="text-gray-700">Pricing varies by scope, platforms, and integrations. MVPs for small businesses in {city.name} typically start with a lean feature set and scale as traction grows. We share transparent, milestone-based quotes and fixed-price options when scope is clear.</p>
              </div>
              <div>
                <h3 className="font-semibold">Can I get a quick quote for {service.label.toLowerCase()} in {city.name}?</h3>
                <p className="text-gray-700">Yes. Share 5–7 bullet requirements and we’ll return a ballpark within 24–48 hours, plus timelines. Detailed proposals include a phased roadmap, deliverables, and success metrics.</p>
              </div>
              <div>
                <h3 className="font-semibold">Do you support multilingual content and local SEO for {city.name}?</h3>
                <p className="text-gray-700">We implement EN/HI or local languages, SEO-friendly URLs, schema, and internal linking. For apps, we localize UI copy and flows to improve adoption in {city.name} and nearby regions.</p>
              </div>
              <div>
                <h3 className="font-semibold">What tech stack do you use for fast, secure delivery?</h3>
                <p className="text-gray-700">Modern React/TypeScript, performant APIs, secure auth, payments (UPI/cards), analytics, and CI/CD. We optimize Core Web Vitals for websites and performance budgets for apps.</p>
              </div>
              <div>
                <h3 className="font-semibold">Can you integrate payments, WhatsApp, CRM, and logistics partners?</h3>
                <p className="text-gray-700">Absolutely—UPI, cards, wallets, WhatsApp chat/notifications, and CRMs (HubSpot/Zoho/Salesforce), with event tracking to GA4 and Ads. For delivery apps, we integrate hyperlocal logistics used in {city.name}.</p>
              </div>
              <div>
                <h3 className="font-semibold">How quickly can we launch?</h3>
                <p className="text-gray-700">With clear scope, an MVP normally ships in 4–8 weeks. Our component library, QA automation, and release workflows help you go live faster without compromising quality.</p>
              </div>
            </div>
          </motion.div>
        </section>
      </LazySection>

      {/* CTA */}
      <LazySection minHeightClassName="min-h-[360px]">
        <section className="section-padding bg-dreampath-primary text-white text-center">
          <motion.div
            className="container-wide max-w-3xl mx-auto"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold mb-6">Get a Free Consultation</h2>
            <p className="text-xl mb-6">Get a free consultation for {service.label} in {city.name}. Speak with a senior strategist today.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="inline-block bg-white text-dreampath-primary hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg">Contact Us</Link>
              <Link to="/services" className="inline-block border border-white text-white hover:bg-white/10 px-8 py-3 rounded-md font-medium text-lg">Explore Services</Link>
            </div>
          </motion.div>
        </section>
      </LazySection>

      {/* Internal linking */}
      <section className="section-padding">
        <div className="container-wide">
          <h2 className="text-2xl font-bold text-dreampath-primary mb-4">Explore More</h2>
          <ul className="list-disc list-inside grid md:grid-cols-2 gap-2">
            <li><Link to="/datingapps" className="text-dreampath-secondary hover:text-dreampath-primary">Dating App Development</Link></li>
            <li><Link to="/travelapps" className="text-dreampath-secondary hover:text-dreampath-primary">Travel App Development</Link></li>
            <li><Link to="/realestateapps" className="text-dreampath-secondary hover:text-dreampath-primary">Real Estate App Development</Link></li>
            <li><Link to="/fintechapps" className="text-dreampath-secondary hover:text-dreampath-primary">Fintech App Development</Link></li>
            <li><Link to="/services" className="text-dreampath-secondary hover:text-dreampath-primary">All Services Overview</Link></li>
          </ul>
        </div>
      </section>
    </div>
  );
}
