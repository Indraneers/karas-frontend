import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { UseSearch } from "@/types/use-search";
import { VehicleDto } from "../dto/vehicle.dto";
import { getVehicles } from "../api/vehicle";

export function useVehicleSearch({ enabled = false } : { enabled?: boolean }): UseSearch<VehicleDto> {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  
  const { isLoading, isError, data } = useQuery({
    queryKey: ['customers', debouncedQ],
    queryFn: () => getVehicles({ q: debouncedQ }),
    enabled: (q !== '') || enabled
  });

  return {
    q,
    setQ,
    isLoading,
    isError,
    data
  };
}