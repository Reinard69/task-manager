import constants from "../constants/constants";

import { RxDashboard } from "react-icons/rx";
import { GrTask } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";

export const links = [
  {
    title: "Dashboard",
    path: constants.homeRoute,
    icon: <RxDashboard />,
  },

  {
    title: "Tasks",
    path: constants.tasksRoute,
    icon: <GrTask />,
  },
  {
    title: "Profile",
    path: constants.settingsRoute,
    icon: <CgProfile />,
  },
];
