
import Blog from "@/app/models/BlogPost";
import connectToDatabase from "@/app/utils/db";

export async function GET(req: Request) {
  try {
    // Connect to database
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 100;
    const search = searchParams.get("search") || "";

    // Calculate pagination offset
    const skip = (page - 1) * limit;

    // Create search query
    const searchQuery = search
      ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { content: { $regex: search, $options: "i" } },
        ],
      }
      : {};

    console.log("Executing MongoDB query with:", { searchQuery, skip, limit });

    // Fetch blogs with pagination
    const blogs = await Blog.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();



    return Response.json({
      data: blogs,

    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return Response.json({
      error: "Failed to fetch blogs",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}