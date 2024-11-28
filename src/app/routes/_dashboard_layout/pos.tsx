import { Section } from '@/components/section';
import { TypographyH2 } from '@/components/ui/typography/h2';
import { TypographyH3 } from '@/components/ui/typography/h3';
import { ItemSelection } from '@/features/pos/components/item-selection';
import { OrderDetails } from '@/features/pos/components/order-details';
import { SelectionMenu } from '@/features/pos/components/selection-menu';
import { ServiceSelection } from '@/features/pos/components/service-selection';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/pos')({
  component: () => <PosPage />
});

export function PosPage() {
  return (
    <div className='gap-2 grid grid-cols-[3fr,2fr] h-full max-h-full overflow-hidden'>
      <SelectionMenu>
        <ServiceSelection />
        <ItemSelection>
          <TypographyH3>
            Categories
          </TypographyH3>
        </ItemSelection>
      </SelectionMenu>
      <OrderDetails />
    </div>
  );
}