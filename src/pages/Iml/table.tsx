import React, { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { findImlData, findManyIml } from '../../service/iml';
import { Iiml } from '../../models/iml';
import { colors } from '../../shared/theme';

interface Row {
  id: number;
  dataEntrada: string;
  horaEntrada: string;
  sexo: string;
  idade: number;
  bairroDaRemocao: string;
  causaMorte: string;
}

export const SimpleTableIml = () => {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => {
    setLoading(true);
    findManyIml();
    findImlData()
      .then((res) => {
        setRows(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead sx={{ background: colors.primary_lightest }}>
          <TableRow>
            <TableCell>Data</TableCell>
            <TableCell>Hora</TableCell>
            <TableCell>Sexo</TableCell>
            <TableCell>Idade</TableCell>
            <TableCell>Bairro da remoção</TableCell>
            <TableCell>Causa da morte</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.dataEntrada}</TableCell>
              <TableCell>{row.horaEntrada}</TableCell>
              <TableCell>{row.sexo}</TableCell>
              <TableCell>{row.idade}</TableCell>
              <TableCell>{row.bairroDaRemocao}</TableCell>
              <TableCell>{row.causaMorte}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[25, 50, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};
