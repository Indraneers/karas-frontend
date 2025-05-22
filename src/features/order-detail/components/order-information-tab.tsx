import { usePosStore } from "@/features/pos/store/pos";
import { VehicleCustomerSearch } from "./vehicle-customer-search";
import { Separator } from "@/components/ui/separator";

export function OrderInformationTab() {
  const { vehicle, customer } = usePosStore();
  return (
    <div className="grid grid-rows-[auto,1fr] h-full">
      <VehicleCustomerSearch />
      <ScrollArea className="p-4">
        <CustomerInformation customer={customer} />
        <Separator className="mt-4" />
        <VehicleInformation className="mt-4" vehicle={vehicle} />
      </ScrollArea>
    </div>

  );
}

import { cn } from "@/lib/utils";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { Edit, Phone, RotateCcw, SquarePlus } from "lucide-react";
import { CustomerDto } from "@/features/customer/types/customer.dto";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PopoverButton } from "./popover-button";
import { CustomerForm } from "@/features/customer/components/customer-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer, updateCustomer } from "@/features/customer/api/customer";

interface CustomerInformationProps {
  className?: string;
  customer: CustomerDto | undefined;
}

function CustomerInformation({ customer, className } : CustomerInformationProps) {
  const queryClient = useQueryClient();
  const { setCustomer, setDefaultVehicleAndCustomer } = usePosStore();

  const createMutation = useMutation({
    mutationFn: (customerDto: CustomerDto) => createCustomer(customerDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['customers']
      });
    }
  });

  const updateMutation = useMutation({
    mutationFn: (customerDto: CustomerDto) => updateCustomer(customer?.id || '', customerDto),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['customers']
      });
      queryClient.invalidateQueries({
        queryKey: ['customer-' + customer?.id]
      });
    }
  });

  if (!customer) {
    return 'empty...';
  }

  return (
    <div className={cn([
      className
    ])}>
      <TypographyH3>
        Customer Information
      </TypographyH3>
      <div className="gap-2 grid xl:grid-cols-[2fr,auto,1fr] mt-2">
        <div>
          <div className="justify-start items-start lg:gap-2 grid xl:grid-cols-[1fr,auto]">
            <div className="min-h-6 font-medium text-md">
              {customer.name}
            </div>
            <Badge variant="outline" className={cn([
              "border-primary px-1 py-0 mt-1 rounded-full h-4 font-normal text-[10px] text-primary",
              'hidden',
              customer.contact && 'flex'
            ])}>
              <Phone className="mr-1 w-3" /> {customer.contact || '-'}
            </Badge>
          </div>
          <div className="mt-2 xl:mt-0 min-h-8 font-medium text-[10px] text-muted-foreground">
            {customer.address}
          </div>
        </div>
        <Separator className="hidden xl:block" orientation="vertical" />
        <div className="flex xl:justify-center items-center gap-2">
          <PopoverButton 
            trigger={
              <Button variant="ghost"  size="icon">
                <SquarePlus />
              </Button>
            }
          >
            <CustomerForm 
              handleSubmit={async (customerDto: CustomerDto) => {
                const customer = await createMutation.mutateAsync(customerDto);
                setCustomer(customer);
              }}
              isPopover
            />
          </PopoverButton>
          <PopoverButton 
            disabled={!customer.id}
            trigger={
              <Button disabled={!customer.id} variant="ghost" size="icon">
                <Edit />
              </Button>
            }
          >
            <CustomerForm 
              data={customer}
              handleSubmit={async (customerDto: CustomerDto) => {
                const customer = await updateMutation.mutateAsync(customerDto);
                setCustomer(customer);
              }}
              isPopover
            />
          </PopoverButton>
          <Button variant="ghost" onClick={setDefaultVehicleAndCustomer} size='icon'>
            <RotateCcw />
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Textarea } from "@/components/ui/textarea";
import { InfoField } from "@/components/info-field";
import { VehicleDto } from "@/features/vehicle/types/vehicle.dto";
import { VehicleSelect } from "./vehicle-select";
import { VehicleForm } from "@/features/vehicle/components/vehicle-form";
import { createVehicle, updateVehicle } from "@/features/vehicle/api/vehicle";
import { toast } from "sonner";
import { vehicleTypeList } from "@/features/vehicle/utils/vehicle";
import { VehicleIcon } from "@/features/vehicle/components/vehicle-icon";
import { VehicleType } from "@/features/vehicle/types/vehicle";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const vehicleObj = vehicleTypeList.find(t => t.value === vehicle.vehicleType) || vehicleTypeList[0];
  
  return (
    <div className={cn([
      className
    ])}>
      <TypographyH3>
          Vehicle Information
      </TypographyH3>
      <div className="items-center gap-4 grid xl:grid-cols-[2fr,auto,1fr] mt-3">
        <InfoField className="w-full" label="Vehicle">
          <VehicleSelect className="mt-2" />
        </InfoField>
        <Separator className="hidden xl:block" orientation="vertical" />
        <div className="flex gap-2">
          <PopoverButton 
            trigger={
              <Button variant="ghost"  size="icon">
                <SquarePlus />
              </Button>
            }
          >
            <VehicleForm 
              defaultCustomer={customer}
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
              defaultCustomer={customer}
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
      <div  className="xl:flex gap-6 mt-4">
        <InfoField label="Make and Model">
          <span className="font-medium">{vehicle.makeAndModel}</span>
        </InfoField>
        <div className="flex items-center gap-2 mt-2 xl:mt-0">
          {vehicle.vehicleType !== VehicleType.EMPTY && vehicle.vehicleType ? 
            <VehicleIcon className="w-8 h-8" iconClassName="h-6 w-6" icon={vehicleObj.icon} /> 
            : 
            ''}
          <InfoField className="" label="Vehicle Type">
            <span className="flex items-center gap-2 m- font-medium">
              {vehicle.vehicleType ? vehicleObj.content : VehicleType.EMPTY}
            </span>
          </InfoField>
        </div>
      </div>
      <InfoField className="mt-2" label="Plate Number">
        <span className="font-medium">{vehicle.plateNumber}</span>
      </InfoField>
      <InfoField className="mt-2" label="Mileage">
        {vehicle.mileage} km
      </InfoField>
      <InfoField className="mt-2" label="VIN N.O">
        {vehicle.vinNo}
      </InfoField>
      <InfoField className="mt-2" label="Engine N.O">
        {vehicle.engineNo}
      </InfoField>
      <InfoField className="mt-2" label="Vehicle Note">
        <Textarea rows={1} className="mt-2 xl:w-[340px]">
          {vehicle.note}
        </Textarea>
      </InfoField>
    </div>
  );
}