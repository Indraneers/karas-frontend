import { Button } from "./ui/button";

interface IconButtonProps {
  children: React.ReactNode;
  className?: string;
}

export function IconButton({ children, className } : IconButtonProps) {
  return (
    <Button variant="outline" className={className}>
      {children}
    </Button>
  );
}