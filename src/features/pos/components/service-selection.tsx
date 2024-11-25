import { Section } from "@/components/section";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { useQuery } from "@tanstack/react-query";
import { getAutoServices } from "../api/auto-services";
import { DataTable } from "@/components/data-table";
import { ServiceColumns } from "./service-columns";
import { useEffect } from "react";
import { usePosStore } from "../store/pos";

export function ServiceSelection() {
  const { services, setServices } = usePosStore();
  const { data } = useQuery({
    queryKey: ['auto-services'],
    queryFn: () => getAutoServices()
  });

  useEffect(() => {
    if (data) {
      setServices(data.map((d) => ({ 
        autoService: d, 
        price: d.originalPrice,
        discount: 0,
        quantity: 1
      })));
    }
  }, [data, setServices]);

  return (
    <div className="relative">
      <Section className="absolute inset-0 grid grid-rows-[auto,1fr] h-full">
        <TypographyH2>Services</TypographyH2>
        <DataTable columns={ServiceColumns} data={services} />
      </Section>
    </div>
  );
}