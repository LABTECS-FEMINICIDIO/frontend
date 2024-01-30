import { Box,Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { title, toolbar1 } from "../../styles";
import { CreateUser } from "./createUser";
import { useEffect, useState } from "react";
import { deleteUser, findById, findManyUsers } from "../../service/users";
import { toast } from "react-toastify";
import { useRefresh } from "../../shared/hooks/useRefresh";
import { Search } from "../../components/Search";
import { EditUser } from "./editUser";
  
export function Users(){
    const [rows, setRows] = useState([])
    const [isEdit, setIsEdit] = useState(0)

    const { count } = useRefresh();

    useEffect(() => {
        listAll();
    }, [count]);

    const listAll = () => {
        findManyUsers()
          .then(response => {
            setRows(response.data);
          })
          .catch(error => {
            toast.error(error.response.data.message);
          });
      };

      const OpenModalEdit = async (id: string) => {
        await findById(id).then(response => {
         setIsEdit(1)
        }).catch(error => {
          toast.error(error.response.data.message);
        });
    console.log('editaaar', isEdit)
      };
      
      const DeleteUser = (userId: string) => {
        deleteUser(userId)
          .then((response: any) => {
            if (response.status === 200) {
              listAll();
              toast.success('Usuário excluído com sucesso');
            }
          })
          .catch((error: any) => {
            toast.error(error.response.data.datails);
          });
      };
      

    return(
        <>
        <Box sx={toolbar1}>    
         <Typography sx={title}>Usuários</Typography>
         <Box sx={{display: 'flex', gap: 1}}>
         <Search column={undefined} value={undefined}/>
         <CreateUser/>
         {isEdit ? <EditUser/> : ''

         }
         </Box>
        </Box>
        <TableGrid 
        rows={rows} 
        columns={columns}
        titleDelete="Excluir usuário?"
        onDelete={DeleteUser}
        onEdit={OpenModalEdit}
        />
        </>
    )
}