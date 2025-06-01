import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TypographyH2 } from '@/components/ui/typography/h2';
import { getAuditById } from '@/features/audit/api/audit';
import { AuditInfo } from '@/features/audit/components/audit-info';
import { useQuery } from '@tanstack/react-query';
import ReactJsonViewCompare from 'react-json-view-compare';

import { createFileRoute } from '@tanstack/react-router';
import { format } from 'date-fns';

export const Route = createFileRoute('/_protected_layout/_dashboard_layout/audit/$auditId')({
  component: () => <AuditDetailPage />
});

export function AuditDetailPage() {
  const { auditId } = Route.useParams();

  const { data, isLoading } = useQuery({
    queryKey: ['audit', auditId],
    queryFn: () => getAuditById(auditId)
  });

  const oldData = data ? JSON.parse(data.oldValue || '') : '';
  const newData = data ? JSON.parse(data.newValue || '') : '';


  return (
    <div className='flex flex-col gap-4 h-full'>
      <Card className='p-2'>
        <CardHeader>
          <TypographyH2>Audit Detail</TypographyH2>
        </CardHeader>
        <CardContent className='gap-4 grid grid-cols-3 mt-4'>
          <AuditInfo label='Name'>{data?.name || '-'}</AuditInfo>
          <AuditInfo label='Resource Name'>{data?.resourceName || '-'}</AuditInfo>
          <AuditInfo label='Service'>{data?.service || '-'}</AuditInfo>
          <AuditInfo label='Service'>{data?.requestUrl || '-'}</AuditInfo>
          <AuditInfo label='Http Method'>{data?.httpMethod || '-'}</AuditInfo>
          <AuditInfo label='User'>{data?.user.username || '-'}</AuditInfo>
          <AuditInfo label='Timestamp'>{data ? format(data?.timestamp, 'do MMM yyyy, hh:mm aa') : '-'}</AuditInfo>
        </CardContent>
      </Card>
      <Card className='flex-grow p-2'>
        <CardHeader>
          <TypographyH2>Data Comparison</TypographyH2>
        </CardHeader>
        <CardContent>
          {
            isLoading ?
              <div className='flex flex-col gap-1'>
                <Skeleton className='h-6'></Skeleton>
                <Skeleton className='h-6'></Skeleton>
                <Skeleton className='h-6'></Skeleton>
                <Skeleton className='h-6'></Skeleton>
                <Skeleton className='h-6'></Skeleton>
                <Skeleton className='h-6'></Skeleton>
              </div>
              :
              <ReactJsonViewCompare oldData={oldData} newData={newData} />
          }
        </CardContent>
      </Card>
    </div>
  );
}