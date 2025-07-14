import { NextResponse } from "next/server";

async function getBlogsFromDatabase() {
  try {
    const res = await fetch("https://manjuverma.com/api/blogs");
    const data = await res.json();
    return data?.data || [];
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

export async function GET() {
  const baseUrl = "https://manjuverma.com";

  const staticPages = ["/"];

  const blogs = await getBlogsFromDatabase();

  const blogUrls = Array.isArray(blogs)
    ? blogs.map((blog: any) => `/blog/${blog?.slug}`)
    : [];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${[...staticPages, ...blogUrls]
      .map((page) => `<url><loc>${baseUrl}${page}</loc></url>`)
      .join("")}
    </urlset>`;

  return new NextResponse(sitemap, {
    headers: { "Content-Type": "application/xml" },
  });
}
