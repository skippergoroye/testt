/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Overviewcolumns, OverviewType } from "./overview-column";
import { OverviewDataTable } from "./overview-dataTable";
import { useRefetch } from "@/context/RefetchContext";
import { useGetInternationalStudentLoansQuery } from "@/redux/features/migration/migration-loans/migration-loansApi";


const OverviewTable = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = React.useState<string>("On_leave");
  const [period, setPeriod] = React.useState<string>("today");

    const queryParams: {
      page: number;
      perPage: number;
      search?: string;
      status?: string;
      period?: string;
    } = {
      page,
      perPage,
      status,
      period,
    };

    if (searchTerm.trim() !== "") {
      queryParams.search = searchTerm.trim();
    }

    // API call
    const { refetchFlag, clearRefetch } = useRefetch();
    const { data, refetch } = useGetInternationalStudentLoansQuery(queryParams);
    useEffect(() => {
      if (refetchFlag) {
        refetch();
        clearRefetch();
      }
    }, [refetchFlag, refetch, clearRefetch, status, period]);

    const totalPages = useMemo(() => {
      const totalItems = data?.total || 0;
      return Math.ceil(totalItems / perPage) || 1;
    }, [data?.total, perPage]);



  // if(isError) {
  //   return (<div>eroor here</div>)
  // }

  const tableData: OverviewType[] = [
    {
      id: "m5gr84i9",
      sn: 1,
      fullName: "Ken Adams",
      email: "ken99@example.com",
      uniqueId: "UID-001",
      amountPaid: 316,
      referredBy: "Adams",
      date: "2025-01-05",
      subscriptionPeriod: "12 months",
      expiryDate: "2026-01-05",
      tripBooked: true,
      status: "success",
      amount: 316,
    },
    {
      id: "3u1reuv4",
      sn: 2,
      fullName: "Abel Carter",
      email: "abe45@example.com",
      uniqueId: "UID-002",
      amountPaid: 242,
      referredBy: "Ken Adams",
      date: "2025-02-12",
      subscriptionPeriod: "6 months",
      expiryDate: "2025-08-12",
      tripBooked: false,
      status: "success",
      amount: 242,
    },
    {
      id: "derv1ws0",
      sn: 3,
      fullName: "Monserrat Cruz",
      email: "monserrat44@example.com",
      uniqueId: "UID-003",
      amountPaid: 837,
      referredBy: "Abel Carter",
      date: "2025-03-18",
      subscriptionPeriod: "12 months",
      expiryDate: "2026-03-18",
      tripBooked: true,
      status: "processing",
      amount: 837,
    },
    {
      id: "5kma53ae",
      sn: 4,
      fullName: "Silas Bennett",
      email: "silas22@example.com",
      uniqueId: "UID-004",
      amountPaid: 874,
      referredBy: "james",
      date: "2025-04-01",
      subscriptionPeriod: "3 months",
      expiryDate: "2025-07-01",
      tripBooked: false,
      status: "failed",
      amount: 874,
    },
  ];



  const isLoading = false



  return (
    <div className="">
      <OverviewDataTable
        columns={Overviewcolumns}
        data={tableData}
        totalPages={totalPages}
        loading={isLoading}
        searchTerm={searchTerm}
        onSearchTermChange={setSearchTerm}
        page={page}
        setPage={setPage}
        status={status}
        onStatusChange={setStatus} // 👈 parent listens to child
        period={period}
        onPeriodChange={setPeriod} // 👈 parent listens to child />
      />
    </div>
  );
};

export default OverviewTable;
