import { Sidebar } from '@/components/sidebar';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { sidebarNavList } from '@/components/sidebar/data/sidebar-nav-list';
import { SidebarItem } from '@/components/sidebar/components/sidebar-item';
import { SidebarList } from '@/components/sidebar/components/sidebar-list';
import { MainContent } from '@/components/main-content';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/_dashboard_layout')({
  component: () => <DashboardLayout />
});

function DashboardLayout() {
  return (
    <div className='grid grid-cols-6 bg-background w-full h-screen font-body'>
      <Sidebar>
        <Logo />
        <SidebarList>
          {
            sidebarNavList.map((s) => (
              <SidebarItem Icon={s.Icon} key={s.content} to={s.to} childRoutes={s.childRoutes}>
                {s.content}
              </SidebarItem>
            ))
          }
        </SidebarList>
        <div className="h-full">
          <div className="place-items-center grid h-full">
            <ul className='flex flex-col gap-4'>
              <li>
                <Button className='text-lg' variant="ghost">Support</Button>
              </li>
              <li>
                <Button className='text-lg' variant="ghost">Sign Out</Button>
              </li>
            </ul>
          </div>
        </div>
      </Sidebar>
      <div className='col-span-5 w-full'>
        <MainContent isContainer={true}>
          <Outlet />
        </MainContent>
      </div>
    </div>
  );
}