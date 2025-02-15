import * as React from "react";
import { cn } from "@/lib/utils"; // Ensure you have a utility function for classNames

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn("animate-pulse bg-gray-300 rounded-md", className)}
    ></div>
  );
}
