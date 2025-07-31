"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Wand2 } from "lucide-react";

interface Props {
  onClick: (e: any) => void;
  disabled?: boolean;
  isPending?: boolean;
  autoGenerate?: boolean;
}

export default function GenerateButton({
  onClick,
  disabled = false,
  isPending = false,
  autoGenerate = false,
}: Props) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled || isPending}
      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
    >
      {isPending ? (
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Wand2 className="mr-2 h-4 w-4" />
      )}
      {autoGenerate ? "Auto Generate" : "Generate"}
    </Button>
  );
}
