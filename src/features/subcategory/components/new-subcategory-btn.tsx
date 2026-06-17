import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { SubcategoryFormSheet } from "./subcategory-form-sheet";

export function NewSubcategoryButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <span><Plus className='font-bold' size={16} /></span>
        New Subcategory
      </Button>
      <SubcategoryFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
