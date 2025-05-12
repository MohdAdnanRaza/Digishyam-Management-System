// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import {
//   MdAdminPanelSettings,
//   MdKeyboardArrowDown,
//   MdKeyboardArrowUp,
//   MdKeyboardDoubleArrowUp,
// } from "react-icons/md";
// import { FaNewspaper, FaUsers } from "react-icons/fa";
// import { FaArrowsToDot } from "react-icons/fa6";
// import moment from "moment";
// import clsx from "clsx";
// import { Chart } from "../../components/Chart";
// import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../../utils/index";
// import UserInfo from "../../components/UserInfo";
// import AdminNavbar from "./AdminNavbar";
// import API_BASE_URL from "../../config";
// const Dashboard = () => {
//   const [tasks, setTasks] = useState([]);
//   const [summary, setSummary] = useState({});
//   const [users, setUsers] = useState([]);
//   const [clientsSummary, setClientsSummary] = useState({});

//   const ICONS = {
//     high: <MdKeyboardDoubleArrowUp />,
//     medium: <MdKeyboardArrowUp />,
//     low: <MdKeyboardArrowDown />,
//   };

//   // Fetch data from backend
//   const fetchData = async () => {
//     try {
//       const tasksResponse = await axios.get(`${API_BASE_URL}/api/tasks`);
//       const usersResponse = await axios.get(`${API_BASE_URL}/api/auth/team`);

//       const usersData = usersResponse.data || [];
//       setUsers(
//         usersData.filter((user) => user.name && typeof user.name === "string")
//       );
//       const summaryResponse = await axios.get(
//         `${API_BASE_URL}/api/tasks/summary`
//       );
//       console.log("Summary Response:", summaryResponse.data);
//       setTasks(tasksResponse.data);
//       setUsers(usersResponse.data);
//       setSummary(summaryResponse.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const TaskTable = ({ tasks }) => (
//     <div className="w-full md:w-[700px] bg-white px-2 md:px-4 pt-4 pb-4 shadow-md rounded -ml-10 -mt-10">
//       <h4 className="text-lg font-semibold">Task Table</h4>
//       <table className="w-full">
//         <thead className="border-b border-gray-300">
//           <tr className="text-black text-left">
//             <th className="py-2">Task Title</th>
//             <th className="py-2">Stage</th>
//             <th className="py-2">Team</th>
//             <th className="py-2 hidden md:block">Created At</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.map((task) => (
//             <tr
//               key={task._id}
//               className="border-b border-gray-300 text-gray-600 hover:bg-gray-300/10"
//             >
//               <td className="py-2">
//                 <div className="flex items-center gap-2">
//                   <div
//                     className={clsx(
//                       "w-4 h-4 rounded-full",
//                       TASK_TYPE[task.stage]
//                     )}
//                   />
//                   <p className="text-base text-black">{task.title}</p>
//                 </div>
//               </td>
//               <td className="py-2">
//                 <div className="flex gap-1 items-center">
//                   <span className={clsx("text-lg", PRIOTITYSTYELS[task.stage])}>
//                     {ICONS[task.stage]}
//                   </span>
//                   <span className="capitalize">{task.stage}</span>
//                 </div>
//               </td>
//               <td className="py-2">
//                 <div className="flex">
//                   {task.team.map((m, index) => (
//                     <div
//                       key={index}
//                       className={clsx(
//                         "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
//                         BGS[index % BGS.length]
//                       )}
//                     >
//                       <UserInfo user={m} />
//                     </div>
//                   ))}
//                 </div>
//               </td>
//               <td className="py-2 hidden md:block">
//                 <span className="text-base text-gray-600">
//                   {moment(task.createdAt).fromNow()}
//                 </span>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );

//   const UserTable = () => {
//     const [statusFilter, setStatusFilter] = useState("all");
//     const [clients, setClients] = useState([]);

//     useEffect(() => {
//       fetchClients();
//     }, []);

//     const fetchClients = async () => {
//       try {
//         const response = await axios.get(`${API_BASE_URL}/api/clients`);
//         setClients(response.data);
//       } catch (error) {
//         console.error("Error fetching clients:", error);
//       }
//     };

//     // Filter clients based on status
//     const filteredClients = clients.filter((client) =>
//       statusFilter === "all"
//         ? true
//         : statusFilter === "active"
//         ? client.status === "Active"
//         : client.status === "Inactive"
//     );

//     return (
//       <div className="w-full md:w-[350px] bg-white h-fit px-2 md:px-6 py-4 shadow-md rounded -mt-4">
//         <div className="flex justify-between items-center mb-4">
//           <h4 className="text-lg font-semibold">Clients</h4>
//           <select
//             className="border border-gray-300 p-1 rounded"
//             value={statusFilter}
//             onChange={(e) => setStatusFilter(e.target.value)}
//           >
//             <option value="all">All</option>
//             <option value="active">Active</option>
//             <option value="inactive">Inactive</option>
//           </select>
//         </div>

//         <table className="w-full mb-5">
//           <thead className="border-b border-gray-300">
//             <tr className="text-black text-left">
//               <th className="py-2">Full Name</th>
//               <th className="py-2">Status</th>
//               <th className="py-2">Created At</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredClients.map((client, index) => (
//               <tr
//                 key={index}
//                 className="border-b border-gray-200 text-gray-600 hover:bg-gray-400/10"
//               >
//                 <td className="py-2">
//                   <div className="flex items-center gap-3">
//                     <div className="w-9 h-9 rounded-full text-white flex items-center justify-center text-sm bg-violet-700">
//                       <span className="text-center">
//                         {client.name.charAt(0)}
//                       </span>
//                     </div>
//                     <div>
//                       <p>{client.name || "Unknown"}</p>
//                     </div>
//                   </div>
//                 </td>
//                 <td>
//                   <p
//                     className={clsx(
//                       "w-fit px-3 py-1 rounded-full text-sm",
//                       client.status === "Active"
//                         ? "bg-blue-200"
//                         : "bg-yellow-100"
//                     )}
//                   >
//                     {client.status}
//                   </p>
//                 </td>
//                 <td className="py-2 text-sm">
//                   {moment(client.activationDate).fromNow()}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const stats = [
//     {
//       label: "TOTAL TASKS",
//       total: summary.totalTasks || 0,
//       icon: <FaNewspaper />,
//       bg: "bg-[#1d4ed8]",
//     },
//     {
//       label: "COMPLETED TASKS",
//       total: summary.completed || 0,
//       icon: <MdAdminPanelSettings />,
//       bg: "bg-[#0f766e]",
//     },
//     {
//       label: "TASKS IN PROGRESS",
//       total: summary.inProgress || 0,
//       bg: "bg-[#f59e0b]",
//     },
//     {
//       label: "TODOS",
//       total: summary.todo || 0,
//       icon: <FaArrowsToDot />,
//       bg: "bg-[#be185d]",
//     },
//   ];

//   return (
//     <div style={{ position: "absolute", top: "-1147%", left: "-817%" }}>
//       <AdminNavbar />

//       <div className="h-full py-4 mt-40">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
//           {stats.map(({ icon, bg, label, total }, index) => (
//             <div
//               key={index}
//               className="w-[220px] h-32 bg-white p-5 shadow-md rounded-md flex items-center justify-between -mt-40"
//             >
//               <div className="h-full flex flex-1 flex-col justify-between">
//                 <p className="text-base text-gray-600">{label}</p>
//                 <span className="text-2xl font-semibold">{total}</span>
//                 <span className="text-sm text-gray-400">{"This month"}</span>
//               </div>
//               <div
//                 className={clsx(
//                   "w-10 h-10 rounded-full flex items-center justify-center text-white",
//                   bg
//                 )}
//               >
//                 {icon}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="w-[1020px] bg-white my-16 p-4 rounded shadow-sm">
//           <h4 className="text-xl text-gray-600 font-semibold">
//             Chart by Priority
//           </h4>
//           <Chart />
//         </div>

//         <div className="w-full flex flex-col md:flex-row gap-4 2xl:gap-10 py-8 ml-10">
//           <TaskTable tasks={tasks.slice(0, 10)} />
//           <UserTable users={users} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  MdAdminPanelSettings,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdSearch,
  MdRefresh,
} from "react-icons/md";
import { FaNewspaper, FaUsers } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import moment from "moment";
import clsx from "clsx";
import { Chart } from "../../components/Chart";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, getInitials } from "../../utils/index";
import UserInfo from "../../components/UserInfo";
import AdminNavbar from "./AdminNavbar";
import API_BASE_URL from "../../config";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [summary, setSummary] = useState({});
  const [users, setUsers] = useState([]);
  const [clientsSummary, setClientsSummary] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const ICONS = {
    high: <MdKeyboardDoubleArrowUp className="text-red-600" />,
    medium: <MdKeyboardArrowUp className="text-amber-500" />,
    low: <MdKeyboardArrowDown className="text-green-600" />,
  };

  // Fetch data from backend
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const tasksResponse = await axios.get(`${API_BASE_URL}/api/tasks`);
      const usersResponse = await axios.get(`${API_BASE_URL}/api/auth/team`);

      const usersData = usersResponse.data || [];
      setUsers(
        usersData.filter((user) => user.name && typeof user.name === "string")
      );
      const summaryResponse = await axios.get(
        `${API_BASE_URL}/api/tasks/summary`
      );
      setTasks(tasksResponse.data);
      setUsers(usersResponse.data);
      setSummary(summaryResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const TaskTable = ({ tasks }) => (
    <div className="w-full lg:flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h4 className="text-lg font-semibold text-gray-800">Recent Tasks</h4>
        <div className="flex items-center gap-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tasks..."
              className="pl-8 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <MdSearch
              className="absolute left-2 top-2.5 text-gray-400"
              size={20}
            />
          </div>
          <button
            onClick={fetchData}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            <MdRefresh className="text-gray-600" size={20} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-sm text-gray-500">
              <th className="px-6 py-3 font-medium">Task Title</th>
              <th className="px-6 py-3 font-medium">Priority</th>
              <th className="px-6 py-3 font-medium">Team</th>
              <th className="px-6 py-3 font-medium hidden md:table-cell">
                Created
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr
                  key={task._id}
                  className="text-gray-600 hover:bg-blue-50/30 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={clsx(
                          "w-3 h-3 rounded-full",
                          TASK_TYPE[task.stage]
                        )}
                      />
                      <p className="text-sm font-medium text-gray-800">
                        {task.title}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5 items-center">
                      <span className="text-lg">{ICONS[task.stage]}</span>
                      <span className="capitalize text-sm font-medium">
                        {task.stage}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {task.team.map((m, index) => (
                        <div
                          key={index}
                          className={clsx(
                            "w-8 h-8 rounded-full text-white flex items-center justify-center text-sm border-2 border-white",
                            BGS[index % BGS.length]
                          )}
                        >
                          <UserInfo user={m} />
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">
                    <span className="text-sm text-gray-500">
                      {moment(task.createdAt).fromNow()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading tasks...</span>
                    </div>
                  ) : (
                    "No tasks found"
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 flex justify-between items-center border-t border-gray-100">
        <span className="text-sm text-gray-500">
          Showing {tasks.length} of {summary.totalTasks || 0} tasks
        </span>
        <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
          View all tasks →
        </button>
      </div>
    </div>
  );

  const ClientsTable = () => {
    const [statusFilter, setStatusFilter] = useState("all");
    const [clients, setClients] = useState([]);
    const [isLoadingClients, setIsLoadingClients] = useState(true);

    useEffect(() => {
      fetchClients();
    }, []);

    const fetchClients = async () => {
      setIsLoadingClients(true);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/clients`);
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      } finally {
        setIsLoadingClients(false);
      }
    };

    // Filter clients based on status
    const filteredClients = clients.filter((client) =>
      statusFilter === "all"
        ? true
        : statusFilter === "active"
        ? client.status === "Active"
        : client.status === "Inactive"
    );

    return (
      <div className="w-full lg:w-96 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h4 className="text-lg font-semibold text-gray-800">Clients</h4>
          <select
            className="text-sm border border-gray-200 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Clients</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>
        </div>

        <div className="overflow-y-auto max-h-[420px]">
          {isLoadingClients ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <span className="ml-2 text-gray-500">Loading clients...</span>
            </div>
          ) : filteredClients.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredClients.map((client, index) => (
                <div
                  key={index}
                  className="px-6 py-3 hover:bg-gray-50 transition-colors duration-150"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-violet-800 text-white flex items-center justify-center font-medium">
                        {client.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          {client.name || "Unknown"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {moment(client.activationDate).fromNow()}
                        </p>
                      </div>
                    </div>
                    <div>
                      <span
                        className={clsx(
                          "px-2.5 py-1 rounded-full text-xs font-medium",
                          client.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-800"
                        )}
                      >
                        {client.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-8 text-center text-gray-500">
              No clients found
            </div>
          )}
        </div>

        <div className="px-6 py-3 border-t border-gray-100">
          <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors duration-200">
            Add New Client
          </button>
        </div>
      </div>
    );
  };

  const stats = [
    {
      label: "Total Tasks",
      total: summary.totalTasks || 0,
      icon: <FaNewspaper className="text-white" size={18} />,
      bg: "from-blue-600 to-blue-700",
      textColor: "text-blue-600",
    },
    {
      label: "Completed",
      total: summary.completed || 0,
      icon: <MdAdminPanelSettings className="text-white" size={18} />,
      bg: "from-emerald-600 to-emerald-700",
      textColor: "text-emerald-600",
    },
    {
      label: "In Progress",
      total: summary.inProgress || 0,
      icon: <FaUsers className="text-white" size={18} />,
      bg: "from-amber-500 to-amber-600",
      textColor: "text-amber-600",
    },
    {
      label: "To-Do",
      total: summary.todo || 0,
      icon: <FaArrowsToDot className="text-white" size={18} />,
      bg: "from-pink-600 to-pink-700",
      textColor: "text-pink-600",
    },
  ];

  return (
    <div style={{ position: "absolute", top: "-1147%", left: "-817%" }}>
      <div className="min-h-screen bg-gray-50">
        <AdminNavbar />

        <div className="container mx-auto px-4 py-6">
          <header className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">
              Welcome back! Here's what's happening today.
            </p>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
            {stats.map(({ icon, bg, label, total, textColor }, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${bg} flex items-center justify-center`}
                    >
                      {icon}
                    </div>
                    <span className={`text-3xl font-bold ${textColor}`}>
                      {total}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                    {label}
                  </h3>
                  <div className="mt-3 flex items-center text-xs">
                    <span className="inline-flex items-center text-green-600">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        ></path>
                      </svg>
                      12%
                    </span>
                    <span className="text-gray-400 ml-1">vs last month</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Chart Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              Task Analytics by Priority
            </h2>
            <p className="text-sm text-gray-500">
              Breakdown of tasks by priority status
            </p>
          </div>
          <div className="p-4">
            <Chart />
          </div>
        </div>

        {/* Tables Section */}
        <div className="flex flex-col lg:flex-row gap-6">
          <TaskTable tasks={tasks.slice(0, 10)} />
          <ClientsTable />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
