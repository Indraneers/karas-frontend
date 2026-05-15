import { cn } from "@/lib/utils";

interface FormGroupProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormGroup({ title, description, children, className }: FormGroupProps) {
  return (
    <section className={cn("pb-6 border-b border-border/60 last:border-b-0 last:pb-0", className)}>
      <header className="mb-5 space-y-0.5">
        <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </h2>
        {description && (
          <p className="text-sm text-muted-foreground/80">{description}</p>
        )}
      </header>
      <div className="space-y-5">{children}</div>
    </section>
  );
}