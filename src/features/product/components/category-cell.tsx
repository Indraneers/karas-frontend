import { Badge } from "@/components/ui/badge";
import { getCategoryById } from "@/features/category/api/category";
import { useQuery } from "@tanstack/react-query";

interface CategoryCellProps {
  categoryId: string;
}

export function CategoryCell({ categoryId }: CategoryCellProps) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['product-' + categoryId],
    queryFn: async () => await getCategoryById(categoryId)
  });

  if (isError) {
    return 'error';
  }

  if (isLoading) {
    return 'loading';
  }

  if (!data) {
    return '';
  }

  return (
    <Badge variant='outline' className="border-accent text-accent">
      {data?.name}
    </Badge>
  );
}