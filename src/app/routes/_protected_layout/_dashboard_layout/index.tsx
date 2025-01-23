import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/')({
  component: () => <div>Hello homepage!</div>
});