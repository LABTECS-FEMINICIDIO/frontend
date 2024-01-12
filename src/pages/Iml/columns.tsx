import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "dataEntrada",
    headerName: "Data de entrada",
    width: 150,
  },
  {
    field: "dataSaída",
    headerName: "Data de Saída",
    width: 150,
  },
  {
    field: "sexo",
    headerName: "Sexo",
    width: 150,
  },
  {
    field: "idade",
    headerName: "Idade",
    width: 150,
  },
  {
    field: "bairroRemocao",
    headerName: "Bairro da remoção",
    width: 150,
  },
  {
    field: "causaMorte",
    headerName: "Causa da morte",
    width: 150,
  },
];
