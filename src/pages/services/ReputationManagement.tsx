import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, MapPin, TrendingUp, Check, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import PageHeader from '@/components/common/PageHeader';

const ReputationManagement = () => {
  return (
    <div className="min-h-screen">
      <PageHeader 
        title="Online Reputation & Local SEO"
        description="Build trust and credibility with our comprehensive reputation management and local SEO services"
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-dreampath-primary mb-6">Why Your Online Reputation Matters</h2>
              <p className="text-lg text-gray-700 mb-8">
                In today's digital world, your online reputation can make or break your business. 
                We help you build, manage, and protect your online presence through ethical and 
                effective reputation management strategies.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-dreampath-secondary/10 p-3 rounded-full w-fit mb-4">
                    <Star className="h-8 w-8 text-dreampath-secondary" />
                  </div>
                  <CardTitle>Review Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Professional review generation strategies</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Review response templates and monitoring</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Trustpilot and Google review optimization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-dreampath-secondary/10 p-3 rounded-full w-fit mb-4">
                    <MapPin className="h-8 w-8 text-dreampath-secondary" />
                  </div>
                  <CardTitle>Local SEO Optimization</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Google My Business profile optimization</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Local citation building and cleanup</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Location-based keyword targeting</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-dreampath-secondary/10 p-3 rounded-full w-fit mb-4">
                    <ShieldCheck className="h-8 w-8 text-dreampath-secondary" />
                  </div>
                  <CardTitle>Negative PR Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Negative review suppression strategies</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Crisis communication planning</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Brand protection monitoring</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="bg-dreampath-secondary/10 p-3 rounded-full w-fit mb-4">
                    <TrendingUp className="h-8 w-8 text-dreampath-secondary" />
                  </div>
                  <CardTitle>Performance Tracking</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Monthly performance reports</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>Competitor analysis</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>ROI measurement and optimization</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gradient-to-r from-dreampath-primary/5 to-dreampath-secondary/5 p-8 rounded-2xl mb-16">
              <h3 className="text-2xl font-bold text-dreampath-primary mb-4">Our Ethical Approach</h3>
              <p className="text-gray-700 mb-6">
                We strictly adhere to all platform terms of service while helping you build a strong, 
                authentic online presence. Our strategies focus on genuine customer engagement and 
                ethical marketing practices to deliver sustainable, long-term results.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">100% Platform Compliant</h4>
                    <p className="text-gray-600">We follow all Google and Trustpilot guidelines</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Transparent Reporting</h4>
                    <p className="text-gray-600">Clear metrics and regular progress updates</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-6 w-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Sustainable Growth</h4>
                    <p className="text-gray-600">Focus on long-term reputation building</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-dreampath-primary mb-6">Ready to Enhance Your Online Reputation?</h3>
              <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                Contact us today to discuss how we can help you build trust, improve visibility, 
                and manage your online reputation effectively.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/contact">
                  <Button className="bg-dreampath-primary hover:bg-dreampath-primary/90 px-8 py-6 text-lg">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="px-8 py-6 text-lg">
                    Schedule a Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ReputationManagement;
