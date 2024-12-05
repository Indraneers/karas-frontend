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
import { Item } from "@/types/item";
import { ItemCartItem } from "./item-cart-item";

const temporaryItems: Item[] = [
  {
    quantity: 20,
    price: 500,
    discount: 100,
    unit: {
      id: '1',
      name: '1L',
      price: 100,
      quantity: 100,
      productId: '1',
      sku: 'TW-40W-80'
    },
    product: {
      id: '1',
      name: 'Twister 40W-80 Engine',
      categoryId: '1'
    }
  },
  {
    quantity: 20,
    price: 500,
    discount: 100,
    unit: {
      id: '2',
      name: '2L',
      price: 100,
      quantity: 100,
      productId: '1',
      sku: 'TW-40W-80'
    },
    product: {
      id: '2',
      name: 'Twister 20W-80 Engine',
      categoryId: '1'
    }
  },
  {
    quantity: 20,
    price: 500,
    discount: 100,
    unit: {
      id: '3',
      name: '2L',
      price: 100,
      quantity: 100,
      productId: '1',
      sku: 'TW-40W-80'
    },
    product: {
      id: '2',
      name: 'Twister 20W-80 Engine',
      categoryId: '1'
    }
  }
];

export function OrderDetails() {
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
          {temporaryItems.map((i, index) => (
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