import { CategorySelection } from '@/features/item-selector/components/category-selection';
import { ItemSelector } from '@/features/item-selector/components/item-selector';
import { OrderDetails } from '@/features/order-detail/components/order-details';
import { ProductSelection } from '@/features/item-selector/components/product-selection';
import { SelectionMenu } from '@/features/pos/components/selection-menu';
import { ServiceSelection } from '@/features/service-selector/components/service-selection';
import { UnitSelection } from '@/features/item-selector/components/unit-selection';
import { useItemSelectionStore } from '@/features/item-selector/store/item-selection';
import { ItemSelectionEnum } from '@/features/item-selector/types/item-selection-enum';
import { createFileRoute } from '@tanstack/react-router';
import { Separator } from '@/components/ui/separator';

export const Route = createFileRoute('/_dashboard_layout/pos')({
  component: () => <PosPage />
});

export function PosPage() {
  const { selector } = useItemSelectionStore();

  return (
    <div className='gap-8 grid grid-cols-[5fr,3fr] py-4 h-full max-h-full overflow-hidden'>
      <SelectionMenu>
        <ServiceSelection />
        <Separator className='mt-2' />
        <ItemSelector>
          { (selector === ItemSelectionEnum.CATEGORY) && <CategorySelection /> }
          { (selector === ItemSelectionEnum.PRODUCT) && <ProductSelection /> }
          { (selector === ItemSelectionEnum.UNIT) && <UnitSelection /> }
        </ItemSelector>
      </SelectionMenu>
      <OrderDetails />
    </div>
  );
}