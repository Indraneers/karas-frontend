// analytic-card.tsx
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typography/h3";
import { useQuery } from "@tanstack/react-query";
import { getTotalCustomerInAMonth, getTotalCustomerInAWeek, getTotalSaleInAMonth, getTotalSaleInAWeek, getTotalVehicleInAMonth, getTotalVehicleInAWeek } from "../api/analytic";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/charts";
import { BarChart, CartesianGrid, XAxis, Bar, YAxis } from "recharts";
import { convertRawCurrencyToDisplayCurrency } from "@/features/currency/utils/currency";

// Skeleton Components
function ChartSkeleton() {
  return (
    <div className="w-full h-[175px]">
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
                width={40}
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
                    formatter={(value) => [
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
                width={40}
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
                    formatter={(value) => [
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

export function WeeklyCustomerCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['weekly-customers'],
    queryFn: () => getTotalCustomerInAWeek()
  });

  const chartConfig = {
    value: {
      label: "Customers Gained",
      color: "var(--chart-1)"
    }
  } satisfies ChartConfig;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <TypographyH3 className="">Weekly New Customers</TypographyH3>
          <p className="text-muted-foreground text-sm">Showing new customers for the past 7 days</p>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <ChartSkeleton />}
        {data && (
          <ChartContainer className="w-full h-[175px]" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data.map(d => ({ ...d, value: Number(d.value) }))}
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
                width={40}
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
                    formatter={(value) => [
                      `Daily New Customers: ${ value }`
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

export function TotalWeeklyCustomersCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['weekly-customers'],
    queryFn: () => getTotalCustomerInAWeek()
  });

  const total = data ? data.reduce((prev, next) => {
    return prev + Number(next.value);
  }, 0) : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <TypographyH3 className="">Total Weekly New Customer</TypographyH3>
          <p className="text-muted-foreground text-sm">Showing new customers for the past 7 days</p>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <TotalSkeleton />}
        {data && (
          <div className="font-bold text-emerald-500 text-3xl lg:text-4xl">
            {total} Customers
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function MonthlyCustomersCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['monthly-customers'],
    queryFn: () => getTotalCustomerInAMonth()
  });

  const chartConfig = {
    value: {
      label: "Customers Gained",
      color: "var(--chart-1)"
    }
  } satisfies ChartConfig;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <TypographyH3 className="">Monthly New Customers</TypographyH3>
          <p className="text-muted-foreground text-sm">Showing total new customers for the past 30 days</p>
        </div>
      </CardHeader>
      <CardContent className="">
        {isLoading && <ChartSkeleton />}
        {data && (
          <ChartContainer className="w-full h-[175px]" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data.map(d => ({ ...d, value: Number(d.value) }))}
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
                width={40}
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
                    formatter={(value) => [
                      `Daily New Customers: ${ value }`
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

export function TotalMonthlCustomersCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['monthly-customers'],
    queryFn: () => getTotalCustomerInAMonth()
  });

  const total = data ? data.reduce((prev, next) => {
    return prev + Number(next.value);
  }, 0) : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <TypographyH3 className="">Total Monthly New Customer</TypographyH3>
          <p className="text-muted-foreground text-sm">Showing total new customers for the past 30 days</p>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <TotalSkeleton />}
        {data && (
          <div className="font-bold text-emerald-500 text-3xl lg:text-4xl">
            {total} Customers
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function WeeklyVehiclesCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['weekly-vehicles'],
    queryFn: () => getTotalVehicleInAWeek()
  });

  const chartConfig = {
    value: {
      label: "Vehicles Gained",
      color: "var(--chart-1)"
    }
  } satisfies ChartConfig;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <TypographyH3 className="">Weekly New Vehicles</TypographyH3>
          <p className="text-muted-foreground text-sm">Showing new vehicles for the past 7 days</p>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <ChartSkeleton />}
        {data && (
          <ChartContainer className="w-full h-[175px]" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data.map(d => ({ ...d, value: Number(d.value) }))}
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
                width={40}
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
                    formatter={(value) => [
                      `Daily New Vehicles: ${ value }`
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

export function TotalWeeklyVehiclesCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['weekly-vehicles'],
    queryFn: () => getTotalVehicleInAWeek()
  });

  const total = data ? data.reduce((prev, next) => {
    return prev + Number(next.value);
  }, 0) : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <TypographyH3 className="">Total Weekly New Vehicles</TypographyH3>
          <p className="text-muted-foreground text-sm">Showing new vehicles for the past 7 days</p>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <TotalSkeleton />}
        {data && (
          <div className="font-bold text-emerald-500 text-3xl lg:text-4xl">
            {total} Vehicles
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function MonthlyVehiclesCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['monthly-vehicles'],
    queryFn: () => getTotalVehicleInAMonth()
  });

  const chartConfig = {
    value: {
      label: "Vehicles Gained",
      color: "var(--chart-1)"
    }
  } satisfies ChartConfig;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <TypographyH3 className="">Monthly New Vehicles</TypographyH3>
          <p className="text-muted-foreground text-sm">Showing total new vehicles for the past 30 days</p>
        </div>
      </CardHeader>
      <CardContent className="">
        {isLoading && <ChartSkeleton />}
        {data && (
          <ChartContainer className="w-full h-[175px]" config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={data.map(d => ({ ...d, value: Number(d.value) }))}
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
                width={40}
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
                    formatter={(value) => [
                      `Daily New Vehicles: ${ value }`
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

export function TotalMonthlVehiclesCard() {
  const { data, isLoading } = useQuery({
    queryKey: ['monthly-Vehicles'],
    queryFn: () => getTotalVehicleInAMonth()
  });

  const total = data ? data.reduce((prev, next) => {
    return prev + Number(next.value);
  }, 0) : 0;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <TypographyH3 className="">Total Monthly New Vehicles</TypographyH3>
          <p className="text-muted-foreground text-sm">Showing total new vehicles for the past 30 days</p>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading && <TotalSkeleton />}
        {data && (
          <div className="font-bold text-emerald-500 text-3xl lg:text-4xl">
            {total} Vehicles
          </div>
        )}
      </CardContent>
    </Card>
  );
}