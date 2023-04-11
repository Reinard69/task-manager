import { Navigate, Route, Routes } from "react-router-dom";

import { ProtectRoutes } from "./hooks/protectRoutes";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import "./App.css";
import constants from "./constants/constants";
import Tasks from "./pages/Tasks";
import ProfileSettings from "./pages/ProfileSettings";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="home" />} />
      <Route path={constants.loginRoute} element={<Login />} />

      <Route element={<ProtectRoutes />}>
        <Route path={constants.homeRoute} element={<Dashboard />} />
        <Route path={constants.tasksRoute} element={<Tasks />} />
        <Route path={constants.settingsRoute} element={<ProfileSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
