// Layout components
import React from "react";
import NavigationProvider from "./NavigationProvider";
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full">
      <NavigationProvider>{children}</NavigationProvider>
    </div>
  );
}
