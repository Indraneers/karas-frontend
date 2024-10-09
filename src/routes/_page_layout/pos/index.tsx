import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_page_layout/pos/')({
  component: () => <PosPage />
});

function PosPage() {
  return (
    <div className='grid grid-cols-[2fr,3fr]'>
      <div>
        Area A
      </div>
      <div>
        Area B
      </div>
    </div>
  );
}