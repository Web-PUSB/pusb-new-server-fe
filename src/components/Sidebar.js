"use client";
import { HiX } from "react-icons/hi";
import React, { useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import SidebarLinks from "./shared/SidebarLinks";
import routes from "../routes";
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        className={`sm:none duration-175 linear fixed !z-50 flex min-h-full flex-col pb-10 shadow-2xl bg-white shadow-white/5 transition-all text-gray-900 md:!z-50 lg:!z-50 xl:!z-0 ${
          open ? "translate-x-0" : "-translate-x-96 xl:translate-x-0"
        }`}
      >
        <span
          className="absolute right-4 top-4 block cursor-pointer xl:hidden"
          onClick={() => setOpen(false)}
        >
          <HiX />
        </span>

        <div className={`mx-[56px] mt-[50px] flex items-center`}>
          <div className="ml-1 mt-1 h-2.5 font-poppins text-[26px] font-bold uppercase text-navy-700">
            PUSB <span className="font-medium">ADMIN</span>
          </div>
        </div>
        <div className="mb-7 mt-[58px] h-px bg-gray-300 " />
        {/* Nav item */}

        <ul className="mb-auto pt-1">
          {/* <Links routes={routes} /> */}
          <SidebarLinks routes={routes} />
        </ul>
      </div>
      <span
        className={`absolute left-[198px] top-[122px]  flex cursor-pointer text-xl text-gray-600 xl:hidden ${
          open ? "z-0" : "z-50"
        }`}
        onClick={() => setOpen(true)}
      >
        <FiAlignJustify className="h-5 w-5" />
      </span>
    </div>
  );
};

export default Sidebar;
