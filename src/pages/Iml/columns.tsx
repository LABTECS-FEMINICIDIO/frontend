import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "dataEntrada",
    headerName: "Data de entrada",
  },
  {
    field: "horaEntrada",
    headerName: "Hora de Entrada",
  },
  {
    field: "sexo",
    headerName: "Sexo",
  },
  {
    field: "idade",
    headerName: "Idade",
  },
  {
    field: "bairroDaRemocao",
    headerName: "Bairro da remoção",
  },
  {
    field: "causaMorte",
    headerName: "Causa da morte",
  },
];
