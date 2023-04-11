import { Link, NavLink } from "react-router-dom";
import { MdOutlineCancel } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

import { links } from "../config/sidebarConfig";
import { useStateContext } from "../hooks/util";
import { useAuth } from "../hooks/auth";
import { useEffect } from "react";

interface SidebarProps {}

const Sidebar = ({}: SidebarProps) => {
  const { activeMenu, setActiveMenu, screenSize, currentColor, setScreenSize } =
    useStateContext();
  const auth = useAuth();

  const handleCloseSidebar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeLink =
    "flex items-center gap-5 pl-4 pb-3 pt-2.5 rounded-lg text-white text-md m-2 mb-10 ";
  const normalLink =
    "flex items-center gap-5 pl-4 pb-3 pt-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:text-gray m-2 mb-10";

  return (
    <div className="bg-main-bg rounded-3xl ml-2 h-full md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 pr-2 flex flex-col justify-between  ">
      {activeMenu && (
        <div>
          <div className="flex justify-between items-center">
            <Link
              to=""
              onClick={handleCloseSidebar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold -tracking-tight dark:text-white text-slate-900"
            >
              <div className="flex items-center">
                <p className="text-[#0E97BC] text-1xl italic font-light">
                  tasks
                </p>
                <p className="text-[#0E97BC] text-3xl font-bold ">
                  Adroit360gh
                </p>
              </div>
            </Link>
            <button
              onClick={() => setActiveMenu((prev) => !prev)}
              className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
            >
              <MdOutlineCancel />
            </button>
          </div>
          <div className="mt-10">
            {links.map((link) => (
              <NavLink
                to={link.path}
                key={link.title}
                onClick={handleCloseSidebar}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? currentColor : "",
                })}
                className={({ isActive }) =>
                  isActive ? activeLink : normalLink
                }
              >
                {link.icon}
                <span className="capitalize">{link.title}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
      <div
        className="flex text-red-500 items-center gap-3 justify-center hover:text-lg cursor-pointer"
        onClick={() => auth?.logout()}
      >
        <BiLogOut size={20} />
        <p>Log out</p>
      </div>
    </div>
  );
};

export default Sidebar;
