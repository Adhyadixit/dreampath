import React from "react";
import SEO from "@/components/common/SEO";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogsApi } from "@/lib/api";
import type { Blog } from "@/lib/types";
import { Link } from "react-router-dom";

const Blogs: React.FC = () => {
  const [loading, setLoading] = React.useState(true);
  const [blogs, setBlogs] = React.useState<Blog[]>([]);

  React.useEffect(() => {
    let active = true;
    (async () => {
      try {
        const data = await blogsApi.getApproved();
        if (active) setBlogs(data);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; };
  }, []);

  return (
    <div>
      <SEO title="Blogs | DreamPath Solutions" description="Read community-submitted blogs about apps, startups and tech." canonical="https://dreampathsolutions.in/blogs" />
      <PageHeader title="Blogs" description="Community submissions. Admin approved." />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mb-6 flex justify-end">
            <Link to="/submit-blog"><Button>Write a Blog</Button></Link>
          </div>
          {loading && <div className="text-sm text-gray-500">Loading...</div>}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((b) => (
              <Card key={b.id} className="flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{b.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 flex-1">
                  {b.cover_image && (
                    <img src={b.cover_image} alt={b.title} className="w-full h-40 object-cover rounded" />
                  )}
                  <div className="text-xs text-gray-500">by {b.author_name}</div>
                  <div className="prose text-sm max-w-none line-clamp-4 whitespace-pre-wrap">{b.content}</div>
                  <div className="flex gap-2 flex-wrap pt-2">
                    {(b.tags || []).map((t, i) => (
                      <Badge key={i} variant="secondary">{t}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          {!loading && blogs.length === 0 && (
            <div className="text-sm text-gray-500">No blogs yet. Be the first to <Link to="/submit-blog" className="underline">submit one</Link>.</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
