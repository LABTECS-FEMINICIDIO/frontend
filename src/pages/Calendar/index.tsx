import { Box, Button, Typography } from "@mui/material";
import { title, toolbar1 } from "../../styles";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { toast } from "react-toastify";
import { CreateHoliday } from "./createHoliday";
import UpdateIcon from '@mui/icons-material/Update';

export function Calendar() {
  const [rows, setRows] = useState([])
  const [anoAtual, setAnoAtual] = useState<number>(() => {
    // Inicializa o ano atual com o valor armazenado no localStorage ou o ano atual real
    const storedYear = localStorage.getItem('anoAtual');
    return storedYear ? parseInt(storedYear, 10) : new Date().getFullYear();
  });

  useEffect(() => {
  const findCalendar = () => {
    api.get(`https://brasilapi.com.br/api/feriados/v1/${anoAtual}`)
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
    findCalendar();
  }, [anoAtual]);

  // Função para atualizar o ano
  const handleAnoAtualChange = () => {
    const anoAtualNovo = anoAtual + 1;
    setAnoAtual(anoAtualNovo);
    localStorage.setItem('anoAtual', anoAtualNovo.toString());
  };

  return (
    <>
      <Box sx={toolbar1}>    
        <Typography style={title}>Calendário</Typography>
        <Box sx={{display: "flex", flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 1}}>
        <Typography sx={{fontWeight: 'lighter'}}>Ano Atual: {anoAtual} </Typography>
        <Button onClick={handleAnoAtualChange} variant="outlined" startIcon={<UpdateIcon />}>Atualizar Ano</Button>
        <CreateHoliday/>
        </Box>
      </Box>
      <TableGrid rows={rows} columns={columns} />
    </>
  );
}
