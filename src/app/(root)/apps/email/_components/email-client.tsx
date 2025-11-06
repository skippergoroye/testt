"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Email {
  id: number
  starred: boolean
  sender: string
  subject: string
  preview: string
  time: string
  hasAttachment: boolean
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
]

const navItems = [
  { icon: "✎", label: "Compose", highlight: true },
  { icon: "📥", label: "Inbox", count: 24 },
  { icon: "⭐", label: "Starred" },
  { icon: "✈️", label: "Sent" },
  { icon: "i", label: "Important" },
  { icon: "📋", label: "Drafts", count: 30 },
  { icon: "🗑️", label: "Trash" },
]

const labels = ["Work", "Family", "Friends", "Office"]

export default function EmailClient() {
  const [selectedEmails, setSelectedEmails] = useState<Set<number>>(new Set())
  const [currentPage, setCurrentPage] = useState(1)

  const toggleEmail = (id: number) => {
    const newSelected = new Set(selectedEmails)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedEmails(newSelected)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 w-56 h-screen bg-white border-r border-border flex flex-col p-6">
        {/* User Profile */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-200 to-orange-300 flex items-center justify-center text-sm font-semibold">
              AB
            </div>
            <div>
              <div className="font-semibold text-foreground">Ari budin</div>
              <div className="text-xs text-muted-foreground">Web developer</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  item.highlight ? "bg-lime-200 text-black hover:bg-lime-300" : "text-foreground hover:bg-secondary"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
                {item.count && (
                  <span className="ml-auto text-xs bg-white text-black px-2 py-0.5 rounded">{item.count}</span>
                )}
              </button>
            ))}
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
                  <span className="text-muted-foreground">🏷️</span>
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main Content */}
      <div className="ml-56 flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-border px-8 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="text-2xl font-semibold text-foreground">Inbox</h1>
          <div className="flex items-center gap-2">
            <Input type="text" placeholder="Search..." className="w-48 h-10" />
          </div>
        </div>

        {/* Pagination */}
        <div className="border-b border-border px-8 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2">
            <Checkbox />
            <button className="hover:bg-secondary p-1 rounded">
              <span className="text-muted-foreground">◯</span>
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">1-15 of 165</span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 bg-transparent"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-8 h-8 p-0 bg-transparent"
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Email List */}
        <ScrollArea className="flex-1 overflow-hidden">
          <div>
            {emailData.map((email, index) => (
              <div key={email.id} className={`border-b border-border ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                <div className="px-8 py-4 flex items-center gap-4 hover:bg-gray-100 transition-colors cursor-pointer">
                  <Checkbox checked={selectedEmails.has(email.id)} onChange={() => toggleEmail(email.id)} />
                  <button
                    className="flex-shrink-0 text-lg hover:scale-125 transition-transform"
                    onClick={() => toggleEmail(email.id)}
                  >
                    {email.starred ? "⭐" : "☆"}
                  </button>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{email.sender}</span>
                      <span className="text-sm text-muted-foreground truncate">{email.subject}</span>
                    </div>
                  </div>
                  {email.hasAttachment && <div className="flex-shrink-0 text-muted-foreground text-sm">📎</div>}
                  <div className="flex-shrink-0 text-sm text-muted-foreground">{email.time}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
