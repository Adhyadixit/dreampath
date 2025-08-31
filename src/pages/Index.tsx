import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/common/ScrollToTop";
import Loader from "@/components/common/Loader";

// Route-based code splitting
const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));
const Services = lazy(() => import("./Services"));
const Portfolio = lazy(() => import("./Portfolio"));
const Contact = lazy(() => import("./Contact"));
const SignUp = lazy(() => import("./SignUp"));
const Login = lazy(() => import("./Login"));
const PrivacyPolicy = lazy(() => import("./PrivacyPolicy"));
const TermsOfService = lazy(() => import("./TermsOfService"));
const AdminLogin = lazy(() => import("./AdminLogin"));
const AdminDashboard = lazy(() => import("./AdminDashboard"));
const UserAccount = lazy(() => import("./UserAccount"));
const NotFound = lazy(() => import("./NotFound"));
const ServiceKeywords = lazy(() => import("./ServiceKeywords"));
const SupabaseTest = lazy(() => import("./SupabaseTest"));
const ReputationManagement = lazy(() => import("./services/ReputationManagement"));
const DatingApp = lazy(() => import("./services/DatingApp"));
const FoodDeliveryApp = lazy(() => import("./services/FoodDeliveryApp"));
const HealthApps = lazy(() => import("./services/HealthApps"));
const TravelApps = lazy(() => import("./services/TravelApps"));
const RealEstateApps = lazy(() => import("./services/RealEstateApps"));
const AstrologyApps = lazy(() => import("./services/AstrologyApps"));
const EcommerceApps = lazy(() => import("./services/EcommerceApps"));
const FintechWalletApps = lazy(() => import("./services/FintechWalletApps"));
const RideHailingApps = lazy(() => import("./services/RideHailingApps"));
const HomeServicesApps = lazy(() => import("./services/HomeServicesApps"));
const EdTechApps = lazy(() => import("./services/EdTechApps"));
const Blogs = lazy(() => import("./Blogs"));
const SubmitBlog = lazy(() => import("./SubmitBlog"));

const Index = () => {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/account" element={<UserAccount />} />
          <Route path="/service-keywords" element={<ServiceKeywords />} />
          <Route path="/services/reputation-management" element={<ReputationManagement />} />
          <Route path="/datingapp" element={<DatingApp />} />
          <Route path="/fooddeliveryapp" element={<FoodDeliveryApp />} />
          <Route path="/healthapps" element={<HealthApps />} />
          <Route path="/travelapps" element={<TravelApps />} />
          <Route path="/realestateapps" element={<RealEstateApps />} />
          <Route path="/astrologyapps" element={<AstrologyApps />} />
          <Route path="/ecommerceapps" element={<EcommerceApps />} />
          <Route path="/fintechapps" element={<FintechWalletApps />} />
          <Route path="/ridehailingapps" element={<RideHailingApps />} />
          <Route path="/homeservicesapps" element={<HomeServicesApps />} />
          <Route path="/edtechapps" element={<EdTechApps />} />
          <Route path="/supabase-test" element={<SupabaseTest />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/submit-blog" element={<SubmitBlog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Index;
