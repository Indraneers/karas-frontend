import { ColumnDef } from "@tanstack/react-table";
import { AuditDTO } from "../../types/AuditDTO";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<AuditDTO>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'resourceName',
    header: 'Resource Name'
  },
  {
    accessorKey: 'requestUrl',
    header: 'Request URL'
  },
  {
    accessorKey: 'user',
    header: 'Account',
    cell: ({ row }) => <Badge variant='outline'>{row.original.user.username}</Badge>
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
    cell: ({ row }) => format(row.original.timestamp, 'do MMM yyyy, hh:mm aa')
  }
];