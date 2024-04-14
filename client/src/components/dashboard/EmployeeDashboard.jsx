import { useState, useEffect } from "react";
import EmployeeOverview from "../Employee-overview";
import RecentEmployees from "../RecentContributors";
import { useNavigate } from "react-router-dom";
import { employeeDashboard } from "@/lib/constants/string.json";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getEmployees } from "@/services/adminService";

//employee Dashboard for admin page 

const EmployeeDashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState([]);
  const [totalAdmins, setTotalAdmins] = useState([]);
  const [activeAdmins, setActiveAdmins] = useState([]);
  const [activeEmployees, setActiveEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees()
      .then((response) => {
        const employees = response.data.formData;
        const employeeCount = employees.filter(
          (User) => User.role === "employee"
        ).length;
        const adminCount = employees.filter(
          (User) => User.role === "admin"
        ).length;
        const activeAdminCount = employees.filter(
          (User) => User.role === "admin" && User.is_active === true
        ).length;
        const activeEmployeeCount = employees.filter(
          (User) => User.role === "employee" && User.is_active === true
        ).length;

        setTotalEmployees(employeeCount);
        setTotalAdmins(adminCount);
        setActiveAdmins(activeAdminCount);
        setActiveEmployees(activeEmployeeCount);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          onClick={() => navigate("/admin/users")}
          className="cursor-pointer "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-primaryText">
              {employeeDashboard.totalEmployee}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEmployees}</div>
          </CardContent>
        </Card>
        <Card
          onClick={() => navigate("/admin/users")}
          className="cursor-pointer "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium  text-primaryText">
              {employeeDashboard.totalAdmin}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAdmins}</div>
          </CardContent>
        </Card>
        <Card
          onClick={() => navigate("/admin/users")}
          className="cursor-pointer "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium  text-primaryText">
              {employeeDashboard.activeAdmin}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAdmins}</div>
          </CardContent>
        </Card>
        <Card
          onClick={() => navigate("/admin/users")}
          className="cursor-pointer "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium  text-primaryText">
              {employeeDashboard.activeEmployee}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEmployees}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-5 mb-5">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className=" text-primaryText">Users Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <EmployeeOverview />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle className=" text-primaryText">
              {employeeDashboard.recentUser}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RecentEmployees />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
