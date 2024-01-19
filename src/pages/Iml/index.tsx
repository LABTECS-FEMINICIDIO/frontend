import { Box, Button, Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { title, toolbar1 } from "../../styles";
import { columns } from "./columns";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { findManyImlData } from "../../service/iml";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export function Iml() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    findManyImlData()
      .then((res) => setRows(res.data))
      .catch((error) => console.error("Erro ao obter dados:", error));
  }, []);

  return (
    <>
      <Box sx={toolbar1}>
        <Typography style={title}>Relatório IML</Typography>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Importar arquivo
          <VisuallyHiddenInput type="file" />
        </Button>
      </Box>
      <TableGrid rows={rows} columns={columns} />
    </>
  );
}
