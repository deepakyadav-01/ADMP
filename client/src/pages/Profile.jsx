import { useEffect, useState } from "react"; 
import { Card, CardContent, CardHeader } from "@/components/ui/card"; // Import necessary components from shadcn/ui 

import { common, login } from "../lib/constants/string.json";


//profile page
const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user data from localStorage based on the user ID
    const userData = JSON.parse(localStorage.getItem("user")); 
    setUser(userData);
  }, []);

  return (
    <div className="max-w-md mx-auto mt-20 rounded-sm">
      {user && (
        <Card>
          <CardHeader>
            <h3 className="text-lg font-bold text-center"> 
              {user.firstName} 
            </h3>{" "} 
            {/* Display GitHub username */} 
          </CardHeader> 
          <CardContent className="justify-center text-center"> 
 
            <p className="text-gray-600 mb-2 mt-2 font-bold"> 
              {login.email} {user.email} 
            </p> 
            <p className="text-gray-600 mb-2 mt-2 font-bold"> 
              {common.role} {user.role} 
            </p> 
            {/* Add more user details here */} 
          </CardContent> 
        </Card> 
      )} 
    </div> 
  ); 
}; 
 
export default Profile; 
