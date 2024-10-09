import { Button } from '@/components/ui/button';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ChevronLeft, Plus } from 'lucide-react';

export const Route = createFileRoute('/_page_layout/pos/')({
  component: () => <PosPage />
});

function PosPage() {
  const navigate = useNavigate();
  return (
    <div className='px-8 py-4 h-full'>
      {/* Top Navigate Back Button */}
      <Button
        onClick={() => navigate({ to: '/' })}
        variant='ghost' 
        className='hover:bg-transparent p-0 font-semibold text-accent hover:text-primary-foreground uppercase'
      >
        <span><ChevronLeft size={13} /></span>
        Dashboard
      </Button>
      <div className='gap-12 grid grid-cols-[2fr,3fr] h-full'>
        <div>
          {/* POS Button Headers */}
          <div className='flex justify-end gap-6'>
            <Button className='bg-secondary hover:bg-emerald-500 px-4 rounded-[5px] font-semibold text-background'>
              <span><Plus className='mr-1 font-bold' size={16} /></span>
              Create Product
            </Button>
            <Button className='border-primary hover:bg-primary px-6 rounded-[5px] font-semibold text-primary hover:text-background' variant='outline'>
              Clear Cart
            </Button>
          </div>
        </div>
        <div>
        Area B
        </div>
      </div>
    </div>
  );
}