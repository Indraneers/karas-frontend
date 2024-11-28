export function ItemSelectionHeader({ children } : { children: React.ReactNode }) {
  return (
    <div className="flex items-center space-x-4 pb-4 min-h-8">
      {children}
    </div>
  );
}