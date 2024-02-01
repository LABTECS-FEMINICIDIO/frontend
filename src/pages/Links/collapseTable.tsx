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
import { Switch } from "@mui/material";
import { toast } from "react-toastify";

export interface RowProps {
  nome: string;
  link: string;
  conteudo: string;
  feminicidio: boolean;
  lido: boolean;
  classificacao: number;
  id: string;
  vitima: any;
  refreshList: () => void;
}

export function Row(props: RowProps) {
  const [open, setOpen] = React.useState(false);
  console.log(props.vitima)

  const handleChangeLido = () => {
    api.patch(`/api/updateLido/${props.id}`).then((res) => {
      props.refreshList()
    })
  }

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {props.nome}
        </TableCell>
        <TableCell align="left"><a href={props.link} target="blank">{props.link}</a></TableCell>
        <TableCell align="left">
          <Content props={props.conteudo} />
        </TableCell>
        <TableCell align="left">{props.feminicidio}</TableCell>
        <TableCell align="left">
          <Classification classification={props.classificacao} idLink={props.id} />
        </TableCell>
        <TableCell align="left">
          {props.lido}<Switch onChange={handleChangeLido} checked={props.lido} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Notícia
              </Typography>
              <Table size="small" aria-label="purchases" sx={{ display: "flex", gap: 3 }}>
                <TableBody>
                  <iframe
                    style={{ width: "1000x", height: "900px" }}
                    src={props.link}
                  ></iframe>
                </TableBody>
                <TableBody>
                  <Form idSite={props.id} />
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);
  const [findSitesFetched, setFindSitesFetched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // You can adjust the number of items per page

  const refreshList = () => {
    api.get("/api/site/").then((res) =>
      setRows(res.data)).catch((error) => toast.error("Erro ao obter dados:", error));
  };

  useEffect(() => {
    if (!findSitesFetched) {
      api.get("/api/findSites/").then((res) => {
        setFindSitesFetched(true);
      });
    }
    api.get("/api/site/").then((res) =>
      setRows(res.data)).catch((error) => toast.error("Erro ao obter dados:", error));
  }, [findSitesFetched]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRows = rows.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.map((row: RowProps) => (
            <Row key={row.nome} {...row} refreshList={refreshList} />
          ))}
        </TableBody>
      </Table>
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={rows.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </TableContainer>
  );
}

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, currentPage, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        {pageNumbers.map(number => (
          <li key={number}>
            <button
              style={{
                padding: '5px 10px',
                cursor: 'pointer',
                backgroundColor: currentPage === number ? '#4CAF50' : '',
                color: currentPage === number ? '#fff' : '',
                border: '1px solid #ddd',
                borderRadius: '5px'
              }}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};