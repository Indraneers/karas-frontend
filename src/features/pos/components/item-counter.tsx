import { Button } from "@/components/ui/button";
import PlusIcon from '@/assets/plus.svg?react';
import MinusIcon from '@/assets/minus.svg?react';

interface ItemCounterProps {
  counter: number;
}

export function ItemCounter({ counter }: ItemCounterProps) {
  return (
    <div className="flex items-center gap-4">
      <Button className="bg-secondary" size='icon-small' disabled={counter === 1}>
        <MinusIcon className="w-3 h-3"  />
      </Button>
      <span className="font-bold">{counter}</span>
      <Button className="bg-secondary" size='icon-small'>
        <PlusIcon className="w-3 h-3"  />
      </Button>
    </div>
  );
}