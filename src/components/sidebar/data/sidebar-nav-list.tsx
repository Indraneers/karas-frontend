import { BadgeDollarSign, Box, House, LayoutGrid, ListTodo, LucideIcon, NotepadText, Wrench } from "lucide-react";

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
    title: 'Unit Stocks',
    url: '/units'
  },
  {
    icon: Box,
    title: 'Products',
    url: '/products',
    childRoutes: [
      /^\/products\/create/,
      /^\/products\/edit\/[\w-]+$/
    ]
  },
  {
    icon: LayoutGrid,
    title: 'Categories',
    url: '/categories',
    childRoutes: [
      /^\/categories\/create/,
      /^\/categories\/edit\/[\w-]+$/
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