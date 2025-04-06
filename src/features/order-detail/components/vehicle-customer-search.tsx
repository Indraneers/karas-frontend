import { IconInput } from "@/components/ui/icon-input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { VehicleSearchItem } from "./vehicle-search-item";
import { SearchGroup } from "./search-group";
import { Separator } from "@/components/ui/separator";
import { getCustomers } from "@/features/customer/api/customer";
import { CustomerSearchItem } from "./customer-search-item";
import { SearchLoading } from "@/components/search-loading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getVehicles } from "@/features/vehicle/api/vehicle";
import { useInfiniteSearch } from "@/hooks/use-infinite-search";
interface VehicleCustomerSearchProps {
  className?: string;
  value?: string;
}

export function VehicleCustomerSearch({ className, value } : VehicleCustomerSearchProps) {
  const [open, setOpen] = useState(false);

  const vehicleQuery = useInfiniteSearch({
    getEntity: getVehicles,
    key: 'vehicles'
  });
  
  const customerQuery = useInfiniteSearch({
    getEntity: getCustomers,
    key: 'customers'
  });

  function handleOnInput(event: FormEvent<HTMLInputElement>) {
    const inputText = event.currentTarget.value;
    vehicleQuery.setQ(inputText);
    customerQuery.setQ(inputText);
  }

  const isCustomerDataNotEmpty =
    customerQuery.totalElements !== 0;

  const isVehicleDataNotEmpty = 
    vehicleQuery.totalElements !== 0;

  return (
    <div onBlur={(e) => !e.relatedTarget && setOpen(false)}>
      <Popover open={open}>
        <PopoverAnchor>
          <div
            className={cn([
              className
            ])}
          >
            <IconInput
              className="shadow-none border-0 border-b rounded-none focus-within:ring-0 focus-within:ring-muted-foreground h-10 text"
              value={value}
              onFocus={() => setOpen(true)}
              onInput={handleOnInput}
              icon={Search} 
              iconProps={{ behavior: 'prepend', className: 'text-muted-foreground' }} 
              placeholder="Search For Customer Or Vehicle" />
          </div>
        </PopoverAnchor>
        <PopoverContent
          className="p-0 rounded-md w-[400px]"
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="px-2 py-2 font-medium text-muted-foreground text-xs">Search Result</div>
          <Separator orientation="horizontal" />
          <div className="relative mt-1 h-80">
            <div className="absolute inset-0 flex flex-col gap-1 h-full max-h-full">
              <ScrollArea>
                <div>
                  {
                    (customerQuery.isLoading || vehicleQuery.isLoading) &&  
                  <SearchLoading />
                  }
                  <SearchGroup 
                    title="Customer" 
                    isOpen={customerQuery.q !== '' && isCustomerDataNotEmpty}
                    placeholder='customer'
                    fetchNextPage={customerQuery.fetchNextPage}
                    hasNextPage={customerQuery.hasNextPage}
                  >
                    {
                      customerQuery.isError && "Error"
                    }
                    {
                      customerQuery.q !== '' &&
                      customerQuery.data &&
                      customerQuery.data.pages.map((p, i) => (
                        <React.Fragment key={i}>
                          {
                            p.content.map((c, index) => (
                              <CustomerSearchItem 
                                key={c.id || index}
                                setQ={customerQuery.setQ}
                                customer={c}
                                setOpen={setOpen}
                              />
                            ))
                          }
                        </React.Fragment>
                      ))
                    }
                  </SearchGroup>
                  <Separator className={cn([
                    "my-2 hidden",
                    customerQuery.q !== '' 
                  && isVehicleDataNotEmpty
                  && isCustomerDataNotEmpty
                  && 'block'
                  ])} 
                  />
                  <SearchGroup
                    title="Vehicles"
                    isOpen={(vehicleQuery.q !== '' && isVehicleDataNotEmpty)}
                    placeholder='vehicle'
                    fetchNextPage={vehicleQuery.fetchNextPage}
                    hasNextPage={vehicleQuery.hasNextPage}
                  >
                    {
                      vehicleQuery.isError && "Error"
                    }
                    {
                      vehicleQuery.isLoading &&  <div className="place-content-center grid row-span-3 text-foreground/50 text-xl">Loading...</div>
                    }
                    {
                      vehicleQuery.q !== '' &&
                      vehicleQuery.data &&
                      vehicleQuery.data.pages.map((p, i) => (
                        <React.Fragment key={i}>
                          {
                            p.content.map((v, index) => (
                              <VehicleSearchItem 
                                key={v.id || index}
                                setQ={vehicleQuery.setQ}
                                vehicle={v}
                                setOpen={setOpen}
                              />
                            ))
                          }
                        </React.Fragment>
                      ))
                    }
      
                  </SearchGroup>
                  {
                    !isCustomerDataNotEmpty
                    &&
                    !isVehicleDataNotEmpty
                    &&
                    !vehicleQuery.isLoading
                    &&
                    !customerQuery.isLoading
                    &&
                    <div className="place-content-center grid row-span-3 mt-8 text-foreground/50 text-lg">Empty...</div>
                  }
                </div>
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}