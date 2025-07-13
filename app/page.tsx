import { Suspense } from "react";
import PortfolioContent from "@/components/portfolio-content";
import PageLoader from "@/components/PageLoader2";
export const dynamic = "force-dynamic";
async function getInitialData() {
  try {
    const [blogsRes, websitesRes, emailsRes, testimonialRes] =
      await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}api/blogs?limit=6`, {
          next: { revalidate: 0 },
        }),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}api/websites/listing`, {
          next: { revalidate: 0 },
        }),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}api/emails/listing`, {
          next: { revalidate: 0 },
        }),
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}api/testimonials`, {
          next: { revalidate: 0 },
        }),
      ]);

    const blogData = await blogsRes.json();
    const websiteData = await websitesRes.json();
    const emailData = await emailsRes.json();
    const testimonialData = await testimonialRes.json();

    return {
      blogListing: {
        data: blogData.data || [],
      },
      websiteListing: websiteData,
      emailListing: emailData,
      testimonials: testimonialData,
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      blogListing: { data: [] },
      websiteListing: { data: [] },
      emailListing: { data: [] },
      testimonials: { data: [] },
    };
  }
}

export default async function Portfolio() {
  const initialData = await getInitialData();

  return (
    <Suspense fallback={<PageLoader />}>
      <PortfolioContent initialData={initialData} />
    </Suspense>
  );
}
