import { ScrollArea } from "@/components/ui/scroll-area";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { usePosStore } from "@/features/pos/store/pos";
import { ServiceSelectorItem } from "@/features/service/types/service-selector-item";
import { getAutoServices } from "@/features/service/api/auto-services";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

export function MaintenanceTab() {
  const { serviceSelectorItems, setServiceSelectorItems } = usePosStore();

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

  return (
    <div className="grid grid-rows-[auto,1fr] py-4 h-full">
      <TypographyH3 className="px-4">Services</TypographyH3>
      <ScrollArea className="mr-2 pl-2">
        {serviceSelectorItems.map(service => (
          <ServiceItemList key={service.service.id} service={service} />
        ))}
      </ScrollArea>
    </div>
  );
}

function ServiceItemList({ service } : { service: ServiceSelectorItem }) {
  const serviceId = service.service.id;
  const isSelected = service.checked;
  
  const { addService, removeService } = usePosStore();

  function handleOnClick() {
    if (isSelected) {
      removeService(serviceId);
    }
    else {
      addService(serviceId);
    }
  }

  return (
    <div 
      className={cn([
        "flex items-center outline-offset-1 gap-2 bg-accent first:mt-2 mt-3 mb-1 ml-2 mr-4 p-4 border-md rounded-md font-medium text-primary-foreground text-sm cursor-pointer",
        isSelected && 'ring-2 ring-primary ring-offset-2'
      ])}
      onClick={handleOnClick}
    >
      <Wrench strokeWidth={1.5} /> {service.service.name}
    </div>
  );
}