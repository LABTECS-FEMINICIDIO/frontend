import { Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { title, toolbar1 } from "../../styles";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { CreateTag } from "./createTag";
import { CreateSite } from "./createSite";
import { CreateProgram } from "./scheduleSearch";
import { ChangeEvent, useEffect, useState } from "react";
import { api } from "../../service/api";
import { useRefresh } from "../../shared/hooks/useRefresh";
import { toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export function Sites() {
  const [rows, setRows] = useState([])
  const { count } = useRefresh()
  const [search, setSearch] = useState({ column: '', value: '' });
  const [rowsFiltered, setRowsFiltered] = useState([])

  useEffect(() => {
    api.get("/api/referenceSite/").then((res: any) => {
      setRows(res.data)
    })
  }, [, count])


  const handleValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleColumn = (event: SelectChangeEvent) => {
    setSearch(state => ({
      ...state,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const handleSearch = () => {
    if (search.column === '' || search.value === '') {
      toast.error('Campo coluna e pesquisa não pode ser vazio');
    } else {
      console.log(search.column, search.value)
      //setCount(prevCount => prevCount + 1);
      const findRows = rows.filter((item) => String(item[search.column]).toLowerCase() === String(search.value).toLowerCase())
      if (findRows.length === 0) {
        toast.error('Nenhum resultado encontrado para esta pesquisa.')
      }
      setRowsFiltered(findRows)
    }
  };

  const handleClear = () => {
    setSearch({ column: '', value: '' });
    setRowsFiltered([])
    //setCount(prevCount => prevCount + 1);
  };

  const filtered = rowsFiltered.length > 0

  return (
    <>
      <Box sx={toolbar1}>
        <Typography sx={title}>Sites</Typography>
        <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', gap: '0.3125rem' }}>
            <Box>
              <FormControl sx={{ minWidth: 140 }} size="small">
                <InputLabel id="demo-select-small">Coluna</InputLabel>
                <Select
                  name="column"
                  value={search.column}
                  labelId="demo-select-small"
                  id="demo-select-small"
                  label="coluna"
                  onChange={handleColumn}>
                  <MenuItem value={"nome"}>Nome</MenuItem>
                  <MenuItem value={"link"}>Link</MenuItem>
                  <MenuItem value={"classificacao"}>Classificação</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl size="small">
                <TextField
                  name="value"
                  color="secondary"
                  variant="outlined"
                  label="Pesquisar"
                  value={search.value}
                  onChange={handleValue}
                  onKeyDown={({ key }) => key === 'Enter' && handleSearch()}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          type="submit"
                          onClick={() => {
                            handleSearch();
                          }}
                          aria-label="search">
                          <SearchIcon />
                        </IconButton>
                        <IconButton
                          onClick={() => {
                            handleClear();
                          }}
                          aria-label="delete">
                          <ClearIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
            </Box>
          </Box>
          <CreateProgram />
          <CreateTag />
          <CreateSite />
        </Box>
      </Box>
      <TableGrid
        rows={filtered ? rowsFiltered : rows}
        columns={columns}
      // titleDelete="Deseja realmente excluir este dado?" 
      />
    </>
  );
}
