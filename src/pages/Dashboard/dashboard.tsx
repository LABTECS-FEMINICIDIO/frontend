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
          src="https://24.199.108.245:3000/public/dashboard/f9723e06-9c4d-401a-b6e9-fec9ab7c9ab3"
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
