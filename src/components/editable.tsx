import PencilIcon from '@/assets/pencil.svg?react';
import React from 'react';

interface EditableProps {
  children: React.ReactNode;
}

export function Editable({ children }: EditableProps) {
  return (
    <div className='inline-flex justify-start gap-1 border-primary-foreground p-[2px] border rounded-md'>
      <button className='place-content-center grid' type='button'>
        <PencilIcon className='w-4 h-4'  />
      </button>
      <div className='bg-primary-foreground/75 rounded-sm text-background'>
        {children} 
      </div>
    </div>
  );
}