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
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { title, toolbarMobile, toolbarWeb } from "../../styles";
import { ChangeEvent, useEffect, useState } from "react";
import { deleteUser, findById, findManyUsers } from "../../service/users";
import { toast } from "react-toastify";
import { useRefresh } from "../../shared/hooks/useRefresh";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { CreateUser } from "./createUser";
import React from "react";

export function Users() {
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState({ column: "", value: "" });
  const [rowsFiltered, setRowsFiltered] = useState([]);
  const { count } = useRefresh();
  const [loading, setLoading] = useState(true);
  const [windowSize, setWindowSize] = React.useState(window?.innerWidth);

  useEffect(() => {
    listAll();
  }, [count]);

  const listAll = () => {
    setLoading(true);
    findManyUsers()
      .then((response) => {
        setRows(response.data);
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error?.response.data.detail);
        setLoading(false);
      });
  };

  const OpenModalEdit = async (id: string) => {
    await findById(id)
      .then((response) => {})
      .catch((error) => {
        toast.error(error?.response.data.detail);
      });
  };

  const DeleteUser = (userId: string) => {
    deleteUser(userId)
      .then((response: any) => {
        if (response.status === 200) {
          listAll();
          toast.success("Usuário excluído com sucesso");
        }
      })
      .catch((error: any) => {
        toast.error(error?.response.data.datails);
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

  React.useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize(window?.innerWidth);
    });
  }, []);

  const handleClear = () => {
    setSearch({ column: "", value: "" });
    setRowsFiltered([]);
    //setCount(prevCount => prevCount + 1);
  };

  const filtered = rowsFiltered.length > 0;

  return (
    <>
      <Box style={windowSize < 800 ? toolbarMobile : toolbarWeb}>
        <Box style={windowSize < 800 ? {} : { paddingRight: "895px" }}>
          <Typography sx={title}>Usuários</Typography>
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
              <MenuItem value={"email"}>Email</MenuItem>
              <MenuItem value={"telefone"}>Telefone</MenuItem>
              <MenuItem value={"acesso"}>Acesso</MenuItem>
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
        <CreateUser />
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
          titleDelete="Excluir usuário?"
          onDelete={DeleteUser}
          onEdit={OpenModalEdit}
        />
      )}
    </>
  );
}
