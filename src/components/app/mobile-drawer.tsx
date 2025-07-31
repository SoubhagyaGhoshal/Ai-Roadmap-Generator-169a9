import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

const MobileDrawer = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu className="mr-2 h-6 w-6" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className=" h-full flex flex-col items-center justify-center gap-4"
      >
        {/* Navigation items removed as requested */}
      </SheetContent>
    </Sheet>
  );
};

export default MobileDrawer;
