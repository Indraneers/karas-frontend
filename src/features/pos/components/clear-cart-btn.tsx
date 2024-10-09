import { Button } from "@/components/ui/button";

export function ClearCartBtn() {
  return (
    <Button 
      className='border-primary hover:bg-primary px-6 rounded-[5px] font-semibold text-primary hover:text-background' 
      variant='outline'
    >
    Clear Cart
    </Button>
  );
}