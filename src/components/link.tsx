import { cn } from "@/lib/utils";
import { Link, LinkProps } from "@tanstack/react-router";

interface CustomLinkProps extends LinkProps {
  className?: string;
}

export function CustomLink({ children, className, ...props }: CustomLinkProps) {
  return (
    <Link
      className={cn([
        'text-accent underline',
        className
      ])}
      {...props}
    >
      {children}
    </Link>
  );
}