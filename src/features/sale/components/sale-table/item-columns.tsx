import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Currency } from "@/components/currency";
import { calculateUnitItemTotalCost } from "../../utils/sale";
import { Item } from "../../types/item";
import { ProductIdentifier } from "@/features/product/components/product-identifier";
import { ItemQuantity } from "@/components/item-quantity";
import { cn } from "@/lib/utils";

export const itemColumns: ColumnDef<Item>[] = [
  {
    accessorKey: "id",
    header: () => <div className="font-medium text-muted-foreground">ID</div>,
    cell: ({ row }) => (
      <div className="font-mono text-xs text-muted-foreground">
        #{row.original.id?.slice(0, 4)}
      </div>
    ),
  },
  {
    accessorKey: "type",
    header: () => <div className="font-medium text-muted-foreground">Type</div>,
    cell: () => (
      <Badge variant="outline" className="text-[10px] font-medium">
        Product
      </Badge>
    ),
  },
  {
    id: "name",
    header: () => <div className="font-medium text-muted-foreground">Item</div>,
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <span className="font-medium text-foreground">{row.original.unit.product.name}</span>
        <ProductIdentifier identifier={row.original.unit.product.identifier} />
      </div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-right font-medium text-muted-foreground">Price</div>,
    cell: ({ row }) => (
      <div className="text-right font-display tabular-nums text-foreground">
        <Currency amount={row.original.price} />
      </div>
    ),
  },
  {
    accessorKey: "discount",
    header: () => <div className="text-right font-medium text-muted-foreground">Discount</div>,
    cell: ({ row }) => (
      <div
        className={cn(
          "text-right font-display tabular-nums",
          row.original.discount > 0 ? "text-destructive" : "text-muted-foreground/50"
        )}
      >
        {row.original.discount > 0 ? "−" : ""}
        <Currency amount={row.original.discount} />
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-right font-medium text-muted-foreground">Qty</div>,
    cell: ({ row }) => (
      <div className="text-right text-foreground">
        <ItemQuantity item={row.original} />
      </div>
    ),
  },
  {
    accessorKey: "Total",
    header: () => <div className="text-right font-medium text-muted-foreground">Total</div>,
    cell: ({ row }) => (
      <div className="text-right font-display tabular-nums font-medium text-foreground">
        <Currency
          amount={calculateUnitItemTotalCost(
            row.original.price,
            row.original.discount,
            row.original
          )}
        />
      </div>
    ),
  },
];