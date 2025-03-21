import React from "react";

import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
} from "react-icons/md";

const routes = [
  {
    name: "PUSB Dashboard",
    path: "pusb",
    icon: <MdHome className="h-6 w-6" />,
  },
  {
    name: "PUSB Event",
    path: "pusb-events",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  },
  {
    name: "PUSB Profile",
    path: "pusb-profile",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  },
  {
    name: "PUSB CnC",
    path: "pusb-cnc",
    icon: <MdBarChart className="h-6 w-6" />,
  },
  {
    name: "PUSB News",
    path: "pusb-news",
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: "PUSB Structure",
    path: "pusb-structure",
    icon: <MdPerson className="h-6 w-6" />,
  },
  {
    name: "PUSB Users",
    path: "pusb-user",
    icon: <MdPerson className="h-6 w-6" />,
  },
];
export default routes;
