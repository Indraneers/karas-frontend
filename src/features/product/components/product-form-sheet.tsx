import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProduct, getProductById, updateProduct } from "../api/product";
import { ProductForm } from "./product-form";
import { ProductRequestDto, ProductResponseDto } from "../types/product.dto";
import { convertProductResponseDtoToProductRequestDto } from "../utils/convert";

interface ProductFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** When set, the sheet edits this product; otherwise it creates a new one. */
  productId?: string;
  /** Optional existing icon URL for an instant preview before the fetch lands. */
  existingImg?: string;
  onSaved?: (product: ProductResponseDto) => void;
}

/**
 * Reusable create/edit panel for a Product. Shared by the Products table
 * ("New Product" + row edit) and the POS right-click → edit flow, so both get
 * the same form — including POS icon upload — without a page reroute.
 */
export function ProductFormSheet({
  open,
  onOpenChange,
  productId,
  existingImg,
  onSaved
}: ProductFormSheetProps) {
  const queryClient = useQueryClient();
  const isEdit = !!productId;

  const productQuery = useQuery({
    queryKey: ["product-" + productId],
    queryFn: () => getProductById(productId as string),
    enabled: open && isEdit
  });

  const mutation = useMutation({
    mutationFn: ({ productDto, file }: { productDto: ProductRequestDto; file?: File }) =>
      isEdit
        ? updateProduct(productId as string, productDto, file)
        : createProduct(productDto, file),
    onSuccess: (saved) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (isEdit) {
        queryClient.invalidateQueries({ queryKey: ["product-" + productId] });
      }
      toast.success(isEdit ? "Product updated" : "Product created");
      onSaved?.(saved);
      onOpenChange(false);
    },
    onError: () => {
      toast.error(isEdit ? "Failed to update product" : "Failed to create product");
    }
  });

  const loadingData = isEdit && (productQuery.isLoading || !productQuery.data);
  const previewImg = productQuery.data?.img || existingImg;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[480px] sm:max-w-[480px] gap-0 p-0">
        <SheetHeader className="px-5 py-4 border-b border-border/60">
          <SheetTitle className="font-display text-xl font-medium">
            {isEdit ? "Edit Product" : "New Product"}
          </SheetTitle>
          <SheetDescription className="text-xs">
            {isEdit
              ? "Update the product details, POS icon, and stock settings."
              : "Create a product and set its POS icon and stock settings."}
          </SheetDescription>
        </SheetHeader>

        <div className="px-5 py-5 overflow-y-auto flex-1">
          {loadingData ? (
            <div className="space-y-4">
              <Skeleton className="w-full h-9" />
              <Skeleton className="w-full h-9" />
              <Skeleton className="w-[180px] h-[180px]" />
              <Skeleton className="w-full h-9" />
            </div>
          ) : (
            <ProductForm
              isSheet
              existingImg={previewImg}
              isSubmitting={mutation.isPending}
              data={
                isEdit && productQuery.data
                  ? convertProductResponseDtoToProductRequestDto(productQuery.data)
                  : undefined
              }
              handleSubmit={mutation.mutateAsync}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
