import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../auth";
import constants from "../../constants/constants";
import { useStateContext } from "../util";
import Sidebar from "../../components/Sidebar";
import { AiOutlineMenu } from "react-icons/ai";

export const ProtectRoutes = () => {
  const auth = useAuth();
  const { activeMenu, currentMode, setActiveMenu } = useStateContext();

  return auth?.cookies.token ? (
    <div
      className={`${
        currentMode === "Dark" ? "dark" : ""
      } w-full h-screen flex bg-main-bg relative overflow-hidden`}
    >
      {activeMenu && (
        <div className=" bg-gray-900 md:p-5 dark:bg-secondary-dark-bg md:w-1/4 fixed top-0 left-0  z-30 md:static h-screen">
          <Sidebar />
        </div>
      )}
      <div
        className={` ${
          activeMenu ? "app__overview-overlayActive md:hidden" : ""
        }`}
      />
      <div className=" w-full h-screen flex flex-col dark:bg-main-dark-bg bg-light-gray">
        {/* <div className={` bg-main-bg dark:bg-main-dark-bg `}>
          <Navbar />
        </div>
        <BreadCrumbs /> */}
        <div>
          <button
            type="button"
            onClick={() => setActiveMenu((prev) => !prev)}
            className="relative  text-xl rounded-full p-3 hover:bg-light-gray dark:hover:bg-secondary-dark-bg"
          >
            <AiOutlineMenu />
          </button>
        </div>
        <div
          className={`dark:bg-main-dark-bg bg-main-bg flex-1 overflow-y-auto`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={constants.loginRoute} />
  );
};
