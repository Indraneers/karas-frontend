import { NavigateBackButton } from '@/components/ui/navigate-back-btn';
import { ClearCartBtn } from '@/features/pos/components/clear-cart-btn';
import { CreateCustomer } from '@/features/pos/components/create-customer';
import { CreateProductButton } from '@/features/pos/components/create-product-btn';
import { CustomerSearch } from '@/features/pos/components/customer-search';
import { CustomerVehicleForm } from '@/features/pos/components/customer-vehicle-form';
import { ItemOrderTable } from '@/features/pos/components/item-order-table';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_page_layout/pos/')({
  component: () => <PosPage />
});

function PosPage() {
  return (
    <div className='px-8 py-4 h-full'>
      <NavigateBackButton />
      <div className='gap-12 grid grid-cols-[2fr,3fr] h-full'>
        {/* POS's left side */}
        <div>
          {/* POS Button Headers */}
          <div className='flex justify-end gap-6'>
            <CreateProductButton />
            <ClearCartBtn />
          </div>
          {/* Item Order Table */}
          <ItemOrderTable className='mt-8' />
        </div>
        {/* POS's right side */}
        <div>
          {/* Customer Retrieval & Creation */}
          <div className='gap-16 grid grid-cols-[3fr,1fr,1fr]'>
            <CustomerSearch />
            <CreateCustomer />
          </div>
          {/* Customer and Vehicle Details */}
          <div className='mt-10'>
            <CustomerVehicleForm />
          </div>
        </div>
      </div>
    </div>
  );
}