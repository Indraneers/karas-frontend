import { BadgeDollarSign, Factory, House, ListTodo, LucideIcon, Wrench } from "lucide-react";

interface SideBarNavDataItem {
  Icon: LucideIcon;
  content: string;
  to: string;
}

export const sidebarNavList: SideBarNavDataItem[] = [
  {
    Icon: House,
    content: 'Dashboard',
    to: '/'
  },
  {
    Icon: BadgeDollarSign,
    content: 'Point of Sales',
    to: '/pos'
  },
  {
    Icon: ListTodo,
    content: 'Inventory & Stock Mgt',
    to: '/inventory'
  },
  {
    Icon: Factory,
    content: 'Sales & Order Mgt',
    to: '/sales'
  },
  {
    Icon: Wrench,
    content: 'Sales & Order Mgt',
    to: '/maintenance'
  }
];