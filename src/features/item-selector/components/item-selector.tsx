import { Section } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography/h2";
import { ChevronLeft, PackageSearch } from "lucide-react";
import { useItemSelectionStore } from "../store/item-selection";
import { ItemSelectionEnum } from "../types/item-selection-enum";
import { ItemSelectorHeader } from "./item-selector-header";
import { ItemSelectorBreadCrumb } from "./item-selector-breadcrumb";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/section-header";
import { SectionContent } from "@/components/section-content";

interface ItemSelectionProps {
  children?: React.ReactNode;
}

export function ItemSelector({ children }: ItemSelectionProps) {
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
    <Section className="flex flex-col h-full">
      <SectionHeader>
        <ItemSelectorHeader>
          <div className="flex justify-between gap-2">
            <PackageSearch />
            <TypographyH2>Items</TypographyH2>
          </div>
          <Separator className="h-4" orientation="vertical" />
          <div className="flex justify-between items-center w-full">
            <ItemSelectorBreadCrumb />
            <Button 
              className={cn([
                'text-accent display h-8',
                selector === ItemSelectionEnum.CATEGORY && 'hidden'
              ])} 
              variant='ghost'
              onClick={handleBackBtn}
            >
              <span><ChevronLeft /></span>
            Back
            </Button>
          </div>
        </ItemSelectorHeader>
      </SectionHeader>
      <SectionContent className="flex-grow">
        {children}
      </SectionContent>
    </Section>
  );
}