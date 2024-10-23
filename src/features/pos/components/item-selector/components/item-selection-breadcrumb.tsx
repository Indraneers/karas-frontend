import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface ItemSelectionBreadcrumbProps {
  heirarchy: string[];
  className?: string;
  breadcrumbClass?: string;
}

export function ItemSelectionBreadcrumb({ breadcrumbClass='', className = '', heirarchy = [] }: ItemSelectionBreadcrumbProps) {
  return (
    <div className={'p-3 bg-primary/70 rounded-t-sm ' + className}>
      <Breadcrumb>
        <BreadcrumbList>
          {
            heirarchy.map((h) => (
              <>
                <BreadcrumbItem className={"font-medium text-background text-base " + breadcrumbClass} key={h}>
                  {h}
                </BreadcrumbItem>
                <BreadcrumbSeparator className={"text-background " + breadcrumbClass }  />
              </>
            ))
          }
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}