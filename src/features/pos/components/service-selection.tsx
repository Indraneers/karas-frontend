import { Section } from "@/components/section";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { useQuery } from "@tanstack/react-query";
import { getAutoServices } from "../api/auto-services";
import { DataTable } from "@/components/data-table";
import { ServiceColumns } from "./service-columns";
import { useEffect } from "react";
import { usePosStore } from "../store/pos";
import { SectionHeader } from "@/components/section-header";
import { SectionContent } from "@/components/section-content";

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
        price: (Number(d.originalPrice) / 100).toFixed(2),
        discount: '',
        quantity: 1
      })));
    }
  }, [data, setServices]);

  return (
    <div className="h-full">
      <Section className="inset-0 grid grid-rows-[auto,auto,1fr] h-full">
        <SectionHeader>
          <TypographyH2>Services</TypographyH2>
        </SectionHeader>
        <SectionContent>
          <div className="relative h-full">
            <div className="absolute inset-0">
              <DataTable columns={ServiceColumns} data={services} />
            </div>
          </div>
        </SectionContent>
      </Section>
    </div>
  );
}