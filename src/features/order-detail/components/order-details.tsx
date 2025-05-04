import { Section } from "@/components/section";
import { SectionContent } from "@/components/section-content";
import { SectionHeader } from "@/components/section-header";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { SaleRequestDto, SaleResponseDto } from "@/features/sale/types/sale.dto";
import { Tabs } from "@/components/ui/tabs";
import { BorderedTabsList, BorderedTabsTrigger } from "@/components/bordered-tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { OrderInformationTab } from "./order-information-tab";
import { PaymentTab } from "./payment-tab";
import { MaintenanceTab } from "./maintenance-tab";
import { Badge } from "@/components/ui/badge";

interface OrderDetailsProps {
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>;
}

export function OrderDetails({ saleId, handlePayment } : OrderDetailsProps) {
  return (
    <Section className="flex flex-col bg-surface border rounded-2xl h-full">
      <SectionHeader className="relative p-3">
        <TypographyH2 className="flex items-center gap-2">
          Order Details
        </TypographyH2>
        {
          saleId && <Badge className="top-0 right-0 absolute m-4">{saleId}</Badge>
        }
      </SectionHeader>
      <SectionContent className="mt-0 w-full">
        <Tabs className="inset-0 flex flex-col p-0 w-full h-full overflow-y-hidden" defaultValue="order-info">
          <BorderedTabsList className="w-full">
            <BorderedTabsTrigger value='order-info'>
              Order Info
            </BorderedTabsTrigger>
            <BorderedTabsTrigger value='maintenance'>
              Maintenance
            </BorderedTabsTrigger>
            <BorderedTabsTrigger value='payment'>
              Payment
            </BorderedTabsTrigger>
          </BorderedTabsList>
          <TabsContent className="relative flex-grow h-full" value='order-info'>
            <div className="absolute inset-0">
              <OrderInformationTab />
            </div>
          </TabsContent>
          <TabsContent className="relative flex-grow" value="maintenance">
            <div className="absolute inset-0">
              <MaintenanceTab />
            </div>
          </TabsContent>
          <TabsContent className="flex-grow h-full" value="payment">
            <PaymentTab saleId={saleId} handlePayment={handlePayment} />
          </TabsContent>
        </Tabs>
      </SectionContent>
    </Section>
  );
}