import { cn } from "@/lib/utils";
import { Link, LinkProps } from "@tanstack/react-router";

interface CustomLinkProps extends LinkProps {
  className?: string;
}

export function CustomLink({ children, className, ...props }: CustomLinkProps) {
  return (
    <Link
      onClick={(e) => e.stopPropagation()}
      className={cn(
        "text-foreground font-medium underline-offset-2 decoration-foreground/30 hover:underline hover:decoration-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}