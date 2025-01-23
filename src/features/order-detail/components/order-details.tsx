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

interface OrderDetailsProps {
  saleId?: string;
  handlePayment: (saleRequestDto: SaleRequestDto) => Promise<SaleResponseDto>;
}

export function OrderDetails({ saleId, handlePayment } : OrderDetailsProps) {
  return (
    <Section className="flex flex-col border rounded-2xl h-full">
      <SectionHeader className="p-3">
        <TypographyH2 className="flex items-center gap-2">
          Order Details
        </TypographyH2>
      </SectionHeader>
      <SectionContent className="flex mt-0 w-full">
        <Tabs className="flex flex-col p-0 w-full" defaultValue="order-info">
          <BorderedTabsList className="w-full">
            <BorderedTabsTrigger value='order-info'>
              Order Info
            </BorderedTabsTrigger>
            <BorderedTabsTrigger value='payment'>
              Payment
            </BorderedTabsTrigger>
          </BorderedTabsList>
          <TabsContent className="flex-grow h-full" value='order-info'>
            <OrderInformationTab />
          </TabsContent>
          <TabsContent className="flex-grow h-full" value="payment">
            <PaymentTab saleId={saleId} handlePayment={handlePayment} />
          </TabsContent>
        </Tabs>
      </SectionContent>
    </Section>
  );
}