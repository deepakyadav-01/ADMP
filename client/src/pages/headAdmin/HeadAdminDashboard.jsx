import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs } from "@/components/ui/tabs";
import HeadAdminDashboard from "@/components/dashboard/HeadAdmin/HeadAdminDashboard";
import { common } from "../../lib/constants/string.json";

//admin dashboard
export default function AdminDashboard() {
  return (
    <div className="h-screen overflow-hidden">
      <ScrollArea className="h-full">
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6 mt-10 sm:ml-48 justify-center items-center w-auto">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-primaryText">
              {common.welcome}
            </h2>
          </div>
          <Tabs defaultValue="project" className="space-y-4">
              <HeadAdminDashboard />
          </Tabs>
        </div> 
      </ScrollArea>
    </div>
  );
}
