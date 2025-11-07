import React from "react";
import MarketingStats from "./_components/marketing-stats";
import TrafficSource from "./_components/traffic-source";
import { BudgetByPlatform } from "./_components/budget-by-platform";
import AcquisitionChart from "./_components/acquisition-chart";
import MarketingTabs from "./_components/marketing-tabs";

const Marketing = () => {
  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold">Marketing</h1>
       <MarketingTabs />
      </div>

      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mt-8">
        <div className="w-full lg:w-1/2">
          <MarketingStats />
        </div>
        <div className="w-full lg:w-1/2">
          <AcquisitionChart />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-4 mt-10">
        <div className="w-full lg:w-1/2">
          <TrafficSource />
        </div>
        <div className="w-full lg:w-1/2">
          <BudgetByPlatform />
        </div>
      </div>
    </div>
  );
};

export default Marketing;

