import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { UnitFormSheet } from "./unit-form-sheet";

export function NewUnitButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <span><Plus className='font-bold' size={16} /></span>
        New Unit
      </Button>
      <UnitFormSheet open={open} onOpenChange={setOpen} />
    </>
  );
}
