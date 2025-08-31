import { useState } from 'react';
import Head from 'next/head';
import { NextSeo } from 'next-seo';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: 'How much to charge for a 10 page website?',
      answer: 'A professional 10-page website typically ranges from $3,000 to $10,000, depending on complexity, design requirements, and functionality. Basic informational sites start at the lower end, while custom designs and advanced features increase the cost.'
    },
    {
      question: 'How much does a 5 page website cost?',
      answer: 'A 5-page website usually costs between $1,500 and $5,000. The final price depends on design complexity, content creation needs, and any special features like contact forms or photo galleries.'
    },
    {
      question: 'How much is the cost of a 1 page website?',
      answer: 'Single-page websites typically range from $800 to $3,000. These are ideal for portfolios, product launches, or small businesses needing a simple online presence with essential information.'
    },
    {
      question: 'How many hours to build a 10 page website?',
      answer: 'Building a 10-page website typically takes 40-120 hours. This includes planning, design, development, content integration, and testing. Complex features or custom designs will extend this timeline.'
    },
    {
      question: 'How much to charge for a 20-page website?',
      answer: 'A 20-page website generally costs between $5,000 and $20,000. The price varies based on design complexity, content volume, and functionality requirements like e-commerce or member areas.'
    },
    {
      question: 'How much does a website cost in India?',
      answer: 'In India, website costs vary widely: Basic websites start at ₹10,000, mid-range business sites cost ₹25,000-₹1,00,000, and complex custom solutions can exceed ₹5,00,000, depending on features and agency expertise.'
    },
    {
      question: 'Can I make a website in 2 days?',
      answer: 'Yes, a basic website can be built in 2 days using website builders or templates. However, for custom designs or complex functionality, 1-3 weeks is more realistic to ensure quality and proper testing.'
    },
    {
      question: 'How many websites should a good developer build per day?',
      answer: 'Quality matters more than quantity. A professional developer typically spends 1-4 weeks on a single website to ensure proper functionality, responsive design, and optimization. Rushing development often leads to technical debt and poor user experience.'
    },
    {
      question: 'How many pages should a good website have?',
      answer: 'There\'s no one-size-fits-all answer. A good website needs enough pages to effectively communicate your message and guide users to conversion. Most small business websites have 5-15 pages, including Home, About, Services, Portfolio, and Contact pages.'
    }
  ];

  // Structured data for SEO
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <NextSeo 
        title="Web Development Pricing & FAQ | DreamPath Solutions"
        description="Get answers to common questions about website development costs, timelines, and best practices. Learn about our transparent pricing for websites of all sizes."
        canonical="https://www.dreampathsolutions.com/faq"
        openGraph={{
          title: 'Web Development Pricing & FAQ | DreamPath Solutions',
          description: 'Get answers to common questions about website development costs and best practices.',
          url: 'https://www.dreampathsolutions.com/faq',
          type: 'website'
        }}
      />
      
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
        />
      </Head>

      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl mb-4">
            Website Development FAQs
          </h1>
          <p className="text-xl text-gray-600">
            Answers to common questions about website development costs and timelines
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <button
                className="w-full px-6 py-5 text-left focus:outline-none"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
                aria-controls={`faq-${index}`}
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h2>
                  <svg
                    className={`w-6 h-6 text-gray-500 transform transition-transform ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    id={`faq-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 pt-2 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 rounded-lg p-6 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-4">
            Get in touch with our team for a personalized quote and consultation.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-dreampath-primary hover:bg-dreampath-primary-dark"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
