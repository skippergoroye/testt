"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";

const monthlyData = [
  { name: "Jan", value: 10000 },
  { name: "Feb", value: 15000 },
  { name: "Mar", value: 300000 },
  { name: "Apr", value: 450000 },
  { name: "May", value: 600000 },
  { name: "Jun", value: 700000 },
  { name: "Jul", value: 10000 },
  { name: "Aug", value: 80000 },
  { name: "Sep", value: 150000 },
  { name: "Oct", value: 500000 },
  { name: "Nov", value: 700000 },
  { name: "Dec", value: 900000 },
];

const weeklyData = [
  { name: "Mon", value: 5000 },
  { name: "Tue", value: 15000 },
  { name: "Wed", value: 30000 },
  { name: "Thu", value: 45000 },
  { name: "Fri", value: 60000 },
  { name: "Sat", value: 20000 },
  { name: "Sun", value: 10000 },
];

const quarterlyData = [
  { name: "Q1", value: 400000 },
  { name: "Q2", value: 700000 },
  { name: "Q3", value: 350000 },
  { name: "Q4", value: 900000 },
];

const yearlyData = [
  { name: "2021", value: 1000000 },
  { name: "2022", value: 1100000 },
  { name: "2023", value: 1200000 },
];

const todayData = [
  { name: "9 AM", value: 500 },
  { name: "10 AM", value: 200 },
  { name: "11 AM", value: 700 },
  { name: "12 PM", value: 300 },
  { name: "1 PM", value: 600 },
  { name: "2 PM", value: 900 },
];

export default function IncompletePaymentsCard() {
  const [view, setView] = useState("month");

  const chartData = useMemo(() => {
    switch (view) {
      case "today":
        return todayData;
      case "week":
        return weeklyData;
      case "quarter":
        return quarterlyData;
      case "year":
        return yearlyData;
      case "month":
      default:
        return monthlyData;
    }
  }, [view]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Incomplete Payments</h2>
            <p className="text-sm text-muted-foreground">
              Details incomplete migration loan payments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
            <Select value={view} onValueChange={setView}>
              <SelectTrigger className="w-[140px] h-8">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="quarter">Quarter</SelectItem>
                <SelectItem value="year">Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="text-3xl font-bold text-[#0A1440]">$47,000</div>
          <div className="flex items-center text-green-600 font-medium space-x-1 bg-green-100 rounded-md px-2 py-1 text-sm">
            <ArrowUpRight className="w-4 h-4" />
            <span>10.5%</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5DB34D" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#5DB34D" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#5DB34D"
              fillOpacity={1}
              fill="url(#colorValue)"
              dot={{ stroke: "#5DB34D", strokeWidth: 2, r: 3 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}