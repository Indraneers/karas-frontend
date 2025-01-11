import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverAnchor, PopoverContent } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { TypographyH2 } from '@/components/ui/typography/h2';
import { RestockHeaderElement } from '@/features/restock/components/RestockHeaderElement';
import { RestockItemElement, RestockItemList } from '@/features/restock/components/RestockItemList';
import { RestockItem } from '@/features/restock/types/restock-item';
import { StockUpdate } from '@/features/restock/types/stock-update.enum';
import { UnitSearch } from '@/features/unit/components/unit-search';
import { UnitSearchList } from '@/features/unit/components/unit-search-list';
import { useUnitSearch } from '@/features/unit/hooks/unit-search';
import { Unit } from '@/features/unit/types/unit';
import { UnitResponseDto } from '@/features/unit/types/unit.dto';
import { convertUnitDtoToUnit } from '@/features/unit/util/convert';
import { createFileRoute } from '@tanstack/react-router';
import { Check } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/inventory/restock/')({
  component: () => <RestockPage />
});

function RestockPage() {
  const [restockItems, setRestockItems] = useState<RestockItem[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const { q, setQ, data } = useUnitSearch();

  function addRestockItem(unitDto: UnitResponseDto) {
    const unit: Unit = convertUnitDtoToUnit(unitDto);
    const restockItem: RestockItem = {
      id: '',
      unit,
      quantity: 0,
      stockUpdate: StockUpdate.RESTOCK
    };
    setRestockItems([...restockItems, restockItem]);
  }

  return (
    <Section className='flex flex-col pt-4 h-full'>
      <SectionHeader className='gap-8 grid grid-cols-[auto,auto,1fr]'>

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
              5 Products
            </RestockHeaderElement>
            
            <RestockHeaderElement label='Unit Restocked' color='GREEN'>
              +8 Units
            </RestockHeaderElement>

            <RestockHeaderElement label='Total Quantity Restocked' color='GREEN'>
              +1000
            </RestockHeaderElement>

            <RestockHeaderElement label='Units Affected'>
              10 Units
            </RestockHeaderElement>

            <RestockHeaderElement label='Unit Restocked' color='RED'>
              -2 Units
            </RestockHeaderElement>

            <RestockHeaderElement label='Total Quantity Restocked' color='RED'>
              -8000
            </RestockHeaderElement>
          </div>
        </div>

      </SectionHeader>
      <SectionContent className='flex flex-col flex-grow pt-8'>
        <div className='flex gap-8'>
          <div className='relative'>
            <Popover open={open}>
              <PopoverAnchor>
                <UnitSearch 
                  onFocus={() => setOpen(true)}
                  onBlur={() => setOpen(false)}
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
                <UnitSearchList onValueChange={addRestockItem} units={data} />
              </PopoverContent>
            </Popover>
          </div>
          <Button>
            <Check />
            Restock
          </Button>
        </div>
        <div className='flex-grow py-4'>
          <div className='relative h-full'>
            <RestockItemList className='absolute inset-0 pr-4'>
              {!restockItems && 
            <div className='place-content-center grid w-full h-full text-center text-muted-foreground'>
              Add a unit to get started
            </div>
              }
              {
                restockItems &&
            restockItems.map((r, i) => (
              <RestockItemElement restockItem={r} key={i} />
            ))
              }
            </RestockItemList>
          </div>
        </div>
      </SectionContent>
    </Section>
  );
}