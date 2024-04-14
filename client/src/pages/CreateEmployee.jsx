import { useEffect, useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button } from "@/components/ui/button";
import AddEmployee from "../components/employee/AddEmployee";
import { IoIosCloseCircleOutline, IoMdCreate, IoMdTrash } from "react-icons/io";
import { FaPlusCircle } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import { Input, Space, Table } from "antd";
import Highlighter from "react-highlight-words";
import { getEmployees, deleteEmployee } from "../services/adminService";
import { common } from "../lib/constants/string.json";
//import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useEmployeeStore } from "../store/employeeStore";
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

//create employee page used by admin
const CreateEmployee = () => {
  const formData = useEmployeeStore((state) => state.formData);
  const loading = useEmployeeStore((state) => state.loading);
  const showAddEmployeeWindow = useEmployeeStore(
    (state) => state.showAddEmployeeWindow
  );
  const editEmployeeData = useEmployeeStore((state) => state.editEmployeeData);
  const setFormData = useEmployeeStore((state) => state.setFormData);
  const setLoading = useEmployeeStore((state) => state.setLoading);
  const setError = useEmployeeStore((state) => state.setError);
  const setShowAddEmployeeWindow = useEmployeeStore(
    (state) => state.setShowAddEmployeeWindow
  );
  const setEditEmployeeData = useEmployeeStore(
    (state) => state.setEditEmployeeData
  );
  const { toast } = useToast();
  const searchInput = useRef(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
    sorting: {
      field: "email",
      order: "ascend",
    },
    filters: {},
  });

  useEffect(() => {
    setLoading(true);
    const { pagination, sorting, filters } = tableParams;
    const params = {
      ...pagination,
      ...sorting,
      ...filters,
    };
    getEmployees(params)
      .then((response) => {
        setFormData(response.data.formData);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...pagination,
            total: response.totalCount || response.length, // Adjust this based on the response format
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Error fetching users");
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddUserClick = () => {
    setShowAddEmployeeWindow(true);
  };

  const handleEditClick = (employeeData) => {
    setEditEmployeeData(employeeData);

    setShowAddEmployeeWindow(true);
  };

  const handleDeleteClick = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (!confirmDelete) {
      return;
    }

    deleteEmployee(id)
      .then(() => {
        // Update formData state to remove the deleted employee
        setFormData(formData.filter((user) => user._id !== id));
        toast({
          title: SUCCESS_DELETE_USER,
        });
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        toast({
          variant: "destructive",
          title: ERROR_DELETE_USER,
        });
      });
  };
  const handleTableChange = (pagination, filters, sorter) => {
    const updatedTableParams = {
      pagination: {
        current: pagination.current,
        pageSize: pagination.pageSize,
      },
      sorting: {
        field: sorter.field || "email",
        order: sorter.order || "ascend",
      },
      filters,
    };
    setTableParams(updatedTableParams);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Serial No.",
      dataIndex: "index",
      render: (text, record, index) => <div className="ml-3">{index + 1}</div>,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) =>
        a.email.localeCompare(b.email, "en", { sensitivity: "base" }),
      ...getColumnSearchProps("email"), // Add search functionality to this column
    },
    {
      title: "GitHub Username",
      dataIndex: "git_username",
      sorter: (a, b) =>
        a.git_username.localeCompare(b.git_username, "en", {
          sensitivity: "base",
        }),
      ...getColumnSearchProps("git_username"),
    },
    {
      title: "Role",
      dataIndex: "role",
      filters: [
        { text: "admin", value: true },
        { text: "employee", value: false },
      ],
      onFilter: (value, record) => record.is_active === value,
    },
    {
      title: "Is Active",
      dataIndex: "is_active",
      filters: [
        { text: "Active", value: true },
        { text: "Inactive", value: false },
      ],
      onFilter: (value, record) => record.is_active === value,
      render: (is_active) => {
        switch (is_active) {
          case true:
            return <FaDotCircle className="ml-5 text-green-500 w-4 h-4" />;
          case false:
            return <FaMinusCircle className="ml-5 text-red-500 w-4 h-4" />;
          default:
            return is_active;
        }
      },
    },
    {
      title: "Actions",
      render: (record) => (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-auto border-none focus:outline-none">
              <FaInfoCircle className="text-blue-500 w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="text-center">
                actions
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleEditClick(record)}
                className="border-none focus:outline-none justify-start"
              >
                <IoMdCreate className="text-green-500 w-4 h-4" />{" "}
                <span className="ml-2">Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteClick(record._id)}
                className=" justify-start"
              >
                <IoMdTrash className="text-red-500 w-4 h-4" />
                <span className="ml-2">Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      ),
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
            <h1 className="text-3xl font-bold text-primaryText">
              {common.user}
            </h1>
            <Button
              variant="outline"
              onClick={handleAddUserClick}
              className="bg-primaryText text-white border-none focus:outline-none flex right-5"
            >
              <span>
                <FaPlusCircle />
              </span>
              <span className="sm:ml-2"></span> {common.addUser}
            </Button>
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
                <AddEmployee
                  editData={editEmployeeData}
                  onSave={(updatedEmployeeData) => {
                    // Handle the updated employee data here

                    console.log("Updated employee data:", updatedEmployeeData);
                    setShowAddEmployeeWindow(false); // Close the AddEmployee window after saving
                  }}
                />
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

export default CreateEmployee;
