import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/hello-world')({
  component: () => <div>Hello /hello-world!</div>
});