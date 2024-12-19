import { Section } from "@/components/section";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { useQuery } from "@tanstack/react-query";
import { getAutoServices } from "@/features/pos/api/auto-services";
import { DataTable } from "@/components/data-table";
import { ServiceColumns } from "./service-columns";
import { useEffect } from "react";
import { usePosStore } from "@/features/pos/store/pos";
import { SectionHeader } from "@/components/section-header";
import { SectionContent } from "@/components/section-content";
import { Wrench } from "lucide-react";

export function ServiceSelection() {
  const { defaultServices, services, setServices } = usePosStore();
  const { data } = useQuery({
    queryKey: ['auto-services'],
    queryFn: () => getAutoServices()
  });

  useEffect(() => {
    if (defaultServices.length === 0 && data) {
      setServices(data.map((d) => ({ 
        service: d, 
        price: d.originalPrice,
        discount: 0,
        quantity: 1,
        checked: false
      })));
    }
  }, [data, defaultServices, services, setServices]);

  return (
    <div className="h-full">
      <Section className="inset-0 flex flex-col h-full">
        <SectionHeader className="flex items-center gap-2">
          <Wrench />
          <TypographyH2>Services</TypographyH2>
        </SectionHeader>
        <SectionContent className="flex-grow pt-0">
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