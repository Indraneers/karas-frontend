import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { getCustomers } from "../api/customer";
import { CustomerDto } from "../types/customer.dto";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CustomerSearch({ value, onChange }: { value?: CustomerDto, onChange: (customerDto: CustomerDto) => void } ) {
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState<CustomerDto | undefined>(value);

  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  
  const { isLoading, data } = useQuery({
    queryKey: ['customers', debouncedQ],
    queryFn: () => getCustomers({ q: debouncedQ }),
    enabled: q !== ''
  });

  function onClickCustomer(customerDto: CustomerDto) {
    setCustomer(customerDto);
    onChange(customerDto);
  }

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between w-[200px]"
          >
            {value
              ? customer?.name
              : "Select customer..."}
            <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[200px]">
          <Command>
            <CommandInput 
              onInput={(event) => setQ(event.currentTarget.value)}
              defaultValue={customer ? customer.name : ''} 
              placeholder="Search for Customer" 
            />
            <CommandList>
              {
                q !== '' && data?.length === 0 && !isLoading &&
                <CommandEmpty>No Customer found.</CommandEmpty>
              }
              { q !== '' &&
              <CommandGroup heading="Customers">
                {data?.map((c) => (
                  <CommandItem
                    key={c.id}
                    onSelect={() => {
                      onClickCustomer(c);
                      setOpen(false);
                    }}
                    value={c.name}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (customer && (c.name === customer.name)) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {c.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              }
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
