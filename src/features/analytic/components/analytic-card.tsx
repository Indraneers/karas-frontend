// analytic-card.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { useQuery } from "@tanstack/react-query";
import { getTotalSaleInAMonth, getTotalSaleInAWeek } from "../api/analytic";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/charts";
import { BarChart, CartesianGrid, XAxis, Bar, YAxis } from "recharts";
import { convertRawCurrencyToDisplayCurrency } from "@/features/currency/utils/currency";

// Skeleton Components
function ChartSkeleton() {
  return (
    <div className="w-full h-[200px]">
      <div className="flex justify-between items-end space-x-2 px-4 h-full">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="bg-muted rounded-t animate-pulse"
            style={{
              height: `${ Math.random() * 60 + 40 }%`,
              width: `${ 100 / 7 - 2 }%`
            }}
          />
        ))}
      </div>
      <div className="flex justify-between mt-2 px-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="bg-muted rounded w-8 h-3 animate-pulse" />
        ))}
      </div>
    </div>
  );
}

function TotalSkeleton() {
  return (
    <div className="space-y-2">
      <div className="bg-muted rounded w-32 h-8 animate-pulse" />
      <div className="bg-muted rounded w-24 h-4 animate-pulse" />
    </div>
  );
}

export function WeeklySalesCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['weekly-sales'],
    queryFn: () => getTotalSaleInAWeek()
  });

  const chartConfig = {
    value: {
      label: "Revenue from Sale ($)",
      color: "var(--chart-1)"
    }
  } satisfies ChartConfig;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <TypographyH3 className="">Weekly Sale</TypographyH3>
          <p className="text-muted-foreground text-sm">Showing revenue for the past 7 days</p>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <ChartSkeleton />}
        {data && (
          <ChartContainer className="w-full h-[175px]" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data.map(d => ({ ...d, value: Number(d.value) / 100 }))}
              margin={{
                left: 12,
                right: 12
              }}
              maxBarSize={60}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={30}
                tickFormatter={(value) => `$${ value.toLocaleString() }`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      });
                    }}
                    formatter={(value, name) => [
                      `Daily Revenue: $${ Number(value).toLocaleString() }`
                    ]}
                  />
                }
              />
              <Bar dataKey={"value"} fill={`var(--color-value)`} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

export function TotalWeeklySalesCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['weekly-sales'],
    queryFn: () => getTotalSaleInAWeek()
  });

  const total = data ? data.reduce((prev, next) => {
    return prev + Number(next.value);
  }, 0) : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <TypographyH3 className="">Total Weekly Sale</TypographyH3>
          <p className="text-muted-foreground text-sm">Showing total revenue for the past 7 days</p>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <TotalSkeleton />}
        {data && (
          <div className="font-bold text-emerald-500 text-3xl lg:text-4xl">
            ${convertRawCurrencyToDisplayCurrency(total)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function MonthlySalesCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['monthly-sales'],
    queryFn: () => getTotalSaleInAMonth()
  });

  const chartConfig = {
    value: {
      label: "Revenue from Sale ($)",
      color: "var(--chart-1)"
    }
  } satisfies ChartConfig;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <TypographyH3 className="">Monthly Sale</TypographyH3>
          <p className="text-muted-foreground text-sm">Showing revenue for the past 30 days</p>
        </div>
      </CardHeader>
      <CardContent className="">
        {isLoading && <ChartSkeleton />}
        {data && (
          <ChartContainer className="w-full h-[175px]" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data.map(d => ({ ...d, value: Number(d.value) / 100 }))}
              margin={{
                left: 12,
                right: 12
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric"
                  });
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                width={30}
                tickFormatter={(value) => `$${ value.toLocaleString() }`}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      });
                    }}
                    formatter={(value, name) => [
                      `Daily Revenue: $${ Number(value).toLocaleString() }`
                    ]}
                  />
                }
              />
              <Bar dataKey={"value"} fill={`var(--color-value)`} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}

export function TotalMonthlySalesCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['monthly-sales'],
    queryFn: () => getTotalSaleInAMonth() // Fixed: was getTotalSaleInAWeek()
  });

  const total = data ? data.reduce((prev, next) => {
    return prev + Number(next.value);
  }, 0) : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <TypographyH3 className="">Total Monthly Sale</TypographyH3>
          <p className="text-muted-foreground text-sm">Showing total revenue for the past 30 days</p>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <TotalSkeleton />}
        {data && (
          <div className="font-bold text-emerald-500 text-3xl lg:text-4xl">
            ${convertRawCurrencyToDisplayCurrency(total)}
          </div>
        )}
      </CardContent>
    </Card>
  );
}