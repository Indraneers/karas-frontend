import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";
import { useUnitSearch } from "@/features/unit/hooks/unit-search";
import { convertUnitDtoToUnit } from "@/features/unit/util/convert";
import { UnitSearchResultCard } from "./unit-selection";
import { ItemCardList, ItemSkeletonList, ItemEmpty } from "./item-selector";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * Search-first entry point for the POS items area. When the query is empty
 * the original category drill-down (passed as children) renders; once the
 * cashier types a single character, we swap in trigram-ranked flat unit
 * results that match across unit name, product name, identifier, and
 * subcategory.
 */
export function UnitQuickSearch({
  className,
  children
}: {
  className?: string;
  children: ReactNode;
}) {
  const { q, setQ, isLoading, data } = useUnitSearch();
  const isSearching = q.trim().length > 0;

  return (
    <div className={cn("flex flex-col h-full min-h-0 gap-3", className)}>
      <div className="relative">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
          strokeWidth={1.8}
        />
        <Input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search products, units, identifiers…"
          className="pl-9 pr-9 h-10"
        />
        {isSearching && (
          <button
            type="button"
            onClick={() => setQ("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/60"
            aria-label="Clear search"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      <div className="flex-1 min-h-0">
        {isSearching ? (
          <ItemCardList className="min-h-0">
            {isLoading && data.length === 0 && <ItemSkeletonList />}
            {!isLoading && data.length === 0 && <ItemEmpty />}
            {data.map((u) => (
              <UnitSearchResultCard key={u.id} unit={convertUnitDtoToUnit(u)} />
            ))}
          </ItemCardList>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
