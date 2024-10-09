import { NavigateBackButton } from '@/components/ui/navigate-back-btn';
import { ClearCartBtn } from '@/features/pos/components/clear-cart-btn';
import { CreateCustomer } from '@/features/pos/components/create-customer';
import { CreateProductButton } from '@/features/pos/components/create-product-btn';
import { CustomerSearch } from '@/features/pos/components/customer-search';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_page_layout/pos/')({
  component: () => <PosPage />
});

function PosPage() {
  return (
    <div className='px-8 py-4 h-full'>
      <NavigateBackButton />
      <div className='gap-12 grid grid-cols-[2fr,3fr] h-full'>
        <div>
          {/* POS Button Headers */}
          <div className='flex justify-end gap-6'>
            <CreateProductButton />
            <ClearCartBtn />
          </div>
        </div>
        <div>
          {/* Customer Retrieval & Creation */}
          <div className='gap-16 grid grid-cols-[3fr,1fr,1fr]'>
            <CustomerSearch />
            <CreateCustomer />
          </div>
          <div>

          </div>
        </div>
      </div>
    </div>
  );
}