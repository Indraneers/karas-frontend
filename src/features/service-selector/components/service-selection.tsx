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
  const { services, setServices } = usePosStore();
  const { data } = useQuery({
    queryKey: ['auto-services'],
    queryFn: () => getAutoServices()
  });

  useEffect(() => {
    if (data) {
      setServices(data.map((d) => ({ 
        service: d, 
        price: (Number(d.originalPrice) / 100).toFixed(2),
        discount: '',
        quantity: 1,
        checked: false
      })));
    }
  }, [data, setServices]);

  return (
    <div className="h-full">
      <Section className="inset-0 flex flex-col h-full">
        <SectionHeader className="flex items-center gap-2">
          <Wrench />
          <TypographyH2>Services</TypographyH2>
        </SectionHeader>
        <SectionContent className="flex-grow mt-2 pt-0">
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