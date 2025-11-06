"use client"
import MobileNav from "@/components/dashboard/MobileNav";
import NavProfile from "@/components/dashboard/NavProfile";
import PathnameDisplay from "@/components/dashboard/PathnameDisplay";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar"
import { notificationsData } from "@/constants";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
     <SidebarProvider className="border-r-2 border-black">
       <main className="flex w-screen h-screen font-inter no-scrollbar">
        <div className="h-full sticky top-0 bg-[#f5f5f5]">
          <AppSidebar />
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-16 w-full flex items-center justify-between  p-5  sm:p-8  border-b-3 border-black bg-[#f5f5f5] z-50">
            <PathnameDisplay />
            <MobileNav />
               <NavProfile  data={notificationsData} className="lg:flex space-x-4 hidden"  />
          </div>

          <div className="flex-1 overflow-auto no-scrollbar px-8 py-6 bg-[#f5f5f5] relative">
            {children}
          </div>
        </div>
      </main>

     </SidebarProvider>
     
  );
}
