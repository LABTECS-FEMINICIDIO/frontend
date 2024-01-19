import { Box, Typography } from "@mui/material";
import { Cards } from "./cards";
import { title} from "../../styles";
import DonutChart from "./charts";

  const feminicidePercentages = [30, 20, 25, 15];

export function Dashboard() {
  return (
    <>
      <Box sx={{marginLeft: '13px', margimTop: 6, marginBottom: 2.5}}>
        <Typography style={title}>Dashboard</Typography>
      </Box>
      <Box sx={{display: 'flex', gap: 2}}>
      <Cards />
      <DonutChart data={feminicidePercentages}/>
      </Box>
    </>
  );
}
