import React from "react";
import Header from "@/pusb-admin/components/Header";
import Sidebar from "@/pusb-admin/components/Sidebar";
import Footer from "@/pusb-admin/components/Footer";
const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Sidebar />
      <div className="h-full w-full bg-gray-100">
        <main
          className={`mx-2.5  flex-none transition-all 
              md:pr-2 xl:ml-[323px]`}
        >
          <div>
            <Header />
            <div className="mx-auto min-h-screen p-2 !pt-[20px] md:p-2 text-black">
              {children}
            </div>
            <div className="p-3">
              <Footer />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default NavigationProvider;
