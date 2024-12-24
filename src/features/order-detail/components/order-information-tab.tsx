import { usePosStore } from "@/features/pos/store/pos";
import { CustomerInformation } from "./customer-information";
import { VehicleCustomerSearch } from "./vehicle-customer-search";
import { Separator } from "@/components/ui/separator";
import { VehicleInformation } from "./vehicle-information";

export function OrderInformationTab() {
  const { vehicle, customer } = usePosStore();
  return (
    <div>
      <VehicleCustomerSearch />
      <div className="px-4">
        <CustomerInformation className="mt-4" customer={customer} />
        <Separator className="mt-4" />
        <VehicleInformation className="mt-4" vehicle={vehicle} />
      </div>
    </div>
  );
}