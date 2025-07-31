"use client";

import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { usePathname } from "next/navigation";

export default function NavItems() {
  const pathname = usePathname();
  return (
    <div className="flex gap-x-3 ml-4">
      {/* Navigation items removed as requested */}
    </div>
  );
}
