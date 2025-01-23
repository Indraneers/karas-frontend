import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/')({
  component: () => <Navigate to="/inventory/units" />
});