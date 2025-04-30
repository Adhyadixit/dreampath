import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Services from "./Services";
import Portfolio from "./Portfolio";
import Contact from "./Contact";
import ScrollToTop from "@/components/common/ScrollToTop";
import Login from "./Login";
import SignUp from "./SignUp";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsOfService from "./TermsOfService";
import Admin from "./Admin";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import UserAccount from "./UserAccount";
import NotFound from "./NotFound";

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
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/account" element={<UserAccount />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
};

export default Index;
