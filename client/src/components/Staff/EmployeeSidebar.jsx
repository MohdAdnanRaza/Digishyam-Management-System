import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaBuilding,
  FaCogs,
  FaMoneyBillWave,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { TbReportAnalytics } from "react-icons/tb";
const EmployeeSidebar = () => {
  return (
    <div className="bg-gray-800 text-white h-screen fixed left-0 top-0 bottom-0 space-y-2 w-64">
      <div className="bg-teal-600 h-12 flex items-center justify-center">
        <h3 className="text-2xl text-center font-pacific">Employee</h3>
      </div>
      <div className="px-4">
        <NavLink
          to="/staff"
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500 " : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to={`profile`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500 " : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaUsers />
          <span>My Profile</span>
        </NavLink>
        <NavLink
          to={`report`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500 " : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <TbReportAnalytics />
          <span>Work Report</span>
        </NavLink>
        <NavLink
          to={`leave`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500 " : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaBuilding />
          <span>Leaves</span>
        </NavLink>

        <NavLink
          to={`setting`}
          className={({ isActive }) =>
            `${
              isActive ? "bg-teal-500 " : " "
            } flex items-center space-x-4  py-2.5 px-4 rounded`
          }
        >
          <FaCogs />
          <span>Settings</span>
        </NavLink>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
