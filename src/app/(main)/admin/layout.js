import React from "react";
import NavigationProvider from "./NavigationProvider";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-full w-full">
      <NavigationProvider>{children}</NavigationProvider>
    </div>
  );
}
