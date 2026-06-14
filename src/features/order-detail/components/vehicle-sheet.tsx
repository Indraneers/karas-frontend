import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import { InfoField } from "@/components/info-field";
import { VehicleDto } from "@/features/vehicle/types/vehicle.dto";
import { usePosStore } from "@/features/pos/store/pos";
import { Edit, X } from "lucide-react";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateVehicle } from "@/features/vehicle/api/vehicle";
import { VehicleForm } from "@/features/vehicle/components/vehicle-form";

interface VehicleSheetProps {
  vehicle: VehicleDto;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

/**
 * Read-only sheet for the picked vehicle. Edit opens an inline edit sheet
 * (no page reroute). Service history slots in once a sales-by-vehicle
 * endpoint is wired.
 */
export function VehicleSheet({ vehicle, open, onOpenChange }: VehicleSheetProps) {
  const { setDefaultVehicle, setVehicle } = usePosStore();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState(false);

  const updateMutation = useMutation({
    mutationFn: (dto: VehicleDto) => updateVehicle(vehicle.id || "", dto),
    onSuccess: (updated) => {
      if (updated) setVehicle(updated);
      queryClient.invalidateQueries({ queryKey: ["vehicles"] });
    },
  });

  function handleClear() {
    setDefaultVehicle();
    onOpenChange(false);
  }

  function handleEdit() {
    if (!vehicle.id) return;
    setEditOpen(true);
  }

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="right" className="w-[420px] sm:max-w-[420px] gap-0 p-0">
          <SheetHeader className="px-5 py-4 border-b border-border/60">
            <SheetTitle className="font-display text-xl font-medium">
              {vehicle.plateNumber || "Vehicle"}
            </SheetTitle>
            <SheetDescription className="text-xs">
              Details for the vehicle attached to this order.
            </SheetDescription>
          </SheetHeader>

          <div className="px-5 py-5 space-y-5 overflow-y-auto flex-1">
            <section className="space-y-3">
              <h3 className="font-display text-sm font-medium text-foreground">Details</h3>
              <div className="grid grid-cols-2 gap-3">
                <InfoField label="Plate">{vehicle.plateNumber || "—"}</InfoField>
                <InfoField label="Type">{vehicle.vehicleType}</InfoField>
                <InfoField label="Make / Model">{vehicle.makeAndModel || "—"}</InfoField>
                <InfoField label="Mileage">
                  {vehicle.mileage?.toLocaleString() || 0} km
                </InfoField>
                <InfoField label="VIN N.O">{vehicle.vinNo || "—"}</InfoField>
                <InfoField label="Engine N.O">{vehicle.engineNo || "—"}</InfoField>
              </div>
              {vehicle.note && <InfoField label="Note">{vehicle.note}</InfoField>}
              {vehicle.customer?.name && (
                <InfoField label="Owner">
                  {vehicle.customer.name}
                  {vehicle.customer.contact && ` · ${vehicle.customer.contact}`}
                </InfoField>
              )}
            </section>

            <section className="space-y-2">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-sm font-medium text-foreground">Mileage history</h3>
                <span className="text-[11px] text-muted-foreground">Coming soon</span>
              </div>
              <div className="rounded-md border border-dashed border-border/60 bg-muted/30 px-3 py-3 text-xs text-muted-foreground">
                Track mileage at each service visit to see wear patterns over time.
              </div>
            </section>

            <section className="space-y-2">
              <div className="flex items-baseline justify-between">
                <h3 className="font-display text-sm font-medium text-foreground">Service history</h3>
                <span className="text-[11px] text-muted-foreground">Coming soon</span>
              </div>
              <ul className="space-y-1.5 text-xs">
                {[1, 2, 3].map((i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded-md border border-dashed border-border/60 bg-muted/30 px-3 py-2 text-muted-foreground"
                  >
                    <span>Visit placeholder #{i}</span>
                    <span className="tabular-nums">— km · — services</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          <div className="mt-auto px-5 py-3 border-t border-border/60 flex items-center justify-between gap-2">
            <Button variant="ghost" size="sm" onClick={handleClear}>
              <X className="size-4" /> Remove
            </Button>
            <Button
              size="sm"
              onClick={handleEdit}
              disabled={!vehicle.id}
              className="bg-blue-600 hover:bg-blue-500 text-white"
            >
              <Edit className="size-4" /> Edit
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={editOpen} onOpenChange={setEditOpen}>
        <SheetContent side="right" className="w-[480px] sm:max-w-[480px] gap-0 p-0">
          <SheetHeader className="px-5 py-4 border-b border-border/60">
            <SheetTitle className="font-display text-xl font-medium">Edit Vehicle</SheetTitle>
            <SheetDescription className="text-xs">
              Make changes to this vehicle.
            </SheetDescription>
          </SheetHeader>
          <div className="px-5 py-5 overflow-y-auto flex-1">
            <VehicleForm
              data={vehicle}
              defaultCustomer={vehicle.customer}
              isSheet
              handleSubmit={async (dto: VehicleDto) => {
                await updateMutation.mutateAsync(dto);
                setEditOpen(false);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
