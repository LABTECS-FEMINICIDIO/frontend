import { Switch } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ResetPassword } from "./resetPassword";
import { useState } from "react";
import { updateUser } from "../../service/users";
import { IUser } from "../../models/users";

interface IAcesso{
  id: string
  userId: string
  currentAcesso: string
}
/* const handleChange = (userId: IAcesso, currentAcesso: IAcesso) => {
  setLocalState(userId, !currentAcesso);
  sendToBackend(userId, !currentAcesso);
  console.log('aquiiiiiiiii', userId, currentAcesso)
}; */

/* const setLocalState = (userId: IAcesso , newAcesso: IAcesso ) => {
  const [data, setData] = useState([]);

  const newData = data.map((item) => 
    item.id === userId ? { ...item, acesso: newAcesso } : item
  );
  setData(newData);
};} */

/* const sendToBackend = (userId: any, newAcesso: any) => {
  console.log(`Enviando para o backend: userId=${userId}, acesso=${newAcesso}`);
};
 */
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
];
