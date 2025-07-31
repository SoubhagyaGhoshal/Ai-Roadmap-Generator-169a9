import NavItems from "@/components/app/nav-items";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { SignInButton, UserButton, currentUser } from "@clerk/nextjs";
import { Coins } from "lucide-react";
import { Link } from "next-view-transitions";

import { getUserCredits } from "@/actions/users";
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
  let user = null;
  let userCredits = 0;

  try {
    user = await currentUser();
    if (user) {
      try {
        const credits = await getUserCredits();
        userCredits = credits || 0;
      } catch (creditsError) {
        console.log("Could not fetch user credits:", creditsError);
        userCredits = 0;
      }
    }
  } catch (error) {
    // Handle authentication errors gracefully
    console.log("Authentication not available on this route");
    user = null;
  }

  if (!user) {
    return (
      <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900">RoadmapAI</span>
            </Link>
            <div className="flex items-center space-x-4">
              <SignInButton mode="modal">
                <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                  Sign In
                </button>
              </SignInButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                    variant={
                      userCredits && userCredits > 0
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {userCredits} <Coins size={14} />
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Credits Remaining</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
