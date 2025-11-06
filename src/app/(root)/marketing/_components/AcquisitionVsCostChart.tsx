// app/components/AcquisitionVsCostChart.tsx
"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

const data = [
  { date: "March 1", acquisition: 200, cost: 1000 },
  { date: "March 2", acquisition: 150, cost: 1800 },
  { date: "March 3", acquisition: 450, cost: 2800 },
  { date: "March 4", acquisition: 500, cost: 3500 },
  { date: "March 5", acquisition: 300, cost: 4200 },
  { date: "March 6", acquisition: 550, cost: 3800 },
  { date: "March 7", acquisition: 400, cost: 2500 },
];

export default function AcquisitionVsCostChart() {
  return (
    <Card className="p-4 shadow-md rounded-2xl w-[500px]">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Acquisition vs Cost
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <defs>
              <linearGradient id="colorAcquisition" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 800]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: "#6b7280", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 6000]}
              tickFormatter={(v) => `$${v}`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "white",
                borderRadius: "0.5rem",
                border: "1px solid #e5e7eb",
              }}
            />
            <Area
              type="monotone"
              dataKey="acquisition"
              stroke="#3b82f6"
              fillOpacity={1}
              fill="url(#colorAcquisition)"
              yAxisId="left"
            />
            <Line
              type="monotone"
              dataKey="cost"
              stroke="#16a34a"
              strokeWidth={3}
              dot={false}
              yAxisId="right"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
