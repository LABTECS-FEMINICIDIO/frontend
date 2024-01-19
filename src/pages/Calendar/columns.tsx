import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
  {
    field: "date",
    headerName: "Data",
    valueFormatter: (params) => {
      const dateParts = params.value.split("-");
      if (dateParts.length === 3) {
        return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
      }
      return params.value;
    }
  },
  {
    field: "name",
    headerName: "Feriado",
  },
  {
    field: "type",
    headerName: "Tipo",
    valueFormatter: (params) => {
      return params.value === "national" ? "Nacional" : params.value;
    },
  },
];
