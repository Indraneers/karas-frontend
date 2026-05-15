import { Section } from "@/components/section";
import { SectionContent } from "@/components/section-content";
import { SectionHeader } from "@/components/section-header";
import { TypographyH1 } from "@/components/ui/typography/h1";
import {
  AverageOrderValueCard,
  MonthlyCustomersCard,
  MonthlySalesCard,
  MonthlyVehiclesCard,
  PaymentMixCard,
  StaffPerformanceCard,
  TopCustomersCard,
  TopProductsCard,
  TotalMonthlCustomersCard,
  TotalMonthlVehiclesCard,
  TotalMonthlySalesCard,
  TotalWeeklyCustomersCard,
  TotalWeeklySalesCard,
  TotalWeeklyVehiclesCard,
  WeeklyCustomerCard,
  WeeklySalesCard,
  WeeklyVehiclesCard
} from "@/features/analytic/components/analytic-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected_layout/_dashboard_layout/")({
  component: () => <Homepage />
});

interface BlockProps {
  label: string;
  children: React.ReactNode;
}

function Block({ label, children }: BlockProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </h2>
      {children}
    </section>
  );
}

export function Homepage() {
  return (
    <Section className="pb-12">
      <SectionHeader>
        <TypographyH1>Dashboard</TypographyH1>
        <p className="mt-1 text-sm text-muted-foreground">
          A snapshot of revenue, customers, and vehicles across the past month.
        </p>
      </SectionHeader>
      <SectionContent className="space-y-10">
        <Block label="At a glance">
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <TotalWeeklySalesCard />
            <TotalWeeklyCustomersCard />
            <TotalWeeklyVehiclesCard />
            <TotalMonthlySalesCard />
            <TotalMonthlCustomersCard />
            <TotalMonthlVehiclesCard />
          </div>
        </Block>

        <Block label="Sales">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <WeeklySalesCard />
            </div>
            <div className="lg:col-span-2">
              <MonthlySalesCard />
            </div>
          </div>
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <TopProductsCard />
            <AverageOrderValueCard />
          </div>
        </Block>

        <Block label="Customers">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <WeeklyCustomerCard />
            </div>
            <div className="lg:col-span-2">
              <MonthlyCustomersCard />
            </div>
          </div>
          <TopCustomersCard />
        </Block>

        <Block label="Vehicles">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <WeeklyVehiclesCard />
            </div>
            <div className="lg:col-span-2">
              <MonthlyVehiclesCard />
            </div>
          </div>
        </Block>

        <Block label="Operations">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
            <PaymentMixCard />
            <StaffPerformanceCard />
          </div>
        </Block>
      </SectionContent>
    </Section>
  );
}
