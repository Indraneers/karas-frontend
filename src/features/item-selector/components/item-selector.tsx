import { Button } from "@/components/ui/button";
import { ChevronLeft, PackageSearch } from "lucide-react";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { cn } from "@/lib/utils";

interface ItemSelectionProps {
  children?: React.ReactNode;
}

export function ItemSelector({ children }: ItemSelectionProps) {
  const { selector, setSelector } = useItemSelectionStore();

  function handleBackBtn() {
    switch (selector) {
      case ItemSelectionEnum.SUBCATEGORY:
        setSelector(ItemSelectionEnum.CATEGORY);
        break;
      case ItemSelectionEnum.PRODUCT:
        setSelector(ItemSelectionEnum.SUBCATEGORY);
        break;
      case ItemSelectionEnum.UNIT:
        setSelector(ItemSelectionEnum.PRODUCT);
        break;
    }
  }

  const showBack = selector !== ItemSelectionEnum.CATEGORY;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-8 mb-2">
        <ItemSelectorBreadCrumb />
        {showBack && (
          <Button
            className="h-7 px-2 text-muted-foreground hover:text-foreground"
            variant="ghost"
            size="sm"
            onClick={handleBackBtn}
          >
            <ChevronLeft className="size-3.5" /> Back
          </Button>
        )}
      </div>
      <div className="relative grow">
        <div className="absolute inset-0 flex flex-col">{children}</div>
      </div>
    </div>
  );
}

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function ItemSelectorBreadCrumb() {
  const { selector, setSelector, category, subcategory, product } =
    useItemSelectionStore();

  const isAtLevel = (level: ItemSelectionEnum) => {
    const hierarchy = [
      ItemSelectionEnum.CATEGORY,
      ItemSelectionEnum.SUBCATEGORY,
      ItemSelectionEnum.PRODUCT,
      ItemSelectionEnum.UNIT,
    ];
    return hierarchy.indexOf(selector) >= hierarchy.indexOf(level);
  };

  const breadcrumbItems = [
    {
      level: ItemSelectionEnum.SUBCATEGORY,
      label: category?.name,
      target: ItemSelectionEnum.SUBCATEGORY,
    },
    {
      level: ItemSelectionEnum.PRODUCT,
      label: subcategory?.name,
      target: ItemSelectionEnum.PRODUCT,
    },
    {
      level: ItemSelectionEnum.UNIT,
      label: product?.name,
      target: null,
    },
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-xs">
        <BreadcrumbItem
          className="text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={() => setSelector(ItemSelectionEnum.CATEGORY)}
        >
          Categories
        </BreadcrumbItem>

        {breadcrumbItems.map(
          (item) =>
            isAtLevel(item.level) && (
              <React.Fragment key={item.level}>
                <BreadcrumbSeparator className="text-muted-foreground/40" />
                <BreadcrumbItem
                  onClick={() => item.target && setSelector(item.target)}
                  className={cn(
                    "text-muted-foreground",
                    item.target && "cursor-pointer hover:text-foreground",
                    !item.target && "text-foreground font-medium"
                  )}
                >
                  {item.label || "..."}
                </BreadcrumbItem>
              </React.Fragment>
            ),
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export function ItemSkeletonList() {
  return (
    <>
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full aspect-square" />
      <Skeleton className="w-full aspect-square" />
    </>
  );
}

interface ItemCardListProps {
  children?: React.ReactNode;
  className?: string;
  onScroll?: React.UIEventHandler<HTMLDivElement> | undefined;
  ref?: React.RefObject<HTMLDivElement>;
}

export const ItemCardList = React.forwardRef<
  HTMLDivElement,
  Omit<ItemCardListProps, "ref">
>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative flex w-full h-full", className)}
      {...props}
    >
      <div className="absolute inset-0 pr-3 overflow-y-scroll">
        <div className="gap-2 grid grid-cols-2 2xl:grid-cols-4 xl:grid-cols-3 auto-rows-max p-1">
          {children}
        </div>
      </div>
    </div>
  );
});
ItemCardList.displayName = "ItemCardList";

export function ItemEmpty({
  title = "Nothing here",
  hint,
}: {
  title?: string;
  hint?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 h-full text-center px-6">
      <div className="flex items-center justify-center size-14 rounded-full bg-muted text-muted-foreground/70">
        <PackageSearch className="size-7" strokeWidth={1.6} />
      </div>
      <div className="space-y-0.5">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">
          {hint ?? "Try a different category or search term."}
        </p>
      </div>
    </div>
  );
}
