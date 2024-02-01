import { Box, Typography } from "@mui/material";
import { title, toolbar1 } from "../../styles";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { CreateTag } from "./createTag";
import { CreateSite } from "./createSite";
import { CreateProgram } from "./scheduleSearch";
import { Search } from "../../components/Search";
import { useEffect, useState } from "react";
import { api } from "../../service/api";
import { useRefresh } from "../../shared/hooks/useRefresh";

export function Sites() {
  const [rows, setRows] = useState([])
  const { count } = useRefresh()

  useEffect(() => {
    api.get("/api/referenceSite/").then((res: any) => {
      setRows(res.data)
    })
  }, [, count])

  return (
    <>
      <Box sx={toolbar1}>
        <Typography sx={title}>Sites</Typography>
        <Box sx={{ display: "flex", flexWrap: 'wrap', gap: 1 }}>
          <Search column={''} value={''} />
          <CreateProgram />
          <CreateTag />
          <CreateSite />
        </Box>
      </Box>
      <TableGrid
        rows={rows}
        columns={columns}
      // titleDelete="Deseja realmente excluir este dado?" 
      />
    </>
  );
}
