import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_page_layout/sales')({
  component: () => <div>Hello /_page_layout/sales!</div>
});