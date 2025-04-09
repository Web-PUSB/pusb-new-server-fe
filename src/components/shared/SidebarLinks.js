import React, { useCallback } from "react";
import { MdDashboard } from "react-icons/md";
import PropTypes from "prop-types";

const SidebarLinks = ({ routes }) => {
  const pathname = window.location.pathname || "";

  const activeRoute = useCallback(
    (routeName) => {
      const regex = new RegExp(`^/admin/${routeName}(?:$|/)`);
      return regex.test(pathname);
    },
    [pathname]
  );

  const createLinks = (routes) => {
    return routes.map((route, index) => (
      <a key={index} href={`/admin/${route.path}`}>
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
      </a>
    ));
  };

  return <ul>{createLinks(routes)}</ul>;
};

SidebarLinks.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      icon: PropTypes.element, 
    })
  ).isRequired,
};

export default SidebarLinks;
