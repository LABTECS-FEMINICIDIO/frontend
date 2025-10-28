import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useToken } from "../../shared/hooks/auth";

export function Dashboard() {
  const [loadingMetabase, setLoadingMetabase] = useState(true);
  const [metabaseLink, setMetabaseLink] = useState("");
  // Função para lidar com o evento de carregamento do Metabase
  const handleMetabaseLoad = () => {
    // Quando o Metabase estiver carregado, definimos o estado de loading como falso
    setLoadingMetabase(false);
  };

  const { selectedState } = useToken();

  useEffect(() => {
    if (selectedState == "Manaus") {
      setMetabaseLink(
        "https://graph.monitorafeminicidio.com/public/dashboard/3428d2b6-fd61-40b4-b36c-613628b7ebf6"
      );
    } else if (selectedState == "Porto-velho") {
      setMetabaseLink(
        "https://graph.monitorafeminicidio.com/public/dashboard/11ba83a9-ae94-4dba-a9d2-769d56a488b0"
      );
    } else if (selectedState == "Rio-de-janeiro") {
      setMetabaseLink(
        "https://graph.monitorafeminicidio.com/public/dashboard/2a4c2ac1-fc3d-40fd-9edd-82b0c87b8c36"
      );
    } else {
      setMetabaseLink(
        "https://graph.monitorafeminicidio.com/public/dashboard/00ce319f-9e90-4446-adc0-0764c9aecae5"
      );
    }
  }, [selectedState]);

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
          src={metabaseLink}
          title="Dashboards"
          frameBorder="0"
          width="1650"
          height="670"
          onLoad={handleMetabaseLoad}
        />
      </Box>
    </>
  );
}
