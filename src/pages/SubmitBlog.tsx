import React from "react";
import SEO from "@/components/common/SEO";
import PageHeader from "@/components/common/PageHeader";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { blogsApi } from "@/lib/api";
import { toast } from "sonner";

const schema = z.object({
  title: z.string().min(5, "Title is too short"),
  content: z.string().min(50, "Please write at least 50 characters"),
  author_name: z.string().min(2, "Name is required"),
  author_email: z.string().email("Invalid email"),
  cover_image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.string().optional(), // comma separated
});

type FormValues = z.infer<typeof schema>;

const SubmitBlog: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const tags = (values.tags || "")
        .split(",")
        .map(t => t.trim())
        .filter(Boolean);
      await blogsApi.submit({
        title: values.title,
        content: values.content,
        cover_image: values.cover_image || undefined,
        author_name: values.author_name,
        author_email: values.author_email,
        tags,
      });
      toast.success("Submitted! Your blog will appear after admin approval.");
      reset();
    } catch (e: any) {
      toast.error(e?.message || "Submission failed");
    }
  };

  return (
    <div>
      <SEO title="Submit Blog | DreamPath Solutions" description="Submit your blog for admin approval." canonical="https://dreampathsolutions.in/submit-blog" />
      <PageHeader title="Write a Blog" description="Your submission will be reviewed by admin." />

      <section className="section-padding bg-white">
        <div className="container-wide max-w-3xl">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" {...register("title")} />
              {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" rows={10} {...register("content")} />
              {errors.content && <p className="text-sm text-red-600">{errors.content.message}</p>}
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="author_name">Your Name</Label>
                <Input id="author_name" {...register("author_name")} />
                {errors.author_name && <p className="text-sm text-red-600">{errors.author_name.message}</p>}
              </div>
              <div>
                <Label htmlFor="author_email">Your Email</Label>
                <Input id="author_email" {...register("author_email")} />
                {errors.author_email && <p className="text-sm text-red-600">{errors.author_email.message}</p>}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cover_image">Cover Image URL (optional)</Label>
                <Input id="cover_image" placeholder="https://..." {...register("cover_image")} />
                {errors.cover_image && <p className="text-sm text-red-600">{errors.cover_image.message}</p>}
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input id="tags" placeholder="react, startup, mobile" {...register("tags")} />
              </div>
            </div>
            <div>
              <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Submitting..." : "Submit"}</Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default SubmitBlog;
