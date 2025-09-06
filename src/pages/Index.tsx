import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import SignUp from "./SignUp";
import Login from "./Login";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import UserAccount from "./UserAccount";
import NotFound from "./NotFound";
import ScrollToTop from "@/components/common/ScrollToTop";
import ServiceKeywords from "./ServiceKeywords";
import SupabaseTest from "./SupabaseTest";
import ReputationManagement from "./services/ReputationManagement";
import DatingApp from "./services/DatingApp";
import FoodDeliveryApp from "./services/FoodDeliveryApp";
import HealthApps from "./services/HealthApps";
import TravelApps from "./services/TravelApps";
import RealEstateApps from "./services/RealEstateApps";
import AstrologyApps from "./services/AstrologyApps";
import EcommerceApps from "./services/EcommerceApps";
import FintechWalletApps from "./services/FintechWalletApps";
import RideHailingApps from "./services/RideHailingApps";
import HomeServicesApps from "./services/HomeServicesApps";
import EdTechApps from "./services/EdTechApps";
import Blogs from "./Blogs";
import SubmitBlog from "./SubmitBlog";
import CityService from "./CityService";

const Index = () => {
  return (
    <>
      <ScrollToTop />
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
      {/* City-Service pretty URLs */}
      <Route path="/:citySlug-mobile-app-development" element={<CityService />} />
      <Route path="/:citySlug-website-development" element={<CityService />} />
      <Route path="/:citySlug-web-app-development" element={<CityService />} />
      <Route path="/:citySlug-seo-services" element={<CityService />} />
      <Route path="/:citySlug-local-seo" element={<CityService />} />
      <Route path="/:citySlug-google-ads" element={<CityService />} />
      <Route path="/:citySlug-meta-ads" element={<CityService />} />
      <Route path="/:citySlug-review-management" element={<CityService />} />
      <Route path="/not-found" element={<NotFound />} />
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
    </>
  );
};

export default Index;
