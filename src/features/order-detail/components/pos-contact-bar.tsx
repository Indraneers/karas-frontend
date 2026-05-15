import { useState } from "react";
import { usePosStore } from "@/features/pos/store/pos";
import { VehicleCustomerSearch } from "./vehicle-customer-search";
import { ChevronRight, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { CustomerSheet } from "./customer-sheet";
import { VehicleSheet } from "./vehicle-sheet";
import { CustomerCreateSheet } from "./customer-create-sheet";
import { VehicleCreateSheet } from "./vehicle-create-sheet";
import { CustomerIcon, VehicleIcon } from "@/components/icons/contact-icons";

/**
 * Compact context strip pinned above the items grid: one search input that
 * spans both customer and vehicle, plus two read-out chips showing what's
 * currently attached to the order. Chips are visually distinct from the
 * search (no input borders, soft surface, icon medallions) so the cashier
 * never confuses "what's attached" with "what I'm typing."
 */
export function PosContactBar({ className }: { className?: string }) {
  const { customer, vehicle } = usePosStore();
  const [customerOpen, setCustomerOpen] = useState(false);
  const [vehicleOpen, setVehicleOpen] = useState(false);
  const [customerCreateOpen, setCustomerCreateOpen] = useState(false);
  const [vehicleCreateOpen, setVehicleCreateOpen] = useState(false);

  const hasCustomer = !!customer?.id;
  const hasVehicle = !!vehicle?.id;

  const customerSecondary = [
    customer?.contact,
    hasVehicle && vehicle.plateNumber && vehicle.plateNumber !== "-"
      ? vehicle.plateNumber
      : null
  ]
    .filter(Boolean)
    .join(" · ");

  const vehicleSecondary = [
    vehicle?.makeAndModel && vehicle.makeAndModel !== "-" ? vehicle.makeAndModel : null,
    vehicle?.mileage ? `${vehicle.mileage.toLocaleString()} km` : null
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <VehicleCustomerSearch />
      <div className="grid grid-cols-2 gap-2">
        <ContactChip
          icon={CustomerIcon}
          empty={!hasCustomer}
          emptyLabel="Add customer"
          primary={customer?.name || ""}
          secondary={customerSecondary}
          onClick={() =>
            hasCustomer ? setCustomerOpen(true) : setCustomerCreateOpen(true)
          }
        />
        <ContactChip
          icon={VehicleIcon}
          empty={!hasVehicle}
          emptyLabel="Add vehicle"
          primary={vehicle?.plateNumber && vehicle.plateNumber !== "-" ? vehicle.plateNumber : ""}
          secondary={vehicleSecondary}
          onClick={() =>
            hasVehicle ? setVehicleOpen(true) : setVehicleCreateOpen(true)
          }
        />
      </div>

      {hasCustomer && (
        <CustomerSheet
          customer={customer}
          open={customerOpen}
          onOpenChange={setCustomerOpen}
        />
      )}
      {hasVehicle && (
        <VehicleSheet
          vehicle={vehicle}
          open={vehicleOpen}
          onOpenChange={setVehicleOpen}
        />
      )}
      <CustomerCreateSheet
        open={customerCreateOpen}
        onOpenChange={setCustomerCreateOpen}
      />
      <VehicleCreateSheet
        open={vehicleCreateOpen}
        onOpenChange={setVehicleCreateOpen}
      />
    </div>
  );
}

interface ContactChipProps {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  empty: boolean;
  emptyLabel: string;
  primary: string;
  secondary: string;
  onClick: () => void;
}

function ContactChip({
  icon: Icon,
  empty,
  emptyLabel,
  primary,
  secondary,
  onClick
}: ContactChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-2 pl-2 pr-2.5 py-1.5 rounded-md text-left transition-colors h-9 border cursor-pointer",
        empty
          ? "bg-card border-foreground/20 border-dashed text-foreground/80 hover:bg-muted/50 hover:border-foreground/30"
          : "bg-card border-border/60 hover:border-foreground/20 hover:bg-muted/40"
      )}
    >
      <Icon
        className={cn(
          "size-4 shrink-0",
          empty ? "text-foreground/60" : "text-foreground/70"
        )}
        strokeWidth={1.8}
      />
      <div className="flex-1 min-w-0">
        {empty ? (
          <span className="text-xs font-medium">{emptyLabel}</span>
        ) : (
          <div className="truncate text-xs leading-tight">
            <span className="font-medium text-foreground">{primary || "—"}</span>
            {secondary && (
              <span className="text-muted-foreground"> · {secondary}</span>
            )}
          </div>
        )}
      </div>
      {empty ? (
        <Plus className="size-3.5 text-foreground/50 shrink-0" />
      ) : (
        <ChevronRight className="size-3.5 text-muted-foreground/50 shrink-0" />
      )}
    </button>
  );
}
