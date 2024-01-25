import { Box, Typography } from "@mui/material";
import { title, toolbar1 } from "../../styles";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { CreateTag } from "./createTag";
import { CreateSite } from "./createSite";
import { CreateProgram } from "./scheduleSearch";
import { Search } from "../../components/Search";

export function Sites() {
  return (
    <>
      <Box sx={toolbar1}>
        <Typography sx={title}>Sites</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
         <CreateProgram/>
          <CreateTag/>
         <CreateSite/>
        </Box>
      </Box>
      <TableGrid rows={[]} columns={columns} />
    </>
  );
}
