import { Sidebar } from '@/components/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { sidebarNavList } from '@/components/sidebar/data/sidebar-nav-list';
import { SidebarItem } from '@/components/sidebar/components/sidebar-item';
import { SidebarList } from '@/components/sidebar/components/sidebar-list';

export const Route = createFileRoute('/_dashboard_layout')({
  component: () => <DashboardLayout />
});

function DashboardLayout() {
  return (
    <div className='grid grid-cols-6 bg-background font-body'>
      <Sidebar>
        <SidebarList>
          {
            sidebarNavList.map((s) => (
              <SidebarItem Icon={s.Icon} key={s.content}>
                {s.content}
              </SidebarItem>
            ))
          }
        </SidebarList>
      </Sidebar>
      <div className='container'>
        <Outlet />
      </div>
    </div>
  );
}