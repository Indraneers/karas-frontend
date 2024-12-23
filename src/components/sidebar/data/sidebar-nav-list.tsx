import { BadgeDollarSign, CalendarDays, CarFront, Cog, House, ListTodo, LucideIcon, NotepadText, User, Users, Wrench } from "lucide-react";

interface SideBarNavDataItem {
  icon: LucideIcon;
  title: string;
  url: string;
  childRoutes?: RegExp[];
}

export const sidebarNavList: SideBarNavDataItem[] = [
  {
    icon: House,
    title: 'Dashboard',
    url: '/'
  },
  {
    icon: BadgeDollarSign,
    title: 'POS',
    url: '/pos'
  },
  {
    icon: NotepadText,
    title: 'Sales & Orders',
    url: '/sales',
    childRoutes: [
      /^\/sales\/.*/
    ]
  },
  {
    icon: User,
    title: 'Customers',
    url: '/customers'
  },
  {
    icon: CarFront,
    title: 'Vehicles',
    url: '/vehicles'
  },
  {
    icon: ListTodo,
    title: 'Inventory',
    url: '/inventory/units',
    childRoutes: [
      /^\/inventory\/.*/
    ]
  },
  {
    icon: Wrench,
    title: 'Services',
    url: '/services',
    childRoutes: [
      /^\/sales\/.*/
    ]
  },
  {
    icon: CalendarDays,
    title: 'Maintenance',
    url: '/maintenance'
  },
  {
    icon: Users,
    title: 'Users',
    url: '/users'
  },
  {
    icon: Cog,
    title: 'Setting',
    url: '/setting'
  }
];