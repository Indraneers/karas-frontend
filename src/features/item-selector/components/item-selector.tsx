import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
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

  return (
    <div className="flex flex-col h-full">
      <ItemSelectorHeader>
        <TypographyH1>Items</TypographyH1>
        <Separator className="h-4" orientation="vertical" />
        <div className="flex justify-between items-center w-full h-12">
          <ItemSelectorBreadCrumb />
          <Button
            className={cn([
              "text-accent display h-8 ml-2",
              selector === ItemSelectionEnum.CATEGORY && "hidden",
            ])}
            variant="ghost"
            onClick={handleBackBtn}
          >
            <span>
              <ChevronLeft />
            </span>
            Back
          </Button>
        </div>
      </ItemSelectorHeader>
      <div className="relative grow">
        <Card className="absolute inset-0 flex flex-col mt-4">
          <CardContent className="my-4 grow">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}

export function ItemSelectorHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex items-center space-x-4 min-h-8">{children}</div>;
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

  // Helper to determine if we are at or past a certain level
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
      target: null, // Last item usually isn't clickable
    },
  ];

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem
          className="text-accent hover:underline cursor-pointer"
          onClick={() => setSelector(ItemSelectionEnum.CATEGORY)}
        >
          Categories
        </BreadcrumbItem>

        {breadcrumbItems.map(
          (item) =>
            isAtLevel(item.level) && (
              <React.Fragment key={item.level}>
                <BreadcrumbSeparator className="text-accent" />
                <BreadcrumbItem
                  onClick={() => item.target && setSelector(item.target)}
                  className={cn(
                    "text-accent",
                    item.target && "cursor-pointer hover:underline",
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
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography/h1";

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

export function ItemEmpty() {
  return (
    <div className="place-content-center grid h-full text-md text-muted-foreground">
      Empty
    </div>
  );
}
