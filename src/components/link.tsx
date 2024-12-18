import { cn } from "@/lib/utils";
import { Link, LinkProps } from "@tanstack/react-router";

interface CustomLinkProps extends LinkProps {
  className?: string;
}

export function CustomLink({ children, className, ...props }: CustomLinkProps) {
  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      className={cn([
        'text-accent font-medium hover:underline hover:text-primary',
        className
      ])}
      {...props}
    >
      {children}
    </Link>
  );
}