// import React, { useState } from "react";
// import { FaList } from "react-icons/fa";
// import { MdGridView } from "react-icons/md";
// import { useParams } from "react-router-dom";
// import { IoMdAdd } from "react-icons/io";
// import { tasks } from "../../../assets/data";
// import Tabs from "../../Tabs";
// import Loading from "../../Loader";
// import TaskTitle from "../../TaskTitle";
// import BoardView from "../../BoardView";
// import AddTask from "./AddTask";
// import Table from "./Table";
// import Title from "../../Title";
// import Button from "../../Button";
// import AdminNavbar from "../AdminNavbar";
// const TABS = [
//   { title: "Board View", icon: <MdGridView /> },
//   { title: "List View", icon: <FaList /> },
// ];

// const TASK_TYPE = {
//   todo: "bg-blue-600",
//   "in progress": "bg-yellow-600",
//   completed: "bg-green-600",
// };

// const CreateTask = () => {
//   const params = useParams();

//   const [selected, setSelected] = useState(0);
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const status = params?.status || "";

//   return loading ? (
//     <div className="py-10">
//       <Loading />
//     </div>
//   ) : (
//     <div className="w-[1000px] mt-[30%] mr-20 ">
//       <div className="flex items-center justify-between mb-4">
//         <Title title={status ? `${status} Tasks` : "Tasks"} />

//         {!status && (
//           <Button
//             onClick={() => setOpen(true)}
//             label="Create Task"
//             icon={<IoMdAdd className="text-lg" />}
//             className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5 "
//           />
//         )}
//       </div>

//       <Tabs tabs={TABS} setSelected={setSelected}>
//         {!status && (
//           <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4 ">
//             <TaskTitle label="To Do" className={TASK_TYPE.todo} />
//             <TaskTitle
//               label="In Progress"
//               className={TASK_TYPE["in progress"]}
//             />
//             <TaskTitle label="completed" className={TASK_TYPE.completed} />
//           </div>
//         )}

//         {selected !== 1 ? (
//           <BoardView tasks={tasks} />
//         ) : (
//           <div className="w-full">
//             <Table tasks={tasks} />
//           </div>
//         )}
//       </Tabs>
//       {/* <div style={{ position: "absolute", top: "4%", background: "black" }}>
//         <AdminNavbar />
//       </div> */}
//       <AddTask open={open} setOpen={setOpen} />
//     </div>
//   );
// };

// export default CreateTask;
import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
import { useParams } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { tasks } from "../../../assets/data";
import Tabs from "../../Tabs";
import Loading from "../../Loader";
import TaskTitle from "../../TaskTitle";
import BoardView from "../../BoardView";
import AddTask from "./AddTask";
import Table from "./Table";
import Title from "../../Title";
import Button from "../../Button";
import AdminNavbar from "../AdminNavbar";
const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

const CreateTask = () => {
  const params = useParams();

  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const status = params?.status || "";

  return loading ? (
    <div className="py-10">
      <Loading />
    </div>
  ) : (
    <div className="w-[1000px]  mt-14  mr-20 ">
      <div className="flex items-center justify-between mb-4">
        <Title title={status ? `${status} Tasks` : "Tasks"} />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5 "
          />
        )}
      </div>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {/* Static section for task titles */}
        {!status && (
          <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4 ">
            <TaskTitle label="To Do" className={TASK_TYPE.todo} />
            <TaskTitle
              label="In Progress"
              className={TASK_TYPE["in progress"]}
            />
            <TaskTitle label="completed" className={TASK_TYPE.completed} />
          </div>
        )}

        {/* Task view toggle */}
        <div className="w-full " style={{ minHeight: "400px" }}>
          {selected === 0 ? (
            <BoardView tasks={tasks} />
          ) : (
            <Table tasks={tasks} />
          )}
        </div>
      </Tabs>

      <AddTask open={open} setOpen={setOpen} />
    </div>
  );
};

export default CreateTask;
