import React from "react";

interface SEOProps {
  title: string;
  description?: string;
  keywords?: string[] | string;
  canonical?: string;
}

function upsertMeta(selector: string, attrs: Record<string, string>) {
  const el = document.head.querySelector<HTMLMetaElement>(selector) || document.createElement('meta');
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
  if (!el.parentElement) document.head.appendChild(el);
}

const SEO: React.FC<SEOProps> = ({ title, description, keywords, canonical }) => {
  React.useEffect(() => {
    // Title
    if (title) document.title = title;

    // Description
    if (description) {
      upsertMeta('meta[name="description"]', { name: 'description', content: description });
      // OpenGraph / Twitter mirrors
      upsertMeta('meta[property="og:title"]', { property: 'og:title', content: title });
      upsertMeta('meta[property="og:description"]', { property: 'og:description', content: description });
    }

    // Keywords
    if (keywords) {
      const content = Array.isArray(keywords) ? keywords.join(', ') : keywords;
      upsertMeta('meta[name="keywords"]', { name: 'keywords', content });
    }

    // Canonical
    if (canonical) {
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonical);
    }
  }, [title, description, JSON.stringify(keywords), canonical]);

  return null;
};

export default SEO;
