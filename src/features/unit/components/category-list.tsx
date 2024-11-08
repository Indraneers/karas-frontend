import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/types/category";

import ResetIcon from '../assets/reset.svg?react';

interface CategoryListProps {
  className?: string;
  categories: Category[] | undefined;
}

export function CategoryList({ categories, className }: CategoryListProps) {
  console.log(categories);
  return (
    <div className={
      cn(
        "flex flex-wrap gap-3",
        className
      )
    }>
      { 
        categories && categories.map((c) => (
          <Button className="px-8 py-1 h-auto text-sm" key={c.id}>
            {c.name}
          </Button>
        )) 
      }
      <Button className="hover:bg-background py-1 h-auto text-sm">
        <span className="mr-1"><ResetIcon className="text-white" /></span>
        Reset
      </Button>
    </div>
  );
}