"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import Avatar from "../../../../../../public/images/avater.jpg";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { SearchTermSchema } from "@/lib/schemas";
import CustomFormField, {
  FormFieldType,
} from "@/components/shared/CustomFormField";

interface Email {
  id: number;
  starred: boolean;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  hasAttachment: boolean;
}

const emailData: Email[] = [
  {
    id: 1,
    starred: true,
    sender: "Nuno Affiliate",
    subject: "Your application to the Nuno Affiliate Network...",
    preview: "",
    time: "8:27 AM",
    hasAttachment: false,
  },
  {
    id: 2,
    starred: true,
    sender: "Michael Adams",
    subject: "Invitation to the company anniversary party...",
    preview: "",
    time: "5:17 AM",
    hasAttachment: true,
  },
  {
    id: 3,
    starred: true,
    sender: "Bunny Cms",
    subject: "Added a new features: Dinamic database...",
    preview: "",
    time: "3:14 AM",
    hasAttachment: false,
  },
  {
    id: 4,
    starred: true,
    sender: "Giant Seo",
    subject: "Ranking 1st in organic and Local Pack SERPs...",
    preview: "",
    time: "2:15 AM",
    hasAttachment: false,
  },
  {
    id: 5,
    starred: false,
    sender: "Tailwind Market",
    subject: "New sale of Dashmater - Tailwind Dashboard for $29",
    preview: "",
    time: "1:27 AM",
    hasAttachment: false,
  },
  {
    id: 6,
    starred: false,
    sender: "Tailwind Market",
    subject: "New sale of Dashmater - Tailwind Dashboard for $29",
    preview: "",
    time: "Yesterday",
    hasAttachment: false,
  },
  {
    id: 7,
    starred: false,
    sender: "Tailwind Market",
    subject: "New sale of Dashmater - Tailwind Dashboard for $29",
    preview: "",
    time: "Yesterday",
    hasAttachment: false,
  },
  {
    id: 8,
    starred: false,
    sender: "Tailwind Market",
    subject: "New sale of Dashmater - Tailwind Dashboard for $29",
    preview: "",
    time: "Yesterday",
    hasAttachment: true,
  },
  {
    id: 9,
    starred: false,
    sender: "Tailwind Market",
    subject: "New sale of Dashmater - Tailwind Dashboard for $29",
    preview: "",
    time: "Yesterday",
    hasAttachment: false,
  },
  {
    id: 10,
    starred: false,
    sender: "Tailwind Market",
    subject: "New sale of Dashmater - Tailwind Dashboard for $29",
    preview: "",
    time: "Yesterday",
    hasAttachment: false,
  },
  {
    id: 11,
    starred: true,
    sender: "Stock image",
    subject: "How did you use these downloads?",
    preview: "",
    time: "Yesterday",
    hasAttachment: false,
  },
  {
    id: 12,
    starred: true,
    sender: "Stock image",
    subject: "How did you use these downloads?",
    preview: "",
    time: "Yesterday",
    hasAttachment: false,
  },
  {
    id: 13,
    starred: true,
    sender: "Stock image",
    subject: "How did you use these downloads?",
    preview: "",
    time: "June 12",
    hasAttachment: false,
  },
  {
    id: 14,
    starred: true,
    sender: "Stock image",
    subject: "How did you use these downloads?",
    preview: "",
    time: "June 11",
    hasAttachment: false,
  },
  {
    id: 15,
    starred: true,
    sender: "Stock image",
    subject: "How did you use these downloads?",
    preview: "",
    time: "June 11",
    hasAttachment: false,
  },
];

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

  const toggleEmail = (id: number) => {
    const newSelected = new Set(selectedEmails);
    newSelected.has(id) ? newSelected.delete(id) : newSelected.add(id);
    setSelectedEmails(newSelected);
  };

  const form = useForm<z.infer<typeof SearchTermSchema>>({
    resolver: zodResolver(SearchTermSchema),
    defaultValues: { searchTerm: "" },
  });

  const onSubmit = async () => {};

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
          <Button
            variant="outline"
            size="sm"
            className="border border-black"
            onClick={() => setSidebarOpen(false)}
          >
            Close
          </Button>
        </div>

        {/* User Profile */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 border border-black rounded-full overflow-hidden">
              <Image
                src={Avatar}
                alt="user avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
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
                    item.highlight
                      ? "bg-lime-200 text-black hover:bg-lime-300"
                      : "text-foreground hover:bg-secondary"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.count && (
                    <span className="ml-auto text-xs bg-white text-black px-2 py-0.5 rounded">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Labels */}
          <div className="mt-6 pt-4 border-t border-border">
            <div className="text-xs font-semibold text-muted-foreground mb-3">
              Labels
            </div>
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

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden md:ml-10">
        {/* Header */}
        <div className="border-b border-border px-4 md:px-8 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden border border-black"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl md:text-2xl font-semibold text-foreground">
              Inbox
            </h1>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 w-1/2 md:w-1/3">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-0"
              >
                <CustomFormField
                  fieldType={FormFieldType.INPUT}
                  control={form.control}
                  name="searchTerm"
                  placeholder="Search..."
                  variant="h-[40px] w-full"
                />
              </form>
            </Form>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="border-b border-border px-4 md:px-8 py-3 flex flex-wrap items-center justify-between gap-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <Checkbox className="border border-black" />
            <button className="hover:bg-secondary p-1 rounded">
              <RotateCcw />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-black font-semibold">
              1-15 of 165
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 bg-transparent rounded-full border border-black"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 bg-transparent rounded-full border border-black"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* EMAIL LIST */}
        <ScrollArea className="">
          <div>
            {emailData.map((email, index) => (
              <div
                key={email.id}
                className={`border-b border-border ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <div className="px-4 md:px-8 py-4 flex items-center gap-3 md:gap-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Checkbox
                    className="border border-black"
                    checked={selectedEmails.has(email.id)}
                    onChange={() => toggleEmail(email.id)}
                  />
                  <button
                    className="flex-shrink-0 text-lg hover:scale-125 transition-transform"
                    onClick={() => toggleEmail(email.id)}
                  >
                    {email.starred ? "⭐" : "☆"}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                      <span className="font-medium text-foreground text-sm md:text-base">
                        {email.sender}
                      </span>
                      <span className="text-xs md:text-sm text-muted-foreground truncate">
                        {email.subject}
                      </span>
                    </div>
                  </div>
                  {email.hasAttachment && (
                    <div className="flex-shrink-0 text-muted-foreground text-sm">
                      📎
                    </div>
                  )}
                  <div className="flex-shrink-0 text-xs md:text-sm text-muted-foreground">
                    {email.time}
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





