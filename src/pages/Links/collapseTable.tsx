import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { colors } from "../../shared/theme";
import { api } from "../../service/api";
import { Form } from "./form";
import { Content } from "./content";
import Classification from "./classification";
import { CircularProgress, Switch, TablePagination } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteSite } from "../../service/site";
import { toast } from "react-toastify";
import { useRefresh } from "../../shared/hooks/useRefresh";
import { formatDate, formatTime } from "../../utils/date";
import { useToken } from "../../shared/hooks/auth";
import DeleteSiteModal from "../../components/ModalDeleteLink";
import CloseColapseTable from "../../components/ModalCloseColapseTable";
import { deleteLink } from "../../service/link";
export interface Row {
  nome: string;
  link: string;
  conteudo: string;
  feminicidio: boolean;
  lido: boolean;
  classificacao: number;
  id: string;
  vitima: any;
  tagsEncontradas: string;
  refreshList: () => void;
  createdAt: string;
}
export interface Props {
  search: { column: string; value: string };
  filterData: Row[];
  count: number;
}

export function Row(props: Row) {
  const [open, setOpen] = React.useState(false);
  const { addCount } = useRefresh();

  const handleChangeLido = () => {
    api.patch(`/api/updateLido/${props.id}`).then((res) => {
      props.refreshList();
    });
  };

  const handleChangeAssassinato = () => {
    api.patch(`/api/updateAssasinato/${props.id}`).then((res) => {
      props.refreshList();
    });
  };

  const handleDeleteLink = (siteId: string) => {
    deleteLink(siteId)
      .then((response: any) => {
        if (response.status === 200) {
          addCount();
          toast.success("Link excluído com sucesso");
          props.refreshList();
        }
      })
      .catch((error: any) => {
        toast.error(error?.response.data.detail);
      });
  };

  const handleCloseColapseTable = () => {
    setOpen(false)
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
          // onClick={() => setOpen(!open)}
          >
            {open ? <CloseColapseTable handleCloseColapseTable={handleCloseColapseTable} /> : <KeyboardArrowDownIcon onClick={() => setOpen(true)} />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.nome}
        </TableCell>
        <TableCell align="left">
          <a href={props.link} target="_blank">
            {props.link}
          </a>
        </TableCell>
        <TableCell align="left">
          <Content idSite={props.id} props={props.conteudo} />
        </TableCell>
        <TableCell align="left">
          {props.feminicidio}
          <Switch
            onChange={handleChangeAssassinato}
            checked={props.feminicidio}
          />
        </TableCell>
        <TableCell align="left">
          <Classification
            classification={props.classificacao}
            idLink={props.id}
            type="link"
          />
        </TableCell>
        <TableCell align="left">
          {props.lido}
          <Switch onChange={handleChangeLido} checked={props.lido} />
        </TableCell>
        <TableCell align="left">{formatDate(props.createdAt)}</TableCell>
        <TableCell align="left">{formatTime(props.createdAt)}</TableCell>
        <TableCell>
          <IconButton onClick={() => handleDeleteLink(props.id)}>
            <DeleteIcon />
          </IconButton>
          {/* <DeleteSiteModal
            id={props.id}
            deleteLink={deleteLink}
            addCount={addCount}
          /> */}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Notícia
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                sx={{ display: "flex", gap: 3 }}
              >
                <TableBody sx={{ display: "flex", gap: 5 }}>
                  <iframe
                    style={{ width: "50vw", height: "900px" }}
                    src={props.link}
                  />
                  <Box>
                    <Form idSite={props.id} linkSite={props.link} />
                    <Typography variant="body2" gutterBottom component="div">
                      <strong>Tags Encontradas:</strong> {props.tagsEncontradas}
                    </Typography>
                  </Box>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable({ search, filterData, count }: Props) {
  const [rows, setRows] = useState<Row[]>([]);
  const [findSitesFetched, setFindSitesFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState<number>();
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState<number>();
  const { selectedState } = useToken();

  // useEffect(() => {
  //   if (search.value.length > 0) {
  //     setRows(filterData);
  //     return;
  //   }
  //   refreshList();
  // }, [filterData, selectedState]);

  const buildQuery = () => {
    if (search.column !== "" && search.value !== "") {
      return `&${search.column}=${search.value}`;
    } else {
      return "";
    }
  };

  const refreshList = () => {
    setLoading(true);
    api
      .get(
        `/api/site/paginated?page=${currentPage}&page_size=${itemsPerPage}${buildQuery()}`
      )
      .then((res) => {
        setRows(res.data.sites);
        setTotalItems(res.data.total_records);
        setTotalPages(res.data.total_pages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchSites();
  }, [count]);

  const fetchSites = () => {
    api
      .get(
        `/api/site/paginated?page=${currentPage}&page_size=${itemsPerPage}${buildQuery()}`
      )
      .then((res) => {
        setRows(res.data.sites);
        setTotalItems(res.data.total_records);
        setTotalPages(res.data.total_pages);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetchSites();
  }, [findSitesFetched, selectedState, itemsPerPage, currentPage]);

  return (
    <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "70vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Table aria-label="collapsible table">
          <TableHead sx={{ background: colors.primary_lightest }}>
            <TableRow>
              <TableCell />
              <TableCell>Nome do Site</TableCell>
              <TableCell align="left">Link</TableCell>
              <TableCell align="left">Conteúdo</TableCell>
              <TableCell align="left">Assassinato?</TableCell>
              <TableCell align="left">Classificação</TableCell>
              <TableCell align="left">Lido</TableCell>
              <TableCell align="left">Data da Captura</TableCell>
              <TableCell align="left">Hora da Captura</TableCell>
              <TableCell align="left"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row: Row) => (
              <Row key={row.id} {...row} refreshList={refreshList} />
            ))}
          </TableBody>
        </Table>
      )}
      {/* <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={rows.length}
        currentPage={currentPage}
        paginate={paginate}
      /> */}
      <TablePaginationDemo
        props={{
          currentPage: currentPage,
          itemsPerPage: itemsPerPage,
          totalItems: totalItems || 0,
          setCurrentPage: setCurrentPage,
          setTotalItemPerPage: setItemsPerPage,
        }}
      />
    </TableContainer>
  );
}

interface IDataPagination {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  setTotalItemPerPage: (page: number) => void;
}

interface PropsPagination {
  props: IDataPagination;
}

function TablePaginationDemo({ props }: PropsPagination) {
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    props.setCurrentPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    props.setTotalItemPerPage(parseInt(event.target.value, 10));
    props.setCurrentPage(1);
  };

  return (
    <TablePagination
      component="div"
      count={props.totalItems}
      page={props.currentPage - 1}
      onPageChange={handleChangePage}
      rowsPerPage={props.itemsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
