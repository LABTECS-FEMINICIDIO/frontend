import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Dashboard } from "../../pages/Dashboard/dashboard";
import { Maps } from "../../pages/Dashboard/maps";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        flex: 1,
        display: value === index ? "flex" : "none",
        flexDirection: "column",
      }}
      {...other}
    >
      {value === index && (
        <Box sx={{ flex: 1 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Gráficos" {...a11yProps(0)} />
          <Tab label="Mapa" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <CustomTabPanel value={value} index={0}>
          <Dashboard />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Maps />
        </CustomTabPanel>
      </Box>
    </Box>
  );
}
