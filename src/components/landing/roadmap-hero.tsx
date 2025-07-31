import DotPattern from "@/components/ui/dot-pattern";
import MarqueeDemo from "@/components/ui/marque-wrapper";
import { cn } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs";
import { Telescope, Wand } from "lucide-react";
import Link from "next/link";
import { Link as LinkWithViewTransitions } from "next-view-transitions";
import Image from "next/image";
import NeobrutalismButton from "@/components/ui/neobrutalism-button";
import TextTicker from "@/components/marketing/text-ticker";
import { getTotalRoadmapsGenerated } from "@/actions/roadmaps";
import { RoadmapIconCloud } from "./roadmap-icon-cloud";

async function RoadmapTicker() {
  const totalRoadmapCount = await getTotalRoadmapsGenerated();
  return (
    <div className="text-xl font-semibold tabular-nums tracking-tight">
      <div className="flex flex-row gap-2">
        <TextTicker value={totalRoadmapCount} /> Roadmaps Generated!
      </div>
    </div>
  );
}

async function UserAvatars() {
  const users = await clerkClient.users.getUserList();
  return (
    <>
      <div className="isolate flex -space-x-2 overflow-hidden">
        {users.map((user) => (
          <Image
            key={user.id}
            className="relative z-30 inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={user.imageUrl}
            alt=""
            width={32}
            height={32}
          />
        ))}
      </div>
    </>
  );
}

export default function RoadmapHero() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Generate Learning Roadmaps with{" "}
            <span className="text-indigo-600">AI</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Create personalized learning roadmaps for any topic. Enter a subject and let our AI generate a comprehensive learning path tailored just for you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <LinkWithViewTransitions href="/roadmap">
              <NeobrutalismButton>
                <span className="flex items-center gap-x-2 text-base">
                  <Wand size={20} />
                  Generate Roadmap
                </span>
              </NeobrutalismButton>
            </LinkWithViewTransitions>
            <LinkWithViewTransitions href="/explore">
              <NeobrutalismButton>
                <span className="flex items-center gap-x-2 text-base">
                  <Telescope size={20} />
                  Explore Roadmaps
                </span>
              </NeobrutalismButton>
            </LinkWithViewTransitions>
          </div>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <UserAvatars />
            <RoadmapTicker />
          </div>
        </div>
      </div>
      <div className="overflow-hidden max-w-screen-xl mx-auto h-64">
        <div className="overflow-x-hidden">
          <MarqueeDemo />
        </div>
      </div>
    </div>
  );
}
