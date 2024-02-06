import { Switch } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ResetPassword } from "./resetPassword";
import { updateUser } from "../../service/users";
import { EditUser } from "./editUser";

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
    renderCell: (params) => {
     
     const handleClick = async(id:string) => {
        const data: any = {
          acesso: (!params.row.acesso)
        } 
        await updateUser(id, data)
      }
      return (
        <Switch key={params.row.acesso} defaultChecked={params.row.acesso} onClick={() => handleClick(params.row.id)}  />
      )
    },
  },
  {
    field: "resetarSenha",
    headerName: "Resetar Senha",
    renderCell(params) {
      return (
       <EditUser id={params.row.id}/>
      );
    },
  },
];
