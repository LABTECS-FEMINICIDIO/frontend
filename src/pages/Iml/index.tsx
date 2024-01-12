import { Box, Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { title, toolbar1 } from "../../styles";
import { columns } from "./columns";

export function Iml(){
    return(
        <>
        <Box sx={toolbar1}>    
        <Typography style={title}>Relatório IML</Typography>
      </Box>
        <TableGrid rows={[]} columns={columns}/>
        </>
    )
}