import { Box, Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { title, toolbar1 } from "../../styles";
import { useState } from "react";
import { columns } from "./columns";

export function Victims(){
    const [rows, setRows] = useState([])
    
    return(
        <>
        <Box sx={toolbar1}>    
         <Typography sx={title}>Vítimas</Typography>
        </Box>
        <TableGrid rows={rows} columns={columns}/>
        </>
    )
}