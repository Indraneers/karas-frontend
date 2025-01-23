import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/maintenance/')({
  component: () => <div>Hello /_dashboard_layout/maintenance/!</div>
});