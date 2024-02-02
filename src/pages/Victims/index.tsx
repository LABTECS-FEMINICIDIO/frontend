import { Box, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { title, toolbar1 } from "../../styles";
import { ChangeEvent, useEffect, useState } from "react";
import { columns } from "./columns";
import { api } from "../../service/api";
import { toast } from "react-toastify";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

export function Victims() {
    const [rows, setRows] = useState([])
    const [search, setSearch] = useState({ column: '', value: '' });
    const [rowsFiltered, setRowsFiltered] = useState([])

    useEffect(() => {
        api.get("/api/vitimas/").then((res) => {
            setRows(res.data)
        })
    }, [])



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
            //setCount(prevCount => prevCount + 1);
            const findRows = rows.filter((item) => (String(item[search.column]).toLowerCase()).includes(String(search.value).toLowerCase()))
            if (findRows.length == 0) {
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
        <Box sx={{ width: "95%" }}>
            <Box sx={toolbar1}>
                <Typography sx={title}>Vítimas</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
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
                                        <MenuItem value={"idade"}>Idade</MenuItem>
                                        <MenuItem value={"zona"}>Zona</MenuItem>
                                        <MenuItem value={"idade"}>Idade</MenuItem>
                                        <MenuItem value={"tipoarma1"}>Tipo arma 1</MenuItem>
                                        <MenuItem value={"tipoarma2"}>Tipo arma 2</MenuItem>
                                        <MenuItem value={"datadofato"}>Data do Fato</MenuItem>
                                        <MenuItem value={"filhosdescrever"}>Filhos Descrição</MenuItem>
                                        <MenuItem value={"gestacao"}>Gestação</MenuItem>
                                        <MenuItem value={"estciv2"}>Estado Civil</MenuItem>
                                        <MenuItem value={"endcomplemento"}>Endereço Complemento</MenuItem>
                                        <MenuItem value={"horario"}>Horário</MenuItem>
                                        <MenuItem value={"hospitalizacao"}>Hospitalização</MenuItem>
                                        <MenuItem value={"lat"}>Latitude</MenuItem>
                                        <MenuItem value={"lng"}>Longitude</MenuItem>
                                        <MenuItem value={"latrocinio"}>Latrocínio</MenuItem>
                                        <MenuItem value={"localdeocorrencia"}>Local de Ocorrência</MenuItem>
                                        <MenuItem value={"loclesao1"}>Local de Lesão 1</MenuItem>
                                        <MenuItem value={"loclesao2"}>Local de Lesão 2</MenuItem>
                                        <MenuItem value={"loclesao3"}>Local de Lesão 3</MenuItem>
                                        <MenuItem value={"presencafilhofamiliar"}>Presença de Filho/Familiar</MenuItem>
                                        <MenuItem value={"racacor1"}>Raça/Cor</MenuItem>
                                        <MenuItem value={"rua_beco_travessa_estrada_ramal"}>Rua/Beco/Travessa/Estrada/Ramal</MenuItem>
                                        <MenuItem value={"turno"}>Turno</MenuItem>
                                        <MenuItem value={"violsexual"}>Violência Sexual</MenuItem>
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
                    {/* <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Importar arquivo
            <VisuallyHiddenInput type="file" />
          </Button> */}
                </Box>
            </Box>
            <TableGrid rows={filtered ? rowsFiltered : rows} columns={columns} />
        </Box>
    )
}