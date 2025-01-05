import { Section } from "@/components/section";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { DataTable } from "@/components/data-table";
import { ServiceColumns } from "./service-columns";
import { usePosStore } from "@/features/pos/store/pos";
import { SectionHeader } from "@/components/section-header";
import { SectionContent } from "@/components/section-content";

export function ServiceSelection() {
  const { serviceSelectorItems } = usePosStore();
  console.log(serviceSelectorItems);
  return (
    <div className="h-full">
      <Section className="inset-0 flex flex-col h-full">
        <SectionHeader className="flex items-center gap-2">
          <TypographyH2>Services</TypographyH2>
        </SectionHeader>
        <SectionContent className="flex-grow pt-0">
          <div className="relative h-full">
            <div className="absolute inset-0">
              <DataTable columns={ServiceColumns} data={serviceSelectorItems} />
            </div>
          </div>
        </SectionContent>
      </Section>
    </div>
  );
}