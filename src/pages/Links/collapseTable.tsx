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


function Row(props: any) {
  const { row } = props;
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
          {row.nomeDoSite}
        </TableCell>
        <TableCell align="right">{row.link}</TableCell>
        <TableCell align="right">{row.conteudo}</TableCell>
        <TableCell align="right">{row.feminicidio}</TableCell>
        <TableCell align="right">{row.acoes}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Notícia
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableBody>
                  <iframe
                    style={{ width: "700px", height: "350px" }}
                    src={row.linkToNoticia}
                  ></iframe>
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
    api.get("/api/fidSites/").then((res) => setRows(res.data))
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
            <TableCell align="left">Feminicídio?</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
      {/*     {rows.map((row) => (
           // <Row key={row.nomeDoSite} row={row} />
          ))} */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
