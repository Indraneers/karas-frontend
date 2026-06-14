import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";
import { getSales } from "../api/sale";
import { getTotal } from "../utils/sale";
import { StatusBadge } from "./status-badge";
import { Currency } from "@/components/currency";
import type { Item } from "../types/item";

/**
 * Compact recent-sales list for the customer/vehicle POS sheets.
 * Pass exactly one of `customerId` / `vehicleId`.
 */
export function RecentSales({
  customerId,
  vehicleId,
  limit = 5,
}: {
  customerId?: string;
  vehicleId?: string;
  limit?: number;
}) {
  const id = customerId ?? vehicleId;

  const { data, isLoading } = useQuery({
    queryKey: ["recent-sales", { customerId, vehicleId }],
    queryFn: () => getSales({ customerId, vehicleId, page: 0 }),
    enabled: !!id,
  });

  const sales = (data?.content ?? []).slice(0, limit);

  if (isLoading) {
    return (
      <div className="space-y-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-9 rounded-md bg-muted/50 animate-pulse" />
        ))}
      </div>
    );
  }

  if (sales.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-border/60 bg-muted/30 px-3 py-3 text-xs text-muted-foreground">
        No sales yet.
      </div>
    );
  }

  return (
    <ul className="space-y-1.5 text-xs">
      {sales.map((s) => {
        const total = getTotal({
          items: s.items as unknown as Item[],
          maintenanceServices: s.maintenance ? s.maintenance.services : [],
          discount: s.discount,
        });
        return (
          <li key={s.id}>
            <Link
              to={"/sales/" + s.id}
              className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-card px-3 py-2 transition-colors hover:bg-muted/50"
            >
              <span className="flex flex-col min-w-0">
                <span className="font-medium text-foreground truncate">{s.id}</span>
                <span className="text-muted-foreground">
                  {format(new Date(s.createdAt), "do MMM yyyy")}
                </span>
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <StatusBadge status={s.status} />
                <span className="font-display tabular-nums text-foreground">
                  <Currency amount={total} />
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
