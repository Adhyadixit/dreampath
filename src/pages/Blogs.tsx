import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import SEO from "@/components/common/SEO";
import PageHeader from "@/components/common/PageHeader";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { blogsApi } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";

const Blogs: React.FC = () => {
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["approved-blogs"],
    queryFn: blogsApi.getApproved,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title="Blogs | DreamPath Solutions" 
        description="Read community-submitted blogs about apps, startups and tech." 
        canonical="https://dreampathsolutions.in/blogs" 
      />
      
      <PageHeader title="Blogs" description="Community submissions. Admin approved." />

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Latest Blog Posts</h2>
            <Button asChild>
              <Link to="/submit-blog">Write a Blog</Link>
            </Button>
          </div>
          
          {isLoading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[...Array(6)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-2" />
                    <Skeleton className="h-4 w-4/6" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-4 w-20" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : blogs && blogs.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Card key={blog.id} className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/blogs/${blog.slug}`} className="block h-full">
                    <div className="h-full flex flex-col">
                      {blog.cover_image && (
                        <div className="aspect-video overflow-hidden">
                          <img 
                            src={blog.cover_image} 
                            alt={blog.title} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}
                      <div className="flex-1 p-6 flex flex-col">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            By {blog.author_name} • {format(new Date(blog.published_at || blog.created_at), 'MMM d, yyyy')}
                          </p>
                          <p className="text-gray-600 mb-4 line-clamp-3">
                            {blog.content}
                          </p>
                        </div>
                        
                        {blog.tags && blog.tags.length > 0 && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <div className="flex flex-wrap gap-2">
                              {blog.tags.slice(0, 3).map((tag, i) => (
                                <Badge key={i} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg border border-dashed border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
              <p className="text-gray-500 mb-6">Be the first to share your thoughts and experiences.</p>
              <Button asChild>
                <Link to="/submit-blog">Write Your First Post</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
