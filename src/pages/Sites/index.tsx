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

export function Sites() {
  const [rows, setRows] = useState([]);
  const { count } = useRefresh();
  const [search, setSearch] = useState({ column: "", value: "" });
  const [rowsFiltered, setRowsFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = React.useState(window?.innerWidth);

  useEffect(() => {
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
  }, [, count]);

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

  const filtered = rowsFiltered.length > 0;

  return (
    <>
      <Box style={windowSize < 800 ? toolbarMobile : toolbarWeb}>
        <Box style={windowSize < 800 ? {}: {paddingRight: "580px"}}>
          <Typography sx={title}>Sites</Typography>
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
              <MenuItem value={"link"}>Link</MenuItem>
              <MenuItem value={"classificacao"}>Classificação</MenuItem>
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
        <CreateProgram />
        <CreateTag />
        <CreateSite />
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
        />
      )}
    </>
  );
}
