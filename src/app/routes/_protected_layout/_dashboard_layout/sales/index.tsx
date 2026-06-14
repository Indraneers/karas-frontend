// import { DatePickerWithRange } from '@/components/date-picker-range';
import { Section } from "@/components/section";
import { SectionContent } from "@/components/section-content";
import { SectionHeader } from "@/components/section-header";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH1 } from "@/components/ui/typography/h1";
import { SalesTable } from "@/features/sale/components/sales-table";
import { PaymentType, StatusEnum } from "@/features/sale/types/sale";
import { SaleFilter } from "@/features/sale/types/sale-filter";
import { createFileRoute } from "@tanstack/react-router";
import { SalesPopupFilter } from "@/features/sale/components/sale-filter";
import { SalesSearchBar } from "@/features/sale/components/sales-search-bar";

export const Route = createFileRoute(
  "/_protected_layout/_dashboard_layout/sales/",
)({
  component: () => <SalesPage />,
  validateSearch: (search: Record<string, unknown>): SaleFilter => {
    const parsedCreatedAtFrom = Date.parse(search.createdAtFrom as string);
    const parsedCreatedAtTo = Date.parse(search.createdAtTo as string);
    return {
      createdAtFrom: isNaN(parsedCreatedAtFrom)
        ? undefined
        : new Date(parsedCreatedAtFrom),
      createdAtTo: isNaN(parsedCreatedAtTo)
        ? undefined
        : new Date(parsedCreatedAtTo),
      customerId: (search.customerId as string) || undefined,
      vehicleId: (search.vehicleId as string) || undefined,
      userId: (search.userId as string) || undefined,
      paymentType: (search.paymentType as PaymentType) || undefined,
      status: (search.status as StatusEnum) || undefined,
      page: (search.page as number) || 0,
    };
  },
});

function SalesPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  return (
    <Section className="flex flex-col h-full">
      <SectionHeader>
        <TypographyH1>Sales and Orders</TypographyH1>
      </SectionHeader>
      <SectionContent>
        <div className="flex items-center gap-2">
          <SalesSearchBar
            className="flex-1"
            customerId={search.customerId}
            vehicleId={search.vehicleId}
            onSelectCustomer={(id) =>
              navigate({ search: { ...search, customerId: id, vehicleId: undefined, page: 0 } })
            }
            onSelectVehicle={(id) =>
              navigate({ search: { ...search, vehicleId: id, customerId: undefined, page: 0 } })
            }
            onClear={() =>
              navigate({ search: { ...search, customerId: undefined, vehicleId: undefined, page: 0 } })
            }
          />
          <SalesPopupFilter />
        </div>
        <Card className="mt-4">
          <CardContent className="mt-4">
            <SalesTable className="mt-4" queryKey={["sales"]} />
          </CardContent>
        </Card>
      </SectionContent>
    </Section>
  );
}
