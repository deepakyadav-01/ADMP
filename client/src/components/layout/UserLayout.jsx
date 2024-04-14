import Sidebar from "../sidebar/Sidebar";

//layout for all pages
// eslint-disable-next-line react/prop-types
const UserLayout = ({ children }) => {
  return (
    <div className="relative"> 
      <div className="relative flex h-screen overflow-hidden"> 
        <div className="absolute left-0 h-full z-20"> 
          <Sidebar /> 
        </div> 
        <div className="flex-grow z-0 w-screen"> 
          <div className="mt-5 m-5">{children}</div> 
        </div> 
      </div> 
    </div> 
  ); 
}; 

export default UserLayout; 
