import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_dashboard_layout/')({
  component: () => <div>Hello homepage!</div>
});