import { Section } from "@/components/section";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { ChevronLeft } from "lucide-react";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";

interface ItemSelectionProps {
  children?: React.ReactNode;
}

export function ItemSelection({ children }: ItemSelectionProps) {
  const { selector, setSelector } = useItemSelectionStore();

  function handleBackBtn() {
    switch (selector) {
    case ItemSelectionEnum.PRODUCT:
      setSelector(ItemSelectionEnum.CATEGORY);
      break;
    case ItemSelectionEnum.UNIT:
      setSelector(ItemSelectionEnum.PRODUCT);
      break;
    }
  }

  return (
    <Section className="flex flex-col">
      <div className="flex items-center space-x-4 pb-4 min-h-8">
        <TypographyH2 className="pb-0">Items</TypographyH2>
        <Separator orientation="vertical" />
        <div className="flex justify-between items-center w-full">
          <Breadcrumb>  
            <BreadcrumbList>
              <BreadcrumbItem>
              Categories
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
              Engine Oil
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Button 
            className="text-accent" variant='ghost'
            onClick={handleBackBtn}
          >
            <span><ChevronLeft /></span>
            Back
          </Button>
        </div>
      </div>
      <Separator />
      <div className="flex-grow">
        {children}
      </div>
    </Section>
  );
}