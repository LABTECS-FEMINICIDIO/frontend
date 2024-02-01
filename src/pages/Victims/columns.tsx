import { GridColDef, GridPreProcessEditCellProps } from "@mui/x-data-grid";
import { api } from "../../service/api";


export const columns: GridColDef[] = [
  {
    field: "nome",
    headerName: "Nome",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        nome: params.props.value
      })

      return params.props
    },
  },
  {
    field: "idade",
    headerName: "Idade",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        idade: Number(params.props.value)
      })

      return params.props
    },
  },
  {
    field: "zona",
    headerName: "Zona",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        zona: params.props.value
      })

      return params.props
    },
  },
  {
    field: "tipoarma2",
    headerName: "Tipo de Arma 2",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        tipoarma2: params.props.value
      })

      return params.props
    },
  },
  {
    field: "localdeocorrencia",
    headerName: "Local de Ocorrência",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        localdeocorrencia: params.props.value
      })

      return params.props
    },
  },
  {
    field: "loclesao1",
    headerName: "Local de Lesão 1",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        loclesao1: params.props.value
      })

      return params.props
    },
  },
  {
    field: "presencafilhofamiliar",
    headerName: "Presença de Filho/Familiar",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        presencafilhofamiliar: params.props.value
      })

      return params.props
    },
  },
  {
    field: "racacor1",
    headerName: "Raça/Cor 1",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        racacor1: params.props.value
      })

      return params.props
    },
  },
  {
    field: "loclesao2",
    headerName: "Local de Lesão 2",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        loclesao2: params.props.value
      })

      return params.props
    },
  },
  {
    field: "datadofato",
    headerName: "Data do Fato",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        datadofato: params.props.value
      })

      return params.props
    },
  },
  {
    field: "estciv2",
    headerName: "Estado Civil 2",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        estciv2: params.props.value
      })

      return params.props
    },
  },
  {
    field: "loclesao3",
    headerName: "Local de Lesão 3",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        loclesao3: params.props.value
      })

      return params.props
    },
  },
  {
    field: "gestacao",
    headerName: "Gestação",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        gestacao: params.props.value
      })

      return params.props
    },
  },
  {
    field: "diah",
    headerName: "Dia H",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        diah: params.props.value
      })

      return params.props
    },
  },
  {
    field: "bairro",
    headerName: "Bairro",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        bairro: params.props.value
      })

      return params.props
    },
  },
  {
    field: "hospitalizacao",
    headerName: "Hospitalização",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        hospitalizacao: params.props.value
      })

      return params.props
    },
  },
  {
    field: "filhosdescrever",
    headerName: "Filhos Descrever",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        filhosdescrever: params.props.value
      })

      return params.props
    },
  },
  {
    field: "horario",
    headerName: "Horário",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        horario: params.props.value
      })

      return params.props
    },
  },
  {
    field: "rua_beco_travessa_estrada_ramal",
    headerName: "Rua/Beco/Travessa/Estrada/Ramal",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        rua_beco_travessa_estrada_ramal: params.props.value
      })

      return params.props
    },
  },
  {
    field: "violsexual",
    headerName: "Violência Sexual",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        violsexual: params.props.value
      })

      return params.props
    },
  },
  {
    field: "turno",
    headerName: "Turno",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        turno: params.props.value
      })

      return params.props
    },
  },
  {
    field: "endcomplemento",
    headerName: "Endereço Complemento",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        endcomplemento: params.props.value
      })

      return params.props
    },
  },
  {
    field: "latrocinio",
    headerName: "Latrocínio",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        latrocinio: params.props.value
      })

      return params.props
    },
  },
  {
    field: "lat",
    headerName: "Latitude",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        lat: params.props.value
      })

      return params.props
    },
  },
  {
    field: "lng",
    headerName: "Longitude",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        lng: params.props.value
      })

      return params.props
    },
  },
  {
    field: "tipoarma1",
    headerName: "Tipo de Arma 1",
    editable: true,
    preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {

      api.patch(`/api/vitimas/${params.row.id}`, {
        tipoarma1: params.props.value
      })

      return params.props
    },
  },
  {
    field: "createdAt",
    headerName: "Achado no dia",
    editable: true,

  },
  {
    field: "sites",
    headerName: "Sites",
  },
];
