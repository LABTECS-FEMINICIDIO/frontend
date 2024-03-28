import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

export function Dashboard() {
  const [loadingMetabase, setLoadingMetabase] = useState(true);

  // Função para lidar com o evento de carregamento do Metabase
  const handleMetabaseLoad = () => {
    // Quando o Metabase estiver carregado, definimos o estado de loading como falso
    setLoadingMetabase(false);
  };

  return (
    <>
      {loadingMetabase && (
        <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "70vh",
        }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box sx={{ display: "flex", flexWrap: "wrap", mt: 1 }}>
        <iframe
          src="http://24.199.108.245:3000/public/dashboard/284ce180-8847-4d64-8e0e-8937f47e889c"
          frameBorder="0"
          width="1650"
          height="670"
          allowTransparency
          onLoad={handleMetabaseLoad}
        />
      </Box>
    </>
  );
}
