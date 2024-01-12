import { Box, Typography } from "@mui/material";
import { Cards } from "./cards";
import { title} from "../../styles";
import { Dashboards } from "./dashboard";

export function Dashboard() {
  return (
    <>
      <Box sx={{marginLeft: '13px', margimTop: 5}}>
        <Typography style={title}>Dashboard</Typography>
      </Box>
      <Cards />
      <Dashboards/>
    </>
  );
}
