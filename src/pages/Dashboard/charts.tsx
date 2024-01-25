import { Paper } from "@mui/material";
import { click } from "@testing-library/user-event/dist/click";
import React from "react";
import ReactApexChart from "react-apexcharts";

interface DonutChartProps {
  data: number[];
}

export const DonutChart: React.FC<DonutChartProps> = ({ data }) => {

  const handleChartClick = (event: any, chartContext: any, config: any) => {
    if (config !== undefined) {
      const dataPointIndex = event.target.parentElement.getAttribute("data:realIndex")
      // Obtendo a label da coluna clicada
      const label = chartOptions.labels[dataPointIndex];
  
      // Obtendo a cor da coluna clicada
      const color = chartOptions.colors[dataPointIndex];
  
      console.log({label, color});
    }
  };
  
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
          options={{...chartOptions, chart:{ events: {click: handleChartClick}}}}
          series={series}
          type="donut"
          width="90%"
        />
      </Paper>
    </>
  );
};

export default DonutChart;
