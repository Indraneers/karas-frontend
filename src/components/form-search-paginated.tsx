import { Command, CommandInput, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "./loading-spinner";
import { Page } from "@/types/page";
import { APIQuery } from "@/types/query";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import React from "react";
import { Entity } from "@/types/entity";

interface FormSearchPaginatedProps<T> {
  value?: T;
  onChange: (value: T) => void;
  getEntity: (q: APIQuery) => Promise<Page<T>>;
  placeholder: string;
  parentEntityName?: string;
  entityName: string;
  autoQuery?: boolean;
  getEntityById?: (id: string) => Promise<T>;
  onEntityChange?: (value: T) => void;
}

export function FormSearchPaginated<T extends Entity>({ 
  value, 
  onChange,
  getEntity,
  placeholder, 
  entityName,
  autoQuery = false,
  onEntityChange
}: FormSearchPaginatedProps<T> ) {
  const [open, setOpen] = useState(false);
  const [entity, setEntity] = useState<T | undefined>(value);

  const [maxPages, setMaxPages] = useState(1);

  const [q, setQ] = useState('');
  const debouncedQ = useDebounce(q, 200);

  const entityQuery = useInfiniteQuery({
    queryKey: [entityName + 's', debouncedQ],
    queryFn: ({ pageParam }) => getEntity({ q: debouncedQ, page: pageParam }),
    initialPageParam: 0,
    maxPages,
    getNextPageParam: (lastPage) => {
      const { totalPages } = lastPage;
      const currentPage = lastPage.number;
      
      if (maxPages !== totalPages) {
        setMaxPages(totalPages);
      }
      
      return (currentPage + 1) < totalPages ? currentPage + 1 : undefined;
    }
  });

  function onClickEntity(entityDto: T) {
    setEntity(entityDto);

    if (onEntityChange) {
      onEntityChange(entityDto);
    }

    onChange(entityDto);
  }

  useEffect(() => {
    if ((!entity && value) || (entity && value && entity.id != value.id)) {
      setEntity(value);
      if (onEntityChange && value) {
        onEntityChange(value);
      }
    }
  }, [entity, value, onEntityChange]);

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
              : `Select ${ entityName }...`
            }
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
              { (autoQuery ||  q !== '') &&
              <CommandGroup className="capitalize" heading={entityName}>
                {
                  (autoQuery ||  q !== '') && entityQuery.data?.pages && entityQuery.data?.pages.length > 0 && !entityQuery.isLoading &&
                <CommandEmpty>No {entityName} found.</CommandEmpty>
                }
                {
                  entityQuery.isLoading &&
                <div className="place-content-center grid py-8">
                  <LoadingSpinner className="w-20 h-20" />
                </div>
                }
                {
                  entityQuery.data?.pages.map((p, index) => (
                    <React.Fragment key={index}>
                      {p.content.map((e) => (
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
                    </React.Fragment>
                  ))
                }
              </CommandGroup>
              }
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}