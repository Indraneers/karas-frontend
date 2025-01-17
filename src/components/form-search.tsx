import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UseSearch } from "@/types/use-search";
import { LoadingSpinner } from "./loading-spinner";

interface FormSearchProps<T, UseId> {
  value?: UseId extends true ? string : T;
  onChange: UseId extends true ? ((id: string) => void) : ((value: T) => void);
  useSearch: () => UseSearch<T>;
  placeholder: string;
  entityName: string;
  autoQuery?: boolean;
  useId?: UseId;
  onEntityChange?: (value: T) => void;
}

interface Entity {
  id: string;
  name: string;
}

export function FormSearch<T extends Entity, UseId extends boolean = false>({ 
  value, 
  onChange,
  useSearch, 
  placeholder, 
  entityName,
  autoQuery = false,
  onEntityChange,
  useId
}: FormSearchProps<T, UseId> ) {
  const [open, setOpen] = useState(false);
  const [entity, setEntity] = useState<T | undefined>();

  const { q, setQ, isLoading, data } = useSearch();

  function onClickEntity(entityDto: T) {
    setEntity(entityDto);

    if (onEntityChange) {
      onEntityChange(entityDto);
    }

    if (useId) {
      (onChange as ((value: string) => void))(entityDto.id);
    }
    else {
      (onChange as ((value: T) => void))(entityDto);
    }
  }

  useEffect(() => {
    let entityDto: T | undefined;
    if (!entity && value) {
      if (useId) {
        entityDto = data?.find(d => d.id === value);
      }
      else {
        entityDto = data?.find(d => d.id === (value as T).id);
      }

      setEntity(entityDto);
      if (onEntityChange && entityDto) {
        onEntityChange(entityDto);
      }
    }
  }, [entity, value, data, useId, onEntityChange]);

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
              ? (entity  ? entity.name : '' )
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
              {
                isLoading &&
                <div className="place-content-center grid py-8">
                  <LoadingSpinner className="w-20 h-20" />
                </div>
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