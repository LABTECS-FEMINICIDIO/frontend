import Typography from "@mui/material/Typography";
import { title, toolbarWeb } from "../../styles";
import CollapsibleTable from "./collapseTable";
import { Box} from "@mui/material";

export function Links() {
  return (
    <>
      <Box style={toolbarWeb}>
        <Typography style={title}>Links</Typography>
      </Box>
      <CollapsibleTable />
    </>
  );
}
