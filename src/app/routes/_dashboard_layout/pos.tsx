import { Separator } from '@/components/ui/separator';
import { CategorySelection } from '@/features/pos/components/category-selection';
import { ItemSelection } from '@/features/pos/components/item-selection';
import { OrderDetails } from '@/features/pos/components/order-details';
import { ProductSelection } from '@/features/pos/components/product-selection';
import { SelectionMenu } from '@/features/pos/components/selection-menu';
import { ServiceSelection } from '@/features/pos/components/service-selection';
import { UnitSelection } from '@/features/pos/components/unit-selection';
import { useItemSelectionStore } from '@/features/pos/store/item-selection';
import { ItemSelectionEnum } from '@/features/pos/types/item-selection-enum';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/pos')({
  component: () => <PosPage />
});

export function PosPage() {
  const { selector } = useItemSelectionStore();

  return (
    <div className='grid grid-cols-[5fr,3fr] h-full max-h-full overflow-hidden'>
      <SelectionMenu className='border-foreground border-r'>
        <ServiceSelection />
        <Separator />
        <ItemSelection>
          { (selector === ItemSelectionEnum.CATEGORY) && <CategorySelection /> }
          { (selector === ItemSelectionEnum.PRODUCT) && <ProductSelection /> }
          { (selector === ItemSelectionEnum.UNIT) && <UnitSelection /> }
        </ItemSelection>
      </SelectionMenu>
      <OrderDetails />
    </div>
  );
}