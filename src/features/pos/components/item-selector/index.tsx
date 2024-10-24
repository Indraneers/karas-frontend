import { ItemSelectionBreadcrumb } from "./components/item-selection-breadcrumb";
import { ItemSelectionList } from "./components/item-selection-list";
import { ProductSearch } from "@/components/product-search";

export function ItemSelector({ className = '' }) {
  return (
    <div className={'grid grid-rows-[auto,1fr] gap-8 ' + className}>
      {/* Product Search */}
      <div className="grid grid-cols-[3fr,2fr]">
        <ProductSearch />
      </div>
      {/* Item Navigator + Selector */}
      <div className="gap-10 grid grid-cols-2">
        {/* Product Panel */}
        <div className="h-full max-h-full">
          <ItemSelectionBreadcrumb heirarchy={['Product']} />
          <div className='relative mt-2 h-full min-h-full overflow-auto'>
            <ItemSelectionList className="absolute w-full h-full" />
          </div>
        </div>
        {/* Service Panel */}
        <div className="h-full max-h-full overflow-hidden">
          <ItemSelectionBreadcrumb className="!bg-secondary" breadcrumbClass="text-primary-foreground" heirarchy={['Service']} />
          <div className='relative mt-2 h-full min-h-full overflow-auto'>
            <ItemSelectionList className="absolute w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  );
}