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
      setMetabaseLink(process.env.REACT_APP_METABASE_LINK_MANAUS || "");
    } else if (selectedState == "Porto-velho") {
      setMetabaseLink(process.env.REACT_APP_METABASE_LINK_PORTO_VELHO || "");
    } else if (selectedState == "Rio-de-janeiro") {
      setMetabaseLink(process.env.REACT_APP_METABASE_LINK_RIO_DE_JANEIRO || "");
    } else {
      setMetabaseLink(process.env.REACT_APP_METABASE_LINK_RIO_BRANCO || "");
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
