import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search, X, User } from "lucide-react";
import React, { FormEvent, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useInfiniteSearch } from "@/hooks/use-infinite-search";
import { SearchGroup } from "@/features/order-detail/components/search-group";
import { SearchLoading } from "@/components/search-loading";
import { getCustomers, getCustomerById } from "@/features/customer/api/customer";
import { getVehicles, getVehicleById } from "@/features/vehicle/api/vehicle";
import { VehicleItem } from "@/features/vehicle/components/vehicle-item";

interface SalesSearchBarProps {
  className?: string;
  customerId?: string;
  vehicleId?: string;
  onSelectCustomer: (id: string) => void;
  onSelectVehicle: (id: string) => void;
  onClear: () => void;
}

/**
 * Top-level search bar for the Sales page. Searches customers + vehicles and
 * applies the matching `customerId` / `vehicleId` filter to the sales table.
 */
export function SalesSearchBar({
  className,
  customerId,
  vehicleId,
  onSelectCustomer,
  onSelectVehicle,
  onClear,
}: SalesSearchBarProps) {
  const [open, setOpen] = useState(false);

  const vehicleQuery = useInfiniteSearch({ getEntity: getVehicles, key: ["vehicles"] });
  const customerQuery = useInfiniteSearch({ getEntity: getCustomers, key: ["customers"] });

  function handleInput(e: FormEvent<HTMLInputElement>) {
    const text = e.currentTarget.value;
    vehicleQuery.setQ(text);
    customerQuery.setQ(text);
  }

  function pickCustomer(id: string) {
    onSelectCustomer(id);
    customerQuery.setQ("");
    vehicleQuery.setQ("");
    setOpen(false);
  }

  function pickVehicle(id: string) {
    onSelectVehicle(id);
    customerQuery.setQ("");
    vehicleQuery.setQ("");
    setOpen(false);
  }

  const hasCustomers = customerQuery.totalElements !== 0;
  const hasVehicles = vehicleQuery.totalElements !== 0;
  const active = !!(customerId || vehicleId);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="flex-1" onBlur={(e) => !e.relatedTarget && setOpen(false)}>
        <Popover open={open}>
          <PopoverAnchor>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
                strokeWidth={1.8}
              />
              <Input
                className="pl-9 h-9"
                onFocus={() => setOpen(true)}
                onInput={handleInput}
                placeholder="Search sales by customer or vehicle…"
              />
            </div>
          </PopoverAnchor>
          <PopoverContent
            className="p-0 rounded-md w-[28rem]"
            align="start"
            onOpenAutoFocus={(e) => e.preventDefault()}
          >
            <div className="px-3 py-2 font-semibold text-muted-foreground text-xs">
              Search result
            </div>
            <Separator />
            <div className="relative h-80">
              <ScrollArea className="absolute inset-0">
                {(customerQuery.isLoading || vehicleQuery.isLoading) && <SearchLoading />}
                <SearchGroup
                  title="Customer"
                  isOpen={customerQuery.q !== "" && hasCustomers}
                  placeholder="customer"
                  fetchNextPage={customerQuery.fetchNextPage}
                  hasNextPage={customerQuery.hasNextPage}
                >
                  {customerQuery.q !== "" &&
                    customerQuery.data?.pages.map((p, i) => (
                      <React.Fragment key={i}>
                        {p.content.map((c, idx) => (
                          <div
                            key={c.id || idx}
                            onClick={() => c.id && pickCustomer(c.id)}
                            className="group grid grid-cols-[auto_1fr] gap-2.5 items-center p-2 rounded-md cursor-pointer transition-colors hover:bg-muted/60"
                          >
                            <div className="flex items-center justify-center w-9 h-9 rounded-md bg-rose-100/70 text-rose-700 shrink-0">
                              <User className="size-[18px]" strokeWidth={1.8} />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <div className="font-medium text-sm text-foreground truncate">
                                {c.name}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {c.contact || "—"}
                              </div>
                            </div>
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                </SearchGroup>
                <Separator
                  className={cn(
                    "my-2 hidden",
                    customerQuery.q !== "" && hasVehicles && hasCustomers && "block"
                  )}
                />
                <SearchGroup
                  title="Vehicles"
                  isOpen={vehicleQuery.q !== "" && hasVehicles}
                  placeholder="vehicle"
                  fetchNextPage={vehicleQuery.fetchNextPage}
                  hasNextPage={vehicleQuery.hasNextPage}
                >
                  {vehicleQuery.q !== "" &&
                    vehicleQuery.data?.pages.map((p, i) => (
                      <React.Fragment key={i}>
                        {p.content.map((v, idx) => (
                          <div key={v.id || idx} onClick={() => v.id && pickVehicle(v.id)}>
                            <VehicleItem vehicle={v} />
                          </div>
                        ))}
                      </React.Fragment>
                    ))}
                </SearchGroup>
                {customerQuery.q !== "" &&
                  !hasCustomers &&
                  !hasVehicles &&
                  !customerQuery.isLoading &&
                  !vehicleQuery.isLoading && (
                    <div className="grid place-content-center mt-10 text-sm text-muted-foreground">
                      No customers or vehicles match.
                    </div>
                  )}
              </ScrollArea>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      {active && (
        <ActiveFilterChip
          customerId={customerId}
          vehicleId={vehicleId}
          onClear={onClear}
        />
      )}
    </div>
  );
}

function ActiveFilterChip({
  customerId,
  vehicleId,
  onClear,
}: {
  customerId?: string;
  vehicleId?: string;
  onClear: () => void;
}) {
  const customerQuery = useQuery({
    queryKey: ["customer", customerId],
    queryFn: () => getCustomerById(customerId || ""),
    enabled: !!customerId,
  });
  const vehicleQuery = useQuery({
    queryKey: ["vehicle", vehicleId],
    queryFn: () => getVehicleById(vehicleId || ""),
    enabled: !!vehicleId,
  });

  const label = customerId
    ? customerQuery.data?.name || "Customer"
    : vehicleQuery.data?.plateNumber || "Vehicle";

  return (
    <button
      type="button"
      onClick={onClear}
      className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-border bg-card text-xs font-medium text-foreground hover:bg-muted/60 transition-colors shrink-0"
    >
      <span className="text-muted-foreground">{customerId ? "Customer:" : "Vehicle:"}</span>
      <span className="truncate max-w-[12rem]">{label}</span>
      <X className="size-3.5 text-muted-foreground" />
    </button>
  );
}
