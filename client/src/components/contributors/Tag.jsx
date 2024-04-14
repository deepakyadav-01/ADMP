/* eslint-disable react/prop-types */

//tag to show the added contributors
const Tag = ({ text, onClose }) => {
  return (
    <div className="flex items-center bg-gray-200 text-gray-700 rounded-full px-2 py-1 mb-2 mr-2 max-w-max">
      <span className="mr-2">{text}</span>
      <button onClick={onClose} className="text-xs ml-1 focus:outline-none">
        x
      </button>
    </div>
  );
}; 

export default Tag;
