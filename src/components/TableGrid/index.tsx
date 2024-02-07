import EditIcon from "@mui/icons-material/Edit";
import { IconButton, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridCellParams, GridColDef } from "@mui/x-data-grid";
import { table, tableContainer } from "./styles";
import { ModalDelete } from "../ModalDelete/ModalDelete";
import { api } from "../../service/api";

interface TableGridProps {
  rows: any[];
  columns: GridColDef[];
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
  titleDelete?: string;
  subtitleDelete?: string;
  setColaboradorId?: (id: string) => void;
  handleOpenModalEdit?: () => void;
  handleAttReq?: () => void;
}
export function TableGrid(props: TableGridProps) {
  const actionColumn: GridColDef[] = [
    {
      field: "menu",
      headerName: " ",
      type: "string",
      align: "right",
      editable: false,
      renderCell: ({ row }) => (
        <>
          <ModalDelete
            title={props.titleDelete}
            subtitle={props.subtitleDelete}
            onDelete={() => (props.onDelete ? props.onDelete(row.id) : "")}
          ></ModalDelete>
         {/*  <IconButton
            onClick={() => (props.onEdit ? props.onEdit(row.id) : '')}>
            <EditIcon />
          </IconButton> */}
        </>
      ),
    },
  ];

  const handleOnCellClick = (params: GridCellParams) => {
    if (params.field !== "menu" && props.onView) {
      props.onView(params.id.toString());
    }
  };

  const columns = props.onEdit || props.onEdit ? [...props.columns, ...actionColumn] : [...props.columns];
  const matches = useMediaQuery("(max-width:480px)");
  const telaVitimas = window.location.pathname.includes("victims")
  console.log(window.location.pathname.includes("victims"))

  const handleCellEditChange = (params: any) => {
    // console.log("Edited Row:", params.row);
    // console.log("Edited Field:", params.field);
    // console.log("Edited Value:", params.row[`${params.field}`]);
    console.log("teste", params)
    // api.patch(`/api/vitimas/${params.row.id}`, )
  };

  return (
    <Box sx={tableContainer}>
      <DataGrid
        rows={props.rows}
        columns={columns.map((column: GridColDef) => ({
          ...column,
          ...(matches === false && telaVitimas == false
            ? {
              flex: 1,
            }
            : { width: 230 }),
          sortable: false,
          headerClassName: "super-app-theme--header",
        }))}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10]}
        // onCellEditStop={handleCellEditChange}
        disableColumnMenu
        onCellClick={handleOnCellClick}
        sx={table}
      />
    </Box>
  );
}
