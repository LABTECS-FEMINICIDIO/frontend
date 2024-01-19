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

export interface RowProps {
  nome: string;
  link: string;
  conteudo: string;
  feminicidio: boolean;
  lido: boolean;
  classificacao: string;
}

export function Row(props: RowProps) {
  const [open, setOpen] = React.useState(false);

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
          
        <Content props={props.conteudo}/>
        </TableCell>
        <TableCell align="left">{props.feminicidio}</TableCell>
        <TableCell align="left">
          <Classification props={props.classificacao}/>
        </TableCell>
        <TableCell align="left">
          {props.lido}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Notícia
              </Typography>
              <Table size="small" aria-label="purchases" sx={{display: "flex", gap: 3}}>
                <TableBody>
                  <iframe
                    style={{ width: "1080px", height: "500px" }}
                    src={props.link}
                  ></iframe>
                </TableBody>
                <TableBody>
                  <Form/>
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

  useEffect(() => {
    api
      .get("/api/site/")
      .then((res) => setRows(res.data))
      .catch((error) => console.error("Erro ao obter dados:", error));
  }, []);

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
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: RowProps) => (
            <Row key={row.nome} {...row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
