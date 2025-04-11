import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "card";
}

export function Section({ children, className, variant }: SectionProps) {
  return (
    <section
      className={cn(
        variant === "card" && "rounded-xl border p-4",
        className
      )}
    >
      {children}
    </section>
  );
}
