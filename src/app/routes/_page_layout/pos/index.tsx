import { NavigateBackButton } from '@/components/ui/navigate-back-btn';
import { ClearCartBtn } from '@/features/pos/components/clear-cart-btn';
import { CreateCustomerButton } from '@/features/pos/components/create-customer-btn';
import { CreateProductButton } from '@/features/pos/components/create-product-btn';
import { CustomerSearch } from '@/features/pos/components/customer-search';
import { CustomerVehicleForm } from '@/features/pos/components/customer-vehicle-form';
import { ItemOrderTable } from '@/features/pos/components/item-order-table';
import { ItemSelector } from '@/features/pos/components/item-selector';
import { OrderInfoPayment } from '@/features/pos/components/order-info-payment';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_page_layout/pos/')({
  component: () => <PosPage />
});

function PosPage() {
  return (
    <div className='flex flex-col items-start px-8 py-4 h-full max-h-full'>
      <NavigateBackButton />
      <div className='gap-12 grid grid-cols-[2fr,3fr] h-full'>
        {/* POS's left side */}
        <div className='grid grid-rows-[auto,1fr,auto]'>
          {/* POS Button Headers */}
          <div className='flex justify-end gap-6 mb-4'>
            <CreateProductButton />
            <ClearCartBtn />
          </div>
          <div className='relative m-h-full h-full'>
            {/* Item Order Table */}
            <div className='absolute w-full h-full'>
              <ItemOrderTable />
            </div>
          </div>
          {/* Order Info and Payement */}
          <OrderInfoPayment className='mt-8'/>
        </div>
        {/* POS's right side */}
        <div className='grid grid-rows-[auto,auto,1fr] overflow-hidden'>
          {/* Customer Retrieval & Creation  */}
          <div className='grid grid-cols-[3fr,1fr,1fr] h-auto'>
            <CustomerSearch />
            <CreateCustomerButton className='ml-16' />
          </div>
          {/* Customer and Vehicle Details */}
          <CustomerVehicleForm className='mt-10' />
          {/* Item Selector */}
          <ItemSelector className='mt-12' />
        </div>
      </div>
    </div>
  );
}