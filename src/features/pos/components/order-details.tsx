import { Section } from "@/components/section";
import { SectionContent } from "@/components/section-content";
import { SectionHeader } from "@/components/section-header";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { VehicleInformation } from "./vehicle-information";
import { VehicleSearch } from "../../vehicles/components/vehicle-search";
import { SectionFooter } from "@/components/section-footer";
import { POSActions } from "./pos-actions";
import { ShoppingBag } from "lucide-react";
import { ItemCart } from "./item-cart";
import { ItemCartItem } from "./item-cart-item";
import { usePosStore } from "../store/pos";
import { useState } from "react";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { VehicleSearchItem } from "@/features/vehicles/components/vehicle-search-item";
import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "@/features/vehicles/api/vehicle";
import { useDebounce } from "@uidotdev/usehooks";

export function OrderDetails() {
  const { items, vehicle } = usePosStore();

  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 200);


  const { isError, isLoading, data } = useQuery({
    queryKey: ['vehicles', debouncedQ],
    queryFn: () => getVehicles({ q: debouncedQ })
  });
  
  return (
    <Section className="flex flex-col h-full">
      <SectionHeader>
        <TypographyH2 className="flex items-center gap-2">
          <span>
            <ShoppingBag />
          </span>
          Order Details
        </TypographyH2>
      </SectionHeader>
      <SectionContent className="flex flex-col w-full">
        <div className="mb-2 py-2 w-full">
          <Popover open={open}>
            <PopoverAnchor>
              <VehicleSearch
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                className="w-full" 
                onChange={setQ} 
              />
            </PopoverAnchor>
            <PopoverContent
              className="p-3 rounded-lg" 
              style={{ width: 'var(--radix-popover-trigger-width)' }} 
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              <div className="relative h-80">
                <div className="absolute inset-0 gap-2 grid grid-rows-[repeat(4,calc(90%/4))] auto-rows-[calc(100%/4)] h-full max-h-full overflow-scroll">
                  {
                    isError && "Error"
                  }
                  {
                    (!data || q === '') && <div className="place-content-center grid row-span-3 text-foreground/50 text-xl">Empty...</div>
                  }
                  {
                    isLoading &&  <div className="place-content-center grid row-span-3 text-foreground/50 text-xl">Loading...</div>
                  }
                  {
                    q !== '' &&
                    data &&
                    data.map((v, index) => (
                      <VehicleSearchItem 
                        key={v.id || index}
                        setQ={setQ}
                        vehicle={v}
                      />
                    ))
                  }
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <VehicleInformation vehicle={vehicle} />
        <ItemCart className="flex-grow mt-2 w-full">
          {items.map((i, index) => (
            <ItemCartItem item={i} key={index} />
          ))}
        </ItemCart>
      </SectionContent>
      <SectionFooter>
        <POSActions />
      </SectionFooter>
    </Section>
  );
}