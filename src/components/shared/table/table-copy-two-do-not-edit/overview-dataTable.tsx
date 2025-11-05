/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import Loader from "@/components/loader/Loader";
import SubmitButton from "@/components/shared/SubmitButton";
import Filter from "@/public/svgs/hrm/employee-data-management/filter-edit.svg";
import Image from "next/image";
// import { useSheet } from "@/hooks/useSheet";
import Export from "@/public/svgs/transaction/export.svg";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

interface OverviewDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  className?: string;
  totalPages: number;
  loading?: boolean;
  page: number;
  setPage: (page: number) => void;
  searchTerm: string;
  onSearchTermChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  period: string;
  onPeriodChange: (value: string) => void;
}

export function OverviewDataTable<TData, TValue>({
  columns,
  data,
  className,
  totalPages,
  loading,
  page,
  setPage,
  searchTerm,
  onSearchTermChange,
  status,
  onStatusChange,
  period,
  onPeriodChange,
}: OverviewDataTableProps<TData, TValue>) {
    // const { mobile } = useTableContext();
  // Sheet control
  // const { isSheetOpen, toggleSheet } = useSheet();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [openTwo, setOpenTwo] = React.useState(false);

  //popover three
  const [openThree, setOpenThree] = React.useState(false);

  const [openExport, setOpenExport] = React.useState(false);
  const openCloseModalFn = () => setOpenExport(!openExport);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className={`border px-4 rounded-lg w-full ${className || ""}`}>
      <div className="flex justify-between py-4">
        <Input
          placeholder="Search for employee Filter Employee Name..."
          value={searchTerm}
          onChange={(e) => onSearchTermChange(e.target.value)}
          className="max-w-sm py-2.5"
        />

        <div className="flex gap-2">
           <div className="flex gap-2 mr-10">
          <SubmitButton
            // clickFn={() => toggleSheet(!isSheetOpen)}
            className="hover:scale-95 active:scale-90 transition-transform bg-[#F7F8FA] hover:bg-[#E7F1FF] text-primary cursor-pointer"
          >
            <Image src={Filter} alt="chat icon" />
            Filter
          </SubmitButton>
          <SubmitButton
            clickFn={openCloseModalFn}
            className="hover:scale-95 active:scale-90 transition-transform text-primary bg-[#E7F1FF] hover:bg-[#E7F1FF] cursor-pointer"
          >
            <Image src={Export} alt="chat icon" />
            Export
          </SubmitButton>
        </div>

        <div className="flex gap-4">
          <Popover open={openTwo} onOpenChange={setOpenTwo}>
            <PopoverTrigger asChild>
              <Button
                onClick={() => setOpenTwo(!openTwo)}
                className="flex gap-2 w-fit px-4 items-center cursor-pointer text-md text-[#858CA0] bg-[#F7F8FA]"
                variant="ghost"
              >
                {status}
                <ChevronDown />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[120px] p-4 mr-2">
              {["approved", "rejected", "processing", "pending", "disbursed"].map((option) => (
                <div
                  key={option}
                  className="text-sm cursor-pointer font-semibold mb-3 hover:underline"
                  onClick={() => {
                    onStatusChange(option);
                    setOpenTwo(false);
                  }}
                >
                  {option}
                </div>
              ))}
            </PopoverContent>
          </Popover>

          <Popover open={openThree} onOpenChange={setOpenThree}>
            <PopoverTrigger asChild>
              <Button
                onClick={() => setOpenThree(!openThree)}
                className="flex gap-2 w-fit px-4 items-center cursor-pointer text-md text-[#858CA0] bg-[#F7F8FA]"
                variant="ghost"
              >
                {period}
                <ChevronDown />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-[160px] p-4 mr-2">
              {["week", "month", "quarter", "custom"].map((option) => (
                <div
                  key={option}
                  className="text-sm cursor-pointer font-semibold mb-3 hover:underline"
                  onClick={() => {
                    onPeriodChange(option);

                    setOpenThree(false);
                  }}
                >
                  {option === "custom" ? "Date Range" : `This ${option.charAt(0).toUpperCase() + option.slice(1)}`}
                </div>
              ))}
            </PopoverContent>
          </Popover>
        </div>

        </div>
       
      </div>
           <div className={`rounded-md border w-full lg:w-[73svw]  2xl:w-full`}>
         <Table className="">
                    <TableHeader>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <TableHead key={header.id} className={header.column.columnDef.meta?.className ?? ""}>
                              {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                            </TableHead>
                          ))}
                        </TableRow>
                      ))}
                    </TableHeader>
                    <TableBody>
                      {loading ? (
                        <TableRow>
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                            Loading..
                            {/* <Loader /> */}
                          </TableCell>
                        </TableRow>
                      ) : table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className={cell.column.columnDef.meta?.className ?? ""}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={columns.length} className="h-24 text-center">
                            No results.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>

        <Button variant="outline" size="sm" onClick={() => setPage(page - 1)} disabled={page === 1} className="py-2">
          Previous
        </Button>

        <div className="flex items-center justify-center text-sm font-medium">
          Page {page} of {totalPages}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="py-2"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
