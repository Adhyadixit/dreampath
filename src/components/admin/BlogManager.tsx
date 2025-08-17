import React from "react";
import { blogsApi } from "@/lib/api";
import type { Blog } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const statusColor: Record<Blog["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
};

const BlogManager: React.FC = () => {
  const [loading, setLoading] = React.useState(false);
  const [blogs, setBlogs] = React.useState<Blog[]>([]);

  const load = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await blogsApi.listAll();
      setBlogs(data);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const approve = async (id: string) => {
    try {
      await blogsApi.approve(id);
      toast.success("Blog approved");
      load();
    } catch (e: any) {
      toast.error(e?.message || "Failed to approve");
    }
  };

  const reject = async (id: string) => {
    try {
      await blogsApi.reject(id);
      toast.success("Blog rejected");
      load();
    } catch (e: any) {
      toast.error(e?.message || "Failed to reject");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Blog Submissions</h3>
        <Button variant="outline" onClick={load} disabled={loading}>{loading ? "Refreshing..." : "Refresh"}</Button>
      </div>
      <div className="grid gap-4">
        {blogs.map((b) => (
          <Card key={b.id}>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div className="space-y-1">
                <CardTitle className="text-lg">{b.title}</CardTitle>
                <div className="text-sm text-gray-500">by {b.author_name} • {b.author_email}</div>
              </div>
              <Badge className={statusColor[b.status]}>{b.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              {b.cover_image && (
                <img src={b.cover_image} alt={b.title} className="w-full max-w-md rounded" />
              )}
              <div className="prose max-w-none line-clamp-3 whitespace-pre-wrap text-sm text-gray-700">
                {b.content}
              </div>
              <div className="flex gap-2 flex-wrap">
                {(b.tags || []).map((t, i) => (
                  <Badge key={i} variant="secondary">{t}</Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => approve(b.id)} disabled={b.status === "approved"}>Approve</Button>
                <Button size="sm" variant="destructive" onClick={() => reject(b.id)} disabled={b.status === "rejected"}>Reject</Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {blogs.length === 0 && (
          <div className="text-sm text-gray-500">No submissions yet.</div>
        )}
      </div>
    </div>
  );
};

export default BlogManager;
