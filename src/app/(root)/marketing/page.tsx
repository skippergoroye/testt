import React from "react";
import MarketingStats from "./_components/marketing-stats";
import AcquisitionVsCostChart from "./_components/AcquisitionVsCostChart";
import TrafficSource from "./_components/traffic-source";

const Marketing = () => {
  return (
    <div>
      <div className="flex justify-between">
        <h1>Marketing</h1>
        <h1>Marketing</h1>
      </div>
      <div className="flex justify-between gap-2 mt-8">
        <MarketingStats />

        {/* <AcquisitionVsCostChart /> */}
      </div>

      <div className="flex justify-between gap-5 mt-10">
        <TrafficSource />
        <TrafficSource />

        {/* <AcquisitionVsCostChart /> */}
      </div>
    </div>
  );
};

export default Marketing;
