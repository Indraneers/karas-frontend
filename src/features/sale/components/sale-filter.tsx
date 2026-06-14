import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Banknote,
  Building2,
  Check,
  Clock4,
  Filter,
  LucideIcon,
  Trash,
} from "lucide-react";
import { DatePickerInput } from "@/components/ui/datepicker-input";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaymentType, StatusEnum } from "../types/sale";
import { isEqual } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { getUserById, getUsers } from "@/features/user/api/user";
import { UserDto } from "@/features/user/types/user.dto";
import { Route } from "@/app/routes/_protected_layout/_dashboard_layout/sales";
import { SaleFilter } from "../types/sale-filter";
import { useNavigate } from "@tanstack/react-router";

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground mb-1.5">
      {children}
    </p>
  );
}

interface SegmentOption<T extends string> {
  label: string;
  icon?: LucideIcon;
  value: T;
}

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: readonly SegmentOption<T>[];
  value: T | undefined;
  onChange: (next: T | undefined) => void;
}) {
  return (
    <div className="inline-flex p-0.5 w-full bg-muted/40 rounded-md border border-border/60 gap-0.5">
      {options.map((opt) => {
        const Icon = opt.icon;
        const selected = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(selected ? undefined : opt.value)}
            className={cn(
              "flex-1 inline-flex items-center justify-center gap-1.5 h-7 px-3 text-xs rounded-md transition-colors",
              selected
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:bg-card/60 hover:text-foreground"
            )}
          >
            {Icon && (
              <Icon
                strokeWidth={1.8}
                className={cn(
                  "size-3.5",
                  selected ? "text-background" : "text-muted-foreground"
                )}
              />
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function SalesPopupFilter() {
  const searchFilter: SaleFilter = Route.useSearch();
  const navigate = useNavigate({
    from: "/sales",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<UserDto>();
  const [paymentType, setPaymentType] = useState<PaymentType>(
    searchFilter.paymentType
      ? (searchFilter.paymentType.toUpperCase() as PaymentType)
      : PaymentType.NONE,
  );
  const [status, setStatus] = useState<StatusEnum>(
    searchFilter.status
      ? (searchFilter.status.toUpperCase() as StatusEnum)
      : StatusEnum.NONE,
  );
  const [createdAtFrom, setCreatedAtFrom] = useState<Date | undefined>(
    searchFilter.createdAtFrom,
  );
  const [createdAtTo, setCreatedAtTo] = useState<Date | undefined>(
    searchFilter.createdAtTo,
  );

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  });

  const userQuery = useQuery({
    queryKey: ["user", searchFilter.userId],
    queryFn: () => getUserById(searchFilter.userId || ""),
    enabled: !!searchFilter.userId,
  });

  const handleClearFilters = () => {
    setStatus(StatusEnum.NONE);
    setPaymentType(PaymentType.NONE);
    setCreatedAtFrom(undefined);
    setCreatedAtTo(undefined);
    navigate({ search: {} });
  };

  const paymentTypeOptions = [
    { id: "bank", label: "Bank", icon: Building2, value: PaymentType.BANK },
    { id: "cash", label: "Cash", icon: Banknote, value: PaymentType.CASH },
  ];

  const statusOptions = [
    { id: "paid", label: "Paid", icon: Check, value: StatusEnum.PAID },
    { id: "hold", label: "Hold", icon: Clock4, value: StatusEnum.HOLD },
  ];

  useEffect(() => {
    if (searchFilter.userId && userQuery.data) {
      setUser(userQuery.data);
    } else {
      setUser(undefined);
    }
  }, [searchFilter.userId, user, userQuery.data]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 gap-1.5">
          <Filter className="size-3.5" strokeWidth={1.8} />
          Filter Sales
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-transparent w-[440px] p-0 border-none shadow-none"
        align="start"
        sideOffset={8}
        collisionPadding={16}
        style={{ backgroundColor: "transparent" }}
      >
       <div
         className="rounded-xl border border-white/40 shadow-2xl overflow-hidden ring-1 ring-black/5"
         style={{
           backgroundColor: "rgba(245, 248, 255, 0.6)",
           backgroundImage:
             "linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(220,230,245,0.35) 100%)",
           backdropFilter: "saturate(180%) blur(24px)",
           WebkitBackdropFilter: "saturate(180%) blur(24px)",
         }}
       >
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/60">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
            Filters
          </p>
        </div>
        <div className="space-y-5 px-4 pt-4 pb-3">
          <div>
            <FieldLabel>Date range</FieldLabel>
            <div className="grid grid-cols-2 gap-2">
              <DatePickerInput
                placeholder="From"
                value={createdAtFrom}
                onChange={(v) => {
                  setCreatedAtFrom(v);
                  navigate({ search: { ...searchFilter, createdAtFrom: v } });
                }}
                onDayClick={(date) => {
                  if (isEqual(date, createdAtFrom || Date.now())) {
                    setCreatedAtFrom(undefined);
                    navigate({
                      search: { ...searchFilter, createdAtFrom: undefined },
                    });
                  }
                }}
              />
              <DatePickerInput
                placeholder="To"
                value={createdAtTo}
                onChange={(v) => {
                  setCreatedAtTo(v);
                  navigate({ search: { ...searchFilter, createdAtTo: v } });
                }}
                onDayClick={(date: Date) => {
                  if (isEqual(date, createdAtTo || Date.now())) {
                    setCreatedAtTo(undefined);
                    navigate({
                      search: { ...searchFilter, createdAtTo: undefined },
                    });
                  }
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <FieldLabel>Payment type</FieldLabel>
              <Segmented
                options={paymentTypeOptions.map((o) => ({
                  label: o.label,
                  icon: o.icon,
                  value: o.value,
                }))}
                value={paymentType === PaymentType.NONE ? undefined : paymentType}
                onChange={(next) => {
                  const nextValue = next ?? PaymentType.NONE;
                  setPaymentType(nextValue);
                  navigate({
                    search: { ...searchFilter, paymentType: next },
                  });
                }}
              />
            </div>
            <div>
              <FieldLabel>Status</FieldLabel>
              <Segmented
                options={statusOptions.map((o) => ({
                  label: o.label,
                  icon: o.icon,
                  value: o.value,
                }))}
                value={status === StatusEnum.NONE ? undefined : status}
                onChange={(next) => {
                  const nextValue = next ?? StatusEnum.NONE;
                  setStatus(nextValue);
                  navigate({ search: { ...searchFilter, status: next } });
                }}
              />
            </div>
          </div>

          <div>
            <FieldLabel>By staff</FieldLabel>
            <Select
              value={user ? user.id : ""}
              onValueChange={(v) => {
                if (v === "CLEAR") {
                  navigate({ search: { ...searchFilter, userId: undefined } });
                  setUser(undefined);
                } else {
                  navigate({ search: { ...searchFilter, userId: v } });
                }
              }}
            >
              <SelectTrigger className="w-full h-8 px-3 text-xs">
                <SelectValue placeholder="Select staff" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Select a staff</SelectLabel>
                  <SelectItem className="group cursor-pointer" value={"CLEAR"}>
                    <span className="inline-flex items-center text-muted-foreground">
                      <Trash className="mr-1 size-3" /> Clear selection
                    </span>
                  </SelectItem>
                  {usersQuery.data &&
                    usersQuery.data.map((u) => (
                      <SelectItem
                        key={u.id}
                        value={u.id}
                        className="cursor-pointer"
                      >
                        {u.username}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex justify-end px-4 py-2.5 border-t border-border/60">
          <button
            type="button"
            onClick={handleClearFilters}
            className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        </div>
       </div>
      </PopoverContent>
    </Popover>
  );
}
