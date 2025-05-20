import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TermsOfService = () => {
  return (
    <div className="container-wide py-12">
      <PageHeader 
        title="Terms of Service" 
        description="Last updated: May 20, 2025"
      />
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-dreampath-primary">
            Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700">
          <section>
            <p className="mb-4">
              Welcome to DreamPath Solutions. By accessing or using our website and services, you agree to be bound by these Terms of Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">1. Use of Our Services</h2>
            <p className="mb-4">
              You may use our services only as permitted by these terms and all applicable laws. You agree not to:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Use our services for any illegal purpose or in violation of any laws</li>
              <li>Interfere with or disrupt our services or servers</li>
              <li>Attempt to gain unauthorized access to our systems or user accounts</li>
              <li>Use our services to transmit any viruses or harmful code</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">2. Intellectual Property</h2>
            <p className="mb-4">
              All content included on our website and within our services, such as text, graphics, logos, and software, 
              is the property of DreamPath Solutions or its content suppliers and protected by intellectual property laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">3. Limitation of Liability</h2>
            <p className="mb-4">
              To the maximum extent permitted by law, DreamPath Solutions shall not be liable for any indirect, incidental, 
              special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or 
              indirectly, or any loss of data, use, goodwill, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">4. Changes to These Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these terms at any time. We will provide notice of any changes by posting 
              the updated terms on our website and updating the "Last updated" date at the top of this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">5. Contact Us</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <p className="mt-2">
              Email: legal@dreampathsolutions.com<br />
              Phone: (123) 456-7890<br />
              Address: 123 Business Ave, Suite 100, City, State 12345
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;
