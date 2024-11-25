import { Section } from '@/components/section';
import { OrderDetails } from '@/features/pos/components/order-details';
import { SelectionMenu } from '@/features/pos/components/selection-menu';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/pos')({
  component: () => <PosPage />
});

export function PosPage() {
  return (
    <div className='gap-4 grid grid-cols-[3fr,2fr] h-full'>
      <SelectionMenu>
        <Section>
          Services
        </Section>
        <Section>
          Item
        </Section>
      </SelectionMenu>
      <OrderDetails />
    </div>
  );
}