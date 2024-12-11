import { cn } from "@/lib/utils";


export function Section({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <section className={
      cn(
        className
      )}
    >
      {children}
    </section>
  );
}