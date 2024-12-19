import { Section } from "@/components/section";
import { SectionContent } from "@/components/section-content";
import { SectionHeader } from "@/components/section-header";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { VehicleInformation } from "./vehicle-information";
import { VehicleSearch } from "./vehicle-search";
import { SectionFooter } from "@/components/section-footer";
import { POSActions } from "../../pos/components/pos-actions";
import { CircleUser, RotateCcw, ShoppingBag } from "lucide-react";
import { ItemCart } from "../../cart/components/item-cart";
import { usePosStore } from "../../pos/store/pos";
import { useState } from "react";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { VehicleSearchItem } from "@/features/order-detail/components/vehicle-search-item";
import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "@/features/vehicles/api/vehicle";
import { useDebounce } from "@uidotdev/usehooks";
import { Separator } from "@/components/ui/separator";
import { ItemCartUnit } from "@/features/cart/components/item-cart-unit";
import { ItemCartService } from "@/features/cart/components/item-cart-service";
import { PaymentDetail } from "./payment-detail";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { CustomerInformation } from "./customer-information";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SaleRequestDto, SaleResponseDto } from "@/features/sale/types/sale.dto";
import { EditButton } from "@/components/edit-button";

interface OrderDetailsProps {
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>;
}

export function OrderDetails({ saleId, handlePayment } : OrderDetailsProps) {
  const { items, vehicle, services, setDefaultVehicleAndCustomer } = usePosStore();

  const checkedServices = services.filter(s => s.checked);

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
            className="mt-2 p-3 rounded-lg w-[425px]"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="mb-4 font-medium text-md text-muted-foreground">Search Result</div>
            <div className="relative h-80">
              <div className="absolute inset-0 flex flex-col gap-2 h-full max-h-full overflow-scroll">
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
        <div className="flex justify-between mt-4 w-full">
          <Popover>
            <PopoverTrigger>
              <Button
                className="gap-2 border-accent/50 bg-accent/10 border rounded-full min-w-6 h-6 font-medium text-primary hover:text-background"
              >
                <CircleUser />
                {vehicle.customer.name || '-'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-2 w-80">
              <CustomerInformation customer={vehicle.customer} />
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-2">
            <Button
              variant='ghost'
              onClick={() => setDefaultVehicleAndCustomer()}
              className={cn([
                "flex rounded-full text-primary h-4 hover:bg-transparent hover:text-primary"
              ])}
              size='icon'
            >
              <RotateCcw className="!w-4 !h-4" />
            </Button>
            <EditButton to={'/customers/edit' + vehicle.id} className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2 p-2 border rounded-lg">
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2">
              <Badge className="h-6">
                {vehicle.makeAndModel}
              </Badge>
            </div>
            <EditButton to={'/vehicles/edit' + vehicle.id} className="w-4 h-4" />
          </div>
          <VehicleInformation className="mt-4" vehicle={vehicle} />
        </div>
        <ItemCart className="flex-grow mt-4 w-full">
          { items.length === 0 && checkedServices.length == 0 &&
            <div className="place-content-center grid w-full h-full text-center text-muted-foreground">
              Empty...
            </div>
          }
          {items.map((i) => (
            <ItemCartUnit item={i} key={i.id} />
          ))}
          { (items.length > 0 && checkedServices.length > 0) &&
            <Separator className="bg-gray-400 my-2" />
          }
          { (checkedServices.length > 0) &&
            checkedServices.map((s) => (
              <ItemCartService service={s} key={s.service.id} />
            ))
          }
        </ItemCart>
      </SectionContent>
      <SectionFooter className="my-2">
        <PaymentDetail saleId={saleId} key={saleId}>
          <POSActions
            handlePayment={handlePayment} 
            className="mt-4"
          />
        </PaymentDetail>
      </SectionFooter>
    </Section>
  );
}