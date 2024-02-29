import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { title, toolbarMobile, toolbarWeb } from "../../styles";
import { ChangeEvent, useEffect, useState } from "react";
import { columns } from "./columns";
import { api } from "../../service/api";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { saveAs } from "file-saver";
import React from "react";
import { deleteVictims } from "../../service/victims";
import { useRefresh } from "../../shared/hooks/useRefresh";

export function Victims() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState({ column: "", value: "" });
  const [rowsFiltered, setRowsFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const { count } = useRefresh();
  const [windowSize, setWindowSize] = React.useState(window?.innerWidth);

  useEffect(() => {
    listAll();
  }, [count]);

  const listAll = () => {
    setLoading(true);
    api
      .get("/api/vitimas/")
      .then((res) => {
        setLoading(false);
        setRows(res.data);
      })
      .catch((error) => {
        toast.error(error?.response.data.detail);
        setLoading(false);
      });
  };

  const handleValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleColumn = (event: SelectChangeEvent) => {
    setSearch((state) => ({
      ...state,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const handleSearch = () => {
    if (search.column === "" || search.value === "") {
      toast.error("Campo coluna e pesquisa não pode ser vazio");
    } else {
      //setCount(prevCount => prevCount + 1);
      const findRows = rows.filter((item) =>
        String(item[search.column])
          .toLowerCase()
          .includes(String(search.value).toLowerCase())
      );
      if (findRows.length === 0) {
        toast.error("Nenhum resultado encontrado para esta pesquisa.");
      }
      setRowsFiltered(findRows);
    }
  };

  const handleClear = () => {
    setSearch({ column: "", value: "" });
    setRowsFiltered([]);
    //setCount(prevCount => prevCount + 1);
  };

  const filtered = rowsFiltered.length > 0;

  const handleExportClick = async () => {
    try {
      const response = await api.get("/api/export-xlsx", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      saveAs(blob, "export.xlsx");
    } catch (error) {
      console.error("Erro ao exportar o arquivo:", error);
    }
  };

  const DeleteVictims = (vitimaId: string) => {
    deleteVictims(vitimaId)
      .then((response: any) => {
        if (response.status === 200) {
          listAll();
          toast.success("Dados da vítima excluídos com sucesso");
        }
      })
      .catch((error: any) => {
        toast.error(error?.response.data.datail);
      });
  };

  return (
    <Box sx={{ width: "95%" }}>
      <Box style={windowSize < 800 ? toolbarMobile : toolbarWeb}>
        <Box style={windowSize < 800 ? {} : { paddingRight: "800px" }}>
          <Typography sx={title}>Vítimas</Typography>
        </Box>
          <Box>
            <FormControl sx={{ minWidth: 140 }} size="small" fullWidth>
              <InputLabel id="demo-select-small">Coluna</InputLabel>
              <Select
                name="column"
                value={search.column}
                labelId="demo-select-small"
                id="demo-select-small"
                label="coluna"
                onChange={handleColumn}
              >
                <MenuItem value={"nome"}>Nome</MenuItem>
                <MenuItem value={"idade"}>Idade</MenuItem>
                <MenuItem value={"zona"}>Zona</MenuItem>
                <MenuItem value={"idade"}>Idade</MenuItem>
                <MenuItem value={"tipoarma1"}>Tipo arma 1</MenuItem>
                <MenuItem value={"tipoarma2"}>Tipo arma 2</MenuItem>
                <MenuItem value={"datadofato"}>Data do Fato</MenuItem>
                <MenuItem value={"filhosdescrever"}>Filhos Descrição</MenuItem>
                <MenuItem value={"gestacao"}>Gestação</MenuItem>
                <MenuItem value={"estciv2"}>Estado Civil</MenuItem>
                <MenuItem value={"endcomplemento"}>
                  Endereço Complemento
                </MenuItem>
                <MenuItem value={"horario"}>Horário</MenuItem>
                <MenuItem value={"hospitalizacao"}>Hospitalização</MenuItem>
                <MenuItem value={"lat"}>Latitude</MenuItem>
                <MenuItem value={"lng"}>Longitude</MenuItem>
                <MenuItem value={"latrocinio"}>Latrocínio</MenuItem>
                <MenuItem value={"localdeocorrencia"}>
                  Local de Ocorrência
                </MenuItem>
                <MenuItem value={"loclesao1"}>Local de Lesão 1</MenuItem>
                <MenuItem value={"loclesao2"}>Local de Lesão 2</MenuItem>
                <MenuItem value={"loclesao3"}>Local de Lesão 3</MenuItem>
                <MenuItem value={"presencafilhofamiliar"}>
                  Presença de Filho/Familiar
                </MenuItem>
                <MenuItem value={"racacor1"}>Raça/Cor</MenuItem>
                <MenuItem value={"rua_beco_travessa_estrada_ramal"}>
                  Rua/Beco/Travessa/Estrada/Ramal
                </MenuItem>
                <MenuItem value={"turno"}>Turno</MenuItem>
                <MenuItem value={"violsexual"}>Violência Sexual</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box>
            <FormControl size="small" fullWidth>
              <TextField
                name="value"
                color="secondary"
                variant="outlined"
                label="Pesquisar"
                value={search.value}
                onChange={handleValue}
                onKeyDown={({ key }) => key === "Enter" && handleSearch()}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        type="submit"
                        onClick={() => {
                          handleSearch();
                        }}
                        aria-label="search"
                      >
                        <SearchIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          handleClear();
                        }}
                        aria-label="delete"
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
        </Box>
        <Button
          component="label"
          variant="contained"
          onClick={handleExportClick}
        >
          Exportar
        </Button>
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableGrid
          rows={filtered ? rowsFiltered : rows}
          columns={columns}
          onDelete={DeleteVictims}
          titleDelete="Excluir dados da vítima?"
        />
      )}
    </Box>
  );
}
