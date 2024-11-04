import { BadgeDollarSign, Box, Factory, House, LayoutGrid, ListTodo, LucideIcon, Wrench } from "lucide-react";

interface SideBarNavDataItem {
  Icon: LucideIcon;
  content: string;
  to: string;
  childRoutes?: RegExp[];
}

export const sidebarNavList: SideBarNavDataItem[] = [
  {
    Icon: House,
    content: 'Dashboard',
    to: '/'
  },
  {
    Icon: BadgeDollarSign,
    content: 'POS',
    to: '/pos'
  },
  {
    Icon: ListTodo,
    content: 'Unit Stocks',
    to: '/units'
  },
  {
    Icon: Box,
    content: 'Products',
    to: '/products'
  },
  {
    Icon: LayoutGrid,
    content: 'Categories',
    to: '/categories',
    childRoutes: [
      /^\/categories\/create/
    ]
  },
  {
    Icon: Factory,
    content: 'Sales & Orders',
    to: '/sales'
  },
  {
    Icon: Wrench,
    content: 'Maintenance',
    to: '/maintenance'
  }
];