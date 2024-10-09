import CustomerSearchIcon from './assets/customer-search.svg';
import { InputWithIcon } from "@/components/ui/input-with-button";

export function CustomerSearch() {
  const CustomerSearchIconElement = <img src={CustomerSearchIcon} alt="Search Customers" />;
  return (
    <InputWithIcon
      startIcon={CustomerSearchIconElement}
      placeholder="Seach for a customer"
    />
  );
}