import { Button } from "@/components/ui/button";
import { Plus } from 'lucide-react';

export function NewProductButton() {
  return (
    <Button className='bg-secondary hover:bg-emerald-500 px-4 rounded-[5px] font-semibold text-background'>
      <span><Plus className='mr-1 font-bold' size={16} /></span>
      New Product
    </Button>
  );
}