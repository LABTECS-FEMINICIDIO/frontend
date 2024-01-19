import { Paper } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface DonutChartProps {
  data: number[];
}

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {
  const chartOptions = {
    labels: ["Norte", "Sul", "Leste", "Oeste"],
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "top",
          },
        },
      },
    ],
  };

  const series = data;

  return (
    <>
      <Paper elevation={2} sx={{width: 600, marginTop: 1, padding: 2}}>
        <ReactApexChart
          options={chartOptions}
          series={series}
          type="donut"
          width="100%"
        />
      </Paper>
    </>
  );
};

export default DonutChart;
