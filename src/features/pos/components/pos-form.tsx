import { CategorySelection } from '@/features/item-selector/components/category-selection';
import { ItemSelector } from '@/features/item-selector/components/item-selector';
import { OrderDetails } from '@/features/order-detail/components/order-details';
import { PosContactBar } from '@/features/order-detail/components/pos-contact-bar';
import { ProductSelection } from '@/features/item-selector/components/product-selection';
import { UnitSelection } from '@/features/item-selector/components/unit-selection';
import { UnitQuickSearch } from '@/features/item-selector/components/unit-quick-search';
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
import { useState } from 'react';
import { MaintenanceTab } from '@/features/order-detail/components/maintenance-tab';
import { isStoreMode } from '@/features/app-config/utils/app-mode';
import { cn } from '@/lib/utils';
import { Package, Wrench } from 'lucide-react';

interface PosFormProps {
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>
}

type PosLeftTab = 'items' | 'services';

export function PosForm({ saleId, handlePayment }: PosFormProps) {
  const router = useRouter();
  const { selector } = useItemSelectionStore();
  const { setPosState, resetPos, isInit } = usePosStore();
  const [leftTab, setLeftTab] = useState<PosLeftTab>('items');
  const showServices = isStoreMode();

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
    <div className='gap-4 grid md:grid-cols-2 xl:grid-cols-[3fr_2fr] grid-rows-2 md:grid-rows-1 py-4 h-full lg:max-h-full lg:overflow-hidden'>
      <div className='flex flex-col min-h-0 gap-3'>
        {showServices && (
          <PosLeftTabs value={leftTab} onChange={setLeftTab} />
        )}
        {(!showServices || leftTab === 'items') ? (
          <UnitQuickSearch className='min-h-0 flex-1'>
            <ItemSelector>
              { (selector === ItemSelectionEnum.CATEGORY) && <CategorySelection /> }
              { (selector === ItemSelectionEnum.SUBCATEGORY) && <SubcategorySelection /> }
              { (selector === ItemSelectionEnum.PRODUCT) && <ProductSelection /> }
              { (selector === ItemSelectionEnum.UNIT) && <UnitSelection /> }
            </ItemSelector>
          </UnitQuickSearch>
        ) : (
          <div className='flex-1 min-h-0 border border-border/60 rounded-xl bg-card overflow-hidden shadow-sm'>
            <MaintenanceTab />
          </div>
        )}
      </div>
      <div className='flex flex-col min-h-0 gap-3'>
        <PosContactBar />
        <OrderDetails saleId={saleId} handlePayment={handlePayment} />
      </div>
    </div>
  );
}

function PosLeftTabs({
  value,
  onChange
}: {
  value: PosLeftTab;
  onChange: (tab: PosLeftTab) => void;
}) {
  const tabs: { key: PosLeftTab; label: string; icon: typeof Package }[] = [
    { key: 'items', label: 'Items', icon: Package },
    { key: 'services', label: 'Services', icon: Wrench }
  ];

  return (
    <div className='inline-flex items-center gap-1 self-start p-1 rounded-xl border border-border/60 bg-muted/40'>
      {tabs.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type='button'
          onClick={() => onChange(key)}
          className={cn(
            'inline-flex items-center gap-1.5 px-3 h-8 rounded-lg text-sm font-medium transition-colors',
            value === key
              ? 'bg-card text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          )}
        >
          <Icon className='size-4' strokeWidth={1.8} />
          {label}
        </button>
      ))}
    </div>
  );
}