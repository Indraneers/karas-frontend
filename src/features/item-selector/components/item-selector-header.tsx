export function ItemSelectorHeader({ children } : { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-4 min-h-8">
      {children}
    </div>
  );
}