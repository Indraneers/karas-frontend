import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface CounterProps {
  className?: string;
}

export function Counter({ className }: CounterProps) {
  return (
    <div className={cn([
      "flex gap-2 items-center",
      className
    ])}>
      <Button className="w-5 h-5" size="icon">
        <ChevronLeft />
      </Button>
      <span className="text-xs">1</span>
      <Button className="w-5 h-5" size="icon">
        <ChevronRight />
      </Button>
    </div>
  );
}