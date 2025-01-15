import React from "react";
import TaskCard from "./TaskCard";
import AdminNavbar from "./AdminDashboard/AdminNavbar";

const BoardView = ({ tasks }) => {
  return (
    <div>
      <div style={{ position: "absolute", top: "5px", left: "16px" }}>
        <AdminNavbar />
      </div>
      <div className="w-full py-4 -mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 2xl:gap-10 ">
        {tasks.map((task, index) => (
          <TaskCard task={task} key={index} />
        ))}
      </div>
    </div>
  );
};

export default BoardView;
