// import { useEffect,useState } from "react";
// import { useNavigate } from "react-router-dom";
// import logo from "../../assets/logo.png";
// import { FcBusinessman } from "react-icons/fc";
// import { login } from "../../lib/constants/string.json";

// //main navbar header
// // eslint-disable-next-line react/prop-types
// const Navbar = ({ isDropdownOpen, toggleSidebar, toggleDropdown }) => {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null); 
//   useEffect(() => {
//     // Retrieve user data from localStorage based on the user ID
    
    
//     const userData = JSON.parse(localStorage.getItem("user"));
//     setUser(userData);
//   }, []);

//   // const handleProfileClick = () => {
//   //   navigate(user.role === "admin" ? "/admin/profile" : "/headAdmin/profile");
//   // };

//   const handleLogout = () => {
//     // Clear local storage
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     localStorage.removeItem("user");

//     // Navigate to the login page
//     navigate("/")
//       .then(() => { 
//         console.log("Navigation to login page successful"); 
//       })
//       .catch((error) => {
//         console.error("Navigation to login page failed:", error);
//       }); 
//   };

//   return ( 
//     <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
//       <div className="px-3 py-3 lg:px-5 lg:pl-3">
//         <div className="flex items-center justify-between">
//           <div className="flex items-center justify-start rtl:justify-end">
//             <button 
//               data-drawer-target="logo-sidebar"
//               data-drawer-toggle="logo-sidebar"
//               aria-controls="logo-sidebar" 
//               type="button"
//               className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 border-none"
//               onClick={toggleSidebar}
//             >
//               <svg
//                 className="w-6 h-6"
//                 aria-hidden="true"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   clipRule="evenodd"
//                   fillRule="evenodd"
//                   d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
//                 ></path>
//               </svg>
//             </button>
//             <a
//               href="https://mindfiredigital.github.io/"
//               className="flex ms-2 md:me-24"
//             >
//               <img src={logo} className="h-8 me-3" alt="MindfireFoss Logo" />
//             </a> 
//           </div>
//           <div className="flex items-center">
//             <div className="flex items-center ms-3">
//               <div className="border-none outline-none">
//                 <div
                  
//                   className="flex right-5 text-sm outline-none bg-transparent rounded-full border-none mr-4 cursor-pointer"
//                   aria-expanded={isDropdownOpen}
//                   onClick={toggleDropdown}
//                 > 
//                   <FcBusinessman className="w-8 h-8 rounded-full bg-primaryText" />
//                 </div>
//               </div>
//               {isDropdownOpen && (
//                 <div className="absolute top-full right-5 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 mt-1">
//                   {" "}
//                   <div className="px-4 py-3" role="none">
//                     <p
//                       className="text-sm text-gray-900 dark:text-white cursor-pointer"
//                       role="none"
//                     >
//                       <span className="font-bold text-primaryText font-sans">{user.email}</span>
//                     </p>
//                   </div>
//                   <ul className="py-1" role="none">
//                     {/* <li>
//                       <a
//                         onClick={handleProfileClick}
//                         className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
//                         role="menuitem"
//                       >
//                         {login.profile}
//                       </a>
//                     </li> */}

//                     <li> 
//                       <a
//                         onClick={handleLogout}
//                         className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
//                         role="menuitem"
//                       >
//                         {login.signOut}
//                       </a>
//                     </li>
//                   </ul>
//                 </div> 
//               )} 
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar; 

import logo from "../../assets/logo.png";
import { FcBusinessman } from "react-icons/fc";

// Main navbar header
// eslint-disable-next-line react/prop-types
const Navbar = ({ isDropdownOpen, toggleSidebar, toggleDropdown }) => {
  return ( 
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button 
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar" 
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 border-none"
              onClick={toggleSidebar}
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <a
              href="https://mindfiredigital.github.io/"
              className="flex ms-2 md:me-24"
            >
              <img src={logo} className="h-8 me-3" alt="MindfireFoss Logo" />
            </a> 
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3">
              <div className="border-none outline-none">
                <div
                  className="flex right-5 text-sm outline-none bg-transparent rounded-full border-none mr-4 cursor-pointer"
                  aria-expanded={isDropdownOpen}
                  onClick={toggleDropdown}
                > 
                  <FcBusinessman className="w-8 h-8 rounded-full bg-primaryText" />
                </div>
              </div>
              {isDropdownOpen && (
                <div className="absolute top-full right-5 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600 mt-1">
                  {" "}
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white cursor-pointer"
                      role="none"
                    >
                      <span className="font-bold text-primaryText font-sans">Deepak</span>
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    {/* <li>
                      <a
                        className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Profile
                      </a>
                    </li> */}

                    <li> 
                      <a
                        className="block px-4 py-2 text-sm cursor-pointer text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div> 
              )} 
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

