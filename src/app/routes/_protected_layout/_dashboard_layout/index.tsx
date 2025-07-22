import { Separator } from '@/components/ui/separator';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { TypographyH2 } from '@/components/ui/typography/h2';
import { MonthlyCustomersCard, MonthlySalesCard, MonthlyVehiclesCard, TotalMonthlCustomersCard, TotalMonthlVehiclesCard, TotalMonthlySalesCard, TotalWeeklyCustomersCard, TotalWeeklySalesCard, TotalWeeklyVehiclesCard, WeeklyCustomerCard, WeeklySalesCard, WeeklyVehiclesCard } from '@/features/analytic/components/analytic-card';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/')({
  component: () => <Homepage />
});

export function Homepage() {
  return (
    <div>
      <TypographyH1>Dashboard</TypographyH1>
      <Separator className="mt-4" orientation="horizontal" />
      <TypographyH2 className='mt-6 text-3xl'>Sales Analytics</TypographyH2>
      {/* Responsive Grid Layout */}
      <div className="space-y-6 mt-4">
        {/* Top Row - Total Cards */}
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <TotalWeeklySalesCard />
          <TotalMonthlySalesCard />
        </div>
        
        {/* Bottom Row - Chart Cards - Same Height */}
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1 h-[280px]">
            <WeeklySalesCard />
          </div>
          <div className="lg:col-span-2 h-[280px]">
            <MonthlySalesCard />
          </div>
        </div>
      </div>
      <TypographyH2 className='mt-6 text-3xl'>Customer Analytics</TypographyH2>
      <div className='space-y-6 mt-4'>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <TotalWeeklyCustomersCard />
          <TotalMonthlCustomersCard />
        </div>
      
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1 h-[280px]">
            <WeeklyCustomerCard />
          </div>
          <div className="lg:col-span-2 h-[280px]">
            <MonthlyCustomersCard />
          </div>
        </div>
      </div>
      <TypographyH2 className='mt-6 text-3xl'>Vehicle Analytics</TypographyH2>
      <div className='space-y-6 mt-4'>
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
          <TotalWeeklyVehiclesCard />
          <TotalMonthlVehiclesCard />
        </div>
      
        <div className="gap-4 grid grid-cols-1 lg:grid-cols-3">
          <div className="lg:col-span-1 h-[280px]">
            <WeeklyVehiclesCard />
          </div>
          <div className="lg:col-span-2 h-[280px]">
            <MonthlyVehiclesCard />
          </div>
        </div>
      </div>
    </div>
  );
}