
import connectToDatabase from "@/app/utils/db";
import Website from "@/app/models/Website";

export async function GET(req: Request) {
  try {
    // Connect to database
    await connectToDatabase();
    
 
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 6;
    const search = searchParams.get("search") || "";

    // Calculate pagination offset
    const skip = (page - 1) * limit;

    // Create search query
    const searchQuery = search
      ? {
          $or: [
            { title: { $regex: search, $options: "i" } }, 
            { clientName: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    console.log("Executing MongoDB query with:", { searchQuery, skip, limit });
    
    // Fetch blogs with pagination
    const websites = await Website.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();


    return Response.json({
      data: websites,
    });
  } catch (error) {
    console.error("Error fetching websites:", error);
    return Response.json({ 
      error: "Failed to fetch websites", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}