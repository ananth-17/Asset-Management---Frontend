import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  PencilSquareIcon,
  QrCodeIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import CellActions from "./cell-actions";

export const assetsColumns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "brand",
    header: "Brand",
  },
  {
    accessorKey: "model",
    header: "Model",
  },
  {
    accessorKey: "sno",
    header: "Serial Number",
  },
  {
    accessorKey: "invoiceNo",
    header: "Invoice Number",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "tagName",
    header: "Tag Name",
  },
  {
    accessorKey: "assetStatus",
    header: "Status",
    cell: ({ row }) => {
      const statusMap: { [key: string]: string } = {
        IDLE: "Idle",
        IN_USE: "In Use",
        UNDER_SERVICE: "Under Service",
        SOLD_DISCARDED: "Sold/Discarded",
      };
      return <Badge>{statusMap[row.original.assetStatus]}</Badge>;
    },
  },
  {
    accessorKey: "assignToName",
    header: "Assigned To",
    cell: ({ row }) => {
      return <Badge>{row.original.assignToName}</Badge>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => <CellActions id={row.original.id} />,
  },
];
