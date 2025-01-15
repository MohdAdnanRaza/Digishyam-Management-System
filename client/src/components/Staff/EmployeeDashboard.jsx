import React from "react";
import EmployeeNavbar from "./EmployeeNavbar";
import EmployeeSidebar from "./EmployeeSidebar";
import { Outlet } from "react-router-dom";

const EmployeeDashboard = () => {
  return (
    <div>
      <EmployeeSidebar />
      <div style={{ position: "absolute", left: "20.4%", top: "-1%" }}>
        <EmployeeNavbar />
        <Outlet />
      </div>
    </div>
  );
};

export default EmployeeDashboard;
