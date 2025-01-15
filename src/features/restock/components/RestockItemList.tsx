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
import { ToBaseUnitSwitch } from "@/features/unit/components/to-base-unit-switch";
import { ProductRequestDto } from "@/features/product/types/product.dto";
import { convertBaseQuantityToQuantity, convertQuantityToBaseQuantity } from "@/features/unit/util/convert";
import { Unit } from "@/features/unit/types/unit";

interface RestockItemElementProps {
  restockItem: RestockItem;
  updateRestockItems: (ri: RestockItem) => void;
}

interface RestockQuantityProps { 
  quantity: string; 
  changeQuantity: (value: string) => void;
  unit: Unit;
}

function RestockBaseQuantity
({ quantity, changeQuantity, unit } : RestockQuantityProps) {
  const product = unit.product;
  return (
    <ItemCounter 
      className="w-[150px] h-8" 
      value={Number(quantity)} 
      setValue={changeQuantity} 
      variable={product.variable}
      baseUnit={product.baseUnit}
    />
  );
}

function RestockCountableQuantity
({ quantity, changeQuantity, unit  } : RestockQuantityProps) {
  const countableQuantity = convertBaseQuantityToQuantity(
    unit.toBaseUnit,
    Number(quantity)
  );

  function onChangeCountableQuantity(value: string) {
    changeQuantity(
      String(
        convertQuantityToBaseQuantity(
          unit.toBaseUnit,
          Number(value)
        )
      )
    );
  }
  
  return (
    <ItemCounter 
      className="w-[150px] h-8" 
      value={Number(countableQuantity)} 
      setValue={onChangeCountableQuantity} 
      variable={false}
    />
  );
}

export function RestockItemElement({ restockItem, updateRestockItems }: RestockItemElementProps) {
  const [isBaseUnit, setIsBaseUnit] = useState<boolean>(false);
  const [status, setStatus] = useState<StockUpdate>(restockItem.status);
  const [quantity, setQuantity] = useState(String(restockItem.quantity));
  const unit = restockItem.unit;
  const product = restockItem.unit.product;

  function changeStatus(newStatus: StockUpdate) {
    setStatus(newStatus);
    updateRestockItems({
      ...restockItem,
      status: newStatus
    });
  }

  function changeQuantity(quantityString: string) {
    setQuantity(quantityString);
    updateRestockItems({
      ...restockItem,
      quantity: Number(quantityString)
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
              <Separator className="ml-4 h-8" orientation="vertical" />
              <ToBaseUnitSwitch 
                className="inline-flex ml-2 p-1"
                isBaseUnit={isBaseUnit}
                onChange={setIsBaseUnit}
                baseUnit={unit.product.baseUnit}
              />
            </div> 
            {
              isBaseUnit ?
                <RestockBaseQuantity 
                  quantity={quantity}
                  changeQuantity={changeQuantity}
                  unit={unit}
                />
                :
                <RestockCountableQuantity
                  quantity={quantity}
                  changeQuantity={changeQuantity}
                  unit={unit}
                />
            }
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