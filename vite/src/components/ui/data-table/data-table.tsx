import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";

//   import { DataTablePagination } from "@/components/ui/data-table/pagination";
import { Input } from "../input";
//   import { DataTableFacetedFilter } from "./faceted-filter";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pageInfo: {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalElements: number;
  };
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newSize: number) => void;
  fetchPageData: (
    page: number,
    size: number,
    searchParam: string
    //   status: boolean
  ) => Promise<void>;
  // statusType: string;
}

export function DataTable<TData, TValue>({
  columns,
  data = [],
  pageInfo,
  onPageChange,
  onPageSizeChange,
  fetchPageData,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [searchQuery, setSearchQuery] = useState("");
  // const [status, setStatus] = useState<boolean | undefined>();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between">
          <div className="flex flex-1 items-center space-x-2">
            <Input
              placeholder="Search..."
              value={(table.getState().globalFilter as string) ?? ""}
              onChange={(event) => {
                table.setGlobalFilter(event.target.value);
                //   fetchPageData(
                //     pageInfo.pageNumber,
                //     pageInfo.pageSize,
                //     event.target.value,
                // status
                //   );
                setSearchQuery(event.target.value);
              }}
              className="h-8 w-[150px] lg:w-[250px]"
            />
            {/* <DataTableFacetedFilter
                column={table.getColumn(statusType)}
                title="Status"
                options={
                  statusType === "returnStatus"
                    ? [
                        { label: "Returned", value: "true" },
                        { label: "Not Returned", value: "false" },
                      ]
                    : [
                        { label: "Clocked Out", value: "true" },
                        { label: "Not Clocked Out", value: "false" },
                      ]
                }
                fetchPageData={fetchPageData}
                pageInfo={pageInfo}
                searchParam={searchQuery}
                setStatus={setStatus}
                statusType={statusType}
              /> */}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto hidden h-8 lg:flex"
            >
              <AdjustmentsHorizontalIcon className="mr-2 h-4 w-4" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {table
              .getAllColumns()
              .filter(
                (column) =>
                  typeof column.accessorFn !== "undefined" &&
                  column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gray-200 text-gray-500 uppercase "
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      // style={{ width: `${100 / headerGroup.headers.length}%` }}
                      className=""
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="text-gray-900"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className=" ">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {/* <DataTablePagination
          pageInfo={pageInfo}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          fetchPageData={fetchPageData}
          statusType={statusType}
        /> */}
    </div>
  );
}
