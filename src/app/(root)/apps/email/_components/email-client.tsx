/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import Avatar from "../../../../../../public/images/avater.jpg";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SearchTermSchema } from "@/lib/schemas";
import CustomFormField, { FormFieldType } from "@/components/shared/CustomFormField";
import { useFetchCharactersQuery } from "@/redux/features/apps/email/emailApi";
import {
  ChevronLeft,
  ChevronRight,
  Inbox,
  Star,
  Send,
  AlertCircle,
  FileText,
  Trash,
  Pencil,
  Tag,
  RotateCcw,
  Menu,
} from "lucide-react";
import { useDebounce } from "@/hooks/useDebounce";

const navItems = [
  { icon: Pencil, label: "Compose", highlight: true },
  { icon: Inbox, label: "Inbox", count: 24 },
  { icon: Star, label: "Starred" },
  { icon: Send, label: "Sent" },
  { icon: AlertCircle, label: "Important" },
  { icon: FileText, label: "Drafts", count: 30 },
  { icon: Trash, label: "Trash" },
];

const labels = ["Work", "Family", "Friends", "Office"];

export default function EmailClient() {
  const [selectedEmails, setSelectedEmails] = useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("");

  // From your form
  const form = useForm<z.infer<typeof SearchTermSchema>>({
    resolver: zodResolver(SearchTermSchema),
    defaultValues: { searchTerm: "" },
  });

  // Get live input
  const searchTerm = form.watch("searchTerm");

  // 👇 Debounce it so query fires only after user pauses typing
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Call API with debounced value
  // const { data, isLoading, isError, isFetching, refetch } = useFetchCharactersQuery({
  //   page: currentPage,
  //   name: debouncedSearchTerm || undefined,
  //   status: statusFilter || undefined,
  // });


  // memoize the query argument object to prevent re-fetching due to object identity changes (especially since this EmailClient component is large and renders lists).

  const queryArgs = useMemo(
    () => ({
      page: currentPage,
      name: debouncedSearchTerm || undefined,
      status: statusFilter || undefined,
    }),
    [currentPage, debouncedSearchTerm, statusFilter]
  );

  const { data, isLoading, isError, isFetching, refetch } = useFetchCharactersQuery(queryArgs);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm, statusFilter]);

  const toggleEmail = (id: number) => {
    const newSelected = new Set(selectedEmails);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedEmails(newSelected);
  };

  return (
    <div className="flex flex-col md:flex-row h-full bg-background p-2 md:p-6 border-2 border-black">
      {/* SIDEBAR */}

      <aside
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed md:static top-0 left-0 z-40 h-full w-64 bg-white border-r border-border flex flex-col p-4 transition-transform duration-300 md:translate-x-0`}
      >
        {/* Close Button (Mobile only) */}
        <div className="md:hidden flex justify-end mb-4">
          <Button variant="outline" size="sm" className="border border-black" onClick={() => setSidebarOpen(false)}>
            Close
          </Button>
        </div>

        {/* User Profile */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 border border-black rounded-full overflow-hidden">
              <Image src={Avatar} alt="user avatar" className="w-12 h-12 rounded-full object-cover" />
            </div>
            <div>
              <div className="font-semibold text-foreground">Ari Budin</div>
              <div className="text-xs text-muted-foreground">Web Developer</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.highlight ? "bg-lime-200 text-black hover:bg-lime-300" : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.count && (
                    <span className="ml-auto text-xs bg-white text-black px-2 py-0.5 rounded">{item.count}</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Labels */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs font-semibold text-muted-foreground mb-3">Labels</div>
            <div className="space-y-2">
              {labels.map((label) => (
                <button
                  key={label}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm text-foreground hover:bg-secondary transition-colors"
                >
                  <Tag className="h-4 w-4 text-black" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden md:ml-10">
        {/* Header */}
        <div className="border-b px-4 md:px-8 py-3 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Inbox</h1>

          <div className="flex gap-2">
            {/* Search */}
            <Form {...form}>
              <form className="space-y-0">
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="searchTerm"
                  placeholder="Search characters..."
                  variant="h-[40px] w-full"
                />
              </form>
            </Form>

            {/* Filter Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border  rounded-md  p-2 text-sm bg-white cursor-pointer"
            >
              <option value="">All Status</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>
          </div>
        </div>

        {/* Pagination Controls */}

        <div className="border-b px-4 md:px-8 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Checkbox className="border border-black" />

            {/* 🔁 Refresh Button with Animation */}
            <button
              className="hover:bg-secondary p-1 rounded flex items-center justify-center"
              onClick={() => refetch()}
              title="Refresh"
            >
              <RotateCcw
                className={`w-5 h-5 transition-transform duration-300 ${
                  isFetching ? "animate-spin text-lime-600" : ""
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
              <span className="text-sm font-semibold text-black">
                Page {currentPage} of {data?.info?.pages ?? 1}
              </span>
              <span className="text-xs text-muted-foreground">{data?.info?.count ?? 0} results total</span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 bg-transparent rounded-full border border-black"
                onClick={() => {
                  setCurrentPage((p) => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 bg-transparent rounded-full border border-black"
                onClick={() => {
                  setCurrentPage((p) => (p < (data?.info?.pages ?? 1) ? p + 1 : p));
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                disabled={currentPage >= (data?.info?.pages ?? 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* EMAIL LIST → Now showing characters */}
        <ScrollArea className="">
          {isLoading && <div className="p-6">Loading...</div>}
          {isError && <div className="p-6 text-red-500">Error loading data</div>}
          <div>
            {data?.results?.map((char: any, index: number) => (
              <div
                key={char.id}
                className={`border-b ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100 transition-colors`}
              >
                <div className="px-4 md:px-8 py-4 flex items-center gap-4">
                  <Checkbox
                    className="border border-black"
                    checked={selectedEmails.has(char.id)}
                    onChange={() => toggleEmail(char.id)}
                  />
                  <Image src={char.image} alt={char.name} width={40} height={40} className="rounded-full border" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm md:text-base">{char.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {char.status} / {char.species}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">Location: {char.location?.name}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
