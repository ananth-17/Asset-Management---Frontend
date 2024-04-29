import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CellActions from "./cell-actions";

export const categoriesColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "code",
    header: "Code",
  },
  {
    accessorKey: "counnt",
    header: "Count",
  },
  {
    accessorKey: "assetType.name",
    header: "Asset Type",
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <CellActions id={row.original.id} />,
  },
];
