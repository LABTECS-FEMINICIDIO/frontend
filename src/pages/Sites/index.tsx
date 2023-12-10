import { Box, Button, Typography } from "@mui/material";
import { button, title, toolbar1 } from "../../styles";
import { TableGrid } from "../../components/TableGrid";
import { columns } from "./columns";
import { colors } from "../../shared/theme";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

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
          <Button variant="outlined" endIcon={<AddCircleIcon />}>
            Adicionar Tags
          </Button>
          <Button variant="contained" sx={button}>
            Cadastrar Site
          </Button>
        </Box>
      </Box>
      <TableGrid rows={[]} columns={columns} />
    </>
  );
}
