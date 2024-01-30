import { Box, Button, Typography } from "@mui/material";
import { TableGrid } from "../../components/TableGrid";
import { title, toolbar1 } from "../../styles";
import { columns } from "./columns";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { findImlData, findManyIml} from "../../service/iml";
import { Search } from "../../components/Search";

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

  const column = [{ 
    sexo: 'Sexo',
    idade: 'Idade',
  }]


  useEffect(() => {
    findManyIml()
    findImlData()
      .then((res) => setRows(res.data))
      .catch((error) => console.error("Erro ao obter dados:", error));
  }, []);

  return (
    <>
      <Box sx={toolbar1}>
        <Typography style={title}>Relatório IML</Typography>
        <Box sx={{display: 'flex', gap: 1}}>
        <Search column={column} value={''}/>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Importar arquivo
          <VisuallyHiddenInput type="file" />
        </Button>
        </Box>
      </Box>
      <TableGrid rows={rows} columns={columns} />
    </>
  );
}
