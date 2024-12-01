import { Section } from "@/components/section";
import { SectionContent } from "@/components/section-content";
import { SectionHeader } from "@/components/section-header";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { CustomerInformation } from "./customer-information";
import { VehicleInformation } from "./vehicle-information";
import { Separator } from "@/components/ui/separator";

export function OrderDetails() {
  return (
    <Section>
      <SectionHeader>
        <TypographyH2>Order Details</TypographyH2>
      </SectionHeader>
      <SectionContent>
        <CustomerInformation />
        <Separator className="mt-4 mb-2" />
        <VehicleInformation />
      </SectionContent>
    </Section>
  );
}