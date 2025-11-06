"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  { date: "March 1", segment1: 60, segment2: 45, segment3: 35, segment4: 15 },
  { date: "March 2", segment1: 50, segment2: 30, segment3: 25, segment4: 15 },
  { date: "March 3", segment1: 55, segment2: 35, segment3: 25, segment4: 10 },
  { date: "March 4", segment1: 70, segment2: 50, segment3: 40, segment4: 25 },
  { date: "March 5", segment1: 60, segment2: 40, segment3: 35, segment4: 20 },
  { date: "March 6", segment1: 55, segment2: 38, segment3: 32, segment4: 18 },
  { date: "March 7", segment1: 60, segment2: 42, segment3: 28, segment4: 15 },
]

export default function TrafficSource() {
  return (
    <div className="w-full">
      <Card className="w-[525px]  border-2 border-black rounded-[6px]">
        <CardHeader>
          <CardTitle>Traffic Source</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="0" stroke="#e5e7eb" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 200]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="segment1" stackId="a" fill="#86efac" />
              <Bar dataKey="segment2" stackId="a" fill="#4ade80" />
              <Bar dataKey="segment3" stackId="a" fill="#22c55e" />
              <Bar dataKey="segment4" stackId="a" fill="#16a34a" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}

