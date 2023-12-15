import { Box, Button, Typography } from "@mui/material";
import { button, title, toolbar1 } from "../../styles";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { CreateTag } from "./createTag";

export function Sites() {
  return (
    <>
      <Box sx={toolbar1}>
        <Typography sx={title}>Sites</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="outlined"
            endIcon={<AccessTimeFilledIcon />}
          >
            Programar
          </Button>
          <CreateTag/>
          <Button variant="contained" sx={button}>
            Cadastrar Site
          </Button>
        </Box>
      </Box>
      <TableGrid rows={[]} columns={columns} />
    </>
  );
}
