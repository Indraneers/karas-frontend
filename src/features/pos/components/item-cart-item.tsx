import { Counter } from "@/components/counter";
import { Thumbnail } from "@/components/thumbnail";
import { Input } from "@/components/ui/input";
import { Item } from "@/types/item";

export function ItemCartItem({ item }: { item: Item }) {
  return (
    <div className="items-center grid grid-cols-[6fr,1fr] auto-rows-fr bg-accent rounded-lg h-full">
      <div className="flex flex-row items-center gap-2 bg-card p-2 rounded-lg h-full">
        <Thumbnail src="/sample-product.webp"  />
        <div className="flex flex-col flex-grow justify-between h-full">
          {/* Unit Name, Product and SKU */}
          <div className="flex justify-between items-center w-full">
            <div>
              <div className="text-[14px]">
                {item.product?.name}
              </div>
              <div className="text-[8px] text-foreground/50">
                {item.unit.sku}
              </div>
            </div>
            <div className="font-medium text-xl">
              {item.unit.name}
            </div>
          </div>
          <div className="flex-grow"></div>
          {/* Price, discount and quantity */}
          <div className="items-center grid grid-cols-[2fr,1fr,auto]">
            <div className="flex gap-4">
              <Input className="border-0 bg-background rounded-full h-4" />
              <Input className="border-0 bg-background rounded-full h-4" />
            </div>
            <div>
            </div>
            <Counter />
          </div>
        </div>
      </div>
      <div className="place-content-center grid text-background text-xs">
        $1000.12
      </div>
    </div>
  );
}