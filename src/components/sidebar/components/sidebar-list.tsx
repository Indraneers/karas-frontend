interface SidebarListProps {
  children: React.ReactNode;
}

export function SidebarList({ children }: SidebarListProps) {
  return (
    <div className="flex flex-col gap-4">
      {children}
    </div>
  );
}