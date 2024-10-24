import { InputWithIcon } from "@/components/ui/input-with-button";
import CustomerSearchIcon from '@/assets/customer-search.svg';

interface SearchProps {
  placeholder?: string;
  className?: string;
}

export function Search({ className, placeholder = '' }: SearchProps) {
  const CustomerSearchIconElement = <img src={CustomerSearchIcon} alt="Search Customers" />;
  return (
    <InputWithIcon
      className={className}
      startIcon={CustomerSearchIconElement}
      placeholder={placeholder}
    />
  );
}