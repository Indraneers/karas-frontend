
export function AuditInfo({ label, children } : { label: string, children: React.ReactNode }) {
  return (
    <div className="font-normal text-md xl:text-xl">
      <div className="font-normal text-muted-foreground text-xs">{label}</div>
      {children}
    </div>
  );
}