import Typography from "@mui/material/Typography";
import { button, title, toolbar1 } from "../../styles";
import CollapsibleTable from "./collapseTable";
import { Box, Button } from "@mui/material";
import { colors } from "../../shared/theme";

export function Links() {
  return (
    <>
      <Box style={toolbar1}>
        <Typography style={title}>Links</Typography>
      <Box>
        <Button variant="contained" sx={button}>
          Cadastrar Site
        </Button>
      </Box>
      </Box>
      <CollapsibleTable />
    </>
  );
}
