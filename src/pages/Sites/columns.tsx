import { Rating, Switch } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { api } from "../../service/api";
import Classification from "../Links/classification";

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
    renderCell: ({ row }) => (
      <Classification
        classification={row.classificacao}
        idLink={row.id}
        type="site"
      />
    ),
  },
  {
    field: "pesquisar",
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
