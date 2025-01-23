import { BadgeDollarSign, CalendarDays, CarFront, Cog, House, ListTodo, LucideIcon, NotepadText, ReceiptText, User, Users, Wrench } from "lucide-react";

export interface SideBarNavDataItem {
  icon: LucideIcon;
  title: string;
  url: string;
  childRoutes?: RegExp[];
  children?: SideBarNavDataItem[];
}

export const sidebarUserList: SideBarNavDataItem[] = [
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
    url: '/customers',
    childRoutes: [
      /^\/customers\/.*/
    ]
  },
  {
    icon: CarFront,
    title: 'Vehicles',
    url: '/vehicles',
    childRoutes: [
      /^\/vehicles\/.*/
    ]
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
      /^\/services\/.*/
    ]
  },
  {
    icon: CalendarDays,
    title: 'Maintenance',
    url: '/maintenance'
  }
];

export const sidebarAdminList: SideBarNavDataItem[] = [
  {
    icon: Users,
    title: 'Users',
    url: import.meta.env.VITE_KEYCLOAK_URL + '/'
  },
  {
    icon: Cog,
    title: 'Setting',
    url: '/setting',
    childRoutes: [
      /^\/setting\/.*/
    ],
    children: [
      {
        icon: ReceiptText,
        title: 'Invoice',
        url: '/setting/invoice'
      }
    ]
  }
];