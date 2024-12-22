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
import { useRouter } from '@tanstack/react-router';
import { getAutoServices } from '@/features/service/api/auto-services';

interface PosFormProps {
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>
}

export function PosForm({ saleId, handlePayment }: PosFormProps) {
  const router = useRouter();
  const { selector } = useItemSelectionStore();
  const { setPosState, resetPos, isInit, setServices } = usePosStore();

  router.subscribe('onBeforeLoad', () => {
    resetPos();
  });

  const serviceQuery = useQuery({
    queryKey: ['auto-services'],
    queryFn: () => getAutoServices()
  });

  const saleQuery = useQuery({
    queryKey: ['sale-', saleId],
    queryFn: () => getSaleById(saleId as string),
    enabled: (!!saleId) && serviceQuery.isSuccess
  });

  useEffect(() => {
    if (serviceQuery.data) {
      setServices(serviceQuery.data.map((d) => ({ 
        service: d, 
        price: d.originalPrice,
        discount: 0,
        quantity: 1,
        checked: false
      })));
    }
  }, [serviceQuery.data, setServices]);

  useEffect(() => {
    if (saleId) {
      setPosState(saleQuery.data);
    }
  }, [saleId, saleQuery.data, setPosState]);


  if (saleQuery.isError || serviceQuery.isError) {
    return "error";
  }

  if (saleQuery.isLoading || serviceQuery.isLoading || (saleId && !isInit)) {
    return "loading";
  }
  

  return (
    <>
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
    </>
  );
}