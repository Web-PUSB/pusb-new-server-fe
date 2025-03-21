"use client";
import React, { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import Dropdown from "./shared/Dropdown";
import { FiSearch } from "react-icons/fi";
import { BsArrowBarUp } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Profile from "../../public/images/profile.png";
import { redirect } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session?.user) {
      redirect("/auth/signin");
    }
  }, [status, session]);

  const handleLogout = async () => {
    try {
      const response = await signOut();
      if (response) {
        alert("sucessfully logout");
        router.push("/auth/signin");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBrandText = () => {
    const pathSegments = pathname?.split("/").filter(Boolean);
    return pathSegments?.[pathSegments.length - 1] || "Dashboard";
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

  const getBrandBreadcumbsText = () => {
    if (!pathname) return "Dashboard";

    const pathSegments = pathname.split("/").filter(Boolean);
    const adminIndex = pathSegments.indexOf("admin");

    if (adminIndex !== -1) {
      return pathSegments.slice(adminIndex + 1).join("/") || "Dashboard";
    }

    return "Dashboard";
  };

  return (
    <nav className="sticky top-4 z-40 flex flex-row flex-wrap items-center justify-between rounded-xl bg-gray-200 p-2 backdrop-blur-3xl">
      <>
        <div className="ml-[6px]">
          <div className="h-6 w-[224px] pt-1">
            <Link
              className="text-sm font-normal text-gray-700 hover:underline"
              href={`/admin/${getBrandBreadcumbsText()}`}
            >
              Pages
              <span className="mx-1 text-sm text-gray-700">
                / {getBrandBreadcumbsText()}{" "}
              </span>
            </Link>
          </div>
          <p className="shrink text-[33px] capitalize text-gray-700 ">
            <Link
              href={pathname || "/admin/dashboard"}
              className="font-bold capitalize hover:text-gray-700"
            >
              {getFormattedBrandText()}
            </Link>
          </p>
        </div>
        {session?.user && (
          <div className="relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 rounded-full bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
            <div className="flex h-full items-center rounded-full bg-gray-100 text-gray-700 dark:bg-navy-900 xl:w-[225px]">
              <p className="pl-3 pr-2 text-xl">
                <FiSearch className="h-4 w-4 text-gray-400" />
              </p>
              <input
                type="text"
                placeholder="Search..."
                className="block h-full w-full rounded-full text-sm font-medium text-gray-700 outline-none bg-gray-100 placeholder:!text-gray-400 dark:bg-navy-900 sm:w-fit"
              />
            </div>
            <span className="flex cursor-pointer text-xl text-gray-600  xl:hidden h-5 w-5"></span>

            <Dropdown
              button={
                <p className="cursor-pointer">
                  <IoMdNotificationsOutline className="h-6 w-6 text-gray-600" />
                </p>
              }
              animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
              classNames={"py-2 top-4 -left-[230px] md:-left-[440px] w-max"}
            >
              <div className="flex w-[360px] flex-col gap-3 rounded-[20px] bg-white p-4 shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none sm:w-[460px]">
                <div className="flex items-center justify-between">
                  <p className="text-base font-bold text-gray-700">
                    Notification
                  </p>
                  <p className="text-sm font-bold text-gray-700">
                    Mark all read
                  </p>
                </div>

                <button className="flex w-full items-center">
                  <div className="flex h-full w-[85px] items-center justify-center rounded-xl py-4 text-2xl text-white">
                    <BsArrowBarUp />
                  </div>
                  <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                    <p className="mb-1 text-left text-base font-bold text-gray-900">
                      New Update: Horizon UI Dashboard PRO
                    </p>
                    <p className="font-base text-left text-xs text-gray-900">
                      A new update for your downloaded item is available!
                    </p>
                  </div>
                </button>

                <button className="flex w-full items-center">
                  <div className="flex h-full w-[85px] items-center justify-center rounded-xl py-4 text-2xl text-white">
                    <BsArrowBarUp />
                  </div>
                  <div className="ml-2 flex h-full w-full flex-col justify-center rounded-lg px-1 text-sm">
                    <p className="mb-1 text-left text-base font-bold text-gray-900">
                      New Update: Horizon UI Dashboard PRO
                    </p>
                    <p className="font-base text-left text-xs text-gray-900">
                      A new update for your downloaded item is available!
                    </p>
                  </div>
                </button>
              </div>
            </Dropdown>

            <Dropdown
              button={
                <Image
                  width="500"
                  height="500"
                  className="h-10 w-10 rounded-full border-2 cursor-pointer"
                  src={Profile}
                  alt="Profile Picture"
                />
              }
              classNames={"py-2 top-8 -left-[180px] w-max"}
            >
              <div className="flex h-24 w-56 flex-col justify-start rounded-[20px] bg-white bg-cover bg-no-repeat shadow-xl shadow-shadow-500 dark:!bg-navy-700 dark:shadow-none">
                <div className="ml-4 mt-3">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold text-gray-700">
                      👋 Hey, {session?.user?.name}
                    </p>{" "}
                  </div>
                </div>
                <div className="mt-3 h-px w-full bg-gray-200 dark:bg-white/20 " />
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
      </>
    </nav>
  );
};

export default Header;
