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
import { ItemCounter } from "@/components/item-counter";
import { Separator } from "@/components/ui/separator";
import { ProductIdentifier } from "@/features/product/components/product-identifier";
import { ToBaseUnitSwitch } from "@/features/pos/components/item-adder";

interface RestockItemElementProps {
  restockItem: RestockItem;
  updateRestockItems: (ri: RestockItem) => void;
}

export function RestockItemElement({ restockItem, updateRestockItems }: RestockItemElementProps) {
  const [isBaseUnit, setIsBaseUnit] = useState<boolean>(false);
  const [status, setStatus] = useState<StockUpdate>(restockItem.status);
  const [quantity, setQuantity] = useState<number>(restockItem.quantity);
  const unit = restockItem.unit;
  const product = restockItem.unit.product;

  function changeStatus(newStatus: StockUpdate) {
    setStatus(newStatus);
    updateRestockItems({
      ...restockItem,
      status: newStatus
    });
  }

  function changeQuantity(quantity: number) {
    setQuantity(quantity);
    updateRestockItems({
      ...restockItem,
      quantity: quantity
    });
  }
  
  return (
    <>    
      <div className="gap-4 grid grid-cols-[auto,1fr] py-4">
        <div className="brightness-[90%] rounded-3xl h-[100px] aspect-square">
          {
            unit.productImg ?
              <img 
                src={getImageUrl(unit.productImg)} 
                className="block rounded-3xl h-full max-h-full object-cover aspect-square" 
              />
              :
              <div className="place-content-center grid border-4 border-accent rounded-3xl h-full text-accent">
                <Box className="w-12 h-12" />
              </div>
          }
        </div>
        <div className="w-full">
          <div className="flex justify-between">

            <div className="flex font-medium text-lg">
              <span className="flex mr-4">
                {unit.name}
                <Dot />
                {product.name + ' '}
              </span>
              <ProductIdentifier identifier={product.identifier} />
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
            <div className="flex items-center gap-4">
              <RestockItemStatusButton 
                onClick={() => changeStatus(StockUpdate.RESTOCK)}
                selected={status === StockUpdate.RESTOCK}
              >
                RESTOCK
              </RestockItemStatusButton>
              <RestockItemStatusButton 
                onClick={() => changeStatus(StockUpdate.DEDUCT)}
                selected={status === StockUpdate.DEDUCT}
              >
                DEDUCT
              </RestockItemStatusButton>
              <RestockItemStatusButton 
                onClick={() => changeStatus(StockUpdate.LOST)}
                selected={status=== StockUpdate.LOST}
              >
                LOST
              </RestockItemStatusButton>
              <Separator className={cn([
                "ml-4 h-8 hidden",
                unit.product.variable && 'block'
              ])} orientation="vertical" />
              <ToBaseUnitSwitch
                className={cn([
                  "ml-2 p-1 hidden",
                  unit.product.variable && 'inline-flex'
                ])}
                isBaseUnit={isBaseUnit}
                onChange={setIsBaseUnit}
                baseUnit={unit.product.baseUnit}
              />
            </div> 
            <ItemCounter 
              className="w-[150px] h-8" 
              value={quantity}
              variable={false}
              setValue={changeQuantity} 
              baseUnit={product.baseUnit}
              toBaseUnit={unit.toBaseUnit}
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