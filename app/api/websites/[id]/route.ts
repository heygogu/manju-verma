import Website from "@/app/models/Website";
import connectToDatabase from "@/app/utils/db";
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await connectToDatabase();

    const website = await Website.findById(id);

    if (!website) {
      return new Response(JSON.stringify({ error: "Website template not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ data: website }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching website template:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch website template" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
