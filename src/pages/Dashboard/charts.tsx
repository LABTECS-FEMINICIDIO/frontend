import { Paper } from "@mui/material";
import { click } from "@testing-library/user-event/dist/click";
import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { api } from "../../service/api";



export const DonutChart: React.FC = () => {
  const [vitimas, setVitimas] = useState([])
  const [series, setSeries] = useState<number[]>([])

  useEffect(() => {
    api.get("/api/vitimas/").then((res: any) => {
      setVitimas(res.data)
    })
  }, [])

  useEffect(() => {
    const zonaNorte: number = vitimas.filter((item: any) => (item.zona).toLowerCase() === "norte").length
    const zonaLeste: number = vitimas.filter((item: any) => (item.zona).toLowerCase() === "leste").length
    const zonaSul: number = vitimas.filter((item: any) => (item.zona).toLowerCase() === "sul").length
    const zonaOeste: number = vitimas.filter((item: any) => (item.zona).toLowerCase() === "oeste").length
    const zonaCentroOeste: number = vitimas.filter((item: any) => (item.zona).toLowerCase() === "centro-oeste").length
    const zonaCentroSul: number = vitimas.filter((item: any) => (item.zona).toLowerCase() === "centro-sul").length

    setSeries([zonaNorte, zonaSul, zonaLeste, zonaOeste, zonaCentroOeste, zonaCentroSul])
  }, [vitimas])

  const handleChartClick = (event: any, chartContext: any, config: any) => {
    if (config !== undefined) {
      const dataPointIndex = event.target.parentElement.getAttribute("data:realIndex")

      const label = chartOptions.labels[dataPointIndex];

      // Obtendo a cor da coluna clicada
      const color = chartOptions.colors[dataPointIndex];

      console.log({ label, color });
    }
  };

  const chartOptions = {
    labels: ["Norte", "Sul", "Leste", "Oeste", "Centro-Oeste", "Centro-Sul"],
    colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#6A0572", "#FF7F50"],
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

  return (
    <>
      <Paper elevation={2} sx={{ width: 600, marginTop: 1, padding: 2 }}>
        <ReactApexChart
          options={{ ...chartOptions, chart: { events: { click: handleChartClick } } }}
          series={series}
          type="donut"
          width="90%"
        />
      </Paper>
    </>
  );
};

export default DonutChart;
