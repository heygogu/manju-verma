import { NextResponse } from "next/server";
async function getBlogsFromDatabase() {

    //call nexts api
    const res = await fetch("https://manjuverma.com/api/blogs");
    const data = await res.json();

   return data?.data;

}

export async function GET() {
  const baseUrl = "https://manjuverma.com";

  // Define static pages
  const staticPages = ["/"];

  // Fetch dynamic blog posts
  const blogs = await getBlogsFromDatabase();
  const blogUrls = blogs.map((blog:any) => `/blog/${blog?.slug}`);

  // Generate sitemap XML
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
