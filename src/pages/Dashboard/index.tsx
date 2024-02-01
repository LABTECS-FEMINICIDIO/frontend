import { Box, Grid, Typography } from "@mui/material";
import { Cards } from "./cards";
import { title } from "../../styles";
import DonutChart from "./charts";
import { MapPage } from "../../components/Maps";


export function Dashboard() {

  return (
    <>
      <Box sx={{ marginLeft: "13px", margimTop: 6, marginBottom: 2.5 }}>
        <Typography style={title}>Dashboard</Typography>
      </Box>
      <Box sx={{ display: "flex", gap: 2 }}>
        <Cards />
      </Box>
      <Grid container gap={5}>
        <Grid>
          <MapPage />
        </Grid>
        <Grid>
          <DonutChart />
        </Grid>
      </Grid>
    </>
  );
}
