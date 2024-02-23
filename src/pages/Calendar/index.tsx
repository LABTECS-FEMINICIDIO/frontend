import { Box, Button, Typography } from "@mui/material";
import { title, toolbarMobile, toolbarWeb } from "../../styles";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { toast } from "react-toastify";
import { CreateHoliday } from "./createHoliday";
import UpdateIcon from "@mui/icons-material/Update";
import React from "react";

export function Calendar() {
  const [rows, setRows] = useState([]);
  const [anoAtual, setAnoAtual] = useState<number>(() => {
    // Inicializa o ano atual com o valor armazenado no localStorage ou o ano atual real
    const storedYear = localStorage.getItem("anoAtual");
    return storedYear ? parseInt(storedYear, 10) : new Date().getFullYear();
  });
  const [windowSize, setWindowSize] = React.useState(window?.innerWidth);
  const isBotaoAtualizarHabilitado = anoAtual !== new Date().getFullYear();

  useEffect(() => {
    const findCalendar = () => {
      api
        .get(`https://brasilapi.com.br/api/feriados/v1/${anoAtual}`)
        .then((response) => {
          const rowsWithIds = response.data.map((row: any, index: number) => ({
            ...row,
            id: index + 1,
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
    localStorage.setItem("anoAtual", anoAtualNovo.toString());
  };

/*   // Função para voltar para o ano atual
  const handleVoltarParaAnoAtual = () => {
    const anoAtualReal = new Date().getFullYear();
    setAnoAtual(anoAtualReal);
    localStorage.setItem("anoAtual", anoAtualReal.toString());
  }; */

  return (
    <>
      <Box style={windowSize < 800 ? toolbarMobile : toolbarWeb}>
        <Box
          style={
            windowSize < 800
              ? {}
              : { paddingRight: "1130px", display: "flex", flexWrap: "wrap" }
          }
        >
          <Typography sx={title}>Calendário</Typography>
        </Box>
        <Button
          onClick={handleAnoAtualChange}
          variant="outlined"
          startIcon={<UpdateIcon />}
          disabled={!isBotaoAtualizarHabilitado}
        >
          Atualizar Ano
        </Button>
{/*         <Button
          onClick={handleVoltarParaAnoAtual}
          variant="outlined"
          startIcon={<UpdateIcon />}
          disabled={!isBotaoAtualizarHabilitado}
        >
          Voltar para o Ano Atual
        </Button> */}
        <CreateHoliday />
      </Box>
      <TableGrid rows={rows} columns={columns} />
      <Typography sx={{ fontWeight: "lighter" }}>
        Ano Atual: {anoAtual}{" "}
      </Typography>
    </>
  );
}
