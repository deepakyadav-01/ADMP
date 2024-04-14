/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button } from "@/components/ui/button";
// import AddEmployee from "../components/employee/AddEmployee";
import { IoIosCloseCircleOutline, IoMdCreate, IoMdTrash } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaInfoCircle, FaDotCircle, FaMinusCircle } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import {
  ERROR_DELETE_USER,
  SUCCESS_DELETE_USER,
} from "@/lib/constants/constant";

const hardcodedData = [
  {
    _id: "1",
    name: "example1",

    email: "example1@example.com",
    program: "Btech",
    
  },
  {
    _id: "2",
    name: "example1",

    email: "example1@example.com",
    program: "Mtech",
    
  },
  {
    _id: "3",
    name: "example1",

    email: "example1@example.com",
    program: "Phd",
    
  },
];

const CreateAdmin = () => {
  const [formData] = useState(hardcodedData);
  const [loading] = useState(false);
  const [showAddEmployeeWindow, setShowAddEmployeeWindow] = useState(false);
  const [editEmployeeData, setEditEmployeeData] = useState(null);
  const { toast } = useToast();

  const handleAddUserClick = () => {
    setShowAddEmployeeWindow(true);
  };

  const handleEditClick = (employeeData) => {
    setEditEmployeeData(employeeData);
    setShowAddEmployeeWindow(true);
  };

  const handleDeleteClick = (id) => {
    toast({
      title: SUCCESS_DELETE_USER,
    });
  };

  const handleTableChange = () => {};

  const handleSearch = () => {};

  const handleReset = () => {};

  const getColumnSearchProps = () => ({
    filterDropdown: () => <div style={{ padding: 8 }} />,
    filterIcon: () => <></>,
    onFilter: () => true,
    render: (text) => text,
  });

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "index",
      render: (text, record, index) => <div className="ml-3">{index + 1}</div>,
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Program",
      dataIndex: "program",
    },
   
    {
      title: "Other Details",
      render: () => <></>,
    },
  ];

  const modifiedData = formData.map((item, index) => ({
    ...item,
    index: index + 1,
  }));

  return (
    <div>
      <div className="flex-1 p-4 md:p-8 pt-6 mt-10 sm:ml-48 justify-center items-center overflow-y-auto max-h-screen">
        <div>
          <div className="flex justify-between items-center mb-4 mt-10">
            <h1 className="text-3xl font-bold text-primaryText">Admins</h1>

          </div>
          <Separator className="mb-5" />

          <Table
            className="w-full border border-gray-300 overflow-x-auto mb-10"
            columns={columns}
            dataSource={modifiedData}
            rowKey={(record) => record._id}
            loading={loading}
            onChange={handleTableChange}
          />

          {showAddEmployeeWindow && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50 z-10">
              <div className="relative bg-white p-8 rounded-lg shadow-lg sm:w-1/3">
                {/* <AddEmployee
                  editData={editEmployeeData}
                  onSave={(updatedEmployeeData) => {
                    console.log("Updated employee data:", updatedEmployeeData);
                    setShowAddEmployeeWindow(false);
                  }}
                /> */}
                <Button
                  className="absolute top-0 right-0 text-red-500 bg-transparent"
                  onClick={() => setShowAddEmployeeWindow(false)}
                >
                  <IoIosCloseCircleOutline />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateAdmin;
