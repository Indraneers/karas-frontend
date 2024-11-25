export function SelectionMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="gap-4 grid grid-rows-[1fr,2fr]">
      {children}
    </div>
  );
}