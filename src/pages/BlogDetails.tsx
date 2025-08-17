import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { blogsApi } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Copy, ArrowLeft, Share2 } from "lucide-react";
import SEO from "@/components/common/SEO";
import { format } from "date-fns";

export default function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: blog, isLoading, error } = useQuery({
    queryKey: ["blog", slug],
    queryFn: async () => {
      const blogs = await blogsApi.getApproved();
      return blogs.find(b => b.slug === slug);
    },
  });

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}/blogs/${slug}` : '';

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: blog?.title,
          text: blog?.content.substring(0, 100) + '...',
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-4 border-dreampath-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Blog Not Found</h1>
        <p className="mb-6">The blog post you're looking for doesn't exist or has been removed.</p>
        <Link to="/blogs" className="text-dreampath-primary hover:underline">
          ← Back to all blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <SEO 
        title={`${blog.title} | DreamPath Solutions`} 
        description={blog.content.substring(0, 160)} 
        canonical={`https://dreampathsolutions.in/blogs/${blog.slug}`}
      />
      
      <article className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to="/blogs" className="inline-flex items-center text-dreampath-primary hover:underline mb-4">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blogs
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">{blog.title}</h1>
              <div className="flex items-center text-sm text-gray-500 mb-6">
                <span>By {blog.author_name}</span>
                <span className="mx-2">•</span>
                <time dateTime={blog.published_at || blog.created_at}>
                  {format(new Date(blog.published_at || blog.created_at), 'MMMM d, yyyy')}
                </time>
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4" /> Share
            </Button>
          </div>
        </div>

        {blog.cover_image && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img 
              src={blog.cover_image} 
              alt={blog.title} 
              className="w-full h-auto max-h-96 object-cover"
            />
          </div>
        )}

        <div className="prose max-w-none">
          {blog.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="mb-4 leading-relaxed text-gray-700">
              {paragraph}
            </p>
          ))}
        </div>

        {(blog.tags?.length ?? 0) > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {blog.tags?.map((tag, i) => (
                <span 
                  key={i} 
                  className="px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
