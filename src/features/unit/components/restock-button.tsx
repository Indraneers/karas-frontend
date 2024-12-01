import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";

export function RestockButton() {
  return (
    <Button className="border-primary hover:bg-primary text-primary hover:text-white" variant='outline'>
      <RefreshCcw />
      <span>
        Restock
      </span>
    </Button>
  );
}