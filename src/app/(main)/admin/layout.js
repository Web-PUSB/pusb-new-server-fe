import React from "react";
import { Outlet } from "react-router-dom";
import NavigationProvider from "./NavigationProvider";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <NavigationProvider>
        <Outlet /> 
      </NavigationProvider>
    </div>
  );
};

export default AdminLayout;
