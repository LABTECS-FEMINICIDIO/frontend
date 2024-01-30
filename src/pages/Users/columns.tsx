import { Switch } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ResetPassword } from "./resetPassword";


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
       <ResetPassword userId={params.row.id}/>
      );
    },
  },
  {
    field: 'Acesso',
    headerName: 'Acesso',
    renderCell: (params) => (
      <Switch checked={params.row.acesso} /* onChange={() => handleChange(params.row.id)} */ />
    ),
  },
];
