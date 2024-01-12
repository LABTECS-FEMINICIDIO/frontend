import { Box, Typography } from "@mui/material";
import { title, toolbar1 } from "../../styles";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { toast } from "react-toastify";
import { CreateHoliday } from "./createHoliday";

export function Calendar() {
  const [rows, setRows] = useState([])

  const findCalendar = () => {
    api.get("https://brasilapi.com.br/api/feriados/v1/2024")
      .then((response) => {
        const rowsWithIds = response.data.map((row: any, index: number) => ({
          ...row,
          id: index + 1
        }));
        setRows(rowsWithIds);
      })
      .catch((error: any) => {
        toast.error("Erro ao carregar calendário");
      });
  };

  useEffect(() => {
    findCalendar();
  }, []);

  return (
    <>
      <Box sx={toolbar1}>    
        <Typography style={title}>Calendário</Typography>
        <CreateHoliday/>
      </Box>
      <TableGrid rows={rows} columns={columns} />
    </>
  );
}
