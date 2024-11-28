import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/features/product/api/product";
import { ProductSelectionCard } from "./product-selection-card";

interface ProductSelectionProps {
  className?: string;
}

export function ProductSelection({ className }: ProductSelectionProps) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts()
  });

  if (isError) {
    return "error";
  }

  if (isLoading) {
    return "loading";
  }

  if (!data) {
    return "empty";
  }

  return (
    <div className={
      cn([
        'h-full w-full',
        className
      ])
    }>
      <ItemCardList className="mt-2">
        {data?.map((p) => (
          <ProductSelectionCard product={p} key={p.id} />
        ))}
      </ItemCardList>
    </div>
  );
}