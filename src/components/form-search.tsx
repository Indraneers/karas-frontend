import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseSearch } from "@/types/use-search";

interface FormSearchProps<T> {
  value?: T;
  onChange: (value: T) => void;
  useSearch: () => UseSearch<T>;
  placeholder: string;
  entityName: string;
  autoQuery?: boolean;
}

interface Entity {
  id: string;
  name: string;
}

export function FormSearch<T extends Entity>({ value, onChange, useSearch, placeholder, entityName, autoQuery = false }: FormSearchProps<T> ) {
  const [open, setOpen] = useState(false);
  const [entity, setEntity] = useState<T | undefined>(value);

  const { q, setQ, isLoading, data } = useSearch();

  function onClickEntity(entityDto: T) {
    setEntity(entityDto);
    onChange(entityDto);
  }


  console.log(value);
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn([
              "justify-between w-[300px]"
            ])}
          >
            {value
              ? (entity ? value.name : '' )
              : `Select ${ entityName }...`}
            <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[300px]">
          <Command>
            <CommandInput 
              onInput={(event) => setQ(event.currentTarget.value)}
              placeholder={placeholder}
            />
            <CommandList>
              {
                (autoQuery ||  q !== '') && data?.length === 0 && !isLoading &&
                <CommandEmpty>No {entityName} found.</CommandEmpty>
              }
              { (autoQuery ||  q !== '') &&
              <CommandGroup className="capitalize" heading={entityName}>
                {data?.map((e) => (
                  <CommandItem
                    key={e.id}
                    onSelect={() => {
                      onClickEntity(e);
                      setOpen(false);
                    }}
                    value={e.name}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        (entity && (e.name === entity.name)) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {e.name || ''}
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
