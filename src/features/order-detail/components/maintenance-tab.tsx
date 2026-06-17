import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Currency } from "@/components/currency";
import { usePosStore } from "@/features/pos/store/pos";
import { ServiceSelectorItem } from "@/features/service/types/service-selector-item";
import { getAutoServices } from "@/features/service/api/auto-services";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { Check, Search, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

export function MaintenanceTab() {
  const { serviceSelectorItems, setServiceSelectorItems } = usePosStore();
  const [q, setQ] = useState("");

  const serviceQuery = useQuery({
    queryKey: ['auto-services'],
    queryFn: () => getAutoServices(),
    staleTime: Infinity,  // Never considered stale
    refetchOnWindowFocus: false,  // No refetch on window focus
    refetchOnMount: false,        // No refetch on mount
    refetchOnReconnect: false     // No refetch on network reconnect
  });

  useEffect(() => {
    if (serviceQuery.data) {
      setServiceSelectorItems(serviceQuery.data.map((d) => ({
        service: d,
        price: d.price,
        discount: 0,
        quantity: 1,
        checked: false
      })));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceQuery.data]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return serviceSelectorItems;
    return serviceSelectorItems.filter((s) =>
      s.service.name.toLowerCase().includes(query)
    );
  }, [serviceSelectorItems, q]);

  const selectedCount = serviceSelectorItems.filter((s) => s.checked).length;

  return (
    <div className="grid grid-rows-[auto_auto_1fr] h-full">
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60 bg-muted/30">
        <h2 className="font-display text-base font-medium tracking-tight text-foreground">
          Services
        </h2>
        {selectedCount > 0 && (
          <span className="text-xs text-muted-foreground tabular-nums">
            {selectedCount} added
          </span>
        )}
      </div>

      <div className="p-3">
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
            strokeWidth={1.8}
          />
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search services…"
            className="pl-9 h-9"
          />
        </div>
      </div>

      <ScrollArea className="px-3 pb-3">
        {filtered.length === 0 ? (
          <div className="place-content-center grid h-40 text-muted-foreground text-sm text-center">
            {q.trim() ? `No services match “${q.trim()}”.` : "No services available."}
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.map((service) => (
              <ServiceItem key={service.service.id} service={service} />
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

function ServiceItem({ service }: { service: ServiceSelectorItem }) {
  const serviceId = service.service.id;
  const isSelected = service.checked;
  const { addService, removeService } = usePosStore();

  function handleOnClick() {
    if (isSelected) {
      removeService(serviceId);
    } else {
      addService(serviceId);
    }
  }

  return (
    <button
      type="button"
      onClick={handleOnClick}
      className={cn(
        "group flex w-full items-center gap-3 p-3 rounded-lg border text-left transition-colors",
        isSelected
          ? "border-primary bg-primary/10"
          : "border-border/60 bg-card hover:bg-muted/40 hover:border-foreground/20"
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center size-9 rounded-md shrink-0 transition-colors",
          isSelected
            ? "bg-primary text-white"
            : "bg-muted text-muted-foreground"
        )}
      >
        {isSelected ? <Check className="size-4" /> : <Wrench className="size-4" strokeWidth={1.8} />}
      </span>
      <span className="flex-1 min-w-0 font-medium text-sm text-foreground truncate">
        {service.service.name}
      </span>
      <span className="font-display tabular-nums text-sm text-foreground shrink-0">
        <Currency amount={service.price} />
      </span>
    </button>
  );
}
