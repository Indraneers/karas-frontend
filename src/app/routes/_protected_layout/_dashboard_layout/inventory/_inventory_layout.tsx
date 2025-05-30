import { Section } from '@/components/section';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { Box, Boxes, Grid, LayoutGrid, LucideIcon } from 'lucide-react';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/_inventory_layout')({
  component: () => <InventoryLayout />
});

interface InventoryTabNavData {
  icon: LucideIcon;
  url: string;
  title: string;
}

const data: InventoryTabNavData[] = [
  {
    icon: LayoutGrid,
    url: '/inventory/categories',
    title: 'Categories'
  },
  {
    icon: Grid,
    url: '/inventory/subcategories',
    title: 'Subcategories'
  },
  {
    icon: Box,
    url: '/inventory/products',
    title: 'Products'
  },
  {
    icon: Boxes,
    url: '/inventory/units',
    title: 'Unit Stocks'
  }
];

export function InventoryLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <Section className='flex flex-col h-full'>
      <Tabs value={location.pathname}>
        <TabsList>
          {
            data.map((d) => (
              <TabsTrigger 
                onClick={() => navigate({ to: d.url })}
                value={d.url} 
                key={d.url}
              >
                <d.icon size={16} />
                <span className='ml-2'>{d.title}</span>
              </TabsTrigger>
            ))
          }
        </TabsList>
      </Tabs>
      <div className='flex flex-col flex-grow mt-4 h-full'>
        <Outlet />
      </div>
    </Section>
  );
}