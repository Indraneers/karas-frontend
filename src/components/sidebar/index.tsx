interface SidebarProps {
  children: React.ReactNode
}

export function Sidebar({ children }: SidebarProps) {
  return (
    <div className="flex flex-col p-2 pt-4 h-full">
      {children}
    </div>
  );  
}