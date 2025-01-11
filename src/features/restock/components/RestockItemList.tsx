import { cn } from "@/lib/utils";
import { RestockItem } from "../types/restock-item";
import { Box, Dot } from "lucide-react";
import { ProductTypeBadge } from "@/features/product/components/product-type-badge";
import { getImageUrl } from "@/lib/image";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { UnitQuantityBadge } from "@/features/unit/components/unit-quantity-badge";
import { RestockItemStatusButton } from "./RestockItemStatusBtn";
import { useState } from "react";
import { StockUpdate } from "../types/stock-update.enum";
import { ItemCounter } from "@/features/cart/components/item-counter";
import { Separator } from "@/components/ui/separator";

export function RestockItemElement({ restockItem }: { restockItem: RestockItem }) {
  const [stockUpdate, setStockUpdate] = useState<StockUpdate>(restockItem.stockUpdate);
  const [quantity, setQuantity] = useState(String(restockItem.quantity));
  const unit = restockItem.unit;
  const product = restockItem.unit.product;
  
  return (
    <>    
      <div className="gap-4 grid grid-cols-[auto,1fr] py-4">
        <div className="brightness-[90%] rounded-3xl h-[100px] aspect-square">
          {
            unit.productImg ?
              <img 
                src={getImageUrl(unit.productImg)} 
                className="block rounded-3xl h-full max-h-full aspect-square object-cover" 
              />
              :
              <div className="place-content-center border-4 border-accent grid rounded-3xl h-full text-accent">
                <Box className="w-12 h-12" />
              </div>
          }
        </div>
        <div className="w-full">
          <div className="flex justify-between">

            <div className="flex font-medium text-lg">
              {unit.name}
              <Dot />
              {product.name}
              {' (' + product.identifier + ')'}
            </div>

            <div className="flex gap-2">
              <UnitQuantityBadge 
                variable={product.variable}
                baseUnit={product.baseUnit}
                quantity={unit.quantity}
                toBaseUnit={unit.toBaseUnit}
              />
              <ProductTypeBadge variable={product.variable} />
            </div>

          </div>
      
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>{unit.category}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{unit.subcategory}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{product.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex justify-between items-center mt-4">
            <div className="space-x-4">
              <RestockItemStatusButton 
                onClick={() => setStockUpdate(StockUpdate.RESTOCK)}
                selected={stockUpdate === StockUpdate.RESTOCK}
              >
            RESTOCK
              </RestockItemStatusButton>
              <RestockItemStatusButton 
                onClick={() => setStockUpdate(StockUpdate.DEDUCT)}
                selected={stockUpdate === StockUpdate.DEDUCT}
              >
            DEDUCT
              </RestockItemStatusButton>
              <RestockItemStatusButton 
                onClick={() => setStockUpdate(StockUpdate.LOST)}
                selected={stockUpdate === StockUpdate.LOST}
              >
            LOST
              </RestockItemStatusButton>
            </div>
            <ItemCounter 
              className="w-[150px] h-8" 
              value={Number(quantity)} 
              setValue={setQuantity} 
              variable={product.variable}
              baseUnit={product.baseUnit}
            />
          </div>
        </div>
      </div>
      <Separator className="bg-foreground" />
    </>
  );
}

export function RestockItemList({ className, children } : { className?: string, children: React.ReactNode }) {
  return (
    <div className={cn([
      'overflow-y-scroll',
      className
    ])}>
      {children}
    </div>
  );
}