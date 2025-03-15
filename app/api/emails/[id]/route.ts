import Email from "@/app/models/Email";
import connectToDatabase from "@/app/utils/db";
import { NextRequest } from "next/server";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    try {
        await connectToDatabase();

        const email = await Email.findById(id);

        if (!email) {
            return new Response(JSON.stringify({ error: "Email template not found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
            });
        }

        return new Response(JSON.stringify({ data: email }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching email template:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch email template" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    }
}