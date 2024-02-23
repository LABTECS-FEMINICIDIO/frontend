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
import { columns } from "./columns";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { ChangeEvent, useEffect, useState } from "react";
import { findImlData, findManyIml } from "../../service/iml";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import { api } from "../../service/api";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function Iml() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = React.useState(window?.innerWidth);

  useEffect(() => {
    setLoading(true);
    findManyIml();
    findImlData()
      .then((res) => {
        setRows(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const [search, setSearch] = useState({ column: "", value: "" });
  const [rowsFiltered, setRowsFiltered] = useState([]);

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

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      api
        .post("api/uploadIml", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => findImlData())
        .then((updatedData) => {
          setRows(updatedData.data);
          toast.success("Arquivo importado com sucesso");
        })
        .catch((error) => {
          console.error("Erro ao importar o arquivo", error);
          toast.error(error.response.data.detail);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleClear = () => {
    setSearch({ column: "", value: "" });
    setRowsFiltered([]);
  };

  const filtered = rowsFiltered.length > 0;

  return (
    <>
      <Box style={windowSize < 800 ? toolbarMobile : toolbarWeb}>
        <Box style={windowSize < 800 ? {} : { paddingRight: "800px" }}>
          <Typography sx={title}>Relatório IML</Typography>
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
              <MenuItem value={"dataEntrada"}>Data de entrada</MenuItem>
              <MenuItem value={"horaEntrada"}>Hora de entrada</MenuItem>
              <MenuItem value={"sexo"}>Sexo</MenuItem>
              <MenuItem value={"idade"}>Idade</MenuItem>
              <MenuItem value={"bairroDaRemocao"}>Bairro da remoção</MenuItem>
              <MenuItem value={"causaMorte"}>Causa da morte</MenuItem>
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
          startIcon={<CloudUploadIcon />}
        >
          Importar arquivo
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
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
        <TableGrid rows={filtered ? rowsFiltered : rows} columns={columns} />
      )}
    </>
  );
}
