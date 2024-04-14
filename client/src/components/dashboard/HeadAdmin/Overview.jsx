import { useState } from "react";
import Chart from "react-apexcharts";

// Hardcoded data for demonstration
const hardcodedApplicantsPerMonth = [10, 15, 20, 18, 25, 30, 22, 28, 35, 40, 45, 50];

const Overview = () => {
  const [options] = useState({
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

  const [series] = useState([
    {
      name: "Applicants",
      data: hardcodedApplicantsPerMonth,
    },
  ]);

  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width="100%" />
        </div>
      </div>
    </div>
  );
};

export default Overview;
