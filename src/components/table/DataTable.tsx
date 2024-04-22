"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction, useState } from "react";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_TABLE_NUMBER_OF_ROWS = 10;

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  itemCount: number;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  rowClickAction: (data: TData) => void;
  disablePagination?: boolean;
  tableUniqueKey?: string;
  curentSelectedRow?: TData;
  isFetching?: boolean;
}

export function DataTable<TData>({
  columns,
  data,
  itemCount,
  currentPage,
  setCurrentPage,
  rowClickAction,
  disablePagination,
  tableUniqueKey,
  curentSelectedRow,
  isFetching,
}: Readonly<DataTableProps<TData>>) {
  const [pagination, setPagination] = useState<number>(currentPage);

  const goToSpecificPage = (pageNumber: number) => {
    const pageCount = getPageCount();
    if (pageNumber >= pageCount) {
      setCurrentPage(pageCount);
      setPagination(pageCount);
      return;
    }

    if (pageNumber <= 0) {
      setCurrentPage(DEFAULT_PAGE_NUMBER);
      setPagination(DEFAULT_PAGE_NUMBER);
      return;
    }

    setCurrentPage(pageNumber);
    setPagination(pageNumber);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev: number) => {
      if (prev <= 1) {
        setPagination(prev);
        return prev;
      }
      setPagination(prev - 1);
      return prev - 1;
    });
  };

  const goToNextPage = () => {
    setCurrentPage((prev: number) => {
      if (prev === getPageCount()) {
        setPagination(prev);
        return prev;
      }
      setPagination(prev + 1);
      return prev + 1;
    });
  };

  const getPageCount = () => {
    return Math.ceil((itemCount ?? 1) / Number(DEFAULT_TABLE_NUMBER_OF_ROWS));
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (itemCount === 0 || !data) return <p>No Data Available</p>;

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
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
                onClick={() => rowClickAction(row.original)}
                className={cn("hover:cursor-pointer", {
                  "pointer-events-none bg-primary/70 text-primary-foreground":
                    curentSelectedRow &&
                    // @ts-ignore
                    row.original[tableUniqueKey] ===
                      // @ts-ignore
                      curentSelectedRow[tableUniqueKey],
                })}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
      {!disablePagination && (
        <div className="min-h-[50px]">
          {getPageCount() > 1 && (
            <div className="flex items-center gap-4 justify-center pt-6">
              <div>
                <p>
                  Page{" "}
                  <span className="font-bold">
                    {currentPage} of {getPageCount()}
                  </span>
                  {" | "}
                </p>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  onClick={() => goToSpecificPage(1)}
                  disabled={isFetching || currentPage === 1}
                >
                  {"<<"}
                </Button>
                <Button
                  size="sm"
                  onClick={() => goToPreviousPage()}
                  disabled={isFetching || currentPage === 1}
                >
                  Prev
                </Button>
                <Input
                  type="number"
                  value={pagination}
                  onChange={(e) => setPagination(Number(e.target.value))}
                  onBlur={() => goToSpecificPage(pagination)}
                  className={cn("rounded w-16 text-center")}
                  disabled={isFetching}
                />
                <Button
                  size="sm"
                  onClick={() => goToNextPage()}
                  disabled={isFetching || currentPage === getPageCount()}
                >
                  Next
                </Button>
                <Button
                  size="sm"
                  onClick={() => goToSpecificPage(getPageCount())}
                  disabled={isFetching || currentPage === getPageCount()}
                >
                  {">>"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
