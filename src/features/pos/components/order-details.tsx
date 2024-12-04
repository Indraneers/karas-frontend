import { Section } from "@/components/section";
import { SectionContent } from "@/components/section-content";
import { SectionHeader } from "@/components/section-header";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { CustomerInformation } from "./customer-information";
import { VehicleInformation } from "./vehicle-information";
import { VehicleCustomerSearch } from "./vehicle-customer-search";
import { SectionFooter } from "@/components/section-footer";
import { POSActions } from "./pos-actions";

export function OrderDetails() {
  return (
    <Section className="flex flex-col h-full">
      <SectionHeader>
        <TypographyH2>Order Details</TypographyH2>
      </SectionHeader>
      <SectionContent>
        <div className="mb-2">
          <VehicleCustomerSearch />
        </div>
        <VehicleInformation className="mt-2" />
        <CustomerInformation className="my-2" />
      </SectionContent>
      <SectionFooter>
        <POSActions />
      </SectionFooter>
    </Section>
  );
}