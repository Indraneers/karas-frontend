interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="p-2 pt-4">
      {children}
    </div>
  );  
}