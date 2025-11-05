"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import StatusIndicator from "@/components/common/statusIndicator";
import Link from "next/link";
import { GetStatusBadge, StatusVariant } from "@/components/common/getStatusBadge";

export type OverviewType = {
  id: string;
  sn: number;
  fullName: string;
  email: string;
  uniqueId: string;
  amountPaid: number;
  referredBy: string | null;
  date: string;
  subscriptionPeriod: string;
  expiryDate: string;
  tripBooked: boolean | number;
  status: "pending" | "processing" | "success" | "failed";
  amount: number;
};

export const Overviewcolumns: ColumnDef<OverviewType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    meta: {
      className: "sticky left-0 bg-white z-10",
    },
  },
  {
    accessorKey: "sn",
    header: "S/N",
  },
  {
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "uniqueId",
    header: "Unique ID",
  },

  {
    accessorKey: "amountPaid",
    header: "Amount Paid",
  },
  {
    accessorKey: "referredBy",
    header: "Referred By",
  },
  {
    accessorKey: "date",
    header: "Date",
  },

  {
    accessorKey: "subscriptionPeriod",
    header: "Subscription Period",
  },

  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
  },
  {
    accessorKey: "tripBooked",
    header: "Trip Booked",
  },
 {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const { status } = row.original;
      return (
        <div className="text-sm">
          <GetStatusBadge status={status as StatusVariant} />
        </div>
      );
    },
  },

  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "id",
    header: "",
    cell: () => null, // Render nothing in the cell
    enableHiding: true, // Allow hiding
    size: 0, // Set width to 0
    meta: {
      className: "hidden", // Ensure it's hidden
    },
  },
  // {
  //     id: "actions",
  //     meta: {
  //       className: "sticky right-0 bg-white z-10",
  //     },
  //     enableHiding: false,
  //     cell: ({ row }) => {
  //       const trip = row.original;

  //       return <MoreHorizontal />;
  //     },
  //   },
  {
    id: "actions",
    meta: {
      className: "sticky right-0 bg-white z-10",
    },
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/payments/${payment.id}`}>View Details</Link>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id)}>Send Email</DropdownMenuItem>
            <DropdownMenuItem>Update Status</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
