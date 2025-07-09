import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../page/LoginPage";
import { Dashboard } from "../page/Dashboard";
import { Tasks } from "../component/Task";
import { NewTask } from "../component/NewTask";
import { TaskDetails } from "../component/TaskDetails";
// import { useContext } from "react";
// import { AuthContext } from "../context/auth-Contect";
import { useSelector } from "react-redux";

const AppRoutes = () => {
  // let auth = useContext(AuthContext);
  let loggenIn = useSelector((state) => state.authReducer.loggenIn);
  return (
    <Routes>
      <Route
        path="/login"
        element={loggenIn ? <Navigate to="/dashboard" /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={<Dashboard />}
        // element={loggenIn ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route path="/dashboard/task" element={<Tasks />} />
      <Route path="/dashboard/newTask" element={<NewTask />} />
      <Route path="/dashboard/task/:id/details" element={<TaskDetails />} />
    </Routes>
  );
};
export default AppRoutes;
