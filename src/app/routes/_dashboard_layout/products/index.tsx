import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/products/')({
  component: () => <div>Hello /_dashboard_layout/products/!</div>
});