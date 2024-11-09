import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createFileRoute, Outlet, useLocation, useNavigate } from '@tanstack/react-router';
import { Box, Boxes, LayoutGrid, LucideIcon } from 'lucide-react';

export const Route = createFileRoute('/_dashboard_layout/inventory/_inventory_layout')({
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
    <div>
      <Tabs value={location.pathname} className='w-[1000px]'>
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
      <div className='mt-4'>
        <Outlet />
      </div>
    </div>
  );
}