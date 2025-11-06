import React from "react";
import { Card } from "@/components/ui/card";
import { Users, Target, Banknote } from "lucide-react";

export default function MarketingStats() {
  const stats = [
    {
      title: "Total Spend",
      value: "$8,765",
      previous: "$10,234",
      progress: "+14.22%",
      progressColor: "text-[#7ccf00]",
      icon: Banknote,
      iconBg: "bg-green-100",
      iconColor: "text-[#7ccf00]",
    },
    {
      title: "Visitor",
      value: "14,321",
      previous: "12,543",
      progress: "+14.32%",
      progressColor: "text-[#7ccf00]",
      icon: Users,
      iconBg: "bg-green-100",
      iconColor: "text-[#7ccf00]",
    },
    {
      title: "Acquisition",
      value: "1,023",
      previous: "870",
      progress: "+18.73%",
      progressColor: "text-[#7ccf00]",
      icon: Target,
      iconBg: "bg-green-100",
      iconColor: "text-[#7ccf00]",
    },
    {
      title: "Revenue",
      value: "$18,765",
      previous: "$15,432",
      progress: "+21.61%",
      progressColor: "text-[#7ccf00]",
      icon: Banknote,
      iconBg: "bg-green-100",
      iconColor: "text-[#7ccf00]",
    },
  ];

  return (
    <main className="">
      <div className=" mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="px-3 border-2 border-black w-[255px] rounded-[6px] bg-white">
                <div className="flex justify-between w-full">
                  <div className="flex flex-col w-full">
                    <p className="text-sm text-muted-foreground mb-2">{stat.title}</p>
                    <div className="flex justify-between">
                      <h3 className="text-3xl font-bold text-foreground mb-4">{stat.value}</h3>
                      <div className="p-3 rounded-lg -mt-8">
                        <Icon className={`w-8 h-8 ${stat.iconColor}`} />
                      </div>
                    </div>

                    {/* Fixed width spacing */}
                    <div className="flex flex-row justify-between w-full -mt-4">
                      <div className="flex flex-col">
                        <span className="text-xs text-muted-foreground">Previous</span>
                        <span className="text-sm font-medium text-foreground">{stat.previous}</span>
                      </div>
                      <div className="flex flex-col ml-10 items-end">
                        <span className="text-xs text-muted-foreground">Progress</span>
                        <span className={`text-sm font-medium ${stat.progressColor}`}>{stat.progress}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
