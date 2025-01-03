import { useQuery } from "@tanstack/react-query";
import { getCategoryById } from "../api/category";

export function CategoryCell({ categoryId } : { categoryId: string }) {
  const { isError, isLoading, data } = useQuery({
    queryKey: ['category-' + categoryId],
    queryFn: () => getCategoryById(categoryId)
  });

  if (isError) {
    return 'error';
  }

  if (isLoading) {
    return 'loading';
  }

  if (!data) {
    return 'empty';
  }

  return data.name;
}