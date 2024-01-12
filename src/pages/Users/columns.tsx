import { IconButton, Switch } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import LockResetIcon from "@mui/icons-material/LockReset";

export const columns: GridColDef[] = [
  {
    field: "nome",
    headerName: "Nome",
  },
  {
    field: "email",
    headerName: "E-mail",
  },
  {
    field: "telefone",
    headerName: "Telefone",
  },
  {
    field: "resetarSenha",
    headerName: "Resetar Senha",
    renderCell(params) {
      return (
        <IconButton>
          <LockResetIcon />
        </IconButton>
      );
    },
  },
  {
    field: "Acesso",
    headerName: "Acesso",
    renderCell(params) {
      return <Switch />;
    },
  },
];
