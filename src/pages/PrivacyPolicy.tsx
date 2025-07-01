
import React from "react";
import PageHeader from "@/components/common/PageHeader";

const PrivacyPolicy = () => {
  return (
    <div>
      <PageHeader title="Privacy Policy" description="Learn how we collect, use, and protect your data" />

      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last Updated: April 29, 2025
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">1. Introduction</h2>
            <p className="mb-4">
              DreamPath Solutions ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Dreampath is a sub branch of Shipio Logistics Private Limited.
            </p>
            <p className="mb-6">
              Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-bold mb-2">Personal Data</h3>
            <p className="mb-4">
              We may collect personal identification information from you in a variety of ways, including, but not limited to, when you visit our site, register on the site, fill out a form, and in connection with other activities, services, features or resources we make available on our site. You may be asked for, as appropriate:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Job title</li>
            </ul>

            <h3 className="text-xl font-bold mb-2">Usage Data</h3>
            <p className="mb-6">
              We may also collect information on how the website is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our website that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">3. How We Use Your Information</h2>
            <p className="mb-4">
              We may use the information we collect from you in the following ways:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>To personalize your experience and to deliver content and product offerings relevant to your interests</li>
              <li>To improve our website in order to better serve you</li>
              <li>To allow us to better service you in responding to your customer service requests</li>
              <li>To administer content, promotions, surveys or other site features</li>
              <li>To send periodic emails regarding your projects or other products and services</li>
            </ul>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">4. Data Security</h2>
            <p className="mb-6">
              We implement appropriate data collection, storage, processing practices, and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal information, username, password, transaction information, and data stored on our systems. However, no method of transmission over the Internet, or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">5. Third-Party Services</h2>
            <p className="mb-6">
              We may use third-party service providers to help us operate our business and the website or administer activities on our behalf, such as sending out newsletters or surveys. We may share your information with these third parties for those limited purposes provided that you have given us your permission.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">6. Cookies</h2>
            <p className="mb-6">
              We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">7. Your Data Protection Rights</h2>
            <p className="mb-4">
              Depending on your location, you may have certain data protection rights. These may include:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>The right to access, update or to delete the information we have on you</li>
              <li>The right of rectification</li>
              <li>The right to object to processing of your personal data</li>
              <li>The right of restriction</li>
              <li>The right to data portability</li>
              <li>The right to withdraw consent</li>
            </ul>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">8. Changes to This Privacy Policy</h2>
            <p className="mb-6">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">9. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none mb-6">
              <li>By email: info@dreampathsolutions.in</li>
              <li>By phone: +1 (831) 295-5365</li>
              <li>By WhatsApp: +1 (806) 240-7920</li>

            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
