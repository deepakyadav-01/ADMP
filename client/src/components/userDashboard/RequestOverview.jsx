import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { osRequestEmployee } from "@/services/projectService";
import { CurrentUser } from "../../hooks/CurrentUser";

//request overview page to display the request per month
const RequestOverview = () => {
  // eslint-disable-next-line no-unused-vars  
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar", 
    }, 
    xaxis: { 
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "requests",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Initialize with zeros
    },
  ]);

  const currentUser = CurrentUser();

  useEffect(() => {
    const fetchData = () => {
      if (currentUser) {
        osRequestEmployee(currentUser?.git_username)
          .then((data) => {
            const projectsPerMonth = new Array(12).fill(0);
            data.forEach((project) => {
              const createdAt = new Date(project.createdAt);
              const month = createdAt.getMonth();
              projectsPerMonth[month] += 1;
            });
            setSeries([{ name: "Requests", data: projectsPerMonth }]);
          })
          .catch((error) => {
            console.error("Error fetching projects:", error);
          });
      }
    };
    fetchData();
  }, [currentUser]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={options}
            series={series}
            type="bar"
            width="100%"
            height="400px"
          />
        </div>
      </div>
    </div>
  );
};

export default RequestOverview;
