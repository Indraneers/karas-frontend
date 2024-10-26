import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/types/category";

import ResetIcon from '../assets/reset.svg?react';

interface CategoryListProps {
  className?: string;
  categories: Category[];
}

export function CategoryList({ categories, className }: CategoryListProps) {
  return (
    <div className={
      cn(
        "flex flex-wrap gap-3",
        className
      )
    }>
      { categories.map((c) => (
        <Button className="px-8 py-1 h-auto text-sm" key={c.name}>
          {c.name}
        </Button>
      )) }
      <Button className="hover:bg-background py-1 h-auto text-sm hover:text-primary-foreground">
        <span className="mr-1"><ResetIcon className="text-white" /></span>
        Reset
      </Button>
    </div>
  );
}