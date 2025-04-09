import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsArrowBarUp } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import Dropdown from "./shared/Dropdown";
import Profile from "../assets/images/profile.png";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/auth/signin");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert("Successfully logged out");
    navigate("/auth/signin");
  };

  const getBrandText = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    return pathSegments[pathSegments.length - 1] || "Dashboard";
  };

  const brandText = getBrandText();

  const getFormattedBrandText = () => {
    switch (brandText) {
      case "pusb":
        return "PUSB Dashboard";
      case "pusb-events":
        return "PUSB Event's";
      case "pusb-news":
        return "PUSB News's";
      case "pusb-cnc":
        return "PUSB CNC's";
      case "pusb-user":
        return "PUSB User's";
      default:
        return brandText;
    }
  };

  const getBrandBreadcrumbText = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const adminIndex = pathSegments.indexOf("admin");
    if (adminIndex !== -1) {
      return pathSegments.slice(adminIndex + 1).join("/") || "Dashboard";
    }
    return "Dashboard";
  };

  return (
    <nav className="sticky top-4 z-40 flex items-center justify-between rounded-xl bg-gray-200 p-2 backdrop-blur-3xl">
      <div className="ml-2">
        <div className="h-6 w-[224px] pt-1">
          <a
            className="text-sm font-normal text-gray-700 hover:underline"
            href={`/admin/${getBrandBreadcrumbText()}`}
          >
            Pages / {getBrandBreadcrumbText()}
          </a>
        </div>
        <p className="text-[33px] capitalize text-gray-700 font-bold">
          <a href={location.pathname || "/admin/dashboard"}>
            {getFormattedBrandText()}
          </a>
        </p>
      </div>

      {user && (
        <div className="flex h-[61px] w-[355px] items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl">
          {/* Search Input */}
          <div className="flex items-center rounded-full bg-gray-100">
            <FiSearch className="h-4 w-4 text-gray-400 ml-3" />
            <input
              type="text"
              placeholder="Search..."
              className="h-full w-full rounded-full bg-gray-100 text-sm font-medium text-gray-700 outline-none px-2"
            />
          </div>

          {/* Notification Dropdown */}
          <Dropdown
            button={<IoMdNotificationsOutline className="h-6 w-6 text-gray-600 cursor-pointer" />}
            classNames="py-2 top-4 -left-[230px] w-max"
          >
            <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl">
              <div className="flex justify-between">
                <p className="text-base font-bold">Notification</p>
                <p className="text-sm font-bold">Mark all read</p>
              </div>
              {/* Sample Notification */}
              <button className="flex w-full items-center">
                <BsArrowBarUp className="text-2xl" />
                <div className="ml-2">
                  <p className="text-base font-bold">New Update: Horizon UI Dashboard PRO</p>
                  <p className="text-xs">A new update for your downloaded item is available!</p>
                </div>
              </button>
            </div>
          </Dropdown>

          {/* Profile Dropdown */}
          <Dropdown
            button={
              <img
                src={Profile}
                alt="Profile"
                className="h-10 w-10 rounded-full border-2 cursor-pointer"
              />
            }
            classNames="py-2 top-8 -left-[180px] w-max"
          >
            <div className="flex flex-col justify-start rounded-[20px] bg-white shadow-xl">
              <div className="ml-4 mt-3">
                <p className="text-sm font-bold">👋 Hey, {user?.name}</p>
              </div>
              <div className="mt-3 h-px w-full bg-gray-200" />
              <div className="flex flex-col">
                <button
                  onClick={handleLogout}
                  className="mt-3 text-sm font-medium text-red-700 hover:text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </Dropdown>
        </div>
      )}
    </nav>
  );
};

export default Header;
