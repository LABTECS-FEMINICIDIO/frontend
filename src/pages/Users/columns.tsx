import { Switch } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ResetPassword } from "./resetPassword";
import { updateUser } from "../../service/users";
import { EditUser } from "./editUserAdmin";
import { parsePhoneNumberFromString, format } from 'libphonenumber-js';
import { States } from "./states";
import { toast } from "react-toastify";

export const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Nome",
  },
  {
    field: "email",
    headerName: "E-mail",
  },
  {
    field: "contact",
    headerName: "Telefone",
    renderCell(params) {
      const phoneNumber = params.row.contact;
      const formattedPhoneNumber = formatPhoneNumber(phoneNumber);
      
      return formattedPhoneNumber;
    },
  },
  {
    field: "role",
    headerName: "Perfil",
  },
  {
    field: "cidades",
    headerName: "Cidades",
    align: "left",
    renderCell(params) {
      return (
       <States estados={params.row.permission} userEmail={params.row.email}/>
      );
    },
  },
  {
    field: "resetarSenha",
    headerName: "Resetar Senha",
    renderCell(params) {
      return (
       <ResetPassword userId={params.row.email}/>
      );
    },
  },
  {
    field: 'isBlocked',
    headerName: 'Acesso',
    renderCell: (params) => {
     
     const handleClick = async(id:string) => {
      console.log("aaa", params.row.isBlocked)
        const data: any = {
          isBlocked: (!params.row.isBlocked)
        }

        try {
          await updateUser(id, data)
          toast.success("Acesso atualizado com sucesso")
        } catch {
          toast.error("Ocorreu um erro")
        }
      }
      return (
        <Switch key={params.row.isBlocked} defaultChecked={!params.row.isBlocked} onClick={() => handleClick(params.row.id)}  />
      )
    },
  },
  {
    field: "editar",
    headerName: "",
    renderCell(params) {
      return (
       <EditUser id={params.row.id} user={params.row}/>
      );
    },
  },

];

const formatPhoneNumber = (phoneNumber: string) => {
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, 'BR');
  return parsedPhoneNumber ? parsedPhoneNumber.formatInternational() : phoneNumber;
};