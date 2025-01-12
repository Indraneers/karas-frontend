import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/setting/invoice')({
  component: () => <div>Hello /_protected_layout/_dashboard_layout/setting/invoice!</div>
});
