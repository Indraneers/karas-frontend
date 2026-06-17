import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ProductFormSheet } from "./product-form-sheet";

export function NewProductButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <span><Plus className='font-bold' size={16} /></span>
        New Product
      </Button>
      <ProductFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
