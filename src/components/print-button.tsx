import { Printer } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { onClickUrl } from "@/lib/link";

export function PrintButton({ className, to }: { className?: string, to: string }) {
  const goToUrl = onClickUrl(to);

  return (
    <Button 
      variant='ghost' 
      className={cn([
        "w-6 h-6",
        className
      ])}
      onClick={(e) => {
        e.stopPropagation();
        goToUrl();
      }}
    >
      <Printer />
    </Button>
  );
}