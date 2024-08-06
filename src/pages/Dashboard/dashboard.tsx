import { Box, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useToken } from "../../shared/hooks/auth";

export function Dashboard() {
  const [loadingMetabase, setLoadingMetabase] = useState(true);
  const [metabaseLink, setMetabaseLink] = useState("")
  // Função para lidar com o evento de carregamento do Metabase
  const handleMetabaseLoad = () => {
    // Quando o Metabase estiver carregado, definimos o estado de loading como falso
    setLoadingMetabase(false);
  };

  const { selectedState } = useToken()

  useEffect(() => {
    if (selectedState == "Manaus"){
      setMetabaseLink("https://graph.monitorafeminicidio.com/public/dashboard/7be29569-672f-4959-809e-612a67f86bcd")
    }else{
      setMetabaseLink("https://graph.monitorafeminicidio.com/public/dashboard/183717b9-1c39-4688-9263-7335aec82a2d")
    }
  }, [selectedState])

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
