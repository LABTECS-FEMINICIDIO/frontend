import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

export function Dashboard() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
        <iframe
          src="http://localhost:7000/public/dashboard/690fc0f5-9cef-467a-b129-97e512c37b22"
          frameBorder="0"
          width="1650"
          height="670"
          allowTransparency
        ></iframe>
      </Box>
    </>
  );
}
