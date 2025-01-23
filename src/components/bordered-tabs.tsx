import { cn } from "@/lib/utils";
import { TabsList, TabsTrigger } from "./ui/tabs";
import * as TabsPrimitive from "@radix-ui/react-tabs";

export function BorderedTabsList({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <TabsList className={cn([
      "bg-transparent p-0 border-b rounded-none text-foreground justify-start",
      className
    ])}>
      {children}
    </TabsList>
  );
}

export function BorderedTabsTrigger({ children, ...props }: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsTrigger 
      className={cn([
        'bg-transparent shadow-none rounded-none',
        'data-[state=active]:bg-transparent data-[state=active]:shadow-none',
        'data-[state=active]:text-accent data-[state=active]:border-b-2 data-[state=active]:border-accent',
        'text-foreground m-0 h-full'
      ])}
      {...props}
    >
      {children}
    </TabsTrigger>
  );
}