import Typography from "@mui/material/Typography";
import { title, toolbarWeb } from "../../styles";
import CollapsibleTable from "./collapseTable";
import { Box} from "@mui/material";
import React from "react";
import { findSearch } from "../../service/link";
import { toast } from "react-toastify";
import { format } from "date-fns";

export function Links() {
  const [lastUpdateTime, setLastUpdateTime] = React.useState("")

  const fetchLastUpdateTime = async () => {
    try {
      const response = await findSearch();
      setLastUpdateTime(response.data.createdAt);
    } catch (error: any) {
      toast.error("Erro ao obter a última vez da pesquisa de links:", error.response.data.detail);
    }
  };

  React.useEffect(() => {
    fetchLastUpdateTime();
  }, []);

  let formattedLastUpdateTime = "";

  if (lastUpdateTime) {
    try {
      // Ajuste para remover os microssegundos
      const withoutMicroseconds = lastUpdateTime.split(".")[0];
      const parsedDate = new Date(withoutMicroseconds);
      formattedLastUpdateTime = format(parsedDate, "dd/MM/yyyy HH:mm");
    } catch (error) {
      console.error("Erro ao formatar data:", error);
    }
  }

  return (
    <>
      <Box style={toolbarWeb}>
        <Typography style={title}>Links</Typography>
        <Typography>Última pesquisa realizada em: {formattedLastUpdateTime}</Typography>
      </Box>
      <CollapsibleTable />
    </>
  );
}
