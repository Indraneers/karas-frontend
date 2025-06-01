 
import { DataTablePagination } from '@/components/data-table-pagination';
import { Section } from '@/components/section';
import { SectionContent } from '@/components/section-content';
import { SectionHeader } from '@/components/section-header';
import { Subtitle } from '@/components/subtitle';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TypographyH1 } from '@/components/ui/typography/h1';
import { getAuditsHOF } from '@/features/audit/api/audit';
import { columns } from '@/features/audit/components/audit-table/columns';
import { AuditServiceEnum } from '@/features/audit/types/AuditServiceEnum';
import { useSearchPagination } from '@/hooks/use-search-pagination';
import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useState } from 'react';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/audit/')({
  component: () => <AuditPage />
});

const auditServices = [
  {
    content: 'Sale',
    value: AuditServiceEnum.SALE
  },
  {
    content: 'Customer',
    value: AuditServiceEnum.CUSTOMER
  },
  {
    content: 'Vehicle',
    value: AuditServiceEnum.VEHICLE
  },
  {
    content: 'Category',
    value: AuditServiceEnum.CATEGORY
  },
  {
    content: 'Subcategory',
    value: AuditServiceEnum.SUBCATEGORY
  },
  {
    content: 'Product',
    value: AuditServiceEnum.PRODUCT
  },
  {
    content: 'Unit',
    value: AuditServiceEnum.UNIT
  }
];

export function AuditPage() {
  const [auditService, setAuditService] = useState<AuditServiceEnum>(AuditServiceEnum.SALE);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});

  const getAudits = useMemo(() => 
    getAuditsHOF(auditService || AuditServiceEnum.SALE), 
  [auditService]
  );

    
  const { data, isLoading, paginationDetail }  = useSearchPagination({ 
    key: ['audits', auditService || ''], 
    getEntity: getAudits,
    enabled: !!auditService,
    query: {} 
  });
  
  return (
    <Section>
      <SectionHeader>
        <TypographyH1>
          Audit
        </TypographyH1>
        <Subtitle>
          Page for audit logs
        </Subtitle>
      </SectionHeader>
      <SectionContent>
        <div>
          <Select value={auditService} onValueChange={(service: AuditServiceEnum) => setAuditService(service)}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder="Select Audit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Audit Services</SelectLabel>
                {
                  auditServices.map(aS => 
                    <SelectItem className='cursor-pointer' key={aS.value} value={aS.value}>
                      {aS.content}
                    </SelectItem>
                  )
                }
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='mt-4'>
          <DataTablePagination 
            columns={columns} 
            data={auditService ? (data?.content || []) : []} 
            isLoading={isLoading}
            paginationDetail={paginationDetail} 
            rowSelection={rowSelection}
            onRowSelectionChange={setRowSelection}
          />
        </div>
      </SectionContent>
    </Section>
  );
}