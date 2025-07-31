import DotPattern from "@/components/ui/dot-pattern";
import MarqueeDemo from "@/components/ui/marque-wrapper";
import { cn } from "@/lib/utils";
import { clerkClient } from "@clerk/nextjs";
import { ArrowUpRight, Telescope, Wand } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Link as LinkWithViewTransitions } from "next-view-transitions";
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
          <img
            key={user.id}
            className="relative z-30 inline-block h-8 w-8 rounded-full ring-2 ring-white"
            src={user.imageUrl}
            alt=""
          />
        ))}
      </div>
    </>
  );
}

export default function RoadmapHero() {
  return (
    <div className="flex flex-grow flex-col items-center px-8 py-3 sm:px-5 overflow-hidden">
      <div className="flex flex-col gap-0 text-center sm:gap-1 sm:mt-3 md:mt-4 lg:mt-6">
        <h1 className="relative text-4xl font-bold sm:text-3xl">
          <span className="hidden sm:inline">
            Curate Learning Roadmaps with AI
          </span>
          <span className="inline sm:hidden">AI Roadmap Generator</span>
        </h1>
        <p className="text-base text-gray-500 sm:text-lg">
          <span className="hidden sm:inline">
            Enter a topic and let the AI generate a roadmap for you
          </span>
          <span className="inline sm:hidden">
            Enter a topic to generate a roadmap
          </span>
        </p>
      </div>
      <div className="my-3 mt-6 flex w-full max-w-[600px] flex-col items-center gap-3 sm:my-5">
        <div className="flex flex-row gap-x-2">
          <LinkWithViewTransitions href="/roadmap">
            <NeobrutalismButton>
              <span className="flex items-center gap-x-2 text-base">
                <Wand size={20} />
                Generate
              </span>
            </NeobrutalismButton>
          </LinkWithViewTransitions>
          <LinkWithViewTransitions href="/explore">
            <NeobrutalismButton>
              <span className="flex items-center gap-x-2 text-base">
                <Telescope size={20} />
                Explore
              </span>
            </NeobrutalismButton>
          </LinkWithViewTransitions>
        </div>
        <UserAvatars />
        <RoadmapTicker />
      </div>
      <div className="flex flex-col items-center gap-4 mb-6">
        <p className="flex items-center text-sm">
          <button className="rounded-xl border border-current px-2 py-0.5 text-sm text-gray-500 transition-colors hover:bg-gray-400 hover:text-white">
            Override all restrictions by{" "}
            <span className="font-semibold">inserting your own API key</span>
          </button>
        </p>
      </div>

      <div className="overflow-hidden max-w-screen-xl mx-auto h-64">
        <div className="overflow-x-hidden">
          <MarqueeDemo />
        </div>
      </div>
    </div>
  );
}
