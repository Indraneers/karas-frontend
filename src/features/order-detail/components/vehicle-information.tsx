import { Textarea } from "@/components/ui/textarea";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { SaleDetailElement } from "@/features/sale/components/sale-detail-element";
import { VehicleDto } from "@/features/vehicles/dto/vehicle.dto";
import { cn } from "@/lib/utils";
import { VehicleSelect } from "./vehicle-select";
import { Separator } from "@/components/ui/separator";
import { PopoverButton } from "./popover-button";
import { Button } from "@/components/ui/button";
import { Edit, RotateCcw, SquarePlus } from "lucide-react";
import { VehicleForm } from "@/features/vehicles/components/vehicle-form";
import { usePosStore } from "@/features/pos/store/pos";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVehicle, updateVehicle } from "@/features/vehicles/api/vehicle";
import { toast } from "sonner";

interface VehicleInformationProps {
  className?: string;
  vehicle: VehicleDto;
}

export function VehicleInformation({ className, vehicle }: VehicleInformationProps) {
  const { customer, setVehicle, setDefaultVehicle } = usePosStore();
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    mutationFn: (vehicleDto: VehicleDto) => createVehicle(vehicleDto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['vehicles']
      });
      queryClient.invalidateQueries({
        queryKey: ['vehicle-' + vehicle?.id]
      });
      queryClient.invalidateQueries({
        queryKey: ['vehicles-customer-' + customer.id || '']
      });
      setVehicle(data);
    },
    onError: (error) => {
      toast(error.message);
    }
  });

  const updateMutation = useMutation({
    mutationFn: (vehicleDto: VehicleDto) => updateVehicle(vehicle?.id || '', vehicleDto),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['vehicles']
      });
      queryClient.invalidateQueries({
        queryKey: ['vehicle-' + vehicle?.id]
      });
      queryClient.invalidateQueries({
        queryKey: ['vehicles-customer-' + customer.id || '']
      });
      setVehicle(data);
    },
    onError: (error) => {
      toast(error.message);
    }
  });


  if (!vehicle) {
    return 'empty...';
  }
  
  return (
    <div className={cn([
      className
    ])}>
      <TypographyH3>
          Vehicle Information
      </TypographyH3>
      <div className="items-center gap-4 grid grid-cols-[2fr,auto,1fr] mt-3">
        <SaleDetailElement className="w-full" label="Vehicle">
          <VehicleSelect className="mt-2" />
        </SaleDetailElement>
        <Separator orientation="vertical" />
        <div className="flex gap-2">
          <PopoverButton 
            trigger={
              <Button variant="ghost"  size="icon">
                <SquarePlus />
              </Button>
            }
          >
            <VehicleForm 
              handleSubmit={async (vehicleDto: VehicleDto) => {
                createMutation.mutate(vehicleDto);
              }}
              isPopover
            />
          </PopoverButton>
          <PopoverButton 
            disabled={!vehicle.id}
            trigger={
              <Button disabled={!vehicle.id} variant="ghost" size="icon">
                <Edit />
              </Button>
            }
          >
            <VehicleForm
              data={vehicle}
              handleSubmit={async (vehicleDto: VehicleDto) => {
                updateMutation.mutate(vehicleDto);
              }}
              isPopover
            />
          </PopoverButton>
          <Button variant="ghost" onClick={setDefaultVehicle} size='icon'>
            <RotateCcw />
          </Button>
        </div>
      </div>
      <SaleDetailElement className="mt-4" label="Make and Model">
        <span className="font-medium">{vehicle.makeAndModel}</span>
      </SaleDetailElement>
      <SaleDetailElement className="mt-2" label="Plate Number">
        <span className="font-medium">{vehicle.plateNumber}</span>
      </SaleDetailElement>
      <SaleDetailElement className="mt-2" label="Mileage">
        {vehicle.mileage} km
      </SaleDetailElement>
      <SaleDetailElement className="mt-2" label="VIN N.O">
        {vehicle.vinNo}
      </SaleDetailElement>
      <SaleDetailElement className="mt-2" label="Engine N.O">
        {vehicle.engineNo}
      </SaleDetailElement>
      <SaleDetailElement className="mt-2" label="Vehicle Note">
        <Textarea rows={1} className="mt-2">
          {vehicle.note}
        </Textarea>
      </SaleDetailElement>
    </div>
  );
}