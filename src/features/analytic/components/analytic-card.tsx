import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  getAverageOrderValue,
  getPaymentTypeBreakdown,
  getRevenueByStaff,
  getTopCustomers,
  getTopProducts,
  getTotalCustomerInAMonth,
  getTotalCustomerInAWeek,
  getTotalSaleInAMonth,
  getTotalSaleInAWeek,
  getTotalVehicleInAMonth,
  getTotalVehicleInAWeek
} from "../api/analytic";
import { RevenueBreakdownDTO, TopProductDTO } from "../type/analytic";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/charts";
import { BarChart, CartesianGrid, XAxis, Bar, YAxis } from "recharts";
import { convertRawCurrencyToDisplayCurrency } from "@/features/currency/utils/currency";
import { Skeleton } from "@/components/ui/skeleton";

type Point = { date: string; value: string | number };
type AnalyticQuery = UseQueryResult<Point[]>;

function sumValues(data: Point[] | undefined): number {
  if (!data) return 0;
  return data.reduce((acc, p) => acc + Number(p.value), 0);
}

function formatCurrency(rawCents: number): string {
  return `$${convertRawCurrencyToDisplayCurrency(rawCents)}`;
}

function formatDate(value: unknown): string {
  if (value === undefined || value === null) return "";
  return new Date(value as string | number).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric"
  });
}

function formatDateLong(value: unknown): string {
  if (value === undefined || value === null) return "";
  return new Date(value as string | number).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

/* ------------------------------------------------------------------ */
/* Primitives                                                          */
/* ------------------------------------------------------------------ */

interface StatCardProps {
  label: string;
  description: string;
  isLoading: boolean;
  value: string;
}

function StatCard({ label, description, isLoading, value }: StatCardProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          {label}
        </p>
        <p className="text-xs text-muted-foreground/80">{description}</p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-9 w-32" />
        ) : (
          <span className="block font-display text-3xl font-medium tabular-nums tracking-tight text-foreground lg:text-4xl">
            {value}
          </span>
        )}
      </CardContent>
    </Card>
  );
}

interface ChartCardProps {
  label: string;
  description: string;
  isLoading: boolean;
  data: Point[] | undefined;
  unit: "currency" | "count";
}

function ChartCard({ label, description, isLoading, data, unit }: ChartCardProps) {
  const chartConfig = {
    value: {
      label: unit === "currency" ? "Revenue ($)" : "Count",
      color: "var(--chart-1)"
    }
  } satisfies ChartConfig;

  const seriesData = data?.map((p) => ({
    ...p,
    value: unit === "currency" ? Number(p.value) / 100 : Number(p.value)
  }));

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          {label}
        </p>
        <p className="text-xs text-muted-foreground/80">{description}</p>
      </CardHeader>
      <CardContent>
        {isLoading || !seriesData ? (
          <Skeleton className="h-[175px] w-full" />
        ) : (
          <ChartContainer className="w-full h-[175px]" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={seriesData}
              margin={{ left: 12, right: 12 }}
              maxBarSize={48}
            >
              <CartesianGrid vertical={false} strokeOpacity={0.4} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={formatDate}
                className="text-xs"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={40}
                tickFormatter={(v) =>
                  unit === "currency" ? `$${Number(v).toLocaleString()}` : String(v)
                }
                className="text-xs"
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[160px]"
                    nameKey="views"
                    labelFormatter={formatDateLong}
                    formatter={(v) => [
                      unit === "currency"
                        ? `Daily Revenue: $${Number(v).toLocaleString()}`
                        : `Daily Count: ${v}`
                    ]}
                  />
                }
              />
              <Bar
                dataKey="value"
                fill="var(--color-value)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/* Hooks                                                               */
/* ------------------------------------------------------------------ */

const useWeeklySales = () =>
  useQuery({ queryKey: ["weekly-sales"], queryFn: getTotalSaleInAWeek }) as AnalyticQuery;
const useMonthlySales = () =>
  useQuery({ queryKey: ["monthly-sales"], queryFn: getTotalSaleInAMonth }) as AnalyticQuery;
const useWeeklyCustomers = () =>
  useQuery({ queryKey: ["weekly-customers"], queryFn: getTotalCustomerInAWeek }) as AnalyticQuery;
const useMonthlyCustomers = () =>
  useQuery({ queryKey: ["monthly-customers"], queryFn: getTotalCustomerInAMonth }) as AnalyticQuery;
const useWeeklyVehicles = () =>
  useQuery({ queryKey: ["weekly-vehicles"], queryFn: getTotalVehicleInAWeek }) as AnalyticQuery;
const useMonthlyVehicles = () =>
  useQuery({ queryKey: ["monthly-vehicles"], queryFn: getTotalVehicleInAMonth }) as AnalyticQuery;

/* ------------------------------------------------------------------ */
/* Stat cards                                                          */
/* ------------------------------------------------------------------ */

export function TotalWeeklySalesCard() {
  const { data, isLoading } = useWeeklySales();
  return (
    <StatCard
      label="Total Weekly Sale"
      description="Past 7 days"
      isLoading={isLoading}
      value={formatCurrency(sumValues(data))}
    />
  );
}

export function TotalMonthlySalesCard() {
  const { data, isLoading } = useMonthlySales();
  return (
    <StatCard
      label="Total Monthly Sale"
      description="Past 30 days"
      isLoading={isLoading}
      value={formatCurrency(sumValues(data))}
    />
  );
}

export function TotalWeeklyCustomersCard() {
  const { data, isLoading } = useWeeklyCustomers();
  return (
    <StatCard
      label="New Customers — Week"
      description="Past 7 days"
      isLoading={isLoading}
      value={String(sumValues(data))}
    />
  );
}

export function TotalMonthlCustomersCard() {
  const { data, isLoading } = useMonthlyCustomers();
  return (
    <StatCard
      label="New Customers — Month"
      description="Past 30 days"
      isLoading={isLoading}
      value={String(sumValues(data))}
    />
  );
}

export function TotalWeeklyVehiclesCard() {
  const { data, isLoading } = useWeeklyVehicles();
  return (
    <StatCard
      label="New Vehicles — Week"
      description="Past 7 days"
      isLoading={isLoading}
      value={String(sumValues(data))}
    />
  );
}

export function TotalMonthlVehiclesCard() {
  const { data, isLoading } = useMonthlyVehicles();
  return (
    <StatCard
      label="New Vehicles — Month"
      description="Past 30 days"
      isLoading={isLoading}
      value={String(sumValues(data))}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Chart cards                                                         */
/* ------------------------------------------------------------------ */

export function WeeklySalesCard() {
  const { data, isLoading } = useWeeklySales();
  return (
    <ChartCard
      label="Weekly Sale"
      description="Revenue for the past 7 days"
      isLoading={isLoading}
      data={data}
      unit="currency"
    />
  );
}

export function MonthlySalesCard() {
  const { data, isLoading } = useMonthlySales();
  return (
    <ChartCard
      label="Monthly Sale"
      description="Revenue for the past 30 days"
      isLoading={isLoading}
      data={data}
      unit="currency"
    />
  );
}

export function WeeklyCustomerCard() {
  const { data, isLoading } = useWeeklyCustomers();
  return (
    <ChartCard
      label="Weekly New Customers"
      description="New customers for the past 7 days"
      isLoading={isLoading}
      data={data}
      unit="count"
    />
  );
}

export function MonthlyCustomersCard() {
  const { data, isLoading } = useMonthlyCustomers();
  return (
    <ChartCard
      label="Monthly New Customers"
      description="New customers for the past 30 days"
      isLoading={isLoading}
      data={data}
      unit="count"
    />
  );
}

export function WeeklyVehiclesCard() {
  const { data, isLoading } = useWeeklyVehicles();
  return (
    <ChartCard
      label="Weekly New Vehicles"
      description="New vehicles for the past 7 days"
      isLoading={isLoading}
      data={data}
      unit="count"
    />
  );
}

export function MonthlyVehiclesCard() {
  const { data, isLoading } = useMonthlyVehicles();
  return (
    <ChartCard
      label="Monthly New Vehicles"
      description="New vehicles for the past 30 days"
      isLoading={isLoading}
      data={data}
      unit="count"
    />
  );
}

/* ------------------------------------------------------------------ */
/* New analytics                                                       */
/* ------------------------------------------------------------------ */

export function TopProductsCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["top-products"],
    queryFn: () => getTopProducts(30, 5)
  });

  const items: TopProductDTO[] = data ?? [];
  const max = items.reduce((m, p) => Math.max(m, p.revenue), 0);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Top Products
        </p>
        <p className="text-xs text-muted-foreground/80">
          Revenue leaders for the past 30 days
        </p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-full" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No sales recorded yet.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((p) => {
              const pct = max > 0 ? (p.revenue / max) * 100 : 0;
              return (
                <li key={p.productId} className="text-sm">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className="truncate font-medium text-foreground">
                      {p.productName}
                    </span>
                    <span className="font-display tabular-nums text-foreground/80">
                      ${(p.revenue / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-foreground/70 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export function AverageOrderValueCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["aov-30"],
    queryFn: () => getAverageOrderValue(30)
  });

  const values = data?.map((p) => Number(p.value)) ?? [];
  const overall =
    values.length === 0
      ? 0
      : values.reduce((sum, v) => sum + v, 0) / values.length;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          Average Order Value
        </p>
        <p className="text-xs text-muted-foreground/80">
          Avg. dollar amount per order — past 30 days
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLoading ? (
          <Skeleton className="h-9 w-32" />
        ) : (
          <span className="block font-display text-3xl font-medium tabular-nums tracking-tight text-foreground lg:text-4xl">
            ${(overall / 100).toFixed(2)}
          </span>
        )}
        <ChartCardLine isLoading={isLoading} data={data ?? []} />
      </CardContent>
    </Card>
  );
}

function ChartCardLine({
  isLoading,
  data
}: {
  isLoading: boolean;
  data: Point[];
}) {
  const chartConfig = {
    value: { label: "AOV ($)", color: "var(--chart-1)" }
  } satisfies ChartConfig;
  const seriesData = data.map((p) => ({
    ...p,
    value: Number(p.value) / 100
  }));
  if (isLoading) return <Skeleton className="h-[120px] w-full" />;
  return (
    <ChartContainer className="w-full h-[120px]" config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={seriesData}
        margin={{ left: 4, right: 4 }}
        maxBarSize={20}
      >
        <CartesianGrid vertical={false} strokeOpacity={0.4} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={6}
          minTickGap={32}
          tickFormatter={formatDate}
          className="text-xs"
        />
        <YAxis hide />
        <ChartTooltip
          content={
            <ChartTooltipContent
              className="w-[160px]"
              nameKey="views"
              labelFormatter={formatDateLong}
              formatter={(v) => [`AOV: $${Number(v).toFixed(2)}`]}
            />
          }
        />
        <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartContainer>
  );
}

/* ------------------------------------------------------------------ */
/* Revenue breakdown cards (Top Customers, Payment Mix, Staff)         */
/* ------------------------------------------------------------------ */

interface RevenueBreakdownCardProps {
  label: string;
  description: string;
  isLoading: boolean;
  items: RevenueBreakdownDTO[];
  showOrderCount?: boolean;
  formatValue?: (revenue: number) => string;
}

function RevenueBreakdownCard({
  label,
  description,
  isLoading,
  items,
  showOrderCount,
  formatValue
}: RevenueBreakdownCardProps) {
  const max = items.reduce((m, i) => Math.max(m, i.revenue), 0);
  const display = formatValue ?? ((v: number) => `$${(v / 100).toFixed(2)}`);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">
          {label}
        </p>
        <p className="text-xs text-muted-foreground/80">{description}</p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-7 w-full" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No data yet.</p>
        ) : (
          <ul className="space-y-2">
            {items.map((item) => {
              const pct = max > 0 ? (item.revenue / max) * 100 : 0;
              return (
                <li key={item.id} className="text-sm">
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className="truncate font-medium text-foreground">
                      {item.label}
                      {showOrderCount && (
                        <span className="ml-1.5 text-muted-foreground/80 text-xs font-normal">
                          · {item.orderCount} {item.orderCount === 1 ? "order" : "orders"}
                        </span>
                      )}
                    </span>
                    <span className="font-display tabular-nums text-foreground/80">
                      {display(item.revenue)}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full bg-foreground/70 rounded-full transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export function TopCustomersCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["top-customers"],
    queryFn: () => getTopCustomers(30, 5)
  });
  return (
    <RevenueBreakdownCard
      label="Top Customers"
      description="Highest spenders for the past 30 days"
      isLoading={isLoading}
      items={data ?? []}
      showOrderCount
    />
  );
}

export function PaymentMixCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["payment-mix"],
    queryFn: () => getPaymentTypeBreakdown(30)
  });
  return (
    <RevenueBreakdownCard
      label="Payment Mix"
      description="Revenue by payment type — past 30 days"
      isLoading={isLoading}
      items={data ?? []}
      showOrderCount
    />
  );
}

export function StaffPerformanceCard() {
  const { data, isLoading } = useQuery({
    queryKey: ["staff-performance"],
    queryFn: () => getRevenueByStaff(30, 5)
  });
  return (
    <RevenueBreakdownCard
      label="Staff Performance"
      description="Revenue closed by staff — past 30 days"
      isLoading={isLoading}
      items={data ?? []}
      showOrderCount
    />
  );
}

