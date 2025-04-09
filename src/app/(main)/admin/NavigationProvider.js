import React from "react";
import PropTypes from "prop-types";
import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";
import Footer from "../../../components/Footer";

const NavigationProvider = ({ children }) => {
  return (
    <>
      <Sidebar />
      <div className="h-full w-full bg-gray-100">
        <main
          className={`mx-2.5 flex-none transition-all 
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

NavigationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavigationProvider;
