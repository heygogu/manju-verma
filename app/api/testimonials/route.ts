

import connectToDatabase from "@/app/utils/db";
import Testimonial from "@/app/models/testimonial";


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
            { companyName: { $regex: search, $options: "i" } }, 
            { clientName: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    console.log("Executing MongoDB query with:", { searchQuery, skip, limit });
    
    // Fetch blogs with pagination
    const testimonials = await Testimonial.find(searchQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    console.log(`Successfully retrieved ${testimonials.length} testimonials`);

    // Count total testimonials matching the search
    const totalTestimonial = await Testimonial.countDocuments(searchQuery);

    return Response.json({
      data: testimonials,
      count: totalTestimonial,
      currentPage: page,
      totalPages: Math.ceil(totalTestimonial / limit),
    });
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return Response.json({ 
      error: "Failed to fetch testimonials", 
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}
