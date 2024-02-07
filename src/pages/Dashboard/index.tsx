import { Box, FormControl, Grid, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { Cards } from "./cards";
import { title } from "../../styles";
import DonutChart from "./charts";
import { MapPage } from "../../components/Maps";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { toast } from "react-toastify";
import { useToken } from "../../shared/hooks/auth";


export function Dashboard() {
  const { perfil } = useToken();

  const [vitimas, setVitimas] = useState<any[]>([])
  const [search, setSearch] = useState({ column: '', value: '' });
  const [rowsFiltered, setRowsFiltered] = useState<any[]>([])

  useEffect(() => {
    api.get("/api/vitimas/").then((res) => {
      setVitimas(res.data)
    })
  }, [])

  
  const handleValue = (event: any) => {
    setSearch(state => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const handleColumn = (event: any) => {
    setSearch(state => ({
      ...state,
      [event.target.name]: event.target.value.trim(),
    }));
  };

  const handleClear = () => {
    setSearch({ column: '', value: '' });
    setRowsFiltered([])
  };

  const handleSearch = () => {
    if (search.column === '' || search.value === '') {
      toast.error('Campo coluna e pesquisa não pode ser vazio');
    } else {
      console.log(vitimas[1].datadofato.split("-"))

      if(search.column == "mes"){
        const findRows = vitimas.filter((item) => item.datadofato.split("-")[1] == search.value)
        if (findRows.length === 0) {
          toast.error('Nenhum resultado encontrado para esta pesquisa.')
        }
        setRowsFiltered(findRows)
      }else{
        const findRows = vitimas.filter((item) => item.datadofato.split("-")[0] == search.value)
        if (findRows.length === 0) {
          toast.error('Nenhum resultado encontrado para esta pesquisa.')
        }
        setRowsFiltered(findRows)
      }

    }
  };
  

  return (
    <>
      <Box sx={{ marginLeft: "13px", margimTop: 6, marginBottom: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Typography style={title}>Dashboard</Typography>
        <Box sx={{display: "flex", gap: "10px"}}>
              <Box>
                <FormControl sx={{ minWidth: 140 }} size="small">
                  <InputLabel id="demo-select-small">Data/mês/ano</InputLabel>
                  <Select
                    name="column"
                    value={search.column}
                    labelId="demo-select-small"
                    id="demo-select-small"
                    label="Data/mês/ano"
                    onChange={handleColumn}>
                    {/* <MenuItem value={"data"}>Data</MenuItem> */}
                    <MenuItem value={"mes"}>Mês</MenuItem>
                    <MenuItem value={"ano"}>Ano</MenuItem>
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
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Cards vitimas={rowsFiltered.length > 0 ? rowsFiltered : vitimas}/>
      </Box>
      <Grid container gap={5}>
        <Grid>
          {perfil != "visualizador" && <MapPage vitimas={rowsFiltered.length > 0 ? rowsFiltered : vitimas} />}
        </Grid>
        <Grid>
          <DonutChart vitimas={rowsFiltered.length > 0 ? rowsFiltered : vitimas} />
        </Grid>
      </Grid>
    </>
  );
}
