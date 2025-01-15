import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Signup from "./components/Signup";
import Admin from "./components/AdminDashboard/Admin";
import Mainpage from "./components/Mainpage";
import Home from "./pages/Home";
import AboutUs from "./components/About Us";
import { isAuthenticated, getUserRole } from "./utils/auth";
import Client from "./components/client";
import AddTeam from "./components/AdminDashboard/AddTeam";
import AddStudent from "./components/AdminDashboard/AddStudent";
import CreateTask from "./components/AdminDashboard/Task/CreateTask";
import LeaveApproval from "./components/AdminDashboard/LeaveApproval";
import AddClient from "./components/AdminDashboard/AddClient";

import Dashboard from "./components/AdminDashboard/Dashboard";
import EmployeeDashboard from "./components/Staff/EmployeeDashboard";
// import Summary from "./components/Staff/Summary";
import Profile from "./components/Staff/Profile";
import List from "./components/Staff/Leaves/List";
import AddLeave from "./components/Staff/Leaves/AddLeave";
import ContactUs from "./components/ContactUs";
import AddSalary from "./components/AdminDashboard/AddSalary";

const ProtectedRoute = ({ children, roles }) => {
  if (!isAuthenticated()) return <Navigate to="/login" />;
  if (!roles.includes(getUserRole())) return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} /> {/* Default Dashboard */}
          <Route path="add-team-member" element={<AddTeam />} />
          <Route path="add-student-member" element={<AddStudent />} />
          <Route path="create-task" element={<CreateTask />} />
          <Route path="leave-approval" element={<LeaveApproval />} />
          <Route path="add-client-member" element={<AddClient />} />
          <Route path="add-salary" element={<AddSalary />} />
        </Route>

        <Route
          path="/staff"
          element={
            <ProtectedRoute roles={["admin", "staff"]}>
              <EmployeeDashboard />
            </ProtectedRoute>
          }
        >
          {/* <Route index element={<Summary />}></Route> */}

          <Route path="profile" element={<Profile />} />
          <Route path="leave" element={<List />} />
          <Route path="leave/add-leave" element={<AddLeave />} />
          <Route path="salary" element={<List />} />
        </Route>
        <Route
          path="/client"
          element={
            <ProtectedRoute roles={["admin", "staff", "client"]}>
              <Client />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
