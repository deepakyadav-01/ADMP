import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboard from "@/components/dashboard/Dashboard";
import EmployeeDashboard from "@/components/dashboard/EmployeeDashboard";
import { common } from "../lib/constants/string.json";

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
            <TabsList>
              <TabsTrigger
                className="border-none focus:outline-none text-primaryText"
                value="project"
              >
                {common.project}
              </TabsTrigger>
              <TabsTrigger
                className="border-none focus:outline-none text-primaryText"
                value="employee"
              >
                {common.user}
              </TabsTrigger>
            </TabsList>
            <TabsContent value="project" className="space-y-4">
              <Dashboard />
            </TabsContent>
            <TabsContent value="employee" className="space-y-4">
              <EmployeeDashboard />
            </TabsContent>
          </Tabs>
        </div> 
      </ScrollArea>
    </div>
  );
}
