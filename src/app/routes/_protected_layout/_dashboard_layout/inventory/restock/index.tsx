import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { TypographyH2 } from '@/components/ui/typography/h2';
import { ProductRequestDto } from '@/features/product/types/product.dto';
import { createRestock } from '@/features/restock/api/restock';
import { RestockHeaderElement } from '@/features/restock/components/RestockHeaderElement';
import { RestockItemElement, RestockItemList } from '@/features/restock/components/RestockItemList';
import { Restock } from '@/features/restock/types/restock';
import { RestockItem } from '@/features/restock/types/restock-item';
import { RestockRequestDto } from '@/features/restock/types/restock.dto';
import { StockUpdate } from '@/features/restock/types/stock-update.enum';
import { convertRestockToRestockDto } from '@/features/restock/utils/convert';
import { getUnits } from '@/features/unit/api/unit';
import { UnitSearch } from '@/features/unit/components/unit-search';
import { UnitSearchList } from '@/features/unit/components/unit-search-list';
import { Unit } from '@/features/unit/types/unit';
import { UnitResponseDto } from '@/features/unit/types/unit.dto';
import { convertUnitDtoToUnit, getQuantity } from '@/features/unit/util/convert';
import { useInfiniteSearch } from '@/hooks/use-infinite-search';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from 'react-oidc-context';
import { v4 as uuidv4 } from 'uuid';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/restock/')({
  component: () => <RestockPage />
});

function RestockPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [restockItems, setRestockItems] = useState<RestockItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const { q, setQ, isLoading, data, totalElements, fetchNextPage, hasNextPage } = useInfiniteSearch({
    getEntity: getUnits,
    key: ['units']
  });

  const products: ProductRequestDto[] = restockItems
    .map(ri => ri.unit.product)
    .reduce((arr: ProductRequestDto[], curr) => {
      if (!arr.find(p => curr.id === p.id)) {
        arr.push(curr);
      }

      return arr;
    }, []);

  const units: Unit[] = restockItems
    .map(ri => ri.unit)
    .reduce((arr: Unit[], curr) => {
      if (!arr.find(p => curr.id === p.id)) {
        arr.push(curr);
      }

      return arr;
    }, []);

  const unitsRestocked = restockItems
    .filter(ri => ri.status === StockUpdate.RESTOCK)
    .map(ri => ri.unit)
    .reduce((arr: Unit[], curr) => {
      if (!arr.find(p => curr.id === p.id)) {
        arr.push(curr);
      }

      return arr;
    }, []);

  const unitsDeducted = restockItems
    .filter(ri => (ri.status === StockUpdate.DEDUCT || ri.status === StockUpdate.LOST))
    .map(ri => ri.unit)
    .reduce((arr: Unit[], curr) => {
      if (!arr.find(p => curr.id === p.id)) {
        arr.push(curr);
      }

      return arr;
    }, []);

  const unitQtyRestocked = restockItems
    .filter(ri => ri.status === StockUpdate.RESTOCK)
    .reduce((total, curr) => {
      return total + getQuantity(curr);
    }, 0);

  const unitQtyDeducted = restockItems
    .filter(ri => (ri.status === StockUpdate.DEDUCT || ri.status === StockUpdate.LOST))
    .reduce((total, curr) => {
      return total + getQuantity(curr);
    }, 0);

  const restockMutation = useMutation({
    mutationFn: (restockDto: RestockRequestDto) => createRestock(restockDto),
    onSuccess: () => {
      restockItems.forEach(ri => {
        queryClient.invalidateQueries({
          queryKey: ['unit-' + ri.unit.id]
        });
      });
      navigate({ to: '/inventory/units' });
    }
  });
  
  function addRestockItem(unitDto: UnitResponseDto) {
    const unit: Unit = convertUnitDtoToUnit(unitDto);
    
    const restockItem: RestockItem = {
      id: uuidv4(),
      unit,
      quantity: 0,
      status: StockUpdate.RESTOCK
    };

    setRestockItems([...restockItems, restockItem]);
  }

  function updateRestockItem(restockItem: RestockItem) {
    const newRestockItems = restockItems
      .map((ri) => ri.id === restockItem.id ? restockItem : ri);
    setRestockItems(newRestockItems);
  }

  function removeRestockItem(restockItem: RestockItem) {
    setRestockItems(restockItems.filter(r => r.id !== restockItem.id));
  }

  function submitRestock() {
    const user = auth.user?.profile;
    const restock: Restock = {
      id: '',
      user: {
        username: user?.name || '',
        id: user?.sub || ''
      },
      items: restockItems
    };

    const restockDto: RestockRequestDto = convertRestockToRestockDto(restock);
    restockMutation.mutate(restockDto);
  }

  return (
    <Section className='flex flex-col h-full'>
      <SectionHeader>
        <Card className="gap-4 xl:gap-8 grid grid-cols-[auto,auto,1fr] shadow-none p-4 xl:p-8">
          <div>
            <TypographyH1>
              Restock
            </TypographyH1>
            <Subtitle>
              Restock Unit of Products here
            </Subtitle>
            <div className='mt-4'>
              <Label>
                Note
              </Label>
              <Textarea className='w-[300px]' rows={3} />
            </div>
          </div>

          <Separator orientation='vertical' />

          <div>
            <TypographyH2>Restock Information</TypographyH2>
            <div className='gap-4 grid grid-cols-3 grid-rows-2 pt-4'>
              <RestockHeaderElement label='Product Affected'>
                {products.length} Products
              </RestockHeaderElement>
            
              <RestockHeaderElement label='Unit Restocked' color='GREEN'>
              +{unitsRestocked.length} Units
              </RestockHeaderElement>

              <RestockHeaderElement label='Total Quantity Restocked' color='GREEN'>
              +{unitQtyRestocked}
              </RestockHeaderElement>

              <RestockHeaderElement label='Units Affected'>
                {units.length} Units
              </RestockHeaderElement>

              <RestockHeaderElement label='Unit Deducted/Lost' color='RED'>
              -{unitsDeducted.length} Units
              </RestockHeaderElement>

              <RestockHeaderElement label='Total Quantity Deducted/Lost' color='RED'>
              -{unitQtyDeducted}
              </RestockHeaderElement>
            </div>
          </div>
        </Card>
      </SectionHeader>
      <SectionContent className='flex flex-col flex-grow pt-8'>
        <div className='flex gap-8'>
          <div className='relative' onBlur={(e) => !e.relatedTarget && setOpen(false)}>
            <Popover open={open}>
              <PopoverAnchor>
                <UnitSearch 
                  onFocus={() => setOpen(true)}
                  className='w-[500px]' 
                  value={q} 
                  onChange={setQ}
                />
              </PopoverAnchor>
              <PopoverContent 
                onOpenAutoFocus={(e) => e.preventDefault()}
                className='p-2' 
                style={{ width: 'var(--radix-popover-trigger-width)' }}
              >
                <UnitSearchList 
                  setOpen={setOpen}
                  isLoading={isLoading} 
                  onValueChange={addRestockItem} 
                  data={data} 
                  totalElements={totalElements}
                  fetchNextPage={fetchNextPage}
                  hasNextPage={hasNextPage || false}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button onClick={() => submitRestock()}>
            <Check />
            Restock
          </Button>
        </div>
        <div className='flex-grow py-4'>
          <div className='relative h-full'>
            <RestockItemList className='absolute inset-0 pr-4'>
              {!restockItems && 
            <div className='place-content-center grid w-full h-full text-muted-foreground text-center'>
              Add a unit to get started
            </div>
              }
              {
                restockItems &&
            restockItems.map((r, i) => (
              <RestockItemElement 
                updateRestockItem={updateRestockItem} 
                removeRestockItem={removeRestockItem}
                restockItem={r} 
                key={i} 
              />
            ))
              }
            </RestockItemList>
          </div>
        </div>
      </SectionContent>
    </Section>
  );
}