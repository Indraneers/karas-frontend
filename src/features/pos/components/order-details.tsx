import { Section } from "@/components/section";
import { SectionContent } from "@/components/section-content";
import { SectionHeader } from "@/components/section-header";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { VehicleInformation } from "./vehicle-information";
import { VehicleCustomerSearch } from "./vehicle-customer-search";
import { SectionFooter } from "@/components/section-footer";
import { POSActions } from "./pos-actions";
import { ShoppingBag } from "lucide-react";
import { ItemCart } from "./item-cart";
import { ItemCartItem } from "./item-cart-item";
import { usePosStore } from "../store/pos";

export function OrderDetails() {
  const { items } = usePosStore();
  return (
    <Section className="flex flex-col h-full">
      <SectionHeader>
        <TypographyH2 className="flex items-center gap-2">
          <span>
            <ShoppingBag />
          </span>
          Order Details
        </TypographyH2>
      </SectionHeader>
      <SectionContent className="flex flex-col w-full">
        <div className="grid mb-2">
          <VehicleCustomerSearch />
        </div>
        <VehicleInformation />
        <ItemCart className="flex-grow mt-2 w-full">
          {items.map((i, index) => (
            <ItemCartItem item={i} key={index} />
          ))}
        </ItemCart>
      </SectionContent>
      <SectionFooter>
        <POSActions />
      </SectionFooter>
    </Section>
  );
}