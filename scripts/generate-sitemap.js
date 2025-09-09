const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// Base URL for your site
const siteUrl = 'https://dreampath-solutions.com';

// List of all static routes
const staticRoutes = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  { url: '/about', changefreq: 'weekly', priority: 0.8 },
  { url: '/services', changefreq: 'weekly', priority: 0.9 },
  { url: '/portfolio', changefreq: 'weekly', priority: 0.8 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy', changefreq: 'monthly', priority: 0.3 },
  { url: '/terms', changefreq: 'monthly', priority: 0.3 },
  { url: '/blogs', changefreq: 'daily', priority: 0.8 },
  { url: '/submit-blog', changefreq: 'monthly', priority: 0.5 },
];

// List of all service detail pages
const serviceSlugs = [
  'custom-software-development',
  'web-development',
  'mobile-app-development',
  'ui-ux-design',
  'database-development',
  'cybersecurity',
  'cloud-solutions',
  'devops-solutions',
  'it-consulting',
  'reputation-management',
  'datingapp',
  'fooddeliveryapp',
  'healthapps',
  'travelapps',
  'realestateapps',
  'astrologyapps',
  'ecommerceapps',
  'fintechapps',
  'ridehailingapps',
  'homeservicesapps',
  'edtechapps'
];

// Generate service routes with appropriate priorities
const serviceRoutes = serviceSlugs.map(slug => ({
  url: `/services/${slug}`,
  changefreq: 'weekly',
  priority: 0.8
}));

// Combine all routes
const routes = [...staticRoutes, ...serviceRoutes];

// Create sitemap
const generateSitemap = async () => {
  try {
    // Create a stream to write to
    const stream = new SitemapStream({ hostname: siteUrl });
    
    // Create a readable stream from the routes
    const xmlString = await streamToPromise(
      Readable.from(routes).pipe(stream)
    ).then((data) => data.toString());

    // Write sitemap to public directory
    fs.writeFileSync(
      path.resolve(__dirname, '../public/sitemap.xml'),
      xmlString
    );

    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
};

generateSitemap();
