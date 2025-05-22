import { CategorySelection } from '@/features/item-selector/components/category-selection';
import { ItemSelector } from '@/features/item-selector/components/item-selector';
import { OrderDetails } from '@/features/order-detail/components/order-details';
import { ProductSelection } from '@/features/item-selector/components/product-selection';
import { SelectionMenu } from '@/features/pos/components/selection-menu';
import { UnitSelection } from '@/features/item-selector/components/unit-selection';
import { useItemSelectionStore } from '@/features/item-selector/store/item-selection';
import { ItemSelectionEnum } from '@/features/item-selector/types/item-selection-enum';
import { useQuery } from '@tanstack/react-query';
import { SaleRequestDto, SaleResponseDto } from '@/features/sale/types/sale.dto';
import { getSaleById } from '@/features/sale/api/sale';
import { useEffect } from 'react';
import { usePosStore } from '../store/pos';
import { useRouter } from '@tanstack/react-router';
import { SubcategorySelection } from '@/features/item-selector/components/subcategory-selection';
import { LoadingSpinner } from '@/components/loading-spinner';

interface PosFormProps {
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>
}

export function PosForm({ saleId, handlePayment }: PosFormProps) {
  const router = useRouter();
  const { selector } = useItemSelectionStore();
  const { setPosState, resetPos, isInit } = usePosStore();

  router.subscribe('onBeforeLoad', () => {
    resetPos();
  });

  const saleQuery = useQuery({
    queryKey: ['sale-', saleId],
    queryFn: () => getSaleById(saleId as string),
    enabled: !!saleId
  });

  useEffect(() => {
    if (saleId) {
      setPosState(saleQuery.data);
    }
  }, [saleId, saleQuery.data, setPosState]);


  if (saleQuery.isError) {
    return "error";
  }

  if ((saleId && !isInit)) {
    <div className='place-content-center grid'>
      <LoadingSpinner className='w-[200px] h-[200px]' />
    </div>;
  }
  

  return (
    <>
      <div className='gap-4 grid lg:grid-cols-[5fr,3fr] grid-rows-2 lg:grid-rows-1 py-4 h-full lg:max-h-full lg:overflow-hidden'>
        <SelectionMenu>
          <ItemSelector>
            { (selector === ItemSelectionEnum.CATEGORY) && <CategorySelection /> }
            { (selector === ItemSelectionEnum.SUBCATEGORY) && <SubcategorySelection /> }
            { (selector === ItemSelectionEnum.PRODUCT) && <ProductSelection /> }
            { (selector === ItemSelectionEnum.UNIT) && <UnitSelection /> }
          </ItemSelector>
        </SelectionMenu>
        <OrderDetails saleId={saleId} handlePayment={handlePayment} />
      </div>
    </>
  );
}