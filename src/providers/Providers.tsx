import React from "react";
import ReduxProvider from "@/redux/ReduxProvider";
import { RefetchProvider } from "@/context/RefetchContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <RefetchProvider>
       {children}
      </RefetchProvider>
    </ReduxProvider>
  );
};

export default Providers;
