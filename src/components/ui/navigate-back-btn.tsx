import { Button } from "./button";
import { useNavigate } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';

export function NavigateBackButton() {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate({ to: '/' })}
      variant='ghost' 
      className='hover:bg-transparent p-0 font-semibold text-accent hover:text-primary-foreground uppercase'
    >
      <span><ChevronLeft size={13} /></span>
          Dashboard
    </Button>
  );
}