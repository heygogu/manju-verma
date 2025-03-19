import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    `User-agent: *
    Allow: /
    Sitemap: https://manjuverma.com/api/sitemap.xml`,
    { headers: { "Content-Type": "text/plain" } }
  );
}