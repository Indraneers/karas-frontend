import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";
import { FormEvent } from "react";

interface SalesSearchBarProps {
  className?: string;
  value?: string;
  onChange: (q: string) => void;
}

/**
 * Top-level search bar for the Sales page. Free-text filter applied directly to
 * the sales table — matches customer name, vehicle, or invoice id.
 */
export function SalesSearchBar({ className, value, onChange }: SalesSearchBarProps) {
  function handleInput(e: FormEvent<HTMLInputElement>) {
    onChange(e.currentTarget.value);
  }

  return (
    <div className={cn("relative", className)}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
        strokeWidth={1.8}
      />
      <Input
        className="pl-9 pr-9 h-9"
        value={value ?? ""}
        onInput={handleInput}
        placeholder="Search sales by customer, vehicle, or invoice…"
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 grid place-content-center size-6 rounded-md text-muted-foreground hover:bg-muted/60 transition-colors"
          aria-label="Clear search"
        >
          <X className="size-4" strokeWidth={1.8} />
        </button>
      )}
    </div>
  );
}
