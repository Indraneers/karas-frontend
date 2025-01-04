import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";
import { getCustomers } from "../api/customer";
import { UseSearch } from "@/types/use-search";
import { CustomerDto } from "../types/customer.dto";

export function useCustomerSearch(): UseSearch<CustomerDto> {
  const [q, setQ] = useState<string>('');
  const debouncedQ = useDebounce(q, 500);
  
  const { isLoading, isError, data } = useQuery({
    queryKey: ['customers', debouncedQ],
    queryFn: () => getCustomers({ q: debouncedQ }),
    enabled: q !== ''
  });

  return {
    q,
    setQ,
    isLoading,
    isError,
    data
  };
}