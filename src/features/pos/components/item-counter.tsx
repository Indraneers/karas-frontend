import { Button } from "@/components/ui/button";
import Plus from '@/assets/plus.svg';
import Minus from '@/assets/minus.svg';

interface ItemCounterProps {
  counter: number;
}

export function ItemCounter({ counter }: ItemCounterProps) {
  return (
    <div className="flex items-center gap-4">
      <Button className="bg-secondary" size='icon-small' disabled={counter === 1}>
        <img className="w-3 h-3" src={Minus} loading='lazy' />
      </Button>
      <span className="font-bold">{counter}</span>
      <Button className="bg-secondary" size='icon-small'>
        <img className="w-3 h-3" src={Plus} loading='lazy' />
      </Button>
    </div>
  );
}