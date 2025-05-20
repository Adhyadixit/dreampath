import React from 'react';
import PageHeader from '@/components/common/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CookiePolicy = () => {
  return (
    <div className="container-wide py-12">
      <PageHeader 
        title="Cookie Policy" 
        description="Last updated: May 20, 2025"
      />
      
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-dreampath-primary">
            Our Use of Cookies
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-gray-700">
          <section>
            <p className="mb-4">
              This Cookie Policy explains how DreamPath Solutions ("we," "us," or "our") uses cookies and similar 
              technologies when you visit our website. By using our website, you consent to the use of cookies in 
              accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">1. What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files that are stored on your device when you visit a website. They are 
              widely used to make websites work more efficiently and to provide information to the website owners.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">2. Types of Cookies We Use</h2>
            <div className="mb-4 space-y-4">
              <div>
                <h3 className="font-semibold">Essential Cookies</h3>
                <p>
                  These cookies are necessary for the website to function and cannot be switched off. They are 
                  usually only set in response to actions made by you such as setting your privacy preferences, 
                  logging in, or filling in forms.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Analytics Cookies</h3>
                <p>
                  These cookies allow us to count visits and traffic sources so we can measure and improve 
                  the performance of our site. They help us know which pages are the most and least popular 
                  and see how visitors move around the site.
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Marketing Cookies</h3>
                <p>
                  These cookies may be set through our site by our advertising partners. They may be used by 
                  those companies to build a profile of your interests and show you relevant ads on other sites.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">3. Managing Cookies</h2>
            <p className="mb-4">
              You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject 
              cookies, you may still use our website though your access to some functionality and areas of our 
              website may be restricted.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">4. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting 
              the new Cookie Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3 text-dreampath-secondary">5. Contact Us</h2>
            <p>
              If you have any questions about our use of cookies, please contact us at:
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

export default CookiePolicy;
