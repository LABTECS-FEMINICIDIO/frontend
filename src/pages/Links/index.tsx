import Typography from "@mui/material/Typography";
import { title, toolbar1 } from "../../styles";
import CollapsibleTable from "./collapseTable";
import { Box} from "@mui/material";
import { Search } from "../../components/Search";

export function Links() {
  return (
    <>
      <Box style={toolbar1}>
        <Typography style={title}>Links</Typography>
      </Box>
      <CollapsibleTable />
    </>
  );
}
