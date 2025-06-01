import { ColumnDef } from "@tanstack/react-table";
import { AuditDTO } from "../../types/AuditDTO";
import { format } from "date-fns";

export const columns: ColumnDef<AuditDTO>[] = [
  {
    accessorKey: 'name',
    header: 'Name'
  },
  {
    accessorKey: 'requestUrl',
    header: 'Request URL'
  },
  {
    accessorKey: 'timestamp',
    header: 'Timestamp',
    cell: ({ row }) => format(row.original.timestamp, 'do MMM yyyy, hh:mm aa')
  }
];