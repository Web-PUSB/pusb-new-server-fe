/* eslint-disable */
import React, { useCallback } from "react";
import { usePathname } from "next/navigation";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import { RoutesType } from "@/pusb-admin/types/route";

export const SidebarLinks = (props: { routes: RoutesType[] }): JSX.Element => {
  const pathname = usePathname() || "";
  const { routes } = props;

  const activeRoute = useCallback(
    (routeName: string) => {
      const regex = new RegExp(`^/admin/${routeName}(?:$|/)`);
      return regex.test(pathname);
    },
    [pathname],
  );

  const createLinks = (routes: RoutesType[]) => {
    return routes.map((route, index) => (
      <Link key={index} href={"/admin/" + route.path}>
        <div
          className={`relative py-3 flex hover:cursor-pointer ${
            activeRoute(route.path) ? "bg-gray-200" : "bg-white"
          }`}
        >
          <li
            className={`my-[3px] flex cursor-pointer items-center px-8 leading-1`}
            key={index}
          >
            <span
              className={`${
                activeRoute(route.path)
                  ? "font-bold text-blue-800"
                  : "font-medium text-gray-600"
              }`}
            >
              {route.icon ? route.icon : <MdDashboard />}
            </span>
            <p
              className={`leading-1 ml-4 flex ${
                activeRoute(route.path)
                  ? "font-bold text-navy-700"
                  : "font-medium text-gray-700"
              }`}
            >
              {route.name}
            </p>
          </li>
          {activeRoute(route.path) ? (
            <div className="absolute right-0 top-px h-full py-6 w-1 rounded-lg bg-brand-500 dark:bg-brand-400" />
          ) : null}
        </div>
      </Link>
    ));
  };

  return <>{createLinks(routes)}</>;
};

export default SidebarLinks;
