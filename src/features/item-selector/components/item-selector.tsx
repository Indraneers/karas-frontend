import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { ChevronLeft } from "lucide-react";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/section-header";
import { SectionContent } from "@/components/section-content";

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
    <Section className="flex flex-col h-full">
      <SectionHeader>
        <ItemSelectorHeader>
          <div className="flex justify-between gap-2">
            <TypographyH2>Items</TypographyH2>
          </div>
          <Separator className="h-4" orientation="vertical" />
          <div className="flex justify-between items-center w-full">
            <ItemSelectorBreadCrumb />
            <Button 
              className={cn([
                'text-accent display h-8',
                selector === ItemSelectionEnum.CATEGORY && 'hidden'
              ])} 
              variant='ghost'
              onClick={handleBackBtn}
            >
              <span><ChevronLeft /></span>
            Back
            </Button>
          </div>
        </ItemSelectorHeader>
      </SectionHeader>
      <SectionContent className="flex-grow">
        {children}
      </SectionContent>
    </Section>
  );
}

export function ItemSelectorHeader({ children } : { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-4 min-h-8">
      {children}
    </div>
  );
}

import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export function ItemSelectorBreadCrumb() {
  const { selector, setSelector, category, subcategory, product } = useItemSelectionStore();

  function isBreadcrumbVisible(itemSelectionType: ItemSelectionEnum) {
    switch(itemSelectionType) {
    case ItemSelectionEnum.SUBCATEGORY:
      if (selector === ItemSelectionEnum.UNIT || selector === ItemSelectionEnum.PRODUCT || selector === ItemSelectionEnum.SUBCATEGORY) {
        return 'block';
      }
      break;
    case ItemSelectionEnum.PRODUCT:
      if (selector === ItemSelectionEnum.UNIT || selector === ItemSelectionEnum.PRODUCT) {
        return 'block';
      }
      break;
    case ItemSelectionEnum.UNIT:
      if (selector === ItemSelectionEnum.UNIT) {
        return 'block';
      }
      break;
    default:
      return 'hidden';
    }
  }

  return (
    <Breadcrumb>  
      <BreadcrumbList>
        {/* Category */}
        <BreadcrumbItem 
          className="text-accent hover:underline cursor-pointer" 
          onClick={() => setSelector(ItemSelectionEnum.CATEGORY)}
        >
          Categories
        </BreadcrumbItem>
        {/* Subcategory */}
        <BreadcrumbSeparator 
          className={cn([isBreadcrumbVisible(ItemSelectionEnum.SUBCATEGORY) ? 'block text-accent' : 'hidden'])} 
        />
        <BreadcrumbItem
          onClick={() => setSelector(ItemSelectionEnum.SUBCATEGORY)}
          className={cn([
            "hover:underline cursor-pointer text-accent",
            isBreadcrumbVisible(ItemSelectionEnum.SUBCATEGORY) ? 'block' : 'hidden'
          ])} 
        >
          {category?.name}
        </BreadcrumbItem>
        {/* Product */}
        <BreadcrumbSeparator 
          className={cn([isBreadcrumbVisible(ItemSelectionEnum.PRODUCT) ? 'block text-accent' : 'hidden'])} 
        />
        <BreadcrumbItem
          onClick={() => setSelector(ItemSelectionEnum.PRODUCT)}
          className={cn([
            "hover:underline cursor-pointer text-accent",
            isBreadcrumbVisible(ItemSelectionEnum.PRODUCT) ? 'block' : 'hidden'
          ])} 
        >
          {subcategory?.name}
        </BreadcrumbItem>
        {/* Unit */}
        <BreadcrumbSeparator 
          className={cn([isBreadcrumbVisible(ItemSelectionEnum.UNIT) ? 'block text-accent' : 'hidden'])} 
        />
        <BreadcrumbItem
          className={cn([isBreadcrumbVisible(ItemSelectionEnum.UNIT) ? 'block text-accent' : 'hidden'])} 
        >
          {product?.name}
        </BreadcrumbItem>
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

export const ItemCardList = React.forwardRef<HTMLDivElement, ItemCardListProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative h-full overflow-y-auto", // Changed to overflow-y-auto
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 gap-2 grid grid-cols-3 xl:grid-cols-4 auto-rows-max">
          {children}
        </div>
      </div>
    );
  }
);

ItemCardList.displayName = "ItemCardList";

export function ItemEmpty() {
  return (
    <div className="place-content-center grid h-full text-md text-muted-foreground">
      Empty
    </div>
  );
}