import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CategoryFormSheet } from "./category-form-sheet";

export function NewCategoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <span><Plus className='font-bold' size={16} /></span>
        New Category
      </Button>
      <CategoryFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
