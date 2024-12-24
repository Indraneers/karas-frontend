import { IconInput } from "@/components/ui/icon-input";
import { Popover, PopoverAnchor, PopoverContent } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { FormEvent, useState } from "react";
import { VehicleSearchItem } from "./vehicle-search-item";
import { useDebounce } from "@uidotdev/usehooks";
import { getVehicles } from "@/features/vehicles/api/vehicle";
import { useQuery } from "@tanstack/react-query";

interface VehicleCustomerSearchProps {
  className?: string;
  value?: string;
}

export function VehicleCustomerSearch({ className, value } : VehicleCustomerSearchProps) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 200);
  
  const { isError, isLoading, data } = useQuery({
    queryKey: ['vehicles', debouncedQ],
    queryFn: () => getVehicles({ q: debouncedQ })
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
            <div className="px-2 pb-2">
              <div className="font-medium text-muted-foreground text-xs">
                Vehicles
              </div>
              <div className="mt-2">
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
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}