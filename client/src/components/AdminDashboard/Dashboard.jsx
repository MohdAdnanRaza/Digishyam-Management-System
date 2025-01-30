import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import clsx from "clsx";
import { Chart } from "../../components/Chart";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../../utils/index";
import UserInfo from "../../components/UserInfo";
import AdminNavbar from "./AdminNavbar";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({});
  const [users, setUsers] = useState([]);

  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  // Fetch data from backend
  const fetchData = async () => {
    try {
      const tasksResponse = await axios.get("http://localhost:4000/api/tasks");
      const usersResponse = await axios.get(
        "http://localhost:4000/api/auth/team"
      );
      const summaryResponse = await axios.get(
        "http://localhost:4000/api/tasks/summary"
      );
      console.log("Summary Response:", summaryResponse.data);
      setTasks(tasksResponse.data);
      setUsers(usersResponse.data);
      setSummary(summaryResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const TaskTable = ({ tasks }) => (
    <div className="w-full md:w-[700px] bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded -ml-10 -mt-10">
      <table className="w-full">
        <thead className="border-b border-gray-300">
          <tr className="text-black text-left">
            <th className="py-2">Task Title</th>
            <th className="py-2">Priority</th>
            <th className="py-2">Team</th>
            <th className="py-2 hidden md:block">Created At</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task._id}
              className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10"
            >
              <td className="py-2">
                <div className="flex items-center gap-2">
                  <div
                    className={clsx(
                      "w-4 h-4 rounded-full",
                      TASK_TYPE[task.stage]
                    )}
                  />
                  <p className="text-base text-black">{task.title}</p>
                </div>
              </td>
              <td className="py-2">
                <div className="flex gap-1 items-center">
                  <span
                    className={clsx("text-lg", PRIOTITYSTYELS[task.priority])}
                  >
                    {ICONS[task.priority]}
                  </span>
                  <span className="capitalize">{task.priority}</span>
                </div>
              </td>
              <td className="py-2">
                <div className="flex">
                  {task.team.map((m, index) => (
                    <div
                      key={index}
                      className={clsx(
                        "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                        BGS[index % BGS.length]
                      )}
                    >
                      <UserInfo user={m} />
                    </div>
                  ))}
                </div>
              </td>
              <td className="py-2 hidden md:block">
                <span className="text-base text-gray-600">
                  {moment(task.date).fromNow()}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const UserTable = ({ users }) => (
    <div className="w-full md:w-[350px] bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded -mt-4">
      <table className="w-full mb-5">
        <thead className="border-b border-gray-300">
          <tr className="text-black text-left">
            <th className="py-2">Full Name</th>
            <th className="py-2">Status</th>
            <th className="py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10"
            >
              <td className="py-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
                    <span className="text-center">
                      {getInitials(user.name)}
                    </span>
                  </div>
                  <div>
                    <p>{user.name}</p>
                    <span className="text-xs text-black">{user.role}</span>
                  </div>
                </div>
              </td>
              <td>
                <p
                  className={clsx(
                    "w-fit px-3 py-1 rounded-full text-sm",
                    user.isActive ? "bg-blue-200" : "bg-yellow-100"
                  )}
                >
                  {user.isActive ? "Active" : "Disabled"}
                </p>
              </td>
              <td className="py-2 text-sm">
                {moment(user.createdAt).fromNow()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const stats = [
    {
      label: "TOTAL TASKS",
      total: summary.totalTasks || 0,
      icon: <FaNewspaper />,
      bg: "bg-[#1d4ed8]",
    },
    {
      label: "COMPLETED TASKS",
      total: summary.completed || 0,
      icon: <MdAdminPanelSettings />,
      bg: "bg-[#0f766e]",
    },
    {
      label: "TASKS IN PROGRESS",
      total: summary.inProgress || 0,
      bg: "bg-[#f59e0b]",
    },
    {
      label: "TODOS",
      total: summary.todo || 0,
      icon: <FaArrowsToDot />,
      bg: "bg-[#be185d]",
    },
  ];

  return (
    <div style={{ position: "absolute", top: "-1147%", left: "-817%" }}>
      <AdminNavbar />

      <div className="h-full py-4 mt-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {stats.map(({ icon, bg, label, total }, index) => (
            <div
              key={index}
              className="w-[220px] h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between -mt-40"
            >
              <div className="h-full flex flex-1 flex-col justify-between">
                <p className="text-base text-gray-600">{label}</p>
                <span className="text-2xl font-semibold">{total}</span>
                <span className="text-sm text-gray-400">{"This month"}</span>
              </div>
              <div
                className={clsx(
                  "w-10 h-10 rounded-full flex items-center justify-center text-white",
                  bg
                )}
              >
                {icon}
              </div>
            </div>
          ))}
        </div>

        <div className="w-[1020px] bg-white my-16 p-4 rounded shadow-sm">
          <h4 className="text-xl text-gray-600 font-semibold">
            Chart by Priority
          </h4>
          <Chart />
        </div>

        <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8 ml-10">
          <TaskTable tasks={tasks.slice(0, 10)} />
          <UserTable users={users} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
