import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductResponseDto } from "../types/product.dto";
import { useProductSearch } from "../hooks/product-search";
import { SearchLoading } from "@/components/search-loading";
import { ProductSearch } from "./product-search";
import { Product } from "../types/product";

interface ProductDetailedSearchProps {
  value?: string;
  onChange: (value: string) => void;
  placeholder: string;
  entityName: string;
  autoQuery?: boolean;
  onEntityChange?: (value: ProductResponseDto) => void;
}

export function ProductDetailedSearchItem({ product } : { product: Product}) {
  return (
    <div className="hover:bg-accent p-1 rounded-sm font-medium hover:text-background text-sm text-left transition-all cursor-pointer">
      {product.name} ({product.identifier})
    </div>
  );
}

export function ProductDetailedSearch({ 
  value, 
  entityName,
  onEntityChange,
  onChange
}: ProductDetailedSearchProps ) {
  const [open, setOpen] = useState(false);
  const [entity, setEntity] = useState<ProductResponseDto>();

  const { q, setQ, isLoading, data } = useProductSearch();

  function onClickEntity(entityDto: ProductResponseDto) {
    setEntity(entityDto);

    if (onEntityChange) {
      onEntityChange(entityDto);
    }

    onChange(entityDto.id);
  }

  useEffect(() => {
    if (!entity && value) {
      const entityDto = data?.find((p => p.id === value));

      setEntity(entityDto);
      if (onEntityChange && entityDto) {
        onEntityChange(entityDto);
      }
    }
  }, [entity, value, data, onEntityChange]);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn([
              "justify-between w-[500px]"
            ])}
          >
            {value
              ? (entity  ? `${ entity.name } (${ entity.identifier })` : '' )
              : `Select ${ entityName }...`}
            <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-[500px]">
          <ProductSearch 
            className="shadow-none border-none rounded-none rounded-t-md outline-none ring-0 focus-within:ring-0 h-10"
            value={q}
            onChange={setQ}
          />
          <div className="p-2 border-t">
            <div className="mb-1 font-semibold text-muted-foreground text-xs">Products</div>
            <div className={cn([
              'space-y-2 font-body'
            ])}>
              {
                data?.length === 0 &&
              <div className="place-content-center grid p-4 h-40 text-muted-foreground text-sm text-center">
                Empty...
              </div>
              }
              {isLoading && !data &&
              <SearchLoading />
              }
              {data && data.map(p => (
                <div onClick={() => {
                  onClickEntity(p);
                  setOpen(false);
                }} key={p.id}>
                  <ProductDetailedSearchItem product={p} />
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}