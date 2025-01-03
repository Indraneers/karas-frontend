import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/subcategories/edit/$subcategoryId')({
  component: () => <div>Hello /_protected_layout/_dashboard_layout/inventory/subcategories/edit/$subcategoryId!</div>
});