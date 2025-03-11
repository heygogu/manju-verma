import { NextRequest } from "next/server";
import Blog from "@/app/models/BlogPost";
import connectToDatabase from "@/app/utils/db";


export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  try {
    await connectToDatabase();

    const blog = await Blog.findOne({ slug });

    if (!blog) {
      return new Response(JSON.stringify({ error: "Blog not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ data: blog }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch blog" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
