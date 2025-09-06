import React from "react";
import { motion } from "framer-motion";

const reviews = [
  // Indian
  { name: "Aarav Sharma", role: "Founder, Fintech Startup", quote: "DreamPath delivered our MVP 3 weeks ahead of schedule with top-notch quality." },
  { name: "Ishita Gupta", role: "Head of Marketing, D2C Brand", quote: "Site speed jumped 40% and our conversions improved dramatically." },
  { name: "Rahul Verma", role: "Product Manager, HealthTech", quote: "Clean architecture and reliable releases from a proactive team." },
  { name: "Priya Patel", role: "CEO, MedTech Solutions", quote: "Their attention to detail and proactive approach is remarkable." },
  { name: "Arjun Kapoor", role: "CTO, EduTech Innovations", quote: "Our platform's performance improved by 200% after their optimizations." },
  { name: "Ananya Iyer", role: "Founder, StyleBazaar", quote: "E-commerce revenue doubled within 3 months of their redesign." },
  { name: "Vikram Singh", role: "CEO, AgriTech Solutions", quote: "Transformed our agricultural platform with cutting-edge technology." },
  { name: "Meera Nair", role: "Head of Product, FinServe", quote: "Exceptional fintech solutions with a deep understanding of Indian markets." },
  { name: "Rohan Mehta", role: "Founder, TravelMint", quote: "Built our travel platform from scratch with amazing attention to detail." },
  { name: "Neha Reddy", role: "CTO, HealthFirst", quote: "Reliable healthcare solutions that scale with our growing user base." },
  { name: "Karthik Nair", role: "CEO, EduFutura", quote: "Our learning platform's engagement tripled after their optimizations." },
  { name: "Divya Menon", role: "Product Lead, ShopEase", quote: "Seamless e-commerce integration with multiple payment gateways." },
  { name: "Sanjay Deshmukh", role: "CTO, AgroNext", quote: "IoT integrations were smooth and scalable." },
  { name: "Pooja Kulkarni", role: "COO, FreshKart", quote: "Checkout experience improved and cart drops reduced 35%." },
  { name: "Nikhil Bansal", role: "VP Engineering, LendFast", quote: "Robust architecture with clean DevOps pipelines." },
  { name: "Aisha Khan", role: "Founder, HealWell", quote: "HIPAA-ready workflows implemented flawlessly." },
  { name: "Ritika Agarwal", role: "Head of Product, EduSpark", quote: "Gamification boosted retention across cohorts." },
  { name: "Manish Soni", role: "CTO, FleetGo", quote: "Real-time tracking with impressive reliability." },
  { name: "Neeraj Malhotra", role: "CEO, InsureNow", quote: "Underwriting automation cut processing time by 60%." },
  { name: "Kavya Rao", role: "Product Lead, PayWave", quote: "UPI-first flows integrated with stellar UX." },
  { name: "Harsh Vardhan", role: "Founder, BuildMate", quote: "B2B marketplace scaled to 100k SKUs seamlessly." },
  { name: "Sneha Pillai", role: "Growth Lead, LearnUp", quote: "Onboarding completion increased by 47%." },
  { name: "Rohit Kulkarni", role: "CTO, SportsHub", quote: "Live scoring and streaming handled flawlessly." },
  { name: "Shreya Banerjee", role: "CEO, CraftCart", quote: "SEO clicks up 120% with lightning-fast pages." },
  { name: "Tarun Kapoor", role: "Head of Engineering, SafeBank", quote: "Top-tier security and compliance from day one." },
  { name: "Ankit Jain", role: "Founder, Tutorly", quote: "Launched our mobile app in 6 weeks. Smooth process." },
  { name: "Bhavya Shah", role: "COO, MedLink", quote: "Interoperability with existing systems was seamless." },
  { name: "Gaurav Mishra", role: "VP Product, GameOn", quote: "Scalable realtime infra for tournaments worked great." },
  { name: "Tanya Chopra", role: "CMO, BeautyBay", quote: "Personalization increased AOV significantly." },
  { name: "Yash Patel", role: "Head of Product, QuickServe", quote: "Service uptime at 99.99% since launch." },
  { name: "Aman Arora", role: "CEO, RealtyPro", quote: "Listings load instantly with great map UX." },
  { name: "Kritika Sinha", role: "Product Manager, FitLife", quote: "Habit streaks and push flows boosted engagement." },
  // International
  { name: "Emily Johnson", role: "CEO, TechStart Inc.", quote: "DreamPath transformed our platform completely. 150% ROI in 6 months!" },
  { name: "Michael Chen", role: "CTO, HealthPlus", quote: "Their team's expertise in healthcare tech is unmatched. Delivered ahead of schedule." },
  { name: "Sarah Williams", role: "Founder, EduTech Pro", quote: "Our user engagement tripled after their redesign. Exceptional work!" },
  { name: "David Kim", role: "Product Lead, Finova", quote: "Reliable, professional, and incredibly skilled. A true partner in every sense." },
  { name: "Olivia Martinez", role: "CMO, StyleHub", quote: "Our e-commerce revenue grew by 180% post their optimizations." },
  { name: "James Wilson", role: "Director, CloudNova", quote: "Best decision we made was choosing DreamPath for our cloud migration." },
  { name: "Robert Taylor", role: "Head of Product, EduFuture", quote: "We've worked with many firms, but DreamPath stands out." },
  { name: "Jennifer Lee", role: "Founder, GreenTech", quote: "Sustainable solutions that actually work. Highly recommended!" },
  { name: "Thomas Brown", role: "CTO, SecureNet", quote: "Security-first approach gave us the confidence we needed." },
  { name: "Liam Thompson", role: "COO, RetailWorks", quote: "Inventory accuracy and speed improved dramatically." },
  { name: "Emma Davis", role: "VP Growth, MediaMax", quote: "Analytics we can trust, finally. Great team to work with." },
  { name: "Noah Anderson", role: "Founder, SaaSly", quote: "From idea to launch in record time with zero compromises." },
  { name: "Sophia Garcia", role: "Head of Design, PixelPro", quote: "World-class UX delivered on time and on budget." },
  { name: "Mason White", role: "CTO, FinEdge", quote: "Secure, compliant, and fast. Exactly what we needed." },
  { name: "Isabella Moore", role: "CMO, FoodJoy", quote: "Conversion rates up 2.4x after their CRO work." },
  { name: "Jack Miller", role: "CPO, FinCore", quote: "APIs are clean, well-documented, and reliable." },
  { name: "Ava Robinson", role: "CEO, TravelMore", quote: "Search speed and relevancy are on another level." },
  { name: "Ethan Walker", role: "CTO, HealthSync", quote: "Data pipelines with zero data loss. Impressive." },
  { name: "Mia Young", role: "Head of Marketing, ShopVerse", quote: "Attribution is finally accurate. ROAS up 1.8x." },
  { name: "Lucas Hall", role: "Founder, CloudEdge", quote: "Infra costs reduced 30% without performance loss." },
  { name: "Amelia Allen", role: "Product Lead, EduFlow", quote: "Students love the new experience. NPS +22." },
  { name: "Benjamin Scott", role: "CTO, AutoSense", quote: "ML models deployed with solid MLOps discipline." },
  { name: "Charlotte King", role: "Founder, EduPilot", quote: "Cohort analytics gave us actionable insights quickly." },
  { name: "Henry Adams", role: "Head of Ops, ShipFast", quote: "Order throughput doubled after workflow revamp." },
  { name: "Victoria Brooks", role: "CIO, SecurePay", quote: "Audit-ready logs and excellent alerting." },
  { name: "Daniel Perez", role: "CEO, GreenLeaf", quote: "Sustainability features that actually drive savings." },
];

const allReviews = [...reviews, ...reviews];

const ReviewsMarquee: React.FC = () => {
  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [halfWidth, setHalfWidth] = React.useState(0);
  const offsetRef = React.useRef(0);
  const rafRef = React.useRef<number | null>(null);
  const speedPxPerSec = 60;
  const lastTsRef = React.useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = React.useState(false);
  const [activeDot, setActiveDot] = React.useState(0);

  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener('change', onChange);

    const measure = () => {
      const el = trackRef.current;
      if (!el) return;
      setHalfWidth(el.scrollWidth / 2);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      mq.removeEventListener('change', onChange);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  React.useEffect(() => {
    if (reducedMotion || halfWidth <= 0) return;
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      offsetRef.current += speedPxPerSec * dt;
      if (offsetRef.current >= halfWidth) offsetRef.current -= halfWidth;
      const el = trackRef.current;
      if (el) el.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      const fraction = offsetRef.current / halfWidth;
      const dot = Math.floor((fraction * 5) % 5);
      if (dot !== activeDot) setActiveDot(dot);
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [halfWidth, reducedMotion, activeDot]);

  const jumpToFraction = (fraction: number) => {
    if (halfWidth <= 0) return;
    offsetRef.current = (halfWidth * fraction) % halfWidth;
    const el = trackRef.current;
    if (el) el.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
    setActiveDot(Math.floor((fraction * 5) % 5));
  };

  return (
    <motion.div
      className="container-wide"
      initial={{ opacity: 0, filter: "blur(12px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-4xl font-bold mb-4 text-dreampath-primary">What Our Clients Say</h2>
        <p className="text-lg text-gray-600">Hear from 50+ founders, product leaders, and marketers who trusted us.</p>
      </div>

      <div className="relative">
        <div className="relative h-64 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full flex items-center">
            <div ref={trackRef} data-marquee-track className="w-max flex flex-nowrap whitespace-nowrap will-change-transform">
              {allReviews.map((review, idx) => (
                <div
                  key={`rev-${idx}`}
                  aria-hidden={idx >= reviews.length}
                  className="w-56 sm:w-60 mx-1 sm:mx-2 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow whitespace-normal break-words overflow-hidden align-top shrink-0"
                >
                  <div className="flex items-center mb-4">
                    <div className="h-12 w-12 rounded-full bg-dreampath-primary/10 flex items-center justify-center text-dreampath-primary font-bold text-xl">
                      {review.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">{review.name}</h4>
                      <p className="text-sm text-gray-500">{review.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic break-words leading-relaxed">"{review.quote}"</p>
                  <div className="mt-3 flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-24 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
        <div className="absolute top-0 left-0 w-24 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
      </div>

      <div className="flex justify-center mt-8 space-x-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <button
            key={i}
            onClick={() => jumpToFraction(i / 5)}
            className={`w-2 h-2 rounded-full ${i === activeDot ? 'bg-dreampath-primary' : 'bg-gray-300'} hover:bg-dreampath-primary/80`}
            aria-label={`Jump to position ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-marquee-track] { transform: none !important; }
        }
      `}</style>
    </motion.div>
  );
};

export default ReviewsMarquee;
