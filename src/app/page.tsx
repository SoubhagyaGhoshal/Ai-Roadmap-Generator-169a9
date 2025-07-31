import { Suspense } from "react";
import RoadmapHero from "@/components/landing/roadmap-hero";
import RoadmapFeatures from "@/components/landing/roadmap-features";
import RoadmapStats from "@/components/landing/roadmap-stats";
import RoadmapPricing from "@/components/landing/roadmap-pricing";
import RoadmapFooter from "@/components/landing/roadmap-footer";
import RoadmapConfetti from "@/components/landing/roadmap-confetti";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <RoadmapConfetti />
      <main className="flex-1">
        <RoadmapHero />
        <RoadmapStats />
        <RoadmapFeatures />
        <RoadmapPricing />
      </main>
      <RoadmapFooter />
    </div>
  );
}
