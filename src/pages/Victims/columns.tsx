import { GridColDef, GridPreProcessEditCellProps } from "@mui/x-data-grid";
import { api } from "../../service/api";
import { format } from 'date-fns';


export const columns: GridColDef[] = [
  {
    field: "nome",
    headerName: "Nome",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;

      api.patch(`/api/vitimas/${params.row.id}`, {
        nome: value || 'N/A',
      });

      return params.props;
    },
  },
  {
    field: "idade",
    headerName: "Idade",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;

      api.patch(`/api/vitimas/${params.row.id}`, {
        idade: value ? Number(value) : 'N/A',
      });

      return params.props;
    },
  },
  {
    field: "zona",
    headerName: "Zona",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;

      api.patch(`/api/vitimas/${params.row.id}`, {
        zona: value || 'N/A',
      });

      return params.props;
    },
  },
  {
    field: "tipoarma2",
    headerName: "tipoarma2",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        tipoarma2: value || 'N/A',
      });

      return params.props
    },
  },
  {
    field: "localdeocorrencia",
    headerName: "localdeocorrencia",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        localdeocorrencia: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "loclesao1",
    headerName: "loclesao1",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        loclesao1: value || 'N/A',
      });

      return params.props
    },
  },
  {
    field: "presencafilhofamiliar",
    headerName: "presencafilhofamiliar",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        presencafilhofamiliar: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "racacor1",
    headerName: "racacor1",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        racacor1: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "loclesao2",
    headerName: "loclesao2",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        loclesao2: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "datadofato",
    headerName: "datadofato",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        datadofato: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "estciv2",
    headerName: "estciv2",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        estciv2: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "loclesao3",
    headerName: "loclesao3",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        loclesao3: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "gestacao",
    headerName: "gestacao",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        gestacao: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "diah",
    headerName: "diah",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        diah: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "bairro",
    headerName: "bairro",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        bairro: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "hospitalizacao",
    headerName: "hospitalização",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        hospitalizacao:value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "filhosdescrever",
    headerName: "filhosdescrever",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        filhosdescrever: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "horario",
    headerName: "horario",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        horario: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "rua_beco_travessa_estrada_ramal",
    headerName: "rua_beco_travessa_estrada_ramal",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        rua_beco_travessa_estrada_ramal: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "violsexual",
    headerName: "violsexual",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        violsexual: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "turno",
    headerName: "turno",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        turno: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "endcomplemento",
    headerName: "endcomplemento",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        endcomplemento: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "latrocinio",
    headerName: "latrocinio",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        latrocinio: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "lat",
    headerName: "lat",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        lat: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "lng",
    headerName: "lng",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        lng: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "tipoarma1",
    headerName: "tipoarma1",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
      const value = params.props.value;
      api.patch(`/api/vitimas/${params.row.id}`, {
        tipoarma1: value || 'N/A',
      })

      return params.props
    },
  },
  {
    field: "createdAt",
    headerName: "achado_no_dia",
    editable: true,
    renderCell: (params) => (
      <span>
        {format(new Date(params.value), 'dd-MM-yyyy HH:mm:ss')}
      </span>
    ),
  },
  {
    field: "sites",
    headerName: "sites",
  },
];
