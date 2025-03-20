import type { Metadata, ResolvingMetadata } from "next";
import BlogPostContent from "@/components/BlogPost";



// Fetch blog post data
async function getBlogPostBySlug(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_URL || ""}/api/blogs/${slug}`,
      {
        next: { revalidate: 3600 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blog post");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching blog post:", error);
    throw new Error("Failed to fetch blog post");
  }
}

// Generate metadata for SEO
export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Fetch blog post data
  const {slug} = await params;
  const post = await getBlogPostBySlug(slug);

  // Get parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: post?.data?.title || "Blog Post",
    description: post?.data?.excerpt || "Read our latest blog post",
    authors: post?.data?.author ? [{ name: post.data.author }] : undefined,
    keywords: post?.data?.tags || [],
    openGraph: {
      title: post?.data?.title,
      description: post?.data?.excerpt || "Read our latest blog post",
      type: "article",
      publishedTime: post?.data?.publishDate,
      modifiedTime: post?.data?.updatedAt,
      authors: post?.data?.author,
      images: [post?.data?.coverImage, ...previousImages],
      tags: post?.data?.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post?.data?.title,
      description: post?.data?.excerpt || "Read our latest blog post",
      images: [post?.data?.coverImage],
      // creator: post?.data?.author,
      // site: "@manjuverma",
    },
    alternates: {
      canonical: `https://manjuverma.com/blog/${slug}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// Main page component
export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  // Fetch blog post data
  const {slug} = await params;
  const post = await getBlogPostBySlug(slug);

  return (
  
      <BlogPostContent post={post} />
    
  );
}
