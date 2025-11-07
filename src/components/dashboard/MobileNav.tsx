"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Briefcase,
  FolderOpen,
  Users,
  Smartphone,
  FileText,
  Box,
  FileJson,
  BookOpen,
  ChevronDown,
  Megaphone,
  ArrowRight,
  Menu,
} from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const menuItems = [
  { label: "Marketing", icon: Megaphone },
  { label: "Analytics", icon: BarChart3 },
  { label: "Business", icon: Briefcase },
  { label: "Project", icon: FolderOpen },
  { label: "HRM", icon: Users },
  { label: "Mobile App", icon: Smartphone },
  { label: "Landingpage", icon: FileText },
];

const collapsibleItems = [
  { label: "Components", icon: Box },
  { label: "Pages", icon: FileJson },
  { label: "Apps", icon: Briefcase },
  { label: "Content", icon: FileText },
  { label: "Users", icon: Users },
  { label: "Documentation", icon: BookOpen },
];

export default function MobileNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const createSlug = (label: string) =>
    label.toLowerCase().replace(/\s+/g, "-");

  const handleSubItemClick = (label: string) => {
    router.push(`/${createSlug(label)}/all`);
  };

  useEffect(() => {
    setExpandedItems((prev) => {
      const updated = [...prev];
      collapsibleItems.forEach((item) => {
        const slug = createSlug(item.label);
        const onItemPath =
          pathname === `/${slug}` || pathname.startsWith(`/${slug}/`);
        if (onItemPath && !updated.includes(item.label)) {
          updated.push(item.label);
        }
      });
      return updated;
    });
  }, [pathname]);

  const appsSubItems = [
    { label: "Calendar", path: "calendar" },
    { label: "Email", path: "email" },
    { label: "Invoice", path: "invoice" },
    { label: "Charts", path: "charts" },
    { label: "Widgets", path: "widgets" },
  ];

  return (
    <section className="lg:hidden">
      <Sheet>
        {/* Trigger button */}
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center justify-center"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>

        {/* Sheet content */}
        <SheetContent
          side="left"
          className="w-[280px] border-none bg-[#f5f5f5] p-4"
        >
          {/* Header / Logo */}
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-lime-400 font-bold text-black">
              B
            </div>
            <span className="text-lg font-bold text-foreground">
              rutalism
            </span>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-6 overflow-y-auto">
            {/* Primary menu */}
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const slug = createSlug(item.label);
                const isActive = pathname === `/${slug}`;
                return (
                  <SheetClose asChild key={item.label}>
                    <button
                      onClick={() => router.push(`/${slug}`)}
                      className={`flex items-center gap-3 rounded px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? "bg-white border-2 border-black text-foreground"
                          : "text-foreground hover:bg-white"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </button>
                  </SheetClose>
                );
              })}
            </nav>

            {/* Collapsible items */}
            <nav className="flex flex-col gap-1">
              {collapsibleItems.map((item) => {
                const Icon = item.icon;
                const slug = createSlug(item.label);
                const isExpanded = expandedItems.includes(item.label);
                const isActive = pathname === `/${slug}`;
                const onItemPath =
                  pathname === `/${slug}` || pathname.startsWith(`/${slug}/`);
                return (
                  <Collapsible
                    key={item.label}
                    open={isExpanded}
                    onOpenChange={(open) => {
                      if (!open && onItemPath) return;
                      setExpandedItems((prev) =>
                        open
                          ? [...prev, item.label].filter(
                              (v, i, a) => a.indexOf(v) === i
                            )
                          : prev.filter((i) => i !== item.label)
                      );
                    }}
                  >
                    <CollapsibleTrigger asChild>
                      <button
                        className={`flex w-full items-center justify-between rounded px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                          isActive
                            ? "bg-white border border-black text-foreground"
                            : "text-foreground hover:bg-white"
                        }`}
                      >
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(`/${slug}`);
                          }}
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <Icon className="h-4 w-4" />
                          {item.label}
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </CollapsibleTrigger>

                    <CollapsibleContent className="ml-4 border-l border-border py-1 space-y-1">
                      {item.label === "Apps" ? (
                        appsSubItems.map((subItem) => {
                          const subPath = `apps/${subItem.path}`;
                          const isSubActive = pathname === `/${subPath}`;
                          return (
                            <SheetClose asChild key={subItem.label}>
                              <button
                                onClick={() => router.push(`/${subPath}`)}
                                className={`block w-full rounded px-3 py-2 text-sm transition-colors cursor-pointer ${
                                  isSubActive
                                    ? "bg-white border border-black text-foreground"
                                    : "text-muted-foreground hover:bg-white"
                                }`}
                              >
                                {subItem.label}
                              </button>
                            </SheetClose>
                          );
                        })
                      ) : (
                        <SheetClose asChild>
                          <button
                            onClick={() => handleSubItemClick(item.label)}
                            className={`block w-full rounded px-3 py-2 text-sm transition-colors cursor-pointer ${
                              pathname === `/${slug}/all`
                                ? "bg-white border border-black text-foreground"
                                : "text-muted-foreground hover:bg-white"
                            }`}
                          >
                            All {item.label}
                          </button>
                        </SheetClose>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}
            </nav>
          </div>

          {/* Footer */}
          <div className="mt-6 border-t border-black pt-4">
            <div className="rounded border-2 border-black bg-white p-4">
              <h3 className="text-sm font-bold text-foreground">
                Upgrade to Pro
              </h3>
              <p className="mt-2 text-xs text-muted-foreground">
                Get more features with our Pro version.
              </p>
              <Button className="mt-4 w-full gap-2 bg-lime-400 text-black hover:bg-lime-500">
                <ArrowRight className="h-4 w-4" />
                Upgrade Now
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}
