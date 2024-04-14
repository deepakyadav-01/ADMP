import { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../../ui/avatar";

// Hardcoded data for demonstration
const hardcodedrecentAdmins = [
  {
    name: "Deepak",
    role: "admin",
    
  },
  {
    name: "prayag",
    role: "formSetter",
    
  },
  {
    name: "akshat",
    role: "admin",
    
  },
  {
    name: "swastik",
    role: "formSetter",
    
  },


];

const RecentAdmins = () => {
  const [recentAdmins] = useState(hardcodedrecentAdmins);

  return (
    <div className="space-y-8">
      {recentAdmins.map((admin, index) => (
        <div
          key={index}
          className="flex items-center p-1 text-primaryText rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group hover:font-bold"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
            <AvatarFallback>{admin.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{admin.name}</p>
            <p className="text-sm text-muted-foreground">
              Role: {admin.role}
            </p>
          </div>
        
        </div>
      ))}
    </div>
  );
};

export default RecentAdmins;
