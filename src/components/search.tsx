import { InputWithIcon } from "@/components/ui/input-with-button";
import CustomerSearchIcon from '@/assets/customer-search.svg?react';

interface SearchProps {
  placeholder?: string;
  className?: string;
}

export function Search({ className, placeholder = '' }: SearchProps) {
  const CustomerSearchIconElement = <CustomerSearchIcon />;
  return (
    <InputWithIcon
      className={className}
      startIcon={CustomerSearchIconElement}
      placeholder={placeholder}
    />
  );
}