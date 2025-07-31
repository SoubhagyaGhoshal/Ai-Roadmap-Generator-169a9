import NavItems from "@/components/app/nav-items";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Coins } from "lucide-react";
import { Link } from "next-view-transitions";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import MobileDrawer from "@/components/app/mobile-drawer";
import NeobrutalismButton from "@/components/ui/neobrutalism-button";
import ThreeDButton from "../ui/three-d-button";

async function AppBar() {
  return (
    <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">RoadmapAI</span>
            </Link>
            <NavItems />
          </div>
          
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip delayDuration={250}>
                <TooltipTrigger asChild>
                  <Badge
                    className="cursor-default"
                    variant="outline"
                  >
                    ∞ <Coins size={14} />
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Unlimited Credits</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
