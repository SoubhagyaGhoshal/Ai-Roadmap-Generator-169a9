import { cn } from "@/lib/utils";
import { Eye, Wand, Sparkles } from "lucide-react";
import Marquee from "./marquee";
import Link from "next/link";

type Roadmap = {
  title: string;
  views: string;
  time: string;
  id: string;
};

const roadmaps: Roadmap[] = [
  {
    title: "Python Programming",
    views: "Generate Now",
    time: "AI Powered",
    id: "generate",
  },
  {
    title: "React Development",
    views: "Generate Now",
    time: "AI Powered",
    id: "generate",
  },
  {
    title: "Machine Learning",
    views: "Generate Now",
    time: "AI Powered",
    id: "generate",
  },
  {
    title: "DevOps Engineering",
    views: "Generate Now",
    time: "AI Powered",
    id: "generate",
  },
  {
    title: "Data Science",
    views: "Generate Now",
    time: "AI Powered",
    id: "generate",
  },
  {
    title: "Mobile Development",
    views: "Generate Now",
    time: "AI Powered",
    id: "generate",
  },
  {
    title: "Web Development",
    views: "Generate Now",
    time: "AI Powered",
    id: "generate",
  },
  {
    title: "UI/UX Design",
    views: "Generate Now",
    time: "AI Powered",
    id: "generate",
  },
];

const firstRow = roadmaps.slice(0, roadmaps.length / 2);
const secondRow = roadmaps.slice(roadmaps.length / 2);

const ReviewCard = ({ title, views, time, id }: Roadmap) => {
  return (
    <Link href="/roadmap" prefetch={false}>
      <figure
        className={cn(
          "relative w-48 sm:w-64 cursor-pointer overflow-hidden rounded border-2 border-[#000000a6] p-2 shadow-[6px_6px_0px_1px_#000000a6] flex flex-col justify-between h-20 hover:shadow-[8px_8px_0px_1px_#000000a6] transition-all"
        )}
      >
        <p className="font-semibold">{title}</p>
        <div className="flex justify-between text-xs text-slate-500">
          <div className="flex gap-1 items-center">
            <Wand size={14} />
            {views}
          </div>
          <span>{time}</span>
        </div>
      </figure>
    </Link>
  );
};

const MarqueeDemo = () => {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-2xl mx-auto max-w-screen-xl">
      <Marquee pauseOnHover className="[--duration:20s] w-full">
        {firstRow.map((review) => (
          <ReviewCard key={review.title} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s] w-full">
        {secondRow.map((review) => (
          <ReviewCard key={review.title} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 md:w-1/3 w-[60px] bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 md:w-1/3 w-[60px] bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};

export default MarqueeDemo;
