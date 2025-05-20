import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="container-wide py-12">
      <PageHeader 
        title="Privacy Policy" 
        description="Last updated: May 20, 2025"
      />
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-dreampath-primary">
            Your Privacy Matters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, such as when you create an account, 
              subscribe to our newsletter, or contact us for support. This may include your name, email address, 
              phone number, and any other information you choose to provide.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to provide, maintain, and improve our services, communicate with you, 
              and ensure the security of our services. We may also use your information to send you updates, 
              marketing communications, and other information that may be of interest to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">3. Information Sharing</h2>
            <p className="mb-4">
              We do not sell or share your personal information with third parties except as described in this 
              Privacy Policy or with your consent. We may share information with service providers who assist us in 
              operating our website and providing our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">4. Your Rights</h2>
            <p className="mb-4">
              You have the right to access, update, or delete your personal information. You may also have the right 
              to object to or restrict certain processing of your data. To exercise these rights, please contact us 
              using the information provided below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">5. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us at:
            </p>
            <p className="mt-2">
              Email: privacy@dreampathsolutions.com<br />
              Phone: (123) 456-7890<br />
              Address: 123 Business Ave, Suite 100, City, State 12345
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
