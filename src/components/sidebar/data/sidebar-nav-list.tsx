import { BadgeDollarSign, House, ListTodo, LucideIcon, NotepadText, Wrench } from "lucide-react";

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
    icon: ListTodo,
    title: 'Inventory',
    url: '/inventory/units',
    childRoutes: [
      /^\/inventory\/.*/
    ]
  },
  {
    icon: NotepadText,
    title: 'Sales & Orders',
    url: '/sales'
  },
  {
    icon: Wrench,
    title: 'Maintenance',
    url: '/maintenance'
  }
];