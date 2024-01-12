import { Box, Button, Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { title, toolbar1 } from "../../styles";
import { CreateUser } from "./createUser";
import { useEffect, useState } from "react";
import { findManyUsers } from "../../service/users";
import { toast } from "react-toastify";
  
export function Users(){
    const [rows, setRows] = useState([])
    const [loading, setLoading] = useState(true)

    const listAll = () => {
        findManyUsers()
          .then(response => {
            setRows(response.data);
            setLoading(false)
          })
          .catch(error => {
            toast.error(error.response.data.message);
          });
      };

      useEffect(() => {
          listAll();
      }, []);


    return(
        <>
        <Box sx={toolbar1}>    
         <Typography sx={title}>Usuários</Typography>
         <CreateUser/>
        </Box>
        <TableGrid rows={rows} columns={columns}/>
        </>
    )
}