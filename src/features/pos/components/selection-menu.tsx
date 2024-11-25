export function SelectionMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="gap-2 grid grid-rows-[2fr,3fr] h-full max-h-full">
      {children}
    </div>
  );
}