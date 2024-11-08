import PencilIcon from '@/assets/pencil.svg?react';
import React from 'react';

interface EditableProps {
  children: React.ReactNode;
}

export function Editable({ children }: EditableProps) {
  return (
    <div className='inline-flex justify-start gap-1 p-[2px] border rounded-md'>
      <button className='place-content-center grid' type='button'>
        <PencilIcon className='w-4 h-4'  />
      </button>
      <div className='rounded-sm text-background'>
        {children} 
      </div>
    </div>
  );
}