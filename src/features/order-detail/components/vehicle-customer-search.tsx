import { IconInput } from "@/components/ui/icon-input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Dot, Search } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { SearchGroup } from "./search-group";
import { Separator } from "@/components/ui/separator";
import { getCustomers } from "@/features/customer/api/customer";
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

  console.log(customerQuery);

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
                    isOpen={vehicleQuery.q !== '' && isVehicleDataNotEmpty}
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
                    
                    (
                      (!isCustomerDataNotEmpty
                      &&
                      !isVehicleDataNotEmpty
                      )
                      ||
                      (vehicleQuery.q === '')
                    )
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

import { VehicleDto } from "../../vehicle/types/vehicle.dto";
import { usePosStore } from "@/features/pos/store/pos";
import { VehicleIcon } from "@/features/vehicle/components/vehicle-icon";
import { vehicleTypeList } from "@/features/vehicle/utils/vehicle";

interface VehicleSearchItemProps {
  className?: string;
  vehicle: VehicleDto;
  setQ: (text: string) => void;
  setOpen: (o: boolean) => void;
}

function VehicleSearchItem({ className, vehicle, setQ, setOpen }: VehicleSearchItemProps) {
  const { setVehicleAndCustomer } = usePosStore();

  function handleClick() {
    setVehicleAndCustomer(vehicle) ;
    setQ('');
    setOpen(false);
  }

  const vehicleIcon = vehicleTypeList.find(v => v.value === vehicle.vehicleType)?.icon || vehicleTypeList[0].icon;

  return (
    <div 
      onClick={handleClick}
      className={cn([
        'grid grid-cols-[auto,1fr] p-1 rounded-md gap-2 cursor-pointer items-center hover:bg-accent group hover:text-background',
        className
      ])}
    >
      <VehicleIcon className="w-8 h-8" iconClassName="w-6 h-6" icon={vehicleIcon} />
      <div className="flex flex-grow">
        <div className="flex flex-col flex-grow">
          <div className="font-medium text-sm">
            {vehicle.makeAndModel}
          </div>
          <div className="flex justify-between items-center group-hover:text-background text-xs">
            <div className="flex items-center text-foreground/50 group-hover:text-background">
              <div>
                {vehicle.plateNumber}
              </div>
              <Dot size={16} />
              <div>
                {vehicle.mileage} km
              </div>
            </div>
            <div className="font-medium">
              {vehicle.customer?.name}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { CustomerDto } from "@/features/customer/types/customer.dto";
import { User } from "lucide-react";

interface CustomerSearchItemProps {
  className?: string;
  customer: CustomerDto;
  setQ: (text: string) => void;
  setOpen: (b: boolean) => void;
}

export function CustomerSearchItem({ className, customer, setQ, setOpen }: CustomerSearchItemProps) {
  const { setCustomer } = usePosStore();

  function handleClick() {
    setCustomer(customer) ;
    setQ('');
    setOpen(false);
  }

  return (
    <div
      onClick={handleClick}
      className={cn([
        "hover:bg-accent group gap-2 hover:text-background items-center grid grid-cols-[auto,1fr] p-1 rounded-md cursor-pointer",
        className
      ])}
    >
      <div className={cn([
        "bg-primary p-1 rounded-sm h-8 w-8",
        className
      ])}>
        <User className={cn([
          "w-6 h-6 text-white"
        ])} />
      </div>
      <div className="flex flex-col">
        <div className="font-medium text-sm">
          {customer.name}
        </div>
        <div className="font-light text-muted-foreground group-hover:text-background text-xs">
          
          {customer.contact}
        </div>
      </div>
    </div>
  );
}