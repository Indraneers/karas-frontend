import { InputWithIcon } from "@/components/ui/input-with-button";
import CustomerSearchIcon from '@/assets/customer-search.svg';

interface SearchProps {
  placeholder?: string;
}

export function Search({ placeholder = '' }: SearchProps) {
  const CustomerSearchIconElement = <img src={CustomerSearchIcon} alt="Search Customers" />;
  return (
    <InputWithIcon
      startIcon={CustomerSearchIconElement}
      placeholder={placeholder}
    />
  );
}