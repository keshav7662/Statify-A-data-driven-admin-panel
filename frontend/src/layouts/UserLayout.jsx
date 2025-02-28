import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, Outlet } from "react-router-dom";
import { GrHome } from "react-icons/gr";
import { MdKeyboardArrowRight } from "react-icons/md";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import { MdInsights } from "react-icons/md";
import { BiSolidUserAccount } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { BiBoltCircle } from "react-icons/bi";
import { TbLayoutSidebarLeftCollapse, TbLayoutSidebarLeftExpandFilled } from "react-icons/tb";
import clsx from "clsx";

const UserLayout = () => {
  const [open, setOpen] = useState(true);

  const navItems = [
    { path: "/user", label: "Dashboard", Icon: GrHome },
  ];

  return (
    <div className="flex">
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
              User
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
                        : "text-gray-400 hover:text-green-600"
                    )
                  }
                >
                  <Icon size={24} className="flex-shrink-0" />
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
          "h-screen overflow-y-auto flex-1 bg-black py-4 px-10 transition-all duration-500",
          open ? "ml-52" : "ml-16"
        )}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default UserLayout;
