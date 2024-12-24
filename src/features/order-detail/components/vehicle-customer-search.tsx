import { IconInput } from "@/components/ui/icon-input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { VehicleSearchItem } from "./vehicle-search-item";
import { useDebounce } from "@uidotdev/usehooks";
import { getVehicles } from "@/features/vehicles/api/vehicle";
import { useQueries } from "@tanstack/react-query";
import { SearchGroup } from "./search-group";
import { Separator } from "@/components/ui/separator";
import { getCustomers } from "@/features/customer/api/customer";
import { CustomerSearchItem } from "./customer-search-item";

interface VehicleCustomerSearchProps {
  className?: string;
  value?: string;
}

export function VehicleCustomerSearch({ className, value } : VehicleCustomerSearchProps) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 200);
  
  const [vehicleQuery, customerQuery] = useQueries({ 
    queries: [
      {
        queryKey: ['vehicles', debouncedQ],
        queryFn: () => getVehicles({ q: debouncedQ })
      },
      {
        queryKey: ['customers', debouncedQ],
        queryFn: () => getCustomers({ q: debouncedQ })
      }
    ]
  });

  function handleOnInput(event: FormEvent<HTMLInputElement>) {
    const inputText = event.currentTarget.value;
    setQ(inputText);
  }

  return (
    <Popover open={open}>
      <PopoverAnchor>
        <div
          className={cn([
            className
          ])}
        >
          <IconInput
            className="border-0 shadow-none border-b rounded-none focus-within:ring-muted-foreground focus-within:ring-0 h-10 text"
            value={value}
            onFocus={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            onInput={handleOnInput}
            icon={Search} 
            iconProps={{ behavior: 'prepend', className: 'text-muted-foreground' }} 
            placeholder="Search For Vehicle" />
        </div>
      </PopoverAnchor>
      <PopoverContent
        className="p-0 rounded-xl w-[400px]"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <div className="px-2 pt-2 font-medium text-muted-foreground text-sm">Search Result</div>
        <div className="relative mt-1 h-80">
          <div className="absolute inset-0 flex flex-col gap-1 h-full max-h-full overflow-scroll">
            <div className="pb-2">
              <SearchGroup title="Customer" isOpen={(q !== '' && customerQuery.data !== undefined && customerQuery.data.length > 0)}>
                {
                  customerQuery.isError && "Error"
                }
                {
                  (!customerQuery.data || q === '') && <div className="place-content-center grid row-span-3 text-foreground/50 text-xl">Empty...</div>
                }
                {
                  customerQuery.isLoading &&  <div className="place-content-center grid row-span-3 text-foreground/50 text-xl">Loading...</div>
                }
                {
                  q !== '' &&
                  customerQuery.data &&
                  customerQuery.data.map((c, index) => (
                    <CustomerSearchItem 
                      key={c.id || index}
                      setQ={setQ}
                      customer={c}
                    />
                  ))
                }
              </SearchGroup>
              <Separator className={cn([
                "my-2 hidden",
                q !== '' 
                && vehicleQuery.data !== undefined && vehicleQuery.data?.length > 0 
                && customerQuery.data !== undefined && customerQuery.data?.length > 0
                && 'block'
              ])} />
              <SearchGroup title="Vehicles" isOpen={(q !== '' && vehicleQuery.data !== undefined && vehicleQuery.data.length > 0)}>
                {
                  vehicleQuery.isError && "Error"
                }
                {
                  (!vehicleQuery.data || q === '') && <div className="place-content-center grid row-span-3 text-foreground/50 text-xl">Empty...</div>
                }
                {
                  vehicleQuery.isLoading &&  <div className="place-content-center grid row-span-3 text-foreground/50 text-xl">Loading...</div>
                }
                {
                  q !== '' &&
              vehicleQuery.data &&
              vehicleQuery.data.map((v, index) => (
                <VehicleSearchItem 
                  key={v.id || index}
                  setQ={setQ}
                  vehicle={v}
                />
              ))
                }
              </SearchGroup>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}