import React from "react";
import { AiFillPieChart } from "react-icons/ai";
import { TfiAgenda } from "react-icons/tfi";
import { VscRequestChanges } from "react-icons/vsc";
import { GrProjects, GrOrganization } from "react-icons/gr";
import Navbar from "../navbar/Nabvar";

// Main sidebar
const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const role = localStorage.getItem("role");
  const isAdmin = role === "admin";
  const isFormSetter = role === "formSetter";
  const isApplicant = role === "applicant";
  const isHeadAdmin = role === "headAdmin";

  // Define menu items based on the user's role
  const menus = isAdmin
    ? [
        { title: "Dashboard", path: "/admin/dashboard", src: <AiFillPieChart /> },
        {
          title: "Form Setter",
          path: "/admin/create-form-setter",
          src: <VscRequestChanges />,
        },
        { title: "Forms", path: "/admin/forms", src: <GrProjects /> },
        {
          title: "Applicants",
          path: "/registered-applicants",
          src: <GrOrganization />,
        },
      ]
    : isFormSetter
    ? [
        { title: "New Form", path: "/formSetter/create-forms", src: <AiFillPieChart /> },
        {
          title: "Forms",
          path: "/formSetter/forms",
          src: <VscRequestChanges />,
        },
      ]
    : isApplicant
    ? [
        { title: "Register", path: "/applicant/application-form", src: <AiFillPieChart /> },
        {
          title: "View",
          path: "/applicant/registered-form",
          src: <VscRequestChanges />,
        },
      ]
    : isHeadAdmin
    ? [
        { title: "Dashboard", path: "/headAdmin/dashboard", src: <AiFillPieChart /> },
        { title: "Admins", path: "/headAdmin/users", src: <TfiAgenda /> },
        { title: "Forms", path: "/headAdmin/forms", src: <VscRequestChanges /> },
        { title: "Applicants", path: "/headAdmin/registered-applicants", src: <GrProjects /> },
      ]
    : []; // Add a default empty array if none of the roles match

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <Navbar
        isDropdownOpen={isDropdownOpen}
        toggleSidebar={toggleSidebar}
        toggleDropdown={toggleDropdown}
      />
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-50 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {menus.map((menu, index) => (
              <li key={index}>
                <a
                  href={menu.path}
                  className="flex items-center p-2 text-primaryText rounded-lg dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700 group hover:font-bold"
                >
                  {menu.src}
                  <span className="ms-2">{menu.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
