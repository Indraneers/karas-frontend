import { Section } from "@/components/section";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { TypographyH2 } from "@/components/ui/typography/h2";

interface ItemSelectionProps {
  children?: React.ReactNode;
}

export function ItemSelection({ children }: ItemSelectionProps) {
  return (
    <Section className="flex flex-col">
      <div className="flex items-center space-x-4 pb-4 min-h-8">
        <TypographyH2 className="pb-0">Items</TypographyH2>
        <Separator orientation="vertical" />
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
      </div>
      <Separator />
      <div className="flex-grow">
        {children}
      </div>
    </Section>
  );
}