import { ItemCardList, ItemEmpty, ItemSkeletonList } from "./item-selector";
import { useInfiniteSearch } from "@/hooks/use-infinite-search";
import { getProducts } from "@/features/product/api/product";
import React, { useCallback, useEffect, useState } from "react";

interface ProductSelectionProps {
  className?: string;
}

export function ProductSelection({ className }: ProductSelectionProps) {
  const [initialLoad, setInitialLoad] = useState(false);
  const { subcategory } = useItemSelectionStore();

  const {
    data,
    isLoading,
    isError,
    totalElements,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteSearch({
    getEntity: getProducts,
    key: ["products"],
    query: { subcategoryId: subcategory?.id },
  });

  const onScrollEvent = useCallback(
    (event: React.UIEvent<HTMLDivElement>) => {
      const { scrollHeight, clientHeight, scrollTop } = event.currentTarget;
      const threshold = 50;
      if (scrollHeight - clientHeight <= scrollTop + threshold) {
        if (hasNextPage && fetchNextPage) fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage],
  );

  useEffect(() => {
    if (!initialLoad && hasNextPage && fetchNextPage) {
      setInitialLoad(true);
      fetchNextPage();
    }
  }, [initialLoad, hasNextPage, fetchNextPage]);

  return (
    <div className={cn("h-full w-full", className)}>
      {isError && "error"}
      {!isLoading && totalElements === 0 && <ItemEmpty />}
      {(isLoading || (data && data.pages && totalElements > 0)) && (
        <ItemCardList onScroll={onScrollEvent}>
          {isLoading && <ItemSkeletonList />}
          {data?.pages.map((p, i) => (
            <React.Fragment key={i}>
              {p.content.map((product) => (
                <ProductSelectionCard product={product} key={product.id} />
              ))}
            </React.Fragment>
          ))}
        </ItemCardList>
      )}
    </div>
  );
}

import { Card } from "@/components/ui/card";
import { ProductResponseDto } from "@/features/product/types/product.dto";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { cn } from "@/lib/utils";
import { ItemImgBg } from "./item-img-bg";
import { ProductIdentifier } from "@/features/product/components/product-identifier";
import { ItemContextMenu } from "./item-context-menu";
import { ProductFormSheet } from "@/features/product/components/product-form-sheet";

interface ProductSelectionCardProps {
  product: ProductResponseDto;
}

export function ProductSelectionCard({ product }: ProductSelectionCardProps) {
  const { setProduct, setSelector } = useItemSelectionStore();
  const [editOpen, setEditOpen] = useState(false);

  function handleClick() {
    setSelector(ItemSelectionEnum.UNIT);
    setProduct(product);
  }

  const units = product.unitCount || 0;

  return (
    <>
    <ItemContextMenu label="product" name={product.name} onEdit={() => setEditOpen(true)}>
      <Card
        className="group relative flex flex-col h-full p-3 rounded-2xl border border-border bg-card shadow-sm w-full aspect-square overflow-hidden transition cursor-pointer hover:border-foreground/20 hover:shadow-md hover:-translate-y-0.5 text-left"
        onClick={handleClick}
      >
        {product.img && product.img.length > 0 && <ItemImgBg src={product.img} />}
        {/* Name, then a big identifier underneath — the identifier is the quick-scan target. */}
        <div className="z-10 min-w-0">
          <div
            className={cn(
              "font-semibold text-sm text-foreground truncate",
              product.img && "text-background"
            )}
          >
            {product.name}
          </div>
          <ProductIdentifier
            identifier={product.identifier}
            className="mt-1.5 text-base px-2 py-0.5"
          />
        </div>
        {/* Unit count de-emphasized at the bottom. */}
        <div
          className={cn(
            "z-10 mt-auto pt-2 text-xs tabular-nums text-muted-foreground",
            product.img && "text-background/80"
          )}
        >
          {units} {units === 1 ? "unit" : "units"}
        </div>
      </Card>
    </ItemContextMenu>
    <ProductFormSheet
      open={editOpen}
      onOpenChange={setEditOpen}
      productId={product.id}
      existingImg={product.img}
    />
    </>
  );
}
