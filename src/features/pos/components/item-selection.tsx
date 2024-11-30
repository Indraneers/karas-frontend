import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { ChevronLeft } from "lucide-react";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { ItemSelectionHeader } from "./item-selection-header";
import { ItemSelectorBreadCrumb } from "./item-selector-breadcrumb";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/section-header";
import { SectionContent } from "@/components/section-content";

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
      <SectionHeader>
        <ItemSelectionHeader>
          <TypographyH2>Items</TypographyH2>
          <Separator className="h-4" orientation="vertical" />
          <div className="flex justify-between items-center w-full">
            <ItemSelectorBreadCrumb />
            <Button 
              className={cn([
                'text-accent display',
                selector === ItemSelectionEnum.CATEGORY && 'hidden'
              ])} 
              variant='ghost'
              onClick={handleBackBtn}
            >
              <span><ChevronLeft /></span>
            Back
            </Button>
          </div>
        </ItemSelectionHeader>
      </SectionHeader>
      <SectionContent className="flex-grow">
        {children}
      </SectionContent>
    </Section>
  );
}