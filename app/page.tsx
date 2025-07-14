import { Suspense } from "react";
import PortfolioContent from "@/components/portfolio-content";
import PageLoader from "@/components/PageLoader2";

export default async function Portfolio() {
  return (
    <Suspense fallback={<PageLoader />}>
      <PortfolioContent />
    </Suspense>
  );
}
