import { CategorySelection } from '@/features/item-selector/components/category-selection';
import { ItemSelector } from '@/features/item-selector/components/item-selector';
import { OrderDetails } from '@/features/order-detail/components/order-details';
import { ProductSelection } from '@/features/item-selector/components/product-selection';
import { SelectionMenu } from '@/features/pos/components/selection-menu';
import { ServiceSelection } from '@/features/service-selector/components/service-selection';
import { UnitSelection } from '@/features/item-selector/components/unit-selection';
import { useItemSelectionStore } from '@/features/item-selector/store/item-selection';
import { ItemSelectionEnum } from '@/features/item-selector/types/item-selection-enum';
import { Separator } from '@/components/ui/separator';
import { useQuery } from '@tanstack/react-query';
import { SaleRequestDto, SaleResponseDto } from '@/features/sale/types/sale.dto';
import { getSaleById } from '@/features/sale/api/sale';
import { useEffect } from 'react';
import { usePosStore } from '../store/pos';

interface PosFormProps {
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>
}

export function PosForm({ saleId, handlePayment }: PosFormProps) {
  const { selector } = useItemSelectionStore();
  const { setPosState } = usePosStore();

  const { isError, isLoading, data } = useQuery({
    queryKey: ['sale-', saleId],
    queryFn: () => getSaleById(saleId as string),
    enabled: !!saleId
  });

  useEffect(() => (
    setPosState(data)
  ), [data, setPosState]);

  if (isError) {
    return "error";
  }

  if (isLoading) {
    return "loading";
  }
  

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
      <OrderDetails saleId={saleId} handlePayment={handlePayment} />
    </div>
  );
}