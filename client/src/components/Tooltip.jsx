/* eslint-disable react/prop-types */
import { IoIosInformationCircle } from "react-icons/io";

//tooltip for hover details in contributors
const Tooltip = ({ message, children, color }) => {
  return (
    <div className="group relative flex">
      {children}
      <span className="absolute top-10 scale-0 transition-all rounded bg-yellow-200 p-1 text-xs text-primaryText group-hover:scale-100 flex items-center">
        <IoIosInformationCircle color={color} />
        {message}
      </span>
    </div>
  );  
};

export default Tooltip;
