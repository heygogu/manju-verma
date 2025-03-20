import { Suspense } from "react";
import PortfolioContent from "@/components/portfolio-content";
import PageLoader from "@/components/PageLoader2";

async function getInitialData() {
  try {
    const [blogsRes, websitesRes, emailsRes, testimonialRes] =
      await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_DEV_BASE_URL || ""}/api/blogs?limit=6`, {
          cache: "no-store",
        }),
        fetch(`${process.env.NEXT_PUBLIC_DEV_BASE_URL || ""}/api/websites/listing`, {
          cache: "no-store",
        }),
        fetch(`${process.env.NEXT_PUBLIC_DEV_BASE_URL || ""}/api/emails/listing`, {
          cache: "no-store",
        }),
        fetch(`${process.env.NEXT_PUBLIC_DEV_BASE_URL || ""}/api/testimonials`, {
          cache: "no-store",
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
