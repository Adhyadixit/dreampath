// Vercel Serverless Function: Aggregated News
// Aggregates GNews, NewsData.io, MediaStack, and Google News RSS server-side to avoid CORS/mixed-content.
// Deployed at: /api/news-aggregate

const GNEWS_KEY = process.env.GNEWS_KEY || process.env.VITE_GNEWS_KEY;
const NEWSDATA_KEY = process.env.NEWSDATA_KEY || process.env.VITE_NEWSDATA_KEY;
const MEDIASTACK_KEY = process.env.MEDIASTACK_KEY || process.env.VITE_MEDIASTACK_KEY;

export type Article = {
  title: string;
  description: string;
  url: string;
  image: string | null;
  source: string;
  published_at: string;
};

async function fetchJSON(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

async function fetchText(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.text();
}

async function fetchGNews(): Promise<Article[]> {
  try {
    if (!GNEWS_KEY) return [];
    const q = encodeURIComponent('(tech OR "AI tools" OR AI OR "machine learning" OR IT OR jobs OR freelance OR politics)');
    const url = `https://gnews.io/api/v4/search?q=${q}&lang=en&max=20&apikey=${GNEWS_KEY}`;
    const json = await fetchJSON(url);
    const items = Array.isArray(json?.articles) ? json.articles : [];
    return items.map((a: any) => ({
      title: a.title,
      description: a.description || '',
      url: a.url,
      image: a.image || null,
      source: a.source?.name || 'GNews',
      published_at: a.publishedAt || new Date().toISOString(),
    }));
  } catch (e: any) {
    console.warn('GNews error:', e?.message || e);
    return [];
  }
}

async function fetchNewsData(): Promise<Article[]> {
  try {
    if (!NEWSDATA_KEY) return [];
    const to = new Date();
    const from = new Date(to.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().slice(0, 10);
    const q = encodeURIComponent('tech OR AI OR "machine learning" OR IT OR jobs OR freelancers OR politics');
    const url = `https://newsdata.io/api/1/archive?apikey=${NEWSDATA_KEY}&q=${q}&language=en&from_date=${fmt(from)}&to_date=${fmt(to)}&size=20`;
    const json = await fetchJSON(url);
    const items = Array.isArray(json?.results) ? json.results : [];
    return items.map((r: any) => ({
      title: r.title,
      description: r.description || r.content || '',
      url: r.link || r.url,
      image: r.image_url || null,
      source: r.source_id || 'NewsData',
      published_at: r.pubDate ? new Date(r.pubDate).toISOString() : new Date().toISOString(),
    }));
  } catch (e: any) {
    console.warn('NewsData error:', e?.message || e);
    return [];
  }
}

async function fetchMediaStack(): Promise<Article[]> {
  try {
    if (!MEDIASTACK_KEY) return [];
    const keywords = encodeURIComponent('tech, AI, machine learning, jobs, freelance, politics');
    const url = `http://api.mediastack.com/v1/news?access_key=${MEDIASTACK_KEY}&keywords=${keywords}&countries=us,gb,de&languages=en&limit=30`;
    const json = await fetchJSON(url);
    const items = Array.isArray(json?.data) ? json.data : [];
    return items.map((n: any) => ({
      title: n.title,
      description: n.description || '',
      url: n.url,
      image: n.image || null,
      source: n.source || 'MediaStack',
      published_at: n.published_at || n.publishedAt || new Date().toISOString(),
    }));
  } catch (e: any) {
    console.warn('MediaStack error:', e?.message || e);
    return [];
  }
}

async function fetchGoogleNewsRSS(): Promise<Article[]> {
  try {
    const q = encodeURIComponent('tech OR AI OR "machine learning" OR IT OR jobs OR freelancers OR politics');
    const url = `https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`;
    const xml = await fetchText(url);
    const items = xml.split('<item>').slice(1);
    const parseTag = (s: string, tag: string) => {
      const m = s.match(new RegExp(`<${tag}>([\s\S]*?)<\/${tag}>`));
      return m ? m[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') : '';
    };
    return items.slice(0, 20).map((chunk: string) => {
      const title = parseTag(chunk, 'title');
      const link = parseTag(chunk, 'link');
      const desc = parseTag(chunk, 'description');
      const pub = parseTag(chunk, 'pubDate');
      return {
        title,
        description: desc,
        url: link,
        image: null,
        source: 'Google News',
        published_at: pub ? new Date(pub).toISOString() : new Date().toISOString(),
      } as Article;
    });
  } catch (e: any) {
    console.warn('Google RSS error:', e?.message || e);
    return [];
  }
}

// Debug: Log environment variables (safely)
console.log('Environment keys present:', {
  GNEWS_KEY: !!GNEWS_KEY,
  NEWSDATA_KEY: !!NEWSDATA_KEY,
  MEDIASTACK_KEY: !!MEDIASTACK_KEY
});

export default async function handler(req: any, res: any) {
  try {
    console.log('Fetching news from all sources...');
    const [gnews, newsdata, mediastack, googlerss] = await Promise.all([
      fetchGNews(),
      fetchNewsData(),
      fetchMediaStack(),
      fetchGoogleNewsRSS(),
    ]);

    // Debug: Log counts from each source
    console.log('Fetched counts:', {
      gnews: gnews.length,
      newsdata: newsdata.length,
      mediastack: mediastack.length,
      googlerss: googlerss.length
    });

    const merged = [...gnews, ...newsdata, ...mediastack, ...googlerss];
    const seen = new Set<string>();
    const unique: Article[] = [];
    
    for (const it of merged) {
      const key = it.url || it.title;
      if (key && !seen.has(key)) {
        seen.add(key);
        unique.push(it);
      }
    }

    unique.sort((x, y) => new Date(y.published_at).getTime() - new Date(x.published_at).getTime());
    
    console.log(`Returning ${unique.length} unique articles`);
    
    res.setHeader('cache-control', 'public, max-age=300');
    res.status(200).json({ 
      data: unique,
      _debug: {
        sources: ['GNews', 'NewsData', 'MediaStack', 'Google RSS'],
        counts: [gnews.length, newsdata.length, mediastack.length, googlerss.length]
      }
    });
    
  } catch (e: any) {
    console.error('Error in news aggregation:', e);
    res.status(500).json({ 
      error: e?.message || 'Unexpected error',
      stack: process.env.NODE_ENV === 'development' ? e?.stack : undefined
    });
  }
}
