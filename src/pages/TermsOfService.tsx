
import React from "react";
import PageHeader from "@/components/common/PageHeader";

const TermsOfService = () => {
  return (
    <div>
      <PageHeader title="Terms of Service" description="Please read these terms carefully before using our services" />

      <section className="section-padding bg-white">
        <div className="container-wide max-w-4xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Last Updated: April 29, 2025
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">1. Acceptance of Terms</h2>
            <p className="mb-6">
              By accessing and using the services provided by DreamPath Solutions ("Company", "we", "our", "us"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ("Terms"). These Terms apply to all visitors, users, and others who access or use our website, products, or services. If you do not agree with any part of these terms, you may not use our services.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">2. Description of Services</h2>
            <p className="mb-6">
              DreamPath Solutions provides custom software development, web development, mobile app development, UI/UX design, cloud solutions, and related consulting services (collectively, the "Services"). The specific details, deliverables, and timelines for each project will be defined in a separate agreement or statement of work between the Company and the client.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">3. Use of Services</h2>
            <p className="mb-4">
              You agree to use our Services only for purposes that are permitted by:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>These Terms;</li>
              <li>Any applicable law, regulation, or generally accepted practices or guidelines in the relevant jurisdictions.</li>
            </ul>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">4. User Accounts</h2>
            <p className="mb-4">
              When you create an account with us, you must provide accurate, complete, and up-to-date information. You are responsible for safeguarding the password that you use to access our Services and for any activities or actions under your password. We encourage you to use a strong password (a combination of upper and lowercase letters, numbers, and symbols) with your account.
            </p>
            <p className="mb-6">
              You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">5. Intellectual Property</h2>
            <p className="mb-4">
              Unless otherwise specified in a separate agreement:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>We retain ownership of all intellectual property rights of any kind related to our company, website, and Services, including applicable copyrights, trademarks, and other proprietary rights.</li>
              <li>Upon full payment for our Services, we grant clients a non-exclusive, worldwide, royalty-free license to use, copy, and modify any deliverables provided as part of our Services, solely for their internal business purposes.</li>
              <li>This license does not include the right to resell, redistribute, or create derivative works from our deliverables without our explicit written permission.</li>
            </ul>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">6. Payment Terms</h2>
            <p className="mb-4">
              Payment terms will be specified in the separate agreement or statement of work for each project. Unless otherwise stated:
            </p>
            <ul className="list-disc pl-6 mb-6">
              <li>All fees are quoted in US dollars and are non-refundable.</li>
              <li>We reserve the right to suspend or terminate services if payment is not received according to the agreed schedule.</li>
              <li>Clients are responsible for all taxes associated with the Services, other than taxes based on the Company's income.</li>
            </ul>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">7. Limitation of Liability</h2>
            <p className="mb-6">
              To the maximum extent permitted by applicable law, in no event shall the Company, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Services; (ii) any conduct or content of any third party on the Services; (iii) any content obtained from the Services; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">8. Indemnification</h2>
            <p className="mb-6">
              You agree to defend, indemnify, and hold harmless the Company, its directors, employees, partners, agents, suppliers, or affiliates from and against any claims, liabilities, damages, losses, and expenses, including without limitation reasonable attorneys' fees and costs, arising out of or in any way connected with (i) your access to or use of the Services; (ii) your violation of these Terms; (iii) your violation of any third-party right, including without limitation any intellectual property right, publicity, confidentiality, property, or privacy right; or (iv) any claim that content provided by you caused damage to a third party.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">9. Termination</h2>
            <p className="mb-6">
              We may terminate or suspend access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">10. Changes to Terms</h2>
            <p className="mb-6">
              We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">11. Governing Law</h2>
            <p className="mb-6">
              These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
            </p>

            <h2 className="text-2xl font-bold text-dreampath-primary mb-4">12. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <ul className="list-none mb-6">
              <li>By email: info@dreampathsolutions.in</li>
              <li>By phone: +1 (806) 240-7920</li>
              <li>By mail: 10214 Maremont Cir, Richmond VA, 23238-3604, United States</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
