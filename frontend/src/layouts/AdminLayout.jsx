import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { GrHome } from "react-icons/gr";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { MdInsights } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { BiBoltCircle } from "react-icons/bi";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import { TbCircleLetterK } from "react-icons/tb";
import clsx from "clsx";

const AdminLayout = () => {
  const [open, setOpen] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const role = localStorage.getItem('role')
  const navItems = [
    { path: "/admin", label: "Dashboard", Icon: GrHome },
    { path: "/admin/insights", label: "Insights", Icon: MdInsights },
    { path: "/admin/analytics", label: "Analytics", Icon: TbBrandGoogleAnalytics },
    { path: "/admin/settings", label: "Settings", Icon: IoMdSettings },
  ];

  const handleProfileIcon = () => {
    setShowMenu(!showMenu);
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={clsx(
          "min-h-screen bg-gradient-to-br from-black to-gray-900 fixed top-0 left-0 z-50 transition-all duration-500 flex flex-col shadow-lg text-gray-400",
          open ? "w-52" : "w-16"
        )}
      >
        {/* Sidebar Header */}
        <div className="relative flex items-center justify-between border-b border-gray-600 m-4 pb-3">
          <div className="flex items-center space-x-4 text-lg font-bold">
            <BiBoltCircle className="text-green-400 text-center" size={30} />
            <span
              className={clsx(
                "text-gray-300 transition-all duration-500",
                open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
              )}
            >
              Hey, {role}!
            </span>
          </div>
          <div
            className="absolute -right-8 cursor-pointer"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <TbLayoutSidebarLeftCollapse size={28} />
            ) : (
              <TbLayoutSidebarLeftExpandFilled size={28} />
            )}
          </div>
        </div>

        {/* Navigation Links */}
        <nav className=" p-2">
          <ul className="space-y-2">
            {navItems.map(({ path, label, Icon }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end
                  className={({ isActive }) =>
                    clsx(
                      "flex items-center px-3 py-2 rounded-lg",
                      isActive
                        ? "bg-gray-950 text-green-600 border border-gray-700"
                        : "text-gray-400 hover:text-gray-100 group"
                    )
                  }
                >
                  <Icon size={24} className="flex-shrink-0 group-hover:text-green-600" />
                  <span
                    className={clsx(
                      "ml-3 whitespace-nowrap",
                      open
                        ? "opacity-100 translate-x-0 transition-all duration-500 ease-in-out"
                        : "opacity-0 -translate-x-5"
                    )}
                  >
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>



        {/* Logout Button */}
        <div className="mt-auto p-4">
          <a
            href="/login"
            className="flex items-center space-x-2 px-3 py-2 rounded transition duration-300 ease-in-out"
          >
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span
              className={clsx(
                "transition-all duration-500 ease-in-out",
                open ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
              )}
            >
              Logout
            </span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={clsx(
          "h-screen overflow-y-auto flex-1 bg-black py-4 px-8 transition-all duration-500",
          open ? "ml-52" : "ml-16"
        )}

      >
        <div className="relative flex justify-between items-center mb-5">
          <div className="text-white font-semibold border border-gray-700 w-40 text-center py-1 text-xl rounded-lg  ">
            {
              navItems.find((item) => item.path === location.pathname)?.label || 'Admin'
            }
          </div>
          <div className="avatar online p-2 rounded-full text-white cursor-pointer hover:scale-110" onClick={handleProfileIcon}>
            <TbCircleLetterK size={28} />
          </div>

          {
            showMenu && (
              <div className="bg-gray-800 text-gray-200 w-40 p-4 rounded-lg shadow-xl absolute right-0 top-16 z-50">
                <p className="border-b border-gray-700 p-2 cursor-pointer hover:text-green-500 hover:bg-gray-700 rounded">
                  Profile
                </p>
                <p className="border-b border-gray-700 p-2 cursor-pointer hover:text-green-500 hover:bg-gray-700 rounded">
                  Settings
                </p>
                <p className="p-2 cursor-pointer hover:text-red-500 hover:bg-gray-700 rounded">
                  <a href="/login">Log out</a>
                </p>
              </div>
            )
          }

        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
