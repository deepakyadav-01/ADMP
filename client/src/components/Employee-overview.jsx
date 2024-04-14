import { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getEmployees } from "@/services/adminService";

// employee overview page
const EmployeeOverview = () => {
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
      name: "Employees",
      data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Initialize with zeros
    },
  ]);
  useEffect(() => {
    getEmployees()
      .then((response) => {
        const employees = response.data.formData;

        const employeesPerMonth = new Array(12).fill(0); // Initialize array to hold employees count per month

        employees.forEach((employee) => {
          const createdAt = new Date(employee.createdAt);
          const month = createdAt.getMonth();
          employeesPerMonth[month] += 1;
        });

        setSeries([{ name: "Employees", data: employeesPerMonth }]);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="line" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default EmployeeOverview;
