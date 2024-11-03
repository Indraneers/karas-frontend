import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function NewCategoryButton() {
  return (
    <Button className='border-0 bg-secondary hover:bg-emerald-500 px-4 rounded-[5px] h-10 text-background'>
      <span><Plus className='mr-1 font-bold' size={16} /></span>
      New Category
    </Button>
  );
}