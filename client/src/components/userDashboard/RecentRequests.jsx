import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { osRequestEmployee } from "@/services/projectService";
import { CurrentUser } from "../../hooks/CurrentUser";

//list out the resent projects details in the user dashboard
const RecentProjects = () => {
  const [recentRequests, setRecentRequests] = useState([]);
  const currentUser = CurrentUser();
  useEffect(() => {
    const fetchData = () => {
      if (currentUser) {
        osRequestEmployee(currentUser?.git_username)
          .then((data) => { 
            setRecentRequests(data.slice(0, 5));
          })
          .catch((error) => {
            console.error("Error fetching requests:", error);
          });
      }
    };
    fetchData();
  }, [currentUser]);

  return (
    <div className="space-y-8">
      {recentRequests.map((request, index) => (
        <div
          key={index}
          className="flex items-center cursor-pointer p-2 text-primaryText rounded-lg dark:text-white  hover:bg-gray-100 dark:hover:bg-gray-700 group hover:font-bold "
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>
              {request.title.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{request.title}</p>
            <p className="text-sm text-muted-foreground">
              Project Type: {request.projectType}
            </p>
          </div>
          <div className="ml-auto text-sm text-muted-foreground">
            Status : {request.status}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentProjects;
