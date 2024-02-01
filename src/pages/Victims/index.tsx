import { Box, Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { title, toolbar1 } from "../../styles";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import { api } from "../../service/api";

export function Victims() {
    const [rows, setRows] = useState([])

    useEffect(() => {
        api.get("/api/vitimas/").then((res) => {
            setRows(res.data)
        })
    }, [])

    return (
        <Box sx={{ width: "95%" }}>
            <Box sx={toolbar1}>
                <Typography sx={title}>Vítimas</Typography>
            </Box>
            <TableGrid rows={rows} columns={columns} />
        </Box>
    )
}