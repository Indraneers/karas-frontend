import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected_layout/invoice')({
  component: () => <div>Hello /invoice!</div>
});

export function InvoicePage() {
  return (
    <div>
      
    </div>
  );
}