import { cn } from "@/lib/utils";

interface HeaderProps {
  level?: number;
  className?: string;
  children: React.ReactNode;
}

export function Header({ className, children, level = 1 }: HeaderProps) {
  if (level === 2) {
    return (
      <h2 className={
        cn(
          'font-semibold text-xl',
          className
        )
      }>
        {children}
      </h2>
    );
  }
  return (
    <h1 className={
      cn(
        'font-semibold text-xl',
        className
      )
    }>
      {children}
    </h1>
  );
}