import { Rating, Switch } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { api } from "../../service/api";

export const columns: GridColDef[] = [
  {
    field: "nome",
    headerName: "Nome",
    width: 150,
  },
  {
    field: "link",
    headerName: "Link",
    width: 150,
  },
  {
    field: 'classificacao',
    headerName: 'Classificação',
    renderCell: (params: GridRenderCellParams<any, number>) => (
      <Rating value={params.value} />
    ),
  },
  {
    field: "menu",
    headerName: "Pesquisar",
    renderCell: ({ row }) => {

      const handleChangePesquisar = () => {
        api.patch(`/api/referenceSitePesquisar/${row.id}`).then(() => {
        })
      }
      return (<>
        <Switch onChange={handleChangePesquisar} defaultChecked={row.pesquisar} />
      </>)
    }

  }
];
