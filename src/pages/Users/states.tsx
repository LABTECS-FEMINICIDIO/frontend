import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { apiAuth } from "../../service/api";
import { useRefresh } from "../../shared/hooks/useRefresh";

export function States({ estados, userEmail }: { estados: string[], userEmail: string }) {
  const [open, setOpen] = useState(false);
  const [addCityOpen, setAddCityOpen] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { addCount } = useRefresh();

  const { handleSubmit, control, reset } = useForm();

  useEffect(() => {
    if (open || addCityOpen) {
      // Fetch cities from the API
      apiAuth.get('/api/v1/cities')
        .then(response => {
          setCities(response.data.cities);
        })
        .catch(error => {
          console.error("There was an error fetching the cities!", error);
        });
    }
  }, [open, addCityOpen]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddCity = () => {
    if (!selectedCity) return;

    const encodedEmail = encodeURIComponent(userEmail);

    apiAuth.patch(`/api/v1/users/${selectedCity}/${encodedEmail}/true`)
      .then(response => {
        toast.success("Cidade adicionada com sucesso!");
        handleClose();
        addCount()
      })
      .catch(error => {
        toast.error("Erro ao adicionar cidade.");
      });
  };

  const handleRemoveCity = (city: string) => {
    const encodedEmail = encodeURIComponent(userEmail);

    apiAuth.patch(`/api/v1/users/${city}/${encodedEmail}/false`)
      .then(response => {
        toast.success("Cidade removida com sucesso!");
        handleClose();
        addCount()
        setAddCityOpen(false)
      })
      .catch(error => {
        toast.error("Falha para remover cidade.");
        console.error("There was an error removing the city!", error);
      });
  };

  return (
    <>
      <Button onClick={handleClickOpen}>
        {estados.length}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Cidades"}
        </DialogTitle>
        <Box sx={{ margin: 2 }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Cidade</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {estados.map((item: any) => (
                  <TableRow key={item.city}>
                    <TableCell component="th" scope="row">
                      {item.city}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleRemoveCity(item.city)}
                      >
                        Remover
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <form onSubmit={handleSubmit(handleAddCity)}>

            <DialogActions sx={{ marginTop: 2 }}>
              <Button onClick={handleClose}>Cancelar</Button>
              <Button variant="contained" onClick={() => setAddCityOpen(true)}>
                Adicionar Nova Cidade
              </Button>
            </DialogActions>
          </form>
        </Box>
      </Dialog>

      <Dialog
        open={addCityOpen}
        onClose={() => setAddCityOpen(false)}
        aria-labelledby="add-city-dialog-title"
      >
        <DialogTitle id="add-city-dialog-title">
          {"Adicionar Nova Cidade"}
        </DialogTitle>
        <Box sx={{ margin: 2 }}>
          <form onSubmit={handleSubmit(handleAddCity)}>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  displayEmpty
                  fullWidth
                >
                  <MenuItem value="" disabled>Selecione uma cidade</MenuItem>
                  {cities.map((city) => (
                    <MenuItem key={city} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            <DialogActions sx={{ marginTop: 2 }}>
              <Button onClick={() => setAddCityOpen(false)}>Cancelar</Button>
              <Button type="submit" variant="contained">
                Adicionar
              </Button>
            </DialogActions>
          </form>
        </Box>
      </Dialog>
    </>
  );
}
