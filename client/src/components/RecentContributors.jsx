import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { getEmployees } from "@/services/adminService";

//List of Resently added users
const RecentEmployees = () => {
  const [recentEmployees, setRecentEmployees] = useState([]);

  useEffect(() => {
    getEmployees()
      .then((response) => {
        const employees = response.data.formData.slice(0, 7); // Get the first 5 recent employees
        setRecentEmployees(employees);
      })
      .catch((error) => {
        console.error("Error fetching recent employees:", error);
      });
  }, []);

  return (
    <div className="space-y-8">
      {recentEmployees.map((employee, index) => (
        <div
          key={index}
          className="flex items-center cursor-pointer p-2 text-primaryText rounded-lg dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700 group hover:font-bold "
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={employee.avatar_url} alt="Avatar" />
            <AvatarFallback>
              {employee.git_username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">
              {employee.git_username}
            </p>
            <p className="text-sm text-muted-foreground">
              Role: {employee.role}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentEmployees;
