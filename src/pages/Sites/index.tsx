import {
  Box,
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
import { title, toolbarMobile, toolbarWeb } from "../../styles";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { CreateTag } from "./createTag";
import { CreateSite } from "./createSite";
import { CreateProgram } from "./scheduleSearch";
import { ChangeEvent, useEffect, useState } from "react";
import { api } from "../../service/api";
import { useRefresh } from "../../shared/hooks/useRefresh";
import { toast } from "react-toastify";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import { deleteSite } from "../../service/site";

export function Sites() {
  const [rows, setRows] = useState([]);
  const { count } = useRefresh();
  const [search, setSearch] = useState({ column: "", value: "" });
  const [rowsFiltered, setRowsFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = React.useState(window?.innerWidth);

  useEffect(() => {
    listAll();
  }, [count]);

  const listAll = () => {
    setLoading(true);
    api
      .get("/api/referenceSite/")
      .then((res: any) => {
        setRows(res.data);
        setLoading(false);
      })
      .catch(() => {
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

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window?.innerWidth);
    });
  }, []);

  const handleSearch = () => {
    if (search.column === "" || search.value === "") {
      toast.error("Campo coluna e pesquisa não pode ser vazio");
    } else {
      console.log(search.column, search.value);
      const findRows = rows.filter(
        (item) =>
          String(item[search.column]).toLowerCase() ===
          String(search.value).toLowerCase()
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
  };

  const DeleteSite = (siteId: string) => {
    deleteSite(siteId)
      .then((response: any) => {
        if (response.status === 200) {
          listAll();
          toast.success("Site excluído com sucesso");
        }
      })
      .catch((error: any) => {
        toast.error(error?.response.data.detail);
      });
  };

  const filtered = rowsFiltered.length > 0;

  return (
    <>
      <Box style={windowSize < 800 ? toolbarMobile : toolbarWeb}>
        <Typography sx={title}>Sites</Typography>
        <Box sx={{ display: "flex", gap: 1}}>
          <FormControl size="small" sx={{minWidth: "140px"}}>
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
              <MenuItem value={"link"}>Link</MenuItem>
              <MenuItem value={"classificacao"}>Classificação</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{minWidth: "140px"}}>
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
          <CreateProgram />
          <CreateTag />
          <CreateSite />
        </Box>
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
          titleDelete="Excluir site?"
          onDelete={DeleteSite}
        />
      )}
    </>
  );
}
