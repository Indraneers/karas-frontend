import { cn } from "@/lib/utils";
import { ItemCardList } from "./item-card-list";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/features/category/api/category";
import { CategorySelectionCard } from "./category-selection-card";
import { CategorySearch } from "@/features/category/components/category-search";

interface CategorySelectionProps {
  className?: string;
}

export function CategorySelection({ className }: CategorySelectionProps) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories()
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
        'h-full w-full overflow-hidden',
        className
      ])
    }>
      <div className="h-full overflow-hidden">
        <CategorySearch/>
        <ItemCardList className="mt-4">
          {data?.map((c) => (
            <CategorySelectionCard category={c} key={c.id} />
          ))}
        </ItemCardList>
      </div>
    </div>
  );
}