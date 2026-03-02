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
    } else if (selectedState == "Rio-branco") {
      setMetabaseLink(process.env.REACT_APP_METABASE_LINK_RIO_BRANCO || "");
    } else if (selectedState == "Boa-vista") {
      setMetabaseLink(process.env.REACT_APP_METABASE_LINK_BOA_VISTA || "");
    }
  }, [selectedState]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 175px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {loadingMetabase && (
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
          <CircularProgress />
        </Box>
      )}

      <iframe
        src={metabaseLink}
        title="Dashboards"
        frameBorder={0}
        width="100%"
        height="100%"
        allowTransparency
        style={{
          border: "none",
          borderRadius: "8px",
          background: "white",
          flex: 1,
        }}
        onLoad={handleMetabaseLoad}
      />
    </Box>
  );
}
