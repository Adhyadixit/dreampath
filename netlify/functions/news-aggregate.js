// Netlify Function: Aggregated News
// Aggregates GNews, NewsData.io, MediaStack, and Google News RSS server-side to avoid CORS/mixed-content.

const GNEWS_KEY = process.env.VITE_GNEWS_KEY || process.env.GNEWS_KEY;
const NEWSDATA_KEY = process.env.VITE_NEWSDATA_KEY || process.env.NEWSDATA_KEY;
const MEDIASTACK_KEY = process.env.VITE_MEDIASTACK_KEY || process.env.MEDIASTACK_KEY;

/** @typedef {{title:string, description:string, url:string, image:string|null, source:string, published_at:string}} Article */

async function fetchJSON(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.json();
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${url} -> ${res.status}`);
  return res.text();
}

/** @returns {Promise<Article[]>} */
async function fetchGNews() {
  try {
    if (!GNEWS_KEY) return [];
    const q = encodeURIComponent('(tech OR "AI tools" OR AI OR "machine learning" OR IT OR jobs OR freelance OR politics)');
    const url = `https://gnews.io/api/v4/search?q=${q}&lang=en&max=20&apikey=${GNEWS_KEY}`;
    const json = await fetchJSON(url);
    const items = Array.isArray(json?.articles) ? json.articles : [];
    return items.map((a) => ({
      title: a.title,
      description: a.description || '',
      url: a.url,
      image: a.image || null,
      source: a.source?.name || 'GNews',
      published_at: a.publishedAt || new Date().toISOString(),
    }));
  } catch (e) {
    console.warn('GNews error:', e.message);
    return [];
  }
}

/** @returns {Promise<Article[]>} */
async function fetchNewsData() {
  try {
    if (!NEWSDATA_KEY) return [];
    const to = new Date();
    const from = new Date(to.getTime() - 7 * 24 * 60 * 60 * 1000);
    const fmt = (d) => d.toISOString().slice(0, 10);
    const q = encodeURIComponent('tech OR AI OR "machine learning" OR IT OR jobs OR freelancers OR politics');
    const url = `https://newsdata.io/api/1/archive?apikey=${NEWSDATA_KEY}&q=${q}&language=en&from_date=${fmt(from)}&to_date=${fmt(to)}&size=20`;
    const json = await fetchJSON(url);
    const items = Array.isArray(json?.results) ? json.results : [];
    return items.map((r) => ({
      title: r.title,
      description: r.description || r.content || '',
      url: r.link || r.url,
      image: r.image_url || null,
      source: r.source_id || 'NewsData',
      published_at: r.pubDate ? new Date(r.pubDate).toISOString() : new Date().toISOString(),
    }));
  } catch (e) {
    console.warn('NewsData error:', e.message);
    return [];
  }
}

/** @returns {Promise<Article[]>} */
async function fetchMediaStack() {
  try {
    if (!MEDIASTACK_KEY) return [];
    const keywords = encodeURIComponent('tech, AI, machine learning, jobs, freelance, politics');
    const url = `http://api.mediastack.com/v1/news?access_key=${MEDIASTACK_KEY}&keywords=${keywords}&countries=us,gb,de&languages=en&limit=30`;
    const json = await fetchJSON(url);
    const items = Array.isArray(json?.data) ? json.data : [];
    return items.map((n) => ({
      title: n.title,
      description: n.description || '',
      url: n.url,
      image: n.image || null,
      source: n.source || 'MediaStack',
      published_at: n.published_at || n.publishedAt || new Date().toISOString(),
    }));
  } catch (e) {
    console.warn('MediaStack error:', e.message);
    return [];
  }
}

/** @returns {Promise<Article[]>} */
async function fetchGoogleNewsRSS() {
  try {
    const q = encodeURIComponent('tech OR AI OR "machine learning" OR IT OR jobs OR freelancers OR politics');
    const url = `https://news.google.com/rss/search?q=${q}&hl=en-US&gl=US&ceid=US:en`;
    const xml = await fetchText(url);

    // Naive RSS parsing to avoid extra deps
    const items = xml.split('<item>').slice(1);
    const parseTag = (s, tag) => {
      const m = s.match(new RegExp(`<${tag}>([\s\S]*?)<\/${tag}>`));
      return m ? m[1].replace(/<!\[CDATA\[(.*?)\]\]>/g, '$1') : '';
    };
    return items.slice(0, 20).map((chunk) => {
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
      };
    });
  } catch (e) {
    console.warn('Google RSS error:', e.message);
    return [];
  }
}

exports.handler = async function handler(event) {
  try {
    const [a, b, c, d] = await Promise.all([
      fetchGNews(),
      fetchNewsData(),
      fetchMediaStack(),
      fetchGoogleNewsRSS(),
    ]);
    const merged = [...a, ...b, ...c, ...d];
    const seen = new Set();
    const unique = [];
    for (const it of merged) {
      const key = it.url || it.title;
      if (key && !seen.has(key)) {
        seen.add(key);
        unique.push(it);
      }
    }
    unique.sort((x, y) => new Date(y.published_at).getTime() - new Date(x.published_at).getTime());

    return {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=300',
      },
      body: JSON.stringify({ data: unique }),
    };
  } catch (e) {
    return {
      statusCode: 500,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ error: e.message }),
    };
  }
}
