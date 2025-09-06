import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { newsApi } from '@/lib/api';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  image: string | null;
  source: string;
  published_at: string;
}

const TechNewsSection: React.FC = () => {
  const { data = [], isLoading } = useQuery<NewsArticle[]>({
    queryKey: ['tech-news-aggregated'],
    queryFn: () => newsApi.getAggregatedNews(),
    staleTime: 1000 * 60 * 15,
  });

  if (isLoading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border rounded-lg p-4 bg-white">
            <div className="h-6 w-3/4 bg-gray-200 animate-pulse mb-2" />
            <div className="h-4 w-full bg-gray-200 animate-pulse mb-2" />
            <div className="h-4 w-5/6 bg-gray-200 animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  if (!data.length) return (
    <div className="text-sm text-gray-500">No news available right now. Please check back later.</div>
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((article, idx) => (
        <a
          key={idx}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block border rounded-lg overflow-hidden bg-white hover:shadow-lg transition-shadow"
        >
          {article.image && (
            <img src={article.image} alt={article.title} className="w-full h-48 object-cover" />
          )}
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{article.title}</h3>
            {article.description && (
              <p className="text-sm text-gray-600 line-clamp-3">{article.description}</p>
            )}
            <div className="mt-3 text-xs text-gray-500 flex items-center justify-between">
              <span>{article.source}</span>
              <span>{new Date(article.published_at).toLocaleDateString()}</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default TechNewsSection;
