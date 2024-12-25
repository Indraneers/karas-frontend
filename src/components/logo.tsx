export function Logo({ className }: { className?: string }) {
  return (
    <div>
      <img className={className} src="/logo.png" alt="Logo" />
    </div>
  );
}