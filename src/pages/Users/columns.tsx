import { Switch } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ResetPassword } from "./resetPassword";
import { updateUser } from "../../service/users";
import { EditUser } from "./editUserAdmin";
import { parsePhoneNumberFromString, format } from 'libphonenumber-js';

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
    renderCell(params) {
      const phoneNumber = params.row.telefone;
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      
      return formattedPhoneNumber;
    },
  },
  {
    field: "perfil",
    headerName: "Perfil",
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
    field: "editar",
    headerName: "",
    renderCell(params) {
      return (
       <EditUser id={params.row.id}/>
      );
    },
  },

];

const formatPhoneNumber = (phoneNumber: string) => {
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'BR');
  return parsedPhoneNumber ? parsedPhoneNumber.formatInternational() : phoneNumber;
};