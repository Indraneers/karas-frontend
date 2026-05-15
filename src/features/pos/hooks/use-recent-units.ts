import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "pos:recent-units";
const MAX_RECENT = 24;

interface RecentUnit {
  id: string;
  ts: number;
}

/**
 * Persists the last-N units the cashier interacted with so a "Recent" tab
 * can surface them on POS-3 (quick reorder). Stored as `{id, ts}` so we
 * can age out stale entries or sort by frequency later without a migration.
 */
export function useRecentUnits() {
  const [ids, setIds] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as RecentUnit[];
      return Array.isArray(parsed) ? parsed.map((r) => r.id) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload: RecentUnit[] = ids.map((id) => ({ id, ts: Date.now() }));
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* ignore quota errors */
    }
  }, [ids]);

  const recordUse = useCallback((id: string) => {
    setIds((prev) => {
      const next = [id, ...prev.filter((existing) => existing !== id)];
      return next.slice(0, MAX_RECENT);
    });
  }, []);

  const clearRecent = useCallback(() => setIds([]), []);

  return { ids, recordUse, clearRecent };
}
