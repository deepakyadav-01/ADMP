import { useState, useEffect } from "react";
import RequestOverview from "./RequestOverview";
import RecentProjects from "./RecentRequests"; 
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { osRequestEmployee } from "@/services/projectService"; 
import { CurrentUser } from "../../hooks/CurrentUser";

//user dashboard main page
const User = () => { 
  const [totalRequests, setTotalRequests] = useState(0); 
  const [totalProjects, setTotalProjects] = useState(0); 
  const [pendingRequests, setPendingRequests] = useState(0); 
  const [activeProjects, setActiveProjects] = useState(0); 
  const navigate = useNavigate(); 
  const currentUser = CurrentUser();
  useEffect(() => {
    const fetchData = () => {
      if (currentUser) {
        osRequestEmployee(currentUser.git_username) 
          .then((data) => { 
            const approvedRequests = data.filter( 
              (request) => request.status === "approved" 
            ).length; 
            const pendingRequests = data.filter( 
              (request) => request.status === "pending" 
            ).length; 
            setTotalRequests(data.length); 
            setTotalProjects(approvedRequests); 
            setPendingRequests(pendingRequests); 
            setActiveProjects(approvedRequests); 
          }) 
          .catch((error) => { 
            console.error("Error fetching data:", error); 
          }); 
      } 
    }; 

    fetchData(); 
  }, [currentUser]); 

  return ( 
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card
          onClick={() => navigate("/user/osprojects")}
          className="cursor-pointer "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Projects
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
            <div className="text-2xl font-bold">{totalProjects}</div>
          </CardContent>
        </Card>
        <Card
          onClick={() => navigate("/user/osrequests")}
          className="cursor-pointer "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Requests
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
            <div className="text-2xl font-bold">{totalRequests}</div>
          </CardContent>
        </Card>
        <Card
          onClick={() => navigate("/user/osrequests")}
          className="cursor-pointer "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
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
            <div className="text-2xl font-bold">{pendingRequests}</div>
          </CardContent>
        </Card>
        <Card
          onClick={() => navigate("/user/osprojects")}
          className="cursor-pointer "
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
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
            <div className="text-2xl font-bold">{activeProjects}</div>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7 mt-5 mb-5">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Request Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <RequestOverview />
          </CardContent>
        </Card>
        <Card className="col-span-4 md:col-span-3">
          <CardHeader>
            <CardTitle>Recently Added Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentProjects />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default User;
